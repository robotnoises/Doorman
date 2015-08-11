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
  
  // Flags
  var redirecting = false;
  
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

  var check = function () {
    
    // Potential parameters
    var toTest;
    var callback;
    
    // Get arguments
    var args = Array.prototype.slice.call(arguments);
    
    for (var i = 0, max = args.length; i < max; i++)  {
      // If the first arg is a function...
      if (typeof args[i] === 'function') {
        // Assume it's a callback
        callback = args[i];
      } else {
        // else, assume it's a feature or features
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
    var tester = this.browserTest;
    var features = getFeaturesToTest(toTest, tester);
  
    for (var i = features.length; i--;) {
        
      // Dont waste any more time if a previous test has already failed
      if (!this.valid) break;

      var feature = features[i].removeChar('-').toLowerCase();
  
      // Check to see if test exists
      if (typeof tester[feature] !== 'function') {
        throw new Error(feature + ' is not a valid browser test.');
      }
  
      // Run the test
      this.valid = tester[feature]();
      this.failedTest = (this.valid) ? '' : feature;
    }
      
    // If a user has provided a callback... 
    if (typeof callback !== 'undefined') {
      callback({ valid: this.valid, failedTest: this.failedTest }, redirect);
      return this;
    } else {
      if (this.valid) {
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
