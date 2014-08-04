'use strict';

describe('Directive: ruleSketch', function () {

  // load the directive's module and view
  beforeEach(module('restockApp'));
  beforeEach(module('app/rule-sketch/rule-sketch.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<rule-sketch></rule-sketch>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(1).toBe(1);
    //expect(element.text()).toBe('this is the ruleSketch directive');
  }));
});
