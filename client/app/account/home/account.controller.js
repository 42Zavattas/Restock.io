'use strict';

angular.module('restockApp')
  .controller('AccountCtrl', function ($scope, $http, Auth, stocks) {

    $scope.errors = {};

    $scope.stocks = stocks;

    $scope.changePassword = function (form) {
      $scope.submitted = true;
      if (form.$valid) {
        Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
        .then(function () {
          $scope.message = 'Password successfully changed.';
          $scope.user.success = true;
          $scope.user.newPassword = '';
          $scope.user.oldPassword = '';
        })
        .catch(function () {
          form.password.$setValidity('mongoose', false);
          $scope.message = 'Incorrect password';
        });
      }
		};

  });
