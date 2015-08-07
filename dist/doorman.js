// Doorman
// Created by David Nichols
// davenich@gmail.com
// Version 0.1.2

// Name: utils.js
// Description: Some useful extensions

// True prototypical object creation

if (typeof Object.create !== 'function') {
  Object.create = function(o) {
    function F() {}
    F.prototype = o;
    return new F();
  };
}

// Array.contains(a_string), returns true or false

if (typeof Array.contains !== 'function') {
  Array.prototype.contains = function(string) {
    var that = this;
    for(var i = this.length; i--;) {
      if (that[i] === string) return true;
    }
    return false;
  };
}

// Method to strip a character from a string

if (typeof String.removeChar !== 'function') {
  String.prototype.removeChar = function(char) {
    var that = this;
    return that.split(char).join('');
  };
}

// Name: doorman.js
// Description: This is the main module

var doorman = (function () {

  var dm = function () {
    this.isValid = true;
    this.check = {};
  };

  return Object.create(new dm());

})();

// Name: redirect.js
// Description: Redirect a browser to a url

(function (doorman) {

  var redirect = function (redirectTo) {

    // Don't redirect if the browser is valid
    if (this.isValid) return this;

    // Redirect to specified location or a default
    window.location.replace(redirectTo || "http://whatbrowser.org/");
  };

  // Attach 'redirect' method to global doorman object
  return (doorman.redirect = redirect);

})(doorman || {});

// Name: browserTest.js
// Description: All of the browser-specific feature tests

// Note: These tests are pretty much just an implementation of Chapter 2 in
// Mark Pilgrim's "Dive Into HTML5," which is an amazing and informative book
// that can be found here: http://diveintohtml5.info/detect.html

(function (doorman) {

  var browserTest = function () {

    // Generic test/utility functions

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

    // Specific feature tests

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
      if (!videoTest) return false;

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

    // Public test methods
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

// Name: check.js
// Description: Checks to see if the current browser supports a certain feature

// Valid features to test:
// formautofocus
// canvas
// canvastext
// geolocation
// history
// localstorage
// microdata
// offline
// placeholder
// webworkers
// video
// videoformats

// Note: if a user wants to use a hyphen to separate their words, thats ok.
// ex: .check(form-autofocus) ...

(function (doorman) {

  // Private functions

  var getFeaturesToTest = function (toTest, tester) {

    var features = [];

    // Check to see if toTest is undefined (test all) a string or an array
    if (typeof toTest === 'undefined') {
      // get a list of all of the test methods from the browserTest object
      var methodNames = [];

      for (var name in tester) {
        try {
          if (typeof tester[name] === 'function') {
            methodNames.push(name);
          }
        } catch (ex) {
          // Todo: swallow for now
        }
      }

      features = methodNames;
    }
    
    // It's a single test
    else if (typeof toTest === 'string') features.push(toTest);
    
    // It's an array
    else features = toTest;

    return features;
  };

  // Public functions

  var check = function (toTest, redirectTo) {

    var tester = this.browserTest;
    var features = getFeaturesToTest(toTest, tester);

    for (var i = features.length; i--;) {
      
      // Dont waste any more time if a previous test has already failed
      if (!this.isValid) break;

      var feature = features[i].removeChar('-').toLowerCase();

      // Check to see if test exists
      if (typeof tester[feature] !== 'function') {
        throw new Error(feature + ' is not a valid browser test.');
      }

      // Run the test
      this.isValid = tester[feature]();
    }

    // If a feature test has failed and there is a redirect url in scope call
    // redirect now else fall-through to the next function call in the chain
    return (!this.isValid && redirectTo) ? this.redirect(redirectTo) : this;
  };

  // Attach 'check' method to global 'doorman' object
  return (doorman.check = check);

})(doorman || {});
