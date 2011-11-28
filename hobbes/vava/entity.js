/**
 * Names are used to refer to entities declared in a program. A declared entity
 * is a package, class type, interface type, member (class, interface, field,
 * or method) of a reference type, parameter (to a method, constructor, or
 * exception handler), or local variable.
 */
var Entity = exports.Entity = function () {
  this.scope = {};
};

Entity.prototype.setScope = function (scope) {
  this.scope = scope;
};

/**
 * Allows access to an entity's scope.
 * Access control can be specified in a class, interface, method, or field
 * declaration to control when access to a member is allowed.
 *
 * @param name Name to look up
 */
Entity.prototype.access = function (name) {
  return this.scope[name];
};

var AccessControlledEntity = exports.AccessControlledEntity = function () {

};

AccessControlledEntity.inherits(Entity);

AccessControlledEntity.prototype.setScope = function (scope) {
  this.scope = scope.__descend();
  this.protectedScope = this.scope.__descend({__public: this.scope});
  this.defaultScope = this.protectedScope.__descend({__protected: this.protectedScope});
  this.privateScope = this.defaultScope.__descend({__default: this.defaultScope});
  this.privateScope.__private = this.privateScope;
};
