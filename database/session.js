const mongoose = require('mongoose');
const dbConfig = require('../configs/database');

/* connect to mongodb */
mongoose.connect(dbConfig.session.connection, {useNewUrlParser: true});

module.exports = mongoose;
