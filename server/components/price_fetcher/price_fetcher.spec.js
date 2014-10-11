'use strict';

var should = require('should');
var PriceFetcher = require('./price_fetcher');
var nock = require('nock');

describe('PriceFetcher', function () {
  var token = "XXRFW";
  var date = "2014-09-15";
  var value = 490.27;

  beforeEach(function () {
    nock('http://www.quandl.com')
      .get('/api/v1/datasets/BCHARTS/BITSTAMPUSD.json?trim_start=' + date + '&trim_end=' + date + '&auth_token=' + token)
      .reply(200, {data: [
        [date, value]
      ]});
  });

  it('gives prices data', function () {
    var priceFetcher = new PriceFetcher(token);
    priceFetcher.fetch(date, function (err, priceAttributes) {
      priceAttributes.should.eql({"date": date, value: value})
    });
  });

});
