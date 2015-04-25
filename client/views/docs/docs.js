'use strict';

angular.module('restock')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/docs', {
        templateUrl: 'views/docs/docs.html',
        controller: 'DocsCtrl',
        controllerAs: 'vm'
      });
  });
