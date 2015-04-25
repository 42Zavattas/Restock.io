'use strict';

angular.module('restock')
  .controller('SignupCtrl', function ($scope, Auth, $location) {

    var vm = this;

    angular.extend(vm, {
      user: {},
      errors: {},
      register: function (form) {

        vm.submitted = true;

        if (form.$valid) {
          Auth.signup(vm.user)
          .then(function () {
            $location.path('/');
          })
          .catch(function (err) {
            err = err.data;
            $scope.errors = {};

            angular.forEach(err.errors, function (error, field) {
              form[field].$setValidity('mongoose', false);
              vm.errors[field] = error.message;
            });
          });
        }

      }
    });

  });
