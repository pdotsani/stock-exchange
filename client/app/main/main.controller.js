'use strict';

angular.module('stockExchangeApp')
  .controller('MainCtrl', 
    function ($scope, StockSvc, yearSpan, $route, $http) {
    
    /*
      Function retrieves stock symbol (stock) and
      collects data via json request to quandl. Data is then organized
      and sent to appropriate variables for display using chart.js.
    */ 
    $scope.getStockData = function(stockName) {
      
    };
    $http.get('/api/getStocks/')
      .then(function(data) {
        console.log('success!', data);
      }).catch(function(err) {
        console.warn(err);
      });
    // Chart.js variables
    $scope.labels = [];
    $scope.series = [];
    $scope.data = [];
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };

    /*  On getStock broadcast, retrieve saved stock symbols 
        from the DB and execute getStockdata to each symbol.
     */
    $scope.$on('getStock', function(){
      
    });
    
    

  });
