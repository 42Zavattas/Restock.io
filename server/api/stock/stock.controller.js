'use strict';

var _ = require('lodash');
var Stock = require('./stock.model');
var types = require('../../services/types.js');
var builder = require('../../services/builder.js');

function handleError (res, err) {
  return res.status(500).send(err);
}

// Get list of stocks
exports.index = function (req, res) {
  Stock.find({}, '+active').exec(function (err, stocks) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(stocks);
  });
};

// Get a single stock
exports.show = function (req, res) {
  Stock.findById(req.params.id, function (err, stock) {
    if (err) { return handleError(res, err); }
    if (!stock || stock.active === false) { return res.send(404); }
    if (stock.user !== req.user._id && req.user.role !== 'admin') {
      return res.status(401);
    }
    return res.status(200).json(stock);
  });
};

// Return a saved stock
exports.getSaved = function (req, res) {
  var url = '/' + req.params.user + '/' + req.params.rand;
  Stock.findOne({
    url: url,
    active: true
  }).exec(function (err, stock) {
    if (err) { return handleError(res, err); }
    if (!stock) { return res.send(404); }
    stock.calls++;
    stock.save();
    return res.status(200).send(JSON.parse(stock.content));
  });
};

// Get all stocks of the current user
exports.mine = function (req, res) {
  Stock.find({
    user  : req.user._id,
    active: true
  }).exec(function (err, stocks) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(stocks);
  });
};

exports.create = function (req, res) {
  req.body.user = req.user._id;
  req.body.url = '/' + req.user._id.toString().substr(req.user._id.toString().length - 5) + '/' + types.getWordCode();
  req.body.content = builder.getStringified(req.body.rule);
  Stock.create(req.body, function (err, stock) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(stock);
  });
};

exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Stock.findById(req.params.id, function (err, stock) {
    if (err) { return handleError(res, err); }
    if (!stock) { return res.status(404); }
    if (stock.user !== req.user._id && req.user.role !== 'admin') {
      return res.status(401);
    }
    var updated = _.merge(stock, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(stock);
    });
  });
};

exports.destroy = function (req, res) {
  Stock.findById(req.params.id, function (err, stock) {
    if (err) { return handleError(res, err); }
    if (!stock) { return res.status(404); }
    if (!stock.user.equals(req.user._id) && req.user.role !== 'admin') {
      return res.status(401);
    }
    stock.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204);
    });
  });
};
