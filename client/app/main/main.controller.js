'use strict';

angular.module('stockExchangeApp')
  .controller('MainCtrl', function ($scope, Stocks) {

    // Chart.js vars
    $scope.data = [];
    $scope.labels = [];
    $scope.series = []; 
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };

    Stocks.getAllStocks(function(all) {
      var subLabels = [];
      all[0].data.forEach(function(a) {
        $scope.labels.push(a[0]);
      });

      all.forEach(function(stockObj, i) {
        $scope.series.push(stockObj._id);
        var subData = [];
        stockObj.data.forEach(function(a) {
          subData.push(a[1]);
        });
        $scope.data.push(subData);
      });

      console.log('series: ', $scope.series);
      console.log('labels: ', $scope.labels);
      console.log('data: ', $scope.data);
    }, function(err) {
      // Raise error via toaster
      console.warn(err);
    });

    // On getStock broadcast, get stock data for agregation on chart
    $scope.$on('updateStocks', function(){
      
    });
});
