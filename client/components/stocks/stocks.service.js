'use strict';

angular.module('stockExchangeApp')
  .factory('Stocks', function($resource) {
    return $resource('/api/stocks/:id', {
      id: '@_id'
    }, {
      getAllStocks: {
        method: 'GET',
        isArray: true
      },
      addStock: {
        method: 'POST'
      },
      deleteStock: {
        method: 'DELETE'
      }
    });
  });