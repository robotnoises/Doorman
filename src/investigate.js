// investigate.js

// Todo: need to move this
var validFeatures = [
  'navigation',
  'test'
];

var investigate = function (toTest, redirectTo) {
  // Features to test
  var features = [];
  var isValid = true;

  // Check to see if toTest is undefined (test all) a string, an array
  if (typeof toTest === 'undefined') {
    features = validFeatures;
  } else if (typeof toTest === 'string') {
    features.push(toTest);
  } else {
    features = toTest;
  }

  for (var i = features.length; i--;) {
    if (!this.isValid) break;

    var feature = features[i];

    // If the feature is not listed as a valid feature to test, throw an Error
    if (!validFeatures.contains(feature)) {
      throw new Error(feature + ' is not a valid feature to test.');
    }

    // If a previous investigate() has failed (and it did not have a redirect url)
    // either call redirect now (only in the case of a present  redirect url) or
    // fall-through to the next function in the chain.
    if (!this.isValid) {
      return (redirectTo) ? this.redirect(redirectTo) : this;
    }

    // Check to see if test exists
    if (typeof browserTests[feature] !== 'function') {
      throw new Error(feature + ' is not a valid browser test function.');
    }

    this.isValid = browserTests[feature]();
  }

  return (!this.isValid && redirectTo) ? this.redirect(redirectTo) : this;
};
