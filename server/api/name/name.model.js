'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StockDataSchema = new Schema({
  _id: String,
  stockName: String
});

module.exports = mongoose.model('StockData', StockDataSchema);