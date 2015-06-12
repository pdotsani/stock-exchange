'use strict';

angular.module('stockExchangeApp')
  .controller('MainCtrl', function ($scope, $http, stockName) {
    
    $scope.chartData = [];

    // Get current date

    $scope.getStockData = function(stock) {
      var d = new Date;
      var pastDate = d.getFullYear()-1 + "-"+ d.getMonth() + "-" + d.getDate();
      var currentDate = d.getFullYear() + "-"+ d.getMonth() + "-" + d.getDate();
      console.log(pastDate);
      console.log(currentDate);
      var url = 'https://www.quandl.com/api/v1/datasets/WIKI/'+stock+'.json?auth_token=6sdNsBCy4WWysKcaugbZ&trim_start='+pastDate+'&trim_end='+currentDate+'&sort_order=asc&column=4&collapse=quarterly&transformation=rdiff';
      $http.get(url).success(function(stockObj){
        
        $scope.chartData.push(stockObj);
        
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
        console.log($scope.labels);
      });
    }

    $scope.labels = [];
    $scope.series = [];
    $scope.data = [];
      $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };

    $scope.$on('getStock', function(){
      console.log(stockName.getStockName());
      $scope.getStockData(stockName.getStockName());
    });

    

  });
