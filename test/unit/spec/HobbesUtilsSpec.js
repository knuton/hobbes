var utils = require('../../../hobbes/utils');

describe('Utils', function () {
  
  describe('indentation helper', function () {
    
    it('should create zero spaces for no indentation', function () {
      expect(utils.indent(0)).toBe('');
    });
    
    it('should create two spaces for indentation of 2', function () {
      expect(utils.indent(2)).toBe('  ');
    });
    
  });
  
  describe('Interface', function () {
    
    it('should expect at least one method', function () {
      expect(function () {
        utils.Interface('ZenMind');
      }).toThrow(new Error('Interface constructor expected at least 2 arguments, but got 1.'));
    });
    
    it('should reject incomplete implementations', function () {
      var zenMind = {};
      var farmerInterface = new utils.Interface('Farmer', 'harvest');
      expect(function () {
        farmerInterface.check(zenMind);
      }).toThrow(new Error(zenMind + ' does not implement interface `Farmer`. Method `harvest` is missing.'));
    });
    
    it('should accept sufficient implementations', function () {
      var farmer = {harvest : function () {}};
      var farmerInterface = new utils.Interface('Farmer', 'harvest');
      expect(farmerInterface.check(farmer)).not.toBeDefined();
    });
  });
  
  describe('Array test', function () {
    
    it('should recognize array', function () {
      expect(utils.isArray([])).toBe(true);
    });
    
    it('should reject pseudo-array', function () {
      expect(utils.isArray({length:0})).toBe(false);
    });
    
  });
  
  describe('Object merge', function () {
    
    it('should return empty object if none passed', function () {
      expect(utils.merge()).toEqual({});
    });
    
    it('should return equal object if one passed', function () {
      expect(utils.merge({foo: 1, bar: 2})).toEqual({foo: 1, bar: 2});
    });
    
    it('should return merged object if several passed', function () {
      expect(utils.merge({foo: 1}, {bar: 2})).toEqual({foo: 1, bar: 2});
    });
    
  });
  
  describe('JS builder helpers', function () {
    
    describe('Variable declaration', function () {
      
      it('should build code with semicolon', function () {
        expect(utils.builder.declaration('foo')).toBe('var foo;');
      });
      
      it('should build code without semicolon', function () {
        expect(utils.builder.declaration('foo', false)).toBe('var foo');
      });
      
    }); // end of Variable declaration
    
    describe('Variable declaration and assignment', function () {
      
      it('should build code with semicolon', function () {
        expect(utils.builder.declarationAssignment('foo', 'bar')).toBe('var foo = bar;');
      });
      
      it('should build code without semicolon', function () {
        expect(utils.builder.declarationAssignment('foo', 'bar', false)).toBe('var foo = bar');
      });
      
    }); // end of Variable declaration and assignment
    
    describe('Function call', function () {
      
      it('should build empty call code with semicolon', function () {
        expect(utils.builder.functionCall('foo')).toBe('foo();');
      });
      
      it('should build call with parameters code with semicolon', function () {
        expect(utils.builder.functionCall('foo', ['a', 'b'])).toBe('foo(a, b);');
      });
      
      it('should build code without semicolon', function () {
        expect(utils.builder.functionCall('foo', ['a', 'b'], false)).toBe('foo(a, b)');
      });
      
    }); // end of Function call
    
    describe('Constructor call', function () {
      
      it('should build empty call code with semicolon', function () {
        expect(utils.builder.constructorCall('Foo')).toBe('new Foo();');
      });
      
      it('should build call with parameters code with semicolon', function () {
        expect(utils.builder.constructorCall('Foo', ['a', 'b'])).toBe('new Foo(a, b);');
      });
      
      it('should build code without semicolon', function () {
        expect(utils.builder.constructorCall('Foo', ['a', 'b'], false)).toBe('new Foo(a, b)');
      });
      
    }); // end of Constructor call
    
    describe('String wrapper', function () {
      
      it('should put doublequotes around a string', function () {
        expect(utils.builder.string('a')).toBe('"a"');
      });
      
    });
    
  });
  
});