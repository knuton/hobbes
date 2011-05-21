var utils = (typeof hobbes !== 'undefined' && hobbes.utils) || require('./utils');
var vava = (typeof hobbes !== 'undefined' && hobbes.vava) || require('./vava');
var stdlib = (typeof hobbes !== 'undefined' && hobbes.stdlib) || require('./stdlib');
var parser = exports.parser = require('./compiler/parser').parser;
parser.yy = require('./compiler/ast_nodes');
parser.yy.utils = utils.yyUtils;

var loadClass = function (vavaSrc, scope, options) {
  // Parse and create AST
  var vavaAST = parser.parse(vavaSrc);
  // Compile AST, giving controlled error output for known error types
  try {
    var compilation = vavaAST.compile({names: scope.__descend()});
  } catch (err) {
    if (err.length || err.type === 'CompileTimeError') {
      err = enhanceErrors(err, vavaSrc);
    }
    throw err;
  }
  // If we are here, compilation was successful
  // Debug info: print compiled code
  if (options.debug && typeof console !== 'undefined') {
    console.log(compilation);
  }
  // Create lexical scope for execution
  // This basically creates a new JS function with the compiled code as
  // statements
  var runner = new Function (compilation);
  return runner.call(scope);
};

// Simple interface for now
exports.run = function (vavaSrc, options) {
  options = options || {};
  if (typeof vavaSrc !== 'string') {
    throw new TypeError('Expected Vava source to be provided as string.');
  }
  var scope = new vava.scope.Scope({__env : vava.env}).__add(stdlib).__add(stdlib.java.lang);

  var vavaClass = loadClass(vavaSrc, scope, options);

  // Invoke `main`
  if (vavaClass.hasMethod('main(String[])')) {
    // TODO replace args for main with yet-to-come array
    vavaClass.send('main(String[])', [{getVavaType: function () { return true; }, to: function () {return this;}}]);
  } else {
    throw {type: 'NoSuchMethodError', message: 'Exception in thread "main" java.lang.NoSuchMethodError: main'};
  }
};

function enhanceErrors (errs, source) {
  if (typeof errs.length !== 'number') {
    errs = [errs];
  }
  var enhanced = errs.map(function (err) {
    err.line = err.loc.first_line;
    err.description = errorDescription(source, err);
    err.toString = errorToString;
    return err;
  });
  enhanced.type = 'CompileTimeError';
  enhanced.summary = enhanced.length + (enhanced.length > 1 ? ' errors' : ' error');
  return enhanced;
};

function errorDescription(source, err) {
  var description = (err.description && err.description + '\n') || '';
  description += rogueLines(source, err.loc.first_line, err.loc.last_line) + '\n';
  description += pointer(err.loc.first_column);
  return description;
}

function errorToString (err) {
  err = err || this;
  return err.line + ': ' + err.message + '\n' + err.description + '\n';
}

function rogueLines(source, firstLine, lastLine) {
  return source.split('\n').slice(firstLine - 1, lastLine).join('\n');
}

function pointer(colnum) {
  var pointerString = '^', i;
  for (i = 0; i < colnum; i++) pointerString = ' ' + pointerString;
  return pointerString;
}
