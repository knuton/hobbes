/**
 * Defines objects handling type in the runtime environment.
 */

var utils = (typeof hobbes !== 'undefined' && hobbes.utils) || require('../utils');

var TypeChecking = exports.TypeChecking = new utils.Mixin('TypeChecking', {

  /**
   * Returns the object's vava type.
   */
  getVavaType : function () {
    return this.vavaType;
  },

  /**
   * Checks if variable is of given type.
   *
   * @param vavaType Type to check for
   */
  isVavaType : function (vavaType) {
    return this.getVavaType() === vavaType;
  },

  /**
   * Checks if variable is of native type.
   *
   * That is, whether it is one of {boolean, byte, short, int, long, char, float, double}.
   */
  isPrimitive : function () {
    var vT = this.getVavaType();
    return (vT === "boolean" || vT === "byte" || vT === "short" || vT === "int" || vT === "long" || vT === "char" || vT === "float" || vT === "double");
  },

  /**
   * Checks if variable is of integral type.
   *
   * That is, whether it is one of {byte, short, int, long, char}.
   */
  isIntegral : function () {
    var vT = this.getVavaType();
    return (vT === "byte" || vT === "short" || vT === "int" || vT === "long");
  },

  /**
   * Checks if variable is of floating point type.
   *
   * That is, whether it is one of {float, double}.
   */
  isFloatingPoint : function () {
    var vT = this.getVavaType();
    return (vT === "float" || vT === "double");
  },

  /**
   * Checks if variable is of number type.
   *
   * That is, whether it is one of {byte, short, int, long, char, float, double}.
   */
  isNumber : function () {
    return this.isIntegral() || this.isFloatingPoint();
  },

  /**
   * Checks for compatibility of own and provided type.
   *
   * TODO Autocasting for natives
   * TODO Hierarchical compatibility for reference types
   */
  isAssignmentCompatible : function (typedValue) {
    if (this.isPrimitive()) {
      if (typedValue.getVavaType() === this.getVavaType()) return true;
      if (this.isIntegral() && typedValue.isIntegral()) return true;
      return this.isFloatingPoint() && typedValue.isFloatingPoint();
    } else {
      var vavaType = typedValue.getVavaType();
      return (vavaType === "null" || vavaType === this.getVavaType());
    }
  }

});

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

TypeChecking.mixInto(TypedVariable);

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
 *
 * Returns the typed value.
 *
 * @throws Error for wrong type
 */
TypedVariable.prototype.set = function (typedValue) {
  
  if (this.isAssignmentCompatible(typedValue)) {
    this._setAdjusted(typedValue);
  } else {
    // TODO How to handle Vava errors?
    throw new Error("Vava Type error: Expected " + this.getVavaType() + ", but was " + typedValue.getVavaType() + ".");
  }

  return this.get();
  
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
 * Returns the typed value.
 */
TypedVariable.prototype.get = function () {
  return this.typedValue;
};

/**
 * Increments the variable's value by one, but returns the value held before
 * incrementing.
 */
TypedVariable.prototype.postInc = function () {
  var prior = this.get();
  this.preInc();
  return prior;
};

/**
 * Decrements the variable's value by one, but returns the value held before
 * decrementing.
 */
TypedVariable.prototype.postDec = function () {
  var prior = this.get();
  this.preDec();
  return prior;
};

/**
 * Increments the variable's value by one, then returns its value.
 */
TypedVariable.prototype.preInc = function () {
  if (!this.isPrimitive()) throw new Error("Incrementing only available for primitive types.");
  return this.set(this.get().add(new IntValue(1)));
};

/**
 * Decrements the variable's value by one, then returns its value.
 */
TypedVariable.prototype.preDec = function () {
  if (!this.isPrimitive()) throw new Error("Decrementing only available for primtive types.");
  return this.set(this.get().add(new IntValue(-1)));
};

//// VALUES

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

TypeChecking.mixInto(TypedValue);

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
    return (this.stored[bool] = new this(bool));
};

BooleanValue.defaultValue = function () {
  return this.intern(false);
};

// LOGICAL OPERATIONS
BooleanValue.prototype.not = function () {
  return BooleanValue.intern(!this.get());
};

BooleanValue.prototype.and = function (other) {
  return BooleanValue.intern(this.get() && other.get());
};

BooleanValue.prototype.or = function (other) {
  return BooleanValue.intern(this.get() || other.get());
};

BooleanValue.prototype.xor = function (other) {
  return BooleanValue.intern(!!(this.get() ^ other.get()));
};

//// NUMBER TYPES

var NumberValue = function () {
  this.vavaType = undefined;
};

NumberValue.inherits(TypedValue);

NumberValue.prototype.inverse = function () {
  return this.constructor.intern(this.get() * -1);
};

NumberValue.prototype.isLessThan = function (other) {
  return this.get() < other.get();
};

NumberValue.prototype.isGreaterThan = function (other) {
  return this.get() > other.get();
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
    return (this.stored[number] = new this(number));
};

NumberValue.defaultValue = function () {
  return this.intern(0);
};

// INTEGER VALUES

var IntegralValue = function (rawValue) {
  
  this.vavaType = undefined;
  
};

