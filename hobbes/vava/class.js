var entity = (typeof hobbes !== 'undefined' && hobbes.vava.entity) || require('./entity');

var VavaClass = exports.VavaClass = function (vavaClassName, vavaClassDefinition, scope) {
  
  this.vavaClassName = vavaClassName;
  this.setScope(scope);
  this.addFields(vavaClassDefinition.fields);
  this.scope.__class = this;
  this.vavaMethods = vavaClassDefinition.methods || [];
  
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


/**
 * Sends the class a message to call its method of the provided name.
 *
 * @param methodName Name of the method to call
 * @param params Parameters to pass
 */
VavaClass.prototype.send = function (methodName, params) {
  return this.vavaMethods[methodName].call(this.privateScope, params);
};

function setModifiers (classInstance, modifierOptions) {
  modifierOptions = modifierOptions || {};
  classInstance.vavaVisibility = modifierOptions.vavaVisibility || 'default';
}
