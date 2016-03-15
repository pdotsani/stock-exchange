'use strict';

angular.module('stockExchangeApp')
  .controller('NavbarCtrl', function ($scope, $rootScope, Stocks) {
    // Local scope variable for user input
    $scope.symInput;
    $scope.symbols = [];

    // Retrieves stock symbol entered by user and starts 'getStock'
    // broadcast to trigger graph placement and DB storage.
    $scope.getStock = function() {
      console.log($scope.symInput);
      Stocks.addStock({
        _id: $scope.symInput
      },  function(data) {
            console.log('SUCCESS POST!', data);
            $scope.symbols.push($scope.symInput);
            $rootScope.$broadcast('updateStocks');
            delete $scope.symInput;
      },  function(err) {
            console.warn(err);
            // Create toastr warning... enter a valid stock sym
      });
    };

    // Removes the stock from DB, and reloads page so chart is updated.
    $scope.removeStock = function(stock) {
      console.log(stock);
      Stocks.deleteStock({
        _id: stock
      }, function(data) {
        console.log('delete successful...', data);
        var i = $scope.symbols.indexOf(stock);
        $scope.symbols.splice(i, 1);
      }, function(err) {
        console.warn(err);
      });

    // // On broadcast, navbar is updated with stocks on chart.
    // $scope.$on('getStock', function(){
    //   $http.get('/api/stockDatas/').success(function(data){
    //     $scope.stocks = data;
    //     console.log($scope.stocks);
    //   });

    };    
  });