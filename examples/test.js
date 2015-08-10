// Check all features and redirect

// doorman.check().redirect('http://www.google.com');

// Check 1 feature and redirect

// doorman.check('canvas').redirect('http://www.google.com');

// Check a couple of features...

// doorman.check(['canvas', 'history', 'webworkers']).redirect('http://www.google.com');

// Single feature test with callback

// doorman.check('canvas', function (isSupported) {
//   var msg = isSupported ? 'This is supported.' : 'This is not supported.';
//   console.log(msg);
// });

// Check a few with callback and redirect

doorman.check(['canvas', 'history'], function (isSupported, redirect) {
  if (!isSupported) {
    redirect();
  }
});
