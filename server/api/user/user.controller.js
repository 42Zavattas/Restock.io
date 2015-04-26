'use strict';

var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var User = require('./user.model');

function handleError (res, err) {
  return res.status(500).send(err);
}

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  User.create(req.body, function (err, user) {
    if (err) { return handleError(res, err); }
    var token = jwt.sign(
      { _id: user._id },
      config.secrets.session,
      { expiresInMinutes: 60 * 5 }
    );
    res.status(201).json({ token: token, user: user });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.status(401).end();
    res.status(200).json(user.profile);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function (req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if (user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function (err) {
        if (err) { return handleError(res, err); }
        res.status(200).end();
      });
    } else {
      res.status(403).end();
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function (err, user) {
    if (err) return next(err);
    if (!user) return res.status(401);
    res.status(200).json(user);
  });
};
