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
  if (typeof methodDefinitions !== 'object' || this.vavaMethods) return;
  this.vavaMethods = [];
  for (methodName in methodDefinitions) {
    var methodDef = methodDefinitions[methodName];
    this.vavaMethods[methodDef.signature()] = methodDef;
  }
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
