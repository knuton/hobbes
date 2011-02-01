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
  return TypedValue.defaults[this.vavaType] || new NullValue();
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

// NATIVE TYPES

// TODO Document and Test!
var BooleanValue = exports.BooleanValue = function (rawValue) {
  
  this.vavaType = 'boolean';

  if (rawValue) {
    if (rawValue !== true && rawValue !== false) {
      throw new Error('Expected JavaScript boolean');
    }
    this.rawValue = rawValue;
  } else {
    this.rawValue = false;
  }

};

BooleanValue.inherits(TypedValue);

BooleanValue.stored = {};

/**
 * Used to intern BooleanValues for efficiency and object identity.
 *
 * Looks up the existing object for true/false and creates one if none is
 * present. The object is then returned.
 *
 * @param bool The boolean value to lookup/insert
 */
BooleanValue.intern = function (bool) {
  if (this.stored[bool])
    return this.stored[bool];
  else
    return this.stored[bool] = new this(bool);
};

// LOGICAL OPERATIONS
BooleanValue.prototype.not = function () {
  return BooleanValue[String(!this.get())];
};

BooleanValue.prototype.and = function (other) {
  return BooleanValue[String(this.get() && other.get())];
};

BooleanValue.prototype.or = function (other) {
  return BooleanValue[String(this.get() || other.get())];
};

BooleanValue['true'] = new BooleanValue(true);
BooleanValue['false'] = new BooleanValue(false);

// TODO how to handle inheritance here?
var IntegralValue = function (rawValue) {
  
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

IntegralValue.inherits(TypedValue);

// ARITHMETIC
IntegralValue.prototype.inverse = function () {
  return IntValue.intern(this.get() * -1);
};

IntegralValue.prototype.add = function (other) {
  return IntValue.intern(this.toInt().get() + other.toInt().get());
};

IntegralValue.prototype.subtract = function (other) {
  return this.add(other.inverse());
};

IntegralValue.prototype.times = function (other) {
  return IntValue.intern(this.toInt().get() * other.toInt().get());
};

IntegralValue.prototype.divide = function (other) {
  var thisRaw = this.toInt().get(),
      otherRaw = other.toInt().get();
  var remainder = thisRaw % otherRaw;
  return IntValue.intern((thisRaw - remainder) / otherRaw);
};

IntegralValue.prototype.modulo = function (other) {
  return IntValue.intern(this.toInt().get() % other.toInt().get());
};

// TODO Overflow of long type
IntegralValue.prototype.toInt = function () {
  return IntValue.intern(this.get());
};

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

IntValue.inherits(IntegralValue);

IntValue.stored = {};

/**
 * Used to intern IntValues for efficiency and object identity.
 *
 * Looks up the existing object for a given number and creates one if none is
 * present. The object is then returned.
 *
 * @param number The number to lookup/insert
 */
IntValue.intern = function (number) {
  if (this.stored[number])
    return this.stored[number];
  else
    return this.stored[number] = new this(number);
};

// Reference Types
var NullValue = exports.NullValue = function () {
  this.vavaType = 'null';

  this.rawValue = null;
}

NullValue.inherits(TypedValue);

//// NEEDS TO BE AT THE END
// Lookup table for constructors for simple (?) types
TypedValue.defaults = {
  "boolean" : BooleanValue.intern(false),
  "int" : IntValue.intern(0)
};
