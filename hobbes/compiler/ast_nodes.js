/**
 * Defines AST nodes which are used for constructing an abstract syntax tree
 * by the parser.
 *
 * Johannes Emerich <johannes@emerich.de>
 * MIT Licensed
 */

var utils = (typeof hobbes !== 'undefined' && hobbes.utils) || require('../utils');

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
ASTNode.prototype.assembleSignature = function () {
  var sigStr = '<' + this.getType();
  var signature = this.getSignature && this.getSignature() || {};
  for (prop in signature) {
    sigStr += ' ' + prop + ': ' + signature[prop];
  }
  return sigStr + '>';
};

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
  var str = utils.indent(indent) + '- ' + this.assembleSignature() + '\n';
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
  this.vavaPackage = null;
  this.vavaImports = [];
  this.vavaType = null;
};

CompilationUnit.inherits(ASTNode);

/**
 * Compiles the unit, with recursive calls to child nodes and attention to
 *   - the `package` property,
 *   - the list of `imports`.
 */
CompilationUnit.prototype.compileNode = function () {
  var indent = 0;
  var jsSource = '';
  jsSource += 'return "' + this.vavaPackage + this.vavaImports +  '";'
  
  return jsSource;
};

CompilationUnit.prototype.getSignature = function () {
  return {
    vavaPackage : this.vavaPackage,
    vavaImports : this.vavaImports,
    vavaType: this.vavaType ? this.vavaType.vavaClassName : this.vavaType
  };
};

/**
 * Creates a node for a ClassDeclaration, containing one Vava class.
 *
 * @param name Name of the class
 * @param classBody Array of body declarations
 */
var ClassDeclaration = exports.ClassDeclaration = function (name, classBody) {
  classBody = classBody || [];
  if (!utils.isArray(classBody)) {
    throw new TypeError('Expected array for class body.');
  }
  this.type = 'ClassDeclaration';
  this.vavaClassName = name;
  this.vavaBody = classBody;
}

ClassDeclaration.inherits(ASTNode);

ClassDeclaration.prototype.compileNode = function () {
  var indent = 0;
  
  return "";
};

ClassDeclaration.prototype.getSignature = function () {
  return {
    vavaClassName : this.vavaClassName
  };
};