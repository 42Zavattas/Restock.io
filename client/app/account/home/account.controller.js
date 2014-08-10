'use strict';

angular.module('restockApp')
  .controller('AccountCtrl', function ($scope, $http, socket, Auth, stocks) {

    $scope.me = $scope.$root.ui.currentUser;
    $scope.stocks = stocks;
    $scope.controls = {
      newDomain: ''
    };

    console.log($scope.me);

    socket.syncUpdates('stock', $scope.stocks, 'user', $scope.me._id);

    $scope.deleteStock = function (stock) {
      if (!stock._id) { return; }
      $http.delete('/api/stocks/' + stock._id);
    };

    $scope.alreadyAdded = function (domain) {
      if (!$scope.me.domains.length) {
        return false;
      }
      return _.pluck($scope.me.domains, 'name').indexOf(domain) !== -1 || !domain;
    };

    $scope.addDomain = function (domain) {
      if ($scope.alreadyAdded(domain)) { return; };
      $scope.me.domains.push({ name: domain, calls: 0, active: true });
      $http.put('/api/users/me', { domains: $scope.me.domains });
      $scope.controls.newDomain = '';
    };

    $scope.deleteDomain = function (domain) {
      $scope.me.domains = _.pull($scope.me.domains, domain);
      $http.put('/api/users/me', { domains: $scope.me.domains });
    };

    $scope.changeState = function (domain) {
      domain.active = !domain.active;
      $http.put('/api/users/me', { domains: $scope.me.domains });
    };

  });
