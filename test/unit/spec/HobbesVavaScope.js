require('../../../hobbes/extensions');
var scope = require('../../../hobbes/vava/scope');

describe('Vava Scope', function () {
  
  // Common
  var testScope = null;
  
  beforeEach(function () {
    testScope = new scope.Scope();
  });

  it('should accept initial values', function () {
    testScope = new scope.Scope({a: 1});
    expect(testScope['a']).toBe(1);
  });
  
  it('should accept value addition', function () {
    testScope.__add({a: 1});
    expect(testScope['a']).toBe(1);
  });
  
  it('should inherit parent scope values', function () {
    testScope['a'] = 0;
    newScope = testScope.__descend();
    expect(testScope['a']).toBe(0);
  });
  
  it('should not overwrite parent scope values', function () {
    testScope['a'] = 0;
    newScope = testScope.__descend();
    newScope['a'] = 1;
    expect(testScope['a']).toBe(0);
  });

});
