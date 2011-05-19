/**
 * Defines AST nodes which are used for constructing an abstract syntax tree
 * by the parser.
 *
 * Johannes Emerich <johannes@emerich.de>
 * MIT Licensed
 */

var utils = (typeof hobbes !== 'undefined' && hobbes.utils) || require('../utils');
var vava = (typeof hobbes !== 'undefined' && hobbes.vava) || require('../vava');
var builder = utils.builder;

var ASTNodeInterface = exports.ASTNodeInterface = new utils.Interface('ASTNode', 'appendChild', 'compile', 'getType', 'setLoc', 'toString');

/**
 * @constructor
 * Creates an ASTNode.
 *
 * Inheritants need to make sure they have children of their own!
 */
var ASTNode = exports.ASTNode = function ASTNode () {
  // Node type
  this.type = 'ASTNode';
  this.setLoc();
  // Lists the node's child nodes
  this.children = [];
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
};

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
ASTNode.prototype.compile = function (opts) {
  var result = this.__compiled || (this.__compiled = this.compileNode(opts));
  this.compileTimeCheck();
  return result;
};

/**
 * Implement in each node to check for compile time errors.
 *
 * @throws CompileTimeError via `throwError`
 */
ASTNode.prototype.compileTimeCheck = function () {};

/**
 * Returns the type of node.
 */
ASTNode.prototype.getType = function () {
  return this.type;
};

/**
 * Sets location information.
 *
 * Any node may be passed location information as the last argument to its
 * constructor, revealing the location of the corresponding code fragment
 * in the source code.
 *
 * @params locHash Hash containing the location information
 */
ASTNode.prototype.setLoc = function (locHash) {
  this.loc = locHash || {};
};

ASTNode.prototype.throwError = function (message, description, loc) {
  var err = new Error(message);
  err.type = 'CompileTimeError';
  err.description = description;
  err.loc = loc || this.loc;
  throw err;
};

/**
 * Returns a string signature containing information about the node.
 */
ASTNode.prototype.assembleSignature = function () {
  var sigStr = '<' + this.getType();
  var signature = this.getSignature && this.getSignature() || {};
  if (!signature.vavaType && this.vavaType) signature.vavaType = this.vavaType;
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
};

vava.mixins.TypeChecking.mixInto(ASTNode);

/**
 * Creates a node for a compilation unit, the root node of a Vava AST.
 */
var CompilationUnit = exports.CompilationUnit = function CompilationUnit () {
  this.type = 'CompilationUnit';
  this.setLoc();
  this.children = [];
  this.vavaPackage = null;
};

CompilationUnit.inherits(ASTNode);

/**
 * Compiles the unit, with recursive calls to child nodes and attention to
 *   - the `package` property,
 *   - the list of `imports`.
 */
