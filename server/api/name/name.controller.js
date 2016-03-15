'use strict';

var _ = require('lodash');
var StockData = require('./name.model');

// Get list of stockDatas
exports.index = function(req, res) {
  StockData.find(function (err, stockDatas) {
    if(err) { return handleError(res, err); }
    return res.json(200, stockDatas);
  });
};

// Creates a new stockData in the DB.
exports.create = function(req, res) {
  StockData.create(req.body, function(err, stockData) {
    if(err) { return handleError(res, err); }
    return res.json(201, stockData);
  });
};

// Deletes a stockData from the DB.
exports.destroy = function(req, res) {
  StockData.findById(req.params.id, function (err, stockData) {
    if(err) { return handleError(res, err); }
    if(!stockData) { return res.send(404); }
    stockData.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}