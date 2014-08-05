'use strict';

var _ = require('lodash');
var Stock = require('./stock.model');

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
    if(!stock || !stock.active) { return res.send(404); }
    if (stock.user !== req.user._id && req.user.role !== 'admin') {
      return res.send(401);
    }
    return res.json(stock);
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
    if (stock.user !== req.user._id && req.user.role !== 'admin') {
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
      stock.update(function(err) {
        if(err) { return handleError(res, err); }
        return res.send(204);
      });
    }
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
