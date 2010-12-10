/**
 * Creates a VavaMethod object.
 *
 * @param vavaMethodName The name of the method
 * @param vavaFormalParameters An array containing dictionaries of name and type of the formal parameters
 * @param vavaBlock A function to be called when the method gets called
 *
 *   new VavaMethod('main', [{identifier:'foo',vavaType:'int'}], function () {return 1;})
 */
 // TODO modifiers
var VavaMethod = exports.VavaMethod = function (vavaMethodName, vavaReturnType, vavaFormalParameters, vavaBlock) {
  
  this.vavaMethodName = vavaMethodName;
  this.vavaFormalParameters = vavaFormalParameters;
  this.vavaBlock = vavaBlock;
  
};

/**
 * Calls its block after checking type validity of arguments.
 *
 * @param args Array of parameters
 */
VavaMethod.prototype.call = function (args) {
  
  for (var i = 0; i < this.vavaFormalParameters; i ++) {
    if (args[i].vavaType() !== this.vavaFormalParameters[i].vavaType) {
      // TODO Throw Java-style error
    }
  }
  // TODO Check return type?
  return this.vavaBlock.apply(this, args);
  
};