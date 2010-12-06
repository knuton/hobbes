/**
 * Defines AST nodes which are used for constructing an abstract syntax tree
 * by the parser.
 *
 * Johannes Emerich <johannes@emerich.de>
 * MIT Licensed
 */

var utils = (typeof hobbes !== 'undefined' && hobbes.utils) || require('../utils');
var builder = utils.builder;

var ASTNodeInterface = exports.ASTNodeInterface = new utils.Interface('ASTNode', 'appendChild', 'compile', 'getType', 'toString');

/**
 * @constructor
 * Creates an ASTNode.
 *
 * Inheritants need to make sure they have children of their own!
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
ASTNode.prototype.compile = function (indent) {
  return this.compileNode(indent);
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
  this.children = [];
  this.vavaPackage = null;
  this.vavaImports = [];
};

CompilationUnit.inherits(ASTNode);

/**
 * Compiles the unit, with recursive calls to child nodes and attention to
 *   - the `package` property,
 *   - the list of `imports`.
 */
CompilationUnit.prototype.compileNode = function () {
  var jsSource = '';
  
  this.children.forEach(function (child) {
    jsSource += child.compile(0);
  });
  
  return jsSource;
};

CompilationUnit.prototype.getSignature = function () {
  return {
    vavaPackage : this.vavaPackage,
    vavaImports : this.vavaImports
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
  this.children = classBody;
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

ClassDeclaration.prototype.compileNode = function (indent) {
  indent = indent || 0;
  
  var serializedBody = JSON.stringify({
    // Field Declarations
    'fields' : this.children.filter(function (child) {
      child.getType() === 'FieldDeclaration';
    }).map(function (field) { field.compile() }),
    // Method Declarations
    'methods' : this.children.filter(function (child) {
      child.getType() === 'MethodDeclaration';
    }).map(function (method) { method.compile() })
  });
  
  return builder.declarationAssignment(
    this.vavaClassName,
    builder.constructorCall('this.env.VavaClass', [builder.string(this.vavaClassName), serializedBody], false)
  );
};

/**
 * Creates a node for a FieldDeclaration, containing one or several VariableDeclarators.
 *
 * @param vavaType The Vava type of the declared fields
 * @param variableDeclarations Array of VariableDeclaration objects
 */
var FieldDeclaration = exports.FieldDeclaration = function (vavaType, variableDeclarators) {
  if (typeof vavaType !== 'string') {
    throw new TypeError('Expected Vava type to be string.');
  }
  if (!utils.isArray(variableDeclarators) || variableDeclarators.length === 0) {
    throw new TypeError('Expected variable declarators to come as non-empty array.');
  }
  this.type  = 'FieldDeclaration';
  this.children = [];
  this.vavaType = vavaType;
  for (var i = 0; i < variableDeclarators.length; i++) {
    var declarator = variableDeclarators[i];
    if (!declarator || declarator.getType() !== 'VariableDeclarator') {
      throw new TypeError('Expected variable declarator to be of type `VariableDeclarator`.');
    }
    this.appendChild(declarator);
  }
};

FieldDeclaration.inherits(ASTNode);

FieldDeclaration.prototype.getSignature = function () {
  return {
    vavaType : this.vavaType
  };
}

/**
 * Creates a node for a VariableDeclarator, containing one variable identifier
 * and optionally its initializer expression.
 *
 * @param vavaIdentifier The identifier of the variable
 * @param vavaExpression The expression to initialize the variable with (optional)
 */
var VariableDeclarator = exports.VariableDeclarator = function (vavaIdentifier, vavaExpression) {
  if (typeof vavaIdentifier !== 'string') {
    throw new TypeError('Expected Vava identifier to be a string.');
  }
  // TODO Bring this back later
  // if (vavaExpression && vavaExpression.getType() !== 'Expression') {
  //   throw new TypeError('Expected Vava expression to be of type `Expression`.');
  // }
  this.type = 'VariableDeclarator';
  this.children = [];
  this.vavaIdentifier = vavaIdentifier;
  this.vavaInitializer = vavaExpression;
};

VariableDeclarator.inherits(ASTNode);

VariableDeclarator.prototype.getSignature = function () {
  return {
    vavaIdentifier : this.vavaIdentifier
  };
};

/**
 * Creates a node for a MethodDeclaration.
 *
 * @param vavaHeader An object containing header information
 * @param vavaBlock A block of Vava expressions
 */
var MethodDeclaration = exports.MethodDeclaration = function (vavaHeader, vavaBlock) {
  this.type = 'MethodDeclaration';
  this.children = [];
  if (typeof vavaHeader.vavaType !== 'string') {
    throw new TypeError('Expected Vava type to be string.');
  }
  this.vavaType = vavaHeader.vavaType;
  if (typeof vavaHeader.vavaIdentifier !== 'string') {
    throw new TypeError('Expected Vava type to be string.');
  }
  this.vavaIdentifier = vavaHeader.vavaIdentifier;
  if (vavaBlock.getType() !== 'Block') {
    throw new TypeError('Expected Vava block to be Block.');
  }
  this.appendChild(vavaBlock);
}

MethodDeclaration.inherits(ASTNode);

MethodDeclaration.prototype.getSignature = function () {
  return {
    vavaType: this.vavaType,
    vavaIdentifier: this.vavaIdentifier
  };
}

/**
 * Creates a node for a FormalParameter, containing type and identifier.
 *
 * @param vavaType The formal parameter's type
 * @param vavaIdentifier The formal parameter's identifier
 */
var FormalParameter = exports.FormalParameter = function (vavaType, vavaIdentifier) {
  // TODO Type should be ASTNode later, I suppose
  if (typeof vavaIdentifier !== 'string') {
    throw new TypeError('Expected Vava identifier to be a string.');
  }
  this.type = 'FormalParameter';
  this.children = [];
  this.vavaType = vavaType;
  this.vavaIdentifier = vavaIdentifier;
};

FormalParameter.inherits(ASTNode);

FormalParameter.prototype.getSignature = function () {
  return {
    vavaType: this.vavaType,
    vavaIdentifier: this.vavaIdentifier
  };
}

/**
 * Creates a node for a Block.
 * 
 * @param vavaStatements A list of statements
 */
var Block = exports.Block = function (vavaStatements) {
  this.type = 'Block';
  this.children = [];
  if (typeof vavaStatements !== 'undefined' && !utils.isArray(vavaStatements)) {
    throw new TypeError('Expected Vava statements to be undefined or array.');
  }
  vavaStatements = vavaStatements || [];
  for (var i = 0; i < vavaStatements.length; i++) {
    this.appendChild(vavaStatements[i]);
  }
}

Block.inherits(ASTNode);