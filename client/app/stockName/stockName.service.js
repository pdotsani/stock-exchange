'use strict';

angular.module('stockExchangeApp')
  .service('stockName', function () {
    var stockName;

    return {
    	setStockName: function(name) {
    		stockName = name;
    		console.log(stockName);
    	},
    	getStockName: function() {
    		return stockName;
    	}
    }
  });
