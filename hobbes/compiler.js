var utils = (typeof hobbes !== 'undefined' && hobbes.utils) || require('./utils');
var parser = exports.parser = require('./compiler/parser').parser;
parser.yy = require('./compiler/ast_nodes');
parser.yy.utils = utils.yyUtils;

// Simple interface for now
exports.run = function (vavaSrc) {
  var vavaAST = parser.parse(vavaSrc);
  var compilation = vavaAST.compile();
  var runner = Function(compilation);
  return runner.call();
}