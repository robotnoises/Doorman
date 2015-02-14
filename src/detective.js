// detective.js

(function () {

  var detective = function () {
    this.isValid = true;
    this.investigate = investigate;
    this.redirect = redirect;
  };

  window.detective = Object.create(new detective());

  return window.detective;
}());
