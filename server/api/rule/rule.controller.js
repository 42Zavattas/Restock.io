'use strict';

var _ = require('lodash');
var Rule = require('./rule.model');

// Get list of rules
exports.index = function(req, res) {
  Rule.find({}, '+active').exec(function (err, rules) {
    if(err) { return handleError(res, err); }
    return res.json(200, rules);
  });
};

// Get a single rule
exports.show = function(req, res) {
  Rule.findById(req.params.id, function (err, rule) {
    if(err) { return handleError(res, err); }
    if(!rule) { return res.send(404); }
    if (rule.user !== req.user._id && req.user.role !== 'admin') {
      return res.send(401);
    }
    return res.json(rule);
  });
};

// Get all rules of the current user
exports.mine = function(req, res) {
  Rule.find({
    user: req.user._id
  }).exec(function (err, rules) {
    if(err) { return handleError(res, err); }
    return res.json(200, rules);
  });
};

exports.create = function(req, res) {
  req.body.user = req.user._id;
  Rule.create(req.body, function(err, rule) {
    if(err) { return handleError(res, err); }
    return res.json(201, rule);
  });
};

exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Rule.findById(req.params.id, function (err, rule) {
    if (err) { return handleError(res, err); }
    if(!rule) { return res.send(404); }
    if (rule.user !== req.user._id && req.user.role !== 'admin') {
      return res.send(401);
    }
    var updated = _.merge(rule, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, rule);
    });
  });
};

exports.destroy = function(req, res) {
  Rule.findById(req.params.id, function (err, rule) {
    if(err) { return handleError(res, err); }
    if(!rule) { return res.send(404); }
    if (rule.user !== req.user._id && req.user.role !== 'admin') {
      return res.send(401);
    }
    rule.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
