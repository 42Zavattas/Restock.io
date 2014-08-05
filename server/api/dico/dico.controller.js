'use strict';

var _ = require('lodash');
var Dico = require('./dico.model');

// Get list of dicos
exports.index = function(req, res) {
  Dico.find(function (err, dicos) {
    if(err) { return handleError(res, err); }
    return res.json(200, dicos);
  });
};

// Get a single dico
exports.show = function(req, res) {
  Dico.findById(req.params.id, function (err, dico) {
    if(err) { return handleError(res, err); }
    if(!dico) { return res.send(404); }
    return res.json(dico);
  });
};

// Creates a new dico in the DB.
exports.create = function(req, res) {
  Dico.create(req.body, function(err, dico) {
    if(err) { return handleError(res, err); }
    return res.json(201, dico);
  });
};

// Updates an existing dico in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Dico.findById(req.params.id, function (err, dico) {
    if (err) { return handleError(res, err); }
    if(!dico) { return res.send(404); }
    var updated = _.merge(dico, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, dico);
    });
  });
};

// Deletes a dico from the DB.
exports.destroy = function(req, res) {
  Dico.findById(req.params.id, function (err, dico) {
    if(err) { return handleError(res, err); }
    if(!dico) { return res.send(404); }
    dico.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
