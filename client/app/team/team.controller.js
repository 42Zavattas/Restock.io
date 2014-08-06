'use strict';

angular.module('restockApp')
  .controller('TeamCtrl', function ($scope) {

    $scope.members = [
      {
        name: 'Balthazar Gronon',
        url: 'assets/images/b.jpg',
        social: [
          { name: 'github', url: 'https://github.com/Apercu' },
          { name: 'stackoverflow', url: 'http://stackoverflow.com/users/2054072/aper%C3%A7u' },
          { name: 'linkedin', url: 'fr.linkedin.com/in/bgronon/' }
        ]
      },
      {
        name: 'Mériadec Pillet',
        url: 'assets/images/m.png',
        social: [
          { name: 'github', url: 'https://github.com/meriadec' },
          { name: 'stackoverflow', url: 'http://stackoverflow.com/users/1845964/meriadec' },
          { name: 'linkedin', url: 'https://www.linkedin.com/in/meriadec' }
        ]
      }
    ];

    var rand = Math.floor(Math.random() * $scope.members.length);

    $scope.rMembers = [];
    $scope.rMembers.push($scope.members[rand]);
    $scope.rMembers.push($scope.members[rand === 0 ? 1 :0]);

  });
