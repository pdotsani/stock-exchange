'use strict';

angular.module('stockExchangeApp')
  .factory('Stocks', function($resource) {
    return $resource('/api/stocks/:id/:controller', {
      id: '@_id'
    }, {
      getAllStocks: {
        method: 'GET',
        isArray: true
      },

      getAllIds: {
        method: 'GET',
        isArray: true,
        params: {
          controller: 'byId'
        }
      },

      addStock: {
        method: 'POST'
      },

      deleteStock: {
        method: 'DELETE'
      }
    });
  });