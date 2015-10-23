// Doorman
// Created by David Nichols
// davenich@gmail.com
// Version 0.2.2

// Name: utils.js
// Description: Some useful stuff

// Doug Crockford's Object.create shim
if (typeof Object.create !== 'function') {
  Object.create = function(o) {
    function F() {}
    F.prototype = o;
    return new F();
  };
}

// Array.contains(a_string), returns true or false
if (typeof Array.contains !== 'function') {
  Array.prototype.contains = function(str) {
    if (typeof str !== 'string') {
      throw new TypeError('Parameter ' + str + ' is not a string.');
    } else {
      var that = this;
      for (var i = 0, max = this.length; i < max; i++) {
        if (that[i] === str) return true;
      }
      return false;
    }
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
  
  var Dm = {
    valid: true,
    failedTest: ''
  };

  return Object.create(Dm);

})();

// Name: browserTest.js
// Description: All of the browser-specific feature tests

// Note: These tests are pretty much just an implementation* of Chapter 2 in
// Mark Pilgrim's "Dive Into HTML5," which is an amazing and informative book
// that can be found here: http://diveintohtml5.info/detect.html

// *Minus a few fatures that still have limited browser adoption.

(function (doorman) {

  var BrowserTests = function () {

    /* Private */

    var propertyExistsOnObject = function (prop, obj) {
      try {
        return (typeof obj === 'object') && (prop in obj) && obj[prop] !== null;
      } catch (ex) {
        return false;
      }
    };

    var createDummyElement = function (element, prop, optionalParam) {
      return (optionalParam) ?
        document.createElement(element)[prop](optionalParam) :
        document.createElement(element)[prop];
    };

    /* Specific feature tests */

    var canvasTest = function() {
      return !!createDummyElement('canvas', 'getContext');
    };

    var canvasTextTest = function () {
      if (!canvasTest()) return false;

      var fakeContext = createDummyElement('canvas', 'getContext', '2d');
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
      return !!createDummyElement('video', 'canPlayType');
    };

    var html5InputsTest = function () {

      // Note: does not detect the following types due to limited adoption
      
      // color
      // date
      // month
      // week
      // time
      // datetime
      // datetime-local 
      
      var types = [
        'search',
        'number',
        'range',
        'tel',
        'url',
        'email'
      ];
      
      for (var i = 0, max = types.length; i < max; i++) {
        
        var input = document.createElement('input');
        input.setAttribute('type', types[i]);
        
        // If the browser can't handle the HTML5 input type, 
        // it will retain the default value, which is "text""
        if (input.type === 'text') return false;
      }
      
      return true;
    };

    /* Public */
    
    var TestMethods = {
      // Note: these need to be lower-case
      autofocus: formAutoFocusTest,
      canvas: canvasTest,
      canvastext: canvasTextTest,
      geolocation: geolocationTest,
      history: historyApiTest,
      inputtypes: html5InputsTest,
      localstorage: localStorageTest,
      offline: offlineTest,
      placeholder: placeholderTest,
      webworkers: webWorkersTest,
      video: videoTest
    }

    return Object.create(TestMethods);
  };

  // Attach 'browserTest' object to global 'doorman' object
  return (doorman.browserTest = Object.create(BrowserTests()));

}(doorman || {}));

// Name: check.js
// Description: Checks to see if the current browser supports a certain feature

// Valid features to test:
// formautofocus
// canvas
// canvastext
// geolocation
// history
// html5 input types
// localstorage
// offline
// placeholder
// webworkers
// video

// Note: if a user wants to use a hyphen to separate their words, thats ok.
// ex: .check(form-autofocus) ...

(function (doorman) {
  
  /* Flags */
  
  var redirecting = false;
  
  /* Private */
  
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
  
  /* Public */
  
  var check = function () {
    
    // Potential parameters
    var toTest;
    var callback;
    
    // Get arguments
    var args = Array.prototype.slice.call(arguments);
    
    for (var i = 0, argsMax = args.length; i < argsMax; i++)  {
      // If the first arg is a function...
      if (typeof args[i] === 'function') {
        // Assume it's a callback
        callback = args[i];
      } else {
        // else, assume it's a specific feature or features to test
        toTest = args[i];
      }
    }
    
    // Redirect
    var redirect = function (redirectTo) {
      if (!redirecting) {
        redirecting = true;
        // Redirect to specified location or a default
        window.location.replace(redirectTo || "http://whatbrowser.org/");  
      }
    };
          
    // Build tests    
    var tester = doorman.browserTest;
    var features = getFeaturesToTest(toTest, tester);
  
    for (var i = 0, featuresMax = features.length; i < featuresMax; i++) {
        
      // Dont waste any more time if a previous test has already failed
      if (!doorman.valid) break;

      var feature = features[i].removeChar('-').toLowerCase();
  
      // Check to see if test exists
      if (typeof tester[feature] !== 'function') {
        throw new Error(feature + ' is not a valid browser test.');
      }
  
      // Run the test
      doorman.valid = tester[feature]();
      doorman.failedTest = (doorman.valid) ? '' : feature;
    }
      
    // If a user has provided a callback... 
    if (typeof callback !== 'undefined') {
      callback({ valid: doorman.valid, failedTest: doorman.failedTest }, redirect);
      return this;
    } else {
      if (doorman.valid) {
        // If it's valid, just fall through to the next check
        return this;
      } else {
        // Else, redirect
        redirect();
      }
    }
  };
  
  // Attach 'check' method to global 'doorman' object
  return (doorman.check = check);

})(doorman || {});
