'use strict';

describe('Service: stockDataToDB', function () {

  // load the service's module
  beforeEach(module('stockExchangeApp'));

  // instantiate service
  var stockDataToDB;
  beforeEach(inject(function (_stockDataToDB_) {
    stockDataToDB = _stockDataToDB_;
  }));

  it('should do something', function () {
    expect(!!stockDataToDB).toBe(true);
  });

});
