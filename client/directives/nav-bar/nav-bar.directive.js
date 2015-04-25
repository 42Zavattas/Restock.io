'use strict';

angular.module('restock')
  .directive('navBar', function () {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'directives/nav-bar/nav-bar.html'
    };
  });
