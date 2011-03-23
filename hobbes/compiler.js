var utils = (typeof hobbes !== 'undefined' && hobbes.utils) || require('./utils');
var vava = (typeof hobbes !== 'undefined' && hobbes.vava) || require('./vava');
var parser = exports.parser = require('./compiler/parser').parser;
parser.yy = require('./compiler/ast_nodes');
parser.yy.utils = utils.yyUtils;

var AlgoTools = {
  IO : new vava.env.VavaClass('IO', {
    methods : {
      println : new vava.env.VavaMethod(
        'println',
        'void',
        [{identifier: 'str', vavaType: 'int'}],
        function () { alert(this.str.get()); }
      ),
      readInt : new vava.env.VavaMethod(
        'readInt',
        'int',
        [{identifier: 'str', vavaType: 'int'}],
        function () { return new vava.env.IntValue(Number(prompt(this.str.get()))); }
      )
    }
  }, new vava.scope.Scope({__env : vava.env}))
};

// Simple interface for now
exports.run = function (vavaSrc) {
  if (typeof vavaSrc !== 'string') {
    throw new TypeError('Expected Vava source to be provided as string.');
  }
  var vavaAST = parser.parse(vavaSrc);
  var compilation = vavaAST.compile();
  
  var runner = new Function (compilation);
  var scope = new vava.scope.Scope({__env : vava.env, AlgoTools : AlgoTools});
  runner.call(scope);
}
