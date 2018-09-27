const mongoose = require('mongoose');

/**
 * @property {ApiKey} api_key
 */
const Session = new mongoose.Schema({
    api_key: ApiKey,
});

/**
 * @property {String} ip
 * @property {String} expired_at
 */
const ApiKey = new mongoose.Schema({
    ip: {
        type: String,
    },

    expired_at: {
        type: String,
    },
});

module.exports = {
    SessionSchema: Session,
    SessionModel: mongoose.model('session', Session),
};
