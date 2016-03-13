'use strict';

// Service that sends stock Data to the DB
angular.module('stockExchangeApp')
  .service('stockDataToDB', function($http) {
    return {
    	sendName: function(stockName) {
    		$http
                .post('/api/stockDatas/',{_id: stockName})
                .success(function(data){
    			console.log(data+ " :: in DB!")
    		})
            .error(function(err) {
    			console.log(err);
    		});
    	}
    }
  });
