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
  return TypedValue.constructorFor(this.vavaType).defaultValue();
};

/**
 * Sets the typed value of the variable.
 * @throws Error for wrong type
 */
TypedVariable.prototype.set = function (typedValue) {
  
  if (this.isAssignmentCompatible(typedValue)) {
    this._setAdjusted(typedValue);
  } else {
    // TODO How to handle Vava errors?
    throw new Error("Vava Type error: Expected " + this.getVavaType() + ", but was " + typedValue.getVavaType() + ".");
  }
  
};


/**
 * Sets the typed value of the variable to a potentially adjusted value
 * computed from the provided typed value.
 *
 * @param typedValue The value to adjust and assign
 */
TypedVariable.prototype._setAdjusted = function (typedValue) {
  // Leave it to specific types to convert themselves
  this.typedValue = typedValue.to(this.vavaType);
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
 * Checks if variable is of integral type.
 *
 * That is, whether it is one of {byte, short, int, long}.
 * TODO Might want to add `char`
 */
TypedVariable.prototype.isIntegral = function () {
  var vT = this.getVavaType();
  return (vT === "byte" || vT === "short" || vT === "int" || vT === "long");
};

/**
 * Checks if variable is of floating point type.
 *
 * That is, whether it is one of {float, double}.
 */
TypedVariable.prototype.isFloatingPoint = function () {
  var vT = this.getVavaType();
  return (vT === "float" || vT === "double");
};

/**
 * Checks for compatibility of own and provided type.
 *
 * TODO Autocasting for natives
 * TODO Hierarchical compatibility for reference types
 */
TypedVariable.prototype.isAssignmentCompatible = function (typedValue) {

  if (this.isPrimitive()) {
    if (typedValue.getVavaType() === this.getVavaType()) return true;
    if (this.isIntegral() && typedValue.isIntegral()) return true;
    return this.isFloatingPoint() && typedValue.isFloatingPoint();
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

/**
 * Casts typed value to value of type `vavaType`.
 *
 * There is not checking here whether any such cast is in fact possible. It is
 * expected that for primitive types this checking is done at compile time.
 *
 * @param vavaType The type to cast to
 */
TypedValue.prototype.to = function (vavaType) {
  return TypedValue.constructorFor(vavaType).intern(this.get());
};

TypedValue.prototype.isPrimitive = TypedVariable.prototype.isPrimitive;
TypedValue.prototype.isIntegral = TypedVariable.prototype.isIntegral;
TypedValue.prototype.isFloatingPoint = TypedVariable.prototype.isFloatingPoint;

/**
 * Returns a string representation of the value.
 */
TypedValue.prototype.toString = function () {
  return String(this.get());
};

/**
 * Returns the default value for any value type.
 *
 * Overwrite for interning etc.
 */
TypedValue.defaultValue = function () {
  return new this();
};

/**
 * Returns the constructor for the given type.
 *
 * @param vavaType The type, e.g. `int`
 */
TypedValue.constructorFor = function (vavaType) {
  return TypedValue.constructors[vavaType] || NullValue;
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

BooleanValue.defaultValue = function () {
  return this.intern(false);
}

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

// TODO Both this and `BooleanValue.intern`?
BooleanValue['true'] = new BooleanValue(true);
BooleanValue['false'] = new BooleanValue(false);

//// NUMBER TYPES

var NumberValue = function () {
  this.vavaType = undefined;
};

NumberValue.inherits(TypedValue);

NumberValue.prototype.inverse = function () {
  return this.constructor.intern(this.get() * -1);
};

/**
 * Used to intern values for efficiency and object identity.
 *
 * Looks up the existing object for a given number and creates one if none is
 * present. The object is then returned.
 *
 * @param number The number to lookup/insert
 */
NumberValue.intern = function (number) {
  if (this.stored[number])
    return this.stored[number];
  else
    return this.stored[number] = new this(number);
};

NumberValue.defaultValue = function () {
  return this.intern(0);
}

// INTEGER VALUES

var IntegralValue = function (rawValue) {
  
  this.vavaType = undefined;
  
}

IntegralValue.inherits(NumberValue);

IntegralValue.checkedValue = function (rawValue) {
  if (rawValue) {
    if (isNaN(rawValue)) {
      throw new Error('Not a number!');
    }
    if (rawValue > this.MIN_VALUE && rawValue < this.MAX_VALUE) {
      return parseInt(rawValue);
    } else {
      // Dual representation cut to length of type
      var dual = parseInt(rawValue).toString(2).substr(-this.BITS,this.BITS);
      // Leading bit determines sign (numspace is divided into positive and negative half)
      var leadingBitNum = -(parseInt(dual.charAt(0), 2) * Math.pow(2, this.BITS-1));
      // Resulting number is -(2^(BITS-1)) + decimal without leading bit
      // or decimals without leading bit, if leading bit is 0
      return leadingBitNum + parseInt(dual.substr(1), 2);
    }
  }
  else return 0;
};

// ARITHMETIC
// TODO Is to('int') a. necessary, b. causing problems with long?
IntegralValue.prototype.add = function (other) {
  if (other.isIntegral())
    return IntValue.intern(this.to('int').get() + other.to('int').get());
  else
    return other.add(this);
};

IntegralValue.prototype.subtract = function (other) {
  if (other.isIntegral())
    return this.add(other.inverse());
  else
    return other.constructor.intern(this.to('int').get() - other.get());
};

IntegralValue.prototype.times = function (other) {
  if (other.isIntegral())
    return IntValue.intern(this.to('int').get() * other.to('int').get());
  else
    return other.times(this);
};

IntegralValue.prototype.divide = function (other) {
  if (other.isIntegral()) {
    var thisRaw = this.to('int').get(),
        otherRaw = other.to('int').get();
    var remainder = thisRaw % otherRaw;
    return IntValue.intern((thisRaw - remainder) / otherRaw);
  } else {
    // TODO What about negative/positive zero/infinity?
    return other.constructor.intern(this.to('int').get() / other.get());
  }
};

IntegralValue.prototype.modulo = function (other) {
  return IntValue.intern(this.to('int').get() % other.to('int').get());
};

var ByteValue = exports.ByteValue = function (rawValue) {

  this.vavaType = 'byte';
  this.rawValue = this.constructor.checkedValue(rawValue);

};

ByteValue.inherits(IntegralValue, {stored: {}, BITS: 8, MIN_VALUE: -128, MAX_VALUE: 127});

var ShortValue = exports.ShortValue = function (rawValue) {

  this.vavaType = 'short';
  this.rawValue = this.constructor.checkedValue(rawValue);

};

ShortValue.inherits(IntegralValue, {stored: {}, BITS: 16, MIN_VALUE: -32768, MAX_VALUE: 32767});

var IntValue = exports.IntValue = function (rawValue) {

  this.vavaType = 'int';
  this.rawValue = this.constructor.checkedValue(rawValue);

}

IntValue.inherits(IntegralValue, {stored: {}, BITS: 32, MIN_VALUE: -2147483648, MAX_VALUE: 2147483647});

var LongValue = exports.LongValue = function (rawValue) {

  this.vavaType = 'long';
  this.rawValue = this.constructor.checkedValue(rawValue);

};

// TODO `long` seems to be too much for JS
LongValue.inherits(IntegralValue, {stored: {}, BITS: 64, MIN_VALUE: -9223372036854775808, MAX_VALUE: 9223372036854775807});

var CharValue = exports.CharValue = function (charOrCharCode) {

  var charCode = typeof charOrCharCode === 'string' ? charOrCharCode.charCodeAt(0) : charOrCharCode;
  this.vavaType = 'char';
  this.rawValue = this.constructor.checkedValue(charCode);

};

CharValue.inherits(IntegralValue, {stored: {}, BITS: 16, MIN_VALUE: 0, MAX_VALUE: 65534});

CharValue.checkedValue = function (rawValue) {
  if (rawValue) {
    if (isNaN(rawValue)) {
      throw new Error('Not a number!');
    }
    if (rawValue > this.MIN_VALUE && rawValue < this.MAX_VALUE) {
      return parseInt(rawValue);
    } else {
      // Dual representation cut to length of type
      var dual = parseInt(rawValue).toString(2).substr(-this.BITS,this.BITS);
      return parseInt(dual, 2);
    }
  }
  else return 0;
};

CharValue.prototype.toString = function () {
  return String.fromCharCode(this.rawValue);
};

// FLOATING POINT TYPES

var FloatingPointValue = function () {
  this.vavaType = undefined;
};

FloatingPointValue.inherits(NumberValue);

FloatingPointValue.checkedValue = function (rawValue) {
  // Actual NaN
  if (String(rawValue) === 'NaN')
    return NaN;
  if (isNaN(rawValue)) {
    throw new Error('Not a number in floating point constructor');
  }
  if (rawValue > this.MAX_VALUE) return Number.POSITIVE_INFINITY;
  if (rawValue < -this.MAX_VALUE) return Number.NEGATIVE_INFINITY;
  if (rawValue > 0 && rawValue < this.MIN_VALUE) return 1e-46;
  if (rawValue < 0 && rawValue > -this.MIN_VALUE) return -1e-46;
  return rawValue;
};

FloatingPointValue.prototype.add = function (other) {
  return this.constructor.intern(this.get() + other.get());
};

FloatingPointValue.prototype.subtract = function (other) {
  return this.add(other.inverse());
};

FloatingPointValue.prototype.times = function (other) {
  return this.constructor.intern(this.get() * other.get());
};

FloatingPointValue.prototype.divide = function (other) {
  var thisRaw = this.get(),
      otherRaw = other.get();
  if (otherRaw === 0) {
    if (thisRaw === 0)
      return this.constructor.intern(NaN);
  }
  
  return this.constructor.intern(this.get() / other.get());
};

FloatingPointValue.prototype.toString = function () {
  var value = this.get();
  return parseInt(value) === value ? value.toFixed(1) : value;
};

var FloatValue = exports.FloatValue = function (rawValue) {
  
  this.vavaType = 'float';
  this.rawValue = this.constructor.checkedValue(rawValue);

};

FloatValue.inherits(FloatingPointValue, {stored: {}, MIN_VALUE: 1.40239846e-45, MAX_VALUE: 3.40282347e+38});

var DoubleValue = exports.DoubleValue = function (rawValue) {
  
  this.vavaType = 'double';
  this.rawValue = this.constructor.checkedValue(rawValue);

};

DoubleValue.inherits(FloatingPointValue, {stored: {}, MIN_VALUE: 4.94065645841246544e-324, MAX_VALUE: 1.79769313486231570e+308});

//// STRING TYPE

var StringValue = exports.StringValue = function (rawValue) {
  
  this.vavaType = 'String';

  if (rawValue) {
    if (typeof rawValue !== 'string') {
      throw new Error('Expected JavaScript string');
    }
    this.rawValue = rawValue;
  } else {
    this.rawValue = '';
  }

};

StringValue.inherits(TypedValue);

StringValue.prototype.add = function (other) {
  return new StringValue(this.get() + other.get());
};

//// REFERENCE TYPES

var NullValue = exports.NullValue = function () {
  this.vavaType = 'null';

  this.rawValue = null;
}

NullValue.inherits(TypedValue);

NullValue.intern = function () {
  return NullValue.stored['null'];
}

NullValue.stored = {
  'null' : new NullValue()
};

//// NEEDS TO BE AT THE END
// Lookup table for constructors for simple (?) types
TypedValue.constructors = {
  "boolean" : BooleanValue,
  "byte" : ByteValue,
  "short" : ShortValue,
  "int" : IntValue,
  "long" : LongValue,
  "char" : CharValue,
  "float" : FloatValue,
  "double" : DoubleValue
};
