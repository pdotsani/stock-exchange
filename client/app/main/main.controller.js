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

    function loadChart() {
      
      Stocks.getAllStocks(function(all) {
        $scope.data = [];
        $scope.labels = [];
        $scope.series = [];

        console.log(all.length);
        // Populate labels
        if(all.length > 0) {
          all[0].data.forEach(function(a) {
            $scope.labels.push(a[0]);
          });

          // Populate Data and Series
          all.forEach(function(stockObj) {
            // Series
            $scope.series.push(stockObj._id);
            // Data
            var subData = [];
              stockObj.data.forEach(function(a) {
                subData.push(a[1]);
              });
              $scope.data.push(subData);
          });

          console.log('series: ', $scope.series);
          console.log('labels: ', $scope.labels);
          console.log('data: ', $scope.data);
        }
      }, function(err) {
        // Raise error via toaster
        console.warn(err);
      });
    }

    // On getStock broadcast, get stock data for agregation on chart
    $scope.$on('updateStocks', function(){
      loadChart();
    });
});
