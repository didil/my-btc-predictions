'use strict';

var _ = require('lodash');
var moment = require('moment');
var async = require('async');
var Prediction = require('./prediction.model');

exports.index = function (req, res) {
  Prediction.find({user: req.user, date: {'$gt': moment(), '$lte': moment().add(6, 'months')}})
    .sort('date').exec(function (err, predictions) {
      if (err) {
        return handleError(res, err);
      }

      var dates = [];
      for (var i = 0; i < 6; i++) {
        var initDate = moment().add(1, 'month').startOf('month');
        var date = initDate.add(i, 'month');
        dates.push(date);
      }

      var completedPredictions = dates.map(function (date) {
        var prediction = _.find(predictions, function (prediction) {
          return moment(prediction.date).month() == date.month() && moment(prediction.date).year() == date.year()
        });
        if (_.isUndefined(prediction)) {
          prediction = new Prediction({ 'date': date, 'value': null});
        }
        return prediction;
      });

      return res.json(200, completedPredictions);
    });
};

exports.create = function (req, res) {
  Prediction.create(req.body, function (err, prediction) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, prediction);
  });
};

exports.multisave = function (req, res) {
  var predictions = [];
  async.each(req.body, function (attrs, callback) {
      Prediction.findOne({_id: attrs._id, user: req.user._id},  function (err, prediction) {
        if (err) {
          return callback(err);
        }

        if (_.isNull(prediction)) {
          console.log("building new prediction for : " + attrs._id);
          prediction = new Prediction({date: attrs.date, value: attrs.value, user: req.user._id})
        }

        prediction.value = attrs.value;
        prediction.save(function (err, prediction) {
          if (err) {
            return callback(err);
          }

          predictions.push(prediction);
          callback();
        });
      });
    },
    function (err) {
      if (err) {
        console.log(err);
        return handleError(res, err);
      }
      return res.json(200,_.sortBy(predictions, 'date') );
    }
  );
};

function handleError(res, err) {
  return res.send(500, err);
}