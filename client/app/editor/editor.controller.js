'use strict';

angular.module('restockApp')
  .controller('EditorCtrl', function ($scope, $http, $routeParams) {

    $scope.rule = { input: $routeParams.q || '', lexed: null };

    $scope.stocks = {
      saved: [],
      saving: false
    };

    $scope.reference = [
      ['s', 'string'],
      ['S', 'paragraph'],
      ['n', 'number (0-100)'],
      ['N', 'big (+/-) number'],
      ['b', 'boolean'],
      ['d', 'date'],
      ['e', 'email'],
      ['p', 'phone'],
      ['a', 'adress'],
      ['t', 'timestamp'],
      ['c', 'character'],
      ['i', 'ip']
    ];

    $scope.specialReference = [
      ['[0-9]', 'multiply next object'],
      ['{...}', 'new object']
    ];

    $scope.isLoading = true;

    $scope.res = null;

    var ping = new Date().getTime() - 9999;

    $scope.saveStock = function (rule) {
      if (!$scope.$root.ui.isLogged || $scope.stocks.saved.indexOf(rule) > -1) {
        return ;
      }
      $scope.stocks.saving = true;
      $http.post('/api/stocks', { rule: rule }).then(function () {
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

      if ($scope.rule.input === '') {
        return true;
      }

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

    $scope.$watch('rule.input', function () {
      if ($scope.rule.input !== '' && $scope.isValid($scope.rule.input)) {

        if (new Date().getTime() - ping > 2000) {

          $scope.isLoading = false;
          ping = new Date().getTime();
          $http
            .get($scope.$root.ui.domain + '/api/' + $scope.rule.input)
              .then(function (res) {
                $scope.isLoading = true;
                $scope.res = res.data;
              }, function (err) {
                console.log(err);
            });
        }

      }
    });

    $scope.isValid($scope.rule.input);

  });
