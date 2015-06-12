'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StockDataSchema = new Schema({
  stockname: String,
  allData: [Number]
});

module.exports = mongoose.model('StockData', StockDataSchema);