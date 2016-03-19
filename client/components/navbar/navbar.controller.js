'use strict';

angular.module('stockExchangeApp')
  .controller('NavbarCtrl', function ($scope, $rootScope, Stocks) {
    // Scope variable for user input
    $scope.symInput = '';
    $scope.symbols = [];
    $scope.error = false;

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
    }

    function resetError(){
      delete $scope.message;
      $scope.error = false;
    }

    function errorMessage(message) {
      $scope.error = true;
      $scope.message = message;
      setTimeout(function(){
        resetError();
      }, 5000);
    }

    // Retrieves stock symbol entered by user and starts 'getStock'
    // broadcast to trigger graph placement and DB storage.
    $scope.getStock = function() {
      $scope.symInput.toUpperCase()
      if($scope.symbols.indexOf($scope.symInput) < 0) {
        Stocks.addStock({
          _id: $scope.symInput.toUpperCase()
        },  function() {
              $rootScope.$broadcast('updateStocks');
        },  function(err) {
              errorMessage('Enter a valid stock symbol');
        });
      } else {
        errorMessage('no dups');
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
        $rootScope.$broadcast('updateStocks');
      }, function(err) {
        errorMessage('delete failed');
      });
    };

    // On broadcast, navbar is updated with stocks on chart.
    $scope.$on('updateStocks', function() {
      symsToNavbar();
    });

    $rootScope.$broadcast('updateStocks');
  });