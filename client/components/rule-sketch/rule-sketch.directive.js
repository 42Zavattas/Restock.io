'use strict';

angular.module('restockApp')
  .directive('ruleSketch', function () {
    return {
      templateUrl: 'components/rule-sketch/rule-sketch.html',
      restrict: 'E',
      scope: {
        rule: '='
      },
      link: function (scope) {
        
      }
    };
  });
