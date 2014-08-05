'use strict';

describe('Controller: DocsCtrl', function () {

  // load the controller's module
  beforeEach(module('restockApp'));

  var DocsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DocsCtrl = $controller('DocsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
