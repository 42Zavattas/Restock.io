'use strict';

angular.module('restock')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/editor', {
        templateUrl: 'views/editor/editor.html',
        controller: 'EditorCtrl',
        controllerAs: 'vm'
      });
  });
