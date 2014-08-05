'use strict';

var express = require('express');
var ruleparser = require('../client/parser/ruleparser.js');
var router = express.Router();

router.get('/:rule', build);

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
  return res.json(200, lex);
}

module.exports = router;
