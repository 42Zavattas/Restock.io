'use strict';

angular.module('restock')
  .controller('AccountCtrl', function ($scope, $http, Auth, stocks, Socket) {

    var vm = this;

    angular.extend(vm, {

      errors: {},
      stocks: stocks,

      deleteStock: function (stock) {
        if (!stock._id) { return ; }
        $http.delete('/api/stocks/' + stock._id);
      },

      changePassword: function () {
        vm.submitted = true;
        if (form.$valid) {
          Auth.changePassword(vm.user.oldPassword, vm.user.newPassword)
          .then(function () {
            vm.message = 'Password successfully changed.';
            vm.user.success = true;
            vm.user.newPassword = '';
            vm.user.oldPassword = '';
          })
          .catch(function () {
            form.password.$setValidity('mongoose', false);
            $scope.message = 'Incorrect password';
          });
        }
      }

    });

    Socket.syncModel('Stock', vm.stocks, 'user', Auth.getUser()._id);

    $scope.$on('$destroy', function () {
      Socket.unsyncModel('Stock');
    });

  });
