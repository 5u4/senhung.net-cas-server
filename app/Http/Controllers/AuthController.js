const AuthService     = require('../Services/AuthService');
const UserService     = require('../Services/UserService');
const User            = require('../../Models/User').UserModel;
const UserTransformer = require('../Transformers/UserTransformer');

const { 
    BadRequestHttpException, 
    NotFoundHttpException, 
    ForbiddenHttpException,
    UnauthorizedHttpException,
} = require('@senhung/http-exceptions');

/**
 * Check if an email is already been taken.
 *
 * @param {String} req.params.email The email that needs to be checked | required
 */
const checkEmailExistence = async (req, res) => {
    res.json({
        isTaken: await UserService.isEmailBeenTaken(req.params.email),
    });
};

/**
 * Check if a username is already been taken.
 *
 * @param {String} req.params.username The username that needs to be checked | required
 */
const checkUsernameExistence = async (req, res) => {
    res.json({
        isTaken: await UserService.isUsernameBeenTaken(req.params.username),
    });
};

/**
 * Register an user
 * 
 * @param {String} req.body.username The username that is going to be used
 * @param {String} req.body.email The email that is going to be used
 * @param {String} req.body.password The password that is going to be used
 */
const register = async (req, res, next) => {
    /* Check if username or email is been taken */
    if (await UserService.isEmailBeenTaken(req.body.email) || await UserService.isUsernameBeenTaken(req.body.username)) {
        next(new BadRequestHttpException('Username or email is been taken.'));
    }

    /* Create user */
    const user = await UserService.createUser(req.body.username, req.body.email, req.body.password);

    res.status(201).json({
        user: UserTransformer.make(user),
    });
};

/**
 * Login a user.
 * 
 * @param {String} req.body.username
 * @param {String} res.body.email
 * @param {String} res.body.password
 */
const login = async (req, res, next) => {
    /* Check if one of the username or email is sent */
    if (!req.body.username && !req.body.email) {
        return next(new BadRequestHttpException('At least one of the user identifier field needs to be present.'));
    }

    /* Get user by email or username */
    const user = req.body.username
        ? await User.findOne({username: req.body.username})
        : await User.findOne({email: req.body.email});

    /* Check if user exists */
    if (!user) {
        return next(new NotFoundHttpException('User not found.'));
    }

    /* Check user credential */
    if (!await AuthService.isCorrectCredential(user, req.body.password)) {
        return next(new BadRequestHttpException('Wrong password.'));
    }

    /* Check if user is verified using email */
    if (!user.isVerified) {
        return next(new ForbiddenHttpException('Please validate your email.'));
    }

    /* response */
    res.json({
        token: await AuthService.signAuthToken(user._id),
        user: UserTransformer.make(user),
    });
};

/**
 * Get an user using its json web token
 * 
 * @param {String} req.headers['x-access-token']
 */
const getUser = async (req, res, next) => {
    const user = await AuthService.getUser(req.headers['x-access-token']);

    if (!user) {
        return next(new UnauthorizedHttpException('Invalid json web token.'));
    }

    res.json({
        user: UserTransformer.make(user),
    });
};

module.exports = {
    checkEmailExistence,
    checkUsernameExistence,
    register,
    login,
    getUser,
};
