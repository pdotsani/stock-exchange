'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StockSchema = new Schema({
  _id: String,
  name: String,
  url: String,
  data: Array
});

module.exports = mongoose.model('Stock', StockSchema);