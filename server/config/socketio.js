/**
 * Socket.io configuration
 */

'use strict';

var config = require('./environment');

// When the user disconnects.. perform this
function onDisconnect(socket) {
}

function printClientIp (socket) {
  if (socket.address) {
    console.info('[%s] ', socket.address);
  }
  else {
    console.info('[%s:%s] ', socket.handshake.headers['x-forwarded-for'], socket.handshake.headers['x-forwarded-port']);
  }
}

// When the user connects.. perform this
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

  // We can authenticate socket.io users and access their token through socket.handshake.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));

  socketio.on('connection', function (socket) {
    socket.address = socket.handshake.address !== null ?
            socket.handshake.address.address + ':' + socket.handshake.address.port :
            process.env.DOMAIN;

    socket.connectedAt = new Date();

    // Call onDisconnect.
    socket.on('disconnect', function () {
      onDisconnect(socket);
      printClientIp(socket);
      console.info('DISCONNECTED');
    });

    // Call onConnect.
    onConnect(socket);
    printClientIp(socket);
    console.info('CONNECTED');
  });
};
