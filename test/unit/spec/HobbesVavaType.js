require('../../../hobbes/extensions');
var type = require('../../../hobbes/vava/type');

describe('Vava Types', function () {
  
  describe('TypedVariable', function () {
    
    // Common
    var testVariable = null;
    
    beforeEach(function () {
      testVariable = new type.TypedVariable('Foo', 'bar');
    });
    
    it('should tell its Vava type', function () {
      expect(testVariable.getVavaType()).toBe('Foo');
    });
    
    it('should set correct default for int', function () {
      testVariable = new type.TypedVariable('int', 'foo');
      expect(testVariable.get().get()).toBe(0);
    });
    
  }); // end TypedVariable
  
  describe('Typed values', function () {
    
    // Common
    var testValue = null;
    
    // Used for tests concerning all typed values
    function commonTypedValueTests() {
      // it should implement TypedValueInterface
      expect(type.TypedValueInterface.check(testValue)).not.toBeDefined();
    };
    
    describe('TypedValue', function () {
      
      beforeEach(function () {
        testValue = new type.TypedValue('foo', 'bar');
      });
      
      it('should satisfy common requirements for typed values', commonTypedValueTests);
      
      it('should have type `foo`', function () {
        expect(testValue.getVavaType()).toBe('foo');
      });
      
      it('should have value `bar`', function () {
        expect(testValue.get()).toBe('bar');
      });
      
    }); // end TypedValue
    
    describe('IntValue', function () {
      
      beforeEach(function () {
        testValue = new type.IntValue();
      });
      
      it('should satisfy common requirements for typed values', commonTypedValueTests);
      
      it('should have type `int`', function () {
        expect(testValue.getVavaType()).toBe('int');
      });
      
      it('should have value 0 by default', function () {
        expect(testValue.get()).toBe(0);
      });
      
      it('should have value 5 if 5 is given', function () {
        testValue = new type.IntValue(5);
        expect(testValue.get()).toBe(5);
      });
      
    }); // end IntValue
    
  }); // end Typed values
  
}); // end Vava Types
