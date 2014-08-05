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
    { f:checkDeep, msg: 'Your struture is too deep.' }
  ];

  exports.test = function (rule) {
    if (!rule || !rule.length) {
      return { valid: true };
    }
    for (i = 0; i < testFunctions.length; i++) {
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
    res = str.match(/^(s|S|n|N|b|d)$/);
    if (res !== null) {
      return str.charAt(0);
    }

    // "object" node
    if (str.charAt(0) === '{') {
      var count = [1, 0], preventLoop = 100, i = 0;
      while (++i && count[0] !== count[1] && preventLoop--) {
        switch (str.charAt(i)) {
          case '{': ++count[0]; break;
          case '}': ++count[1]; break;
        }
      }
      return str.substring(0, i);
    }

    return str;
  }

  /**
   * Convert a rule string to a lexed object
   */
  function lex (str, err) {

    var out = {}, res;

    if (typeof err === 'undefined') {
      var err = {};
    }

    // Regular
    res = str.match(/^(s|S|n|N|b|d)$/);
    if (res !== null) {
      out.type = str;
      return out;
    }

    // Array
    res = str.match(/^[0-9]+/);
    if (res !== null) {
      out.type = 'array';
      out.nbChilds = Number(str.substr(0, res[0].length));
      if (out.nbChilds > 50) {
        err.msg = 'Too much elements (limit: 50, or premium account)';
        err.valid = false;
        return false;
      }
      var rest = str.substr(res[0].length);
      if (rest === '') {
        err.msg = 'No value given for array childs';
        err.valid = false;
        return false;
      }
      out.child = lex(findNode(rest), err);
      return out;
    }

    // Object
    if (str.charAt(0) === '{') {
      if (str.charAt(str.length - 1) !== '}') {
        err.msg = 'Syntax error near \'' + str.charAt(str.length - 1) + '\'';
        err.valid = false;
        return false;
      }
      out.type = 'object';
      out.props = [];
      var props = (function (props) {
        var out = [];
        for (var i = 0; i < props.length; i++) {
          if ((props[i].indexOf('{') !== -1 && props[i].indexOf('}') === -1)
            || props[i].indexOf('{') === -1 && props[i].indexOf('}') !== -1) {
            out.push([props[i++], props[i]].join(','));
          } else {
            out.push(props[i]);
          }
        }
        return out;
      })(str.substr(1, str.length - 2).split(','));
      for (var i = 0; i < props.length; i++) {
        if (!/^[^:]+:.+$/.test(props[i])) {
          err.msg = "No value for property '" + props[i] + "'";
          err.valid = false;
          return false;
        }
        out.props.push({
          name: props[i].substring(0, props[i].indexOf(':')),
          val: lex(props[i].substr(props[i].indexOf(':') + 1), err)
        });
      }
      return out;
    }

    // Problematic
    err.msg = 'Unknown type \'' + str + '\'';
    err.valid = false;
    return false;

  }

  exports.lex = function (str, err) {
    if (str === '') {
      return null;
    }
    err.msg = false;
    err.valid = true;
    return lex(str, err);
  };

  exports.parse = function (rule) {
    if (!this.test(rule)) {
      return null;
    }
  };

})(typeof exports === 'undefined' ? this['ruleparser'] = {} : exports);
