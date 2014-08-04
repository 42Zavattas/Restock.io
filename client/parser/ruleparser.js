(function(exports){

  function checkIsNull (val) {
    return !!(val && val.length);
  }

  function limitLength (val) {
    return !!(val.length <= 50);
  }

  var testFunctions = [
    { f: checkIsNull, msg: 'Null given' },
    { f:limitLength, msg: 'Too many characters' }
  ];

  exports.test = function (rule) {
    for (i = 0; i < testFunctions.length; i++) {
      if (testFunctions[i].f(rule) === false) {
        return { valid: false, msg: testFunctions[i].msg };
      }
    }
    return { valid: true };
  };

  exports.parse = function (rule) {
    if (!this.test(rule)) {
      return null;
    }
  };

})(typeof exports === 'undefined' ? this['ruleparser'] = {} : exports);
