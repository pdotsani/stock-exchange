'use strict';

var _ = require('lodash');
var request = require('superagent');
var Name = require('../name/name.model');
var Promise = require("bluebird");


var url = 'https://www.quandl.com/api/v1/datasets/WIKI/';
var token = '6sdNsBCy4WWysKcaugbZ';

function yearSpan() {
	var d = new Date;
	
  var pastDate = d.getFullYear()-1 + "-"+ d.getMonth() + "-" + d.getDate();
  var currentDate = d.getFullYear() + "-"+ d.getMonth() + "-" + d.getDate();

  return { preDate: pastDate, curDate: currentDate };
};

function getStockInfo(stockId) {
	var span = yearSpan();
	request
		.get(url+stockId+'.json')
		.query({'auth_token' : token})
		.query({'trim_start' : span.preDate})
		.query({'trim_end' : span.currentDate})
		.query({'sort_order' : 'asc'})
		.query({'column' : '4'})
		.query({'collapse' : 'quarterly'})
		.query({'transformation' : 'rdiff'})
		.end(function(err, res) {
			if(err) return handleError(err, res);
			console.log('DATA IN SERVER', res.body);
			resolve(res.body);
		});
};

// Get list of stockDatas
exports.getStocks = function(req, res) {
	
  Name
  	.find(function(err, stockObjs) {
  		if(err) return handleError(res, err);
			var idArr = [];
			var promises = [];
			idArr = _.map(stockObjs, '_id');
			_.forEach(idArr, function(id){
				promises.push(getStockInfo(id));
			});
  	})
  console.log('done!!!');
};

function handleError(res, err) {
  return res.send(500, err);
}