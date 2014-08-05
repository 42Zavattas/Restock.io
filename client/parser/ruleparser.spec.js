'use strict';

describe('RuleParser', function () {

  var rule;
  var err = {};

  beforeEach(module('ruleparser'));

  it('should load ruleparser with functions', function () {

    console.info('[RuleParser] Starting tests...');

    expect(ruleparser).toBeDefined();

    expect(ruleparser.parse).toBeDefined();
    expect(ruleparser.parse).toEqual(jasmine.any(Function));

    expect(ruleparser.test).toBeDefined();
    expect(ruleparser.test).toEqual(jasmine.any(Function));

    expect(ruleparser.lex).toBeDefined();
    expect(ruleparser.lex).toEqual(jasmine.any(Function));
  });

  it('should try to use null', function () {

    expect(ruleparser.test(null).valid).toBeTruthy();
    expect(ruleparser.test('').valid).toBeTruthy();
    expect(ruleparser.test('5s').valid).toBeTruthy();
  });

  it('should fail when providing too long query', function () {

    rule = '123456789123456789123456789123456789123456789123456';
    expect(ruleparser.test(rule).valid).toBeFalsy();

    expect(ruleparser.test('5s').valid).toBeTruthy();
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

  it('should validate nested objects', function () {

    rule = '5{teams:4{names:4s}}';
    expect(ruleparser.test(rule).valid).toBeFalsy();
    rule = '2{name:s,birth:d,skills:5{tags:24n}}';
    expect(ruleparser.test(rule).valid).toBeFalsy();

    rule = '5{teams:4{name:s}}';
    expect(ruleparser.test(rule).valid).toBeTruthy();
  });

  it('should validate parse errors', function () {

    expect(ruleparser.test('5{tea{ms:4{names:4s}}').valid).toBeFalsy();
    expect(ruleparser.test('5{teams::4{names:4s}}').valid).toBeFalsy();
    expect(ruleparser.test('4{teams:4{}names:4s}}').valid).toBeFalsy();
    expect(ruleparser.test('3{teams:4{names:4s,}}').valid).toBeFalsy();
    expect(ruleparser.test('3{teams:4{names:4s},}').valid).toBeFalsy();
    expect(ruleparser.test('3{teams:4{names:4s}.}').valid).toBeFalsy();
    expect(ruleparser.test('3{teams:4{names:4s}').valid).toBeFalsy();
    expect(ruleparser.test('3{teams:d{names:4s').valid).toBeFalsy();
    expect(ruleparser.test('1:4na{ms:4s').valid).toBeFalsy();

    //no type specified at the end
    expect(ruleparser.test('2{name:s,birth:d,skills:5{tags:24}}').valid).toBeFalsy();
    expect(ruleparser.test('5{teams:4{name:s},houses:5{name:s,code:n}}').valid).toBeTruthy();
  });

  it('should test basic lexer', function () {
    expect(ruleparser.lex('5s', err)).toEqual(jasmine.any(Object));
    expect(err.msg).toBeFalsy();
    expect(ruleparser.lex('d', err)).toEqual(jasmine.any(Object));
    expect(err.msg).toBeFalsy();
    expect(ruleparser.lex('{s:s}', err)).toEqual(jasmine.any(Object));
    expect(err.msg).toBeFalsy();
    expect(ruleparser.lex('5{name:s}', err)).toEqual(jasmine.any(Object));
    expect(err.msg).toBeFalsy();
  });

  it('should fail on this syntax error', function () {
    ruleparser.lex('{tab:5s}n', err);
    expect(err.msg).toMatch(/Syntax error/);
  });

  it('should test some unknown types', function () {
    ruleparser.lex('{tab:2sb}', err);
    expect(err.msg).toMatch(/Unknown type/);
    ruleparser.lex('{tab:2s,obj:{name:6x}}', err);
    expect(err.msg).toMatch(/Unknown type/);
    ruleparser.lex('15z', err);
    expect(err.msg).toMatch(/Unknown type/);
    ruleparser.lex('{s:s,n:8qa}', err);
    expect(err.msg).toMatch(/Unknown type/);

    ruleparser.lex('s5n', err);
    expect(err.msg).toMatch(/Unknown type/);
    ruleparser.lex('5n{name:s}', err);
    expect(err.msg).toMatch(/Unknown type/);
    ruleparser.lex('5ss', err);
    expect(err.msg).toMatch(/Unknown type/);
    ruleparser.lex('nnn', err);
    expect(err.msg).toMatch(/Unknown type/);

    ruleparser.lex('3teams:dnames:4s', err);
    expect(err.msg).toMatch(/Unknown type/);
    ruleparser.lex('3:4names:4s', err);
    expect(err.msg).toMatch(/Unknown type/);
    ruleparser.lex('1:4s', err);
    expect(err.msg).toMatch(/Unknown type/);

    ruleparser.lex('w', err);
    expect(err.msg).toMatch(/Unknown type/);
    ruleparser.lex('a', err);
    expect(err.msg).toMatch(/Unknown type/);

    ruleparser.lex('18n', err);
    expect(err.msg).toBeFalsy();
    ruleparser.lex('{name:2s}', err);
    expect(err.msg).toBeFalsy();
    ruleparser.lex('5{tab:2s}', err);
    expect(err.msg).toBeFalsy();

    ruleparser.lex('s', err);
    expect(err.msg).toBeFalsy();
    ruleparser.lex('n', err);
    expect(err.msg).toBeFalsy();
    ruleparser.lex('d', err);
    expect(err.msg).toBeFalsy();
    ruleparser.lex('b', err);
    expect(err.msg).toBeFalsy();
  });

  it('should test when trying to go up the limitations', function () {
    expect(ruleparser.lex('180n', err)).toBeFalsy();
    expect(err.msg).toBe('Too much elements (limit: 50, or premium account)');
    ruleparser.lex('{name:4s,age:52d}', err);
    expect(err.msg).toBe('Too much elements (limit: 50, or premium account)');
    ruleparser.lex('40{name:4s,teams:{members:54s}}', err);
    expect(err.msg).toBe('Too much elements (limit: 50, or premium account)');
    ruleparser.lex('{teams:{members:4s},{houses:{cats:59s}}}', err);
    expect(err.msg).toBe('Too much elements (limit: 50, or premium account)');
  });

  it('should fail when putting only a number, without type', function () {
    ruleparser.lex('5', err); expect(err.msg).toMatch(/No value given for array childs/);
    ruleparser.lex('{name:50}', err); expect(err.msg).toMatch(/No value given for array childs/);
    ruleparser.lex('{name:50{name:3}}', err); expect(err.msg).toMatch(/No value given for array childs/);
  });

});
