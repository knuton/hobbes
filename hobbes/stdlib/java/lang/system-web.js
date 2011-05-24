var vava = (typeof hobbes !== 'undefined' && hobbes.vava) || require('../../../vava');

var System = exports.System = function (elem) {
  // Determine type of output
  if (elem && typeof elem.innerHTML !== 'undefined') {
    elem.print = function (str) {
      this.innerHTML += str;
    };
  // Use browser console
  } else if (console && console.log) {
    function F () {};
    F.prototype = console;
    elem = new F();
    elem.print = function (str) { this.log(str); };
  // Getting desperate now
  } else {
    elem = { print : function (arg) { alert(arg); } };
  }

  // Return classes with elem as output element
  return {
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
            function () { var max = 9, min = 0; return this.__env.IntValue.intern(Number(prompt())); }
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
            function () { elem.print(this.c.get().toString()); }
          ),
          new vava.env.VavaMethod(
            'print',
            'void',
            [{identifier: 'str', vavaType: 'int'}],
            function () { elem.print(this.str.get()); }
          ),
          new vava.env.VavaMethod(
            'print',
            'void',
            [{identifier: 'str', vavaType: 'String'}],
            function () { elem.print(this.str.get().toString()); }
          ),
          new vava.env.VavaMethod(
            'println',
            'void',
            [{identifier: 'str', vavaType: 'boolean'}],
            function () { elem.print(this.str.get() + '\n'); }
          ),
          new vava.env.VavaMethod(
            'println',
            'void',
            [{identifier: 'str', vavaType: 'byte'}],
            function () { elem.print(this.str.get() + '\n'); }
          ),
          new vava.env.VavaMethod(
            'println',
            'void',
            [{identifier: 'str', vavaType: 'short'}],
            function () { elem.print(this.str.get() + '\n'); }
          ),
          new vava.env.VavaMethod(
            'println',
            'void',
            [{identifier: 'str', vavaType: 'char'}],
            function () { elem.print(this.str.get() + '\n'); }
          ),
          new vava.env.VavaMethod(
            'println',
            'void',
            [{identifier: 'str', vavaType: 'int'}],
            function () { elem.print(this.str.get() + '\n'); }
          ),
          new vava.env.VavaMethod(
            'println',
            'void',
            [{identifier: 'str', vavaType: 'long'}],
            function () { elem.print(this.str.get() + '\n'); }
          ),
          new vava.env.VavaMethod(
            'println',
            'void',
            [{identifier: 'str', vavaType: 'float'}],
            function () { elem.print(this.str.get() + '\n'); }
          ),
          new vava.env.VavaMethod(
            'println',
            'void',
            [{identifier: 'str', vavaType: 'double'}],
            function () { elem.print(this.str.get() + '\n'); }
          ),
          new vava.env.VavaMethod(
            'println',
            'void',
            [{identifier: 'str', vavaType: 'String'}],
            function () { elem.print(this.str.get() + '\n'); }
          )
        ]
      },
      new vava.scope.Scope({__env : vava.env})
    )
  } // end 'out'

};

var defaultIO = System();
System['in'] = defaultIO['in'];
System['out'] = defaultIO['out'];

