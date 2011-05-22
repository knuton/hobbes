/**
 * Contains a collection of utils to use all around hobbes.
 *
 * Johannes Emerich <johannes@emerich.de>
 * MIT Licensed
 */

/**
 * @constructor
 * Creates an interface to check objects for its implementation.
 *
 * @param {string} name The interface's name
 * @param {string} *methods The names of the methods required to be implemented
 */
var Interface = exports.Interface = function(name) {
  if (arguments.length < 2) {
    throw new Error('Interface constructor expected at least 2 arguments, but got ' + arguments.length + '.');
  }
  if (typeof name !== 'string') {
    throw new TypeError('Interface constructor expected interface name.');
  }
  
  this.name = name;
  this.methods = [];
  for (var i = 1, len = arguments.length; i < len; i++) {
    if (typeof arguments[i] !== 'string') {
      throw new Error('Interface constructor expects method names as strings.');
    }
    this.methods.push(arguments[i]);
  }
};

/**
 * Checks whether the passed object implements this interface.
 *
 * @param object Object to check
 */
Interface.prototype.check = function (object) {
  if (!object) {
    throw new Error("Expected an object to check.");
  }
  
  for (var i = 0; i < this.methods.length; i++) {
    var method = this.methods[i];
    if (!object[method] || typeof object[method] !== 'function') {
      throw new Error(object + ' does not implement interface `' + this.name + '`. Method `' + method + '` is missing.');
    }
  }
};

/**
 * Checks whether the passed object implements all the interfaces
 *
 * @param object Object to check
 * @param {Interface} *interfaces Zero or more Interface objects
 */
Interface.check = function (object) {
  if (!object) {
    throw new Error("Expected an object to check.");
  }
  
  for (var i = 1; i < arguments.length; i++) {
    arguments[i].check(object);
  }
};

/**
 * @constructor
 * Creates a mixin containing instance methods.
 *
 * @param {string} name The mixin's name
 * @param {object} methods Hash containing as keys method namesd, as values fns
 */
var Mixin = exports.Mixin = function (name, methods_hash) {
  if (typeof name !== 'string' || !methods_hash) {
    throw new Error('Mixin requires name and method hash.');
  }
  this.name = name;
  this.methods = {};
  for (methName in methods_hash) {
    if (typeof methName !== 'string')
      throw new Error('Not a method name: ' + methName);
    if (typeof methods_hash[methName] !== 'function')
      throw new Error('Not a function: ' + methods_hash[methName]);
    this.methods[methName] = methods_hash[methName];
  }
};

/**
 * Copys the mixin's methods to the constructor's prototype.
 *
 * @param constructor The constructor to augment
 */
Mixin.prototype.mixInto = function (constructor) {
  for (methName in this.methods) {
    if (!constructor.prototype[methName]) {
      constructor.prototype[methName] = this.methods[methName];
    }
  }
};

/**
 * Tests a given argument for its array-ish-ness.
 *
 * Based on Crockford's typeOf fn.
 *
 * @param value Value to test
 * @returns `true` if is array, `false` otherwise
 */
var isArray = exports.isArray = function (value) {
  return typeof value === 'object' &&
    typeof value.length === 'number' &&
    !(value.propertyIsEnumerable('length')) &&
    typeof value.splice === 'function';
};

/**
 * Returns a string containing number-many spaces.
 *
 * @param {number} number Number of spaces
 * @returns ' '*number
 */
var indentSpaces = exports.indentSpaces = function (number) {
  if (typeof number !== 'number' || number < 0) {
    number = 0;
  }
  
  var spaces = '';
  for (var i = 0; i < number; i++) {
    spaces += ' ';
  }
  return spaces;
};

/**
 * Indents a string by number-many spaces.
 *
 * @param str The string to indent
 * @param num The number of spaces to use
 */
var indent = exports.indent = function (str, num) {
  return indentSpaces(num || 0) + str;
};

/**
 * Merges a number of objects.
 */
var merge = exports.merge = function () {
  var result = {},
      length = arguments.length,
      object = null,
      key    = null;
  
  // If argument is array, merge contents of array for convenience
  if (Array.isArray(arguments[0])) {
    return arguments.callee.apply(null, arguments[0]);
  }
  // If first argument is not an object, something is fishy
  if (typeof arguments[0] !== "object") {
    throw new TypeError("Expected objects to merge, got " + typeof arguments[0] + ".");
  }
  
  for (var i = 0; i < length; i++) {
    object = arguments[i];
    for (var key in object) {
      if (!object.hasOwnProperty(key)) { continue; }
      result[key] = object[key];
    }
  }
  return result;
};

exports.builder = require('./utils/code_builder');

/**
 * Returns the value found in a given object under a chain of names.
 *
 * e.g. for {hi: {hey: {ha: 5}}}, ['hi', hey'] returns {ha: 5}
 *      for          ''         , ['hi', 'huh'] returns undefined
 * @param obj Object to look up in
 * @param nameChain Array of strings to use as keys
 */
var objectPath = exports.objectPath = function (obj, nameChain) {
  var curr = obj;
  for (var i = 0; i < nameChain.length; i++) {
    curr = curr[nameChain[i]];
    if (typeof curr !== 'object') return undefined;
  }
  return curr;
};

exports.yyUtils = {
  merge: merge
};
