'use strict';

describe('Controller: EditorCtrl', function () {

  // load the controller's module
  beforeEach(module('restockApp'));

  var EditorCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditorCtrl = $controller('EditorCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
