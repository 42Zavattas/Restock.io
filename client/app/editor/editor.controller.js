'use strict';

angular.module('restockApp')
  .controller('EditorCtrl', function ($scope, $http, $routeParams, $location) {

    $scope.domain = $location.protocol() + '://' + $location.host() + ':' + $location.port();
    $scope.rule = { input: $routeParams.q || '', lexed: null };

    $scope.saveStock = function (rule) {
      $http.post('/api/stocks', { rule: rule }).then(function (res) {
        console.log(res);
      });
      console.log(rule);
    };

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
