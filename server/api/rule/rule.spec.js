'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/rules', function() {

  it('should respond with a 401 error', function(done) {
    request(app)
      .get('/api/rules')
      .expect(401)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});
