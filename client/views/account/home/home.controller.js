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
      }

    });

    Socket.syncModel('Stock', vm.stocks, 'user', Auth.getUser()._id);

    $scope.$on('$destroy', function () {
      Socket.unsyncModel('Stock');
    });

  });
