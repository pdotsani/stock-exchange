'use strict';

angular.module('stockExchangeApp')
  .controller('NavbarCtrl', function ($scope, $http, yearSpan, $rootScope, stockDataToDB, $route) {
    // Local scope variable for user input
    $scope.stockSymbol;

    // Retrieves stock symbol entered by user and starts 'getStock'
    // broadcast to trigger graph placement and DB storage.
    $scope.getStock = function() {

      console.log($scope.stockSymbol);
      
      var url = 'https://www.quandl.com/api/v1/datasets/WIKI/'+
      $scope.stockSymbol+'.json?auth_token=6sdNsBCy4WWysKcaugbZ&trim_start='+
      yearSpan.preDate()+'&trim_end='+yearSpan.curDate()+
      '&sort_order=asc&column=4&collapse=quarterly&transformation=rdiff';

      $http.get(url).success(function(data){
        console.log(data);
        
        stockDataToDB.sendName(data.code);  
        $rootScope.$broadcast('getStock');
        $scope.stockSymbol = '';
        console.log($scope.stocks);
      }).error(function() {
        alert('Enter a valid stock symbol');
        $scope.stockSymbol = '';
      });

    };

    // Removes the stock from DB, and reloads page so chart is updated.
    $scope.removeStock = function(stock) {
      $http.delete('/api/stockDatas/'+stock).success(function(){
        console.log(stock + " removed");
      })
      $rootScope.$broadcast('getStock');
      $route.reload();
    };

    // On broadcast, navbar is updated with stocks on chart.
    $scope.$on('getStock', function(){
      $http.get('/api/stockDatas/').success(function(data){
        $scope.stocks = data;
        console.log($scope.stocks);
      });

    });

    $rootScope.$broadcast('getStock');
    
  });