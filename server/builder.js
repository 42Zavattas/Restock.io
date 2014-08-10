'use strict';

var express = require('express');
var router = express.Router();

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
    'c': types.getCharacter,
    'i': types.getIp,
    't': types.getTimestamp
  };

  return indexes[type]();
}

function recurse (lex) {
  var i;
  if (lex.type !== 'array' && lex.type !== 'object') {
    return getElementOfType(lex.type);
  }
  else if (lex.type === 'array') {
    var container = [];
    for (i = 0; i < lex.nbChilds; i++) {
      container.push(recurse(lex.child));
    }
    return container;
  }
  var object = {};
  for (i = 0; i < lex.props.length; i++) {
    object[lex.props[i].name] = recurse(lex.props[i].val);
  }
  return object;
}

function build (req, res) {
  res.header('Access-Control-Allow-Origin', '*');

  var test = ruleparser.test(req.params.rule);
  if (test.valid === false) {
    return res.status(400).send(test);
  }
  var err = {};
  var lex = ruleparser.lex(req.params.rule, err);
  if (err.msg) {
    return res.status(400).send(err);
  }
  var result = recurse(lex);
  return res.status(200).send(result);
}

router.get('/:rule', build);

function handleError(res, err) {
  return res.status(500).send(err);
}

router.getStringified = function (rule) {
  var test = ruleparser.test(rule);
  if (test.valid === false) {
    return test;
  }
  var err = {};
  var lex = ruleparser.lex(rule, err);
  if (err.msg) {
    return err;
  }
  return JSON.stringify(recurse(lex));
}

module.exports = router;
