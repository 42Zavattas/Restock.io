/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Dico = require('./dico.model');

exports.register = function(socket) {
  Dico.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Dico.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('dico:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('dico:remove', doc);
}