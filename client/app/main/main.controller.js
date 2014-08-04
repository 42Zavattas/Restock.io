'use strict';

angular.module('restockApp')
  .controller('MainCtrl', function ($scope, $routeParams) {

    $scope.rule = { input: $routeParams.q || '' };

    $scope.isValid = function (str) {
      var res = ruleparser.test(str);
      if (res.valid === false) {
        $scope.errorMsg = res.msg;
        return false;
      }
      $scope.errorMsg = '';
      return true;
    };

  });
