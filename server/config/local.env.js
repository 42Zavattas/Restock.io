'use strict';

// Environment variables that grunt will set when the server starts locally. Use for your api keys, secrets, etc.
// You will need to set these on the server you deploy to.
//
// This file should not be tracked by git.

module.exports = {
  DOMAIN: 'http://localhost:9000',
  SESSION_SECRET: "restock-secret",

  GOOGLE_ID: '242806159473-sf1872964so50usa1f7ovg4ps178i2sd.apps.googleusercontent.com',
  GOOGLE_SECRET: 'nCU6pTvFmgBMmkqn81xazt4A',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
