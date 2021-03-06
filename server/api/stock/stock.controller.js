'use strict';

var _ = require('lodash');
var Stock = require('../stock/stock.model');
var request = require('superagent');

function getDateRange() {
  var d = new Date(); 
  var startDate = d.getFullYear()-15 + 
    "-"+ d.getMonth() + "-" + d.getDate();
  var endDate = d.getFullYear() + 
    "-"+ d.getMonth() + "-" + d.getDate();
  
  return { begin: startDate, end: endDate };
}

function quandl(id) {
  var url = 'https://www.quandl.com/api/v1/datasets/WIKI/';
  var token = '6sdNsBCy4WWysKcaugbZ';
  
  console.log(getDateRange().begin);
  console.log(getDateRange().end);

  return new Promise(function(resolve, reject) {
    request
      .get(url+id+'.json')
      .query({auth_token : token})
      .query({sort_order : 'asc'})
      .query({trim_start : getDateRange().begin})
      .query({trim_end : getDateRange().end})
      .query({column : '4'})
      .query({collapse : 'quarterly'})
      .query({transformation : 'rdiff'})
      .end(function(err, data) {
        console.log(data.res);
        if(err) reject(err);
        var body = data.res.body;
        var obj = {}; 
        obj._id = id;
        obj.name = body.name;
        obj.url = body.display_url;
        obj.data = body.data;
        obj.columns = body.column_names;
        resolve(obj);
      });
  });
}

// Get list of stockDatas
exports.index = function(req, res) {
  Stock
    .find(function (err, data) {
      if(err) return handleError(res, err);
      return res.status(200).json(data);
    });
};

exports.ids = function(req, res) {
  Stock
    .find({}, {_id:1})
    .exec(function (err, result) {
      var idArray = result.map(data => data.id);
      if(err) return handleError(res, err);
      return res.status(200).json(idArray);
    });
};

// Creates a new stockData in the DB.
exports.create = function(req, res) {
  quandl(req.params.id)
    .then(function(doc) {
      Stock.create(doc, function(err, rec) {
        if(err) return handleError(res, err);
        return res.status(201).json(doc);
      });
    })
    .catch(function(err) {
      return handleError(res, err);
    })
};

// Deletes a stock from the DB.
exports.destroy = function(req, res) {
  Stock
    .findById(req.params.id, 
      function (err, stock) {
        if(err) { return handleError(res, err); }
        if(!stock) { return res.send(404); }
        stock
          .remove(function(err) {
            if(err) { return handleError(res, err); }
            return res.send(204);
          });
    });
};

function handleError(res, err) {
  return res.send(500, err);
}