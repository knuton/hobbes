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
  
});