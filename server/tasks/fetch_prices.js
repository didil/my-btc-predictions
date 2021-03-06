console.log('Fetching prices ...');

var config = require('../config/environment');
var moment = require('moment');
var mongoose = require('mongoose');
var async = require('async');
var PriceFetcher = require('../components/price_fetcher/price_fetcher');
var Price = require('../api/price/price.model');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// build dates
var dates = [];
for (var i = 0; i < 12; i++) {
  var initDate = moment().subtract(12, 'months').startOf('month').add(1, 'month');
  dates.push(initDate.add(i, 'month').format("YYYY-MM-DD"));
}


var priceAttributesArray = [];

Price.remove({}, function (err) {
  if (err) {
    mongoose.disconnect();
    return  console.log(err);
  }

  async.each(dates, function (date, callback) {
      var priceFetcher = new PriceFetcher(config.quandl.authToken);
      priceFetcher.fetch(date, function (err, priceAttributes) {
        if (err) {
          return callback(err);
        }

        priceAttributesArray.push(priceAttributes);
        callback();
      });
    },
    function (err) {
      if (err) {
        return console.log("Could not fetch price: " +err);
      }

      Price.create(priceAttributesArray, function (err) {
        if (err) {
          console.log("Could not save prices: " + err);
        }

        console.log("Created: " + priceAttributesArray.length + " prices");
        mongoose.disconnect();
      });
    }
  );
});


