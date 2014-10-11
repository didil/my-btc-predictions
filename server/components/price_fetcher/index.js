'use strict';

var config = require('../../config/environment');
var Quandl = require('quandl');


var PriceFetcher = function () {
  this.quandl = new Quandl({
    auth_token: config.quandl.authToken,
    api_version: 1
  });
};

PriceFetcher.prototype.fetch = function (date, next) {
  this.quandl.dataset({ source: "BCHARTS", table: "BITSTAMPUSD" }, {trim_start: date, trim_end: date}, function (err, response) {
    if (err)
      return next(err);

    var data = JSON.parse(response).data[0];
    if (data) {
      next(null, {date: data[0], value: data[1]});
    }
    else {
      next(new Error("No data found for date:" + date));
    }
  });
};

module.exports = PriceFetcher;