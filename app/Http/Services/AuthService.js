const jwt       = require('jsonwebtoken');
const bcrypt    = require('bcrypt');
const User      = require('../../Models/User').UserModel;
const jwtConfig = require('../../../configs/jwt');
const Session   = require('../../Models/Session').SessionModel;

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
 * @param {String} ip The client ip
 *
 * @returns {String} The auth token
 */
const signAuthToken = async (userId, ip) => {
    const token = jwt.sign({id: userId}, jwtConfig.jwtsecret, {
        expiresIn: jwtConfig.expiresIn,
    });

    await signSession(token, ip, jwtConfig.expiresIn);

    return token;
};

/**
 * Create a session
 * 
 * @param {String} token The user token
 * @param {String} ip The client ip
 * @param {Number} extendedSeconds The extend time in second
 */
const signSession = async (token, ip, extendedSeconds) => {
    const expiredAt = new Date().getTime() / 1000 | 0 + extendedSeconds;

    await Session.create({
        token: token,
        ip: ip,
        expired_at: expiredAt,
    });
};

/**
 * Removes all expired session records in database
 */
const cleanUpExpiredSessions = async () => {
    const current = new Date().getTime() / 1000 | 0;

    await Session.deleteMany({
        expired_at: { $lte: current },
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
    cleanUpExpiredSessions,
    getUser,
};
