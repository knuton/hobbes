/**
 * Creates a VavaMethod object.
 *
 * @param vavaMethodName The name of the method
 * @param vavaFormalParameters An array containing dictionaries of name and type of the formal parameters
 * @param vavaBlock A function to be called when the method gets called
 *
 *   new VavaMethod('main', int, [{identifier:'foo',vavaType:'int'}], function (foo) {return 1;})
 */
 // TODO modifiers
var VavaMethod = exports.VavaMethod = function (vavaMethodName, vavaReturnType, vavaFormalParameters, vavaBlock) {
  
  this.vavaMethodName = vavaMethodName;
  this.vavaReturnType = vavaReturnType;
  this.vavaFormalParameters = vavaFormalParameters;
  this.vavaBlock = vavaBlock;
  
};

/**
 * Calls its block after checking type validity of arguments.
 *
 * @param args Array of parameters
 */
VavaMethod.prototype.call = function (scope, args) {
  
  var locals = {};

  for (var i = 0; i < this.vavaFormalParameters.length; i++) {
    if (args[i].getVavaType() !== this.vavaFormalParameters[i].vavaType) {
      // TODO Throw Java-style error
    }
    locals[this.vavaFormalParameters[i].identifier] = args[i];
  }
  // TODO Check return type?
  return this.vavaBlock.apply(scope.__descend(locals));
  
};
