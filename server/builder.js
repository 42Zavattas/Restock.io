'use strict';

var express = require('express');
var router = express.Router();

router.get('/:rule', build);

var ruleparser = require('../client/parser/ruleparser.js');
var types = require('./types.js');

function getElementOfType (type) {
  if (type.toLowerCase() === 's') {
    return types.getString(type === type.toUpperCase());
  }
  else if (type === 'n') {
    return types.getNumber();
  }
  else if (type === 'b') {
    return types.getBoolean();
  }
  else if (type === 'd') {
    return types.getDate();
  }
}

function recurse (lex) {
  if (lex.type !== 'array' && lex.type !== 'object') {
    return getElementOfType(lex.type);
  }
  else if (lex.type === 'array') {
    var container = [];
    for (var i = 0; i < lex.nbChilds; i++) {
      container.push(recurse(lex.child));
    }
    return container;
  }
  var object = {};
  for (var i = 0; i < lex.props.length; i++) {
    object[lex.props[i].name] = recurse(lex.props[i].val);
  }
  return object;
}

function build (req, res) {
  var test = ruleparser.test(req.params.rule);
  if (test.valid === false) {
    return res.send(400, test);
  }
  var err = {};
  var lex = ruleparser.lex(req.params.rule, err);
  if (err.msg) {
    return res.send(400, err);
  }
  var result = recurse(lex);
  return res.send(200, result);
}

function handleError(res, err) {
  return res.send(500, err);
}

module.exports = router;
