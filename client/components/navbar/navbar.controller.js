'use strict';

angular.module('stockExchangeApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $http, stockName, $rootScope) {
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.stockSymbol;

    $scope.getStock = function() {
      console.log($scope.stockSymbol);
      stockName.setStockName($scope.stockSymbol);
      $rootScope.$broadcast('getStock');
    }

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });