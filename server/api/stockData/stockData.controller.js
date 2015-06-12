'use strict';

var _ = require('lodash');
var StockData = require('./stockData.model');

// Get list of stockDatas
exports.index = function(req, res) {
  StockData.find(function (err, stockDatas) {
    if(err) { return handleError(res, err); }
    return res.json(200, stockDatas);
  });
};

// Get a single stockData
exports.show = function(req, res) {
  StockData.findById(req.params.id, function (err, stockData) {
    if(err) { return handleError(res, err); }
    if(!stockData) { return res.send(404); }
    return res.json(stockData);
  });
};

// Creates a new stockData in the DB.
exports.create = function(req, res) {
  StockData.create(req.body, function(err, stockData) {
    if(err) { return handleError(res, err); }
    return res.json(201, stockData);
  });
};

// Updates an existing stockData in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  StockData.findById(req.params.id, function (err, stockData) {
    if (err) { return handleError(res, err); }
    if(!stockData) { return res.send(404); }
    var updated = _.merge(stockData, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, stockData);
    });
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