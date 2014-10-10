'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PriceSchema = new Schema({
  value: Number,
  date: Date
});

module.exports = mongoose.model('Price', PriceSchema);