'use strict';

angular.module('stockExchangeApp')
  .controller('NavbarCtrl', function ($scope, $rootScope, Stocks) {
    // Scope variable for user input
    $scope.symInput;
    $scope.symbols = [];

    // Load all stock syms into navbar
    function symsToNavbar() {
      $scope.symbols = [];
      Stocks.getAllIds(function(ids) {
          ids.forEach(function(id) {
            $scope.symbols.push(id);
          });
        }, function(err) {
          console.warn(err);
        });
    };

    // Retrieves stock symbol entered by user and starts 'getStock'
    // broadcast to trigger graph placement and DB storage.
    $scope.getStock = function() {
      if($scope.symbols.indexOf($scope.symInput) < 0) {
        Stocks.addStock({
          _id: $scope.symInput
        },  function(data) {
              $rootScope.$broadcast('updateStocks');
        },  function(err) {
              console.warn(err);
              // Create toastr warning... enter a valid stock sym
        });
      } else {
        console.warn('No dups!');
        // Create toaster... no dups!
      }
      // Clear field
      delete $scope.symInput;
    };

    // Removes the stock from DB, updates views
    $scope.removeStock = function(sym) {
      console.log(sym);
      Stocks.deleteStock({
        id: sym
      }, function(data) {
        console.log('delete successful...', data);
        var i = $scope.symbols.indexOf(sym);
        $scope.symbols.splice(i, 1);
      }, function(err) {
        console.warn(err);
      });
    };

    // On broadcast, navbar is updated with stocks on chart.
    $scope.$on('updateStocks', function() {
      symsToNavbar();
    });

    $rootScope.$broadcast('updateStocks');
  });