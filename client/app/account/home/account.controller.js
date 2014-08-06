'use strict';

angular.module('restockApp')
  .controller('AccountCtrl', function ($scope, $http, Auth) {

    $scope.errors = {};

    $http.get('api/stocks/mine').then(function (res) {
      $scope.stocks = res.data;
    });

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
