/* global doorman */
/* global beforeEach */
/* global describe */
/* global it */
/* global expect */

describe("Doorman", function () {
  
  // High-level checks
  
  it("is defined.", function () {
    expect(doorman).toBeDefined();
  });
  
  it("has a check method.", function () {
    expect(doorman.check).not.toBeNull();
  });
  
  /* Utility stuff */
  
  // String.removeChar('...');
  
  it("removes a hyphen from a string", function () {
    var hyphenated = 'hello-world';
    var noHyphen = hyphenated.removeChar('-');
    
    expect(hyphenated.indexOf('-') >= 0).toBe(true);    
    expect(noHyphen.indexOf('-') === -1).toBe(true);
  })
  
  it("removes multiple hyphens from a string", function () {
    var hyphenated = 'hello-world-part-dos';
    var noHyphen = hyphenated.removeChar('-');
    
    expect(hyphenated.indexOf('-') >= 0).toBe(true);    
    expect(noHyphen.indexOf('-') === -1).toBe(true);
  })
  
  it("removes a hyphen from a beginning of string", function () {
    var hyphenated = '-helloworld';
    var noHyphen = hyphenated.removeChar('-');
    
    expect(hyphenated.indexOf('-') >= 0).toBe(true);    
    expect(noHyphen.indexOf('-') === -1).toBe(true);
  })
  
  it("removes a hyphen from a end of string", function () {
    var hyphenated = 'helloworld-';
    var noHyphen = hyphenated.removeChar('-');
    
    expect(hyphenated.indexOf('-') >= 0).toBe(true);    
    expect(noHyphen.indexOf('-') === -1).toBe(true);
  })
  
  it("does nothing if a hyphen is not in string", function () {
    var str = 'helloworld';
    var noHyphen = str.removeChar('-');
    
    expect (str.length === noHyphen.length).toBe(true);
    expect(str.indexOf('-') === -1).toBe(true);    
    expect(noHyphen.indexOf('-') === -1).toBe(true);
  })

});