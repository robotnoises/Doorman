// Testing

var foo = {};

(function () {
  foo.prototype.saySomething = function () {
    return 'hi';
  }

  return foo;
}());
