'use strict';

angular.module('restock')
  .controller('EditorCtrl', function ($http, $routeParams, $scope) {

    var vm = this;

    var ping = new Date().getTime() - 9999;

    angular.extend(vm, {
      rule: { input: $routeParams.q || '', lexed: null },

      stocks: {
        saved: [],
        saving: false
      },

      reference: [
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
      ],

      specialReference: [
        ['[0-9]', 'multiply next object'],
        ['{...}', 'new object']
      ],

      lastCopy: '',

      copy: function () {
        return vm.getUrl();
      },

      updateCopied: function () {
        vm.lastCopy = vm.getUrl();
      },

      isLoading: true,

      res: null,

      saveStock: function (rule) {
        if (!$scope.$root.ui.isLogged || vm.stocks.saved.indexOf(rule) > -1) {
          return ;
        }
        vm.stocks.saving = true;
        $http.post('/api/stocks', { rule: rule }).then(function () {
          vm.stocks.saving = false;
          vm.stocks.saved.push(rule);
        }, function () {
          vm.stocks.saving = false;
        });
      },

      getUrl: function () {
        return $scope.$root.ui.domain + '/api/' + vm.rule.input;
      },

      isSaved: function () {
        return vm.stocks.saved.indexOf(vm.rule.input) > -1;
      },

      isValid: function (str) {
        if (vm.rule.input === '') {
          return true;
        }

        var res = ruleparser.test(str),
            err = {};

        if (res.valid === false) {
          vm.errorMsg = res.msg;
          return false;
        }
        res = ruleparser.lex(str, err);
        if (err.msg) {
          vm.errorMsg = err.msg;
          return false;
        }
        vm.errorMsg = '';
        vm.rule.lexed = res;
        return true;
      }

    });

    $scope.$watch('vm.rule.input', function () {
      if (vm.rule.input !== '' && vm.isValid(vm.rule.input)) {
        if (new Date().getTime() - ping > 1000) {
          vm.isLoading = false;
          ping = new Date().getTime();
          $http.get($scope.$root.ui.domain + '/api/' + vm.rule.input)
            .then(function (res) {
              vm.isLoading = true;
              vm.res = res.data;
            }, function (err) {
              console.log(err);
            });
        }
      }
    });

    vm.isValid(vm.rule.input);

  });
