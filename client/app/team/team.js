'use strict';

angular.module('restockApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/team', {
        templateUrl: 'app/team/team.html',
        controller: 'TeamCtrl'
      });
  });
