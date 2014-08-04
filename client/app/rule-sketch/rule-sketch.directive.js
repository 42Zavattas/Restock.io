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

        var container = element.find('.rs-sketch-container');
        var mock = {};

        function draw() {
          console.log('drawing');
        }

        scope.$watch('rule.input', function () {
          draw();
        });

      }
    };
  });
