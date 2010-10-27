var parser = exports.parser = require('./compiler/parser');
parser.yy = require('./compiler/ast_nodes');

// Simple interface for now
exports.run = function (vavaSrc) {
  var vavaAST = parser.parse(vavaSrc);
  var compilation = vavaAST.compile();
  var runner = Function(compilation);
  runner.call();
}