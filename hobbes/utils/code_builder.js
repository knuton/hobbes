/**
 * Contains a collection of code building helpers to generate strings of
 * JavaScript source.
 */

/**
 * Wraps a string in parentheses.
 *
 * @param str The string to wrap
 */
var wrapParens = exports.wrapParens = function (str) {
  return '(' + str + ')';
};


/**
 * Builds a string of variable declaration.
 *
 * @param identifierStr Variable identifier
 * @param semicolonInsertion `true` to insert semicolon at line end (default: true)
 */
var declaration = exports.declaration = function (identifierStr, semicolonInsertion) {
  return semicolize(['var', identifierStr].join(' '), semicolonInsertion);
};

/**
 * Builds a string of variable declaration and assignment.
 *
 * @param identifierStr Variable identifier
 * @param expressionStr Variable value
 * @param semicolonInsertion `true` to insert semicolon at line end (default: true)
 */
var declarationAssignment = exports.declarationAssignment = function (identifierStr, expressionStr, semicolonInsertion) {
  return semicolize([declaration(identifierStr, false), '=', expressionStr].join(' '), semicolonInsertion);
};

/*** FUNCTIONS ***/

/**
 * Wraps a string of expressions or an array of these as a function.
 *
 * @param code The string of expressions or array of strings of expressions
 * @param params Optional array of paramater list
 * @param noNewline if truthy, no newline is introduced
 */
var wrapAsFunction = exports.wrapAsFunction = function (code, params, noNewline) {
  code = Array.isArray(code) ? code : [code];
  params = params || [];
  var nlChar = noNewline ? '' : '\n';
  return 'function (' + params.join(', ') + ') {' + nlChar + code.join('\n') + nlChar + '}';
};
 

/**
 * Builds a string for a function call.
 *
 * @param identifierStr Function identifier
 * @param fnArgs Array of arguments to the function
 * @param semicolonInsertion `true` to insert semicolon at line end (default: true)
 */
var functionCall = exports.functionCall = function (identifierStr, fnArgs, semicolonInsertion) {
  fnArgs = fnArgs || [];
  return semicolize([identifierStr, '(', fnArgs.join(', '), ')'].join(''), semicolonInsertion);
};

/**
 * Builds a string for a constructor call.
 *
 * @param identifierStr Constructor identifier
 * @param fnArgs Array of arguments to the constructor
 * @param semicolonInsertion `true` to insert semicolon at line end (default: true)
 */
var constructorCall = exports.constructorCall = function (identifierStr, fnArgs, semicolonInsertion) {
  return ['new', functionCall(identifierStr, fnArgs, semicolonInsertion)].join(' ');
};

/*** ADDING TO SCOPE ***/
var addPairToScope = exports.addPairToScope = function (key, value, semicolonInsertion) {
  return semicolize('this.__add({' + key + ':' + value + '})', semicolonInsertion);
};

/*** ARRAYS ***/

/**
 * Builds a string for an array.
 *
 * @param array The array
 */
var array = exports.array = function (array) {
  return '[' + array.join(',') + ']';
};

/*** OBJECTS ***/

/**
 * Builds a pair of key and value for object literals.
 *
 * @param key The key
 * @param value The value
 */
var keyValue = exports.keyValue = function (key, value) {
  return key + ':' + value;
};

/**
 * Builds an object literal string from strings of the form "key:value" and "keyA:value,keyB:value".
 */
var joinToObject = exports.joinToObject = function () {
  if (Array.isArray(arguments[0])) {
    pairs = arguments[0];
  } else {
    if (typeof arguments[0] !== "string") throw new TypeError("Expected strings to join to object.");
    pairs = Array.prototype.slice.call(arguments);
  }
  
  return '{' + pairs.join(',') + '}';
};

/**
 * Builds an object literal string from an actual object using JSON.stringify.
 *
 * @param object The object to stringify
*/
var objectToLiteral = exports.objectToLiteral = function (object) {
  return JSON.stringify(object);
};


/*** PRIMITIVES ***/

/**
 * Wraps a string in doublequotes to make it a string in source code.
 *
 * @param string The string to wrap
 */
var string = exports.string = function (string) {
  return '"' + string + '"';
};

/* Helpers' helpers */
var semicolize = function (str, yesOrNo) {
  return typeof yesOrNo === 'undefined' || yesOrNo ? str + ';' : str;
};
