'use strict';

angular.module('restockApp')
  .controller('MainCtrl', function ($scope, $routeParams) {

    /* --> could be nice
    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
    */

    ruleparser.parse = function (str) {
      return 'OK parsed';
    };

    ruleparser.test= function (str) {
    if (str === '5{name:s}') {
      return {
        valid: true
      };
    }
      return {
        valid: false,
        msg: 'Invalid character'
      };
    };

    $scope.rule = { input: $routeParams.q || '' };

    $scope.$watch('rule.input', function () {
      $scope.rule.output = ruleparser.parse($scope.rule.input);
    });

    $scope.isValid = function (str) {
      var res = ruleparser.test(str);
      if (res.valid === false) {
        $scope.errorMsg = res.msg;
        return false;
      }
      return true;
    };

  });
