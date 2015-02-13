// redirect.js
// Todo: test to see if valid url

var redirect = function (redirectTo) {

  // Don't redirect if the browser is valid
  if (this.isValid) return this;

  // redirect to specified location or a default
  window.location.replace(redirectTo || "http://whatbrowser.org/");
};
