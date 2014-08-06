'use strict';

var Chance = require('chance');
var chance = new Chance();

exports.getWord = function () {
  return chance.word();
}

exports.getParagraph = function () {
  return chance.paragraph();
}

exports.getLittleNumber = function () {
  return chance.integer({min: 0, max: 100});
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

//not implemented yet
exports.getEmail = function () {
  return chance.email();
}

exports.getAddress = function () {
  return chance.address();
}

exports.getPhone = function () {
  return chance.phone();
}

exports.getCharacter = function () {
  return chance.character({alpha: true});
}

exports.getIp = function () {
  return chance.ip();
}

exports.getTimestamp = function () {
  return chance.timestamp();
}

//Generate utility
exports.getWordCode = function () {
  return chance.word({syllables: 3});
}
