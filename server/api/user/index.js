'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./user.controller');
var auth = require('../../auth/auth.service');

router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/:id', auth.isAuthenticated(), controller.show);

router.post('/', controller.create);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);

module.exports = router;
