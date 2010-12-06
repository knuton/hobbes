/**
 * Contains a collection of code building helpers to generate strings of
 * JavaScript source.
 */

/**
 * Builds a string of variable declaration.
 *
 * @params identifierStr Variable identifier
 * @semicolonInsertion `true` to insert semicolon at line end (default: true)
 */
var declaration = exports.declaration = function (identifierStr, semicolonInsertion) {
  return semicolize(['var', identifierStr].join(' '), semicolonInsertion);
};

/**
 * Builds a string of variable declaration and assignment.
 *
 * @params identifierStr Variable identifier
 * @params expressionStr Variable value
 * @semicolonInsertion `true` to insert semicolon at line end (default: true)
 */
var declarationAssignment = exports.declarationAssignment = function (identifierStr, expressionStr, semicolonInsertion) {
  return semicolize([declaration(identifierStr, false), '=', expressionStr].join(' '), semicolonInsertion);
};

/**
 * Builds a string for a function call.
 *
 * @params identifierStr Function identifier
 * @params fnArgs Array of arguments to the function
 * @semicolonInsertion `true` to insert semicolon at line end (default: true)
 */
var functionCall = exports.functionCall = function (identifierStr, fnArgs, semicolonInsertion) {
  fnArgs = fnArgs || [];
  return semicolize([identifierStr, '(', fnArgs.join(', '), ')'].join(''), semicolonInsertion);
};

var constructorCall = exports.constructorCall = function (identifierStr, fnArgs, semicolonInsertion) {
  return ['new', functionCall(identifierStr, fnArgs, semicolonInsertion)].join(' ');
};

/* Helpers' helpers */
var semicolize = function (str, yesOrNo) {
  return typeof yesOrNo === 'undefined' || yesOrNo ? str + ';' : str;
};