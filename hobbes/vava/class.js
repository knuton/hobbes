var VavaClass = exports.VavaClass = function (vavaClassName, vavaClassDefinition) {
  
  this.vavaClassName = vavaClassName;
  this.vavaFields = vavaClassDefinition.fields || [];
  this.vavaMethods = vavaClassDefinition.methods || [];
  
  setModifiers(this, vavaClassDefinition.vavaModifiers);
  
};

function setModifiers (classInstance, modifierOptions) {
  modifierOptions = modifierOptions || {};
  classInstance.vavaVisibility = modifierOptions.vavaVisibility || 'default';
}