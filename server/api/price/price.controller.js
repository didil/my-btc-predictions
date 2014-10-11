'use strict';

var _ = require('lodash');
var moment = require('moment');
var Price = require('./price.model');


exports.index = function (req, res) {
  Price.find({date: {'$gte': moment().subtract(12, 'months')}}).sort('date').exec(function (err, prices) {
    if (err) {
      return handleError(res, err);
    }

    return res.json(200, prices);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}