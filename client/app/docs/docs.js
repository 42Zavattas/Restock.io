'use strict';

angular.module('restockApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/docs', {
        templateUrl: 'app/docs/docs.html',
        controller: 'DocsCtrl'
      });
  });
