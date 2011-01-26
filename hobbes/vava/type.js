/**
 * Defines objects handling type in the runtime environment.
 */

var utils = (typeof hobbes !== 'undefined' && hobbes.utils) || require('../utils');

/**
 * @constructor
 * Creates a typed variable, possessing name, type and value.
 *
 * @param vavaType The variable's type
 * @param identifier The variable's name
 * @param typedValue The variable's value (optional)
 */
var TypedVariable = exports.TypedVariable = function (vavaType, identifier, typedValue) {
  
  this.vavaType = vavaType;
  this.identifier = identifier;
  
  this.set(typedValue || this.defaultValue());
  
};

/**
 * Returns the Vava type of the variable.
 */
TypedVariable.prototype.getVavaType = function () {
  return this.vavaType;
};

/**
 * Returns the default value for the variable's Vava type.
 */
TypedVariable.prototype.defaultValue = function () {
  return TypedValue.typeConstructors[this.vavaType] ? new TypedValue.typeConstructors[this.vavaType]() : new NullValue();
};

/**
 * Sets the typed value of the variable.
 * @throws Error for wrong type
 */
TypedVariable.prototype.set = function (typedValue) {
  
  if (this.isAssignmentCompatible(typedValue)) {
    this.typedValue = typedValue;
  } else {
    // TODO How to handle Vava errors?
    throw new Error("Vava Type error: Expected " + this.getVavaType() + ", but was " + typedValue.getVavaType() + ".");
  }
  
};

/**
 * Checks if variable is of native type.
 *
 * That is, whether it is one of {boolean, byte, short, int, long, char, float, double}.
 */
TypedVariable.prototype.isPrimitive = function () {
  var vT = this.getVavaType();
  return (vT === "boolean" || vT === "byte" || vT === "short" || vT === "int" || vT === "long" || vT === "char" || vT === "float" || vT === "double");
}

/**
 * Checks for compatibility of own and provided type.
 *
 * TODO Autocasting for natives
 * TODO Hierarchical compatibility for reference types
 */
TypedVariable.prototype.isAssignmentCompatible = function (typedValue) {

  if (this.isPrimitive()) {
    return typedValue.getVavaType() === this.getVavaType();
  } else {
    var vavaType = typedValue.getVavaType();
    return (vavaType === "null" || vavaType === this.getVavaType());
  }
};

/**
 * Returns the typed value.
 */
TypedVariable.prototype.get = function () {
  return this.typedValue;
};

var TypedValueInterface = exports.TypedValueInterface = new utils.Interface('TypedValue', 'get', 'getVavaType');

/**
 * @constructor
 * Creates a typed value, consisting of type and value.
 *
 * Sets its value to the default (`null` for reference types, varied for
 * primitive types) if no value is given.
 * @param vavaType The type
 * @param value The value
 */
var TypedValue = exports.TypedValue = function (vavaType, value) {
  
  this.vavaType = vavaType;
  
  if (value) {
    this.rawValue = value;
  }
  
};

TypedValue.prototype.getVavaType = function () {
  return this.vavaType;
};

TypedValue.prototype.get = function () {
  return this.rawValue;
};

// TODO how to handle inheritance here?
var IntValue = exports.IntValue = function (rawValue) {
  
  this.vavaType = 'int';
  
  if (rawValue) {
    // TODO More precise testing of value
    // Next step: Add this to AST -> compile -> test with Java src files
    if (isNaN(rawValue)) {
      throw new Error('Not a number!');
    }
    this.rawValue = rawValue;
  } else {
    this.rawValue = 0;
  }
  
}

IntValue.inherits(TypedValue);

var NullValue = exports.NullValue = function () {
  this.vavaType = 'null';

  this.rawValue = null;
}

NullValue.inherits(TypedValue);

//// NEEDS TO BE AT THE END
// Lookup table for constructors for simple (?) types
TypedValue.typeConstructors = {
  "int" : IntValue
};
