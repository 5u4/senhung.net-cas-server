const mongoose = require('mongoose');

/**
 * @property {String} token
 * @property {String} ip
 * @property {Number} expired_at
 * @property {String} user_id
 * @property {String} username
 * @property {String} email
 */
const Session = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },

    ip: {
        type: String,
    },

    expired_at: {
        type: Number,
        required: true,
    },

    user_id: {
        type: String,
        required: true,
    },

    username: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },
});

module.exports = {
    SessionSchema: Session,
    SessionModel: mongoose.model('session', Session),
};
