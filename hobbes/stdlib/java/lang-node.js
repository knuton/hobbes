var vava = (typeof hobbes !== 'undefined' && hobbes.vava) || require('../../vava');

// Helpers
var nodeStdIn = process.openStdin();
nodeStdIn.setEncoding('utf8');
//nodeStdIn.on('data', function (chunk) {
  //process.stdout.write('data: ' + chunk);
//});

exports.System = {

  // TODO Look up proper name for IO classes
  'in' : new vava.env.VavaClass(
    'In',
    {
      methods : {
        readln : new vava.env.VavaMethod(
          'readln',
          'int',
          [],
          function () { return new this.__env.IntValue(Number(5)); }
        )
      }
    },
    new vava.scope.Scope({__env : vava.env})
  ),

  'out' : new vava.env.VavaClass(
    'Out',
    {
      methods : {
        print : new vava.env.VavaMethod(
          'print',
          'void',
          [{identifier: 'str', vavaType: 'int'}],
          function () { process.stdout.write(this.str.toString()); }
        ),
        println : new vava.env.VavaMethod(
          'println',
          'void',
          [{identifier: 'str', vavaType: 'int'}],
          function () { process.stdout.write(this.str.toString() + '\n'); }
        )
      }
    },
    new vava.scope.Scope({__env : vava.env})
  )

};

