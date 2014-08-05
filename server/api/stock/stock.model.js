'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StockSchema = new Schema({
  name      : String,
  desc      : String,
  code      : String,
  rule      : String,
  result    : String,
  user      : { type: Schema.ObjectId, ref: 'User' },
  active    : { type: Boolean, default: true, select: false },
  created_at: Date,
  updated_at: Date
});

StockSchema
  .pre('save', function(next) {
    var now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
      this.created_at = now;
    }
    next();
  });

module.exports = mongoose.model('Stock', StockSchema);
