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
      methods : [
        new vava.env.VavaMethod(
          'readln',
          'String',
          [],
          function () { return new this.__env.StringValue("5"); }
        ),
        new vava.env.VavaMethod(
          'readInt',
          'int',
          [],
          function () { var max = 9, min = 0; return this.__env.IntValue.intern(Math.floor(Math.random() * (max - min + 1)) + min); }
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

exports.Byte = new vava.env.VavaClass(
  'Byte',
  {
    methods : [
      new vava.env.VavaMethod(
        'parseByte',
        'byte',
        [{identifier: 'str', vavaType: 'String'}],
        function () { return this.__self.send('parseByte(String,int)', [this.str.get(), this.__env.IntValue.intern(10)]); }
      ),
      new vava.env.VavaMethod(
        'parseByte',
        'byte',
        [{identifier: 'str', vavaType: 'String'}, {identifier: 'radix', vavaType: 'int'}],
        function () { return this.__env.ByteValue.intern(parseInt(this.str.get(), this.radix.get())); }
      )
    ]
  },
  new vava.scope.Scope({__env : vava.env})
);

exports.Short = new vava.env.VavaClass(
  'Short',
  {
    methods : [
      new vava.env.VavaMethod(
        'parseShort',
        'short',
        [{identifier: 'str', vavaType: 'String'}],
        function () { return this.__self.send('parseShort(String,int)', [this.str.get(), this.__env.IntValue.intern(10)]); }
      ),
      new vava.env.VavaMethod(
        'parseShort',
        'short',
        [{identifier: 'str', vavaType: 'String'}, {identifier: 'radix', vavaType: 'int'}],
        function () { return this.__env.ShortValue.intern(parseInt(this.str.get(), this.radix.get())); }
      )
    ]
  },
  new vava.scope.Scope({__env : vava.env})
);

exports.Integer = new vava.env.VavaClass(
  'Integer',
  {
    methods : [
      new vava.env.VavaMethod(
        'parseInt',
        'int',
        [{identifier: 'str', vavaType: 'String'}],
        function () { return this.__self.send('parseInt(String,int)', [this.str.get(), this.__env.IntValue.intern(10)]); }
      ),
      new vava.env.VavaMethod(
        'parseInt',
        'int',
        [{identifier: 'str', vavaType: 'String'}, {identifier: 'radix', vavaType: 'int'}],
        function () { return this.__env.IntValue.intern(parseInt(this.str.get(), this.radix.get())); }
      )
    ]
  },
  new vava.scope.Scope({__env : vava.env})
);

exports.Long = new vava.env.VavaClass(
  'Long',
  {
    methods : [
      new vava.env.VavaMethod(
        'parseLong',
        'long',
        [{identifier: 'str', vavaType: 'String'}],
        function () { return this.__self.send('parseLong(String,int)', [this.str.get(), this.__env.IntValue.intern(10)]); }
      ),
      new vava.env.VavaMethod(
        'parseLong',
        'long',
        [{identifier: 'str', vavaType: 'String'}, {identifier: 'radix', vavaType: 'int'}],
        function () { return this.__env.LongValue.intern(parseInt(this.str.get(), this.radix.get())); }
      )
    ]
  },
  new vava.scope.Scope({__env : vava.env})
);

exports.Float = new vava.env.VavaClass(
  'Float',
  {
    methods : [
      new vava.env.VavaMethod(
        'parseFloat',
        'float',
        [{identifier: 'str', vavaType: 'String'}],
        function () { return this.__env.FloatValue.intern(parseFloat(this.str.get(), 10)); }
      )
    ]
  },
  new vava.scope.Scope({__env : vava.env})
);

exports.Double = new vava.env.VavaClass(
  'Double',
  {
    methods : [
      new vava.env.VavaMethod(
        'parseDouble',
        'double',
        [{identifier: 'str', vavaType: 'String'}],
        function () { return this.__env.DoubleValue.intern(parseFloat(this.str.get(), 10)); }
      )
    ]
  },
  new vava.scope.Scope({__env : vava.env})
);

exports.Math = new vava.env.VavaClass(
  'Math',
  {
    methods : [
      new vava.env.VavaMethod(
        'pow',
        'double',
        [{identifier: 'a', vavaType: 'double'}, {identifier: 'b', vavaType: 'double'}],
        function () { return this.__env.DoubleValue.intern(Math.pow(this.a.get(), this.b.get())); }
      ),
      new vava.env.VavaMethod(
        'sin',
        'double',
        [{identifier: 'a', vavaType: 'double'}],
        function () { return this.__env.DoubleValue.intern(Math.sin(this.a.get())); }
      )
    ]
  },
  new vava.scope.Scope({__env : vava.env})
);

