const mongoose = require('mongoose');
const dbConfig = require('../configs/database');

/* Set connection string */
const connectionString = (process.env.NODE_ENV === 'test')
    ? dbConfig.testing.connection
    : dbConfig.auth.connection;

/* Connect to mongodb */
mongoose.connect(connectionString, {useNewUrlParser: true});

module.exports = mongoose;
