var type = (typeof hobbes !== 'undefined' && hobbes.vava.type) || require('./type');

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
  this.vavaFormalParameters = vavaFormalParameters || [];
  this.vavaBlock = vavaBlock;
  
};

/**
 * Returns the method's name.
 */
VavaMethod.prototype.name = function () {
  return this.vavaMethodName;
};

VavaMethod.prototype.signature = function () {
  return this.name() + '(' + this.formalParameterTypes().join(',') + ')';
};

VavaMethod.prototype.getVavaType = function () {
  return this.vavaReturnType;
};

VavaMethod.prototype.formalParameterTypes = function () {
  return this.vavaFormalParameters.map(function (fp) {
    return fp.vavaType;
  });
};

/**
 * Calls its block after checking type validity of arguments.
 *
 * @param args Array of parameters
 */
VavaMethod.prototype.call = function (scope, args) {
  
  var locals = {};

  for (var i = 0; i < this.vavaFormalParameters.length; i++) {
    var identifier = this.vavaFormalParameters[i].identifier;
    var value = args[i];
    locals[identifier] = new type.TypedVariable(value.getVavaType(), identifier, value);
  }
  return this.vavaBlock.apply(scope.__descend(locals));
  
};
