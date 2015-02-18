// doorman.js

var doorman = (function () {

  var public = function () {
    this.isValid = true;
  };

  return Object.create(new public());
})();
