'use strict';

describe('Service: yearSpan', function () {

  // load the service's module
  beforeEach(module('stockExchangeApp'));

  // instantiate service
  var yearSpan;
  beforeEach(inject(function (_yearSpan_) {
    yearSpan = _yearSpan_;
  }));

  it('should do something', function () {
    expect(!!yearSpan).toBe(true);
  });

});
