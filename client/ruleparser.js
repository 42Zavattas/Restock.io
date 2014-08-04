(function(exports){

   exports.test = function(){
        return 'hello world'
    };

})(typeof exports === 'undefined' ? this['ruleparser'] = {} : exports);
