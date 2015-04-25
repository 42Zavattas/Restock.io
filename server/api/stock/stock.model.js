'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StockSchema = new Schema({
  name      : String,
  desc      : String,
  url       : String,
  rule      : String,
  content   : String,
  calls     : { type: Number, default: 0 },
  user      : { type: Schema.ObjectId, ref: 'User' },
  active    : { type: Boolean, default: true, select: false },
  created_at: Date,
  updated_at: Date
});

StockSchema
  .pre('save', function (next) {
    var now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
      this.created_at = now;
    }
    next();
  });

module.exports = mongoose.model('Stock', StockSchema);
