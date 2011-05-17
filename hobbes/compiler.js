var utils = (typeof hobbes !== 'undefined' && hobbes.utils) || require('./utils');
var vava = (typeof hobbes !== 'undefined' && hobbes.vava) || require('./vava');
var stdlib = (typeof hobbes !== 'undefined' && hobbes.stdlib) || require('./stdlib');
var parser = exports.parser = require('./compiler/parser').parser;
parser.yy = require('./compiler/ast_nodes');
parser.yy.utils = utils.yyUtils;

// Simple interface for now
exports.run = function (vavaSrc, options) {
  options = options || {};
  if (typeof vavaSrc !== 'string') {
    throw new TypeError('Expected Vava source to be provided as string.');
  }
  var vavaAST = parser.parse(vavaSrc);
  try {
    var compilation = vavaAST.compile();
  } catch (err) {
    if (err.type === 'CompileTimeError') {
      err.line = err.loc.first_line;
      err.description = errorDescription(vavaSrc, err);
    }
    throw err;
  }

  if (options.debug && typeof console !== 'undefined') {
    console.log(compilation);
  }
  
  var runner = new Function (compilation);
  // TODO How does the import of `java.lang` happen in Java?
  var scope = new vava.scope.Scope({__env : vava.env}).__add(stdlib).__add(stdlib.java.lang);
  runner.call(scope);
};

function errorDescription(source, err) {
  var description = (err.description && err.description + '\n') || '';
  description += rogueLines(source, err.loc.first_line, err.loc.last_line) + '\n';
  description += pointer(err.loc.first_column);
  return description;
}

function rogueLines(source, firstLine, lastLine) {
  return source.split('\n').slice(firstLine - 1, lastLine).join('\n');
}

function pointer(colnum) {
  var pointerString = '^', i;
  for (i = 0; i < colnum; i++) pointerString = ' ' + pointerString;
  return pointerString;
}
