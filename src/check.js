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
  
    for (var j = 0, featuresMax = features.length; j < featuresMax; j++) {
        
      // Dont waste any more time if a previous test has already failed
      if (!doorman.valid) break;

      var feature = features[j].removeChar('-').toLowerCase();
  
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
