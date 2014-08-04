'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RuleSchema = new Schema({
  name      : String,
  desc      : String,
  code      : String,
  rule      : String,
  result    : String,
  user      : { type: Schema.ObjectId, ref: 'User' },
  active    : { type: Boolean, select: false },
  created_at: Date,
  updated_at: Date
});

RuleSchema
  .pre('save', function(next) {
    now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
      this.created_at = now;
    }
    next();
  });

module.exports = mongoose.model('Rule', RuleSchema);
