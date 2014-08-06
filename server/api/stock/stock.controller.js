'use strict';

var _ = require('lodash');
var Stock = require('./stock.model');
var types = require('../../types.js');
var builder = require('../../builder.js');

// Get list of stocks
exports.index = function(req, res) {
  Stock.find({}, '+active').exec(function (err, stocks) {
    if(err) { return handleError(res, err); }
    return res.json(200, stocks);
  });
};

// Get a single stock
exports.show = function(req, res) {
  Stock.findById(req.params.id, function (err, stock) {
    if(err) { return handleError(res, err); }
    if(!stock || stock.active === false) { return res.send(404); }
    if (stock.user !== req.user._id && req.user.role !== 'admin') {
      return res.send(401);
    }
    return res.json(stock);
  });
};

// Return a saved stock
exports.getSaved = function(req, res) {
  var url = '/' + req.params.user + '/' + req.params.rand;
  Stock.findOne({
    url: url
  }).exec(function (err, stock) {
    if(err) { return handleError(res, err); }
    if(!stock || stock.active === false) { return res.send(404); }
    stock.calls++;
    stock.save();
    return res.send(200, JSON.parse(stock.content));
  });
};

// Get all stocks of the current user
exports.mine = function(req, res) {
  Stock.find({
    user  : req.user._id,
    active: true
  }).exec(function (err, stocks) {
    if(err) { return handleError(res, err); }
    return res.json(200, stocks);
  });
};

exports.create = function(req, res) {
  req.body.user = req.user._id;
  req.body.url = '/' + req.user._id.toString().substr(req.user._id.toString().length - 5) + '/' + types.getWordCode();
  req.body.content = builder.getStringified(req.body.rule);
  Stock.create(req.body, function(err, stock) {
    if(err) { return handleError(res, err); }
    return res.json(201, stock);
  });
};

exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Stock.findById(req.params.id, function (err, stock) {
    if (err) { return handleError(res, err); }
    if(!stock) { return res.send(404); }
    if (stock.user !== req.user._id && req.user.role !== 'admin') {
      return res.send(401);
    }
    var updated = _.merge(stock, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, stock);
    });
  });
};

exports.destroy = function(req, res) {
  Stock.findById(req.params.id, function (err, stock) {
    if(err) { return handleError(res, err); }
    if(!stock) { return res.send(404); }
    if (!stock.user.equals(req.user._id) && req.user.role !== 'admin') {
      return res.send(401);
    }
    if (req.user.role === 'admin') {
      stock.remove(function(err) {
        if(err) { return handleError(res, err); }
        return res.send(204);
      });
    }
    else {
      stock.active = false;
      stock.save(function(err) {
        if(err) { return handleError(res, err); }
        return res.send(204);
      });
    }
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