CompilationUnit.prototype.compileNode = function (opts) {
  var opts = opts || {};
  opts.names = opts.names || new vava.scope.Scope();
  opts.mergeOpts = function (extraOptions) {
    var F = function () {};
    F.prototype = this;
    var obj = new F();
    for (key in (extraOptions || {})) {
      obj[key] = extraOptions[key];
    }
    return obj;
  };
  opts.descendScope = function(extraOptions) {
    var obj = this.mergeOpts(extraOptions);
    obj.names = this.names.__descend();
    return obj;
  };
  var jsSource = '';
  
  this.children.forEach(function (child) {
    jsSource += child.compile(opts) + '\n';
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
  this.setLoc(arguments[arguments.length-1]);

  if (importDeclaration) this.appendChild(importDeclaration);
};

ImportDeclarations.inherits(ASTNode);

ImportDeclarations.prototype.compileNode = function (opts) {
  return [this.children.map(function (child) { return child.compile(opts) })].join('\n');
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
  this.setLoc(arguments[arguments.length-1]);
  this.appendChild(name);
};

ImportDeclaration.inherits(ASTNode);

ImportDeclaration.prototype.checkChild = function (name) {
  if (!name || name.getType() !== 'Name') {
    throw new TypeError('Expected import declaration to be of type `Name`.');
  }
};

ImportDeclaration.prototype.compileNode = function (opts) {
  for (var i = 0; i < this.children.length; i++) {
    var parts = this.children[i].parts();
    var tmpObj = opts.names[parts[0]];
    for (var j = 1; j < parts.length; j++) {
      tmpObj = tmpObj[parts[j]];
    }
    opts.names[parts[j]] = tmpObj;
  }
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
  this.setLoc(arguments[arguments.length-1]);
  this.children = classBody;
};

ClassDeclaration.inherits(ASTNode);

ClassDeclaration.prototype.getSignature = function () {
  return {
    vavaClassName : this.vavaClassName
  };
};

ClassDeclaration.prototype.compileNode = function (opts) {
  var self = this;

  // Add class name to compilation unit scope
  opts.names.__addName(this.vavaClassName, this);
  var classOpts = opts.descendScope();
  
  var serializedBody = builder.joinToObject(
    // Field Declarations
    builder.keyValue(
      'fields',
      builder.array(
        self.children.filter(function (child) {
          return child.getType() === 'FieldDeclaration';
        }).map(function (field) { return field.compile(classOpts) })
      )
    ),
    // Method Declarations
    builder.keyValue(
      'methods',
      builder.joinToObject(
        self.children.filter(function (child) {
          return child.getType() === 'MethodDeclaration';
        }).map(function (method) { return method.compile(classOpts) })
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
 * @param Hash containing modifier information
 */
var FieldDeclaration = exports.FieldDeclaration = function (vavaType, variableDeclarators, modifiers) {
  if (typeof vavaType !== 'string') {
    throw new TypeError('Expected Vava type to be string.');
  }
  if (!variableDeclarators || variableDeclarators.getType() !== "VariableDeclarators" || variableDeclarators.length() < 1) {
    throw new TypeError('Expected one or more variable declarators.');
  }
  this.type  = 'FieldDeclaration';
  this.setLoc(arguments[arguments.length-1]);
  this.children = [];
  this.vavaType = vavaType;
  this.parseModifiers(modifiers);
  this.appendChild(variableDeclarators);
};

FieldDeclaration.inherits(ASTNode);

FieldDeclaration.prototype.parseModifiers = function (modifiers) {
  this.visibility = modifiers.visibility || 'default';
  this.staticness = !!modifiers.staticness;
  this.valuedness = modifiers.valuedness;
};

FieldDeclaration.prototype.compileNode = function (opts) {
  return builder.joinToObject(
    builder.keyValue('isStatic', String(this.staticness)),
    builder.keyValue('visibility', builder.string(this.visibility)),
    builder.keyValue('variables',
      builder.joinToObject(
        function (obj) {
          var declarations = [];
          for (declName in obj) {
            declarations.push(builder.keyValue(declName, obj[declName]));
          }
          return declarations;
        }(this.children[0].compileForField(opts.mergeOpts({vavaType: this.vavaType, valuedness: this.valuedness})))
      )
    )
  );
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
  this.setLoc(arguments[arguments.length-1]);
  this.children = [];
  this.vavaType = vavaType;

  this.appendChild(variableDeclarators);
};

LocalVariableDeclaration.inherits(ASTNode);

LocalVariableDeclaration.prototype.compileNode = function (opts) {
  return utils.indent('this.__add({' + this.children[0].compile(opts.mergeOpts({vavaType: this.vavaType})) + '})', opts.indent);
};

/**
 * Creates node for a LocalVariableDeclarationStatement, adding line separation to a LocalVariableDeclaration.
 *
 * @param locVarDec Local variable declaration node
 */
var LocalVariableDeclarationStatement = exports.LocalVariableDeclarationStatement = function (locVarDec) {
  this.type  = 'LocalVariableDeclarationStatement';
  this.setLoc(arguments[arguments.length-1]);
  this.children = [];
  this.appendChild(locVarDec);
};

LocalVariableDeclarationStatement.inherits(ASTNode);

LocalVariableDeclarationStatement.prototype.compileNode = function (opts) {
  return utils.indent(this.children[0].compile(opts) + ';', opts.indent);
};

/**
 * Creates a node for VariableDeclarators, a group of comma separated variable
 * declarations.
 *
 * @param variableDeclarator Optional first variable declarator
 */
var VariableDeclarators = exports.VariableDeclarators = function (variableDeclarator) {
  this.type = 'VariableDeclarators';
  this.setLoc(arguments[arguments.length-1]);
  this.children = [];

  if (variableDeclarator) this.appendChild(variableDeclarator);
};

VariableDeclarators.inherits(ASTNode);

VariableDeclarators.prototype.compileNode = function (opts) {
  return [this.children.map(function (child) { return child.compile(opts) })].join(',');
};

VariableDeclarators.prototype.compileForField = function (opts) {
  return utils.merge(this.children.map(function (child) { return child.compileForField(opts) }));
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
  this.type = 'VariableDeclarator';
  this.setLoc(arguments[arguments.length-1]);
  // set vavaExpression to undefined, if it is loc hash
  if (vavaExpression && vavaExpression.first_line) {
    vavaExpression = undefined;
  }
  this.children = [];
  this.vavaIdentifier = vavaIdentifier;
  this.vavaInitializer = vavaExpression;
};

VariableDeclarator.inherits(ASTNode);

VariableDeclarator.prototype.compileNode = function (opts) {
  var result = builder.keyValue(
    this.vavaIdentifier,
    builder.constructorCall(
      'this.__env.TypedVariable',
      [builder.string(opts.vavaType), builder.string(this.vavaIdentifier), this.vavaInitializer && this.vavaInitializer.compile(opts)].filter(
        function (value) { return !!value; }
      ),
      false
    )
  );
  // TODO error on wrong type
  this.vavaType = (this.vavaInitializer && this.vavaInitializer.getVavaType()) || opts.vavaType;
  opts.names.__addName(this.vavaIdentifier, this.vavaType);
  return result;
};

VariableDeclarator.prototype.compileForField = function (opts) {
  var obj = {};
  obj[this.vavaIdentifier] = builder.constructorCall(
    'this.__env.TypedVariable',
    [builder.string(opts.vavaType), builder.string(this.vavaIdentifier), this.vavaInitializer && this.vavaInitializer.compile(opts), builder.objectToLiteral({modifier: opts.valuedness})].filter(function (value) { return !!value; }),
    false
  );
  this.vavaType = (this.vavaInitializer && this.vavaInitializer.getVavaType()) || opts.vavaType;
  opts.names.__addName(this.vavaIdentifier, this.vavaType);
  return obj;
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
  this.setLoc(arguments[arguments.length-1]);
  this.children = [];
  this.appendChild(name);
  this.appendChild(value);
};

Assignment.inherits(ASTNode);

Assignment.prototype.compileNode = function (opts) {
  var result = utils.indent(this.children[0].compile(opts.mergeOpts({set: true})) + '.set(' + this.children[1].compile(opts) + ')', opts.indent);
  this.vavaType = this.children[1].getVavaType();
  // TODO qualified names
  opts.names.__addName(this.children[1].simple(), this.vavaType);
  return result;
};

/**
 * Creates a node for a MethodDeclaration.
 *
 * @param vavaHeader An object containing header information
 * @param vavaBlock A block of Vava expressions
 */
var MethodDeclaration = exports.MethodDeclaration = function (vavaHeader, vavaBlock) {
  this.type = 'MethodDeclaration';
  this.setLoc(arguments[arguments.length-1]);
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
};

MethodDeclaration.inherits(ASTNode);

MethodDeclaration.prototype.compileNode = function (opts) {
  var methodOpts = opts.descendScope();
  // TODO This will not roll with method overriding (using vavaIdentifier as hash name)
  // Better: this.vavaIdentifier + this.vavaFormalParameters.map(vavaType)
  return builder.keyValue(
    this.vavaIdentifier,
    builder.constructorCall(
      'this.__env.VavaMethod',
      [
        builder.string(this.vavaIdentifier),
        builder.string(this.vavaType),
        builder.array(this.vavaFormalParameters.map(function (fP) { fP.compile(methodOpts); })),
        builder.wrapAsFunction(this.children[0].compile(methodOpts))
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
};

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
  this.setLoc(arguments[arguments.length-1]);
  this.children = [];
  this.vavaType = vavaType;
  this.vavaIdentifier = vavaIdentifier;
};

FormalParameter.inherits(ASTNode);

FormalParameter.prototype.compileNode = function (opts) {
  opts.names.__addName(this.vavaIdentifier, this.vavaType);
  return builder.joinToObject(builder.keyValue('identifier', this.vavaType), builder.keyValue('vavaType', this.vavaType));
};

FormalParameter.prototype.getSignature = function () {
  return {
    vavaType: this.vavaType,
    vavaIdentifier: this.vavaIdentifier
  };
};

/**
 * Creates a node for a method invocation.
 *
 * @param name The name of the method
 * @param argumentList List of arguments
 */
var MethodInvocation = exports.MethodInvocation = function (name, argumentList) {
  this.type = 'MethodInvocation';
  this.setLoc(arguments[arguments.length-1]);
  this.children = [];
  this.name = name;
  this.appendChild(argumentList);
};

MethodInvocation.inherits(ASTNode);

MethodInvocation.prototype.compileNode = function (opts) {
  // TODO Type of method invocation
  //this.vavaType = 
  return utils.indent('this.' + this.name.prefix() + '.send("' + this.name.simple() + '", ' + this.children[0].compile(opts) + ')', opts.indent);
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
  this.setLoc(arguments[arguments.length-1]);
  this.children = [];
  
  if (firstArg) this.appendChild(firstArg);
};

ArgumentList.inherits(ASTNode);

ArgumentList.prototype.compileNode = function (opts) {
  return '[' + this.children.map(function (child) { return child.compile(opts) }).join(', ') + ']';
};

/**
 * Creates a node for a Block.
 * 
 * @param vavaStatements A list of statements
 */
var Block = exports.Block = function (vavaStatements) {
  this.type = 'Block';
  this.setLoc(arguments[arguments.length-1]);
  // Set statements to undefined if only loc hash has been given
  if (typeof vavaStatements === 'object' && !utils.isArray(vavaStatements)) {
    vavaStatements = undefined;
  }
  this.children = [];
  if (typeof vavaStatements !== 'undefined' && !utils.isArray(vavaStatements)) {
    throw new TypeError('Expected Vava statements to be undefined or array.');
  }
  vavaStatements = vavaStatements || [];
  for (var i = 0; i < vavaStatements.length; i++) {
    this.appendChild(vavaStatements[i]);
  }
};

Block.inherits(ASTNode);

Block.prototype.compileNode = function (opts) {
  var js = this.children.map(function (child) {
    return child.compile(opts.mergeOpts({indent: (opts.indent || 0) + 2}));
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
  this.setLoc(arguments[arguments.length-1]);
  this.children = [];
  this.appendChild(expression);
};

ExpressionStatement.inherits(ASTNode);

ExpressionStatement.prototype.compileNode = function (opts) {
  return this.children[0].compile(opts) + ';';
};

/**
 * Creates a node for a name, i.e. a named reference.
 *
 * @param name The name in question
 */
var Name = exports.Name = function (name) {
  this.type = 'Name';
  this.setLoc(arguments[arguments.length-1]);
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
 * Return an array of the name's parts.
 */
Name.prototype.parts = function () {
  return this.name.split('.');
};

/**
 * Simply resolve the name.
 *
 * @param opts
 *   [noGet] If truthy, don't call #get
 */
Name.prototype.compileNode = function (opts) {
  var result = 'this.' + this.name + (opts.noGet ? '' : '.get()');
  // TODO Too simplified
  this.vavaType = opts.names[this.simple()];
  return result;
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
  this.setLoc(arguments[arguments.length-1]);
  this.children = [];
  this.vavaType = 'boolean';
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
};

BooleanLiteral.prototype.compileNode = function (opts) {
  return 'this.__env.BooleanValue.intern(' + this.value + ')';
};

/**
 * Creates a node for an Integer literal.
 *
 * @param num The number
 */
var IntegerLiteral = exports.IntegerLiteral = function (num) {
  this.type = 'IntegerLiteral';
  this.setLoc(arguments[arguments.length-1]);
  this.children = [];
  if (/l$/i.test(num)) {
    this.vavaType = 'long';
    num = num.substr(0, num.length - 1);
  } else {
    this.vavaType = 'int';
  }
  // TODO Octal and hexal numbers
  if ((parseFloat(num) === parseInt(num)) && !isNaN(num)) {
    this.value = num;
  } else {
    throw new TypeError('Expected number to be an integer.');
  }
};

IntegerLiteral.inherits(ASTNode);

IntegerLiteral.prototype.getSignature = function () {
  return {value : this.value, vavaType : this.vavaType};
};

IntegerLiteral.prototype.compileNode = function (opts) {
  if (this.vavaType === 'long') {
    return builder.functionCall('this.__env.LongValue.intern', [this.value], false);
  } else {
    return builder.functionCall('this.__env.IntValue.intern', [this.value], false);
  }
};

/**
 * Creates a node for a char literal.
 *
 * @param character The character
 */
var CharLiteral = exports.CharLiteral = function (character) {
  this.type = 'CharLiteral';
  this.setLoc(arguments[arguments.length-1]);
  this.children = [];
  this.vavaType = 'char';
  this.character = character.substr(1,1);
};

CharLiteral.inherits(ASTNode);

CharLiteral.prototype.getSignature = function () {
  return {character : this.character};
};

CharLiteral.prototype.compileNode = function (opts) {
  return builder.functionCall('this.__env.CharValue.intern', [builder.string(this.character)], false);
};

/**
 * Creates a node for a FloatingPoint literal.
 *
 * @param numString The string describing the number
 */
var FloatingPointLiteral = exports.FloatingPointLiteral = function (numString) {
  this.type = 'FloatingPointLiteral';
  this.setLoc(arguments[arguments.length-1]);
  this.children = [];
  var parts;
  if (parts = numString.match(/^(0|[1-9][0-9]*)\.([1-9][0-9]*)?(?:[Ee]([+-])?([1-9][0-9]*))?([fFdD])?/)) {
    this.prePoint = Number(parts[1]);
    this.postPoint = (parts[2] && Number(parts[2])) || 0;
    this.exponent = (parts[4] || 0) * (parts[3] === '-' ? -1 : 1);
    this.vavaType = (parts[5] && parts[5].toLowerCase()) === 'f' ? 'float' : 'double';
  } else if (parts = numString.match(/\.([1-9][0-9]*)(?:[Ee]([+-])?([1-9][0-9]*))?([fFdD])?/)) {
    this.prePoint = 0;
    this.postPoint = Number(parts[1]);
    this.exponent = (parts[3] || 0) * (parts[2] === '-' ? -1 : 1);
    this.vavaType = (parts[4] && parts[4].toLowerCase()) === 'f' ? 'float' : 'double';
  } else if (parts = numString.match(/(0|[1-9][0-9]*)(?:[Ee]([+-])?([1-9][0-9]*))([fFdD])?/)) {
    this.prePoint = Number(parts[1]);
    this.postPoint = 0;
    this.exponent = parts[3] * (parts[2] === '-' ? -1 : 1);
    this.vavaType = (parts[4] && parts[4].toLowerCase()) === 'f' ? 'float' : 'double';
  } else if (parts = numString.match(/(0|[1-9][0-9]*)(?:[Ee]([+-])?([1-9][0-9]*))?([fFdD])/)) {
    this.prePoint = Number(parts[1]);
    this.postPoint = 0;
    this.exponent = (parts[3] || 0) * (parts[2] === '-' ? -1 : 1);
    this.vavaType = parts[4].toLowerCase() === 'f' ? 'float' : 'double';
  } else {
    throw new Error("Invalid floating point format: " + numString);
  }

};

FloatingPointLiteral.inherits(ASTNode);

FloatingPointLiteral.prototype.getSignature = function () {
  return {
    prePoint : this.prePoint, postPoint : this.postPoint,
    exponent : this.exponent, vavaType : this.vavaType
  };
};

FloatingPointLiteral.prototype.compileNode = function (opts) {
  var num = (this.prePoint + this.postPoint/Math.pow(10,this.postPoint.toString(10).length)) * Math.pow(10, this.exponent);
  if (this.isVavaType('float')) {
    return builder.functionCall('this.__env.FloatValue.intern', [num], false);
  } else {
    return builder.functionCall('this.__env.DoubleValue.intern', [num], false);
  }
};

/**
 * Creates a node for a null literal.
 *
 */
var NullLiteral = exports.NullLiteral = function () {
  this.type = 'NullLiteral';
  this.vavaType = 'null';
  this.setLoc(arguments[arguments.length-1]);
  this.children = [];
};

NullLiteral.inherits(ASTNode);

NullLiteral.prototype.compileNode = function (opts) {
  return 'this.__env.NullValue.intern()';
};


/**
 * Creates a node for a String literal.
 *
 * @param str The string
 */
var StringLiteral = exports.StringLiteral = function (str) {
  this.type = 'StringLiteral';
  this.setLoc(arguments[arguments.length-1]);
  this.children = [];
  this.vavaType = 'String';
  this.value = str;
};

StringLiteral.inherits(ASTNode);

StringLiteral.prototype.getSignature = function () {
  return {value : this.value};
};

// TODO Interned strings
StringLiteral.prototype.compileNode = function (opts) {
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
  this.setLoc(arguments[arguments.length-1]);
  this.children = [];

  this.appendChild(unaryExpression);
};

UnaryMinus.inherits(ASTNode);

UnaryMinus.prototype.getSignature = function () {
  return {};
};

UnaryMinus.prototype.compileNode = function (opts) {
  var result = builder.functionCall(this.children[0].compile(opts) + '.inverse', [], false);
  this.vavaType = this.children[0].getVavaType();
  return result;
};

/**
 * Creates a node for a unary plus expression.
 *
 * @param unaryExpression The operand
 */
var UnaryPlus = exports.UnaryPlus = function (unaryExpression) {
  this.type = 'UnaryPlus';
  this.setLoc(arguments[arguments.length-1]);
  this.children = [];

  this.appendChild(unaryExpression);
};

UnaryPlus.inherits(ASTNode);

UnaryPlus.prototype.getSignature = function () {
  return {};
};

UnaryPlus.prototype.compileNode = function (opts) {
  var result = this.children[0].compile(opts);
  this.vavaType = this.children[0].getVavaType();
  return result;
};

/**
 * Creates a node for post incrementing.
 *
 * @param variable The variable to increment
 */
var PostIncrement = exports.PostIncrement = function (variable) {
  this.type = 'PostIncrement';
  this.setLoc(arguments[arguments.length-1]);
  this.children = [];
  this.appendChild(variable);
};

PostIncrement.inherits(ASTNode);

PostIncrement.prototype.compileNode = function (opts) {
  var result = builder.functionCall(
    this.children[0].compile(opts.mergeOpts({noGet: true})) + '.postInc', [], false
  );
  this.vavaType = this.children[0].getVavaType();
  return result;
};

/**
 * Creates a node for post decrementing.
 *
 * @param variable The variable to decrement
 */
var PostDecrement = exports.PostDecrement = function (variable) {
  this.type = 'PostDecrement';
  this.setLoc(arguments[arguments.length-1]);
  this.children = [];
  this.appendChild(variable);
};

PostDecrement.inherits(ASTNode);

PostDecrement.prototype.compileNode = function (opts) {
  var result = builder.functionCall(
    this.children[0].compile(opts.mergeOpts({noGet: true})) + '.postDec', [], false
  );
  this.vavaType = this.children[0].getVavaType();
  return result;
};

/**
 * Creates a node for pre incrementing.
 *
 * @param variable The variable to increment
 */
var PreIncrement = exports.PreIncrement = function (variable) {
  this.type = 'PreIncrement';
  this.setLoc(arguments[arguments.length-1]);
  this.children = [];
  this.appendChild(variable);
};

PreIncrement.inherits(ASTNode);

PreIncrement.prototype.compileNode = function (opts) {
  var result = builder.functionCall(
    this.children[0].compile(opts.mergeOpts({noGet: true})) + '.preInc', [], false
  );
  this.vavaType = this.children[0].getVavaType();
  return result;
};

/**
 * Creates a node for pre decrementing.
 *
 * @param variable The variable to decrement
 */
var PreDecrement = exports.PreDecrement = function (variable) {
  this.type = 'PreDecrement';
  this.setLoc(arguments[arguments.length-1]);
  this.children = [];
  this.vavaType = 'int';
  this.appendChild(variable);
};

PreDecrement.inherits(ASTNode);

PreDecrement.prototype.compileNode = function (opts) {
  var result = builder.functionCall(
    this.children[0].compile(opts.mergeOpts({noGet: true})) + '.preDec', [], false
  );
  this.vavaType = this.children[0].getVavaType();
  return result;
};

/**
 * Creates a node for a cast expression.
 *
 * @param vavaType The type to cast to
 * @param unaryExpression The expression whose value to cast
 */
var CastExpression = exports.CastExpression = function (vavaType, unaryExpression) {
  this.type = 'CastExpression';
  this.setLoc(arguments[arguments.length-1]);
  this.children = [];
  this.vavaType = vavaType;
  this.appendChild(unaryExpression);
};

CastExpression.inherits(ASTNode);

CastExpression.prototype.compileNode = function (opts) {
  return builder.functionCall('(' + this.children[0].compile(opts) + ').to', [builder.string(this.vavaType)], false);
};

CastExpression.prototype.compileTimeCheck = function () {
  if (this.isVavaType('boolean') ^ this.children[0].isVavaType('boolean'))
    this.throwError('inconvertible types', 'found   : ' + this.children[0].getVavaType() + '\nrequired: ' + this.getVavaType());
}

// Binary

var NumberTypes = {'byte': true, 'short': true, 'char': true, 'int': true, 'long': true, 'float': true, 'double': true};

var BinaryOperationTypes = {
  'byte' : {'byte' : 'int','short' : 'int','char' : 'int','int' : 'int','long' : 'long','float' : 'float','double' : 'double','String' : 'String'},
  'short' : {'byte' : 'int','short' : 'int','char' : 'int','int' : 'int','long' : 'long','float' : 'float','double' : 'double','String' : 'String'},
  'char' : {'byte' : 'int','short' : 'int','char' : 'int','int' : 'int','long' : 'long','float' : 'float','double' : 'double','String' : 'String'},
  'int' : {'byte' : 'int','short' : 'int','char' : 'int','int' : 'int','long' : 'long','float' : 'float','double' : 'double','String' : 'String'},
  'long' : {'byte':'long', 'short':'long', 'char':'long', 'int':'long', 'long':'long', 'float':'float', 'double':'double', 'String':'String'},
  'float' : {'byte':'float', 'short':'float', 'char':'float', 'int':'float', 'long':'float', 'float':'float', 'double':'double', 'String':'String'},
  'double' : {'byte':'double', 'short':'double', 'char':'double', 'int':'double', 'long':'double', 'float':'double', 'double':'double', 'String':'String'},
  'String' : {'byte':'String', 'short':'String', 'char':'String', 'int':'String', 'long':'String', 'float':'String', 'double':'String', 'String':'String'},
};

/**
 * Creates a node for an addition operation.
 *
 * @param numA The number to send the addition message to
 * @param numB The number to add
 */
var Addition = exports.Addition = function (numA, numB) {
  this.type = 'Addition';
  this.setLoc(arguments[arguments.length-1]);
  this.children = [];
  // TODO Compile-time type checking
  if (!(numA) || !(numB)) {
    throw new TypeError('Expected two integer numbers for addition.');
  }
  this.appendChild(numA);
  this.appendChild(numB);
};

Addition.inherits(ASTNode);

Addition.prototype.compileNode = function (opts) {
  return utils.indent(this.children[0].compile(opts) + '.add(' + this.children[1].compile(opts) + ')', opts.indent);
};

Addition.prototype.compileTimeCheck = function () {
  this.vavaType = BinaryOperationTypes[this.children[0].getVavaType()][this.children[1].getVavaType()];
  if (!(this.vavaType === undefined)) {
    return true;
  } else {
    this.throwError('wrong types in addition', 'found   : ' + this.children[0].getVavaType() + '\nrequired: ' + this.children[1].getVavaType());
  }
};

/**
 * Creates a node for an subtraction operation.
 *
 * @param numA The number to send the subtraction message to
 * @param numB The number to subtract
 */
var Subtraction = exports.Subtraction = function (numA, numB) {
  this.type = 'Subtraction';
  this.setLoc(arguments[arguments.length-1]);
  this.children = [];
  // TODO Compile-time type checking
  if (!(numA) || !(numB)) {
    throw new TypeError('Expected two integer numbers for subtraction.');
  }
  this.appendChild(numA);
  this.appendChild(numB);
};

Subtraction.inherits(ASTNode);

Subtraction.prototype.compileNode = function (opts) {
  return utils.indent(this.children[0].compile(opts) + '.subtract(' + this.children[1].compile(opts) + ')', opts.indent);
};

Subtraction.prototype.compileTimeCheck = function () {
  this.vavaType = BinaryOperationTypes[this.children[0].getVavaType()][this.children[1].getVavaType()];
  if (!(this.vavaType === undefined || this.vavaType === 'String')) {
    return true;
  } else {
    this.throwError('wrong types in addition');
  }
};

/**
 * Creates a node for a multiplication operation.
 *
 * @param numA The number to send the multiplication message to
 * @param numB The number to multiply with
 */
var Multiplication = exports.Multiplication = function (numA, numB) {
  this.type = 'Multiplication';
  this.setLoc(arguments[arguments.length-1]);
  this.children = [];
  // TODO Compile-time type checking
  if (!(numA) || !(numB)) {
    throw new TypeError('Expected two integer numbers for multiplication.');
  }
  this.appendChild(numA);
  this.appendChild(numB);
};

Multiplication.inherits(ASTNode);

Multiplication.prototype.compileNode = function (opts) {
  return utils.indent(this.children[0].compile(opts) + '.times(' + this.children[1].compile(opts) + ')', opts.indent);
};

Multiplication.prototype.compileTimeCheck = Subtraction.prototype.compileTimeCheck;

/**
 * Creates a node for a division operation.
 *
 * @param numA The number to send the division message to
 * @param numB The number to divide by
 */
var Division = exports.Division = function (numA, numB) {
  this.type = 'Division';
  this.setLoc(arguments[arguments.length-1]);
  this.children = [];
  // TODO Compile-time type checking
  if (!(numA) || !(numB)) {
    throw new TypeError('Expected two integer numbers for division.');
  }
  this.appendChild(numA);
  this.appendChild(numB);
};

Division.inherits(ASTNode);

Division.prototype.compileNode = function (opts) {
  return utils.indent(this.children[0].compile(opts) + '.divide(' + this.children[1].compile(opts) + ')', opts.indent);
};

Division.prototype.compileTimeCheck = function () {
  // TODO division by zero
  this.vavaType = BinaryOperationTypes[this.children[0].getVavaType()][this.children[1].getVavaType()];
  if (!(this.vavaType === undefined || this.vavaType === 'String')) {
    return true;
  } else {
    this.throwError('wrong types in addition');
  }
};

/**
 * Creates a node for a modulo operation.
 *
 * @param numA The number to send the modulo message to
 * @param numB The number to modulate by
 */
var Modulo = exports.Modulo = function (numA, numB) {
  this.type = 'Modulo';
  this.setLoc(arguments[arguments.length-1]);
  this.children = [];
  // TODO Compile-time type checking
  if (!(numA) || !(numB)) {
    throw new TypeError('Expected two integer numbers for modulo.');
  }
  this.appendChild(numA);
  this.appendChild(numB);
};

Modulo.inherits(ASTNode);

Modulo.prototype.compileNode = function (opts) {
  return utils.indent(this.children[0].compile(opts) + '.modulo(' + this.children[1].compile(opts) + ')', opts.indent);
};

Modulo.prototype.compileTimeCheck = Division.prototype.compileTimeCheck;

/**
 * Creates a node for less than comparison.
 *
 * @param a First value to be compared
 * @param b Second value to be compared
 */
var LessThan = exports.LessThan = function (a, b) {
  this.type = 'LessThan';
  this.setLoc(arguments[arguments.length-1]);
  this.vavaType = 'boolean';
  this.children = [];
  if (!a || !b) {
    throw new TypeError('Expected two values to compare (lt).');
  }
  this.appendChild(a);
  this.appendChild(b);
};

LessThan.inherits(ASTNode);

LessThan.prototype.compileNode = function (opts) {
  return utils.indent(
    builder.functionCall(
      'this.__env.BooleanValue.intern',
      [builder.functionCall('(' + this.children[0].compile(opts) + ').isLessThan', [this.children[1].compile(opts)], false)],
      false
    ),
    opts.indent
  );
};

LessThan.prototype.compileTimeCheck = function () {
  if (!(this.children[0].isNumber() && this.children[1].isNumber()))
    this.throwError('expecting two numbers');
};

/**
 * Creates a node for an equality comparison.
 *
 * @param a First value to be compared
 * @param b Second value to be compared
 */
var Equals = exports.Equals = function (a, b) {
  this.type = 'Equals';
  this.setLoc(arguments[arguments.length-1]);
  this.vavaType = 'boolean';
  this.children = [];
  if (!a || !b) {
    throw new TypeError('Expected two values to compare for equality.');
  }
  this.appendChild(a);
  this.appendChild(b);
};

Equals.inherits(ASTNode);

Equals.prototype.compileNode = function (opts) {
  return utils.indent('this.__env.BooleanValue.intern(' + this.children[0].compile(opts) + ' === ' + this.children[1].compile(opts) + ')', opts.indent);
};

/**
 * Creates a node for a greater than comparison.
 *
 * @param a First value to be compared
 * @param b Second value to be compared
 */
var GreaterThan = exports.GreaterThan = function (a, b) {
  this.type = 'GreaterThan';
  this.setLoc(arguments[arguments.length-1]);
  this.vavaType = 'boolean';
  this.children = [];
  if (!a || !b) {
    throw new TypeError('Expected two values to compare (gt).');
  }
  this.appendChild(a);
  this.appendChild(b);
};

GreaterThan.inherits(ASTNode);

GreaterThan.prototype.compileNode = function (opts) {
  return utils.indent(
    builder.functionCall(
      'this.__env.BooleanValue.intern',
      [builder.functionCall('(' + this.children[0].compile(opts) + ').isGreaterThan', [this.children[1].compile(opts)], false)],
      false
    ),
    opts.indent
  );
};

GreaterThan.prototype.compileTimeCheck = LessThan.prototype.compileTimeCheck;

/**
 * Creates a node for an inequality comparison.
 *
 * @param a First value to be compared
 * @param b Second value to be compared
 */
var NotEquals = exports.NotEquals = function (a, b) {
  this.type = 'NotEquals';
  this.setLoc(arguments[arguments.length-1]);
  this.vavaType = 'boolean';
  this.children = [];
  if (!a || !b) {
    throw new TypeError('Expected two values to compare for inequality.');
  }
  this.appendChild(a);
  this.appendChild(b);
};

NotEquals.inherits(ASTNode);

NotEquals.prototype.compileNode = function (opts) {
  return utils.indent('this.__env.BooleanValue.intern(' + this.children[0].compile(opts) + ' !== ' + this.children[1].compile(opts) + ')', opts.indent);
};

/**
 * Creates a node for a ternary operator.
 *
 * @param condition expression of boolean type
 * @param optionA   Truthy option
 * @param optionB   Falsy option
 */
var TernaryOperator = exports.TernaryOperator = function (condition, optionA, optionB) {
  this.type = 'TernaryOperator';
  this.setLoc(arguments[arguments.length-1]);
  this.children = [];
  this.appendChild(condition);
  this.appendChild(optionA);
  this.appendChild(optionB);
};

TernaryOperator.inherits(ASTNode);

TernaryOperator.prototype.compileNode = function (opts) {
  return ['((this.__env.BooleanValue.intern(true) === ', this.children[0].compile(opts), ') ? ', this.children[1].compile(opts), ' : ', this.children[2].compile(opts) + ')'].join('');
};

TernaryOperator.prototype.compileTimeCheck = function () {
  this.vavaType = this.children[1].getVavaType();
  if (!this.children[0].isVavaType('boolean'))
    this.throwError('boolean type expected');
};

/**
 * Creates a node for a logical AND.
 *
 * @param boolA First truth value
 * @param boolB Second truth value
 */
var LogicalAnd = exports.LogicalAnd = function (boolA, boolB) {
  this.type = 'LogicalAnd';
  this.setLoc(arguments[arguments.length-1]);
  this.vavaType = 'boolean';
  this.children = [];
  this.appendChild(boolA);
  this.appendChild(boolB);
};

LogicalAnd.inherits(ASTNode);

LogicalAnd.prototype.compileNode = function (opts) {
  return builder.functionCall(
    'this.__env.BooleanValue.intern',
    [this.children[0].compile(opts) + '.get() && ' + this.children[1].compile(opts) + '.get()'],
    false
  );
};

LogicalAnd.prototype.compileTimeCheck = function () {
  if (!this.children[0].isVavaType('boolean') || !this.children[1].isVavaType('boolean'))
    this.throwError('boolean type expected');
};

/**
 * Creates a node for a logical OR.
 *
 * @param boolA First truth value
 * @param boolB Second truth value
 */
var LogicalOr = exports.LogicalOr = function (boolA, boolB) {
  this.type = 'LogicalOr';
  this.setLoc(arguments[arguments.length-1]);
  this.vavaType = 'boolean';
  this.children = [];
  this.appendChild(boolA);
  this.appendChild(boolB);
};

LogicalOr.inherits(ASTNode);

LogicalOr.prototype.compileNode = function (opts) {
  return builder.functionCall(
    'this.__env.BooleanValue.intern',
    [this.children[0].compile(opts) + '.get() || ' + this.children[1].compile(opts) + '.get()'],
    false
  );
};

LogicalOr.prototype.compileTimeCheck = LogicalAnd.prototype.compileTimeCheck;

/**
 * Creates a node for an inclusive logical AND.
 *
 * @param a First value
 * @param b Second value
 */
var InclusiveAnd = exports.InclusiveAnd = function (a, b) {
  this.type = 'InclusiveAnd';
  this.setLoc(arguments[arguments.length-1]);
  this.children = [];
  this.appendChild(a);
  this.appendChild(b);
};

InclusiveAnd.inherits(ASTNode);

InclusiveAnd.prototype.compileNode = function (opts) {
  return builder.functionCall(
    this.children[0].compile(opts) + '.and',
    [this.children[1].compile(opts)],
    false
  );
};

InclusiveAnd.prototype.compileTimeCheck = function () {
  if (this.children[0].isVavaType('boolean') && this.children[1].isVavaType('boolean'))
    this.vavaType = 'boolean';
  else if (this.children[0].isIntegral() && this.children[1].isIntegral())
    this.vavaType = BinaryOperationTypes[this.children[0].getVavaType()][this.children[1].getVavaType()];
  else
    this.throwError('int x int or bool x bool');
};

/**
 * Creates a node for an inclusive logical OR.
 *
 * @param a First value
 * @param b Second value
 */
var InclusiveOr = exports.InclusiveOr = function (a, b) {
  this.type = 'InclusiveOr';
  this.setLoc(arguments[arguments.length-1]);
  // TODO depends on args
  this.vavaType = 'boolean';
  this.children = [];
  this.appendChild(a);
  this.appendChild(b);
};

InclusiveOr.inherits(ASTNode);

InclusiveOr.prototype.compileNode = function (opts) {
  return builder.functionCall(
    this.children[0].compile(opts) + '.or',
    [this.children[1].compile(opts)],
    false
  );
};

InclusiveOr.prototype.compileTimeCheck = InclusiveAnd.prototype.compileTimeCheck;

/**
 * Creates a node for an exclusive logical OR.
 *
 * @param a First value
 * @param b Second value
 */
var ExclusiveOr = exports.ExclusiveOr = function (a, b) {
  this.type = 'ExclusiveOr';
  this.setLoc(arguments[arguments.length-1]);
  // TODO depends on args
  this.vavaType = 'boolean';
  this.children = [];
  this.appendChild(a);
  this.appendChild(b);
};

ExclusiveOr.inherits(ASTNode);

ExclusiveOr.prototype.compileNode = function (opts) {
  return builder.functionCall(
    this.children[0].compile(opts) + '.xor',
    [this.children[1].compile(opts)],
    false
  );
};

ExclusiveOr.prototype.compileTimeCheck = InclusiveAnd.prototype.compileTimeCheck;

/**
 * Creates a node for a logical negation.
 *
 * @param boolA Expression of boolean type
 */
var Negation = exports.Negation = function (boolA) {
  this.type = 'Negation';
  this.setLoc(arguments[arguments.length-1]);
  this.vavaType = 'boolean';
  this.children = [];
  this.appendChild(boolA);
};

Negation.inherits(ASTNode);

Negation.prototype.compileNode = function (opts) {
  return this.children[0].compile(opts) + '.not()';
};

Negation.prototype.compileTimeCheck = function () {
  if (!this.children[0].isVavaType('boolean'))
    this.throwError('negating non-bool');
};

/**
 * Creates a node for a bitwise negation.
 *
 * @param num Expression of integral type
 */
var BitwiseNegation = exports.BitwiseNegation = function (num) {
  this.type = 'BitwiseNegation';
  this.setLoc(arguments[arguments.length-1]);
  this.vavaType = 'int';
  this.children = [];
  this.appendChild(num);
};

BitwiseNegation.inherits(ASTNode);

BitwiseNegation.prototype.compileNode = function (opts) {
  return this.children[0].compile(opts) + '.bitwiseNot()';
};

BitwiseNegation.prototype.compileTimeCheck = function () {
  if (!this.children[0].isIntegral())
    this.throwError('bitwise negating non-int');
};

/**
 * Creates a node for a leftshift operation.
 *
 * @param a First value
 * @param b Second value
 */
var LeftShift = exports.LeftShift = function (a, b) {
  this.type = 'LeftShift';
  this.setLoc(arguments[arguments.length-1]);
  this.vavaType = 'int';
  this.children = [];
  this.appendChild(a);
  this.appendChild(b);
}

LeftShift.inherits(ASTNode);

LeftShift.prototype.compileNode = function (opts) {
  return builder.functionCall(
    this.children[0].compile(opts) + '.leftshift',
    [this.children[1].compile(opts)],
    false
  );
};

LeftShift.prototype.compileTimeCheck = function () {
  if (this.children[0].isIntegral() && this.children[1].isIntegral())
    this.vavaType = BinaryOperationTypes[this.children[0].getVavaType()][this.children[1].getVavaType()];
  else
    this.throwError('int x int');
};

/**
 * Creates a node for a rightshift operation.
 *
 * @param a First value
 * @param b Second value
 */
var RightShift = exports.RightShift = function (a, b) {
  this.type = 'RightShift';
  this.setLoc(arguments[arguments.length-1]);
  this.vavaType = 'int';
  this.children = [];
  this.appendChild(a);
  this.appendChild(b);
};

RightShift.inherits(ASTNode);

RightShift.prototype.compileNode = function (opts) {
  return builder.functionCall(
    this.children[0].compile(opts) + '.rightshift',
    [this.children[1].compile(opts)],
    false
  );
};

RightShift.prototype.compileTimeCheck = LeftShift.prototype.compileTimeCheck;

/**
 * Creates a node for a zero-filling rightshift operation.
 *
 * @param a First value
 * @param b Second value
 */
var ZeroFillRightShift = exports.ZeroFillRightShift = function (a, b) {
  this.type = 'ZeroFillRightShift';
  this.setLoc(arguments[arguments.length-1]);
  this.vavaType = 'int';
  this.children = [];
  this.appendChild(a);
  this.appendChild(b);
};

ZeroFillRightShift.inherits(ASTNode);

ZeroFillRightShift.prototype.compileNode = function (opts) {
  return builder.functionCall(
    this.children[0].compile(opts) + '.zerofillRightshift',
    [this.children[1].compile(opts)],
    false
  );
};

ZeroFillRightShift.prototype.compileTimeCheck = LeftShift.prototype.compileTimeCheck;

/**
 * Creates a node for an if-then conditional.
 *
 * @param ifExpr The condition
 * @param thenExpr The conditional statement
 */
var IfThen = exports.IfThen = function (ifExpr, thenExpr) {
  this.type = 'IfThen';
  this.setLoc(arguments[arguments.length-1]);
  this.children = [];
  if (!ifExpr || !thenExpr) {
    throw new TypeError('Expected condition and conditional.');
  }
  this.appendChild(ifExpr);
  this.appendChild(thenExpr);
};

IfThen.inherits(ASTNode);

IfThen.prototype.compileNode = function (opts) {
  var blockOpts = opts.descendScope({indent: (opts.indent || 0) + 2});
  var js = 'if (this.__env.BooleanValue.intern(true) === ';
  js += this.children[0].compile(opts) + ') {\n';
  js += this.children[1].compile(blockOpts);
  return utils.indent(js + '\n}\n', opts.indent);
};

IfThen.prototype.compileTimeCheck = function () {
  if (!this.children[0].isVavaType('boolean'))
    this.throwError('expected bool in if');
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
  this.setLoc(arguments[arguments.length-1]);
  this.children = [];
  if (!condition || !truthyStatement || !falsyStatement) {
    throw new TypeError('Expected condition and conditionals.');
  }
  this.appendChild(condition);
  this.appendChild(truthyStatement);
  this.appendChild(falsyStatement);
};

IfThenElse.inherits(ASTNode);

IfThenElse.prototype.compileNode = function (opts) {
  var blockOpts = opts.descendScope({indent: (opts.indent || 0) + 2});
  var js = utils.indent('if (this.__env.BooleanValue.intern(true) === ', opts.indent);
  js += this.children[0].compile(blockOpts) + ') {\n';
  js += this.children[1].compile(blockOpts) + '\n';
  js += utils.indent('} else {\n', opts.indent);
  js += this.children[2].compile(blockOpts) + '\n';
  js += utils.indent('}', opts.indent);
  return js;
};

IfThenElse.prototype.compileTimeCheck = IfThen.prototype.compileTimeCheck;

/**
 * Creates a node for a while loop.
 *
 * @param condition The condition
 * @param statement The looped statements
 */
var WhileLoop = exports.WhileLoop = function (condition, statement) {
  this.type = 'WhileLoop';
  this.setLoc(arguments[arguments.length-1]);
  this.children = [];
  if (!condition || !statement) {
    throw new TypeError('Expected condition and conditional.');
  }
  this.appendChild(condition);
  this.appendChild(statement);
};

WhileLoop.inherits(ASTNode);

WhileLoop.prototype.compileNode = function (opts) {
  var blockOpts = opts.descendScope({indent: (opts.indent || 0) + 2});
  return utils.indent(builder.wrapParens(
    builder.wrapAsFunction(
      utils.indentSpaces(opts.indent + 2) + 'while (this.__env.BooleanValue.intern(true) === ' + this.children[0].compile(blockOpts) + ') { ' + builder.wrapParens(builder.wrapAsFunction(this.children[1].compile(blockOpts))) + '.call(blockScope); }',
      ['blockScope']
    )
  ) + '.call(this, this.__descend());', opts.indent);
};

WhileLoop.prototype.compileTimeCheck = IfThen.prototype.compileTimeCheck;

/**
 * Creates a node for a do-while loop.
 *
 * @param statement The looped statements
 * @param condition The condition
 */
var DoWhileLoop = exports.DoWhileLoop = function (statement, condition) {
  this.type = 'DoWhileLoop';
  this.setLoc(arguments[arguments.length-1]);
  this.children = [];
  if (!condition || !statement) {
    throw new TypeError('Expected condition and conditional.');
  }
  this.appendChild(statement);
  this.appendChild(condition);
};

DoWhileLoop.inherits(ASTNode);

DoWhileLoop.prototype.compileNode = function (opts) {
  var blockOpts = opts.descendScope({indent: (opts.indent || 0) + 2});
  return utils.indent(builder.wrapParens(
    builder.wrapAsFunction(
      utils.indentSpaces(opts.indent + 2) + 'while (freeRide || this.__env.BooleanValue.intern(true) === ' + this.children[1].compile(blockOpts) + ') { ' + builder.wrapParens(builder.wrapAsFunction(this.children[0].compile(blockOpts))) + '.call(blockScope); freeRide = false; }',
      ['freeRide', 'blockScope']
    )
  ) + '.call(this, true, this.__descend());', opts.indent);
};

DoWhileLoop.prototype.compileTimeCheck = function () {
  if (!this.children[1].isVavaType('boolean'))
    this.throwError('expected bool in do-while');
};

/**
 * Creates a node for a for loop.
 *
 * @param init The initialization
 * @param condition The condition
 * @param update The update
 * @param statement The statement
 */
var ForLoop = exports.ForLoop = function (init, condition, update, statement) {
  this.type = 'ForLoop';
  this.setLoc(arguments[arguments.length-1]);
  this.children = [];
  init = init || new ASTNode();
  condition = condition || new BooleanLiteral(true);
  update = update || new ASTNode();
  this.appendChild(init);
  this.appendChild(condition);
  this.appendChild(update);
  this.appendChild(statement);
};

ForLoop.inherits(ASTNode);

ForLoop.prototype.compileNode = function (opts) {
  var blockOpts = opts.descendScope({indent: (opts.indent || 0) + 2});
  return utils.indent(builder.wrapParens(
    builder.wrapAsFunction(
      utils.indentSpaces(opts.indent + 2) + 'for (' + this.children[0].compile(blockOpts) + '; this.__env.BooleanValue.intern(true) === ' + this.children[1].compile(blockOpts) + '; ' + this.children[2].compile(blockOpts) + ') { ' + builder.wrapParens(builder.wrapAsFunction(this.children[3].compile(blockOpts))) + '.call(blockScope); }',
      ['blockScope']
    )
  ) + '.call(this, this.__descend());', opts.indent);
};

ForLoop.prototype.compileTimeCheck = function () {
  if (!this.children[1].isVavaType('boolean'))
    this.throwError('expected bool in for condition');
};

/**
 * Creates a node for a list of statement expressions
 *
 * @param firstChild Optional first child
 */
var StatementExpressionList = exports.StatementExpressionList = function (firstChild) {
  this.type = 'StatementExpressionList';
  this.setLoc(arguments[arguments.length-1]);
  this.children = [];
  if (firstChild) this.appendChild(firstChild);

};

StatementExpressionList.inherits(ASTNode);

StatementExpressionList.prototype.compileNode = function (opts) {
  return this.children.map(function (child) { return child.compile(opts); }).join(', ');
};

