
var browserTest = (function () {

  // Generic test functions

  var propertyExists = function (prop, obj) {
    try {
      return (typeof obj === 'object') && (prop in obj) && obj[prop] !== null;
    } catch (ex) {
      return false;
    }
  };

  var propertyExistsOnDummyElement = function (element) {
    return !!document.createElement(element).getContext;
  };

  // Specific feature tests

  var canvasTest = function() {
    return propertyExistsOnDummyElement('canvas');
  };

  var geolocationTest = function () {
    return propertyExists('geolocation', navigator);
  };

  var localStorageTest = function () {
    return propertyExists('localStorage', window);
  };

  // Public test methods
  function public () {
    this.canvas = canvasTest;
    this.geolocation = geolocationTest;
    this.localStorage = localStorageTest;
  }

  return new public();

}());
