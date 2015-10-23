// Doorman
// Created by David Nichols
// davenich@gmail.com
// Version 0.2.2

// Name: utils.js
// Description: Some useful stuff

// Doug Crockford's Object.create shim
if (typeof Object.create !== 'function') {
  Object.create = function(o) {
    function F() {}
    F.prototype = o;
    return new F();
  };
}

// Array.contains(a_string), returns true or false
if (typeof Array.contains !== 'function') {
  Array.prototype.contains = function(str) {
    if (typeof str !== 'string') {
      throw new TypeError('Parameter ' + str + ' is not a string.');
    } else {
      var that = this;
      for (var i = 0, max = this.length; i < max; i++) {
        if (that[i] === str) return true;
      }
      return false;
    }
  };
}

// Method to strip a character from a string
if (typeof String.removeChar !== 'function') {
  String.prototype.removeChar = function(char) {
    var that = this;
    return that.split(char).join('');
  };
}
