'use strict';

describe('Service: stockName', function () {

  // load the service's module
  beforeEach(module('stockExchangeApp'));

  // instantiate service
  var stockName;
  beforeEach(inject(function (_stockName_) {
    stockName = _stockName_;
  }));

  it('should do something', function () {
    expect(!!stockName).toBe(true);
  });

});
