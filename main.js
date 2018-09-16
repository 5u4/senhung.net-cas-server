require('dotenv').config();

const app = require('./bootstrap/app');

module.exports = app.listen(require('./configs/app').port);
