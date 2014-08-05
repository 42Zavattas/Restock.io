'use strict';

var Chance = require('chance');
var chance = new Chance();

exports.getWord = function () {
  return chance.word();
}

exports.getParagraph = function () {
  return chance.paragraph();
}

exports.getNumber = function () {
  return chance.integer();
}

exports.getEmail = function () {
  return chance.email();
}

exports.getAddress = function () {
  return chance.address();
}

exports.getPhone = function () {
  return chance.phone();
}

exports.getColor = function () {
  return chance.color();
}

exports.getBoolean = function () {
  return chance.bool();
}

exports.getDate = function () {
  return chance.date();
}
