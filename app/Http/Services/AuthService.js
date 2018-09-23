const jwt       = require('jsonwebtoken');
const bcrypt    = require('bcrypt');
const User      = require('../../Models/User').UserModel;
const jwtConfig = require('../../../configs/jwt');

/**
 * Check if the user has the right credentials
 *
 * @param {User}   user The user that is going to be validated
 * @param {String} testPassword The password without been hashed
 *
 * @returns {Boolean} Is correct credential
 */
const isCorrectCredential = async (user, testPassword) => {
    return await bcrypt.compare(testPassword, user.password);
};

/**
 * Get a user's json web token
 * 
 * Expire time can be set at /configs/jwt.expiresIn
 *
 * @param {String} userId The user that is going to be signed with a token
 *
 * @returns {String} The auth token
 */
const signAuthToken = (userId) => {
    return jwt.sign({id: userId}, jwtConfig.jwtsecret, {
        expiresIn: jwtConfig.expiresIn,
    });
};

/**
 * Get an user by its token
 * 
 * @param {String} token User json web token
 * 
 * @returns {User} The user
 */
const getUser = async (token) => {
    let tokenInfo;

    try {
        tokenInfo = await jwt.verify(token, jwtConfig.jwtsecret);
    } catch (err) {
        return null;
    }

    return await User.findById(tokenInfo.id);
};

module.exports = {
    isCorrectCredential,
    signAuthToken,
    getUser,
};
