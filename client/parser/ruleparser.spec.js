'use strict';

describe('RuleParser', function () {

  var rule;
  beforeEach(module('ruleparser'));

  it('should load ruleparser with functions', function () {

    console.info('[RuleParser] Starting tests...');

    expect(ruleparser).toBeDefined();

    expect(ruleparser.parse).toBeDefined();
    expect(ruleparser.parse).toEqual(jasmine.any(Function));

    expect(ruleparser.test).toBeDefined();
    expect(ruleparser.test).toEqual(jasmine.any(Function));
  });

  it('should fail when not providing element', function () {

    rule = null;
    expect(ruleparser.test(rule).valid).toBe(false);

    rule = '';
    expect(ruleparser.test(rule).valid).toBe(false);

    rule = '5s';
    expect(ruleparser.test(rule).valid).toBe(true);
  });

  it('should fail when providing too long query', function () {

    rule = '123456789123456789123456789123456789123456789123456';
    expect(ruleparser.test(rule).valid).toBe(false);

    rule = '5s';
    expect(ruleparser.test(rule).valid).toBe(true);
  });

  it('should validate types', function () {

    rule = 'w';
    expect(ruleparser.test(rule).valid).toBe(false);
    rule = 'a';
    expect(ruleparser.test(rule).valid).toBe(false);
    rule = '2';
    expect(ruleparser.test(rule).valid).toBe(false);
    rule = '{tab:22}';
    expect(ruleparser.test(rule).valid).toBe(false);
    rule = '{tab:x}';
    expect(ruleparser.test(rule).valid).toBe(false);

    rule = 's';
    expect(ruleparser.test(rule).valid).toBe(true);
    rule = 'n';
    expect(ruleparser.test(rule).valid).toBe(true);
    rule = 'd';
    expect(ruleparser.test(rule).valid).toBe(true);
    rule = 'b';
    expect(ruleparser.test(rule).valid).toBe(true);
  });

  it('should test root elements', function () {

    rule = 's5n';
    expect(ruleparser.test(rule).valid).toBe(false);
    rule = '5n{name:s}';
    expect(ruleparser.test(rule).valid).toBe(false);
    rule = '5ss';
    expect(ruleparser.test(rule).valid).toBe(false);
    rule = 'nnn';
    expect(ruleparser.test(rule).valid).toBe(false);
    rule = '{tab:5s}n';
    expect(ruleparser.test(rule).valid).toBe(false);
    rule = '{tab:2sb}';
    expect(ruleparser.test(rule).valid).toBe(false);

    rule = '5{tab:2s}';
    expect(ruleparser.test(rule).valid).toBe(true);
  });

  it('should validate nested objects', function () {

    rule = '5{teams:4{names:4s}}';
    expect(ruleparser.test(rule).valid).toBe(false);
    rule = '2{name:s,birth:d,skills:5{tags:24n}}';
    expect(ruleparser.test(rule).valid).toBe(false);

    rule = '5{teams:4{name:s}}';
    expect(ruleparser.test(rule).valid).toBe(true);
  });

  it('should validate parse errors', function () {

    rule = '5{tea{ms:4{names:4s}}';
    expect(ruleparser.test(rule).valid).toBe(false);
    rule = '5{teams::4{names:4s}}';
    expect(ruleparser.test(rule).valid).toBe(false);
    rule = '4{teams:4{}names:4s}}';
    expect(ruleparser.test(rule).valid).toBe(false);
    rule = '3{teams:4{names:4s,}}';
    expect(ruleparser.test(rule).valid).toBe(false);
    rule = '3{teams:4{names:4s},}';
    expect(ruleparser.test(rule).valid).toBe(false);
    rule = '3{teams:4{names:4s}.}';
    expect(ruleparser.test(rule).valid).toBe(false);
    rule = '3{teams:4{names:4s}';
    expect(ruleparser.test(rule).valid).toBe(false);
    rule = '3{teams:d{names:4s';
    expect(ruleparser.test(rule).valid).toBe(false);
    rule = '3teams:dnames:4s';
    expect(ruleparser.test(rule).valid).toBe(false);
    rule = '3:4names:4s';
    expect(ruleparser.test(rule).valid).toBe(false);
    rule = '1:4na{ms:4s';
    expect(ruleparser.test(rule).valid).toBe(false);
    rule = '1:4s';
    expect(ruleparser.test(rule).valid).toBe(false);

    //no type specified at the end
    rule = '2{name:s,birth:d,skills:5{tags:24}}';
    expect(ruleparser.test(rule).valid).toBe(false);

    rule = '5{teams:4{name:s},lols:d,gimp:b,houses:5{name:s,code:n}}';
    expect(ruleparser.test(rule).valid).toBe(true);
  });

});
