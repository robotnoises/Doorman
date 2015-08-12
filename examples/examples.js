/* Check all features and redirect */

doorman.check();


/* Check 1 feature and redirect */

// doorman.check('canvas');


/* Check a couple of features... */

// doorman.check(['canvas', 'history', 'webworkers']);


/* Single feature test with callback */

// doorman.check('canvas', function (isSupported) {
//   var msg = isSupported ? 'This is supported.' : 'This is not supported.';
//   console.log(msg);
// });


/* Check a few with chaining */

// doorman
//   .check('canvas')
//   .check('history')
//   .check('webworkers')
//   .redirect('http://wikipedia.com');


/* Check a few with callback and redirect */

// doorman.check(['canvas', 'webworkers'], function (result, redirect) {
//   if (!result.valid) {
//     redirect('http://bing.com');
//   }
// });


/* Check all with a callback and redirect */

// doorman.check(function (result, redirect) {
//   if (!result.valid) {
//     redirect('http://bing.com');
//   }
// });


/* Muliple callbacks */

// doorman
//   .check('webworkers') // if invalid, would redir to whatbrowser.org
//   .check('canvas', function (result, redirect) {
//     if (!result.valid) {
//       redirect('http://www.yahoo.com');
//     }
//   })
//   .check('history', function (result, redirect) {
//     if (!result.valid) {
//       redirect('http://www.google.com');
//     }
//   });
  