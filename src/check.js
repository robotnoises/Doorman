// check.js
// Checks to see if the current browser supports a certain feature

// Valid features to test:

//   formautofocus
//   canvas
//   geolocation
//   history
//   localstorage
//   microdata
//   offline
//   placeholder
//   webworkers
//   video

// note: if a user wants to use a hyphen to separate their words thats ok.
// ex: .check(form-autofocus) ...

(function (doorman) {

  // Private functions

  var getFeaturesToTest = function (toTest) {

    var features = [];

    // Check to see if toTest is undefined (test all) a string or an array
    if (typeof toTest === 'undefined') {
      features = validFeatures;
    } else if (typeof toTest === 'string') {
      features.push(toTest);
    } else {
      features = toTest;
    }

    return features;
  };

  // Public functions

  var check = function (toTest, redirectTo) {

    var tester = this.browserTest;
    var features = getFeaturesToTest(toTest);

    for (var i = features.length; i--;) {
      // Dont waste any more time if a previous test has already failed
      if (!this.isValid) break;

      var feature = features[i].removeChar('-').toLowerCase();

      // Check to see if test exists
      if (typeof tester[feature] !== 'function') {
        throw new Error(feature + 'is not a valid browser test.');
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
