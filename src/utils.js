// Doorman
// Created by David Nichols
// davenich@gmail.com
// Version 0.2.0

// Name: utils.js
// Description: Some useful extensions

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
    var that = this;
    for(var i = this.length; i--;) {
      if (that[i] === string) return true;
    }
    return false;
  };
}

// Method to strip a character from a string
if (typeof String.removeChar !== 'function') {
  String.prototype.removeChar = function(char) {
    var that = this;
    return that.split(char).join('');
  };
}
