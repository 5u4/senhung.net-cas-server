const mongoose = require('mongoose');
const dbConfig = require('../configs/database');

/* set connection string */
const connectionString = (process.env.NODE_ENV === 'test')
    ? dbConfig.testing.connection
    : dbConfig.auth.connection;

/* connect to mongodb */
mongoose.connect(connectionString, {useNewUrlParser: true});

module.exports = {
    default: mongoose,
};
