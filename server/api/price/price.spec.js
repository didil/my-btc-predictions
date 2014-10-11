'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var moment = require('moment');
var Price = require('./price.model');

describe('GET /api/prices', function () {


  beforeEach(function (done) {
    Price.remove().exec().then(function () {
      done();
    });
  });

  beforeEach(function (done) {
    var attrsList = [];
    for (var i = 0; i < 12; i++) {
      var initDate = moment().subtract(12, 'months').startOf('month').add(1, 'month');

      var attrs = {date: initDate.add(i, 'month'), value: 300 + i };
      attrsList.push(attrs);
    }

    Price.create(attrsList, function (err) {
      if (err) throw err;
      done();
    });
  });

  it('should respond with 12 last prices', function (done) {
    request(app)
      .get('/api/prices')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) return done(err);
        var prices = res.body;
        prices.length.should.eql(12);
        done();
      });
  });

  afterEach(function (done) {
    Price.remove().exec().then(function () {
      done();
    });
  });


});
