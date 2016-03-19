'use strict';

angular.module('stockExchangeApp')
  .controller('NavbarCtrl', function ($scope, $rootScope, Stocks) {
    // Scope variable for user input
    $scope.symInput = '';
    $scope.symbols = [];
    $scope.error = false;
    $scope.status = false;

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

    // Refactor these later...
    function resetError(){
      delete $scope.message;
      $scope.error = false;
    }

    function resetStatus(){
      delete $scope.statusMessage;
      $scope.status = false;
    }

    function errorMessage(message) {
      $scope.error = true;
      $scope.message = message;
    }

    function statusMessage(message) {
      $scope.status = true;
      $scope.statusMessage = message;
    }

    // Retrieves stock symbol entered by user and starts 'getStock'
    // broadcast to trigger graph placement and DB storage.
    $scope.getStock = function() {
      resetError();
      resetStatus();
      $scope.symInput.toUpperCase();
      statusMessage('Fetching stock');
      if($scope.symbols.indexOf($scope.symInput) < 0) {
        Stocks.addStock({
          _id: $scope.symInput.toUpperCase()
        },  function() {
              $rootScope.$broadcast('updateStocks');
              resetStatus();
        },  function() {
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
      statusMessage('Removing stock');
      Stocks.deleteStock({
        id: sym
      }, function() {
        var i = $scope.symbols.indexOf(sym);
        $scope.symbols.splice(i, 1);
        $rootScope.$broadcast('updateStocks');
        resetStatus();
      }, function() {
        errorMessage('delete failed');
      });
    };

    // On broadcast, navbar is updated with stocks on chart.
    $scope.$on('updateStocks', function() {
      symsToNavbar();
    });

    $rootScope.$broadcast('updateStocks');
  });