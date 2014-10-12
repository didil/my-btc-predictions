'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var moment = require('moment');
var Prediction = require('./prediction.model');

describe('GET /api/predictions', function () {

  before(function (done) {
    Prediction.remove().exec().then(function () {
      done();
    });
  });

  beforeEach(function (done) {
    var attrsList = [];
    for (var i = 0; i < 6; i++) {
      var initDate = moment().add(1, 'month').startOf('month');

      var attrs = {date: initDate.add(i, 'month'), value: 300 + i };
      attrsList.push(attrs);
    }

    Prediction.create(attrsList, function (err) {
      if (err) throw err;
      done();
    });
  });

  it('should respond with 6 next predictions', function (done) {
    request(app)
      .get('/api/predictions')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) return done(err);
        var predictions = res.body;
        predictions.length.should.eql(6);
        done();
      });
  });

  afterEach(function (done) {
    Prediction.remove().exec().then(function () {
      done();
    });
  });
});

describe('POST /api/predictions', function () {
  var date = '2014-12-01';
  var value = 180;

  before(function (done) {
    Prediction.remove().exec().then(function () {
      done();
    });
  });

  it('creates new prediction', function (done) {
    request(app)
      .post('/api/predictions')
      .send({ value: value, date: date })
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) return done(err);
        var prediction = new Prediction(res.body);
        prediction.date.should.eql(new Date(date));
        prediction.value.should.eql(value);

        Prediction.find({},function(err,predictions){
          predictions.length.should.eql(1);
          predictions[0].date.should.eql(new Date(date));
          predictions[0].value.should.eql(value);

          done();
        });
      });
  });

  afterEach(function (done) {
    Prediction.remove().exec().then(function () {
      done();
    });
  });
});
