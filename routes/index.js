const express = require('express');
const router  = new express.Router();

router.use('/auth', require('./AuthRoute'));

module.exports = router;
