/**
 * Socket.io configuration
 */

'use strict';

var config = require('./environment');

function onDisconnect(socket) {
}

function printClientIp (socket, action) {
  if (socket.handshake.address) {
    console.info('[%s] %s', socket.handshake.address, action);
  } else {
    console.info('[%s:%s] %s', socket.handshake.headers['x-forwarded-for'], socket.handshake.headers['x-forwarded-port'], action);
  }
}

function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', function (data) {
    printClientIp(socket);
    console.info('%s', JSON.stringify(data, null, 2));
  });

  // Insert sockets below
  require('../api/stock/stock.socket').register(socket);
}

module.exports = function (socketio) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  socketio.use(require('socketio-jwt').authorize({
    secret: config.secrets.session,
    handshake: true
  }));

  socketio.on('connection', function (socket) {
    socket.address = socket.handshake.address !== null ?
            socket.handshake.address.address + ':' + socket.handshake.address.port :
            process.env.DOMAIN;

    socket.connectedAt = new Date();

    socket.on('disconnect', function () {
      onDisconnect(socket);
      printClientIp(socket, 'DISCONNECT');
    });

    onConnect(socket);
    printClientIp(socket, 'CONNECT');
  });
};
