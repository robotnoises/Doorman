/* global doorman */
/* global beforeEach */
/* global describe */
/* global it */
/* global expect */

describe("Array.contains()", function () {
  
  /* Utility stuff */
  
  // Array.contains('a_string');
  
  it('contains string.', function () {
    var str = 'foo';
    var array = ['foo', 'bar'];
    var result = array.contains(str);
    
    expect(result).toBe(true);
  });
  
  it('does not contain string.', function () {
    var str = 'fo';
    var array = ['foo', 'bar'];
    var result = array.contains(str);
    
    expect(result).toBe(false);
  });
  
  it('contains repeat string.', function () {
    var str = 'foo';
    var array = ['foo', 'bar', 'foo'];
    var result = array.contains(str);
    
    expect(result).toBe(true);
  });
  
  it('throws TypeError.', function () {
    function badStr() {
      var aintAString = 123;
      var array = ['foo', 'bar'];
      var dumb = array.contains(aintAString);
    }
    expect(badStr).toThrowError(TypeError, 'Parameter 123 is not a string.');
  });
  
});

describe("String.removeChar()", function () {
  
  // String.removeChar('...');
  
  it("removes a hyphen from a string", function () {
    var hyphenated = 'hello-world';
    var noHyphen = hyphenated.removeChar('-');
    
    expect(hyphenated.indexOf('-') >= 0).toBe(true);    
    expect(noHyphen.indexOf('-') === -1).toBe(true);
  });
  
  it("removes multiple hyphens from a string", function () {
    var hyphenated = 'hello-world-part-dos';
    var noHyphen = hyphenated.removeChar('-');
    
    expect(hyphenated.indexOf('-') >= 0).toBe(true);    
    expect(noHyphen.indexOf('-') === -1).toBe(true);
  });
  
  it("removes a hyphen from a beginning of string", function () {
    var hyphenated = '-helloworld';
    var noHyphen = hyphenated.removeChar('-');
    
    expect(hyphenated.indexOf('-') >= 0).toBe(true);    
    expect(noHyphen.indexOf('-') === -1).toBe(true);
  });
  
  it("removes a hyphen from a end of string", function () {
    var hyphenated = 'helloworld-';
    var noHyphen = hyphenated.removeChar('-');
    
    expect(hyphenated.indexOf('-') >= 0).toBe(true);    
    expect(noHyphen.indexOf('-') === -1).toBe(true);
  });
  
  it("does nothing if a hyphen is not in string", function () {
    var str = 'helloworld';
    var noHyphen = str.removeChar('-');
    
    expect(str.length === noHyphen.length).toBe(true);
    expect(str.indexOf('-') === -1).toBe(true);    
    expect(noHyphen.indexOf('-') === -1).toBe(true);
  });
  
  it("should be empty.", function () {
    var oneChar = '-';
    var empty = oneChar.removeChar('-');
    
    expect(empty).toBeFalsy();
  });
  
  it("should remain empty.", function () {
    var empty = '';
    var stillEmpty = empty.removeChar('-');
    
    expect(empty).toBeFalsy();
    expect(stillEmpty).toBeFalsy();
  });
  
});