var utils = (typeof hobbes !== 'undefined' && hobbes.utils) || require('./utils');
var vava = (typeof hobbes !== 'undefined' && hobbes.vava) || require('./vava');
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
  runner.call(vava);
}