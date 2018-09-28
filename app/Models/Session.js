const mongoose = require('mongoose');

/**
 * @property {String} token
 * @property {String} ip
 * @property {Number} expired_at
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
});

module.exports = {
    SessionSchema: Session,
    SessionModel: mongoose.model('session', Session),
};
