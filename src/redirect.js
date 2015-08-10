// Name: redirect.js
// Description: Redirect a browser to a url

(function (doorman) {

  var redirect = function (redirectTo) {

    // Don't redirect if the browser is valid
    if (this.valid) return this;

    // Redirect to specified location or a default
    window.location.replace(redirectTo || "http://whatbrowser.org/");
  };

  // Attach 'redirect' method to global doorman object
  return (doorman.redirect = redirect);

})(doorman || {});
