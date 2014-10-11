console.log('Fetching prices ...');

var config = require('../config/environment');
var moment = require('moment');
var mongoose = require('mongoose');
var async = require('async');
var PriceFetcher = require('../components/price_fetcher');
var Price = require('../api/price/price.model');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// build dates
var dates = [];
for (var i = 0; i < 12; i++) {
  var initDate = moment().subtract(12, 'months').startOf('month').add(1, 'month');
  dates.push(initDate.add(i, 'month').format("YYYY-MM-DD"));
}

Price.remove({}, function (err) {
  if (err) {
    mongoose.disconnect();
    return console.log(err);
  }

  async.each(dates, function (date, callback) {
      var priceFetcher = new PriceFetcher();
      priceFetcher.fetch(date, function (err, priceAttributes) {
        if (err) {
          console.log("Could not fetch price");
          return callback(err);
        }

        Price.create(priceAttributes, function (err) {
          if (err) {
            console.log("Could not save price");
            return callback(err);
          }

          callback();
        });
      });
    },
    function (err) {
      if (err) {
        return console.log(err);
      }

      mongoose.disconnect();
    }
  );

});


