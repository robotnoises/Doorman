// Name: browserTest.js
// Description: All of the browser-specific feature tests

// Note: These tests are pretty much just an implementation of Chapter 2 in 
// Mark Pilgrim's "Dive Into HTML5," which is an amazing and informative book
// that can be found here: http://diveintohtml5.info/detect.html

(function (doorman) {

  var browserTest = function () {

    // Generic test functions

    var propertyExistsOnGlobalObject = function (prop, obj) {
      try {
        return (typeof obj === 'object') && (prop in obj) && obj[prop] !== null;
      } catch (ex) {
        return false;
      }
    };

    var propertyExistsOnDummyElement = function (prop, element) {
      return !!document.createElement(element)[prop];
    };

    // Specific feature tests

    var canvasTest = function() {
      return propertyExistsOnDummyElement('getContext','canvas');
    };

    var formautofocusTest = function () {
      return propertyExistsOnGlobalObject('autofocus', document.createElement('input'));
    };

    var geolocationTest = function () {
      return propertyExistsOnGlobalObject('geolocation', navigator);
    };

    var localStorageTest = function () {
      return propertyExistsOnGlobalObject('localStorage', window);
    };

    var offlineTest = function () {
      return propertyExistsOnGlobalObject('applicationCache', window);
    };

    var webworkersTest = function () {
      return propertyExistsOnGlobalObject('Worker', window);
    };

    var videoTest = function () {
      return propertyExistsOnDummyElement('canPlayType', 'video');
    };

    // Public test methods
    function methods () {
      this.canvas = canvasTest;
      this.formautofocus = formautofocusTest;
      this.geolocation = geolocationTest;
      this.localstorage = localStorageTest;
      this.offline = offlineTest;
      this.webworkers = webworkersTest;
      this.video = videoTest;
    }

    return Object.create(new methods());
  };

  // Attach 'browserTest' object to global 'doorman' object
  return (doorman.browserTest = Object.create(new browserTest()));

}(doorman || {}));
