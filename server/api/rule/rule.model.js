'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RuleSchema = new Schema({
  name  : String,
  desc  : String,
  code  : String,
  rule  : String,
  result: String,
  user  : { type: Schema.ObjectId, ref: 'User' },
  active: { type: Boolean, select: false }
});

module.exports = mongoose.model('Rule', RuleSchema);
