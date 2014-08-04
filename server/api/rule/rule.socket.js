/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Rule = require('./rule.model');

exports.register = function(socket) {
  Rule.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Rule.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('rule:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('rule:remove', doc);
}