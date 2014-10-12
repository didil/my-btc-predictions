'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PredictionSchema = new Schema({
  value: Number,
  date: Date,
  user:  { type:  Schema.Types.ObjectId, ref: 'User' }
});

/**
 * Validations
 */

PredictionSchema
  .path('value')
  .validate(function(value) {
    return value >= 0;
  }, 'Price must be positive');

module.exports = mongoose.model('Prediction', PredictionSchema);