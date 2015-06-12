'use strict';

// Service that calculates a full year for a data range.
angular.module('stockExchangeApp')
  .service('yearSpan', function () {
  	var d = new Date;
  	
    var pastDate = d.getFullYear()-1 + "-"+ d.getMonth() + "-" + d.getDate();
    var currentDate = d.getFullYear() + "-"+ d.getMonth() + "-" + d.getDate();

    return {
    	preDate: function() {
    		return pastDate;
    	},
    	curDate: function() {
    		return currentDate;
    	}
    }
  });
