'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PredictionSchema = new Schema({
  value: {type:Number , required:true},
  date: {type:Date ,  required:true},
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

/**
 * Pre-save hook
 */

// no prediction for same date by the same user
PredictionSchema.pre("save",function(next, done) {
  var self = this;
  mongoose.models["Prediction"].findOne({user : self.user, date: self.date},function(err, prediction) {
    if(err) {
      done(err);
    } else if(prediction) {
      self.invalidate("date","date must be unique for the same user");
      done(new Error("date must be unique for the same user"));
    } else {
      done();
    }
  });
  next();
});

module.exports = mongoose.model('Prediction', PredictionSchema);