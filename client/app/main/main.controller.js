'use strict';

angular.module('stockExchangeApp')
  .controller('MainCtrl', function ($scope, Stocks) {
    // Chart.js variables
    $scope.labels = [];
    $scope.series = [];
    $scope.data = [];
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };

    // On getStock broadcast, retrieve saved stock symbols 
    // from the DB and execute getStockdata to each symbol.
    $scope.$on('updateStocks', function(){
      
    });
});
