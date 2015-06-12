'use strict';

angular.module('stockExchangeApp')
  .controller('NavbarCtrl', function ($scope, $http, stockName, $rootScope) {
    
    $scope.stockSymbol;
    $scope.stocks = [];

    $scope.getStock = function() {
      console.log($scope.stockSymbol);
      stockName.setStockName($scope.stockSymbol);
      $scope.stocks.push($scope.stockSymbol);
      $rootScope.$broadcast('getStock');
      $scope.stockSymbol = '';
      console.log($scope.stocks);
    };
    
  });