'use strict';

angular.module('restock')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/team', {
        templateUrl: 'views/team/team.html',
        controller: 'TeamCtrl',
        controllerAs: 'vm'
      });
  });
