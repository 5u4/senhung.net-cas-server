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
const createUser = async function(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, authConfig.saltRounds);

    const user = new User({
        username: username,
        email: email,
        password: hashedPassword,
    });

    await user.save();

    return user;
};

module.exports = {
    isUsernameBeenTaken,
    isEmailBeenTaken,
    createUser,
};
