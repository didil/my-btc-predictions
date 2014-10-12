'use strict';

var should = require('should');
var app = require('../../app');
var Prediction = require('./prediction.model');
var User = require('../user/user.model');

describe('Prediction Model', function () {
  before(function (done) {
    Prediction.remove().exec().then(function () {
      User.remove().exec().then(function () {
        done();
      });
    });
  });

  afterEach(function (done) {
    Prediction.remove().exec().then(function () {
      User.remove().exec().then(function () {
        done();
      });
    });
  });

  describe("prediction date unique", function () {
    var user = new User({
      provider: 'local',
      name: 'Fake User',
      email: 'test@test.com',
      password: 'password'
    });

    var prediction = new Prediction({
      date: '2014-01-12',
      value: 180
    });

    before(function (done) {
      user.save(function (err) {
        if (err) {throw err};

        prediction.user = user;
        prediction.save(function (err) {
          if (err) {throw err};
          done();
        })
      });
    });

    it('should fail when saving a prediction for the same date', function (done) {
      prediction.save(function () {
        var otherPrediction = new Prediction(prediction);
        otherPrediction.save(function (err) {
          should.exist(err);
          done();
        });
      });
    });

  });


});
