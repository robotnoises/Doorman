// tools.js : A list of useful functions

// True prototypical object creation

if (typeof Object.create !== 'function') {
  Object.create = function(o) {
    function F() {}
    F.prototype = o;
    return new F();
  };
}

// Array.contains(a_string), returns true or false

if (typeof Array.contains !== 'function') {
  Array.prototype.contains = function(string) {
    for(var i = this.length; i--;) {
      if (this[i] === string) return true;
    }
    return false;
  };
}
