'use strict';

var _ = require('lodash');
var moment = require('moment');
var Prediction = require('./prediction.model');

exports.index = function (req, res) {
  Prediction.find({date: {'$gt': moment(), '$lte': moment().add(6, 'months')}}).sort('date').exec(function (err, predictions) {
    if (err) {
      return handleError(res, err);
    }

    return res.json(200, predictions);
  });
};

exports.create = function(req, res) {
  Prediction.create(req.body, function(err, prediction) {
    if(err) { return handleError(res, err); }
    return res.json(201, prediction);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}