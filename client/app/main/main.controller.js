'use strict';

angular.module('restockApp')
  .controller('MainCtrl', function ($scope, $routeParams, $location) {

    $scope.domain = $location.absUrl();
    $scope.rule = { input: $routeParams.q || '', lexed: null };

    $scope.isValid = function (str) {
      var res = ruleparser.test(str), err = {};
      if (res.valid === false) {
        $scope.errorMsg = res.msg;
        return false;
      }
      res = ruleparser.lex(str, err);
      if (err.msg) {
        $scope.errorMsg = err.msg;
        return false;
      }
      $scope.errorMsg = '';
      $scope.rule.lexed = res;
      return true;
    };

    $scope.isValid($scope.rule.input);

  });
