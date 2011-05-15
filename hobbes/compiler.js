var utils = (typeof hobbes !== 'undefined' && hobbes.utils) || require('./utils');
var vava = (typeof hobbes !== 'undefined' && hobbes.vava) || require('./vava');
var stdlib = (typeof hobbes !== 'undefined' && hobbes.stdlib) || require('./stdlib');
var parser = exports.parser = require('./compiler/parser').parser;
parser.yy = require('./compiler/ast_nodes');
parser.yy.utils = utils.yyUtils;

// Simple interface for now
exports.run = function (vavaSrc) {
  if (typeof vavaSrc !== 'string') {
    throw new TypeError('Expected Vava source to be provided as string.');
  }
  var vavaAST = parser.parse(vavaSrc);
  var compilation = vavaAST.compile();
  
  var runner = new Function (compilation);
  // TODO How does the import of `java.lang` happen in Java?
  var scope = new vava.scope.Scope({__env : vava.env}).__add(stdlib).__add(stdlib.java.lang);
  runner.call(scope);
};
