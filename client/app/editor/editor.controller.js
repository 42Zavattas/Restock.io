'use strict';

angular.module('restockApp')
  .controller('EditorCtrl', function ($scope, $http, $routeParams) {

    $scope.rule = { input: $routeParams.q || '', lexed: null };

    $scope.stocks = {
      saved: [],
      saving: false
    };

    $scope.res = null;

    var ping = new Date().getTime();

    $scope.saveStock = function (rule) {
      if ($scope.stocks.saved.indexOf(rule) > -1) {
        return ;
      }
      $scope.stocks.saving = true;
      var test = $http.post('/api/stocks', { rule: rule }).then(function () {
        $scope.stocks.saving = false;
        $scope.stocks.saved.push(rule);
      }, function () {
        $scope.stocks.saving = false;
      });
    };

    $scope.isSaved = function () {
      return $scope.stocks.saved.indexOf($scope.rule.input) > -1;
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

      if ($scope.rule.input === '') {
        return;
      }

      if (new Date().getTime() - ping > 2000) {
        ping = new Date().getTime();
        $http
          .get($scope.$root.ui.domain + '/api/' + $scope.rule.input)
            .then(function (res) {
              $scope.res = res.data;
            }, function (err) {
              console.log(err);
          });
      }

      return true;
    };

    $scope.isValid($scope.rule.input);

  });
