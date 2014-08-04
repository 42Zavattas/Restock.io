'use strict';

angular.module('restockApp')
  .controller('MainCtrl', function ($scope) {

    /* --> could be nice
    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
    */
    console.log(ruleparser.test());

    $scope.rule = { input: '', output: '' };

  });
