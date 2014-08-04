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

    $scope.rule = { input: '', output: '' };

  });
