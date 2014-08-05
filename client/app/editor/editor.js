'use strict';

angular.module('restockApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/editor', {
        templateUrl: 'app/editor/editor.html',
        controller: 'EditorCtrl'
      });
  });
