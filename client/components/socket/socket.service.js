/* global io */
'use strict';

angular.module('restockApp')
  .factory('socket', function($cookieStore, socketFactory) {

    // socket.io now auto-configures its connection when we ommit a connection url
    var ioSocket = io('', {
      'query': 'token=' + $cookieStore.get('token'),
      path: '/socket.io-client'
      //'reconnection delay': 1000,
      //'reconnection limit': 1000,
      //'max reconnection attempts': 'Infinity'
    });

    var socket = socketFactory({
      ioSocket: ioSocket
    });

    return {
      socket: socket,

      /**
       * Register listeners to sync an array with updates on a model
       *
       * Takes the array we want to sync, the model name that socket updates are sent from,
       * and an optional callback function after new items are updated.
       *
       * @param {String} modelName
       * @param {Array} array
       * @param {Function} cb
       */
      syncUpdates: function (modelName, array, prop, equal, cb) {
        cb = cb || angular.noop;

        var event;
        /**
         * Syncs item creation/updates on 'model:save'
         */
        socket.on(modelName + ':save', function (item) {
          if (item[prop] !== equal) {
            return cb(event, null, []);
          }
          if (modelName === 'stock' && item.active === false) {
            event = 'deleted';
            _.remove(array, {_id: item._id});
            return cb(event, item, array);
          }
          var oldItem = _.find(array, {_id: item._id});
          var index = array.indexOf(oldItem);
          event = 'created';

          // replace oldItem if it exists
          // otherwise just add item to the collection
          if (oldItem) {
            array.splice(index, 1, item);
            event = 'updated';
          } else {
            array.push(item);
          }

          cb(event, item, array);
        });

        /**
         * Syncs removed items on 'model:remove'
         */
        socket.on(modelName + ':remove', function (item) {
          event = 'deleted';
          _.remove(array, {_id: item._id});
          cb(event, item, array);
        });
      },

      /**
       * Removes listeners for a models updates on the socket
       *
       * @param modelName
       */
      unsyncUpdates: function (modelName) {
        socket.removeAllListeners(modelName + ':save');
        socket.removeAllListeners(modelName + ':remove');
      }
    };
  });
