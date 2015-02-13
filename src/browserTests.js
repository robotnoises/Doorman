
var browserTests = (function () {

  // Begin tests

  var navigationTest = function () {
    return false;
  };

  var testTest = function () {
    return true;
  };

  // Public test methods
  function public () {
    this.navigation = navigationTest;
    this.test = testTest;
  }

  return new public();

}());
