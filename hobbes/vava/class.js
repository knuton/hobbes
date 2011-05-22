var entity = (typeof hobbes !== 'undefined' && hobbes.vava.entity) || require('./entity');

var VavaClass = exports.VavaClass = function (vavaClassName, vavaClassDefinition, scope) {
  
  this.vavaClassName = vavaClassName;
  this.setScope(scope);
  this.addFields(vavaClassDefinition.fields);
  this.scope.__class = this.scope.__self = this;
  this.addMethods(vavaClassDefinition.methods);
  
  setModifiers(this, vavaClassDefinition.vavaModifiers);
  
};

VavaClass.inherits(entity.AccessControlledEntity);

VavaClass.prototype.addFields = function (fieldDefinitions) {
  if (!fieldDefinitions || !fieldDefinitions.length) return;
  for (var i = 0; i < fieldDefinitions.length; i++) {
    var fieldDef = fieldDefinitions[i];
    this.privateScope['__' + fieldDef.visibility].__add(fieldDef.variables);
  }
};

VavaClass.prototype.addMethods = function (methodDefinitions) {
  if (!methodDefinitions || !methodDefinitions.length || this.vavaMethods) return;
  this.vavaMethods = [];
  for (var i = 0; i < methodDefinitions.length; i++) {
    var methodDef = methodDefinitions[i];
    this.vavaMethods[methodDef.signature()] = methodDef;
  }
};

/**
 * Returns a truthy/false value depending on the class possessing a method
 * with the given signature.
 *
 * Returns the method's return type, if it does, otherwise returns false.
 *
 * e.g. vavaClass.hasMethod('fib(int)')
 */
VavaClass.prototype.hasMethod = function (methodSignature) {
  return !!this.vavaMethods[methodSignature] && this.vavaMethods[methodSignature].getVavaType();
};

/**
 * Sends the class a message to call its method of the provided name.
 *
 * @param methodName Name of the method to call
 * @param params Parameters to pass
 */
VavaClass.prototype.send = function (methodSignature, params) {
  return this.vavaMethods[methodSignature].call(this.privateScope, params);
};

function setModifiers (classInstance, modifierOptions) {
  modifierOptions = modifierOptions || {};
  classInstance.vavaVisibility = modifierOptions.vavaVisibility || 'default';
}
