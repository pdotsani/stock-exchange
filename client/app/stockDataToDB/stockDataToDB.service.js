'use strict';

angular.module('stockExchangeApp')
  .service('stockDataToDB', function($http) {
    return {
    	sendName: function(stockName) {
    		$http.post('/api/stockDatas/',{_id: stockName}).success(function(data){
    			console.log(data+ " :: success!")
    		}).error(function(err) {
    			console.log(err);
    		});
    	}
    }
  });
