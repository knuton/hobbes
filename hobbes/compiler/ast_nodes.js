/**
 * Defines AST nodes which are used for constructing an abstract syntax tree
 * by the parser.
 *
 * Johannes Emerich <johannes@emerich.de>
 * MIT Licensed
 */

var utils = require('../utils');

var ASTNodeInterface = exports.ASTNodeInterface = new utils.Interface('ASTNode', 'appendChild', 'compile', 'getType', 'toString');

/**
 * @constructor
 * Creates an ASTNode.
 */
var ASTNode = exports.ASTNode = function ASTNode () {
  // Lists the node's child nodes
  this.children = [];
  // Node type
  this.type = 'ASTNode';
};

/**
 * Adds the provided node as a child, if it passes as an ASTNode.
 *
 * @param node An ASTNode
 * @returns The node for chaining
 */
ASTNode.prototype.appendChild = function (node) {
  ASTNodeInterface.check(node);
  this.children.push(node);
  return node;
}

/**
 * Compiles the node with all its children
 */
ASTNode.prototype.compile = function () {
  return this.compileNode();
}

/**
 * Returns the type of node.
 */
ASTNode.prototype.getType = function () {
  return this.type;
}

/**
 * Returns a string signature containing information about the node.
 */
ASTNode.prototype.getSignature = ASTNode.prototype.getType;

/**
 * Returns a string representation of the form
 *
 * - ASTNode
 *   - Child A
 *     - Child A's child
 *   - Child B
 */
ASTNode.prototype.toString = function (indent) {
  // default indentation is none
  indent = indent || 0
  // add indentation and own type
  var str = utils.indent(indent) + '- ' + this.getSignature() + '\n';
  // append toString results of children
  this.children.forEach(function (child) {
    str += child.toString(indent + 2);
  });
  
  return str;
}

/**
 * Creates a node for a compilation unit, the root node of a Vava AST.
 */
var CompilationUnit = exports.CompilationUnit = function CompilationUnit () {
  this.type = 'CompilationUnit';
};

CompilationUnit.inherits(ASTNode);