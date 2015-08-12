// Name: browserTest.js
// Description: All of the browser-specific feature tests

// Note: These tests are pretty much just an implementation of Chapter 2 in
// Mark Pilgrim's "Dive Into HTML5," which is an amazing and informative book
// that can be found here: http://diveintohtml5.info/detect.html

(function (doorman) {

  var browserTest = function () {

    /* Private */

    var propertyExistsOnObject = function (prop, obj) {
      try {
        return (typeof obj === 'object') && (prop in obj) && obj[prop] !== null;
      } catch (ex) {
        return false;
      }
    };

    var createDummyElement = function (prop, element, optionalParam) {
      return (optionalParam) ?
        document.createElement(element)[prop](optionalParam) :
        document.createElement(element)[prop];
    };

    /* Specific feature tests */

    var canvasTest = function() {
      return !!createDummyElement('getContext','canvas');
    };

    var canvasTextTest = function () {
      if (!canvasTest()) return false;

      var fakeContext = createDummyElement('getContext', 'canvas', '2d');
      return (typeof fakeContext.fillText === 'function');
    };

    var formAutoFocusTest = function () {
      return propertyExistsOnObject('autofocus', document.createElement('input'));
    };

    var geolocationTest = function () {
      return propertyExistsOnObject('geolocation', navigator);
    };

    var historyApiTest = function () {
      return propertyExistsOnObject('history', window) &&
        propertyExistsOnObject('pushState', window.history);
    };

    var localStorageTest = function () {
      return propertyExistsOnObject('localStorage', window);
    };

    var microdataTest = function () {
      return propertyExistsOnObject('getItems', document);
    };

    var offlineTest = function () {
      return propertyExistsOnObject('applicationCache', window);
    };

    var placeholderTest = function () {
      return propertyExistsOnObject('placeholder', document.createElement('input'));
    };

    var webWorkersTest = function () {
      return propertyExistsOnObject('Worker', window);
    };

    var videoTest = function () {
      return !!createDummyElement('canPlayType', 'video');
    };

    var videoFormatsTest = function () {
      if (!videoTest()) return false;

      var codecs = [
        'video/mp4; codecs="avc1.42E01E, mp4a.40.2"', // H.264 Baseline video and AAC LC audio in an MPEG-4 container
        'video/ogg; codecs="theora, vorbis"', // Theora video and Vorbis audio in an Ogg container
        'video/webm; codecs="vp8, vorbis"' // Webm
      ];

      for (var i = codecs.length; i--;) {
        var type = codecs[i];
        // canPlayType() will return an empty string if it doesn't think the browser can handle the video format
        if (createDummyElement('canPlayType', 'video', type) === '') return false;
      }

      return true;
    };

    /* Public */
    
    function methods () {
      this.canvas = canvasTest;
      this.canvastext = canvasTextTest;
      this.formautofocus = formAutoFocusTest;
      this.geolocation = geolocationTest;
      this.history = historyApiTest;
      this.localstorage = localStorageTest;
      this.microdata = microdataTest;
      this.offline = offlineTest;
      this.placeholder = placeholderTest;
      this.webworkers = webWorkersTest;
      this.video = videoTest;
      this.videoformats = videoFormatsTest;
    }

    return Object.create(new methods());
  };

  // Attach 'browserTest' object to global 'doorman' object
  return (doorman.browserTest = Object.create(new browserTest()));

}(doorman || {}));
