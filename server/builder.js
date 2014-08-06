'use strict';

var express = require('express');
var router = express.Router();

router.get('/:rule', build);

var ruleparser = require('../client/parser/ruleparser.js');
var types = require('./types.js');

function getElementOfType (type) {

  var indexes = {
    's': types.getWord,
    'S': types.getParagraph,
    'n': types.getLittleNumber,
    'N': types.getNumber,
    'b': types.getBoolean,
    'd': types.getDate,
    'e': types.getEmail,
    'p': types.getPhone,
    'a': types.getAddress,
    'c': types.getColor,
  };

  return indexes[type]();
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

router.getStringified = function (rule) {
  var test = ruleparser.test(rule);
  if (test.valid === false) {
    return test;
  }
  var err = {};
  var lex = ruleparser.lex(rule, err);
  if (err.msg) {
    return res.send(400, err);
  }
  var result = recurse(lex);
  return JSON.stringify(result);;
}

module.exports = router;
