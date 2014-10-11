'use strict';

var Quandl = require('quandl');

var PriceFetcher = function (token) {
  var options = {};

  options.api_version = 1;
  if (token) {
    options.auth_token = token;
  }

  this.quandl = new Quandl(options);
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