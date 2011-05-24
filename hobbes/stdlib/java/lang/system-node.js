var vava = (typeof hobbes !== 'undefined' && hobbes.vava) || require('../../../vava');

exports.System = {

  'in' : new vava.env.VavaClass(
    'In',
    {
      methods : [
        new vava.env.VavaMethod(
          'readln',
          'String',
          [],
          function () { var max = 9, min = 0; return this.__env.StringValue.intern(String(Math.floor(Math.random() * (max - min + 1)) + min)); }
        ),
        new vava.env.VavaMethod(
          'readln',
          'String',
          [{identifier: 's', vavaType: 'String'}],
          function () { var max = 9, min = 0; return this.__env.StringValue.intern(String(Math.floor(Math.random() * (max - min + 1)) + min)); }
        )
      ]
    },
    new vava.scope.Scope({__env : vava.env})
  ),

  'out' : new vava.env.VavaClass(
    'Out',
    {
      methods : [
        new vava.env.VavaMethod(
          'print',
          'void',
          [{identifier: 'c', vavaType: 'char'}],
          function () { process.stdout.write(this.c.get().toString()); }
        ),
        new vava.env.VavaMethod(
          'print',
          'void',
          [{identifier: 'str', vavaType: 'int'}],
          function () { process.stdout.write(this.str.get()); }
        ),
        new vava.env.VavaMethod(
          'print',
          'void',
          [{identifier: 'str', vavaType: 'String'}],
          function () { process.stdout.write(this.str.get().toString()); }
        ),
        new vava.env.VavaMethod(
          'println',
          'void',
          [{identifier: 'str', vavaType: 'boolean'}],
          function () { process.stdout.write(this.str.get() + '\n'); }
        ),
        new vava.env.VavaMethod(
          'println',
          'void',
          [{identifier: 'str', vavaType: 'byte'}],
          function () { process.stdout.write(this.str.get() + '\n'); }
        ),
        new vava.env.VavaMethod(
          'println',
          'void',
          [{identifier: 'str', vavaType: 'short'}],
          function () { process.stdout.write(this.str.get() + '\n'); }
        ),
        new vava.env.VavaMethod(
          'println',
          'void',
          [{identifier: 'str', vavaType: 'char'}],
          function () { process.stdout.write(this.str.get() + '\n'); }
        ),
        new vava.env.VavaMethod(
          'println',
          'void',
          [{identifier: 'str', vavaType: 'int'}],
          function () { process.stdout.write(this.str.get() + '\n'); }
        ),
        new vava.env.VavaMethod(
          'println',
          'void',
          [{identifier: 'str', vavaType: 'long'}],
          function () { process.stdout.write(this.str.get() + '\n'); }
        ),
        new vava.env.VavaMethod(
          'println',
          'void',
          [{identifier: 'str', vavaType: 'float'}],
          function () { process.stdout.write(this.str.get() + '\n'); }
        ),
        new vava.env.VavaMethod(
          'println',
          'void',
          [{identifier: 'str', vavaType: 'double'}],
          function () { process.stdout.write(this.str.get() + '\n'); }
        ),
        new vava.env.VavaMethod(
          'println',
          'void',
          [{identifier: 'str', vavaType: 'String'}],
          function () { process.stdout.write(this.str.get() + '\n'); }
        )
      ]
    },
    new vava.scope.Scope({__env : vava.env})
  )

};
