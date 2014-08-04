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

  it('should try to use null', function () {

    rule = null;
    expect(ruleparser.test(rule).valid).toBeTruthy();

    rule = '';
    expect(ruleparser.test(rule).valid).toBeTruthy();

    rule = '5s';
    expect(ruleparser.test(rule).valid).toBeTruthy();
  });

  it('should fail when providing too long query', function () {

    rule = '123456789123456789123456789123456789123456789123456';
    expect(ruleparser.test(rule).valid).toBeFalsy();

    rule = '5s';
    expect(ruleparser.test(rule).valid).toBeTruthy();
  });

  it('should check the regex pattern', function () {

    rule = '.';
    expect(ruleparser.test(rule).valid).toBeFalsy();
    rule = '5s[]';
    expect(ruleparser.test(rule).valid).toBeFalsy();
    rule = 's\'';
    expect(ruleparser.test(rule).valid).toBeFalsy();
    rule = 'é{name:s}';
    expect(ruleparser.test(rule).valid).toBeFalsy();
    rule = '9{name:*}';
    expect(ruleparser.test(rule).valid).toBeFalsy();
    rule = '8{name:s;date:d}';
    expect(ruleparser.test(rule).valid).toBeFalsy();
    rule = '8{name:s,date:d,aa:\\}';
    expect(ruleparser.test(rule).valid).toBeFalsy();
    rule = '7{name:s,date:d, age:n}';
    expect(ruleparser.test(rule).valid).toBeFalsy();
    rule = '3(name:s,date:d,age:n)';
    expect(ruleparser.test(rule).valid).toBeFalsy();
    rule = '2{name:s,_date:d,age:n}';
    expect(ruleparser.test(rule).valid).toBeFalsy();
    rule = '2{nam|e:s,date:d,age:n}';
    expect(ruleparser.test(rule).valid).toBeFalsy();
  });

  it('should validate types', function () {

    rule = 'w';
    expect(ruleparser.test(rule).valid).toBeFalsy();
    rule = 'a';
    expect(ruleparser.test(rule).valid).toBeFalsy();
    rule = '2';
    expect(ruleparser.test(rule).valid).toBeFalsy();
    rule = '{tab:22}';
    expect(ruleparser.test(rule).valid).toBeFalsy();
    rule = '{tab:x}';
    expect(ruleparser.test(rule).valid).toBeFalsy();

    rule = 's';
    expect(ruleparser.test(rule).valid).toBeTruthy();
    rule = 'n';
    expect(ruleparser.test(rule).valid).toBeTruthy();
    rule = 'd';
    expect(ruleparser.test(rule).valid).toBeTruthy();
    rule = 'b';
    expect(ruleparser.test(rule).valid).toBeTruthy();
  });

  it('should test root elements', function () {

    rule = 's5n';
    expect(ruleparser.test(rule).valid).toBeFalsy();
    rule = '5n{name:s}';
    expect(ruleparser.test(rule).valid).toBeFalsy();
    rule = '5ss';
    expect(ruleparser.test(rule).valid).toBeFalsy();
    rule = 'nnn';
    expect(ruleparser.test(rule).valid).toBeFalsy();
    rule = '{tab:5s}n';
    expect(ruleparser.test(rule).valid).toBeFalsy();
    rule = '{tab:2sb}';
    expect(ruleparser.test(rule).valid).toBeFalsy();

    rule = '5{tab:2s}';
    expect(ruleparser.test(rule).valid).toBeTruthy();
  });

  it('should validate nested objects', function () {

    rule = '5{teams:4{names:4s}}';
    expect(ruleparser.test(rule).valid).toBeFalsy();
    rule = '2{name:s,birth:d,skills:5{tags:24n}}';
    expect(ruleparser.test(rule).valid).toBeFalsy();

    rule = '5{teams:4{name:s}}';
    expect(ruleparser.test(rule).valid).toBeTruthy();
  });

  it('should validate parse errors', function () {

    rule = '5{tea{ms:4{names:4s}}';
    expect(ruleparser.test(rule).valid).toBeFalsy();
    rule = '5{teams::4{names:4s}}';
    expect(ruleparser.test(rule).valid).toBeFalsy();
    rule = '4{teams:4{}names:4s}}';
    expect(ruleparser.test(rule).valid).toBeFalsy();
    rule = '3{teams:4{names:4s,}}';
    expect(ruleparser.test(rule).valid).toBeFalsy();
    rule = '3{teams:4{names:4s},}';
    expect(ruleparser.test(rule).valid).toBeFalsy();
    rule = '3{teams:4{names:4s}.}';
    expect(ruleparser.test(rule).valid).toBeFalsy();
    rule = '3{teams:4{names:4s}';
    expect(ruleparser.test(rule).valid).toBeFalsy();
    rule = '3{teams:d{names:4s';
    expect(ruleparser.test(rule).valid).toBeFalsy();
    rule = '3teams:dnames:4s';
    expect(ruleparser.test(rule).valid).toBeFalsy();
    rule = '3:4names:4s';
    expect(ruleparser.test(rule).valid).toBeFalsy();
    rule = '1:4na{ms:4s';
    expect(ruleparser.test(rule).valid).toBeFalsy();
    rule = '1:4s';
    expect(ruleparser.test(rule).valid).toBeFalsy();

    //no type specified at the end
    rule = '2{name:s,birth:d,skills:5{tags:24}}';
    expect(ruleparser.test(rule).valid).toBeFalsy();

    rule = '5{teams:4{name:s},houses:5{name:s,code:n}}';
    expect(ruleparser.test(rule).valid).toBeTruthy();
  });

});
