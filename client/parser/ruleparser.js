(function(exports){

  function checkIsNull (val) {
    return !!(val && val.length);
  }

  function limitLength (val) {
    return !!(val.length <= 50);
  }

  function validateCharacters (val) {
    var pattern = /^[a-zA-Z0-9{}:,]+$/;
    return !!(val.match(pattern));
  }

  var testFunctions = [
    { f: checkIsNull, msg: 'Null given' },
    { f:limitLength, msg: 'Too many characters' },
    { f:validateCharacters, msg: 'Invalid characters' }
  ];

  exports.test = function (rule) {
    for (i = 0; i < testFunctions.length; i++) {
      //console.log(testFunctions[i].f(rule));
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
