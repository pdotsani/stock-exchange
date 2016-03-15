'use strict';

angular.module('stockExchangeApp')
  .service('StockSvc', 
    function($http, $location, yearSpan) {
      return {
        get: function(stock) {

          var auth_token = '6sdNsBCy4WWysKcaugbZ';
          var config = '&sort_order=asc&column=4&collapse=quarterly&transformation=rdiff';
          
          var url = 'https://www.quandl.com/api/v1/datasets/WIKI/'+
          stock + '.json?auth_token=' + auth_token + '&trim_start=' +
          yearSpan.preDate() + '&trim_end=' + yearSpan.curDate() +
          config;

          // Abstract this!
          $http
            .get(url)
            .success(function(data) { 
              console.log('DATA', data);
              // Need to Return Promise
              return data;
          }).error(function(err) {
            console.warn(err);
          });
        },

        initialize: function() {

          // Abstract this!
          $http
            .get('/api/stockDatas')
            .success(function(data) {
              console.log('DATA', data);
              // Need to return promise
              return data;
          }).error(function(err) {
            console.warn(err);
          });
        }

      };
  });
