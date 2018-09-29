const bcrypt     = require('bcrypt');
const User       = require('../../Models/User').UserModel;
const authConfig = require('../../../configs/auth');

/**
 * Check if a username is been taken.
 *
 * @param {String} username The user name that is going to be test
 *
 * @returns {Boolean} If the username is been taken
 */
const isUsernameBeenTaken = async (username) => {
    return !!await User.findOne({username: username});
};

/**
 * Check if an email is been registered.
 *
 * @param {String} email The email that is going to be test
 *
 * @returns {Boolean} If the email is been taken
 */
const isEmailBeenTaken = async (email) => {
    return !!await User.findOne({email: email});
};

/**
 * Create a user and insert into database
 *
 * @param {String} username The unique username
 * @param {String} email The user email
 * @param {String} password The password that is not been hashed
 *
 * @returns {User} The newly created user
 */
const createUser = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, authConfig.saltRounds);

    const emailVerificationCode = generateEmailVerificationCode();

    const user = new User({
        username: username,
        email: email,
        password: hashedPassword,
        emailVerificationCode: emailVerificationCode,
    });

    await user.save();

    return user;
};

/**
 * Refresh email verification code
 * 
 * @param {User} user The user that will be refreshed verification code
 */
const refreshEmailVerificationCode = async (user) => {
    const emailVerificationCode = generateEmailVerificationCode();

    user.emailVerificationCode = emailVerificationCode;

    await user.save();
};

/**
 * Generate an email verification code
 */
const generateEmailVerificationCode = () => {
    return [
        ...Array(authConfig.verifications.emailVerificationCodeLength)
    ].map(i => (~~(Math.random() * 36)).toString(36)).join('');
};

module.exports = {
    isUsernameBeenTaken,
    isEmailBeenTaken,
    createUser,
    refreshEmailVerificationCode,
};
