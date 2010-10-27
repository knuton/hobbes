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
 * Returns a string containing number-many spaces.
 *
 * @param {number} number Number of spaces
 */
var indent = exports.indent = function (number) {
  if (typeof number !== 'number' || number < 0) {
    throw new TypeError('indent expected a positive number.');
  }
  
  var spaces = '';
  for (var i = 0; i < number; i++) {
    spaces += ' ';
  }
  return spaces;
};