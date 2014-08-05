'use strict';

var Chance = require('chance');
var chance = new Chance();

exports.getString = function (large) {
  if (large) {
    return chance.paragraph();
  }
  return chance.word();
}

exports.getNumber = function () {
  return chance.integer();
}

exports.getBoolean = function () {
  return chance.bool();
}

exports.getDate = function () {
  return chance.date();
}
