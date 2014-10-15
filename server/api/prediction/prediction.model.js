'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PredictionSchema = new Schema({
  value: {type:Number , required:true},
  date: {type:Date ,  required:true},
  user:  { type:  Schema.Types.ObjectId, ref: 'User' }
});

/**
 * Indexes
 */

PredictionSchema.index({user: 1, date: 1}, {unique: true});

/**
 * Validations
 */

PredictionSchema
  .path('value')
  .validate(function(value) {
    return value >= 0;
  }, 'Price must be positive');

module.exports = mongoose.model('Prediction', PredictionSchema);