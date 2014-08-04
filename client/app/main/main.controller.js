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
