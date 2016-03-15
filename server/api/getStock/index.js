'use strict';

var express = require('express');
var controller = require('./getStock.controller');

var router = express.Router();

router.get('/', controller.getStocks);

module.exports = router;