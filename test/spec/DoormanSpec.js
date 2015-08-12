/* global waitsFor */
/* global runs */
/* global doorman */
/* global beforeEach */
/* global describe */
/* global it */
/* global expect */

describe("doorman", function () {
  
  // High-level tests
  
  it("is defined.", function () {
    expect(doorman).toBeDefined();
  });
  
  it("has a check method.", function () {
    expect(doorman.check).not.toBeNull();
  });

});

describe("doorman.check()", function () {
  
  var dm;
    
  beforeEach(function (done) {
    dm = doorman;
    done();
  });
  
  describe('when finished doing check', function () {
    var res;
    var rdr;
    
    beforeEach(function (done) {
      doorman.check(function (result, redir) {
        res = result;
        rdr = redir;
        done();
      });  
    });
    
    it('should be valid.', function () {
      expect(res.valid).toBe(true);
    });
    
  });
});