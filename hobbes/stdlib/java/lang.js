var vava = (typeof hobbes !== 'undefined' && hobbes.vava) || require('../../vava');

exports.System = typeof require === 'function' ? require('./lang/system-node').System : require('./lang/system-web').System;

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
      ),
      new vava.env.VavaMethod(
        'toString',
        'String',
        [{identifier: 'n', vavaType: 'byte'}],
        function () { return this.__env.StringValue.intern(this.n.get().toString()); }
      )
    ]
  },
  new vava.scope.Scope({__env : vava.env})
);

exports.Character = new vava.env.VavaClass(
  'Character',
  {
    methods : [
      new vava.env.VavaMethod(
        'parseChar',
        'char',
        [{identifier: 'str', vavaType: 'String'}],
        function () { return this.__env.CharValue.intern(this.str.get().toString()); }
      ),
      new vava.env.VavaMethod(
        'toString',
        'String',
        [{identifier: 'n', vavaType: 'char'}],
        function () { return this.__env.StringValue.intern(this.n.get().toString()); }
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
      ),
      new vava.env.VavaMethod(
        'toString',
        'String',
        [{identifier: 'n', vavaType: 'short'}],
        function () { return this.__env.StringValue.intern(this.n.get().toString()); }
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
      ),
      new vava.env.VavaMethod(
        'toString',
        'String',
        [{identifier: 'n', vavaType: 'int'}],
        function () { return this.__env.StringValue.intern(this.n.get().toString()); }
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
      ),
      new vava.env.VavaMethod(
        'toString',
        'String',
        [{identifier: 'n', vavaType: 'long'}],
        function () { return this.__env.StringValue.intern(this.n.get().toString()); }
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
      ),
      new vava.env.VavaMethod(
        'toString',
        'String',
        [{identifier: 'n', vavaType: 'float'}],
        function () { return this.__env.StringValue.intern(this.n.get().toString()); }
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
      ),
      new vava.env.VavaMethod(
        'toString',
        'String',
        [{identifier: 'n', vavaType: 'double'}],
        function () { return this.__env.StringValue.intern(this.n.get().toString()); }
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

