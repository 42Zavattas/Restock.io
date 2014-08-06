'use strict';

angular.module('restockApp')
  .controller('EditorCtrl', function ($scope, $http, $routeParams) {

    $scope.rule = { input: $routeParams.q || '', lexed: null };

    $scope.saveStock = function (rule) {
      $http.post('/api/stocks', { rule: rule }).then(function (res) {
        console.log(res);
      });
      console.log(rule);
    };

    /**
     * ------------------------------------------------------------------------
     *                                 Draw
     * ------------------------------------------------------------------------
     */

    var container = $('.rs-sketch-container'),
        types = {
          s: 'string',
          n: 'number',
          b: 'boolean',
          d: 'date'
        }

    /**
     * Returns if the node type is regular
     */
    function isRegular (type) {
      return type.match(/^(s|n|b|d)$/);
    }

    /**
     * Build the html for property/value couple
     */
    function buildProp (prop) {
      return $(
        '<div class="sk-couple">' +
          '<span class="sk-prop">' + prop.name + ':</span>' +
          (isRegular(prop.val.type) ? '<span class="sk-type">' + types[prop.val.type] + '</span>' : '') +
        '</div>'
      );
    }

    /**
     * Draw a node and its children
     */
    function draw (lexed, deep) {
      if (deep === 0) {
        container.html('');
      }
      if (!lexed) {
        return;
      }
      if (lexed.type === 'object') {
        var prop;
        for (var i = 0; i < lexed.props.length; i++) {
          prop = buildProp(lexed.props[i]);
          container.append(prop);
        }
      }
    }

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
      draw(res, 0);
      return true;
    };

    $scope.isValid($scope.rule.input);

  });