IntegralValue.inherits(NumberValue);

IntegralValue.checkedValue = function (rawValue) {
  if (rawValue) {
    if (isNaN(rawValue)) {
      throw new Error('Not a number!');
    }
    if (rawValue >= this.MIN_VALUE && rawValue <= this.MAX_VALUE) {
      return parseInt(rawValue, 10);
    } else {
      // Dual representation cut to length of type
      var dual = this.twosComplement(parseInt(rawValue, 10));
      // Leading bit determines sign (numspace is divided into positive and negative half)
      var mostSignificantBit = parseInt(dual.charAt(0), 2);
      // Resulting number is -(2^(BITS-1)) + decimal without leading bit
      // or decimals without leading bit, if leading bit is 0.
      return (-mostSignificantBit) * Math.pow(2, this.BITS-1) + parseInt(dual.substr(1), 2);
    }
  }
  else return 0;
};

IntegralValue.addLeadingZeros = function (dualString) {
  var i;
  for (i = dualString.length; i < this.BITS; i++) { dualString = '0' + dualString; }
  return dualString;
};

IntegralValue.twosComplement = function (num) {
  var dual = '';
  if (num >= 0) {
    dual = num.toString(2).substr(-this.BITS,this.BITS);
  } else {
    num = -num;
    var i = this.BITS,
        carry = 1,
        bit;
    // Compute, invert, add 1 in one loop
    while (num !== 0 || i > 0) {
      if (num % 2 === 0) {
        //               _ 1 + 1 = 0, carry = 1, if carry was 1
        //              /
        // 0 -invert-> 1 
        //              \_ 1 + 0 = 1, carry = 0, if carry was 0
        if (carry) {
          bit = '0';
          carry = 1;
        } else {
          bit = '1';
          carry = 0;
        }
        dual = bit + dual;
      } else {
        //               _ 0 + 1 = 1, carry = 0, if carry was 1
        //              /
        // 1 -invert-> 0
        //              \_ 0 + 0 = 0, carry = 0, if carry was 0
        dual = (carry ? '1': '0') + dual;
        carry = 0;
      }
      num = this.integerDivision(num,2);
      i--;
    }
  }
  return this.addLeadingZeros(dual);
};

IntegralValue.integerDivision = function (a, b) {
  var remainder = a % b;
  return (a - remainder) / b;
};

// ARITHMETIC
IntegralValue.prototype.add = function (other) {
  if (other.isIntegral())
    return (other.isVavaType('long') || this.isVavaType('long') ? LongValue : IntValue).intern(this.get() + other.get());
  else
    return other.add(this);
};

IntegralValue.prototype.subtract = function (other) {
  if (other.isIntegral())
    return this.add(other.inverse());
  else
    return other.constructor.intern(this.get() - other.get());
};

IntegralValue.prototype.times = function (other) {
  if (other.isIntegral())
    return (other.isVavaType('long') || this.isVavaType('long') ? LongValue : IntValue).intern(this.get() * other.get());
  else
    return other.times(this);
};

IntegralValue.prototype.divide = function (other) {
  if (other.isIntegral()) {
    var thisRaw = this.get(),
        otherRaw = other.get();
    var remainder = thisRaw % otherRaw;
    return (other.isVavaType('long') || this.isVavaType('long') ? LongValue : IntValue).intern((thisRaw - remainder) / otherRaw);
  } else {
    // TODO What about negative/positive zero/infinity?
    return other.constructor.intern(this.get() / other.get());
  }
};

IntegralValue.prototype.modulo = function (other) {
  if (other.isIntegral())
    return (other.isVavaType('long') || this.isVavaType('long') ? LongValue : IntValue).intern(this.get() % other.get());
  else
    return other.constructor.intern(this.get() % other.get());
};

IntegralValue.prototype.and = function (other) {
  return IntValue.intern(this.get() & other.get());
};

IntegralValue.prototype.or = function (other) {
  return IntValue.intern(this.get() | other.get());
};

IntegralValue.prototype.leftshift = function (other) {
  return IntValue.intern(this.get() << other.get());
};

IntegralValue.prototype.rightshift = function (other) {
  return IntValue.intern(this.get() >> other.get());
};

IntegralValue.prototype.zerofillRightshift = function (other) {
  return IntValue.intern(this.get() >>> other.get());
};

IntegralValue.prototype.xor = function (other) {
  return IntValue.intern(this.get() ^ other.get());
};

IntegralValue.prototype.bitwiseNot = function () {
  return IntValue.intern(~this.get());
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

};

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
      return parseInt(rawValue, 10);
    } else {
      // Dual representation cut to length of type
      var dual = parseInt(rawValue, 10).toString(2).substr(-this.BITS,this.BITS);
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

FloatingPointValue.prototype.modulo = function (other) {
  return this.constructor.intern(this.get() % other.get());
};

FloatingPointValue.prototype.toString = function () {
  var value = this.get();
  return parseInt(value, 10) === value ? value.toFixed(1) : value;
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
};

NullValue.inherits(TypedValue);

NullValue.intern = function () {
  return NullValue.stored['null'];
};

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
