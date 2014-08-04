'use strict';

angular.module('restockApp')
  .directive('ruleSketch', function () {
    return {
      templateUrl: 'app/rule-sketch/rule-sketch.html',
      restrict: 'E',
      scope: {
        rule: '='
      },
      link: function (scope, element, attrs) {
        scope.$watch('rule.input', function () {
          console.log(scope.rule);
        });
      }
    };
  });
