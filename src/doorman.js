// Name: doorman.js
// Description: This is the main module

var doorman = (function () {

  var dm = function () {
    this.valid = true;
    this.failed = [];
  };

  return Object.create(new dm());

})();
