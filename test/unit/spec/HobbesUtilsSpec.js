var utils = require('../../../hobbes/utils');

describe('Utils', function () {
  
  describe('indentation helper', function () {
    
    it('should create zero spaces for no indentation', function () {
      expect(utils.indent('a', 0)).toBe('a');
    });
    
    it('should create two spaces for indentation of 2', function () {
      expect(utils.indent('a', 2)).toBe('  a');
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

  describe('Mixin', function () {
    
    it('should copy methods', function () {
      var Farmer = function () {};
      var Robber = new utils.Mixin('Robber', {steal : function () { return 'This is a stick-up!'; }});
      Robber.mixInto(Farmer);
      expect((new Farmer()).steal()).toBe('This is a stick-up!');
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
    
    it('should return equal object if one passed', function () {
      expect(utils.merge({foo: 1, bar: 2})).toEqual({foo: 1, bar: 2});
    });
    
    it('should return merged object if several passed', function () {
      expect(utils.merge({foo: 1}, {bar: 2})).toEqual({foo: 1, bar: 2});
    });
    
    it('should return merged object for array of objects', function () {
      expect(utils.merge([{foo: 1}, {bar: 2}])).toEqual({foo: 1, bar: 2});
    });
    
    it('should reject weird input', function () {
      expect(function () {
        utils.merge('Marge Simpson');
      }).toThrow(new TypeError('Expected objects to merge, got string.'));
    });
    
  });
  
  describe('Object Path', function () {
    
    var obj = {hi: {hey: {ha: 5}}};

    it('should resolve path', function () {
      expect(utils.objectPath(obj, ['hi', 'hey']).ha).toBe(5);
    });
    
    it('should resolve missing path to undefined', function () {
      expect(utils.objectPath(obj, ['hi', 'hey', 'huh'])).toBe(undefined);
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
    
    describe('Wrap as function', function () {
      
      it('should wrap the code into a function literal', function () {
        expect(utils.builder.wrapAsFunction('alert("o hai");')).toBe('function () {\nalert("o hai");\n}');
      });
      
      it('should wrap the expressions into a function literal', function () {
        expect(utils.builder.wrapAsFunction(['alert("o hai");','return false;'])).toBe('function () {\nalert("o hai");\nreturn false;\n}');
      });
      
    });
    
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
    
    describe('Scope', function () {
      
      it('should return scope addition call with semicolon', function () {
        expect(utils.builder.addPairToScope("foo", "5")).toBe('this.__add({foo:5});');
      });
      
      it('should return scope addition call without semicolon', function () {
        expect(utils.builder.addPairToScope("foo", "5", false)).toBe('this.__add({foo:5})');
      });
    }); // end of Scope 
    
    describe('Array', function () {
      
      it('should return an array literal', function () {
        expect(utils.builder.array([1,2,3,4,'"5"'])).toBe('[1,2,3,4,"5"]');
      });
      
    }); // end of Array
    
    describe('Join to object', function () {
      
      it('should return an object literal string', function () {
        expect(utils.builder.joinToObject('a:1','b:2,c:"d"')).toBe('{a:1,b:2,c:"d"}');
      });
      
    }); // end of Join to object
    
    describe('Object to literal', function () {
      
      it('should return an object literal string', function () {
        expect(utils.builder.objectToLiteral({a: 1, b: 2})).toBe('{"a":1,"b":2}');
      });
      
    }); // end of Object to literal
    
    describe('String wrapper', function () {
      
      it('should put doublequotes around a string', function () {
        expect(utils.builder.string('a')).toBe('"a"');
      });
      
    }); // end of String wrapper
    
  }); // end JS builder helpers
  
});
