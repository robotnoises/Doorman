// doorman.js

(function () {

  var doorman = function () {
    this.isValid = true;
    this.check = check;
    this.redirect = redirect;
  };

  return (window.doorman = Object.create(new doorman()));
}());
