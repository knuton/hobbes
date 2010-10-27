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
  var children = [];
  // Node type
  var type = 'ASTNode';
  
  /**
   * Adds the provided node as a child, if it passes as an ASTNode.
   *
   * @param node An ASTNode
   */
  this.appendChild = function (node) {
    ASTNodeInterface.check(node);
    children.push(node);
  }
  
  /**
   * Compiles this node with all its children
   */
  this.compile = function () {
    return this.compileNode(children);
  }
  
  /**
   * Returns the type of node.
   */
  this.getType = function () {
    return type;
  }
  
  /**
   * Returns a string representation of the form
   *
   * - ASTNode
   *   - Child A
   *     - Child A's child
   *   - Child B
   */
  this.toString = function (indent) {
    // default indentation is none
    indent = indent || 0
    // add indentation and own type
    var str = utils.indent(indent) + '- ' + type + '\n';
    // append toString results of children
    children.forEach(function (child) {
      str += child.toString(indent + 2);
    });
    
    return str;
  }
  
};