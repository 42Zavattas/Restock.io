'use strict';

var Stock = require('./stock.model');

exports.register = function (socket) {

  Stock.schema.post('save', function (doc) {
    socket.emit('Stock:save', doc);
  });

  Stock.schema.post('remove', function (doc) {
    socket.emit('Stock:remove', doc);
  });

};
