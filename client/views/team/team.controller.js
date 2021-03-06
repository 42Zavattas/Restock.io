'use strict';

angular.module('restock')
  .controller('TeamCtrl', function () {

    var vm = this;

    angular.extend(vm, {
      members: [{
        name: 'Balthazar Gronon',
        url: 'assets/images/b.jpg',
        social: [
          { name: 'github', url: 'https://github.com/Apercu' },
          { name: 'stackoverflow', url: 'http://stackoverflow.com/users/2054072/aper%C3%A7u' },
          { name: 'linkedin', url: 'http://fr.linkedin.com/in/bgronon/' }
        ]
      },
      {
        name: 'Mériadec Pillet',
        url: 'assets/images/m.jpg',
        social: [
          { name: 'github', url: 'https://github.com/meriadec' },
          { name: 'stackoverflow', url: 'http://stackoverflow.com/users/1845964/meriadec' },
          { name: 'linkedin', url: 'https://www.linkedin.com/in/meriadec' }
        ]
      }],
      rMembers: []
    });

    var rand = Math.floor(Math.random() * 2);

    vm.rMembers.push(vm.members[rand]);
    vm.rMembers.push(vm.members[rand === 0 ? 1 : 0]);

  });
