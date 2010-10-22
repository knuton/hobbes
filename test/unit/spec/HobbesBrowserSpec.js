describe('Browser', function() {
  
  describe('creating output scope for HTML element', function () {
    
    it('should refuse creating scope without element', function () {
      expect(function () {
        hobbes.browser.outputScope();
      }).toThrow(new TypeError('Expected element reference but none given'));
    });
    
    it('should refuse creating scope if element reference is non-present ID', function () {
      expect(function () {
        hobbes.browser.outputScope("missing");
      }).toThrow(new Error('ID was given, but no such element found'));
    });
    
    it('should refuse creating scope if referenced element is not HTML element', function () {
      expect(function () {
        hobbes.browser.outputScope({wrong: 'type'});
      }).toThrow(new Error('Referenced object is not a DOM element'));
    });
    
    it('should return wrapped element on receiving element', function () {
      var nakedElem = document.createElement('div');
      var wrappedElem = hobbes.browser.outputScope(nakedElem);
      expect(wrappedElem).toBeDefined();
    });
    
    it('should return wrapped element on receiving element ID', function () {
      var nakedElem = document.createElement('div');
      nakedElem.id = 'findme';
      fillFixtureContainer(nakedElem);
      var wrappedElem = hobbes.browser.outputScope('findme');
      expect(wrappedElem).toBeDefined();
    });
    
  });
  
  describe('using environment System', function () {
    
    it('should append text to the CLI element', function () {
      var nakedElem = document.createElement('div');
      var environment = hobbes.browser.outputScope(nakedElem);
      
      environment.System.out.print('text');
      expect(nakedElem.innerHTML).toEqual('text');
      
      environment.System.out.println('text');
      expect(nakedElem.innerHTML).toEqual('texttext\n');
    });
    
  });
  
});