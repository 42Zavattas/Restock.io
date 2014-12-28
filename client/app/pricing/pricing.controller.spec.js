'use strict';

describe('Controller: PricingCtrl', function () {

  // load the controller's module
  beforeEach(module('restockApp'));

  var PricingCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PricingCtrl = $controller('PricingCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
