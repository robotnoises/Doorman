(function () {
  return 'hi';
}());
// banish.js

(function () {
  console.log('hi');
}());

// Testing

var foo = {};

(function () {
  foo.prototype.saySomething = function () {
    return 'hi';
  }

  return foo;
}());
