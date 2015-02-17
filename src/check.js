// check.js

// note: if a user wants to use a hyphen to separate their words, that's ok.
// ex: .check('form-autofocus') ...
var validFeatures = [
  'formautofocus',
  'canvas',
  'geolocation',
  'history',
  'localstorage',
  'microdata',
  'offline',
  'placeholder',
  'webworkers',
  'video'
];

var check = function (toTest, redirectTo) {
  // Features to test
  var features = [];
  var isValid = true;

  // Check to see if toTest is undefined (test all) a string, or an array
  if (typeof toTest === 'undefined') {
    features = validFeatures;
  } else if (typeof toTest === 'string') {
    features.push(toTest);
  } else {
    features = toTest;
  }

  for (var i = features.length; i--;) {
    // Don't waste any more time if a previous test has already failed
    if (!this.isValid) break;

    var feature = features[i].removeChar('-').toLowerCase();

    // If the feature is not listed as a valid feature to test, throw an Error
    if (!validFeatures.contains(feature)) {
      throw new Error(feature + ' is not a valid feature to test.');
    }

    // Check to see if test exists
    if (typeof browserTest[feature] !== 'function') {
      throw new Error(feature + ' is not a valid browser test function.');
    }

    // Run the test
    this.isValid = browserTest[feature]();
  }

  // If a feature test has failed and there is a redirect url in scope, call
  // redirect now, else fall-through to the next function call in the chain
  return (!this.isValid && redirectTo) ? this.redirect(redirectTo) : this;
};
