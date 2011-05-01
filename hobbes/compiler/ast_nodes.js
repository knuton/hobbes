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
  this.checkChild(node);
  this.children.push(node);
  return node;
}

/**
 * Checks wether child is acceptable.
 *
 * Override for more specific checks.
 *
 * @param node An ASTNode
 */
ASTNode.prototype.checkChild = function (node) {
  ASTNodeInterface.check(node);
};

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
  // add indentation and own type
  var str = utils.indent('- ' + this.assembleSignature() + '\n', indent);
  // append toString results of children
  this.children.forEach(function (child) {
    str += child.toString((indent || 0) + 2);
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
    jsSource += child.compile(0) + '\n';
  });
  
  return jsSource;
};

CompilationUnit.prototype.getSignature = function () {
  return {
    vavaPackage : this.vavaPackage
  };
};

/**
 * Creates a node for a collection of import declarations.
 *
 * @param importDeclaration Optional first import declaration
 */
var ImportDeclarations = exports.ImportDeclarations = function (importDeclaration) {
  this.type = 'ImportDeclarations';
  this.children = [];

  if (importDeclaration) this.appendChild(importDeclaration);
};

ImportDeclarations.inherits(ASTNode);

ImportDeclarations.prototype.compileNode = function () {
  return [this.children.map(function (child) { return child.compileNode() })].join('\n');
};

ImportDeclarations.prototype.checkChild = function (declaration) {
  if (!declaration || declaration.getType() !== 'ImportDeclaration') {
    throw new TypeError('Expected import declaration to be of type `ImportDeclaration`.');
  }
};

ImportDeclarations.prototype.length = function () {
  return this.children.length;
};
  
ImportDeclarations.prototype.getSignature = function () {
  return {
    declarations : this.children.length
  };
};

/**
 * Creates a node for an import declaration.
 *
 * @param name The name/qualifier of the import
 */
var ImportDeclaration = exports.ImportDeclaration = function (name) {
  this.type = 'ImportDeclaration';
  this.children = [];
  this.appendChild(name);
};

ImportDeclaration.inherits(ASTNode);

ImportDeclaration.prototype.checkChild = function (name) {
  if (!name || name.getType() !== 'Name') {
    throw new TypeError('Expected import declaration to be of type `Name`.');
  }
};

