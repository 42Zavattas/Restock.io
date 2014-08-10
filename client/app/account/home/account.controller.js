'use strict';

angular.module('restockApp')
  .controller('AccountCtrl', function ($scope, $http, socket, Auth, stocks) {

    $scope.me = $scope.$root.ui.currentUser;
    $scope.stocks = stocks;
    $scope.controls = {
      newOrigin: ''
    };

    console.log($scope.me);

    socket.syncUpdates('stock', $scope.stocks, 'user', $scope.me._id);

    $scope.deleteStock = function (stock) {
      if (!stock._id) { return; }
      $http.delete('/api/stocks/' + stock._id);
    };

    $scope.alreadyAdded = function (origin) {
      if (!$scope.me.origins.length) {
        return false;
      }
      return _.pluck($scope.me.origins, 'name').indexOf(origin) !== -1 || !origin;
    };

    $scope.addOrigin = function (origin) {
      if ($scope.alreadyAdded(origin)) { return; };
      $scope.me.origins.push({ name: origin, calls: 0, active: true });
      $http.put('/api/users/me', { origins: $scope.me.origins });
      $scope.controls.newOrigin = '';
    };

    $scope.deleteOrigin = function (origin) {
      $scope.me.origins = _.pull($scope.me.origins, origin);
      $http.put('/api/users/me', { origins: $scope.me.origins });
    };

    $scope.changeState = function (origin) {
      origin.active = !origin.active;
      $http.put('/api/users/me', { origins: $scope.me.origins });
    };

  });
