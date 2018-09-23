const mongoose = require('mongoose');

/**
 * @property {String} username
 * @property {String} email
 * @property {String} password
 * @property {Boolean} isVerified
 */
const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        max: 14,
        regex: /^[a-zA-Z][a-zA-Z0-9_.]*$/,
    },

    email: {
        type: String,
        required: true,
        regex: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    },

    password: {
        type: String,
        required: true,
    },

    isVerified: {
        type: Boolean,
        default: false,
    },

    lastLogin: {
        type: Number,
        default: null,
    },
});

module.exports = {
    UserSchema: User,
    UserModel: mongoose.model('user', User),
};
