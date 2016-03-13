'use strict';

angular.module('stockExchangeApp')
  .controller('MainCtrl', function ($scope, StockSvc, yearSpan, $route) {
    
    /*
      Function retrieves stock symbol (stock) and
      collects data via json request to quandl. Data is then organized
      and sent to appropriate variables for display using chart.js.
    */ 
    $scope.getStockData = function(stockName) {
      var promise = StockSvc.get(stockName).$promise;
      promise
        .then(function(stockObj){    
          console.log($scope.series.indexOf(stockObj.code));
          // If Statement fixes duplicate bug
          if($scope.series.indexOf(stockObj.code)===-1) {
          $scope.series.push(stockObj.code);
          // Set up labels & stats
          var stockStats = [];
          stockObj.data.forEach(function(stat){
            stockStats.push(stat[1]);
            var dup = false;
            $scope.labels.forEach(function(label){
              if(label == stat[0]) dup = true;
            })
            if(!dup) $scope.labels.push(stat[0]);
          });
          $scope.data.push(stockStats);
            };
        }, function(err) {
          console.warn(err);
        });
    };

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
      var promise = StockSvc.initialize().$promise;
      promise
        .then(function(symbols) {
          $scope.stocks = symbols;
          $scope.stocks.forEach(function(sym){
            StockSvc.get(sym._id);
          })
        }, function(err) {
          console.warn(err);
        });
    });
    
    

  });
