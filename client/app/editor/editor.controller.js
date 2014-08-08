'use strict';

angular.module('restockApp')
  .controller('EditorCtrl', function ($scope, $http, $routeParams) {

    $scope.rule = { input: $routeParams.q || '', lexed: null };

    $scope.ui = {
      editorType: 'extended',
      reqType: 'GET'
    };

    $scope.stocks = {
      saved: [],
      saving: false
    };

    $scope.reference = [
      ['s', 'tring'],
      ['S', 'paragraph'],
      ['n', 'umber (0-100)'],
      ['N', 'umber (big)'],
      ['b', 'oolean'],
      ['d', 'ate'],
      ['e', 'mail'],
      ['p', 'hone'],
      ['a', 'ddress'],
      ['t', 'imestamp'],
      ['c', 'haracter'],
      ['i', 'p']
    ];

    $scope.specialReference = [
      ['[0-9]', 'multiply next object'],
      ['{...}', 'new object']
    ];

    //Copy utils
    $scope.lastCopy = '';

    $scope.copy = function () {
      return $scope.getUrl();
    };

    $scope.updateCopied = function () {
      $scope.lastCopy = $scope.getUrl();
    };

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

    $scope.getUrl = function () {
      return $scope.$root.ui.domain + '/api/' + $scope.rule.input;
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

        if (new Date().getTime() - ping > 1000) {

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

    /**
     * Change editor type
     */
    $scope.setEditor = function (type) {
      switch (type) {
        case 'basic':
          $scope.ui.editorType = 'basic';
          break;
        case 'extended':
          $scope.ui.editorType = 'extended';
          break;
      }
    }

    /**
     * Change request type
     */
    $scope.setReqType = function (type) {
      $scope.ui.reqType = type;
    }

    $scope.isValid($scope.rule.input);

  });
