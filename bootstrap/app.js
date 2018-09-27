const express    = require('express');
const bodyParser = require('body-parser');
const morgan     = require('morgan');
const Handler    = require('../app/Exceptions/Handler');

/* Create express app */
const app = express();

/* Use body parser middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* Console log api */
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
}

/* Routes */
app.use('/v1/api', require('../routes'));

/* Connect to database */
require('../database/app');

/* Handle exceptions */
app.use(Handler);

module.exports = app;
