'use strict';

angular.module('stockExchangeApp')
  .controller('MainCtrl', function ($scope, $http, yearSpan, $route) {
    
    /*
      Function retrieves stock symbol (stock) and
      collects data via json request to quandl. Data is then organized
      and sent to appropriate variables for display using chart.js.
    */ 
    $scope.getStockData = function(stock) {
      var url = 'https://www.quandl.com/api/v1/datasets/WIKI/'+
      stock+'.json?auth_token=6sdNsBCy4WWysKcaugbZ&trim_start='+
      yearSpan.preDate()+'&trim_end='+yearSpan.curDate()+
      '&sort_order=asc&column=4&collapse=quarterly&transformation=rdiff';
      
      $http.get(url).success(function(stockObj){    
        
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
      });
    }

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
      $http.get('/api/stockDatas').success(function(data){
        $scope.stocks = data;
        $scope.stocks.forEach(function(d){
          console.log(d._id);
          $scope.getStockData(d._id);
        })
      });
    });
    
    

  });
