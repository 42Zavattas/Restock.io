'use strict';

angular.module('restockApp')
  .controller('AccountCtrl', function ($scope, Restangular, Auth) {

    $scope.errors = {};

    Restangular.one('rules', 'mine').getList().then(function (res) {
      console.log(res);
    });


    $scope.changePassword = function (form) {
      $scope.submitted = true;
      if (form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then(function () {
          $scope.message = 'Password successfully changed.';
        })
        .catch(function () {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};

  });
