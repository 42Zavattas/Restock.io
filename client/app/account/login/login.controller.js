'use strict';

angular.module('restockApp')
  .controller('LoginCtrl', function ($scope, Auth, $window) {

    $scope.user = {};
    $scope.errors = {};

    $scope.login = function ($event, form) {

      $event.preventDefault();
      $scope.submitted = true;

      if (form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then(function () {
          $window.location.href = '/';
        })
        .catch(function (err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function (provider) {
      $window.location.href = '/auth/' + provider;
    };

  });
