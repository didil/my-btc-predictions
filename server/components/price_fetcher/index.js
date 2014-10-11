'use strict';

var config = require('../../config/environment');
var Quandl = require('quandl');
var async = require('async');

var PriceFetcher = function () {
  this.quandl = new Quandl({
    auth_token: config.quandl.authToken,
    api_version: 1
  });
};

PriceFetcher.prototype.fetch = function (dates, next) {
  var that = this;
  var priceData = [];
  async.each(dates, function (date, callback) {
    that.quandl.dataset({ source: "BAVERAGE", table: "USD" }, {trim_start: date, trim_end: date}, function (err, response) {
      if (err)
        callback(err);

      var data = JSON.parse(response).data;
      priceData.push({date: data[0], value: data[1]});
    });
  }, function (err) {
    if (err)
      next(err);

    next(null, priceData);
  });
};

module.exports = PriceFetcher;