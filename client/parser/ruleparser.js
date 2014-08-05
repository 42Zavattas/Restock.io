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

  function isNumber (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function checkDeep (val) {
    var state = 0;
    for (var i = 0; i < val.length; i++) {
      if (val[i] === '{') {
        state++;
      }
      else if (val[i] === '}') {
        state--;
      }
      if (state === 3 || (state === 2 && isNumber(val[i]) && val[i - 1] === ':')) {
        return false;
      }
    }
    return true;
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

  function getObjectContent (str) {
    return str.substr(0, Math.min(str.indexOf('{'), str.indexOf('}')));
  }

  function lastValidate (val) {
    var cur = val.indexOf('{');
    getObjectContent(val.substr(cur, val.length));
  }

  var testFunctions = [
    { f:limitLength, msg: 'Too many characters.' },
    { f:validateCharacters, msg: 'Invalid characters.' },
    { f:checkBraces, msg: 'Wrong objet structure.' },
    { f:checkDeep, msg: 'Your struture is too deep.' },
    { f:checkRoot, msg: 'Invalid root element.' }
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

  /**
   * ----------------------------------------------
   *                       Lexer
   * ----------------------------------------------
   */

  /**
   * Extract the next node in the given string
   */
  function findNode (str) {
    var res;

    // "regular" node
    res = str.match(/^(s|S|n|N|b|d)/);
    if (res !== null) {
      console.log(res);
      return str.charAt(0);
    }

    // "object" node
    if (str.charAt(0) === '{') {
    }

    return str;
  }

  /**
   * Convert a rule string to a lexed object
   */
  function lex (str) {
    var out = {}, res;

    console.log("-> LEXING '"+str+"'");

    // Find if current node is a "regular"
    res = str.match(/^(s|S|n|N|b|d)$/);
    if (res !== null) {
      out.type = str;
      return out;
    }

    // Find if current node is an Array
    res = str.match(/^[0-9]+/);
    if (res !== null) {
      out.type = 'array';
      out.nbChilds = Number(str.substr(0, res[0].length));
      out.child = lex(findNode(str.substr(res[0].length)));
      return out;
    }

  }

  exports.lex = function (str) { return lex(str); };

  exports.parse = function (rule) {
    if (!this.test(rule)) {
      return null;
    }
  };

})(typeof exports === 'undefined' ? this['ruleparser'] = {} : exports);
