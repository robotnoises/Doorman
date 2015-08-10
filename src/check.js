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

  var check = function (toTest, callback) {

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
    }
    
    // If a user has provided a callback, return that,
    // otherwise, fall-through to the next method call in the chain
    if (typeof callback !== 'undefined') {
      callback(this.valid, this.redirect);
    } else {
      return this;
    }
  };

  // Attach 'check' method to global 'doorman' object
  return (doorman.check = check);

})(doorman || {});
