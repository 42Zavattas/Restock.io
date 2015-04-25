'use strict';

angular.module('restock')
  .controller('LoginCtrl', function ($scope, $window, Auth) {

    var vm = this;

    angular.extend(vm, {
      user: {},
      errors: {},

      login: function ($event, form) {

        $event.preventDefault();
        vm.submitted = true;

        if (form.$valid) {
          Auth.login(vm.user)
          .then(function () {
            $window.location.href = '/';
          })
          .catch(function (err) {
            vm.errors.other = err.message;
          });
        }

      }
    });

  });