ImportDeclaration.prototype.compileNode = function () {
  return 'this.' + this.children[0].simple() + ' = this.' + this.children[0].qualified() + ';';
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

ClassDeclaration.prototype.getSignature = function () {
  return {
    vavaClassName : this.vavaClassName
  };
};

ClassDeclaration.prototype.compileNode = function (indent) {
  var self = this;
  
  var serializedBody = builder.joinToObject(
    // Field Declarations
    builder.keyValue(
      'fields',
      builder.joinToObject(
        self.children.filter(function (child) {
          return child.getType() === 'FieldDeclaration';
        }).map(function (field) { return field.compile() })
      )
    ),
    // Method Declarations
    builder.keyValue(
      'methods',
      builder.joinToObject(
        self.children.filter(function (child) {
          return child.getType() === 'MethodDeclaration';
        }).map(function (method) { return method.compile() })
      )
    )
  );
  
  return builder.addPairToScope(
    this.vavaClassName,
    builder.constructorCall('this.__env.VavaClass', [builder.string(this.vavaClassName), serializedBody, 'this'], false)
    // TODO call of main method should be more robust (several classes in CU?)
  ) + '\n' + builder.functionCall('this["' + this.vavaClassName + '"].send', ['"main"']);
};

/**
 * Creates a node for a FieldDeclaration, containing one or several VariableDeclarators.
 *
 * @param vavaType The Vava type of the declared fields
 * @param variableDeclarators Array of VariableDeclaration objects
 */
var FieldDeclaration = exports.FieldDeclaration = function (vavaType, variableDeclarators) {
  if (typeof vavaType !== 'string') {
    throw new TypeError('Expected Vava type to be string.');
  }
  if (!variableDeclarators || variableDeclarators.getType() !== "VariableDeclarators" || variableDeclarators.length() < 1) {
    throw new TypeError('Expected one or more variable declarators.');
  }
  this.type  = 'FieldDeclaration';
  this.children = [];
  this.vavaType = vavaType;

  this.appendChild(variableDeclarators);
};

FieldDeclaration.inherits(ASTNode);

FieldDeclaration.prototype.compileNode = function (indent) {
  return this.children[0].compileNode(this.vavaType);
};

FieldDeclaration.prototype.getSignature = function () {
  return {
    vavaType : this.vavaType
  };
};

/**
 * Creates a node for a LocalVariableDeclaration, containing one or several VariableDeclarators.
 *
 * @param vavaType The Vava type of the declared fields
 * @param variableDeclarators Array of VariableDeclaration objects
 */
var LocalVariableDeclaration = exports.LocalVariableDeclaration = function (vavaType, variableDeclarators) {
  if (typeof vavaType !== 'string') {
    throw new TypeError('Expected Vava type to be string.');
  }
  if (!variableDeclarators || variableDeclarators.getType() !== "VariableDeclarators" || variableDeclarators.length() < 1) {
    throw new TypeError('Expected one or more variable declarators.');
  }
  this.type  = 'LocalVariableDeclaration';
  this.children = [];
  this.vavaType = vavaType;

  this.appendChild(variableDeclarators);
};

LocalVariableDeclaration.inherits(ASTNode);

LocalVariableDeclaration.prototype.compileNode = function (indent) {
  return utils.indent('this.__add({' + this.children[0].compileNode(this.vavaType) + '});', indent);
};

LocalVariableDeclaration.prototype.getSignature = function () {
  return {
    vavaType : this.vavaType
  };
};

/**
 * Creates a node for VariableDeclarators, a group of comma separated variable
 * declarations.
 *
 * @param variableDeclarator Optional first variable declarator
 */
var VariableDeclarators = exports.VariableDeclarators = function (variableDeclarator) {
  this.type = 'VariableDeclarators';
  this.children = [];

  if (variableDeclarator) this.appendChild(variableDeclarator);
};

VariableDeclarators.inherits(ASTNode);

VariableDeclarators.prototype.compileNode = function (vavaType) {
  return [this.children.map(function (child) { return child.compileNode(vavaType) })].join(',');
};

VariableDeclarators.prototype.checkChild = function (declarator) {
  if (!declarator || declarator.getType() !== 'VariableDeclarator') {
    throw new TypeError('Expected variable declarator to be of type `VariableDeclarator`.');
  }
};

VariableDeclarators.prototype.length = function () {
  return this.children.length;
};
  
VariableDeclarators.prototype.getSignature = function () {
  return {
    declarators : this.children.length
  };
};

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

VariableDeclarator.prototype.compileNode = function (vavaType) {
  return builder.keyValue(
    this.vavaIdentifier,
    builder.constructorCall(
      'this.__env.TypedVariable',
      [builder.string(vavaType), builder.string(this.vavaIdentifier), this.vavaInitializer && this.vavaInitializer.compile()].filter(
        function (value) { return !!value; }
      ),
      false
    )
  );
};

VariableDeclarator.prototype.getSignature = function () {
  return {
    vavaIdentifier : this.vavaIdentifier,
    vavaInitializer: this.vavaInitializer && this.vavaInitializer.getType()
  };
};

/**
 * Creates a node for an assignment.
 *
 * @param name The name of the variable to assign to
 * @param value The value to assign
 */
var Assignment = exports.Assignment = function (name, value) {
  this.type = 'Assignment';
  this.children = [];
  this.appendChild(name);
  this.appendChild(value);
};

Assignment.inherits(ASTNode);

Assignment.prototype.compileNode = function (indent) {
  return utils.indent(this.children[0].compileNode('set') + '.set(' + this.children[1].compileNode() + ')', indent);
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
  if (vavaHeader.vavaFormalParameters && !Array.isArray(vavaHeader.vavaFormalParameters)) {
    throw new TypeError('Expected Vava formal parameters to be array.');
  }
  this.vavaFormalParameters = vavaHeader.vavaFormalParameters || [];
  if (vavaBlock.getType() !== 'Block') {
    throw new TypeError('Expected Vava block to be Block.');
  }
  this.appendChild(vavaBlock);
}

MethodDeclaration.inherits(ASTNode);

MethodDeclaration.prototype.compileNode = function () {
  // TODO This will not roll with method overriding (using vavaIdentifier as hash name)
  // Better: this.vavaIdentifier + this.vavaFormalParameters.map(vavaType)
  return builder.keyValue(
    this.vavaIdentifier,
    builder.constructorCall(
      'this.__env.VavaMethod',
      [
        builder.string(this.vavaIdentifier),
        builder.string(this.vavaType),
        builder.array(this.vavaFormalParameters.map(function (fP) { fP.compile(); })),
        builder.wrapAsFunction(this.children[0].compile())
      ],
      false
    )
  );
};

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

FormalParameter.prototype.compileNode = function () {
  return builder.joinToObject(builder.keyValue('identifier', this.vavaType), builder.keyValue('vavaType', this.vavaType));
};

FormalParameter.prototype.getSignature = function () {
  return {
    vavaType: this.vavaType,
    vavaIdentifier: this.vavaIdentifier
  };
}

/**
 * Creates a node for a method invocation.
 *
 * @param name The name of the method
 * @param argumentList List of arguments
 */
var MethodInvocation = exports.MethodInvocation = function (name, argumentList) {
  this.type = 'MethodInvocation';
  this.children = [];
  this.name = name;
  this.appendChild(argumentList);
};

MethodInvocation.inherits(ASTNode);

MethodInvocation.prototype.compileNode = function (indent) {
  return utils.indent('this.' + this.name.prefix() + '.send("' + this.name.simple() + '", ' + this.children[0].compile() + ')', indent);
};

MethodInvocation.prototype.getSignature = function () {
  return {name: this.name.qualified()};
};

/**
 * Creates a node for an argument list.
 *
 * @param firstArg The first argument, optional
 */
var ArgumentList = exports.ArgumentList = function (firstArg) {
  this.type = 'ArgumentList';
  this.children = [];
  
  if (firstArg) this.appendChild(firstArg);
};

ArgumentList.inherits(ASTNode);

ArgumentList.prototype.compileNode = function () {
  return '[' + this.children.map(function (child) { return child.compile() }).join(', ') + ']';
};

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

Block.prototype.compileNode = function (indent) {
  var js = this.children.map(function (child) {
    return child.compile((indent || 0) + 2);
  }).join('\n');
  return js;
};

/**
 * Creates a node for an expression statement.
 *
 * Serves only to add line terminator and newline to the expressions.
 *
 * @param expression The expression to terminate
 */
var ExpressionStatement = exports.ExpressionStatement = function (expression) {
  this.type = 'ExpressionStatement';
  this.children = [];
  this.appendChild(expression);
};

ExpressionStatement.inherits(ASTNode);

ExpressionStatement.prototype.compileNode = function (indent) {
  return this.children[0].compile(indent) + ';';
};

/**
 * Creates a node for a name, i.e. a named reference.
 *
 * @param name The name in question
 */
var Name = exports.Name = function (name) {
  this.type = 'Name';
  this.children = [];
  if (!name || !(/[a-zA-Z][a-zA-Z0-9_]*/.test(name))) {
    throw new TypeError('Expected name to be an identifier.');
  }
  this.name = name;
};

Name.inherits(ASTNode);

/**
 * Return the name's last identifier.
 *
 */
Name.prototype.simple = function () {
  var identifiers = this.name.split('.');
  return identifiers[identifiers.length - 1];
};

/**
 * Return the name without the last identifier.
 */
Name.prototype.prefix = function () {
  var identifiers = this.name.split('.');
  return identifiers.slice(0, -1).join('.');
};

/**
 * Return the full qualified name.
 */
Name.prototype.qualified = function () {
  return this.name;
};

/**
 * Simply resolve the name.
 *
 * @param dontGet If truthy, don't call #get
 */
Name.prototype.compileNode = function (dontGet) {
  return 'this.' + this.name + (dontGet ? '' : '.get()');
};

Name.prototype.getSignature = function () {
  return {name : this.name};
};

/**
 * Creates a node for a Boolean literal.
 *
 * @param bool The boolean as string
 */
var BooleanLiteral = exports.BooleanLiteral = function (bool) {
  this.type = 'BooleanLiteral';
  this.children = [];
  var boolString = String(bool);
  if (boolString === 'true' || boolString === 'false') {
    this.value = boolString;
  } else {
    throw new TypeError('Expected literal to be `true` or `false`, but was ' + boolString + '.');
  }
};

BooleanLiteral.inherits(ASTNode);

BooleanLiteral.prototype.getSignature = function () {
  return {value : this.value};
}

BooleanLiteral.prototype.compileNode = function (indent) {
  return 'this.__env.BooleanValue["' + this.value + '"]';
};

/**
 * Creates a node for an Integer literal.
 *
 * @param num The number
 */
var IntegerLiteral = exports.IntegerLiteral = function (num) {
  this.type = 'IntegerLiteral';
  this.children = [];
  // TODO Octal and hexal numbers
  if ((parseFloat(num) === parseInt(num)) && !isNaN(num)) {
    this.value = num;
  } else {
    throw new TypeError('Expected number to be an integer.');
  }
};

IntegerLiteral.inherits(ASTNode);

IntegerLiteral.prototype.getSignature = function () {
  return {value : this.value};
};

IntegerLiteral.prototype.compileNode = function (indent) {
  return builder.functionCall('this.__env.IntValue.intern', [this.value], false);
};

/**
 * Creates a node for a String literal.
 *
 * @param str The string
 */
var StringLiteral = exports.StringLiteral = function (str) {
  this.type = 'StringLiteral';
  this.children = [];
  this.value = str;
};

StringLiteral.inherits(ASTNode);

StringLiteral.prototype.getSignature = function () {
  return {value : this.value};
};

StringLiteral.prototype.compileNode = function (indent) {
  return builder.constructorCall('this.__env.StringValue', [this.value], false);
};

//// Operations
// Unary

/**
 * Creates a node for a unary minus expression.
 *
 * @param unaryExpressoin The operand
 */
var UnaryMinus = exports.UnaryMinus = function (unaryExpression) {
  this.type = 'UnaryMinus';
  this.children = [];

  this.appendChild(unaryExpression);
};

UnaryMinus.inherits(ASTNode);

UnaryMinus.prototype.getSignature = function () {
  return {};
};

UnaryMinus.prototype.compileNode = function (indent) {
  return builder.functionCall(this.children[0].compile() + '.inverse', [], false);
};

/**
 * Creates a node for a unary plus expression.
 *
 * @param unaryExpression The operand
 */
var UnaryPlus = exports.UnaryPlus = function (unaryExpression) {
  this.type = 'UnaryPlus';
  this.children = [];

  this.appendChild(unaryExpression);
};

UnaryPlus.inherits(ASTNode);

UnaryPlus.prototype.getSignature = function () {
  return {};
};

UnaryPlus.prototype.compileNode = function (indent) {
  return this.children[0].compile();
};
/**
 * Creates a node for an addition operation.
 *
 * @param numA The number to send the addition message to
 * @param numB The number to add
 */
var Addition = exports.Addition = function (numA, numB) {
  this.type = 'Addition';
  this.children = [];
  // TODO Compile-time type checking
  if (!(numA) || !(numB)) {
    throw new TypeError('Expected two integer numbers for addition.');
  }
  this.appendChild(numA);
  this.appendChild(numB);
}

Addition.inherits(ASTNode);

Addition.prototype.compileNode = function (indent) {
  return utils.indent(this.children[0].compile() + '.add(' + this.children[1].compile() + ')', indent);
}

/**
 * Creates a node for an subtraction operation.
 *
 * @param numA The number to send the subtraction message to
 * @param numB The number to subtract
 */
var Subtraction = exports.Subtraction = function (numA, numB) {
  this.type = 'Subtraction';
  this.children = [];
  // TODO Compile-time type checking
  if (!(numA) || !(numB)) {
    throw new TypeError('Expected two integer numbers for subtraction.');
  }
  this.appendChild(numA);
  this.appendChild(numB);
}

Subtraction.inherits(ASTNode);

Subtraction.prototype.compileNode = function (indent) {
  return utils.indent(this.children[0].compile() + '.subtract(' + this.children[1].compile() + ')', indent);
}

/**
 * Creates a node for a multiplication operation.
 *
 * @param numA The number to send the multiplication message to
 * @param numB The number to multiply with
 */
var Multiplication = exports.Multiplication = function (numA, numB) {
  this.type = 'Multiplication';
  this.children = [];
  // TODO Compile-time type checking
  if (!(numA) || !(numB)) {
    throw new TypeError('Expected two integer numbers for multiplication.');
  }
  this.appendChild(numA);
  this.appendChild(numB);
}

Multiplication.inherits(ASTNode);

Multiplication.prototype.compileNode = function (indent) {
  return utils.indent(this.children[0].compile() + '.times(' + this.children[1].compile() + ')', indent);
}

/**
 * Creates a node for a division operation.
 *
 * @param numA The number to send the division message to
 * @param numB The number to divide by
 */
var Division = exports.Division = function (numA, numB) {
  this.type = 'Division';
  this.children = [];
  // TODO Compile-time type checking
  if (!(numA) || !(numB)) {
    throw new TypeError('Expected two integer numbers for division.');
  }
  this.appendChild(numA);
  this.appendChild(numB);
}

Division.inherits(ASTNode);

Division.prototype.compileNode = function (indent) {
  return utils.indent(this.children[0].compile() + '.divide(' + this.children[1].compile() + ')', indent);
}

/**
 * Creates a node for a modulo operation.
 *
 * @param numA The number to send the modulo message to
 * @param numB The number to modulate by
 */
var Modulo = exports.Modulo = function (numA, numB) {
  this.type = 'Modulo';
  this.children = [];
  // TODO Compile-time type checking
  if (!(numA) || !(numB)) {
    throw new TypeError('Expected two integer numbers for modulo.');
  }
  this.appendChild(numA);
  this.appendChild(numB);
}

Modulo.inherits(ASTNode);

Modulo.prototype.compileNode = function (indent) {
  return utils.indent(this.children[0].compile() + '.modulo(' + this.children[1].compile() + ')', indent);
}

/**
 * Creates a node for an equality comparison.
 *
 * @param a First value to be compared
 * @param b Second value to be compared
 */
var Equals = exports.Equals = function (a, b) {
  this.type = 'Equals';
  this.children = [];
  if (!a || !b) {
    throw new TypeError('Expected two values to compare for equality.');
  }
  this.appendChild(a);
  this.appendChild(b);
};

Equals.inherits(ASTNode);

Equals.prototype.compileNode = function (indent) {
  return utils.indent('this.__env.BooleanValue[String(' + this.children[0].compile() + ' === ' + this.children[1].compile() + ')]', indent);
};

/**
 * Creates a node for an inequality comparison.
 *
 * @param a First value to be compared
 * @param b Second value to be compared
 */
var NotEquals = exports.NotEquals = function (a, b) {
  this.type = 'NotEquals';
  this.children = [];
  if (!a || !b) {
    throw new TypeError('Expected two values to compare for inequality.');
  }
  this.appendChild(a);
  this.appendChild(b);
};

NotEquals.inherits(ASTNode);

NotEquals.prototype.compileNode = function (indent) {
  return utils.indent('this.__env.BooleanValue[String(' + this.children[0].compile() + ' !== ' + this.children[1].compile() + ')]', indent);
};

/**
 * Creates a node for an if-then conditional.
 *
 * @param ifExpr The condition
 * @param thenExpr The conditional statement
 */
var IfThen = exports.IfThen = function (ifExpr, thenExpr) {
  this.type = 'IfThen';
  this.children = [];
  if (!ifExpr || !thenExpr) {
    throw new TypeError('Expected condition and conditional.');
  }
  this.appendChild(ifExpr);
  this.appendChild(thenExpr);
};

IfThen.inherits(ASTNode);

IfThen.prototype.compileNode = function (indent) {
  var js = 'if (this.__env.BooleanValue.true === ';
  js += this.children[0].compileNode() + ') {\n';
  js += this.children[1].compileNode(2);
  return utils.indent(js + '\n}\n', indent);
};

/**
 * Creates a node for an if-then-else conditional.
 *
 * @param condition The condition
 * @param truthyStatement The statement for true condition
 * @param falsyStatement The statement for false condition
 */
var IfThenElse = exports.IfThenElse = function (condition, truthyStatement, falsyStatement) {
  this.type = 'IfThenElse';
  this.children = [];
  if (!condition || !truthyStatement || !falsyStatement) {
    throw new TypeError('Expected condition and conditionals.');
  }
  this.appendChild(condition);
  this.appendChild(truthyStatement);
  this.appendChild(falsyStatement);
};

IfThenElse.inherits(ASTNode);

IfThenElse.prototype.compileNode = function (indent) {
  var js = utils.indent('if (this.__env.BooleanValue.true === ', indent);
  js += this.children[0].compileNode() + ') {\n';
  js += this.children[1].compileNode(indent + 2) + '\n';
  js += utils.indent('} else {\n', indent);
  js += this.children[2].compileNode(indent + 2) + '\n';
  js += utils.indent('}', indent);
  return js;
};

/**
 * Creates a node for a while loop.
 *
 * @param condition The condition
 * @param statement The looped statements
 */
var WhileLoop = exports.WhileLoop = function (condition, statement) {
  this.type = 'WhileLoop';
  this.children = [];
  if (!condition || !statement) {
    throw new TypeError('Expected condition and conditional.');
  }
  this.appendChild(condition);
  this.appendChild(statement);
};

WhileLoop.inherits(ASTNode);

WhileLoop.prototype.compileNode = function (indent) {
  var js = utils.indent('while (this.__env.BooleanValue.true === ', indent);
  js += this.children[0].compileNode() + ') {\n';
  js += this.children[1].compileNode(indent + 2) + '\n';
  js += utils.indent('}\n', indent);
  return js;
};

