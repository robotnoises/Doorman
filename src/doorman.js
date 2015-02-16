// doorman.js

(function () {

  var doorman = function () {
    this.isValid = true;
    this.check = check;
    this.redirect = redirect;
  };

  window.doorman = Object.create(new doorman());

  return window.doorman;
}());
