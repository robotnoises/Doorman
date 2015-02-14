
var browserTests = (function () {

  // Generic test handlers

  var propertyExistsInObject = function (prop, obj) {
    return typeof obj === 'object' && Object.prototype.hasOwnProperty.call(obj, prop);
  };

  // Feature tests

  var geolocationTest = function () {
    return 'geolocation' in navigator;
  };

  var testTest = function () {
    return true;
  };

  // Public test methods
  function public () {
    this.geolocation = geolocationTest;
    this.test = testTest;
  }

  return new public();

}());
