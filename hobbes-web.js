/**
 * hobbes.js -- a Java subset interpreter in JavaScript
 * (c) 2010 Johannes Emerich (jemerich@uos.de)
 * v0.1
 */

// TODO
//  - HTML- und CLI-Umgebungen
//  - Vernuenftige Grammatik
//  - Anschliessend Laufzeit-Umgebung nachfuegen

var hobbes = function (exports) {
  /*** require('./hobbes/extensions'); ***/
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
      return this;
    }
  }
  
  // -- kriskowal Kris Kowal Copyright (C) 2009-2010 MIT License
  // -- tlrobinson Tom Robinson
  // dantman Daniel Friesen

  /*!
      Copyright (c) 2009, 280 North Inc. http://280north.com/
      MIT License. http://github.com/280north/narwhal/blob/master/README.md
  */

  // Brings an environment as close to ECMAScript 5 compliance
  // as is possible with the facilities of erstwhile engines.

  // ES5 Draft
  // http://www.ecma-international.org/publications/files/drafts/tc39-2009-050.pdf

  // NOTE: this is a draft, and as such, the URL is subject to change.  If the
  // link is broken, check in the parent directory for the latest TC39 PDF.
  // http://www.ecma-international.org/publications/files/drafts/

  // Previous ES5 Draft
  // http://www.ecma-international.org/publications/files/drafts/tc39-2009-025.pdf
  // This is a broken link to the previous draft of ES5 on which most of the
  // numbered specification references and quotes herein were taken.  Updating
  // these references and quotes to reflect the new document would be a welcome
  // volunteer project.

  //
  // Array
  // =====
  //

  // ES5 15.4.3.2 
  if (!Array.isArray) {
      Array.isArray = function(obj) {
          return Object.prototype.toString.call(obj) == "[object Array]";
      };
  }

  // ES5 15.4.4.18
  if (!Array.prototype.forEach) {
      Array.prototype.forEach =  function(block, thisObject) {
          var len = this.length >>> 0;
          for (var i = 0; i < len; i++) {
              if (i in this) {
                  block.call(thisObject, this[i], i, this);
              }
          }
      };
  }

  // ES5 15.4.4.19
  // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/map
  if (!Array.prototype.map) {
      Array.prototype.map = function(fun /*, thisp*/) {
          var len = this.length >>> 0;
          if (typeof fun != "function")
            throw new TypeError();

          var res = new Array(len);
          var thisp = arguments[1];
          for (var i = 0; i < len; i++) {
              if (i in this)
                  res[i] = fun.call(thisp, this[i], i, this);
          }

          return res;
      };
  }

  // ES5 15.4.4.20
  if (!Array.prototype.filter) {
      Array.prototype.filter = function (block /*, thisp */) {
          var values = [];
          var thisp = arguments[1];
          for (var i = 0; i < this.length; i++)
              if (block.call(thisp, this[i]))
                  values.push(this[i]);
          return values;
      };
  }

  // ES5 15.4.4.16
  if (!Array.prototype.every) {
      Array.prototype.every = function (block /*, thisp */) {
          var thisp = arguments[1];
          for (var i = 0; i < this.length; i++)
              if (!block.call(thisp, this[i]))
                  return false;
          return true;
      };
  }

  // ES5 15.4.4.17
  if (!Array.prototype.some) {
      Array.prototype.some = function (block /*, thisp */) {
          var thisp = arguments[1];
          for (var i = 0; i < this.length; i++)
              if (block.call(thisp, this[i]))
                  return true;
          return false;
      };
  }

  // ES5 15.4.4.21
  // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduce
  if (!Array.prototype.reduce) {
      Array.prototype.reduce = function(fun /*, initial*/) {
          var len = this.length >>> 0;
          if (typeof fun != "function")
              throw new TypeError();

          // no value to return if no initial value and an empty array
          if (len == 0 && arguments.length == 1)
              throw new TypeError();

          var i = 0;
          if (arguments.length >= 2) {
              var rv = arguments[1];
          } else {
              do {
                  if (i in this) {
                      rv = this[i++];
                      break;
                  }

                  // if array contains no values, no initial value to return
                  if (++i >= len)
                      throw new TypeError();
              } while (true);
          }

          for (; i < len; i++) {
              if (i in this)
                  rv = fun.call(null, rv, this[i], i, this);
          }

          return rv;
      };
  }

  // ES5 15.4.4.22
  // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduceRight
  if (!Array.prototype.reduceRight) {
      Array.prototype.reduceRight = function(fun /*, initial*/) {
          var len = this.length >>> 0;
          if (typeof fun != "function")
              throw new TypeError();

          // no value to return if no initial value, empty array
          if (len == 0 && arguments.length == 1)
              throw new TypeError();

          var i = len - 1;
          if (arguments.length >= 2) {
              var rv = arguments[1];
          } else {
              do {
                  if (i in this) {
                      rv = this[i--];
                      break;
                  }

                  // if array contains no values, no initial value to return
                  if (--i < 0)
                      throw new TypeError();
              } while (true);
          }

          for (; i >= 0; i--) {
              if (i in this)
                  rv = fun.call(null, rv, this[i], i, this);
          }

          return rv;
      };
  }

  // ES5 15.4.4.14
  if (!Array.prototype.indexOf) {
      Array.prototype.indexOf = function (value /*, fromIndex */ ) {
          var length = this.length;
          if (!length)
              return -1;
          var i = arguments[1] || 0;
          if (i >= length)
              return -1;
          if (i < 0)
              i += length;
          for (; i < length; i++) {
              if (!Object.prototype.hasOwnProperty.call(this, i))
                  continue;
              if (value === this[i])
                  return i;
          }
          return -1;
      };
  }

  // ES5 15.4.4.15
  if (!Array.prototype.lastIndexOf) {
      Array.prototype.lastIndexOf = function (value /*, fromIndex */) {
          var length = this.length;
          if (!length)
              return -1;
          var i = arguments[1] || length;
          if (i < 0)
              i += length;
          i = Math.min(i, length - 1);
          for (; i >= 0; i--) {
              if (!Object.prototype.hasOwnProperty.call(this, i))
                  continue;
              if (value === this[i])
                  return i;
          }
          return -1;
      };
  }

  //
  // Object
  // ======
  // 

  // ES5 15.2.3.2
  if (!Object.getPrototypeOf) {
      Object.getPrototypeOf = function (object) {
          return object.__proto__;
          // or undefined if not available in this engine
      };
  }

  // ES5 15.2.3.3
  if (!Object.getOwnPropertyDescriptor) {
      Object.getOwnPropertyDescriptor = function (object) {
          return {}; // XXX
      };
  }

  // ES5 15.2.3.4
  if (!Object.getOwnPropertyNames) {
      Object.getOwnPropertyNames = function (object) {
          return Object.keys(object);
      };
  }

  // ES5 15.2.3.5 
  if (!Object.create) {
      Object.create = function(prototype, properties) {
          if (typeof prototype != "object" || prototype === null)
              throw new TypeError("typeof prototype["+(typeof prototype)+"] != 'object'");
          function Type() {};
          Type.prototype = prototype;
          var object = new Type();
          if (typeof properties !== "undefined")
              Object.defineProperties(object, properties);
          return object;
      };
  }

  // ES5 15.2.3.6
  if (!Object.defineProperty) {
      Object.defineProperty = function(object, property, descriptor) {
          var has = Object.prototype.hasOwnProperty;
          if (typeof descriptor == "object" && object.__defineGetter__) {
              if (has.call(descriptor, "value")) {
                  if (!object.__lookupGetter__(property) && !object.__lookupSetter__(property))
                      // data property defined and no pre-existing accessors
                      object[property] = descriptor.value;
                  if (has.call(descriptor, "get") || has.call(descriptor, "set"))
                      // descriptor has a value property but accessor already exists
                      throw new TypeError("Object doesn't support this action");
              }
              // fail silently if "writable", "enumerable", or "configurable"
              // are requested but not supported
              /*
              // alternate approach:
              if ( // can't implement these features; allow false but not true
                  !(has.call(descriptor, "writable") ? descriptor.writable : true) ||
                  !(has.call(descriptor, "enumerable") ? descriptor.enumerable : true) ||
                  !(has.call(descriptor, "configurable") ? descriptor.configurable : true)
              )
                  throw new RangeError(
                      "This implementation of Object.defineProperty does not " +
                      "support configurable, enumerable, or writable."
                  );
              */
              else if (typeof descriptor.get == "function")
                  object.__defineGetter__(property, descriptor.get);
              if (typeof descriptor.set == "function")
                  object.__defineSetter__(property, descriptor.set);
          }
          return object;
      };
  }

  // ES5 15.2.3.7
  if (!Object.defineProperties) {
      Object.defineProperties = function(object, properties) {
          for (var property in properties) {
              if (Object.prototype.hasOwnProperty.call(properties, property))
                  Object.defineProperty(object, property, properties[property]);
          }
          return object;
      };
  }

  // ES5 15.2.3.8
  if (!Object.seal) {
      Object.seal = function (object) {
          return object;
      };
  }

  // ES5 15.2.3.9
  if (!Object.freeze) {
      Object.freeze = function (object) {
          return object;
      };
  }

  // ES5 15.2.3.10
  if (!Object.preventExtensions) {
      Object.preventExtensions = function (object) {
          return object;
      };
  }

  // ES5 15.2.3.11
  if (!Object.isSealed) {
      Object.isSealed = function (object) {
          return false;
      };
  }

  // ES5 15.2.3.12
  if (!Object.isFrozen) {
      Object.isFrozen = function (object) {
          return false;
      };
  }

  // ES5 15.2.3.13
  if (!Object.isExtensible) {
      Object.isExtensible = function (object) {
          return true;
      };
  }

  // ES5 15.2.3.14
  if (!Object.keys) {
      Object.keys = function (object) {
          var keys = [];
          for (var name in object) {
              if (Object.prototype.hasOwnProperty.call(object, name)) {
                  keys.push(name);
              }
          }
          return keys;
      };
  }

  //
  // Date
  // ====
  //

  // ES5 15.9.5.43
  // Format a Date object as a string according to a subset of the ISO-8601 standard.
  // Useful in Atom, among other things.
  if (!Date.prototype.toISOString) {
      Date.prototype.toISOString = function() {
          return (
              this.getFullYear() + "-" +
              (this.getMonth() + 1) + "-" +
              this.getDate() + "T" +
              this.getHours() + ":" +
              this.getMinutes() + ":" +
              this.getSeconds() + "Z"
          ); 
      }
  }

  // ES5 15.9.4.4
  if (!Date.now) {
      Date.now = function () {
          return new Date().getTime();
      };
  }

  // ES5 15.9.5.44
  if (!Date.prototype.toJSON) {
      Date.prototype.toJSON = function (key) {
          // This function provides a String representation of a Date object for
          // use by JSON.stringify (15.12.3). When the toJSON method is called
          // with argument key, the following steps are taken:

          // 1.  Let O be the result of calling ToObject, giving it the this
          // value as its argument.
          // 2. Let tv be ToPrimitive(O, hint Number).
          // 3. If tv is a Number and is not finite, return null.
          // XXX
          // 4. Let toISO be the result of calling the [[Get]] internal method of
          // O with argument "toISOString".
          // 5. If IsCallable(toISO) is false, throw a TypeError exception.
          if (typeof this.toISOString != "function")
              throw new TypeError();
          // 6. Return the result of calling the [[Call]] internal method of
          // toISO with O as the this value and an empty argument list.
          return this.toISOString();

          // NOTE 1 The argument is ignored.

          // NOTE 2 The toJSON function is intentionally generic; it does not
          // require that its this value be a Date object. Therefore, it can be
          // transferred to other kinds of objects for use as a method. However,
          // it does require that any such object have a toISOString method. An
          // object is free to use the argument key to filter its
          // stringification.
      };
  }

  // 15.9.4.2 Date.parse (string)
  // 15.9.1.15 Date Time String Format
  // Date.parse
  // based on work shared by Daniel Friesen (dantman)
  // http://gist.github.com/303249
  if (isNaN(Date.parse("T00:00"))) {
      // XXX global assignment won't work in embeddings that use
      // an alternate object for the context.
      Date = (function(NativeDate) {

          // Date.length === 7
          var Date = function(Y, M, D, h, m, s, ms) {
              var length = arguments.length;
              if (this instanceof NativeDate) {
                  var date = length === 1 && String(Y) === Y ? // isString(Y)
                      // We explicitly pass it through parse:
                      new NativeDate(Date.parse(Y)) :
                      // We have to manually make calls depending on argument
                      // length here
                      length >= 7 ? new NativeDate(Y, M, D, h, m, s, ms) :
                      length >= 6 ? new NativeDate(Y, M, D, h, m, s) :
                      length >= 5 ? new NativeDate(Y, M, D, h, m) :
                      length >= 4 ? new NativeDate(Y, M, D, h) :
                      length >= 3 ? new NativeDate(Y, M, D) :
                      length >= 2 ? new NativeDate(Y, M) :
                      length >= 1 ? new NativeDate(Y) :
                                    new NativeDate();
                  // Prevent mixups with unfixed Date object
                  date.constructor = Date;
                  return date;
              }
              return NativeDate.apply(this, arguments);
          };

          // 15.9.1.15 Date Time String Format
          var isoDateExpression = new RegExp("^" +
              "(?:" + // optional year-month-day
                  "(" + // year capture
                      "(?:[+-]\\d\\d)?" + // 15.9.1.15.1 Extended years
                      "\\d\\d\\d\\d" + // four-digit year
                  ")" +
                  "(?:-" + // optional month-day
                      "(\\d\\d)" + // month capture
                      "(?:-" + // optional day
                          "(\\d\\d)" + // day capture
                      ")?" +
                  ")?" +
              ")?" + 
              "(?:T" + // hour:minute:second.subsecond
                  "(\\d\\d)" + // hour capture
                  ":(\\d\\d)" + // minute capture
                  "(?::" + // optional :second.subsecond
                      "(\\d\\d)" + // second capture
                      "(?:\\.(\\d\\d\\d))?" + // milisecond capture
                  ")?" +
              ")?" +
              "(?:" + // time zone
                  "Z|" + // UTC capture
                  "([+-])(\\d\\d):(\\d\\d)" + // timezone offset
                  // capture sign, hour, minute
              ")?" +
          "$");

          // Copy any custom methods a 3rd party library may have added
          for (var key in NativeDate)
              Date[key] = NativeDate[key];

          // Copy "native" methods explicitly; they may be non-enumerable
          Date.now = NativeDate.now;
          Date.UTC = NativeDate.UTC;
          Date.prototype = NativeDate.prototype;
          Date.prototype.constructor = Date;

          // Upgrade Date.parse to handle the ISO dates we use
          // review specification to ascertain whether it is
          // necessary to implement partial ISO date strings.
          Date.parse = function(string) {
              var match = isoDateExpression.exec(string);
              if (match) {
                  match.shift(); // kill match[0], the full match
                  // recognize times without dates before normalizing the
                  // numeric values, for later use
                  var timeOnly = match[0] === undefined;
                  // parse numerics
                  for (var i = 0; i < 10; i++) {
                      // skip + or - for the timezone offset
                      if (i === 7)
                          continue;
                      // Note: parseInt would read 0-prefix numbers as
                      // octal.  Number constructor or unary + work better
                      // here:
                      match[i] = +(match[i] || (i < 3 ? 1 : 0));
                      // match[1] is the month. Months are 0-11 in JavaScript
                      // Date objects, but 1-12 in ISO notation, so we
                      // decrement.
                      if (i === 1)
                          match[i]--;
                  }
                  // if no year-month-date is provided, return a milisecond
                  // quantity instead of a UTC date number value.
                  if (timeOnly)
                      return ((match[3] * 60 + match[4]) * 60 + match[5]) * 1000 + match[6];

                  // account for an explicit time zone offset if provided
                  var offset = (match[8] * 60 + match[9]) * 60 * 1000;
                  if (match[6] === "-")
                      offset = -offset;

                  return NativeDate.UTC.apply(this, match.slice(0, 7)) + offset;
              }
              return NativeDate.parse.apply(this, arguments);
          };

          return Date;
      })(Date);
  }

  // 
  // Function
  // ========
  // 

  // ES-5 15.3.4.5
  // http://www.ecma-international.org/publications/files/drafts/tc39-2009-025.pdf
  var slice = Array.prototype.slice;
  if (!Function.prototype.bind) {
      Function.prototype.bind = function (that) { // .length is 1
          // 1. Let Target be the this value.
          var target = this;
          // 2. If IsCallable(Target) is false, throw a TypeError exception.
          // XXX this gets pretty close, for all intents and purposes, letting 
          // some duck-types slide
          if (typeof target.apply != "function" || typeof target.call != "function")
              return new TypeError();
          // 3. Let A be a new (possibly empty) internal list of all of the
          //   argument values provided after thisArg (arg1, arg2 etc), in order.
          var args = slice.call(arguments);
          // 4. Let F be a new native ECMAScript object.
          // 9. Set the [[Prototype]] internal property of F to the standard
          //   built-in Function prototype object as specified in 15.3.3.1.
          // 10. Set the [[Call]] internal property of F as described in
          //   15.3.4.5.1.
          // 11. Set the [[Construct]] internal property of F as described in
          //   15.3.4.5.2.
          // 12. Set the [[HasInstance]] internal property of F as described in
          //   15.3.4.5.3.
          // 13. The [[Scope]] internal property of F is unused and need not
          //   exist.
          var bound = function () {

              if (this instanceof bound) {
                  // 15.3.4.5.2 [[Construct]]
                  // When the [[Construct]] internal method of a function object,
                  // F that was created using the bind function is called with a
                  // list of arguments ExtraArgs the following steps are taken:
                  // 1. Let target be the value of F's [[TargetFunction]]
                  //   internal property.
                  // 2. If target has no [[Construct]] internal method, a
                  //   TypeError exception is thrown.
                  // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
                  //   property.
                  // 4. Let args be a new list containing the same values as the
                  //   list boundArgs in the same order followed by the same
                  //   values as the list ExtraArgs in the same order.

                  var self = Object.create(target.prototype);
                  target.apply(self, args.concat(slice.call(arguments)));
                  return self;

              } else {
                  // 15.3.4.5.1 [[Call]]
                  // When the [[Call]] internal method of a function object, F,
                  // which was created using the bind function is called with a
                  // this value and a list of arguments ExtraArgs the following
                  // steps are taken:
                  // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
                  //   property.
                  // 2. Let boundThis be the value of F's [[BoundThis]] internal
                  //   property.
                  // 3. Let target be the value of F's [[TargetFunction]] internal
                  //   property.
                  // 4. Let args be a new list containing the same values as the list
                  //   boundArgs in the same order followed by the same values as
                  //   the list ExtraArgs in the same order. 5.  Return the
                  //   result of calling the [[Call]] internal method of target
                  //   providing boundThis as the this value and providing args
                  //   as the arguments.

                  // equiv: target.call(this, ...boundArgs, ...args)
                  return target.call.apply(
                      target,
                      args.concat(slice.call(arguments))
                  );

              }

          };
          // 5. Set the [[TargetFunction]] internal property of F to Target.
          // extra:
          bound.bound = target;
          // 6. Set the [[BoundThis]] internal property of F to the value of
          // thisArg.
          // extra:
          bound.boundTo = that;
          // 7. Set the [[BoundArgs]] internal property of F to A.
          // extra:
          bound.boundArgs = args;
          bound.length = (
              // 14. If the [[Class]] internal property of Target is "Function", then
              typeof target == "function" ?
              // a. Let L be the length property of Target minus the length of A.
              // b. Set the length own property of F to either 0 or L, whichever is larger.
              Math.max(target.length - args.length, 0) :
              // 15. Else set the length own property of F to 0.
              0
          )
          // 16. The length own property of F is given attributes as specified in
          //   15.3.5.1.
          // 17. Set the [[Extensible]] internal property of F to true.
          // 18. Call the [[DefineOwnProperty]] internal method of F with
          //   arguments "caller", PropertyDescriptor {[[Value]]: null,
          //   [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]:
          //   false}, and false.
          // 19. Call the [[DefineOwnProperty]] internal method of F with
          //   arguments "arguments", PropertyDescriptor {[[Value]]: null,
          //   [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]:
          //   false}, and false.
          // NOTE Function objects created using Function.prototype.bind do not
          // have a prototype property.
          // XXX can't delete it in pure-js.
          return bound;
      };
  }

  //
  // String
  // ======
  //

  // ES5 15.5.4.20
  if (!String.prototype.trim) {
      // http://blog.stevenlevithan.com/archives/faster-trim-javascript
      var trimBeginRegexp = /^\s\s*/;
      var trimEndRegexp = /\s\s*$/;
      String.prototype.trim = function () {
          return String(this).replace(trimBeginRegexp, '').replace(trimEndRegexp, '');
      };
  }
  /*
      http://www.JSON.org/json2.js
      2008-11-19

      Public Domain.

      NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

      See http://www.JSON.org/js.html

      This file creates a global JSON object containing two methods: stringify
      and parse.

          JSON.stringify(value, replacer, space)
              value       any JavaScript value, usually an object or array.

              replacer    an optional parameter that determines how object
                          values are stringified for objects. It can be a
                          function or an array of strings.

              space       an optional parameter that specifies the indentation
                          of nested structures. If it is omitted, the text will
                          be packed without extra whitespace. If it is a number,
                          it will specify the number of spaces to indent at each
                          level. If it is a string (such as '\t' or '&nbsp;'),
                          it contains the characters used to indent at each level.

              This method produces a JSON text from a JavaScript value.

              When an object value is found, if the object contains a toJSON
              method, its toJSON method will be called and the result will be
              stringified. A toJSON method does not serialize: it returns the
              value represented by the name/value pair that should be serialized,
              or undefined if nothing should be serialized. The toJSON method
              will be passed the key associated with the value, and this will be
              bound to the object holding the key.

              For example, this would serialize Dates as ISO strings.

                  Date.prototype.toJSON = function (key) {
                      function f(n) {
                          // Format integers to have at least two digits.
                          return n < 10 ? '0' + n : n;
                      }

                      return this.getUTCFullYear()   + '-' +
                           f(this.getUTCMonth() + 1) + '-' +
                           f(this.getUTCDate())      + 'T' +
                           f(this.getUTCHours())     + ':' +
                           f(this.getUTCMinutes())   + ':' +
                           f(this.getUTCSeconds())   + 'Z';
                  };

              You can provide an optional replacer method. It will be passed the
              key and value of each member, with this bound to the containing
              object. The value that is returned from your method will be
              serialized. If your method returns undefined, then the member will
              be excluded from the serialization.

              If the replacer parameter is an array of strings, then it will be
              used to select the members to be serialized. It filters the results
              such that only members with keys listed in the replacer array are
              stringified.

              Values that do not have JSON representations, such as undefined or
              functions, will not be serialized. Such values in objects will be
              dropped; in arrays they will be replaced with null. You can use
              a replacer function to replace those with JSON values.
              JSON.stringify(undefined) returns undefined.

              The optional space parameter produces a stringification of the
              value that is filled with line breaks and indentation to make it
              easier to read.

              If the space parameter is a non-empty string, then that string will
              be used for indentation. If the space parameter is a number, then
              the indentation will be that many spaces.

              Example:

              text = JSON.stringify(['e', {pluribus: 'unum'}]);
              // text is '["e",{"pluribus":"unum"}]'


              text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
              // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

              text = JSON.stringify([new Date()], function (key, value) {
                  return this[key] instanceof Date ?
                      'Date(' + this[key] + ')' : value;
              });
              // text is '["Date(---current time---)"]'


          JSON.parse(text, reviver)
              This method parses a JSON text to produce an object or array.
              It can throw a SyntaxError exception.

              The optional reviver parameter is a function that can filter and
              transform the results. It receives each of the keys and values,
              and its return value is used instead of the original value.
              If it returns what it received, then the structure is not modified.
              If it returns undefined then the member is deleted.

              Example:

              // Parse the text. Values that look like ISO date strings will
              // be converted to Date objects.

              myData = JSON.parse(text, function (key, value) {
                  var a;
                  if (typeof value === 'string') {
                      a =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                      if (a) {
                          return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                              +a[5], +a[6]));
                      }
                  }
                  return value;
              });

              myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                  var d;
                  if (typeof value === 'string' &&
                          value.slice(0, 5) === 'Date(' &&
                          value.slice(-1) === ')') {
                      d = new Date(value.slice(5, -1));
                      if (d) {
                          return d;
                      }
                  }
                  return value;
              });


      This is a reference implementation. You are free to copy, modify, or
      redistribute.

      This code should be minified before deployment.
      See http://javascript.crockford.com/jsmin.html

      USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
      NOT CONTROL.
  */

  /*jslint evil: true */

  /*global JSON */

  /*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
      call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
      getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
      lastIndex, length, parse, prototype, push, replace, slice, stringify,
      test, toJSON, toString, valueOf
  */

  // Create a JSON object only if one does not already exist. We create the
  // methods in a closure to avoid creating global variables.

  var JSON = this.JSON = typeof exports == "undefined" ? {} : exports;

  (function () {

      function f(n) {
          // Format integers to have at least two digits.
          return n < 10 ? '0' + n : n;
      }

      if (typeof Date.prototype.toJSON !== 'function') {

          Date.prototype.toJSON = function (key) {

              return this.getUTCFullYear()   + '-' +
                   f(this.getUTCMonth() + 1) + '-' +
                   f(this.getUTCDate())      + 'T' +
                   f(this.getUTCHours())     + ':' +
                   f(this.getUTCMinutes())   + ':' +
                   f(this.getUTCSeconds())   + 'Z';
          };

          String.prototype.toJSON =
          Number.prototype.toJSON =
          Boolean.prototype.toJSON = function (key) {
              return this.valueOf();
          };
      }

      var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
          escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
          gap,
          indent,
          meta = {    // table of character substitutions
              '\b': '\\b',
              '\t': '\\t',
              '\n': '\\n',
              '\f': '\\f',
              '\r': '\\r',
              '"' : '\\"',
              '\\': '\\\\'
          },
          rep;


      function quote(string) {

  // If the string contains no control characters, no quote characters, and no
  // backslash characters, then we can safely slap some quotes around it.
  // Otherwise we must also replace the offending characters with safe escape
  // sequences.

          escapable.lastIndex = 0;
          return escapable.test(string) ?
              '"' + string.replace(escapable, function (a) {
                  var c = meta[a];
                  return typeof c === 'string' ? c :
                      '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
              }) + '"' :
              '"' + string + '"';
      }


      function str(key, holder) {

  // Produce a string from holder[key].

          var i,          // The loop counter.
              k,          // The member key.
              v,          // The member value.
              length,
              mind = gap,
              partial,
              value = holder[key];

  // If the value has a toJSON method, call it to obtain a replacement value.

          if (value && typeof value === 'object' &&
                  typeof value.toJSON === 'function') {
              value = value.toJSON(key);
          }

  // If we were called with a replacer function, then call the replacer to
  // obtain a replacement value.

          if (typeof rep === 'function') {
              value = rep.call(holder, key, value);
          }

  // What happens next depends on the value's type.

          switch (typeof value) {
          case 'string':
              return quote(value);

          case 'number':

  // JSON numbers must be finite. Encode non-finite numbers as null.

              return isFinite(value) ? String(value) : 'null';

          case 'boolean':
          case 'null':

  // If the value is a boolean or null, convert it to a string. Note:
  // typeof null does not produce 'null'. The case is included here in
  // the remote chance that this gets fixed someday.

              return String(value);

  // If the type is 'object', we might be dealing with an object or an array or
  // null.

          case 'object':

  // Due to a specification blunder in ECMAScript, typeof null is 'object',
  // so watch out for that case.

              if (!value) {
                  return 'null';
              }

  // Make an array to hold the partial results of stringifying this object value.

              gap += indent;
              partial = [];

  // Is the value an array?

              if (Object.prototype.toString.apply(value) === '[object Array]') {

  // The value is an array. Stringify every element. Use null as a placeholder
  // for non-JSON values.

                  length = value.length;
                  for (i = 0; i < length; i += 1) {
                      partial[i] = str(i, value) || 'null';
                  }

  // Join all of the elements together, separated with commas, and wrap them in
  // brackets.

                  v = partial.length === 0 ? '[]' :
                      gap ? '[\n' + gap +
                              partial.join(',\n' + gap) + '\n' +
                                  mind + ']' :
                            '[' + partial.join(',') + ']';
                  gap = mind;
                  return v;
              }

  // If the replacer is an array, use it to select the members to be stringified.

              if (rep && typeof rep === 'object') {
                  length = rep.length;
                  for (i = 0; i < length; i += 1) {
                      k = rep[i];
                      if (typeof k === 'string') {
                          v = str(k, value);
                          if (v) {
                              partial.push(quote(k) + (gap ? ': ' : ':') + v);
                          }
                      }
                  }
              } else {

  // Otherwise, iterate through all of the keys in the object.

                  for (k in value) {
                      if (Object.hasOwnProperty.call(value, k)) {
                          v = str(k, value);
                          if (v) {
                              partial.push(quote(k) + (gap ? ': ' : ':') + v);
                          }
                      }
                  }
              }

  // Join all of the member texts together, separated with commas,
  // and wrap them in braces.

              v = partial.length === 0 ? '{}' :
                  gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                          mind + '}' : '{' + partial.join(',') + '}';
              gap = mind;
              return v;
          }
      }

  // If the JSON object does not yet have a stringify method, give it one.

      if (typeof JSON.stringify !== 'function') {
          JSON.stringify = function (value, replacer, space) {

  // The stringify method takes a value and an optional replacer, and an optional
  // space parameter, and returns a JSON text. The replacer can be a function
  // that can replace values, or an array of strings that will select the keys.
  // A default replacer method can be provided. Use of the space parameter can
  // produce text that is more easily readable.

              var i;
              gap = '';
              indent = '';

  // If the space parameter is a number, make an indent string containing that
  // many spaces.

              if (typeof space === 'number') {
                  for (i = 0; i < space; i += 1) {
                      indent += ' ';
                  }

  // If the space parameter is a string, it will be used as the indent string.

              } else if (typeof space === 'string') {
                  indent = space;
              }

  // If there is a replacer, it must be a function or an array.
  // Otherwise, throw an error.

              rep = replacer;
              if (replacer && typeof replacer !== 'function' &&
                      (typeof replacer !== 'object' ||
                       typeof replacer.length !== 'number')) {
                  throw new Error('JSON.stringify');
              }

  // Make a fake root object containing our value under the key of ''.
  // Return the result of stringifying the value.

              return str('', {'': value});
          };
      }


  // If the JSON object does not yet have a parse method, give it one.

      if (typeof JSON.parse !== 'function') {
          JSON.parse = function (text, reviver) {

  // The parse method takes a text and an optional reviver function, and returns
  // a JavaScript value if the text is a valid JSON text.

              var j;

              function walk(holder, key) {

  // The walk method is used to recursively walk the resulting structure so
  // that modifications can be made.

                  var k, v, value = holder[key];
                  if (value && typeof value === 'object') {
                      for (k in value) {
                          if (Object.hasOwnProperty.call(value, k)) {
                              v = walk(value, k);
                              if (v !== undefined) {
                                  value[k] = v;
                              } else {
                                  delete value[k];
                              }
                          }
                      }
                  }
                  return reviver.call(holder, key, value);
              }


  // Parsing happens in four stages. In the first stage, we replace certain
  // Unicode characters with escape sequences. JavaScript handles many characters
  // incorrectly, either silently deleting them, or treating them as line endings.

              cx.lastIndex = 0;
              if (cx.test(text)) {
                  text = text.replace(cx, function (a) {
                      return '\\u' +
                          ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                  });
              }

  // In the second stage, we run the text against regular expressions that look
  // for non-JSON patterns. We are especially concerned with '()' and 'new'
  // because they can cause invocation, and '=' because it can cause mutation.
  // But just to be safe, we want to reject all unexpected forms.

  // We split the second stage into 4 regexp operations in order to work around
  // crippling inefficiencies in IE's and Safari's regexp engines. First we
  // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
  // replace all simple value tokens with ']' characters. Third, we delete all
  // open brackets that follow a colon or comma or that begin the text. Finally,
  // we look to see that the remaining characters are only whitespace or ']' or
  // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

              if (/^[\],:{}\s]*$/.
  test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
  replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
  replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

  // In the third stage we use the eval function to compile the text into a
  // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
  // in JavaScript: it can begin a block or an object literal. We wrap the text
  // in parens to eliminate the ambiguity.

                  j = eval('(' + text + ')');

  // In the optional fourth stage, we recursively walk the new structure, passing
  // each name/value pair to a reviver function for possible transformation.

                  return typeof reviver === 'function' ?
                      walk({'': j}, '') : j;
              }

  // If the text is not JSON parseable, then a SyntaxError is thrown.

              throw new SyntaxError('JSON.parse');
          };
      }
  })();

  /** 
   * Serialize an object to a JSON string. 
   */
  JSON.encode = JSON.stringify;

  /**
   * Deserialize an object from a JSON string.
   */
  JSON.decode = JSON.parse;
  
  
  var hobbes = exports;
  exports.version = '0.1';
  
  /*** exports.utils = require('./hobbes/utils'); ***/
  exports.utils = function (exports) {
    /**
     * Contains a collection of utils to use all around hobbes.
     *
     * Johannes Emerich <johannes@emerich.de>
     * MIT Licensed
     */

    /**
     * @constructor
     * Creates an interface to check objects for its implementation.
     *
     * @param {string} name The interface's name
     * @param {string} *methods The names of the methods required to be implemented
     */
    var Interface = exports.Interface = function(name) {
      if (arguments.length < 2) {
        throw new Error('Interface constructor expected at least 2 arguments, but got ' + arguments.length + '.');
      }
      if (typeof name !== 'string') {
        throw new TypeError('Interface constructor expected interface name.');
      }

      this.name = name;
      this.methods = [];
      for (var i = 1, len = arguments.length; i < len; i++) {
        if (typeof arguments[i] !== 'string') {
          throw new Error('Interface constructor expects method names as strings.');
        }
        this.methods.push(arguments[i]);
      }
    };

    /**
     * Checks whether the passed object implements this interface.
     *
     * @param object Object to check
     */
    Interface.prototype.check = function (object) {
      if (!object) {
        throw new Error("Expected an object to check.");
      }

      for (var i = 0; i < this.methods.length; i++) {
        var method = this.methods[i];
        if (!object[method] || typeof object[method] !== 'function') {
          throw new Error(object + ' does not implement interface `' + this.name + '`. Method `' + method + '` is missing.');
        }
      }
    };

    /**
     * Checks whether the passed object implements all the interfaces
     *
     * @param object Object to check
     * @param {Interface} *interfaces Zero or more Interface objects
     */
    Interface.check = function (object) {
      if (!object) {
        throw new Error("Expected an object to check.");
      }

      for (var i = 1; i < arguments.length; i++) {
        arguments[i].check(object);
      }
    };

    /**
     * Tests a given argument for its array-ish-ness.
     *
     * Based on Crockford's typeOf fn.
     *
     * @param value Value to test
     * @returns `true` if is array, `false` otherwise
     */
    var isArray = exports.isArray = function (value) {
      return typeof value === 'object' &&
        typeof value.length === 'number' &&
        !(value.propertyIsEnumerable('length')) &&
        typeof value.splice === 'function';
    };

    /**
     * Returns a string containing number-many spaces.
     *
     * @param {number} number Number of spaces
     * @returns ' '*number
     */
    var indentSpaces = exports.indentSpaces = function (number) {
      if (typeof number !== 'number' || number < 0) {
        throw new TypeError('indent expected a positive number.');
      }

      var spaces = '';
      for (var i = 0; i < number; i++) {
        spaces += ' ';
      }
      return spaces;
    };

    /**
     * Indents a string by number-many spaces.
     *
     * @param str The string to indent
     * @param num The number of spaces to use
     */
    var indent = exports.indent = function (str, num) {
      return indentSpaces(num || 0) + str;
    };

    /**
     * Merges a number of objects.
     */
    var merge = exports.merge = function () {
      var result = {},
          length = arguments.length,
          object = null,
          key    = null;

      // If argument is array, merge contents of array for convenience
      if (Array.isArray(arguments[0])) {
        return arguments.callee.apply(null, arguments[0]);
      }
      // If first argument is not an object, something is fishy
      if (typeof arguments[0] !== "object") {
        throw new TypeError("Expected objects to merge, got " + typeof arguments[0] + ".");
      }

      for (var i = 0; i < length; i++) {
        object = arguments[i];
        for (var key in object) {
          if (!object.hasOwnProperty(key)) { continue; }
          result[key] = object[key];
        }
      }
      return result;
    };

    exports.builder = function (exports) {
      /**
       * Contains a collection of code building helpers to generate strings of
       * JavaScript source.
       */

      /**
       * Builds a string of variable declaration.
       *
       * @param identifierStr Variable identifier
       * @semicolonInsertion `true` to insert semicolon at line end (default: true)
       */
      var declaration = exports.declaration = function (identifierStr, semicolonInsertion) {
        return semicolize(['var', identifierStr].join(' '), semicolonInsertion);
      };

      /**
       * Builds a string of variable declaration and assignment.
       *
       * @param identifierStr Variable identifier
       * @param expressionStr Variable value
       * @semicolonInsertion `true` to insert semicolon at line end (default: true)
       */
      var declarationAssignment = exports.declarationAssignment = function (identifierStr, expressionStr, semicolonInsertion) {
        return semicolize([declaration(identifierStr, false), '=', expressionStr].join(' '), semicolonInsertion);
      };

      /*** FUNCTIONS ***/

      /**
       * Wraps a string of expressions or an array of these as a function.
       *
       * @param code The string of expressions or array of strings of expressions
       */
      var wrapAsFunction = exports.wrapAsFunction = function (code) {
        code = Array.isArray(code) ? code : [code];
        return 'function () {\n' + code.join('\n') + '\n}';
      };


      /**
       * Builds a string for a function call.
       *
       * @param identifierStr Function identifier
       * @param fnArgs Array of arguments to the function
       * @semicolonInsertion `true` to insert semicolon at line end (default: true)
       */
      var functionCall = exports.functionCall = function (identifierStr, fnArgs, semicolonInsertion) {
        fnArgs = fnArgs || [];
        return semicolize([identifierStr, '(', fnArgs.join(', '), ')'].join(''), semicolonInsertion);
      };

      /**
       * Builds a string for a constructor call.
       *
       * @param identifierStr Constructor identifier
       * @param fnArgs Array of arguments to the constructor
       * @semicolonInsertion `true` to insert semicolon at line end (default: true)
       */
      var constructorCall = exports.constructorCall = function (identifierStr, fnArgs, semicolonInsertion) {
        return ['new', functionCall(identifierStr, fnArgs, semicolonInsertion)].join(' ');
      };

      /*** ADDING TO SCOPE ***/
      var addPairToScope = exports.addPairToScope = function (key, value, semicolonInsertion) {
        return semicolize('this.__add({' + key + ':' + value + '})', semicolonInsertion);
      };

      /*** ARRAYS ***/

      /**
       * Builds a string for an array.
       *
       * @param array The array
       */
      var array = exports.array = function (array) {
        return '[' + array.join(',') + ']';
      };

      /*** OBJECTS ***/

      /**
       * Builds a pair of key and value for object literals.
       *
       * @param key The key
       * @param value The value
       */
      var keyValue = exports.keyValue = function (key, value) {
        return key + ':' + value;
      };

      /**
       * Builds an object literal string from strings of the form "key:value" and "keyA:value,keyB:value".
       */
      var joinToObject = exports.joinToObject = function () {
        if (Array.isArray(arguments[0])) {
          pairs = arguments[0];
        } else {
          if (typeof arguments[0] !== "string") throw new TypeError("Expected strings to join to object.");
          pairs = Array.prototype.slice.call(arguments);
        }

        return '{' + pairs.join(',') + '}';
      };

      /**
       * Builds an object literal string from an actual object using JSON.stringify.
       *
       * @param object The object to stringify
      */
      var objectToLiteral = exports.objectToLiteral = function (object) {
        return JSON.stringify(object);
      };


      /*** PRIMITIVES ***/

      /**
       * Wraps a string in doublequotes to make it a string in source code.
       *
       * @param string The string to wrap
       */
      var string = exports.string = function (string) {
        return '"' + string + '"';
      };

      /* Helpers' helpers */
      var semicolize = function (str, yesOrNo) {
        return typeof yesOrNo === 'undefined' || yesOrNo ? str + ';' : str;
      };
      
      return exports;
      
    }({});

    exports.yyUtils = {
      merge: merge
    };
    
    return exports;
    
  }({});
  
  /*** exports.vava = require('./hobbes/vava'); ***/
  exports.vava = function (exports) {
    /*** var vavaClass = require('./vava/class'); ***/
    var vavaClass = function (exports) {
      var VavaClass = exports.VavaClass = function (vavaClassName, vavaClassDefinition, scope) {

        this.vavaClassName = vavaClassName;
        this.scope = scope.__descend(vavaClassDefinition.fields);
        this.scope.__class = this;
        this.vavaMethods = vavaClassDefinition.methods || [];

        setModifiers(this, vavaClassDefinition.vavaModifiers);

      };


      /**
       * Sends the class a message to call its method of the provided name.
       *
       * @param methodName Name of the method to call
       * @param params Parameters to pass
       */
      VavaClass.prototype.send = function (methodName, params) {
        return this.vavaMethods[methodName].call(this.scope, params);
      };

      function setModifiers (classInstance, modifierOptions) {
        modifierOptions = modifierOptions || {};
        classInstance.vavaVisibility = modifierOptions.vavaVisibility || 'default';
      }
      
      return exports;
      
    }({});
    /*** var vavaMethod = require('./vava/method'); ***/
    var vavaMethod = function (exports) {
      /**
       * Creates a VavaMethod object.
       *
       * @param vavaMethodName The name of the method
       * @param vavaFormalParameters An array containing dictionaries of name and type of the formal parameters
       * @param vavaBlock A function to be called when the method gets called
       *
       *   new VavaMethod('main', int, [{identifier:'foo',vavaType:'int'}], function (foo) {return 1;})
       */
       // TODO modifiers
      var VavaMethod = exports.VavaMethod = function (vavaMethodName, vavaReturnType, vavaFormalParameters, vavaBlock) {

        this.vavaMethodName = vavaMethodName;
        this.vavaReturnType = vavaReturnType;
        this.vavaFormalParameters = vavaFormalParameters;
        this.vavaBlock = vavaBlock;

      };

      /**
       * Calls its block after checking type validity of arguments.
       *
       * @param args Array of parameters
       */
      VavaMethod.prototype.call = function (scope, args) {

        var locals = {};

        for (var i = 0; i < this.vavaFormalParameters.length; i++) {
          if (args[i].getVavaType() !== this.vavaFormalParameters[i].vavaType) {
            // TODO Throw Java-style error
          }
          locals[this.vavaFormalParameters[i].identifier] = args[i];
        }
        // TODO Check return type?
        return this.vavaBlock.apply(scope.__descend(locals));

      };
      
      return exports;
      
    }({});
    /*** var vavaType = require('./vava/type'); ***/
    var vavaType = function (exports) {
      /**
       * Defines objects handling type in the runtime environment.
       */

      var utils = (typeof hobbes !== 'undefined' && hobbes.utils);

      /**
       * @constructor
       * Creates a typed variable, possessing name, type and value.
       *
       * @param vavaType The variable's type
       * @param identifier The variable's name
       * @param typedValue The variable's value (optional)
       */
      var TypedVariable = exports.TypedVariable = function (vavaType, identifier, typedValue) {

        this.vavaType = vavaType;
        this.identifier = identifier;

        this.set(typedValue || this.defaultValue());

      };

      /**
       * Returns the Vava type of the variable.
       */
      TypedVariable.prototype.getVavaType = function () {
        return this.vavaType;
      };

      /**
       * Returns the default value for the variable's Vava type.
       */
      TypedVariable.prototype.defaultValue = function () {
        return TypedValue.defaults[this.vavaType] || new NullValue();
      };

      /**
       * Sets the typed value of the variable.
       * @throws Error for wrong type
       */
      TypedVariable.prototype.set = function (typedValue) {

        if (this.isAssignmentCompatible(typedValue)) {
          this.typedValue = typedValue;
        } else {
          // TODO How to handle Vava errors?
          throw new Error("Vava Type error: Expected " + this.getVavaType() + ", but was " + typedValue.getVavaType() + ".");
        }

      };

      /**
       * Checks if variable is of native type.
       *
       * That is, whether it is one of {boolean, byte, short, int, long, char, float, double}.
       */
      TypedVariable.prototype.isPrimitive = function () {
        var vT = this.getVavaType();
        return (vT === "boolean" || vT === "byte" || vT === "short" || vT === "int" || vT === "long" || vT === "char" || vT === "float" || vT === "double");
      }

      /**
       * Checks for compatibility of own and provided type.
       *
       * TODO Autocasting for natives
       * TODO Hierarchical compatibility for reference types
       */
      TypedVariable.prototype.isAssignmentCompatible = function (typedValue) {

        if (this.isPrimitive()) {
          return typedValue.getVavaType() === this.getVavaType();
        } else {
          var vavaType = typedValue.getVavaType();
          return (vavaType === "null" || vavaType === this.getVavaType());
        }
      };

      /**
       * Returns the typed value.
       */
      TypedVariable.prototype.get = function () {
        return this.typedValue;
      };

      var TypedValueInterface = exports.TypedValueInterface = new utils.Interface('TypedValue', 'get', 'getVavaType');

      /**
       * @constructor
       * Creates a typed value, consisting of type and value.
       *
       * Sets its value to the default (`null` for reference types, varied for
       * primitive types) if no value is given.
       * @param vavaType The type
       * @param value The value
       */
      var TypedValue = exports.TypedValue = function (vavaType, value) {

        this.vavaType = vavaType;

        if (value) {
          this.rawValue = value;
        }

      };

      TypedValue.prototype.getVavaType = function () {
        return this.vavaType;
      };

      TypedValue.prototype.get = function () {
        return this.rawValue;
      };

      // NATIVE TYPES

      // TODO Document and Test!
      var BooleanValue = exports.BooleanValue = function (rawValue) {

        this.vavaType = 'boolean';

        if (rawValue) {
          if (rawValue !== true && rawValue !== false) {
            throw new Error('Expected JavaScript boolean');
          }
          this.rawValue = rawValue;
        } else {
          this.rawValue = false;
        }

      };

      BooleanValue.inherits(TypedValue);

      BooleanValue.stored = {};

      /**
       * Used to intern BooleanValues for efficiency and object identity.
       *
       * Looks up the existing object for true/false and creates one if none is
       * present. The object is then returned.
       *
       * @param bool The boolean value to lookup/insert
       */
      BooleanValue.intern = function (bool) {
        if (this.stored[bool])
          return this.stored[bool];
        else
          return this.stored[bool] = new this(bool);
      };

      // LOGICAL OPERATIONS
      BooleanValue.prototype.not = function () {
        return BooleanValue[String(!this.get())];
      };

      BooleanValue.prototype.and = function (other) {
        return BooleanValue[String(this.get() && other.get())];
      };

      BooleanValue.prototype.or = function (other) {
        return BooleanValue[String(this.get() || other.get())];
      };

      BooleanValue['true'] = new BooleanValue(true);
      BooleanValue['false'] = new BooleanValue(false);

      // TODO how to handle inheritance here?
      var IntegralValue = function (rawValue) {

        this.vavaType = 'int';

        if (rawValue) {
          // TODO More precise testing of value
          // Next step: Add this to AST -> compile -> test with Java src files
          if (isNaN(rawValue)) {
            throw new Error('Not a number!');
          }
          this.rawValue = rawValue;
        } else {
          this.rawValue = 0;
        }

      }

      IntegralValue.inherits(TypedValue);

      // ARITHMETIC
      IntegralValue.prototype.inverse = function () {
        return IntValue.intern(this.get() * -1);
      };

      IntegralValue.prototype.add = function (other) {
        return IntValue.intern(this.toInt().get() + other.toInt().get());
      };

      IntegralValue.prototype.subtract = function (other) {
        return this.add(other.inverse());
      };

      IntegralValue.prototype.times = function (other) {
        return IntValue.intern(this.toInt().get() * other.toInt().get());
      };

      IntegralValue.prototype.divide = function (other) {
        var thisRaw = this.toInt().get(),
            otherRaw = other.toInt().get();
        var remainder = thisRaw % otherRaw;
        return IntValue.intern((thisRaw - remainder) / otherRaw);
      };

      IntegralValue.prototype.modulo = function (other) {
        return IntValue.intern(this.toInt().get() % other.toInt().get());
      };

      // TODO Overflow of long type
      IntegralValue.prototype.toInt = function () {
        return IntValue.intern(this.get());
      };

      var IntValue = exports.IntValue = function (rawValue) {

        this.vavaType = 'int';

        if (rawValue) {
          // TODO More precise testing of value
          // Next step: Add this to AST -> compile -> test with Java src files
          if (isNaN(rawValue)) {
            throw new Error('Not a number!');
          }
          this.rawValue = rawValue;
        } else {
          this.rawValue = 0;
        }

      }

      IntValue.inherits(IntegralValue);

      IntValue.stored = {};

      /**
       * Used to intern IntValues for efficiency and object identity.
       *
       * Looks up the existing object for a given number and creates one if none is
       * present. The object is then returned.
       *
       * @param number The number to lookup/insert
       */
      IntValue.intern = function (number) {
        if (this.stored[number])
          return this.stored[number];
        else
          return this.stored[number] = new this(number);
      };

      var StringValue = exports.StringValue = function (rawValue) {

        this.vavaType = 'String';

        if (rawValue) {
          if (typeof rawValue !== 'string') {
            throw new Error('Expected JavaScript string');
          }
          this.rawValue = rawValue;
        } else {
          this.rawValue = '';
        }

      };

      StringValue.inherits(TypedValue);

      StringValue.prototype.add = function (other) {
        return new StringValue(this.get() + other.get());
      };

      // Reference Types
      var NullValue = exports.NullValue = function () {
        this.vavaType = 'null';

        this.rawValue = null;
      }

      NullValue.inherits(TypedValue);

      //// NEEDS TO BE AT THE END
      // Lookup table for constructors for simple (?) types
      TypedValue.defaults = {
        "boolean" : BooleanValue.intern(false),
        "int" : IntValue.intern(0)
      };
      
      return exports;
      
    }({});

    /*** exports.scope = require('./vava/scope'); ***/
    exports.scope = function (exports) {
      var Scope = exports.Scope = function (initialize) {
        if (typeof initialize === "object") {
          for (key in initialize)
            this[key] = initialize[key];
        };
      };

      Scope.prototype.__add = function (namesValues) {
        if (typeof namesValues === "object") {
          for (key in namesValues)
            this[key] = namesValues[key];
        };
        return this;
      };

      Scope.prototype.__descend = function (namesValues) {
        var Scoper = function () {};
        Scoper.prototype = this;
        var newScope = new Scoper();
        return newScope.__add(namesValues);
      };
      
      return exports;
      
    }({});

    exports.env = {
      VavaClass  : vavaClass.VavaClass,
      VavaMethod : vavaMethod.VavaMethod,
      TypedVariable : vavaType.TypedVariable,
      BooleanValue : vavaType.BooleanValue,
      IntValue   : vavaType.IntValue,
      StringValue : vavaType.StringValue
    }
    
    return exports;
    
  }({});

  /*** exports.compiler = require('./hobbes/compiler'); ***/
  exports.compiler = function (exports) {
    var utils = (typeof hobbes !== 'undefined' && hobbes.utils);
    var vava = (typeof hobbes !== 'undefined' && hobbes.vava);
    /*** var parser = exports.parser = require('./compiler/parser').parser; ***/
    var parser = exports.parser = function (exports) {
      /* Jison generated parser */
      var vava_proper = (function(){
      var parser = {trace: function trace() { },
      yy: {},
      symbols_: {"error":2,"compilation_unit":3,"EOF":4,"package_declaration":5,"import_declarations":6,"type_declarations":7,"KEYWORD_PACKAGE":8,"IDENTIFIER":9,"LINE_TERMINATOR":10,"import_declaration":11,"KEYWORD_IMPORT":12,"name":13,"type_declaration":14,"class_declaration":15,"KEYWORD_CLASS":16,"class_body":17,"MODIFIER_PUBLIC":18,"EMBRACE":19,"class_body_declarations":20,"UNBRACE":21,"class_body_declaration":22,"class_member_declaration":23,"field_declaration":24,"method_declaration":25,"type":26,"variable_declarators":27,"method_header":28,"method_body":29,"method_declarator":30,"MODIFIER_STATIC":31,"MODIFIER_VOID":32,"LEFT_PAREN":33,"formal_parameter_list":34,"RIGHT_PAREN":35,"formal_parameter":36,"formal_parameters":37,"COMMA":38,"variable_declarator_id":39,"block":40,"variable_declarator":41,"OPERATOR_ASSIGNMENT":42,"variable_initializer":43,"expression":44,"primitive_type":45,"numeric_type":46,"PRIMITIVE_BOOLEAN":47,"integral_type":48,"floating_point_type":49,"PRIMITIVE_INTEGER":50,"PRIMITIVE_FLOAT":51,"block_statements":52,"block_statement":53,"local_variable_declaration_statement":54,"statement":55,"local_variable_declaration":56,"statement_without_trailing_substatement":57,"if_then_else_statement":58,"if_then_statement":59,"while_statement":60,"empty_statement":61,"expression_statement":62,"KEYWORD_IF":63,"statement_no_short_if":64,"KEYWORD_ELSE":65,"labeled_statement_no_short_if":66,"if_then_else_statement_no_short_if":67,"while_statement_no_short_if":68,"for_statement_no_short_if":69,"KEYWORD_WHILE":70,"statement_expression":71,"assignment":72,"method_invocation":73,"simple_name":74,"qualified_name":75,"SEPARATOR_DOT":76,"left_hand_side":77,"conditional_expression":78,"assignment_expression":79,"conditional_or_expression":80,"conditional_and_expression":81,"inclusive_or_expression":82,"exclusive_or_expression":83,"and_expression":84,"equality_expression":85,"relational_expression":86,"OPERATOR_EQUAL":87,"OPERATOR_NOT_EQUAL":88,"shift_expression":89,"additive_expression":90,"multiplicative_expression":91,"OPERATOR_ADDITION":92,"OPERATOR_SUBTRACTION":93,"unary_expression":94,"OPERATOR_MULTIPLICATION":95,"OPERATOR_DIVISON":96,"OPERATOR_MODULO":97,"postfix_expression":98,"primary":99,"literal":100,"boolean_literal":101,"integer_literal":102,"string_literal":103,"argument_list":104,"TRUE_LITERAL":105,"FALSE_LITERAL":106,"DECIMAL_INTEGER_LITERAL":107,"STRING_LITERAL":108,"$accept":0,"$end":1},
      terminals_: {2:"error",4:"EOF",8:"KEYWORD_PACKAGE",9:"IDENTIFIER",10:"LINE_TERMINATOR",12:"KEYWORD_IMPORT",16:"KEYWORD_CLASS",18:"MODIFIER_PUBLIC",19:"EMBRACE",21:"UNBRACE",31:"MODIFIER_STATIC",32:"MODIFIER_VOID",33:"LEFT_PAREN",35:"RIGHT_PAREN",37:"formal_parameters",38:"COMMA",42:"OPERATOR_ASSIGNMENT",47:"PRIMITIVE_BOOLEAN",50:"PRIMITIVE_INTEGER",51:"PRIMITIVE_FLOAT",63:"KEYWORD_IF",65:"KEYWORD_ELSE",66:"labeled_statement_no_short_if",67:"if_then_else_statement_no_short_if",68:"while_statement_no_short_if",69:"for_statement_no_short_if",70:"KEYWORD_WHILE",76:"SEPARATOR_DOT",87:"OPERATOR_EQUAL",88:"OPERATOR_NOT_EQUAL",92:"OPERATOR_ADDITION",93:"OPERATOR_SUBTRACTION",95:"OPERATOR_MULTIPLICATION",96:"OPERATOR_DIVISON",97:"OPERATOR_MODULO",105:"TRUE_LITERAL",106:"FALSE_LITERAL",107:"DECIMAL_INTEGER_LITERAL",108:"STRING_LITERAL"},
      productions_: [0,[3,1],[3,2],[3,2],[3,2],[3,3],[3,3],[3,3],[3,4],[5,3],[6,1],[6,2],[11,3],[7,1],[14,1],[15,3],[15,4],[17,3],[20,1],[20,2],[22,1],[23,1],[23,1],[24,3],[25,2],[28,2],[28,4],[30,4],[34,1],[34,3],[36,2],[29,1],[27,1],[27,3],[41,1],[41,3],[39,1],[43,1],[26,1],[45,1],[45,1],[46,1],[46,1],[48,1],[49,1],[40,2],[40,3],[52,1],[52,2],[53,1],[53,1],[54,2],[56,2],[55,1],[55,1],[55,1],[55,1],[57,1],[57,1],[57,1],[59,5],[58,7],[64,1],[64,1],[64,1],[64,1],[64,1],[60,5],[61,1],[62,2],[71,1],[71,1],[13,1],[13,1],[74,1],[75,3],[72,3],[77,1],[44,1],[79,1],[79,1],[78,1],[80,1],[80,1],[80,0],[80,1],[81,1],[82,1],[83,1],[84,1],[85,1],[85,3],[85,3],[86,1],[89,1],[90,1],[90,3],[90,3],[91,1],[91,3],[91,3],[91,3],[94,1],[98,1],[98,1],[99,1],[99,1],[100,1],[100,1],[100,1],[73,3],[73,4],[104,1],[104,3],[101,1],[101,1],[102,1],[103,1]],
      performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

      var $0 = $$.length - 1;
      switch (yystate) {
      case 1: return new yy.CompilationUnit(); 
      break;
      case 2: var cu = new yy.CompilationUnit(); cu.vavaPackage = $$[$0-1]; return cu; 
      break;
      case 3: var cu = new yy.CompilationUnit(); cu.appendChild($$[$0-1]); return cu; 
      break;
      case 4: var cu = new yy.CompilationUnit(); cu.appendChild($$[$0-1]); return cu; 
      break;
      case 5: var cu = new yy.CompilationUnit(); cu.vavaPackage = $$[$0-2]; cu.appendChild($$[$0-1]); return cu; 
      break;
      case 6: var cu = new yy.CompilationUnit(); cu.vavaPackage = $$[$0-2]; cu.appendChild($$[$0-1]); return cu; 
      break;
      case 7: var cu = new yy.CompilationUnit(); cu.appendChild($$[$0-2]); cu.appendChild($$[$0-1]); return cu; 
      break;
      case 8: var cu = new yy.CompilationUnit(); cu.vavaPackage = $$[$0-3]; cu.appendChild($$[$0-2]); cu.appendChild($$[$0-1]); return cu; 
      break;
      case 9: this.$ = $$[$0-1]; 
      break;
      case 10: this.$ = new yy.ImportDeclarations($$[$0]); 
      break;
      case 11: $$[$0-1].appendChild($$[$0]); this.$ = $$[$0-1]; 
      break;
      case 12: this.$ = new yy.ImportDeclaration($$[$0-1]); 
      break;
      case 13: this.$ = $$[$0]; 
      break;
      case 14: this.$ = $$[$0]; 
      break;
      case 15: this.$ = new yy.ClassDeclaration($$[$0-1], $$[$0]); 
      break;
      case 16: this.$ = new yy.ClassDeclaration($$[$0-1], $$[$0]); 
      break;
      case 17: this.$ = $$[$0-1]; 
      break;
      case 18: this.$ = [$$[$0]]; 
      break;
      case 19: $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
      break;
      case 20: this.$ = $$[$0] 
      break;
      case 21: this.$ = $$[$0]; 
      break;
      case 22: this.$ = $$[$0]; 
      break;
      case 23: this.$ = new yy.FieldDeclaration($$[$0-2], $$[$0-1]); 
      break;
      case 24: this.$ = new yy.MethodDeclaration($$[$0-1], $$[$0]); 
      break;
      case 25: this.$ = yy.utils.merge({vavaType: $$[$0-1]}, $$[$0]); 
      break;
      case 26: this.$ = yy.utils.merge({vavaType: $$[$0-1]}, $$[$0]); 
      break;
      case 27: this.$ = {vavaIdentifier: $$[$0-3], vavaFormalParameters: $$[$0-1]}; 
      break;
      case 28: this.$ = [$$[$0]]; 
      break;
      case 29: this.$ = $$[$0-2]; this.$.push($$[$0]); 
      break;
      case 30: this.$ = new yy.FormalParameter($$[$0-1], $$[$0]); 
      break;
      case 31: this.$ = $$[$0]; 
      break;
      case 32: this.$ = new yy.VariableDeclarators($$[$0]); 
      break;
      case 33: $$[$0-2].appendChild($$[$0]); this.$ = $$[$0-2]; 
      break;
      case 34: this.$ = new yy.VariableDeclarator($$[$0]); 
      break;
      case 35: this.$ = new yy.VariableDeclarator($$[$0-2], $$[$0]); 
      break;
      case 36: this.$ = $$[$0]; 
      break;
      case 37: this.$ = $$[$0]; 
      break;
      case 38: this.$ = $$[$0]; 
      break;
      case 39: this.$ = $$[$0]; 
      break;
      case 40: this.$ = $$[$0]; 
      break;
      case 41: this.$ = $$[$0]; 
      break;
      case 42: this.$ = $$[$0]; 
      break;
      case 43: this.$ = $$[$0]; 
      break;
      case 44: this.$ = $$[$0]; 
      break;
      case 45: this.$ = new yy.Block(); 
      break;
      case 46: this.$ = new yy.Block($$[$0-1]); 
      break;
      case 47: this.$ = [$$[$0]]; 
      break;
      case 48: this.$ = $$[$0-1]; this.$.push($$[$0]); 
      break;
      case 49: this.$ = $$[$0]; 
      break;
      case 50: this.$ = $$[$0]; 
      break;
      case 51: this.$ = $$[$0-1]; 
      break;
      case 52: this.$ = new yy.LocalVariableDeclaration($$[$0-1], $$[$0]); 
      break;
      case 53: this.$ = $$[$0]; 
      break;
      case 54: this.$ = $$[$0]; 
      break;
      case 55: this.$ = $$[$0]; 
      break;
      case 56: this.$ = $$[$0]; 
      break;
      case 57: this.$ = $$[$0]; 
      break;
      case 58: this.$ = $$[$0]; 
      break;
      case 59: this.$ = $$[$0]; 
      break;
      case 60: this.$ = new yy.IfThen($$[$0-2], $$[$0]); 
      break;
      case 61: this.$ = new yy.IfThenElse($$[$0-4], $$[$0-2], $$[$0]); 
      break;
      case 62: this.$ = $$[$0]; 
      break;
      case 63: this.$ = $$[$0]; 
      break;
      case 64: this.$ = $$[$0]; 
      break;
      case 65: this.$ = $$[$0]; 
      break;
      case 66: this.$ = $$[$0]; 
      break;
      case 67: this.$ = new yy.WhileLoop($$[$0-2], $$[$0]); 
      break;
      case 68: this.$ = new yy.ASTNode(); 
      break;
      case 69: this.$ = new yy.ExpressionStatement($$[$0-1]); 
      break;
      case 70: this.$ = $$[$0]; 
      break;
      case 71: this.$ = $$[$0]; 
      break;
      case 72: this.$ = $$[$0]; 
      break;
      case 73: this.$ = $$[$0]; 
      break;
      case 74: this.$ = new yy.Name($$[$0]); 
      break;
      case 75: this.$ = new yy.Name($$[$0-2].qualified() + '.' + $$[$0]); 
      break;
      case 76: this.$ = new yy.Assignment($$[$0-2], $$[$0]); 
      break;
      case 77: this.$ = $$[$0]; 
      break;
      case 78: this.$ = $$[$0]; 
      break;
      case 79: this.$ = $$[$0]; 
      break;
      case 80: this.$ = $$[$0]; 
      break;
      case 81: this.$ = $$[$0]; 
      break;
      case 82: this.$ = $$[$0]; 
      break;
      case 85: this.$ = new yy.OrOrExpression($$[$0], $$[$02]); 
      break;
      case 86: this.$ = $$[$0]; 
      break;
      case 87: this.$ = $$[$0]; 
      break;
      case 88: this.$ = $$[$0]; 
      break;
      case 89: this.$ = $$[$0]; 
      break;
      case 90: this.$ = $$[$0]; 
      break;
      case 91: this.$ = new yy.Equals($$[$0-2], $$[$0]); 
      break;
      case 92: this.$ = new yy.NotEquals($$[$0-2], $$[$0]); 
      break;
      case 93: this.$ = $$[$0]; 
      break;
      case 94: this.$ = $$[$0]; 
      break;
      case 95: this.$ = $$[$0]; 
      break;
      case 96: this.$ = new yy.Addition($$[$0-2], $$[$0]); 
      break;
      case 97: this.$ = new yy.Subtraction($$[$0-2], $$[$0]); 
      break;
      case 98: this.$ = $$[$0]; 
      break;
      case 99: this.$ = new yy.Multiplication($$[$0-2], $$[$0]); 
      break;
      case 100: this.$ = new yy.Division($$[$0-2], $$[$0]); 
      break;
      case 101: this.$ = new yy.Modulo($$[$0-2], $$[$0]); 
      break;
      case 102: this.$ = $$[$0]; 
      break;
      case 103: this.$ = $$[$0]; 
      break;
      case 104: this.$ = $$[$0]; 
      break;
      case 105: this.$ = $$[$0]; 
      break;
      case 106: this.$ = $$[$0]; 
      break;
      case 107: this.$ = $$[$0]; 
      break;
      case 108: this.$ = $$[$0]; 
      break;
      case 109: this.$ = $$[$0]; 
      break;
      case 110: this.$ = new yy.MethodInvocation($$[$0-2]); 
      break;
      case 111: this.$ = new yy.MethodInvocation($$[$0-3], $$[$0-1]); 
      break;
      case 112: this.$ = new yy.ArgumentList($$[$0]); 
      break;
      case 113: $$[$0-2].appendChild($$[$0]); this.$ = $$[$0-2]; 
      break;
      case 114: this.$ = new yy.BooleanLiteral($$[$0]); 
      break;
      case 115: this.$ = new yy.BooleanLiteral($$[$0]); 
      break;
      case 116: this.$ = new yy.IntegerLiteral($$[$0]); 
      break;
      case 117: this.$ = new yy.StringLiteral($$[$0]); 
      break;
      }
      },
      table: [{3:1,4:[1,2],5:3,6:4,7:5,8:[1,6],11:7,12:[1,9],14:8,15:10,16:[1,11],18:[1,12]},{1:[3]},{1:[2,1]},{4:[1,13],6:14,7:15,11:7,12:[1,9],14:8,15:10,16:[1,11],18:[1,12]},{4:[1,16],7:17,11:18,12:[1,9],14:8,15:10,16:[1,11],18:[1,12]},{4:[1,19]},{9:[1,20]},{4:[2,10],12:[2,10],16:[2,10],18:[2,10]},{4:[2,13]},{9:[1,24],13:21,74:22,75:23},{4:[2,14]},{9:[1,25]},{16:[1,26]},{1:[2,2]},{4:[1,27],7:28,11:18,12:[1,9],14:8,15:10,16:[1,11],18:[1,12]},{4:[1,29]},{1:[2,3]},{4:[1,30]},{4:[2,11],12:[2,11],16:[2,11],18:[2,11]},{1:[2,4]},{10:[1,31]},{10:[1,32],76:[1,33]},{10:[2,72],33:[2,72],35:[2,72],38:[2,72],42:[2,72],76:[2,72],87:[2,72],88:[2,72],92:[2,72],93:[2,72],95:[2,72],96:[2,72],97:[2,72]},{10:[2,73],33:[2,73],35:[2,73],38:[2,73],42:[2,73],76:[2,73],87:[2,73],88:[2,73],92:[2,73],93:[2,73],95:[2,73],96:[2,73],97:[2,73]},{10:[2,74],33:[2,74],35:[2,74],38:[2,74],42:[2,74],76:[2,74],87:[2,74],88:[2,74],92:[2,74],93:[2,74],95:[2,74],96:[2,74],97:[2,74]},{17:34,19:[1,35]},{9:[1,36]},{1:[2,5]},{4:[1,37]},{1:[2,6]},{1:[2,7]},{4:[2,9],12:[2,9],16:[2,9],18:[2,9]},{4:[2,12],12:[2,12],16:[2,12],18:[2,12]},{9:[1,38]},{4:[2,15]},{18:[1,47],20:39,22:40,23:41,24:42,25:43,26:44,28:45,45:46,46:48,47:[1,49],48:50,49:51,50:[1,52],51:[1,53]},{17:54,19:[1,35]},{1:[2,8]},{10:[2,75],33:[2,75],35:[2,75],38:[2,75],42:[2,75],76:[2,75],87:[2,75],88:[2,75],92:[2,75],93:[2,75],95:[2,75],96:[2,75],97:[2,75]},{18:[1,47],21:[1,55],22:56,23:41,24:42,25:43,26:44,28:45,45:46,46:48,47:[1,49],48:50,49:51,50:[1,52],51:[1,53]},{18:[2,18],21:[2,18],47:[2,18],50:[2,18],51:[2,18]},{18:[2,20],21:[2,20],47:[2,20],50:[2,20],51:[2,20]},{18:[2,21],21:[2,21],47:[2,21],50:[2,21],51:[2,21]},{18:[2,22],21:[2,22],47:[2,22],50:[2,22],51:[2,22]},{9:[1,60],27:57,30:58,39:61,41:59},{19:[1,64],29:62,40:63},{9:[2,38]},{31:[1,65]},{9:[2,39]},{9:[2,40]},{9:[2,41]},{9:[2,42]},{9:[2,43]},{9:[2,44]},{4:[2,16]},{4:[2,17]},{18:[2,19],21:[2,19],47:[2,19],50:[2,19],51:[2,19]},{10:[1,66],38:[1,67]},{19:[2,25]},{10:[2,32],38:[2,32]},{10:[2,36],33:[1,68],38:[2,36],42:[2,36]},{10:[2,34],38:[2,34],42:[1,69]},{18:[2,24],21:[2,24],47:[2,24],50:[2,24],51:[2,24]},{18:[2,31],21:[2,31],47:[2,31],50:[2,31],51:[2,31]},{9:[1,24],10:[1,86],13:91,19:[1,64],21:[1,70],26:80,40:81,45:46,46:48,47:[1,49],48:50,49:51,50:[1,52],51:[1,53],52:71,53:72,54:73,55:74,56:75,57:76,58:77,59:78,60:79,61:82,62:83,63:[1,84],70:[1,85],71:87,72:88,73:89,74:22,75:23,77:90},{32:[1,92]},{18:[2,23],21:[2,23],47:[2,23],50:[2,23],51:[2,23]},{9:[1,94],39:61,41:93},{26:98,34:95,36:96,37:[1,97],45:46,46:48,47:[1,49],48:50,49:51,50:[1,52],51:[1,53]},{9:[1,24],10:[2,84],13:115,38:[2,84],43:99,44:100,73:117,74:22,75:23,78:101,80:102,81:103,82:104,83:105,84:106,85:107,86:108,89:109,90:110,91:111,94:112,98:113,99:114,100:116,101:118,102:119,103:120,105:[1,121],106:[1,122],107:[1,123],108:[1,124]},{9:[2,45],10:[2,45],18:[2,45],19:[2,45],21:[2,45],47:[2,45],50:[2,45],51:[2,45],63:[2,45],65:[2,45],70:[2,45]},{9:[1,24],10:[1,86],13:91,19:[1,64],21:[1,125],26:80,40:81,45:46,46:48,47:[1,49],48:50,49:51,50:[1,52],51:[1,53],53:126,54:73,55:74,56:75,57:76,58:77,59:78,60:79,61:82,62:83,63:[1,84],70:[1,85],71:87,72:88,73:89,74:22,75:23,77:90},{9:[2,47],10:[2,47],19:[2,47],21:[2,47],47:[2,47],50:[2,47],51:[2,47],63:[2,47],70:[2,47]},{9:[2,49],10:[2,49],19:[2,49],21:[2,49],47:[2,49],50:[2,49],51:[2,49],63:[2,49],70:[2,49]},{9:[2,50],10:[2,50],19:[2,50],21:[2,50],47:[2,50],50:[2,50],51:[2,50],63:[2,50],70:[2,50]},{10:[1,127]},{9:[2,53],10:[2,53],19:[2,53],21:[2,53],47:[2,53],50:[2,53],51:[2,53],63:[2,53],70:[2,53]},{9:[2,54],10:[2,54],19:[2,54],21:[2,54],47:[2,54],50:[2,54],51:[2,54],63:[2,54],70:[2,54]},{9:[2,55],10:[2,55],19:[2,55],21:[2,55],47:[2,55],50:[2,55],51:[2,55],63:[2,55],70:[2,55]},{9:[2,56],10:[2,56],19:[2,56],21:[2,56],47:[2,56],50:[2,56],51:[2,56],63:[2,56],70:[2,56]},{9:[1,94],27:128,39:61,41:59},{9:[2,57],10:[2,57],19:[2,57],21:[2,57],47:[2,57],50:[2,57],51:[2,57],63:[2,57],65:[2,57],70:[2,57]},{9:[2,58],10:[2,58],19:[2,58],21:[2,58],47:[2,58],50:[2,58],51:[2,58],63:[2,58],65:[2,58],70:[2,58]},{9:[2,59],10:[2,59],19:[2,59],21:[2,59],47:[2,59],50:[2,59],51:[2,59],63:[2,59],65:[2,59],70:[2,59]},{33:[1,129]},{33:[1,130]},{9:[2,68],10:[2,68],19:[2,68],21:[2,68],47:[2,68],50:[2,68],51:[2,68],63:[2,68],65:[2,68],70:[2,68]},{10:[1,131]},{10:[2,70]},{10:[2,71]},{42:[1,132]},{33:[1,133],42:[2,77],76:[1,33]},{9:[1,135],30:134},{10:[2,33],38:[2,33]},{10:[2,36],35:[2,36],38:[2,36],42:[2,36]},{35:[1,136]},{35:[2,28]},{38:[1,137]},{9:[1,94],39:138},{10:[2,35],38:[2,35]},{10:[2,37],38:[2,37]},{10:[2,78],35:[2,78],38:[2,78]},{10:[2,81],35:[2,81],38:[2,81]},{10:[2,82],35:[2,82],38:[2,82]},{10:[2,86],35:[2,86],38:[2,86]},{10:[2,87],35:[2,87],38:[2,87]},{10:[2,88],35:[2,88],38:[2,88]},{10:[2,89],35:[2,89],38:[2,89],87:[1,139],88:[1,140]},{10:[2,90],35:[2,90],38:[2,90],87:[2,90],88:[2,90]},{10:[2,93],35:[2,93],38:[2,93],87:[2,93],88:[2,93]},{10:[2,94],35:[2,94],38:[2,94],87:[2,94],88:[2,94],92:[1,141],93:[1,142]},{10:[2,95],35:[2,95],38:[2,95],87:[2,95],88:[2,95],92:[2,95],93:[2,95],95:[1,143],96:[1,144],97:[1,145]},{10:[2,98],35:[2,98],38:[2,98],87:[2,98],88:[2,98],92:[2,98],93:[2,98],95:[2,98],96:[2,98],97:[2,98]},{10:[2,102],35:[2,102],38:[2,102],87:[2,102],88:[2,102],92:[2,102],93:[2,102],95:[2,102],96:[2,102],97:[2,102]},{10:[2,103],35:[2,103],38:[2,103],87:[2,103],88:[2,103],92:[2,103],93:[2,103],95:[2,103],96:[2,103],97:[2,103]},{10:[2,104],33:[1,133],35:[2,104],38:[2,104],76:[1,33],87:[2,104],88:[2,104],92:[2,104],93:[2,104],95:[2,104],96:[2,104],97:[2,104]},{10:[2,105],35:[2,105],38:[2,105],87:[2,105],88:[2,105],92:[2,105],93:[2,105],95:[2,105],96:[2,105],97:[2,105]},{10:[2,106],35:[2,106],38:[2,106],87:[2,106],88:[2,106],92:[2,106],93:[2,106],95:[2,106],96:[2,106],97:[2,106]},{10:[2,107],35:[2,107],38:[2,107],87:[2,107],88:[2,107],92:[2,107],93:[2,107],95:[2,107],96:[2,107],97:[2,107]},{10:[2,108],35:[2,108],38:[2,108],87:[2,108],88:[2,108],92:[2,108],93:[2,108],95:[2,108],96:[2,108],97:[2,108]},{10:[2,109],35:[2,109],38:[2,109],87:[2,109],88:[2,109],92:[2,109],93:[2,109],95:[2,109],96:[2,109],97:[2,109]},{10:[2,114],35:[2,114],38:[2,114],87:[2,114],88:[2,114],92:[2,114],93:[2,114],95:[2,114],96:[2,114],97:[2,114]},{10:[2,115],35:[2,115],38:[2,115],87:[2,115],88:[2,115],92:[2,115],93:[2,115],95:[2,115],96:[2,115],97:[2,115]},{10:[2,116],35:[2,116],38:[2,116],87:[2,116],88:[2,116],92:[2,116],93:[2,116],95:[2,116],96:[2,116],97:[2,116]},{10:[2,117],35:[2,117],38:[2,117],87:[2,117],88:[2,117],92:[2,117],93:[2,117],95:[2,117],96:[2,117],97:[2,117]},{9:[2,46],10:[2,46],18:[2,46],19:[2,46],21:[2,46],47:[2,46],50:[2,46],51:[2,46],63:[2,46],65:[2,46],70:[2,46]},{9:[2,48],10:[2,48],19:[2,48],21:[2,48],47:[2,48],50:[2,48],51:[2,48],63:[2,48],70:[2,48]},{9:[2,51],10:[2,51],19:[2,51],21:[2,51],47:[2,51],50:[2,51],51:[2,51],63:[2,51],70:[2,51]},{10:[2,52],38:[1,67]},{9:[1,24],13:115,35:[2,84],44:146,73:117,74:22,75:23,78:101,80:102,81:103,82:104,83:105,84:106,85:107,86:108,89:109,90:110,91:111,94:112,98:113,99:114,100:116,101:118,102:119,103:120,105:[1,121],106:[1,122],107:[1,123],108:[1,124]},{9:[1,24],13:115,35:[2,84],44:147,73:117,74:22,75:23,78:101,80:102,81:103,82:104,83:105,84:106,85:107,86:108,89:109,90:110,91:111,94:112,98:113,99:114,100:116,101:118,102:119,103:120,105:[1,121],106:[1,122],107:[1,123],108:[1,124]},{9:[2,69],10:[2,69],19:[2,69],21:[2,69],47:[2,69],50:[2,69],51:[2,69],63:[2,69],65:[2,69],70:[2,69]},{9:[1,24],10:[2,84],13:115,73:117,74:22,75:23,78:148,80:102,81:103,82:104,83:105,84:106,85:107,86:108,89:109,90:110,91:111,94:112,98:113,99:114,100:116,101:118,102:119,103:120,105:[1,121],106:[1,122],107:[1,123],108:[1,124]},{9:[1,24],13:115,35:[1,149],38:[2,84],44:151,73:117,74:22,75:23,78:101,80:102,81:103,82:104,83:105,84:106,85:107,86:108,89:109,90:110,91:111,94:112,98:113,99:114,100:116,101:118,102:119,103:120,104:150,105:[1,121],106:[1,122],107:[1,123],108:[1,124]},{19:[2,26]},{33:[1,68]},{19:[2,27]},{26:98,36:152,45:46,46:48,47:[1,49],48:50,49:51,50:[1,52],51:[1,53]},{35:[2,30]},{9:[1,24],13:115,73:117,74:22,75:23,86:153,89:109,90:110,91:111,94:112,98:113,99:114,100:116,101:118,102:119,103:120,105:[1,121],106:[1,122],107:[1,123],108:[1,124]},{9:[1,24],13:115,73:117,74:22,75:23,86:154,89:109,90:110,91:111,94:112,98:113,99:114,100:116,101:118,102:119,103:120,105:[1,121],106:[1,122],107:[1,123],108:[1,124]},{9:[1,24],13:115,73:117,74:22,75:23,91:155,94:112,98:113,99:114,100:116,101:118,102:119,103:120,105:[1,121],106:[1,122],107:[1,123],108:[1,124]},{9:[1,24],13:115,73:117,74:22,75:23,91:156,94:112,98:113,99:114,100:116,101:118,102:119,103:120,105:[1,121],106:[1,122],107:[1,123],108:[1,124]},{9:[1,24],13:115,73:117,74:22,75:23,94:157,98:113,99:114,100:116,101:118,102:119,103:120,105:[1,121],106:[1,122],107:[1,123],108:[1,124]},{9:[1,24],13:115,73:117,74:22,75:23,94:158,98:113,99:114,100:116,101:118,102:119,103:120,105:[1,121],106:[1,122],107:[1,123],108:[1,124]},{9:[1,24],13:115,73:117,74:22,75:23,94:159,98:113,99:114,100:116,101:118,102:119,103:120,105:[1,121],106:[1,122],107:[1,123],108:[1,124]},{35:[1,160]},{35:[1,161]},{10:[2,76]},{10:[2,110],35:[2,110],38:[2,110],87:[2,110],88:[2,110],92:[2,110],93:[2,110],95:[2,110],96:[2,110],97:[2,110]},{35:[1,162],38:[1,163]},{35:[2,112],38:[2,112]},{35:[2,29]},{10:[2,91],35:[2,91],38:[2,91],87:[2,91],88:[2,91]},{10:[2,92],35:[2,92],38:[2,92],87:[2,92],88:[2,92]},{10:[2,96],35:[2,96],38:[2,96],87:[2,96],88:[2,96],92:[2,96],93:[2,96],95:[1,143],96:[1,144],97:[1,145]},{10:[2,97],35:[2,97],38:[2,97],87:[2,97],88:[2,97],92:[2,97],93:[2,97],95:[1,143],96:[1,144],97:[1,145]},{10:[2,99],35:[2,99],38:[2,99],87:[2,99],88:[2,99],92:[2,99],93:[2,99],95:[2,99],96:[2,99],97:[2,99]},{10:[2,100],35:[2,100],38:[2,100],87:[2,100],88:[2,100],92:[2,100],93:[2,100],95:[2,100],96:[2,100],97:[2,100]},{10:[2,101],35:[2,101],38:[2,101],87:[2,101],88:[2,101],92:[2,101],93:[2,101],95:[2,101],96:[2,101],97:[2,101]},{9:[1,24],10:[1,86],13:91,19:[1,64],40:81,55:165,57:166,58:77,59:78,60:79,61:82,62:83,63:[1,84],64:164,66:[1,167],67:[1,168],68:[1,169],69:[1,170],70:[1,85],71:87,72:88,73:89,74:22,75:23,77:90},{9:[1,24],10:[1,86],13:91,19:[1,64],40:81,55:171,57:76,58:77,59:78,60:79,61:82,62:83,63:[1,84],70:[1,85],71:87,72:88,73:89,74:22,75:23,77:90},{10:[2,111],35:[2,111],38:[2,111],87:[2,111],88:[2,111],92:[2,111],93:[2,111],95:[2,111],96:[2,111],97:[2,111]},{9:[1,24],13:115,35:[2,84],38:[2,84],44:172,73:117,74:22,75:23,78:101,80:102,81:103,82:104,83:105,84:106,85:107,86:108,89:109,90:110,91:111,94:112,98:113,99:114,100:116,101:118,102:119,103:120,105:[1,121],106:[1,122],107:[1,123],108:[1,124]},{65:[1,173]},{9:[2,60],10:[2,60],19:[2,60],21:[2,60],47:[2,60],50:[2,60],51:[2,60],63:[2,60],70:[2,60]},{9:[2,62],10:[2,62],19:[2,62],21:[2,62],47:[2,62],50:[2,62],51:[2,62],63:[2,62],65:[2,62],70:[2,62]},{65:[2,63]},{65:[2,64]},{65:[2,65]},{65:[2,66]},{9:[2,67],10:[2,67],19:[2,67],21:[2,67],47:[2,67],50:[2,67],51:[2,67],63:[2,67],70:[2,67]},{35:[2,113],38:[2,113]},{9:[1,24],10:[1,86],13:91,19:[1,64],40:81,55:174,57:76,58:77,59:78,60:79,61:82,62:83,63:[1,84],70:[1,85],71:87,72:88,73:89,74:22,75:23,77:90},{9:[2,61],10:[2,61],19:[2,61],21:[2,61],47:[2,61],50:[2,61],51:[2,61],63:[2,61],70:[2,61]}],
      defaultActions: {2:[2,1],8:[2,13],10:[2,14],13:[2,2],16:[2,3],19:[2,4],27:[2,5],29:[2,6],30:[2,7],34:[2,15],37:[2,8],46:[2,38],48:[2,39],49:[2,40],50:[2,41],51:[2,42],52:[2,43],53:[2,44],54:[2,16],55:[2,17],58:[2,25],88:[2,70],89:[2,71],96:[2,28],134:[2,26],136:[2,27],138:[2,30],148:[2,76],152:[2,29],167:[2,63],168:[2,64],169:[2,65],170:[2,66]},
      parseError: function parseError(str, hash) {
          throw new Error(str);
      },
      parse: function parse(input) {
          var self = this,
              stack = [0],
              vstack = [null], // semantic value stack
              lstack = [], // location stack
              table = this.table,
              yytext = '',
              yylineno = 0,
              yyleng = 0,
              recovering = 0,
              TERROR = 2,
              EOF = 1;

          //this.reductionCount = this.shiftCount = 0;

          this.lexer.setInput(input);
          this.lexer.yy = this.yy;
          this.yy.lexer = this.lexer;
          var yyloc = this.lexer.yylloc;
          lstack.push(yyloc);

          if (typeof this.yy.parseError === 'function')
              this.parseError = this.yy.parseError;

          function popStack (n) {
              stack.length = stack.length - 2*n;
              vstack.length = vstack.length - n;
              lstack.length = lstack.length - n;
          }

          function lex() {
              var token;
              token = self.lexer.lex() || 1; // $end = 1
              // if token isn't its numeric value, convert
              if (typeof token !== 'number') {
                  token = self.symbols_[token] || token;
              }
              return token;
          };

          var symbol, preErrorSymbol, state, action, a, r, yyval={},p,len,newState, expected;
          while (true) {
              // retreive state number from top of stack
              state = stack[stack.length-1];

              // use default actions if available
              if (this.defaultActions[state]) {
                  action = this.defaultActions[state];
              } else {
                  if (symbol == null)
                      symbol = lex();
                  // read action for current state and first input
                  action = table[state] && table[state][symbol];
              }

              // handle parse error
              if (typeof action === 'undefined' || !action.length || !action[0]) {

                  if (!recovering) {
                      // Report error
                      expected = [];
                      for (p in table[state]) if (this.terminals_[p] && p > 2) {
                          expected.push("'"+this.terminals_[p]+"'");
                      }
                      var errStr = '';
                      if (this.lexer.showPosition) {
                          errStr = 'Parse error on line '+(yylineno+1)+":\n"+this.lexer.showPosition()+'\nExpecting '+expected.join(', ');
                      } else {
                          errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                        (symbol == 1 /*EOF*/ ? "end of input" :
                                                    ("'"+(this.terminals_[symbol] || symbol)+"'"));
                      }
                      this.parseError(errStr,
                          {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
                  }

                  // just recovered from another error
                  if (recovering == 3) {
                      if (symbol == EOF) {
                          throw new Error(errStr || 'Parsing halted.');
                      }

                      // discard current lookahead and grab another
                      yyleng = this.lexer.yyleng;
                      yytext = this.lexer.yytext;
                      yylineno = this.lexer.yylineno;
                      yyloc = this.lexer.yylloc;
                      symbol = lex();
                  }

                  // try to recover from error
                  while (1) {
                      // check for error recovery rule in this state
                      if ((TERROR.toString()) in table[state]) {
                          break;
                      }
                      if (state == 0) {
                          throw new Error(errStr || 'Parsing halted.');
                      }
                      popStack(1);
                      state = stack[stack.length-1];
                  }

                  preErrorSymbol = symbol; // save the lookahead token
                  symbol = TERROR;         // insert generic error symbol as new lookahead
                  state = stack[stack.length-1];
                  action = table[state] && table[state][TERROR];
                  recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
              }

              // this shouldn't happen, unless resolve defaults are off
              if (action[0] instanceof Array && action.length > 1) {
                  throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
              }

              switch (action[0]) {

                  case 1: // shift
                      //this.shiftCount++;

                      stack.push(symbol);
                      vstack.push(this.lexer.yytext);
                      lstack.push(this.lexer.yylloc);
                      stack.push(action[1]); // push state
                      symbol = null;
                      if (!preErrorSymbol) { // normal execution/no error
                          yyleng = this.lexer.yyleng;
                          yytext = this.lexer.yytext;
                          yylineno = this.lexer.yylineno;
                          yyloc = this.lexer.yylloc;
                          if (recovering > 0)
                              recovering--;
                      } else { // error just occurred, resume old lookahead f/ before error
                          symbol = preErrorSymbol;
                          preErrorSymbol = null;
                      }
                      break;

                  case 2: // reduce
                      //this.reductionCount++;

                      len = this.productions_[action[1]][1];

                      // perform semantic action
                      yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                      // default location, uses first token for firsts, last for lasts
                      yyval._$ = {
                          first_line: lstack[lstack.length-(len||1)].first_line,
                          last_line: lstack[lstack.length-1].last_line,
                          first_column: lstack[lstack.length-(len||1)].first_column,
                          last_column: lstack[lstack.length-1].last_column,
                      };
                      r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);

                      if (typeof r !== 'undefined') {
                          return r;
                      }

                      // pop off stack
                      if (len) {
                          stack = stack.slice(0,-1*len*2);
                          vstack = vstack.slice(0, -1*len);
                          lstack = lstack.slice(0, -1*len);
                      }

                      stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                      vstack.push(yyval.$);
                      lstack.push(yyval._$);
                      // goto new state = table[STATE][NONTERMINAL]
                      newState = table[stack[stack.length-2]][stack[stack.length-1]];
                      stack.push(newState);
                      break;

                  case 3: // accept
                      return true;
              }

          }

          return true;
      }};/* Jison generated lexer */
      var lexer = (function(){var lexer = ({EOF:1,
      parseError:function parseError(str, hash) {
              if (this.yy.parseError) {
                  this.yy.parseError(str, hash);
              } else {
                  throw new Error(str);
              }
          },
      setInput:function (input) {
              this._input = input;
              this._more = this._less = this.done = false;
              this.yylineno = this.yyleng = 0;
              this.yytext = this.matched = this.match = '';
              this.conditionStack = ['INITIAL'];
              this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
              return this;
          },
      input:function () {
              var ch = this._input[0];
              this.yytext+=ch;
              this.yyleng++;
              this.match+=ch;
              this.matched+=ch;
              var lines = ch.match(/\n/);
              if (lines) this.yylineno++;
              this._input = this._input.slice(1);
              return ch;
          },
      unput:function (ch) {
              this._input = ch + this._input;
              return this;
          },
      more:function () {
              this._more = true;
              return this;
          },
      pastInput:function () {
              var past = this.matched.substr(0, this.matched.length - this.match.length);
              return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
          },
      upcomingInput:function () {
              var next = this.match;
              if (next.length < 20) {
                  next += this._input.substr(0, 20-next.length);
              }
              return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
          },
      showPosition:function () {
              var pre = this.pastInput();
              var c = new Array(pre.length + 1).join("-");
              return pre + this.upcomingInput() + "\n" + c+"^";
          },
      next:function () {
              if (this.done) {
                  return this.EOF;
              }
              if (!this._input) this.done = true;

              var token,
                  match,
                  col,
                  lines;
              if (!this._more) {
                  this.yytext = '';
                  this.match = '';
              }
              var rules = this._currentRules();
              for (var i=0;i < rules.length; i++) {
                  match = this._input.match(this.rules[rules[i]]);
                  if (match) {
                      lines = match[0].match(/\n.*/g);
                      if (lines) this.yylineno += lines.length;
                      this.yylloc = {first_line: this.yylloc.last_line,
                                     last_line: this.yylineno+1,
                                     first_column: this.yylloc.last_column,
                                     last_column: lines ? lines[lines.length-1].length-1 : this.yylloc.last_column + match.length}
                      this.yytext += match[0];
                      this.match += match[0];
                      this.matches = match;
                      this.yyleng = this.yytext.length;
                      this._more = false;
                      this._input = this._input.slice(match[0].length);
                      this.matched += match[0];
                      token = this.performAction.call(this, this.yy, this, rules[i],this.conditionStack[this.conditionStack.length-1]);
                      if (token) return token;
                      else return;
                  }
              }
              if (this._input === "") {
                  return this.EOF;
              } else {
                  this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(), 
                          {text: "", token: null, line: this.yylineno});
              }
          },
      lex:function lex() {
              var r = this.next();
              if (typeof r !== 'undefined') {
                  return r;
              } else {
                  return this.lex();
              }
          },
      begin:function begin(condition) {
              this.conditionStack.push(condition);
          },
      popState:function popState() {
              return this.conditionStack.pop();
          },
      _currentRules:function _currentRules() {
              return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
          }});
      lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

      var YYSTATE=YY_START
      switch($avoiding_name_collisions) {
      case 0:/* skip whitespace */
      break;
      case 1:return 19; /* Basic Syntax */
      break;
      case 2:return 21;
      break;
      case 3:return 33;
      break;
      case 4:return 35;
      break;
      case 5:return 38;
      break;
      case 6:return 10;
      break;
      case 7:return 18; /* Modifier */
      break;
      case 8:return 'MODIFIER_PRIVATE';
      break;
      case 9:return 'MODIFIER_PROTECTED';
      break;
      case 10:return 31;
      break;
      case 11:return 32;
      break;
      case 12:return 'MODIFIER_FINAL';
      break;
      case 13:return 8; /* Keywords */
      break;
      case 14:return 12;
      break;
      case 15:return 63;
      break;
      case 16:return 65;
      break;
      case 17:return 70;
      break;
      case 18:return 105;
      break;
      case 19:return 106;
      break;
      case 20:return 16;
      break;
      case 21:return 47;
      break;
      case 22:return 50;
      break;
      case 23:return 51;
      break;
      case 24:return 87;
      break;
      case 25:return 88;
      break;
      case 26:return 42;
      break;
      case 27:return 92;
      break;
      case 28:return 93;
      break;
      case 29:return 95;
      break;
      case 30:return 96;
      break;
      case 31:return 97;
      break;
      case 32:return 76;
      break;
      case 33:return 9; /* Varying form */
      break;
      case 34:return 107;
      break;
      case 35:return 'FLOAT_EXPRESSION';
      break;
      case 36:return 108;
      break;
      case 37:/*skip comments*/
      break;
      case 38:return 4;
      break;
      case 39:return 'INVALID';
      break;
      }
      };
      lexer.rules = [/^\s+/,/^\{/,/^\}/,/^\(/,/^\)/,/^,/,/^;/,/^public\b/,/^private\b/,/^protected\b/,/^static\b/,/^void\b/,/^final\b/,/^package\b/,/^import\b/,/^if\b/,/^else\b/,/^while\b/,/^true\b/,/^false\b/,/^class\b/,/^boolean\b/,/^int\b/,/^float\b/,/^==/,/^!=/,/^=/,/^\+/,/^-/,/^\*/,/^\//,/^%/,/^\./,/^[a-zA-Z][a-zA-Z0-9_]*/,/^[0-9]+/,/^[0-9]+.[0-9]*/,/^".*"/,/^\/\/./,/^$/,/^./];
      lexer.conditions = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39],"inclusive":true}};return lexer;})()
      parser.lexer = lexer;
      return parser;
      })();
      return {parser:vava_proper};
      if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
      exports.parser = vava_proper;
      exports.parse = function () { return vava_proper.parse.apply(vava_proper, arguments); }
      exports.main = function commonjsMain(args) {
          if (!args[1])
              throw new Error('Usage: '+args[0]+' FILE');
          if (typeof process !== 'undefined') {
              var source = require('fs').readFileSync(require('path').join(process.cwd(), args[1]), "utf8");
          } else {
              var cwd = require("file").path(require("file").cwd());
              var source = cwd.join(args[1]).read({charset: "utf-8"});
          }
          return exports.parser.parse(source);
      }
      if (typeof module !== 'undefined' && require.main === module) {
        exports.main(typeof process !== 'undefined' ? process.argv.slice(1) : require("system").args);
      }
      }
    }({}).parser;
    /*** parser.yy = require('./compiler/ast_nodes'); ***/
    parser.yy = function (exports) {
      /**
       * Defines AST nodes which are used for constructing an abstract syntax tree
       * by the parser.
       *
       * Johannes Emerich <johannes@emerich.de>
       * MIT Licensed
       */

      var utils = (typeof hobbes !== 'undefined' && hobbes.utils);
      var builder = utils.builder;

      var ASTNodeInterface = exports.ASTNodeInterface = new utils.Interface('ASTNode', 'appendChild', 'compile', 'getType', 'toString');

      /**
       * @constructor
       * Creates an ASTNode.
       *
       * Inheritants need to make sure they have children of their own!
       */
      var ASTNode = exports.ASTNode = function ASTNode () {
        // Lists the node's child nodes
        this.children = [];
        // Node type
        this.type = 'ASTNode';
      };

      /**
       * Adds the provided node as a child, if it passes as an ASTNode.
       *
       * @param node An ASTNode
       * @returns The node for chaining
       */
      ASTNode.prototype.appendChild = function (node) {
        this.checkChild(node);
        this.children.push(node);
        return node;
      }

      /**
       * Checks wether child is acceptable.
       *
       * Override for more specific checks.
       *
       * @param node An ASTNode
       */
      ASTNode.prototype.checkChild = function (node) {
        ASTNodeInterface.check(node);
      };

      /**
       * Compiles the node with all its children
       */
      ASTNode.prototype.compile = function (indent) {
        return this.compileNode(indent);
      }

      /**
       * Returns the type of node.
       */
      ASTNode.prototype.getType = function () {
        return this.type;
      }

      /**
       * Returns a string signature containing information about the node.
       */
      ASTNode.prototype.assembleSignature = function () {
        var sigStr = '<' + this.getType();
        var signature = this.getSignature && this.getSignature() || {};
        for (prop in signature) {
          sigStr += ' ' + prop + ': ' + signature[prop];
        }
        return sigStr + '>';
      };

      /**
       * Returns a string representation of the form
       *
       * - ASTNode
       *   - Child A
       *     - Child A's child
       *   - Child B
       */
      ASTNode.prototype.toString = function (indent) {
        // add indentation and own type
        var str = utils.indent('- ' + this.assembleSignature() + '\n', indent);
        // append toString results of children
        this.children.forEach(function (child) {
          str += child.toString((indent || 0) + 2);
        });

        return str;
      }

      /**
       * Creates a node for a compilation unit, the root node of a Vava AST.
       */
      var CompilationUnit = exports.CompilationUnit = function CompilationUnit () {
        this.type = 'CompilationUnit';
        this.children = [];
        this.vavaPackage = null;
        this.vavaImports = [];
      };

      CompilationUnit.inherits(ASTNode);

      /**
       * Compiles the unit, with recursive calls to child nodes and attention to
       *   - the `package` property,
       *   - the list of `imports`.
       */
      CompilationUnit.prototype.compileNode = function () {
        var jsSource = '';

        this.children.forEach(function (child) {
          jsSource += child.compile(0) + '\n';
        });

        return jsSource;
      };

      CompilationUnit.prototype.getSignature = function () {
        return {
          vavaPackage : this.vavaPackage
        };
      };

      /**
       * Creates a node for a collection of import declarations.
       *
       * @param importDeclaration Optional first import declaration
       */
      var ImportDeclarations = exports.ImportDeclarations = function (importDeclaration) {
        this.type = 'ImportDeclarations';
        this.children = [];

        if (importDeclaration) this.appendChild(importDeclaration);
      };

      ImportDeclarations.inherits(ASTNode);

      ImportDeclarations.prototype.compileNode = function () {
        return [this.children.map(function (child) { return child.compileNode() })].join('\n');
      };

      ImportDeclarations.prototype.checkChild = function (declaration) {
        if (!declaration || declaration.getType() !== 'ImportDeclaration') {
          throw new TypeError('Expected import declaration to be of type `ImportDeclaration`.');
        }
      };

      ImportDeclarations.prototype.length = function () {
        return this.children.length;
      };

      ImportDeclarations.prototype.getSignature = function () {
        return {
          declarations : this.children.length
        };
      };

      /**
       * Creates a node for an import declaration.
       *
       * @param name The name/qualifier of the import
       */
      var ImportDeclaration = exports.ImportDeclaration = function (name) {
        this.type = 'ImportDeclaration';
        this.children = [];
        this.appendChild(name);
      };

      ImportDeclaration.inherits(ASTNode);

      ImportDeclaration.prototype.checkChild = function (name) {
        if (!name || name.getType() !== 'Name') {
          throw new TypeError('Expected import declaration to be of type `Name`.');
        }
      };

      ImportDeclaration.prototype.compileNode = function () {
        return 'this.' + this.children[0].simple() + ' = this.' + this.children[0].qualified() + ';';
      };

      /**
       * Creates a node for a ClassDeclaration, containing one Vava class.
       *
       * @param name Name of the class
       * @param classBody Array of body declarations
       */
      var ClassDeclaration = exports.ClassDeclaration = function (name, classBody) {
        classBody = classBody || [];
        if (!utils.isArray(classBody)) {
          throw new TypeError('Expected array for class body.');
        }
        this.type = 'ClassDeclaration';
        this.vavaClassName = name;
        this.children = classBody;
      }

      ClassDeclaration.inherits(ASTNode);

      ClassDeclaration.prototype.getSignature = function () {
        return {
          vavaClassName : this.vavaClassName
        };
      };

      ClassDeclaration.prototype.compileNode = function (indent) {
        var self = this;

        var serializedBody = builder.joinToObject(
          // Field Declarations
          builder.keyValue(
            'fields',
            builder.joinToObject(
              self.children.filter(function (child) {
                return child.getType() === 'FieldDeclaration';
              }).map(function (field) { return field.compile() })
            )
          ),
          // Method Declarations
          builder.keyValue(
            'methods',
            builder.joinToObject(
              self.children.filter(function (child) {
                return child.getType() === 'MethodDeclaration';
              }).map(function (method) { return method.compile() })
            )
          )
        );

        return builder.addPairToScope(
          this.vavaClassName,
          builder.constructorCall('this.__env.VavaClass', [builder.string(this.vavaClassName), serializedBody, 'this'], false)
          // TODO call of main method should be more robust (several classes in CU?)
        ) + '\n' + builder.functionCall('this["' + this.vavaClassName + '"].send', ['"main"']);
      };

      /**
       * Creates a node for a FieldDeclaration, containing one or several VariableDeclarators.
       *
       * @param vavaType The Vava type of the declared fields
       * @param variableDeclarators Array of VariableDeclaration objects
       */
      var FieldDeclaration = exports.FieldDeclaration = function (vavaType, variableDeclarators) {
        if (typeof vavaType !== 'string') {
          throw new TypeError('Expected Vava type to be string.');
        }
        if (!variableDeclarators || variableDeclarators.getType() !== "VariableDeclarators" || variableDeclarators.length() < 1) {
          throw new TypeError('Expected one or more variable declarators.');
        }
        this.type  = 'FieldDeclaration';
        this.children = [];
        this.vavaType = vavaType;

        this.appendChild(variableDeclarators);
      };

      FieldDeclaration.inherits(ASTNode);

      FieldDeclaration.prototype.compileNode = function (indent) {
        return this.children[0].compileNode(this.vavaType);
      };

      FieldDeclaration.prototype.getSignature = function () {
        return {
          vavaType : this.vavaType
        };
      };

      /**
       * Creates a node for a LocalVariableDeclaration, containing one or several VariableDeclarators.
       *
       * @param vavaType The Vava type of the declared fields
       * @param variableDeclarators Array of VariableDeclaration objects
       */
      var LocalVariableDeclaration = exports.LocalVariableDeclaration = function (vavaType, variableDeclarators) {
        if (typeof vavaType !== 'string') {
          throw new TypeError('Expected Vava type to be string.');
        }
        if (!variableDeclarators || variableDeclarators.getType() !== "VariableDeclarators" || variableDeclarators.length() < 1) {
          throw new TypeError('Expected one or more variable declarators.');
        }
        this.type  = 'LocalVariableDeclaration';
        this.children = [];
        this.vavaType = vavaType;

        this.appendChild(variableDeclarators);
      };

      LocalVariableDeclaration.inherits(ASTNode);

      LocalVariableDeclaration.prototype.compileNode = function (indent) {
        return utils.indent('this.__add({' + this.children[0].compileNode(this.vavaType) + '});', indent);
      };

      LocalVariableDeclaration.prototype.getSignature = function () {
        return {
          vavaType : this.vavaType
        };
      };

      /**
       * Creates a node for VariableDeclarators, a group of comma separated variable
       * declarations.
       *
       * @param variableDeclarator Optional first variable declarator
       */
      var VariableDeclarators = exports.VariableDeclarators = function (variableDeclarator) {
        this.type = 'VariableDeclarators';
        this.children = [];

        if (variableDeclarator) this.appendChild(variableDeclarator);
      };

      VariableDeclarators.inherits(ASTNode);

      VariableDeclarators.prototype.compileNode = function (vavaType) {
        return [this.children.map(function (child) { return child.compileNode(vavaType) })].join(',');
      };

      VariableDeclarators.prototype.checkChild = function (declarator) {
        if (!declarator || declarator.getType() !== 'VariableDeclarator') {
          throw new TypeError('Expected variable declarator to be of type `VariableDeclarator`.');
        }
      };

      VariableDeclarators.prototype.length = function () {
        return this.children.length;
      };

      VariableDeclarators.prototype.getSignature = function () {
        return {
          declarators : this.children.length
        };
      };

      /**
       * Creates a node for a VariableDeclarator, containing one variable identifier
       * and optionally its initializer expression.
       *
       * @param vavaIdentifier The identifier of the variable
       * @param vavaExpression The expression to initialize the variable with (optional)
       */
      var VariableDeclarator = exports.VariableDeclarator = function (vavaIdentifier, vavaExpression) {
        if (typeof vavaIdentifier !== 'string') {
          throw new TypeError('Expected Vava identifier to be a string.');
        }
        // TODO Bring this back later
        // if (vavaExpression && vavaExpression.getType() !== 'Expression') {
        //   throw new TypeError('Expected Vava expression to be of type `Expression`.');
        // }
        this.type = 'VariableDeclarator';
        this.children = [];
        this.vavaIdentifier = vavaIdentifier;
        this.vavaInitializer = vavaExpression;
      };

      VariableDeclarator.inherits(ASTNode);

      VariableDeclarator.prototype.compileNode = function (vavaType) {
        return builder.keyValue(
          this.vavaIdentifier,
          builder.constructorCall(
            'this.__env.TypedVariable',
            [builder.string(vavaType), builder.string(this.vavaIdentifier), this.vavaInitializer && this.vavaInitializer.compile()].filter(
              function (value) { return !!value; }
            ),
            false
          )
        );
      };

      VariableDeclarator.prototype.getSignature = function () {
        return {
          vavaIdentifier : this.vavaIdentifier,
          vavaInitializer: this.vavaInitializer && this.vavaInitializer.getType()
        };
      };

      /**
       * Creates a node for an assignment.
       *
       * @param name The name of the variable to assign to
       * @param value The value to assign
       */
      var Assignment = exports.Assignment = function (name, value) {
        this.type = 'Assignment';
        this.children = [];
        this.appendChild(name);
        this.appendChild(value);
      };

      Assignment.inherits(ASTNode);

      Assignment.prototype.compileNode = function (indent) {
        return utils.indent(this.children[0].compileNode('set') + '.set(' + this.children[1].compileNode() + ')', indent);
      };

      /**
       * Creates a node for a MethodDeclaration.
       *
       * @param vavaHeader An object containing header information
       * @param vavaBlock A block of Vava expressions
       */
      var MethodDeclaration = exports.MethodDeclaration = function (vavaHeader, vavaBlock) {
        this.type = 'MethodDeclaration';
        this.children = [];
        if (typeof vavaHeader.vavaType !== 'string') {
          throw new TypeError('Expected Vava type to be string.');
        }
        this.vavaType = vavaHeader.vavaType;
        if (typeof vavaHeader.vavaIdentifier !== 'string') {
          throw new TypeError('Expected Vava type to be string.');
        }
        this.vavaIdentifier = vavaHeader.vavaIdentifier;
        if (vavaHeader.vavaFormalParameters && !Array.isArray(vavaHeader.vavaFormalParameters)) {
          throw new TypeError('Expected Vava formal parameters to be array.');
        }
        this.vavaFormalParameters = vavaHeader.vavaFormalParameters || [];
        if (vavaBlock.getType() !== 'Block') {
          throw new TypeError('Expected Vava block to be Block.');
        }
        this.appendChild(vavaBlock);
      }

      MethodDeclaration.inherits(ASTNode);

      MethodDeclaration.prototype.compileNode = function () {
        // TODO This will not roll with method overriding (using vavaIdentifier as hash name)
        // Better: this.vavaIdentifier + this.vavaFormalParameters.map(vavaType)
        return builder.keyValue(
          this.vavaIdentifier,
          builder.constructorCall(
            'this.__env.VavaMethod',
            [
              builder.string(this.vavaIdentifier),
              builder.string(this.vavaType),
              builder.array(this.vavaFormalParameters.map(function (fP) { fP.compile(); })),
              builder.wrapAsFunction(this.children[0].compile())
            ],
            false
          )
        );
      };

      MethodDeclaration.prototype.getSignature = function () {
        return {
          vavaType: this.vavaType,
          vavaIdentifier: this.vavaIdentifier
        };
      }

      /**
       * Creates a node for a FormalParameter, containing type and identifier.
       *
       * @param vavaType The formal parameter's type
       * @param vavaIdentifier The formal parameter's identifier
       */
      var FormalParameter = exports.FormalParameter = function (vavaType, vavaIdentifier) {
        // TODO Type should be ASTNode later, I suppose
        if (typeof vavaIdentifier !== 'string') {
          throw new TypeError('Expected Vava identifier to be a string.');
        }
        this.type = 'FormalParameter';
        this.children = [];
        this.vavaType = vavaType;
        this.vavaIdentifier = vavaIdentifier;
      };

      FormalParameter.inherits(ASTNode);

      FormalParameter.prototype.compileNode = function () {
        return builder.joinToObject(builder.keyValue('identifier', this.vavaType), builder.keyValue('vavaType', this.vavaType));
      };

      FormalParameter.prototype.getSignature = function () {
        return {
          vavaType: this.vavaType,
          vavaIdentifier: this.vavaIdentifier
        };
      }

      /**
       * Creates a node for a method invocation.
       *
       * @param name The name of the method
       * @param argumentList List of arguments
       */
      var MethodInvocation = exports.MethodInvocation = function (name, argumentList) {
        this.type = 'MethodInvocation';
        this.children = [];
        this.name = name;
        this.appendChild(argumentList);
      };

      MethodInvocation.inherits(ASTNode);

      MethodInvocation.prototype.compileNode = function (indent) {
        return utils.indent('this.' + this.name.prefix() + '.send("' + this.name.simple() + '", ' + this.children[0].compile() + ')', indent);
      };

      MethodInvocation.prototype.getSignature = function () {
        return {name: this.name.qualified()};
      };

      /**
       * Creates a node for an argument list.
       *
       * @param firstArg The first argument, optional
       */
      var ArgumentList = exports.ArgumentList = function (firstArg) {
        this.type = 'ArgumentList';
        this.children = [];

        if (firstArg) this.appendChild(firstArg);
      };

      ArgumentList.inherits(ASTNode);

      ArgumentList.prototype.compileNode = function () {
        return '[' + this.children.map(function (child) { return child.compile() }).join(', ') + ']';
      };

      /**
       * Creates a node for a Block.
       * 
       * @param vavaStatements A list of statements
       */
      var Block = exports.Block = function (vavaStatements) {
        this.type = 'Block';
        this.children = [];
        if (typeof vavaStatements !== 'undefined' && !utils.isArray(vavaStatements)) {
          throw new TypeError('Expected Vava statements to be undefined or array.');
        }
        vavaStatements = vavaStatements || [];
        for (var i = 0; i < vavaStatements.length; i++) {
          this.appendChild(vavaStatements[i]);
        }
      }

      Block.inherits(ASTNode);

      Block.prototype.compileNode = function (indent) {
        var js = this.children.map(function (child) {
          return child.compile((indent || 0) + 2);
        }).join('\n');
        return js;
      };

      /**
       * Creates a node for an expression statement.
       *
       * Serves only to add line terminator and newline to the expressions.
       *
       * @param expression The expression to terminate
       */
      var ExpressionStatement = exports.ExpressionStatement = function (expression) {
        this.type = 'ExpressionStatement';
        this.children = [];
        this.appendChild(expression);
      };

      ExpressionStatement.inherits(ASTNode);

      ExpressionStatement.prototype.compileNode = function (indent) {
        return this.children[0].compile(indent) + ';';
      };

      /**
       * Creates a node for a name, i.e. a named reference.
       *
       * @param name The name in question
       */
      var Name = exports.Name = function (name) {
        this.type = 'Name';
        this.children = [];
        if (!name || !(/[a-zA-Z][a-zA-Z0-9_]*/.test(name))) {
          throw new TypeError('Expected name to be an identifier.');
        }
        this.name = name;
      };

      Name.inherits(ASTNode);

      /**
       * Return the name's last identifier.
       *
       */
      Name.prototype.simple = function () {
        var identifiers = this.name.split('.');
        return identifiers[identifiers.length - 1];
      };

      /**
       * Return the name without the last identifier.
       */
      Name.prototype.prefix = function () {
        var identifiers = this.name.split('.');
        return identifiers.slice(0, -1).join('.');
      };

      /**
       * Return the full qualified name.
       */
      Name.prototype.qualified = function () {
        return this.name;
      };

      /**
       * Simply resolve the name.
       *
       * @param dontGet If truthy, don't call #get
       */
      Name.prototype.compileNode = function (dontGet) {
        return 'this.' + this.name + (dontGet ? '' : '.get()');
      };

      Name.prototype.getSignature = function () {
        return {name : this.name};
      };

      /**
       * Creates a node for a Boolean literal.
       *
       * @param bool The boolean as string
       */
      var BooleanLiteral = exports.BooleanLiteral = function (bool) {
        this.type = 'BooleanLiteral';
        this.children = [];
        var boolString = String(bool);
        if (boolString === 'true' || boolString === 'false') {
          this.value = boolString;
        } else {
          throw new TypeError('Expected literal to be `true` or `false`, but was ' + boolString + '.');
        }
      };

      BooleanLiteral.inherits(ASTNode);

      BooleanLiteral.prototype.getSignature = function () {
        return {value : this.value};
      }

      BooleanLiteral.prototype.compileNode = function (indent) {
        return 'this.__env.BooleanValue["' + this.value + '"]';
      };

      /**
       * Creates a node for an Integer literal.
       *
       * @param num The number
       */
      var IntegerLiteral = exports.IntegerLiteral = function (num) {
        this.type = 'IntegerLiteral';
        this.children = [];
        // TODO Octal and hexal numbers
        if ((parseFloat(num) === parseInt(num)) && !isNaN(num)) {
          this.value = num;
        } else {
          throw new TypeError('Expected number to be an integer.');
        }
      };

      IntegerLiteral.inherits(ASTNode);

      IntegerLiteral.prototype.getSignature = function () {
        return {value : this.value};
      };

      IntegerLiteral.prototype.compileNode = function (indent) {
        return builder.functionCall('this.__env.IntValue.intern', [this.value], false);
      };

      /**
       * Creates a node for a String literal.
       *
       * @param str The string
       */
      var StringLiteral = exports.StringLiteral = function (str) {
        this.type = 'StringLiteral';
        this.children = [];
        this.value = str;
      };

      StringLiteral.inherits(ASTNode);

      StringLiteral.prototype.getSignature = function () {
        return {value : this.value};
      };

      StringLiteral.prototype.compileNode = function (indent) {
        return builder.constructorCall('this.__env.StringValue', [this.value], false);
      };

      //// Operations
      /**
       * Creates a node for an addition operation.
       *
       * @param numA The number to send the addition message to
       * @param numB The number to add
       */
      var Addition = exports.Addition = function (numA, numB) {
        this.type = 'Addition';
        this.children = [];
        // TODO Compile-time type checking
        if (!(numA) || !(numB)) {
          throw new TypeError('Expected two integer numbers for addition.');
        }
        this.appendChild(numA);
        this.appendChild(numB);
      }

      Addition.inherits(ASTNode);

      Addition.prototype.compileNode = function (indent) {
        return utils.indent(this.children[0].compile() + '.add(' + this.children[1].compile() + ')', indent);
      }

      /**
       * Creates a node for an subtraction operation.
       *
       * @param numA The number to send the subtraction message to
       * @param numB The number to subtract
       */
      var Subtraction = exports.Subtraction = function (numA, numB) {
        this.type = 'Subtraction';
        this.children = [];
        // TODO Compile-time type checking
        if (!(numA) || !(numB)) {
          throw new TypeError('Expected two integer numbers for subtraction.');
        }
        this.appendChild(numA);
        this.appendChild(numB);
      }

      Subtraction.inherits(ASTNode);

      Subtraction.prototype.compileNode = function (indent) {
        return utils.indent(this.children[0].compile() + '.subtract(' + this.children[1].compile() + ')', indent);
      }

      /**
       * Creates a node for a multiplication operation.
       *
       * @param numA The number to send the multiplication message to
       * @param numB The number to multiply with
       */
      var Multiplication = exports.Multiplication = function (numA, numB) {
        this.type = 'Multiplication';
        this.children = [];
        // TODO Compile-time type checking
        if (!(numA) || !(numB)) {
          throw new TypeError('Expected two integer numbers for multiplication.');
        }
        this.appendChild(numA);
        this.appendChild(numB);
      }

      Multiplication.inherits(ASTNode);

      Multiplication.prototype.compileNode = function (indent) {
        return utils.indent(this.children[0].compile() + '.times(' + this.children[1].compile() + ')', indent);
      }

      /**
       * Creates a node for a division operation.
       *
       * @param numA The number to send the division message to
       * @param numB The number to divide by
       */
      var Division = exports.Division = function (numA, numB) {
        this.type = 'Division';
        this.children = [];
        // TODO Compile-time type checking
        if (!(numA) || !(numB)) {
          throw new TypeError('Expected two integer numbers for division.');
        }
        this.appendChild(numA);
        this.appendChild(numB);
      }

      Division.inherits(ASTNode);

      Division.prototype.compileNode = function (indent) {
        return utils.indent(this.children[0].compile() + '.divide(' + this.children[1].compile() + ')', indent);
      }

      /**
       * Creates a node for a modulo operation.
       *
       * @param numA The number to send the modulo message to
       * @param numB The number to modulate by
       */
      var Modulo = exports.Modulo = function (numA, numB) {
        this.type = 'Modulo';
        this.children = [];
        // TODO Compile-time type checking
        if (!(numA) || !(numB)) {
          throw new TypeError('Expected two integer numbers for modulo.');
        }
        this.appendChild(numA);
        this.appendChild(numB);
      }

      Modulo.inherits(ASTNode);

      Modulo.prototype.compileNode = function (indent) {
        return utils.indent(this.children[0].compile() + '.modulo(' + this.children[1].compile() + ')', indent);
      }

      /**
       * Creates a node for an equality comparison.
       *
       * @param a First value to be compared
       * @param b Second value to be compared
       */
      var Equals = exports.Equals = function (a, b) {
        this.type = 'Equals';
        this.children = [];
        if (!a || !b) {
          throw new TypeError('Expected two values to compare for equality.');
        }
        this.appendChild(a);
        this.appendChild(b);
      };

      Equals.inherits(ASTNode);

      Equals.prototype.compileNode = function (indent) {
        return utils.indent('this.__env.BooleanValue[String(' + this.children[0].compile() + ' === ' + this.children[1].compile() + ')]', indent);
      };

      /**
       * Creates a node for an inequality comparison.
       *
       * @param a First value to be compared
       * @param b Second value to be compared
       */
      var NotEquals = exports.NotEquals = function (a, b) {
        this.type = 'NotEquals';
        this.children = [];
        if (!a || !b) {
          throw new TypeError('Expected two values to compare for inequality.');
        }
        this.appendChild(a);
        this.appendChild(b);
      };

      NotEquals.inherits(ASTNode);

      NotEquals.prototype.compileNode = function (indent) {
        return utils.indent('this.__env.BooleanValue[String(' + this.children[0].compile() + ' !== ' + this.children[1].compile() + ')]', indent);
      };

      /**
       * Creates a node for an if-then conditional.
       *
       * @param ifExpr The condition
       * @param thenExpr The conditional statement
       */
      var IfThen = exports.IfThen = function (ifExpr, thenExpr) {
        this.type = 'IfThen';
        this.children = [];
        if (!ifExpr || !thenExpr) {
          throw new TypeError('Expected condition and conditional.');
        }
        this.appendChild(ifExpr);
        this.appendChild(thenExpr);
      };

      IfThen.inherits(ASTNode);

      IfThen.prototype.compileNode = function (indent) {
        var js = 'if (this.__env.BooleanValue.true === ';
        js += this.children[0].compileNode() + ') {\n';
        js += this.children[1].compileNode(2);
        return utils.indent(js + '\n}\n', indent);
      };

      /**
       * Creates a node for an if-then-else conditional.
       *
       * @param condition The condition
       * @param truthyStatement The statement for true condition
       * @param falsyStatement The statement for false condition
       */
      var IfThenElse = exports.IfThenElse = function (condition, truthyStatement, falsyStatement) {
        this.type = 'IfThenElse';
        this.children = [];
        if (!condition || !truthyStatement || !falsyStatement) {
          throw new TypeError('Expected condition and conditionals.');
        }
        this.appendChild(condition);
        this.appendChild(truthyStatement);
        this.appendChild(falsyStatement);
      };

      IfThenElse.inherits(ASTNode);

      IfThenElse.prototype.compileNode = function (indent) {
        var js = utils.indent('if (this.__env.BooleanValue.true === ', indent);
        js += this.children[0].compileNode() + ') {\n';
        js += this.children[1].compileNode(indent + 2) + '\n';
        js += utils.indent('} else {\n', indent);
        js += this.children[2].compileNode(indent + 2) + '\n';
        js += utils.indent('}', indent);
        return js;
      };

      /**
       * Creates a node for a while loop.
       *
       * @param condition The condition
       * @param statement The looped statements
       */
      var WhileLoop = exports.WhileLoop = function (condition, statement) {
        this.type = 'WhileLoop';
        this.children = [];
        if (!condition || !statement) {
          throw new TypeError('Expected condition and conditional.');
        }
        this.appendChild(condition);
        this.appendChild(statement);
      };

      WhileLoop.inherits(ASTNode);

      WhileLoop.prototype.compileNode = function (indent) {
        var js = utils.indent('while (this.__env.BooleanValue.true === ', indent);
        js += this.children[0].compileNode() + ') {\n';
        js += this.children[1].compileNode(indent + 2) + '\n';
        js += utils.indent('}\n', indent);
        return js;
      };
      
      return exports;
      
    }({});
    parser.yy.utils = utils.yyUtils;

    var AlgoTools = {
      IO : new vava.env.VavaClass('IO', {
        methods : {
          println : new vava.env.VavaMethod(
            'println',
            'void',
            [{identifier: 'str', vavaType: 'int'}],
            function () { console.log(this.str.get()); }
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
      console.log(scope);
      runner.call(scope);
    }
    
    return exports;
    
  }({});
  
  return exports;
  
}({});