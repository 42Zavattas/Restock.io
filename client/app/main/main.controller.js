'use strict';

angular.module('restockApp')
  .controller('MainCtrl', function ($scope, $routeParams) {

    $scope.rule = { input: $routeParams.q || '', lexed: null };

    $scope.isValid = function (str) {
      var res = ruleparser.test(str), err = {};
      if (res.valid === false) {
        $scope.errorMsg = res.msg;
        return false;
      }
      res = ruleparser.lex(str, err);
      console.log(res);
      console.log(err);
      if (err.msg) {
        $scope.errorMsg = err.msg;
        return false;
      }
      $scope.errorMsg = '';
      return true;
    };

  });
