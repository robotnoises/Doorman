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
    };

    return Object.create(TestMethods);
  };

  // Attach 'browserTest' object to global 'doorman' object
  return (doorman.browserTest = Object.create(BrowserTests()));

}(doorman || {}));
