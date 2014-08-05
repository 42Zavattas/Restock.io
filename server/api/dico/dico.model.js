'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DicoSchema = new Schema({
  content: String,
  large  : Boolean
});

module.exports = mongoose.model('Dico', DicoSchema);
