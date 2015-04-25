'use strict';

module.exports = {
  ip: process.env.IP || undefined,
  mongo: {
    uri: 'mongodb://localhost/restock'
  }
};
