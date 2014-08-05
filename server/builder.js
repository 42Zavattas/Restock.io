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
  else if (type === 'array') {
    
  }
  else if (type === 'object') {
    
  }
  else if (type === 'b') {
    return types.getBoolean();
  }
  else if (type === 'd') {
    return types.getDate();
  }
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
  console.log(types.getString(false));
  console.log(lex);
  return res.json(200, lex);
}

function handleError(res, err) {
  return res.send(500, err);
}

module.exports = router;
