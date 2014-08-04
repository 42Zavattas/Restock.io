(function(exports){

  function limitLength (val) {
    return !!(val.length <= 50);
  }

  function validateCharacters (val) {
    var pattern = /^[a-zA-Z0-9{}:,]+$/;
    return !!(val.match(pattern));
  }

  function checkBraces (val) {
    var state = 0;
    for (var i = 0; i < val.length; i++) {
      if (val[i] === '{') {
        state++;
      }
      else if (val[i] === '}') {
        state--;
      }
    }
    return !!(state === 0);
  }

  function supportedType (type) {
    var types = ['s', 'S', 'n', 'b', 'd', '{'];
    return !!(types.indexOf(type) !== -1);
  }

  function checkRoot (val) {
    var beginNum = val.match(/^[0-9]+/);

    if (beginNum) {
      beginNum = beginNum[0];
      if (parseInt(beginNum, 10) > 100) {
        return false;
      }
    }

    var cur = beginNum ? beginNum.length : 0;
    return !!(supportedType(val[cur]) && (cur + 1 === val.length || val[cur] === '{'));
  }

  var testFunctions = [
    { f:limitLength, msg: 'Too many characters.' },
    { f:validateCharacters, msg: 'Invalid characters.' },
    { f:checkBraces, msg: 'Wrong objet structure.' },
    { f:checkRoot, msg: 'Invalid root element' }
  ];

  exports.test = function (rule) {
    if (!rule || !rule.length) {
      return { valid: true };
    }
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
