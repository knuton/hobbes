require('./extensions/es5');
require('./extensions/json');

// Based on Crockford's http://javascript.crockford.com/inheritance.html
if (!Function.prototype.inherits) {
  Function.prototype.inherits = function (parent) {
    // Use new instance of parent as prototype
    var d = {}, p = (this.prototype = new parent());
    this.prototype['uber'] = function (name) {
      if (!(name in d)) {
        d[name] = 0;
      }        
      var f, r, t = d[name], v = parent.prototype;
      if (t) {
        while (t) {
          v = v.constructor.prototype;
          t -= 1;
        }
        f = v[name];
      } else {
        f = p[name];
        if (f == this[name]) {
          f = v[name];
        }
      }
      d[name] += 1;
      r = f.apply(this, Array.prototype.slice.apply(arguments, [1]));
      d[name] -= 1;
      return r;
    };
    // copy constructor members
    for (var prop in parent) {
      if (parent.hasOwnProperty(prop)) {
        this[prop] = parent[prop];
      }
    }
    // fix constructor reference
    this.prototype.constructor = this;
    return this;
  }
}
