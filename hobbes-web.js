var hobbes = function (exports) {
  var require = 'lol', hobbes = exports;
  /**
   * hobbes -- a Java subset interpreter in JavaScript
   * (c) 2011 Johannes Emerich (jemerich@uos.de)
   * v0.1
   */
  
  // TODO
  //  - HTML- und CLI-Umgebungen
  //  - Vernuenftige Grammatik
  //  - Anschliessend Laufzeit-Umgebung nachfuegen
  
  exports.version = '0.1';
  
  
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
  
  
  
  // Based on Crockford's http://javascript.crockford.com/inheritance.html
  if (!Function.prototype.inherits) {
    Function.prototype.inherits = function (parent, constructorMembers) {
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
      // prefill constructor members
      if (constructorMembers) {
        for (var prop in constructorMembers) this[prop] = constructorMembers[prop];
      }
      // fix constructor reference
      this.prototype.constructor = this;
      return this;
    }
  }
  
  exports.utils    = function (exports) {
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
  exports.vava     = function (exports) {
  var utils = (typeof hobbes !== 'undefined' && hobbes.utils);
  
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
      return TypedValue.constructorFor(this.vavaType).defaultValue();
    };
    
    /**
     * Sets the typed value of the variable.
     *
     * Returns the typed value.
     *
     * @throws Error for wrong type
     */
    TypedVariable.prototype.set = function (typedValue) {
      
      if (this.isAssignmentCompatible(typedValue)) {
        this._setAdjusted(typedValue);
      } else {
        // TODO How to handle Vava errors?
        throw new Error("Vava Type error: Expected " + this.getVavaType() + ", but was " + typedValue.getVavaType() + ".");
      }
    
      return this.get();
      
    };
    
    
    /**
     * Sets the typed value of the variable to a potentially adjusted value
     * computed from the provided typed value.
     *
     * @param typedValue The value to adjust and assign
     */
    TypedVariable.prototype._setAdjusted = function (typedValue) {
      // Leave it to specific types to convert themselves
      this.typedValue = typedValue.to(this.vavaType);
    };
    
    /**
     * Checks if variable is of given type.
     *
     * @param vavaType Type to check for
     */
    TypedVariable.prototype.isVavaType = function (vavaType) {
      return this.getVavaType() === vavaType;
    };
    
    
    /**
     * Checks if variable is of native type.
     *
     * That is, whether it is one of {boolean, byte, short, int, long, char, float, double}.
     */
    TypedVariable.prototype.isPrimitive = function () {
      var vT = this.getVavaType();
      return (vT === "boolean" || vT === "byte" || vT === "short" || vT === "int" || vT === "long" || vT === "char" || vT === "float" || vT === "double");
    };
    
    /**
     * Checks if variable is of integral type.
     *
     * That is, whether it is one of {byte, short, int, long}.
     * TODO Might want to add `char`
     */
    TypedVariable.prototype.isIntegral = function () {
      var vT = this.getVavaType();
      return (vT === "byte" || vT === "short" || vT === "int" || vT === "long");
    };
    
    /**
     * Checks if variable is of floating point type.
     *
     * That is, whether it is one of {float, double}.
     */
    TypedVariable.prototype.isFloatingPoint = function () {
      var vT = this.getVavaType();
      return (vT === "float" || vT === "double");
    };
    
    /**
     * Checks for compatibility of own and provided type.
     *
     * TODO Autocasting for natives
     * TODO Hierarchical compatibility for reference types
     */
    TypedVariable.prototype.isAssignmentCompatible = function (typedValue) {
    
      if (this.isPrimitive()) {
        if (typedValue.getVavaType() === this.getVavaType()) return true;
        if (this.isIntegral() && typedValue.isIntegral()) return true;
        return this.isFloatingPoint() && typedValue.isFloatingPoint();
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
    
    /**
     * Increments the variable's value by one, but returns the value held before
     * incrementing.
     */
    TypedVariable.prototype.postInc = function () {
      var prior = this.get();
      this.preInc();
      return prior;
    };
    
    /**
     * Decrements the variable's value by one, but returns the value held before
     * decrementing.
     */
    TypedVariable.prototype.postDec = function () {
      var prior = this.get();
      this.preDec();
      return prior;
    };
    
    /**
     * Increments the variable's value by one, then returns its value.
     */
    TypedVariable.prototype.preInc = function () {
      if (!this.isPrimitive()) throw new Error("Incrementing only available for primitive types.");
      return this.set(this.get().add(new IntValue(1)));
    };
    
    /**
     * Decrements the variable's value by one, then returns its value.
     */
    TypedVariable.prototype.preDec = function () {
      if (!this.isPrimitive()) throw new Error("Decrementing only available for primtive types.");
      return this.set(this.get().add(new IntValue(-1)));
    };
    
    //// VALUES
    
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
    
    /**
     * Casts typed value to value of type `vavaType`.
     *
     * There is not checking here whether any such cast is in fact possible. It is
     * expected that for primitive types this checking is done at compile time.
     *
     * @param vavaType The type to cast to
     */
    TypedValue.prototype.to = function (vavaType) {
      return TypedValue.constructorFor(vavaType).intern(this.get());
    };
    
    TypedValue.prototype.isVavaType = TypedVariable.prototype.isVavaType;
    TypedValue.prototype.isPrimitive = TypedVariable.prototype.isPrimitive;
    TypedValue.prototype.isIntegral = TypedVariable.prototype.isIntegral;
    TypedValue.prototype.isFloatingPoint = TypedVariable.prototype.isFloatingPoint;
    
    /**
     * Returns a string representation of the value.
     */
    TypedValue.prototype.toString = function () {
      return String(this.get());
    };
    
    /**
     * Returns the default value for any value type.
     *
     * Overwrite for interning etc.
     */
    TypedValue.defaultValue = function () {
      return new this();
    };
    
    /**
     * Returns the constructor for the given type.
     *
     * @param vavaType The type, e.g. `int`
     */
    TypedValue.constructorFor = function (vavaType) {
      return TypedValue.constructors[vavaType] || NullValue;
    };
    
    // NATIVE TYPES
    
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
        return (this.stored[bool] = new this(bool));
    };
    
    BooleanValue.defaultValue = function () {
      return this.intern(false);
    };
    
    // LOGICAL OPERATIONS
    BooleanValue.prototype.not = function () {
      return BooleanValue.intern(!this.get());
    };
    
    BooleanValue.prototype.and = function (other) {
      return BooleanValue.intern(this.get() && other.get());
    };
    
    BooleanValue.prototype.or = function (other) {
      return BooleanValue.intern(this.get() || other.get());
    };
    
    BooleanValue.prototype.xor = function (other) {
      return BooleanValue.intern(!!(this.get() ^ other.get()));
    };
    
    //// NUMBER TYPES
    
    var NumberValue = function () {
      this.vavaType = undefined;
    };
    
    NumberValue.inherits(TypedValue);
    
    NumberValue.prototype.inverse = function () {
      return this.constructor.intern(this.get() * -1);
    };
    
    NumberValue.prototype.isLessThan = function (other) {
      return this.get() < other.get();
    };
    
    NumberValue.prototype.isGreaterThan = function (other) {
      return this.get() > other.get();
    };
    
    /**
     * Used to intern values for efficiency and object identity.
     *
     * Looks up the existing object for a given number and creates one if none is
     * present. The object is then returned.
     *
     * @param number The number to lookup/insert
     */
    NumberValue.intern = function (number) {
      if (this.stored[number])
        return this.stored[number];
      else
        return (this.stored[number] = new this(number));
    };
    
    NumberValue.defaultValue = function () {
      return this.intern(0);
    };
    
    // INTEGER VALUES
    
    var IntegralValue = function (rawValue) {
      
      this.vavaType = undefined;
      
    };
    
    IntegralValue.inherits(NumberValue);
    
    IntegralValue.checkedValue = function (rawValue) {
      if (rawValue) {
        if (isNaN(rawValue)) {
          throw new Error('Not a number!');
        }
        if (rawValue >= this.MIN_VALUE && rawValue <= this.MAX_VALUE) {
          return parseInt(rawValue, 10);
        } else {
          // Dual representation cut to length of type
          var dual = this.twosComplement(parseInt(rawValue, 10));
          // Leading bit determines sign (numspace is divided into positive and negative half)
          var mostSignificantBit = parseInt(dual.charAt(0), 2);
          // Resulting number is -(2^(BITS-1)) + decimal without leading bit
          // or decimals without leading bit, if leading bit is 0.
          return (-mostSignificantBit) * Math.pow(2, this.BITS-1) + parseInt(dual.substr(1), 2);
        }
      }
      else return 0;
    };
    
    IntegralValue.addLeadingZeros = function (dualString) {
      var i;
      for (i = dualString.length; i < this.BITS; i++) { dualString = '0' + dualString; }
      return dualString;
    };
    
    IntegralValue.twosComplement = function (num) {
      var dual = '';
      if (num >= 0) {
        dual = num.toString(2).substr(-this.BITS,this.BITS);
      } else {
        num = -num;
        var i = this.BITS,
            carry = 1,
            bit;
        // Compute, invert, add 1 in one loop
        while (num !== 0 || i > 0) {
          if (num % 2 === 0) {
            //               _ 1 + 1 = 0, carry = 1, if carry was 1
            //              /
            // 0 -invert-> 1 
            //              \_ 1 + 0 = 1, carry = 0, if carry was 0
            if (carry) {
              bit = '0';
              carry = 1;
            } else {
              bit = '1';
              carry = 0;
            }
            dual = bit + dual;
          } else {
            //               _ 0 + 1 = 1, carry = 0, if carry was 1
            //              /
            // 1 -invert-> 0
            //              \_ 0 + 0 = 0, carry = 0, if carry was 0
            dual = (carry ? '1': '0') + dual;
            carry = 0;
          }
          num = this.integerDivision(num,2);
          i--;
        }
      }
      return this.addLeadingZeros(dual);
    };
    
    IntegralValue.integerDivision = function (a, b) {
      var remainder = a % b;
      return (a - remainder) / b;
    };
    
    // ARITHMETIC
    IntegralValue.prototype.add = function (other) {
      if (other.isIntegral())
        return (other.isVavaType('long') || this.isVavaType('long') ? LongValue : IntValue).intern(this.get() + other.get());
      else
        return other.add(this);
    };
    
    IntegralValue.prototype.subtract = function (other) {
      if (other.isIntegral())
        return this.add(other.inverse());
      else
        return other.constructor.intern(this.get() - other.get());
    };
    
    IntegralValue.prototype.times = function (other) {
      if (other.isIntegral())
        return (other.isVavaType('long') || this.isVavaType('long') ? LongValue : IntValue).intern(this.get() * other.get());
      else
        return other.times(this);
    };
    
    IntegralValue.prototype.divide = function (other) {
      if (other.isIntegral()) {
        var thisRaw = this.get(),
            otherRaw = other.get();
        var remainder = thisRaw % otherRaw;
        return (other.isVavaType('long') || this.isVavaType('long') ? LongValue : IntValue).intern((thisRaw - remainder) / otherRaw);
      } else {
        // TODO What about negative/positive zero/infinity?
        return other.constructor.intern(this.get() / other.get());
      }
    };
    
    IntegralValue.prototype.modulo = function (other) {
      if (other.isIntegral())
        return (other.isVavaType('long') || this.isVavaType('long') ? LongValue : IntValue).intern(this.get() % other.get());
      else
        return other.constructor.intern(this.get() % other.get());
    };
    
    IntegralValue.prototype.and = function (other) {
      return IntValue.intern(this.get() & other.get());
    };
    
    IntegralValue.prototype.or = function (other) {
      return IntValue.intern(this.get() | other.get());
    };
    
    IntegralValue.prototype.leftshift = function (other) {
      return IntValue.intern(this.get() << other.get());
    };
    
    IntegralValue.prototype.rightshift = function (other) {
      return IntValue.intern(this.get() >> other.get());
    };
    
    IntegralValue.prototype.zerofillRightshift = function (other) {
      return IntValue.intern(this.get() >>> other.get());
    };
    
    IntegralValue.prototype.xor = function (other) {
      return IntValue.intern(this.get() ^ other.get());
    };
    
    IntegralValue.prototype.bitwiseNot = function () {
      return IntValue.intern(~this.get());
    };
    
    var ByteValue = exports.ByteValue = function (rawValue) {
    
      this.vavaType = 'byte';
      this.rawValue = this.constructor.checkedValue(rawValue);
    
    };
    
    ByteValue.inherits(IntegralValue, {stored: {}, BITS: 8, MIN_VALUE: -128, MAX_VALUE: 127});
    
    var ShortValue = exports.ShortValue = function (rawValue) {
    
      this.vavaType = 'short';
      this.rawValue = this.constructor.checkedValue(rawValue);
    
    };
    
    ShortValue.inherits(IntegralValue, {stored: {}, BITS: 16, MIN_VALUE: -32768, MAX_VALUE: 32767});
    
    var IntValue = exports.IntValue = function (rawValue) {
    
      this.vavaType = 'int';
      this.rawValue = this.constructor.checkedValue(rawValue);
    
    };
    
    IntValue.inherits(IntegralValue, {stored: {}, BITS: 32, MIN_VALUE: -2147483648, MAX_VALUE: 2147483647});
    
    var LongValue = exports.LongValue = function (rawValue) {
    
      this.vavaType = 'long';
      this.rawValue = this.constructor.checkedValue(rawValue);
    
    };
    
    // TODO `long` seems to be too much for JS
    LongValue.inherits(IntegralValue, {stored: {}, BITS: 64, MIN_VALUE: -9223372036854775808, MAX_VALUE: 9223372036854775807});
    
    var CharValue = exports.CharValue = function (charOrCharCode) {
    
      var charCode = typeof charOrCharCode === 'string' ? charOrCharCode.charCodeAt(0) : charOrCharCode;
      this.vavaType = 'char';
      this.rawValue = this.constructor.checkedValue(charCode);
    
    };
    
    CharValue.inherits(IntegralValue, {stored: {}, BITS: 16, MIN_VALUE: 0, MAX_VALUE: 65534});
    
    CharValue.checkedValue = function (rawValue) {
      if (rawValue) {
        if (isNaN(rawValue)) {
          throw new Error('Not a number!');
        }
        if (rawValue > this.MIN_VALUE && rawValue < this.MAX_VALUE) {
          return parseInt(rawValue, 10);
        } else {
          // Dual representation cut to length of type
          var dual = parseInt(rawValue, 10).toString(2).substr(-this.BITS,this.BITS);
          return parseInt(dual, 2);
        }
      }
      else return 0;
    };
    
    CharValue.prototype.toString = function () {
      return String.fromCharCode(this.rawValue);
    };
    
    // FLOATING POINT TYPES
    
    var FloatingPointValue = function () {
      this.vavaType = undefined;
    };
    
    FloatingPointValue.inherits(NumberValue);
    
    FloatingPointValue.checkedValue = function (rawValue) {
      // Actual NaN
      if (String(rawValue) === 'NaN')
        return NaN;
      if (isNaN(rawValue)) {
        throw new Error('Not a number in floating point constructor');
      }
      if (rawValue > this.MAX_VALUE) return Number.POSITIVE_INFINITY;
      if (rawValue < -this.MAX_VALUE) return Number.NEGATIVE_INFINITY;
      if (rawValue > 0 && rawValue < this.MIN_VALUE) return 1e-46;
      if (rawValue < 0 && rawValue > -this.MIN_VALUE) return -1e-46;
      return rawValue;
    };
    
    FloatingPointValue.prototype.add = function (other) {
      return this.constructor.intern(this.get() + other.get());
    };
    
    FloatingPointValue.prototype.subtract = function (other) {
      return this.add(other.inverse());
    };
    
    FloatingPointValue.prototype.times = function (other) {
      return this.constructor.intern(this.get() * other.get());
    };
    
    FloatingPointValue.prototype.divide = function (other) {
      var thisRaw = this.get(),
          otherRaw = other.get();
      if (otherRaw === 0) {
        if (thisRaw === 0)
          return this.constructor.intern(NaN);
      }
      
      return this.constructor.intern(this.get() / other.get());
    };
    
    FloatingPointValue.prototype.modulo = function (other) {
      return this.constructor.intern(this.get() % other.get());
    };
    
    FloatingPointValue.prototype.toString = function () {
      var value = this.get();
      return parseInt(value, 10) === value ? value.toFixed(1) : value;
    };
    
    var FloatValue = exports.FloatValue = function (rawValue) {
      
      this.vavaType = 'float';
      this.rawValue = this.constructor.checkedValue(rawValue);
    
    };
    
    FloatValue.inherits(FloatingPointValue, {stored: {}, MIN_VALUE: 1.40239846e-45, MAX_VALUE: 3.40282347e+38});
    
    var DoubleValue = exports.DoubleValue = function (rawValue) {
      
      this.vavaType = 'double';
      this.rawValue = this.constructor.checkedValue(rawValue);
    
    };
    
    DoubleValue.inherits(FloatingPointValue, {stored: {}, MIN_VALUE: 4.94065645841246544e-324, MAX_VALUE: 1.79769313486231570e+308});
    
    //// STRING TYPE
    
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
    
    //// REFERENCE TYPES
    
    var NullValue = exports.NullValue = function () {
      this.vavaType = 'null';
    
      this.rawValue = null;
    };
    
    NullValue.inherits(TypedValue);
    
    NullValue.intern = function () {
      return NullValue.stored['null'];
    };
    
    NullValue.stored = {
      'null' : new NullValue()
    };
    
    //// NEEDS TO BE AT THE END
    // Lookup table for constructors for simple (?) types
    TypedValue.constructors = {
      "boolean" : BooleanValue,
      "byte" : ByteValue,
      "short" : ShortValue,
      "int" : IntValue,
      "long" : LongValue,
      "char" : CharValue,
      "float" : FloatValue,
      "double" : DoubleValue
    };
  
    return exports;
  
  }({});
  
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
  
  exports.env = utils.merge(
    vavaClass,
    vavaMethod,
    vavaType
  );
  
    return exports;
  
  }({});
  exports.stdlib   = function (exports) {
  exports.java = function (exports) {
    // TODO That's cute! How can I make this look less stupid?
    exports.lang = typeof require === 'function' ? require('./java/lang-node') : require('./java/lang-web');
  
    return exports;
  
  }({});
  
    return exports;
  
  }({});
  exports.compiler = function (exports) {
  var utils = (typeof hobbes !== 'undefined' && hobbes.utils);
  var vava = (typeof hobbes !== 'undefined' && hobbes.vava);
  var stdlib = (typeof hobbes !== 'undefined' && hobbes.stdlib);
  var parser = exports.parser = function (exports) {
    /* Jison generated parser */
    var vava_proper = (function(){
    var parser = {trace: function trace() { },
    yy: {},
    symbols_: {"error":2,"compilation_unit":3,"EOF":4,"package_declaration":5,"import_declarations":6,"type_declarations":7,"KEYWORD_PACKAGE":8,"IDENTIFIER":9,"LINE_TERMINATOR":10,"import_declaration":11,"KEYWORD_IMPORT":12,"name":13,"type_declaration":14,"class_declaration":15,"KEYWORD_CLASS":16,"class_body":17,"MODIFIER_PUBLIC":18,"EMBRACE":19,"class_body_declarations":20,"UNBRACE":21,"class_body_declaration":22,"class_member_declaration":23,"field_declaration":24,"method_declaration":25,"type":26,"variable_declarators":27,"method_header":28,"method_body":29,"method_declarator":30,"MODIFIER_STATIC":31,"MODIFIER_VOID":32,"LEFT_PAREN":33,"formal_parameter_list":34,"RIGHT_PAREN":35,"STRING_TYPE":36,"LEFT_BRACKET":37,"RIGHT_BRACKET":38,"formal_parameter":39,"formal_parameters":40,"COMMA":41,"variable_declarator_id":42,"block":43,"variable_declarator":44,"OPERATOR_ASSIGNMENT":45,"variable_initializer":46,"expression":47,"primitive_type":48,"numeric_type":49,"PRIMITIVE_BOOLEAN":50,"integral_type":51,"floating_point_type":52,"PRIMITIVE_BYTE":53,"PRIMITIVE_SHORT":54,"PRIMITIVE_INTEGER":55,"PRIMITIVE_LONG":56,"PRIMITIVE_CHAR":57,"PRIMITIVE_FLOAT":58,"PRIMITIVE_DOUBLE":59,"block_statements":60,"block_statement":61,"local_variable_declaration_statement":62,"statement":63,"local_variable_declaration":64,"statement_without_trailing_substatement":65,"if_then_else_statement":66,"if_then_statement":67,"while_statement":68,"empty_statement":69,"expression_statement":70,"KEYWORD_IF":71,"statement_no_short_if":72,"KEYWORD_ELSE":73,"labeled_statement_no_short_if":74,"if_then_else_statement_no_short_if":75,"while_statement_no_short_if":76,"for_statement_no_short_if":77,"KEYWORD_WHILE":78,"statement_expression":79,"assignment":80,"method_invocation":81,"simple_name":82,"qualified_name":83,"SEPARATOR_DOT":84,"left_hand_side":85,"conditional_expression":86,"assignment_expression":87,"conditional_or_expression":88,"conditional_and_expression":89,"OPERATOR_LOGICAL_OR":90,"inclusive_or_expression":91,"OPERATOR_LOGICAL_AND":92,"exclusive_or_expression":93,"OPERATOR_INCLUSIVE_OR":94,"and_expression":95,"OPERATOR_XOR":96,"equality_expression":97,"OPERATOR_INCLUSIVE_AND":98,"relational_expression":99,"OPERATOR_EQUAL":100,"OPERATOR_NOT_EQUAL":101,"shift_expression":102,"OPERATOR_LESS_THAN":103,"OPERATOR_LESS_THAN_EQUAL":104,"OPERATOR_GREATER_THAN":105,"OPERATOR_GREATER_THAN_EQUAL":106,"additive_expression":107,"OPERATOR_LEFTSHIFT":108,"OPERATOR_RIGHTSHIFT":109,"OPERATOR_ZEROFILL_RIGHTSHIFT":110,"multiplicative_expression":111,"OPERATOR_ADDITION":112,"OPERATOR_SUBTRACTION":113,"unary_expression":114,"OPERATOR_MULTIPLICATION":115,"OPERATOR_DIVISON":116,"OPERATOR_MODULO":117,"pre_increment_expression":118,"pre_decrement_expression":119,"unary_expression_not_plus_minus":120,"post_increment_expression":121,"OPERATOR_INCREMENT":122,"postfix_expression":123,"post_decrement_expression":124,"OPERATOR_DECREMENT":125,"OPERATOR_BITWISE_NEGATION":126,"OPERATOR_NEGATION":127,"cast_expression":128,"primary":129,"literal":130,"integer_literal":131,"char_literal":132,"floating_point_literal":133,"boolean_literal":134,"string_literal":135,"null_literal":136,"argument_list":137,"TRUE_LITERAL":138,"FALSE_LITERAL":139,"DECIMAL_INTEGER_LITERAL":140,"CHAR_LITERAL":141,"NULL_LITERAL":142,"FLOATING_POINT_LITERAL":143,"STRING_LITERAL":144,"$accept":0,"$end":1},
    terminals_: {2:"error",4:"EOF",8:"KEYWORD_PACKAGE",9:"IDENTIFIER",10:"LINE_TERMINATOR",12:"KEYWORD_IMPORT",16:"KEYWORD_CLASS",18:"MODIFIER_PUBLIC",19:"EMBRACE",21:"UNBRACE",31:"MODIFIER_STATIC",32:"MODIFIER_VOID",33:"LEFT_PAREN",35:"RIGHT_PAREN",36:"STRING_TYPE",37:"LEFT_BRACKET",38:"RIGHT_BRACKET",40:"formal_parameters",41:"COMMA",45:"OPERATOR_ASSIGNMENT",50:"PRIMITIVE_BOOLEAN",53:"PRIMITIVE_BYTE",54:"PRIMITIVE_SHORT",55:"PRIMITIVE_INTEGER",56:"PRIMITIVE_LONG",57:"PRIMITIVE_CHAR",58:"PRIMITIVE_FLOAT",59:"PRIMITIVE_DOUBLE",71:"KEYWORD_IF",73:"KEYWORD_ELSE",74:"labeled_statement_no_short_if",75:"if_then_else_statement_no_short_if",76:"while_statement_no_short_if",77:"for_statement_no_short_if",78:"KEYWORD_WHILE",84:"SEPARATOR_DOT",90:"OPERATOR_LOGICAL_OR",92:"OPERATOR_LOGICAL_AND",94:"OPERATOR_INCLUSIVE_OR",96:"OPERATOR_XOR",98:"OPERATOR_INCLUSIVE_AND",100:"OPERATOR_EQUAL",101:"OPERATOR_NOT_EQUAL",103:"OPERATOR_LESS_THAN",104:"OPERATOR_LESS_THAN_EQUAL",105:"OPERATOR_GREATER_THAN",106:"OPERATOR_GREATER_THAN_EQUAL",108:"OPERATOR_LEFTSHIFT",109:"OPERATOR_RIGHTSHIFT",110:"OPERATOR_ZEROFILL_RIGHTSHIFT",112:"OPERATOR_ADDITION",113:"OPERATOR_SUBTRACTION",115:"OPERATOR_MULTIPLICATION",116:"OPERATOR_DIVISON",117:"OPERATOR_MODULO",118:"pre_increment_expression",119:"pre_decrement_expression",122:"OPERATOR_INCREMENT",125:"OPERATOR_DECREMENT",126:"OPERATOR_BITWISE_NEGATION",127:"OPERATOR_NEGATION",138:"TRUE_LITERAL",139:"FALSE_LITERAL",140:"DECIMAL_INTEGER_LITERAL",141:"CHAR_LITERAL",142:"NULL_LITERAL",143:"FLOATING_POINT_LITERAL",144:"STRING_LITERAL"},
    productions_: [0,[3,1],[3,2],[3,2],[3,2],[3,3],[3,3],[3,3],[3,4],[5,3],[6,1],[6,2],[11,3],[7,1],[14,1],[15,3],[15,4],[17,3],[20,1],[20,2],[22,1],[23,1],[23,1],[24,3],[25,2],[28,2],[28,4],[30,4],[30,7],[34,1],[34,3],[39,2],[29,1],[27,1],[27,3],[44,1],[44,3],[42,1],[46,1],[26,1],[48,1],[48,1],[49,1],[49,1],[51,1],[51,1],[51,1],[51,1],[51,1],[52,1],[52,1],[43,2],[43,3],[60,1],[60,2],[61,1],[61,1],[62,2],[64,2],[63,1],[63,1],[63,1],[63,1],[65,1],[65,1],[65,1],[67,5],[66,7],[72,1],[72,1],[72,1],[72,1],[72,1],[68,5],[69,1],[70,2],[79,1],[79,1],[13,1],[13,1],[82,1],[83,3],[80,3],[85,1],[47,1],[87,1],[87,1],[86,1],[88,1],[88,3],[89,1],[89,3],[91,1],[91,3],[93,1],[93,3],[95,1],[95,3],[97,1],[97,3],[97,3],[99,1],[99,3],[99,3],[99,3],[99,3],[102,1],[102,3],[102,3],[102,3],[107,1],[107,3],[107,3],[111,1],[111,3],[111,3],[111,3],[114,1],[114,1],[114,2],[114,2],[114,1],[121,2],[121,2],[124,2],[124,2],[120,1],[120,2],[120,2],[120,1],[123,1],[123,1],[123,1],[123,1],[128,4],[129,1],[129,1],[130,1],[130,1],[130,1],[130,1],[130,1],[130,1],[81,3],[81,4],[137,1],[137,3],[134,1],[134,1],[131,1],[132,1],[136,1],[133,1],[135,1]],
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
    case 28: this.$ = {vavaIdentifier: $$[$0-6], vavaFormalParameters: []}; 
    break;
    case 29: this.$ = [$$[$0]]; 
    break;
    case 30: this.$ = $$[$0-2]; this.$.push($$[$0]); 
    break;
    case 31: this.$ = new yy.FormalParameter($$[$0-1], $$[$0]); 
    break;
    case 32: this.$ = $$[$0]; 
    break;
    case 33: this.$ = new yy.VariableDeclarators($$[$0]); 
    break;
    case 34: $$[$0-2].appendChild($$[$0]); this.$ = $$[$0-2]; 
    break;
    case 35: this.$ = new yy.VariableDeclarator($$[$0]); 
    break;
    case 36: this.$ = new yy.VariableDeclarator($$[$0-2], $$[$0]); 
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
    case 45: this.$ = $$[$0]; 
    break;
    case 46: this.$ = $$[$0]; 
    break;
    case 47: this.$ = $$[$0]; 
    break;
    case 48: this.$ = $$[$0]; 
    break;
    case 49: this.$ = $$[$0]; 
    break;
    case 50: this.$ = $$[$0]; 
    break;
    case 51: this.$ = new yy.Block(); 
    break;
    case 52: this.$ = new yy.Block($$[$0-1]); 
    break;
    case 53: this.$ = [$$[$0]]; 
    break;
    case 54: this.$ = $$[$0-1]; this.$.push($$[$0]); 
    break;
    case 55: this.$ = $$[$0]; 
    break;
    case 56: this.$ = $$[$0]; 
    break;
    case 57: this.$ = $$[$0-1]; 
    break;
    case 58: this.$ = new yy.LocalVariableDeclaration($$[$0-1], $$[$0]); 
    break;
    case 59: this.$ = $$[$0]; 
    break;
    case 60: this.$ = $$[$0]; 
    break;
    case 61: this.$ = $$[$0]; 
    break;
    case 62: this.$ = $$[$0]; 
    break;
    case 63: this.$ = $$[$0]; 
    break;
    case 64: this.$ = $$[$0]; 
    break;
    case 65: this.$ = $$[$0]; 
    break;
    case 66: this.$ = new yy.IfThen($$[$0-2], $$[$0]); 
    break;
    case 67: this.$ = new yy.IfThenElse($$[$0-4], $$[$0-2], $$[$0]); 
    break;
    case 68: this.$ = $$[$0]; 
    break;
    case 69: this.$ = $$[$0]; 
    break;
    case 70: this.$ = $$[$0]; 
    break;
    case 71: this.$ = $$[$0]; 
    break;
    case 72: this.$ = $$[$0]; 
    break;
    case 73: this.$ = new yy.WhileLoop($$[$0-2], $$[$0]); 
    break;
    case 74: this.$ = new yy.ASTNode(); 
    break;
    case 75: this.$ = new yy.ExpressionStatement($$[$0-1]); 
    break;
    case 76: this.$ = $$[$0]; 
    break;
    case 77: this.$ = $$[$0]; 
    break;
    case 78: this.$ = $$[$0]; 
    break;
    case 79: this.$ = $$[$0]; 
    break;
    case 80: this.$ = new yy.Name($$[$0]); 
    break;
    case 81: this.$ = new yy.Name($$[$0-2].qualified() + '.' + $$[$0]); 
    break;
    case 82: this.$ = new yy.Assignment($$[$0-2], $$[$0]); 
    break;
    case 83: this.$ = $$[$0]; 
    break;
    case 84: this.$ = $$[$0]; 
    break;
    case 85: this.$ = $$[$0]; 
    break;
    case 86: this.$ = $$[$0]; 
    break;
    case 87: this.$ = $$[$0]; 
    break;
    case 88: this.$ = $$[$0]; 
    break;
    case 89: this.$ = new yy.LogicalOr($$[$0-2], $$[$0]); 
    break;
    case 90: this.$ = $$[$0]; 
    break;
    case 91: this.$ = new yy.LogicalAnd($$[$0-2], $$[$0]); 
    break;
    case 92: this.$ = $$[$0]; 
    break;
    case 93: this.$ = new yy.InclusiveOr($$[$0-2], $$[$0]); 
    break;
    case 94: this.$ = $$[$0]; 
    break;
    case 95: this.$ = new yy.ExclusiveOr($$[$0-2], $$[$0]); 
    break;
    case 96: this.$ = $$[$0]; 
    break;
    case 97: this.$ = new yy.InclusiveAnd($$[$0-2], $$[$0]); 
    break;
    case 98: this.$ = $$[$0]; 
    break;
    case 99: this.$ = new yy.Equals($$[$0-2], $$[$0]); 
    break;
    case 100: this.$ = new yy.NotEquals($$[$0-2], $$[$0]); 
    break;
    case 101: this.$ = $$[$0]; 
    break;
    case 102: this.$ = new yy.LessThan($$[$0-2], $$[$0]); 
    break;
    case 103: this.$ = new yy.LogicalOr(new yy.LessThan($$[$0-2], $$[$0]), new yy.Equals($$[$0-2], $$[$0])); 
    break;
    case 104: this.$ = new yy.GreaterThan($$[$0-2], $$[$0]); 
    break;
    case 105: this.$ = new yy.LogicalOr(new yy.GreaterThan($$[$0-2], $$[$0]), new yy.Equals($$[$0-2], $$[$0])); 
    break;
    case 106: this.$ = $$[$0]; 
    break;
    case 107: this.$ = new yy.LeftShift($$[$0-2], $$[$0]); 
    break;
    case 108: this.$ = new yy.RightShift($$[$0-2], $$[$0]); 
    break;
    case 109: this.$ = new yy.ZeroFillRightShift($$[$0-2], $$[$0]); 
    break;
    case 110: this.$ = $$[$0]; 
    break;
    case 111: this.$ = new yy.Addition($$[$0-2], $$[$0]); 
    break;
    case 112: this.$ = new yy.Subtraction($$[$0-2], $$[$0]); 
    break;
    case 113: this.$ = $$[$0]; 
    break;
    case 114: this.$ = new yy.Multiplication($$[$0-2], $$[$0]); 
    break;
    case 115: this.$ = new yy.Division($$[$0-2], $$[$0]); 
    break;
    case 116: this.$ = new yy.Modulo($$[$0-2], $$[$0]); 
    break;
    case 117: this.$ = $$[$0]; 
    break;
    case 118: this.$ = $$[$0]; 
    break;
    case 119: this.$ = new yy.UnaryMinus($$[$0]); 
    break;
    case 120: this.$ = new yy.UnaryPlus($$[$0]); 
    break;
    case 121: this.$ = $$[$0]; 
    break;
    case 122: this.$ = new yy.PreIncrement($$[$0]); 
    break;
    case 123: this.$ = new yy.PostIncrement($$[$0-1]); 
    break;
    case 124: this.$ = new yy.PreDecrement($$[$0]); 
    break;
    case 125: this.$ = new yy.PostDecrement($$[$0-1]); 
    break;
    case 126: this.$ = $$[$0]; 
    break;
    case 127: this.$ = new yy.BitwiseNegation($$[$0]); 
    break;
    case 128: this.$ = new yy.Negation($$[$0]); 
    break;
    case 129: this.$ = $$[$0]; 
    break;
    case 130: this.$ = $$[$0]; 
    break;
    case 131: this.$ = $$[$0]; 
    break;
    case 132: this.$ = $$[$0]; 
    break;
    case 133: this.$ = $$[$0]; 
    break;
    case 134: this.$ = new yy.CastExpression($$[$0-2], $$[$0]); 
    break;
    case 135: this.$ = $$[$0]; 
    break;
    case 136: this.$ = $$[$0]; 
    break;
    case 137: this.$ = $$[$0]; 
    break;
    case 138: this.$ = $$[$0]; 
    break;
    case 139: this.$ = $$[$0]; 
    break;
    case 140: this.$ = $$[$0]; 
    break;
    case 141: this.$ = $$[$0]; 
    break;
    case 142: this.$ = $$[$0]; 
    break;
    case 143: this.$ = new yy.MethodInvocation($$[$0-2]); 
    break;
    case 144: this.$ = new yy.MethodInvocation($$[$0-3], $$[$0-1]); 
    break;
    case 145: this.$ = new yy.ArgumentList($$[$0]); 
    break;
    case 146: $$[$0-2].appendChild($$[$0]); this.$ = $$[$0-2]; 
    break;
    case 147: this.$ = new yy.BooleanLiteral($$[$0]); 
    break;
    case 148: this.$ = new yy.BooleanLiteral($$[$0]); 
    break;
    case 149: this.$ = new yy.IntegerLiteral($$[$0]); 
    break;
    case 150: this.$ = new yy.CharLiteral($$[$0]); 
    break;
    case 151: this.$ = new yy.NullLiteral($$[$0]); 
    break;
    case 152: this.$ = new yy.FloatingPointLiteral($$[$0]); 
    break;
    case 153: this.$ = new yy.StringLiteral($$[$0]); 
    break;
    }
    },
    table: [{3:1,4:[1,2],5:3,6:4,7:5,8:[1,6],11:7,12:[1,9],14:8,15:10,16:[1,11],18:[1,12]},{1:[3]},{1:[2,1]},{4:[1,13],6:14,7:15,11:7,12:[1,9],14:8,15:10,16:[1,11],18:[1,12]},{4:[1,16],7:17,11:18,12:[1,9],14:8,15:10,16:[1,11],18:[1,12]},{4:[1,19]},{9:[1,20]},{4:[2,10],12:[2,10],16:[2,10],18:[2,10]},{4:[2,13]},{9:[1,24],13:21,82:22,83:23},{4:[2,14]},{9:[1,25]},{16:[1,26]},{1:[2,2]},{4:[1,27],7:28,11:18,12:[1,9],14:8,15:10,16:[1,11],18:[1,12]},{4:[1,29]},{1:[2,3]},{4:[1,30]},{4:[2,11],12:[2,11],16:[2,11],18:[2,11]},{1:[2,4]},{10:[1,31]},{10:[1,32],84:[1,33]},{10:[2,78],33:[2,78],35:[2,78],41:[2,78],45:[2,78],84:[2,78],90:[2,78],92:[2,78],94:[2,78],96:[2,78],98:[2,78],100:[2,78],101:[2,78],103:[2,78],104:[2,78],105:[2,78],106:[2,78],108:[2,78],109:[2,78],110:[2,78],112:[2,78],113:[2,78],115:[2,78],116:[2,78],117:[2,78],122:[2,78],125:[2,78]},{10:[2,79],33:[2,79],35:[2,79],41:[2,79],45:[2,79],84:[2,79],90:[2,79],92:[2,79],94:[2,79],96:[2,79],98:[2,79],100:[2,79],101:[2,79],103:[2,79],104:[2,79],105:[2,79],106:[2,79],108:[2,79],109:[2,79],110:[2,79],112:[2,79],113:[2,79],115:[2,79],116:[2,79],117:[2,79],122:[2,79],125:[2,79]},{10:[2,80],33:[2,80],35:[2,80],41:[2,80],45:[2,80],84:[2,80],90:[2,80],92:[2,80],94:[2,80],96:[2,80],98:[2,80],100:[2,80],101:[2,80],103:[2,80],104:[2,80],105:[2,80],106:[2,80],108:[2,80],109:[2,80],110:[2,80],112:[2,80],113:[2,80],115:[2,80],116:[2,80],117:[2,80],122:[2,80],125:[2,80]},{17:34,19:[1,35]},{9:[1,36]},{1:[2,5]},{4:[1,37]},{1:[2,6]},{1:[2,7]},{4:[2,9],12:[2,9],16:[2,9],18:[2,9]},{4:[2,12],12:[2,12],16:[2,12],18:[2,12]},{9:[1,38]},{4:[2,15]},{18:[1,47],20:39,22:40,23:41,24:42,25:43,26:44,28:45,48:46,49:48,50:[1,49],51:50,52:51,53:[1,52],54:[1,53],55:[1,54],56:[1,55],57:[1,56],58:[1,57],59:[1,58]},{17:59,19:[1,35]},{1:[2,8]},{10:[2,81],33:[2,81],35:[2,81],41:[2,81],45:[2,81],84:[2,81],90:[2,81],92:[2,81],94:[2,81],96:[2,81],98:[2,81],100:[2,81],101:[2,81],103:[2,81],104:[2,81],105:[2,81],106:[2,81],108:[2,81],109:[2,81],110:[2,81],112:[2,81],113:[2,81],115:[2,81],116:[2,81],117:[2,81],122:[2,81],125:[2,81]},{18:[1,47],21:[1,60],22:61,23:41,24:42,25:43,26:44,28:45,48:46,49:48,50:[1,49],51:50,52:51,53:[1,52],54:[1,53],55:[1,54],56:[1,55],57:[1,56],58:[1,57],59:[1,58]},{18:[2,18],21:[2,18],50:[2,18],53:[2,18],54:[2,18],55:[2,18],56:[2,18],57:[2,18],58:[2,18],59:[2,18]},{18:[2,20],21:[2,20],50:[2,20],53:[2,20],54:[2,20],55:[2,20],56:[2,20],57:[2,20],58:[2,20],59:[2,20]},{18:[2,21],21:[2,21],50:[2,21],53:[2,21],54:[2,21],55:[2,21],56:[2,21],57:[2,21],58:[2,21],59:[2,21]},{18:[2,22],21:[2,22],50:[2,22],53:[2,22],54:[2,22],55:[2,22],56:[2,22],57:[2,22],58:[2,22],59:[2,22]},{9:[1,65],27:62,30:63,42:66,44:64},{19:[1,69],29:67,43:68},{9:[2,39]},{31:[1,70]},{9:[2,40],35:[2,40]},{9:[2,41],35:[2,41]},{9:[2,42],35:[2,42]},{9:[2,43],35:[2,43]},{9:[2,44],35:[2,44]},{9:[2,45],35:[2,45]},{9:[2,46],35:[2,46]},{9:[2,47],35:[2,47]},{9:[2,48],35:[2,48]},{9:[2,49],35:[2,49]},{9:[2,50],35:[2,50]},{4:[2,16]},{4:[2,17]},{18:[2,19],21:[2,19],50:[2,19],53:[2,19],54:[2,19],55:[2,19],56:[2,19],57:[2,19],58:[2,19],59:[2,19]},{10:[1,71],41:[1,72]},{19:[2,25]},{10:[2,33],41:[2,33]},{10:[2,37],33:[1,73],41:[2,37],45:[2,37]},{10:[2,35],41:[2,35],45:[1,74]},{18:[2,24],21:[2,24],50:[2,24],53:[2,24],54:[2,24],55:[2,24],56:[2,24],57:[2,24],58:[2,24],59:[2,24]},{18:[2,32],21:[2,32],50:[2,32],53:[2,32],54:[2,32],55:[2,32],56:[2,32],57:[2,32],58:[2,32],59:[2,32]},{9:[1,24],10:[1,91],13:96,19:[1,69],21:[1,75],26:85,43:86,48:46,49:48,50:[1,49],51:50,52:51,53:[1,52],54:[1,53],55:[1,54],56:[1,55],57:[1,56],58:[1,57],59:[1,58],60:76,61:77,62:78,63:79,64:80,65:81,66:82,67:83,68:84,69:87,70:88,71:[1,89],78:[1,90],79:92,80:93,81:94,82:22,83:23,85:95},{32:[1,97]},{18:[2,23],21:[2,23],50:[2,23],53:[2,23],54:[2,23],55:[2,23],56:[2,23],57:[2,23],58:[2,23],59:[2,23]},{9:[1,99],42:66,44:98},{26:104,34:100,36:[1,101],39:102,40:[1,103],48:46,49:48,50:[1,49],51:50,52:51,53:[1,52],54:[1,53],55:[1,54],56:[1,55],57:[1,56],58:[1,57],59:[1,58]},{9:[1,24],13:129,33:[1,132],46:105,47:106,81:134,82:22,83:23,86:107,88:108,89:109,91:110,93:111,95:112,97:113,99:114,102:115,107:116,111:117,112:[1,122],113:[1,121],114:118,118:[1,119],119:[1,120],120:123,121:130,122:[1,135],123:124,124:131,125:[1,136],126:[1,125],127:[1,126],128:127,129:128,130:133,131:137,132:138,133:139,134:140,135:141,136:142,138:[1,146],139:[1,147],140:[1,143],141:[1,144],142:[1,149],143:[1,145],144:[1,148]},{9:[2,51],10:[2,51],18:[2,51],19:[2,51],21:[2,51],50:[2,51],53:[2,51],54:[2,51],55:[2,51],56:[2,51],57:[2,51],58:[2,51],59:[2,51],71:[2,51],73:[2,51],78:[2,51]},{9:[1,24],10:[1,91],13:96,19:[1,69],21:[1,150],26:85,43:86,48:46,49:48,50:[1,49],51:50,52:51,53:[1,52],54:[1,53],55:[1,54],56:[1,55],57:[1,56],58:[1,57],59:[1,58],61:151,62:78,63:79,64:80,65:81,66:82,67:83,68:84,69:87,70:88,71:[1,89],78:[1,90],79:92,80:93,81:94,82:22,83:23,85:95},{9:[2,53],10:[2,53],19:[2,53],21:[2,53],50:[2,53],53:[2,53],54:[2,53],55:[2,53],56:[2,53],57:[2,53],58:[2,53],59:[2,53],71:[2,53],78:[2,53]},{9:[2,55],10:[2,55],19:[2,55],21:[2,55],50:[2,55],53:[2,55],54:[2,55],55:[2,55],56:[2,55],57:[2,55],58:[2,55],59:[2,55],71:[2,55],78:[2,55]},{9:[2,56],10:[2,56],19:[2,56],21:[2,56],50:[2,56],53:[2,56],54:[2,56],55:[2,56],56:[2,56],57:[2,56],58:[2,56],59:[2,56],71:[2,56],78:[2,56]},{10:[1,152]},{9:[2,59],10:[2,59],19:[2,59],21:[2,59],50:[2,59],53:[2,59],54:[2,59],55:[2,59],56:[2,59],57:[2,59],58:[2,59],59:[2,59],71:[2,59],78:[2,59]},{9:[2,60],10:[2,60],19:[2,60],21:[2,60],50:[2,60],53:[2,60],54:[2,60],55:[2,60],56:[2,60],57:[2,60],58:[2,60],59:[2,60],71:[2,60],78:[2,60]},{9:[2,61],10:[2,61],19:[2,61],21:[2,61],50:[2,61],53:[2,61],54:[2,61],55:[2,61],56:[2,61],57:[2,61],58:[2,61],59:[2,61],71:[2,61],78:[2,61]},{9:[2,62],10:[2,62],19:[2,62],21:[2,62],50:[2,62],53:[2,62],54:[2,62],55:[2,62],56:[2,62],57:[2,62],58:[2,62],59:[2,62],71:[2,62],78:[2,62]},{9:[1,99],27:153,42:66,44:64},{9:[2,63],10:[2,63],19:[2,63],21:[2,63],50:[2,63],53:[2,63],54:[2,63],55:[2,63],56:[2,63],57:[2,63],58:[2,63],59:[2,63],71:[2,63],73:[2,63],78:[2,63]},{9:[2,64],10:[2,64],19:[2,64],21:[2,64],50:[2,64],53:[2,64],54:[2,64],55:[2,64],56:[2,64],57:[2,64],58:[2,64],59:[2,64],71:[2,64],73:[2,64],78:[2,64]},{9:[2,65],10:[2,65],19:[2,65],21:[2,65],50:[2,65],53:[2,65],54:[2,65],55:[2,65],56:[2,65],57:[2,65],58:[2,65],59:[2,65],71:[2,65],73:[2,65],78:[2,65]},{33:[1,154]},{33:[1,155]},{9:[2,74],10:[2,74],19:[2,74],21:[2,74],50:[2,74],53:[2,74],54:[2,74],55:[2,74],56:[2,74],57:[2,74],58:[2,74],59:[2,74],71:[2,74],73:[2,74],78:[2,74]},{10:[1,156]},{10:[2,76]},{10:[2,77]},{45:[1,157]},{33:[1,158],45:[2,83],84:[1,33]},{9:[1,160],30:159},{10:[2,34],41:[2,34]},{10:[2,37],35:[2,37],41:[2,37],45:[2,37]},{35:[1,161]},{37:[1,162]},{35:[2,29]},{41:[1,163]},{9:[1,99],42:164},{10:[2,36],41:[2,36]},{10:[2,38],41:[2,38]},{10:[2,84],35:[2,84],41:[2,84]},{10:[2,87],35:[2,87],41:[2,87],90:[1,165]},{10:[2,88],35:[2,88],41:[2,88],90:[2,88],92:[1,166]},{10:[2,90],35:[2,90],41:[2,90],90:[2,90],92:[2,90],94:[1,167]},{10:[2,92],35:[2,92],41:[2,92],90:[2,92],92:[2,92],94:[2,92],96:[1,168]},{10:[2,94],35:[2,94],41:[2,94],90:[2,94],92:[2,94],94:[2,94],96:[2,94],98:[1,169]},{10:[2,96],35:[2,96],41:[2,96],90:[2,96],92:[2,96],94:[2,96],96:[2,96],98:[2,96],100:[1,170],101:[1,171]},{10:[2,98],35:[2,98],41:[2,98],90:[2,98],92:[2,98],94:[2,98],96:[2,98],98:[2,98],100:[2,98],101:[2,98],103:[1,172],104:[1,173],105:[1,174],106:[1,175]},{10:[2,101],35:[2,101],41:[2,101],90:[2,101],92:[2,101],94:[2,101],96:[2,101],98:[2,101],100:[2,101],101:[2,101],103:[2,101],104:[2,101],105:[2,101],106:[2,101],108:[1,176],109:[1,177],110:[1,178]},{10:[2,106],35:[2,106],41:[2,106],90:[2,106],92:[2,106],94:[2,106],96:[2,106],98:[2,106],100:[2,106],101:[2,106],103:[2,106],104:[2,106],105:[2,106],106:[2,106],108:[2,106],109:[2,106],110:[2,106],112:[1,179],113:[1,180]},{10:[2,110],35:[2,110],41:[2,110],90:[2,110],92:[2,110],94:[2,110],96:[2,110],98:[2,110],100:[2,110],101:[2,110],103:[2,110],104:[2,110],105:[2,110],106:[2,110],108:[2,110],109:[2,110],110:[2,110],112:[2,110],113:[2,110],115:[1,181],116:[1,182],117:[1,183]},{10:[2,113],35:[2,113],41:[2,113],90:[2,113],92:[2,113],94:[2,113],96:[2,113],98:[2,113],100:[2,113],101:[2,113],103:[2,113],104:[2,113],105:[2,113],106:[2,113],108:[2,113],109:[2,113],110:[2,113],112:[2,113],113:[2,113],115:[2,113],116:[2,113],117:[2,113]},{10:[2,117],35:[2,117],41:[2,117],90:[2,117],92:[2,117],94:[2,117],96:[2,117],98:[2,117],100:[2,117],101:[2,117],103:[2,117],104:[2,117],105:[2,117],106:[2,117],108:[2,117],109:[2,117],110:[2,117],112:[2,117],113:[2,117],115:[2,117],116:[2,117],117:[2,117],122:[2,117],125:[2,117]},{10:[2,118],35:[2,118],41:[2,118],90:[2,118],92:[2,118],94:[2,118],96:[2,118],98:[2,118],100:[2,118],101:[2,118],103:[2,118],104:[2,118],105:[2,118],106:[2,118],108:[2,118],109:[2,118],110:[2,118],112:[2,118],113:[2,118],115:[2,118],116:[2,118],117:[2,118],122:[2,118],125:[2,118]},{9:[1,24],13:129,33:[1,132],81:134,82:22,83:23,112:[1,122],113:[1,121],114:184,118:[1,119],119:[1,120],120:123,121:130,122:[1,135],123:124,124:131,125:[1,136],126:[1,125],127:[1,126],128:127,129:128,130:133,131:137,132:138,133:139,134:140,135:141,136:142,138:[1,146],139:[1,147],140:[1,143],141:[1,144],142:[1,149],143:[1,145],144:[1,148]},{9:[1,24],13:129,33:[1,132],81:134,82:22,83:23,112:[1,122],113:[1,121],114:185,118:[1,119],119:[1,120],120:123,121:130,122:[1,135],123:124,124:131,125:[1,136],126:[1,125],127:[1,126],128:127,129:128,130:133,131:137,132:138,133:139,134:140,135:141,136:142,138:[1,146],139:[1,147],140:[1,143],141:[1,144],142:[1,149],143:[1,145],144:[1,148]},{10:[2,121],35:[2,121],41:[2,121],90:[2,121],92:[2,121],94:[2,121],96:[2,121],98:[2,121],100:[2,121],101:[2,121],103:[2,121],104:[2,121],105:[2,121],106:[2,121],108:[2,121],109:[2,121],110:[2,121],112:[2,121],113:[2,121],115:[2,121],116:[2,121],117:[2,121],122:[2,121],125:[2,121]},{10:[2,126],35:[2,126],41:[2,126],90:[2,126],92:[2,126],94:[2,126],96:[2,126],98:[2,126],100:[2,126],101:[2,126],103:[2,126],104:[2,126],105:[2,126],106:[2,126],108:[2,126],109:[2,126],110:[2,126],112:[2,126],113:[2,126],115:[2,126],116:[2,126],117:[2,126],122:[1,186],125:[1,187]},{9:[1,24],13:129,33:[1,132],81:134,82:22,83:23,112:[1,122],113:[1,121],114:188,118:[1,119],119:[1,120],120:123,121:130,122:[1,135],123:124,124:131,125:[1,136],126:[1,125],127:[1,126],128:127,129:128,130:133,131:137,132:138,133:139,134:140,135:141,136:142,138:[1,146],139:[1,147],140:[1,143],141:[1,144],142:[1,149],143:[1,145],144:[1,148]},{9:[1,24],13:129,33:[1,132],81:134,82:22,83:23,112:[1,122],113:[1,121],114:189,118:[1,119],119:[1,120],120:123,121:130,122:[1,135],123:124,124:131,125:[1,136],126:[1,125],127:[1,126],128:127,129:128,130:133,131:137,132:138,133:139,134:140,135:141,136:142,138:[1,146],139:[1,147],140:[1,143],141:[1,144],142:[1,149],143:[1,145],144:[1,148]},{10:[2,129],35:[2,129],41:[2,129],90:[2,129],92:[2,129],94:[2,129],96:[2,129],98:[2,129],100:[2,129],101:[2,129],103:[2,129],104:[2,129],105:[2,129],106:[2,129],108:[2,129],109:[2,129],110:[2,129],112:[2,129],113:[2,129],115:[2,129],116:[2,129],117:[2,129],122:[2,129],125:[2,129]},{10:[2,130],35:[2,130],41:[2,130],90:[2,130],92:[2,130],94:[2,130],96:[2,130],98:[2,130],100:[2,130],101:[2,130],103:[2,130],104:[2,130],105:[2,130],106:[2,130],108:[2,130],109:[2,130],110:[2,130],112:[2,130],113:[2,130],115:[2,130],116:[2,130],117:[2,130],122:[2,130],125:[2,130]},{10:[2,131],33:[1,158],35:[2,131],41:[2,131],84:[1,33],90:[2,131],92:[2,131],94:[2,131],96:[2,131],98:[2,131],100:[2,131],101:[2,131],103:[2,131],104:[2,131],105:[2,131],106:[2,131],108:[2,131],109:[2,131],110:[2,131],112:[2,131],113:[2,131],115:[2,131],116:[2,131],117:[2,131],122:[2,131],125:[2,131]},{10:[2,132],35:[2,132],41:[2,132],90:[2,132],92:[2,132],94:[2,132],96:[2,132],98:[2,132],100:[2,132],101:[2,132],103:[2,132],104:[2,132],105:[2,132],106:[2,132],108:[2,132],109:[2,132],110:[2,132],112:[2,132],113:[2,132],115:[2,132],116:[2,132],117:[2,132],122:[2,132],125:[2,132]},{10:[2,133],35:[2,133],41:[2,133],90:[2,133],92:[2,133],94:[2,133],96:[2,133],98:[2,133],100:[2,133],101:[2,133],103:[2,133],104:[2,133],105:[2,133],106:[2,133],108:[2,133],109:[2,133],110:[2,133],112:[2,133],113:[2,133],115:[2,133],116:[2,133],117:[2,133],122:[2,133],125:[2,133]},{48:190,49:48,50:[1,49],51:50,52:51,53:[1,52],54:[1,53],55:[1,54],56:[1,55],57:[1,56],58:[1,57],59:[1,58]},{10:[2,135],35:[2,135],41:[2,135],90:[2,135],92:[2,135],94:[2,135],96:[2,135],98:[2,135],100:[2,135],101:[2,135],103:[2,135],104:[2,135],105:[2,135],106:[2,135],108:[2,135],109:[2,135],110:[2,135],112:[2,135],113:[2,135],115:[2,135],116:[2,135],117:[2,135],122:[2,135],125:[2,135]},{10:[2,136],35:[2,136],41:[2,136],90:[2,136],92:[2,136],94:[2,136],96:[2,136],98:[2,136],100:[2,136],101:[2,136],103:[2,136],104:[2,136],105:[2,136],106:[2,136],108:[2,136],109:[2,136],110:[2,136],112:[2,136],113:[2,136],115:[2,136],116:[2,136],117:[2,136],122:[2,136],125:[2,136]},{9:[1,24],13:129,33:[1,132],81:134,82:22,83:23,112:[1,122],113:[1,121],114:191,118:[1,119],119:[1,120],120:123,121:130,122:[1,135],123:124,124:131,125:[1,136],126:[1,125],127:[1,126],128:127,129:128,130:133,131:137,132:138,133:139,134:140,135:141,136:142,138:[1,146],139:[1,147],140:[1,143],141:[1,144],142:[1,149],143:[1,145],144:[1,148]},{9:[1,24],13:129,33:[1,132],81:134,82:22,83:23,112:[1,122],113:[1,121],114:192,118:[1,119],119:[1,120],120:123,121:130,122:[1,135],123:124,124:131,125:[1,136],126:[1,125],127:[1,126],128:127,129:128,130:133,131:137,132:138,133:139,134:140,135:141,136:142,138:[1,146],139:[1,147],140:[1,143],141:[1,144],142:[1,149],143:[1,145],144:[1,148]},{10:[2,137],35:[2,137],41:[2,137],90:[2,137],92:[2,137],94:[2,137],96:[2,137],98:[2,137],100:[2,137],101:[2,137],103:[2,137],104:[2,137],105:[2,137],106:[2,137],108:[2,137],109:[2,137],110:[2,137],112:[2,137],113:[2,137],115:[2,137],116:[2,137],117:[2,137],122:[2,137],125:[2,137]},{10:[2,138],35:[2,138],41:[2,138],90:[2,138],92:[2,138],94:[2,138],96:[2,138],98:[2,138],100:[2,138],101:[2,138],103:[2,138],104:[2,138],105:[2,138],106:[2,138],108:[2,138],109:[2,138],110:[2,138],112:[2,138],113:[2,138],115:[2,138],116:[2,138],117:[2,138],122:[2,138],125:[2,138]},{10:[2,139],35:[2,139],41:[2,139],90:[2,139],92:[2,139],94:[2,139],96:[2,139],98:[2,139],100:[2,139],101:[2,139],103:[2,139],104:[2,139],105:[2,139],106:[2,139],108:[2,139],109:[2,139],110:[2,139],112:[2,139],113:[2,139],115:[2,139],116:[2,139],117:[2,139],122:[2,139],125:[2,139]},{10:[2,140],35:[2,140],41:[2,140],90:[2,140],92:[2,140],94:[2,140],96:[2,140],98:[2,140],100:[2,140],101:[2,140],103:[2,140],104:[2,140],105:[2,140],106:[2,140],108:[2,140],109:[2,140],110:[2,140],112:[2,140],113:[2,140],115:[2,140],116:[2,140],117:[2,140],122:[2,140],125:[2,140]},{10:[2,141],35:[2,141],41:[2,141],90:[2,141],92:[2,141],94:[2,141],96:[2,141],98:[2,141],100:[2,141],101:[2,141],103:[2,141],104:[2,141],105:[2,141],106:[2,141],108:[2,141],109:[2,141],110:[2,141],112:[2,141],113:[2,141],115:[2,141],116:[2,141],117:[2,141],122:[2,141],125:[2,141]},{10:[2,142],35:[2,142],41:[2,142],90:[2,142],92:[2,142],94:[2,142],96:[2,142],98:[2,142],100:[2,142],101:[2,142],103:[2,142],104:[2,142],105:[2,142],106:[2,142],108:[2,142],109:[2,142],110:[2,142],112:[2,142],113:[2,142],115:[2,142],116:[2,142],117:[2,142],122:[2,142],125:[2,142]},{10:[2,149],35:[2,149],41:[2,149],90:[2,149],92:[2,149],94:[2,149],96:[2,149],98:[2,149],100:[2,149],101:[2,149],103:[2,149],104:[2,149],105:[2,149],106:[2,149],108:[2,149],109:[2,149],110:[2,149],112:[2,149],113:[2,149],115:[2,149],116:[2,149],117:[2,149],122:[2,149],125:[2,149]},{10:[2,150],35:[2,150],41:[2,150],90:[2,150],92:[2,150],94:[2,150],96:[2,150],98:[2,150],100:[2,150],101:[2,150],103:[2,150],104:[2,150],105:[2,150],106:[2,150],108:[2,150],109:[2,150],110:[2,150],112:[2,150],113:[2,150],115:[2,150],116:[2,150],117:[2,150],122:[2,150],125:[2,150]},{10:[2,152],35:[2,152],41:[2,152],90:[2,152],92:[2,152],94:[2,152],96:[2,152],98:[2,152],100:[2,152],101:[2,152],103:[2,152],104:[2,152],105:[2,152],106:[2,152],108:[2,152],109:[2,152],110:[2,152],112:[2,152],113:[2,152],115:[2,152],116:[2,152],117:[2,152],122:[2,152],125:[2,152]},{10:[2,147],35:[2,147],41:[2,147],90:[2,147],92:[2,147],94:[2,147],96:[2,147],98:[2,147],100:[2,147],101:[2,147],103:[2,147],104:[2,147],105:[2,147],106:[2,147],108:[2,147],109:[2,147],110:[2,147],112:[2,147],113:[2,147],115:[2,147],116:[2,147],117:[2,147],122:[2,147],125:[2,147]},{10:[2,148],35:[2,148],41:[2,148],90:[2,148],92:[2,148],94:[2,148],96:[2,148],98:[2,148],100:[2,148],101:[2,148],103:[2,148],104:[2,148],105:[2,148],106:[2,148],108:[2,148],109:[2,148],110:[2,148],112:[2,148],113:[2,148],115:[2,148],116:[2,148],117:[2,148],122:[2,148],125:[2,148]},{10:[2,153],35:[2,153],41:[2,153],90:[2,153],92:[2,153],94:[2,153],96:[2,153],98:[2,153],100:[2,153],101:[2,153],103:[2,153],104:[2,153],105:[2,153],106:[2,153],108:[2,153],109:[2,153],110:[2,153],112:[2,153],113:[2,153],115:[2,153],116:[2,153],117:[2,153],122:[2,153],125:[2,153]},{10:[2,151],35:[2,151],41:[2,151],90:[2,151],92:[2,151],94:[2,151],96:[2,151],98:[2,151],100:[2,151],101:[2,151],103:[2,151],104:[2,151],105:[2,151],106:[2,151],108:[2,151],109:[2,151],110:[2,151],112:[2,151],113:[2,151],115:[2,151],116:[2,151],117:[2,151],122:[2,151],125:[2,151]},{9:[2,52],10:[2,52],18:[2,52],19:[2,52],21:[2,52],50:[2,52],53:[2,52],54:[2,52],55:[2,52],56:[2,52],57:[2,52],58:[2,52],59:[2,52],71:[2,52],73:[2,52],78:[2,52]},{9:[2,54],10:[2,54],19:[2,54],21:[2,54],50:[2,54],53:[2,54],54:[2,54],55:[2,54],56:[2,54],57:[2,54],58:[2,54],59:[2,54],71:[2,54],78:[2,54]},{9:[2,57],10:[2,57],19:[2,57],21:[2,57],50:[2,57],53:[2,57],54:[2,57],55:[2,57],56:[2,57],57:[2,57],58:[2,57],59:[2,57],71:[2,57],78:[2,57]},{10:[2,58],41:[1,72]},{9:[1,24],13:129,33:[1,132],47:193,81:134,82:22,83:23,86:107,88:108,89:109,91:110,93:111,95:112,97:113,99:114,102:115,107:116,111:117,112:[1,122],113:[1,121],114:118,118:[1,119],119:[1,120],120:123,121:130,122:[1,135],123:124,124:131,125:[1,136],126:[1,125],127:[1,126],128:127,129:128,130:133,131:137,132:138,133:139,134:140,135:141,136:142,138:[1,146],139:[1,147],140:[1,143],141:[1,144],142:[1,149],143:[1,145],144:[1,148]},{9:[1,24],13:129,33:[1,132],47:194,81:134,82:22,83:23,86:107,88:108,89:109,91:110,93:111,95:112,97:113,99:114,102:115,107:116,111:117,112:[1,122],113:[1,121],114:118,118:[1,119],119:[1,120],120:123,121:130,122:[1,135],123:124,124:131,125:[1,136],126:[1,125],127:[1,126],128:127,129:128,130:133,131:137,132:138,133:139,134:140,135:141,136:142,138:[1,146],139:[1,147],140:[1,143],141:[1,144],142:[1,149],143:[1,145],144:[1,148]},{9:[2,75],10:[2,75],19:[2,75],21:[2,75],50:[2,75],53:[2,75],54:[2,75],55:[2,75],56:[2,75],57:[2,75],58:[2,75],59:[2,75],71:[2,75],73:[2,75],78:[2,75]},{9:[1,24],13:129,33:[1,132],81:134,82:22,83:23,86:195,88:108,89:109,91:110,93:111,95:112,97:113,99:114,102:115,107:116,111:117,112:[1,122],113:[1,121],114:118,118:[1,119],119:[1,120],120:123,121:130,122:[1,135],123:124,124:131,125:[1,136],126:[1,125],127:[1,126],128:127,129:128,130:133,131:137,132:138,133:139,134:140,135:141,136:142,138:[1,146],139:[1,147],140:[1,143],141:[1,144],142:[1,149],143:[1,145],144:[1,148]},{9:[1,24],13:129,33:[1,132],35:[1,196],47:198,81:134,82:22,83:23,86:107,88:108,89:109,91:110,93:111,95:112,97:113,99:114,102:115,107:116,111:117,112:[1,122],113:[1,121],114:118,118:[1,119],119:[1,120],120:123,121:130,122:[1,135],123:124,124:131,125:[1,136],126:[1,125],127:[1,126],128:127,129:128,130:133,131:137,132:138,133:139,134:140,135:141,136:142,137:197,138:[1,146],139:[1,147],140:[1,143],141:[1,144],142:[1,149],143:[1,145],144:[1,148]},{19:[2,26]},{33:[1,73]},{19:[2,27]},{38:[1,199]},{26:104,39:200,48:46,49:48,50:[1,49],51:50,52:51,53:[1,52],54:[1,53],55:[1,54],56:[1,55],57:[1,56],58:[1,57],59:[1,58]},{35:[2,31]},{9:[1,24],13:129,33:[1,132],81:134,82:22,83:23,89:201,91:110,93:111,95:112,97:113,99:114,102:115,107:116,111:117,112:[1,122],113:[1,121],114:118,118:[1,119],119:[1,120],120:123,121:130,122:[1,135],123:124,124:131,125:[1,136],126:[1,125],127:[1,126],128:127,129:128,130:133,131:137,132:138,133:139,134:140,135:141,136:142,138:[1,146],139:[1,147],140:[1,143],141:[1,144],142:[1,149],143:[1,145],144:[1,148]},{9:[1,24],13:129,33:[1,132],81:134,82:22,83:23,91:202,93:111,95:112,97:113,99:114,102:115,107:116,111:117,112:[1,122],113:[1,121],114:118,118:[1,119],119:[1,120],120:123,121:130,122:[1,135],123:124,124:131,125:[1,136],126:[1,125],127:[1,126],128:127,129:128,130:133,131:137,132:138,133:139,134:140,135:141,136:142,138:[1,146],139:[1,147],140:[1,143],141:[1,144],142:[1,149],143:[1,145],144:[1,148]},{9:[1,24],13:129,33:[1,132],81:134,82:22,83:23,93:203,95:112,97:113,99:114,102:115,107:116,111:117,112:[1,122],113:[1,121],114:118,118:[1,119],119:[1,120],120:123,121:130,122:[1,135],123:124,124:131,125:[1,136],126:[1,125],127:[1,126],128:127,129:128,130:133,131:137,132:138,133:139,134:140,135:141,136:142,138:[1,146],139:[1,147],140:[1,143],141:[1,144],142:[1,149],143:[1,145],144:[1,148]},{9:[1,24],13:129,33:[1,132],81:134,82:22,83:23,95:204,97:113,99:114,102:115,107:116,111:117,112:[1,122],113:[1,121],114:118,118:[1,119],119:[1,120],120:123,121:130,122:[1,135],123:124,124:131,125:[1,136],126:[1,125],127:[1,126],128:127,129:128,130:133,131:137,132:138,133:139,134:140,135:141,136:142,138:[1,146],139:[1,147],140:[1,143],141:[1,144],142:[1,149],143:[1,145],144:[1,148]},{9:[1,24],13:129,33:[1,132],81:134,82:22,83:23,97:205,99:114,102:115,107:116,111:117,112:[1,122],113:[1,121],114:118,118:[1,119],119:[1,120],120:123,121:130,122:[1,135],123:124,124:131,125:[1,136],126:[1,125],127:[1,126],128:127,129:128,130:133,131:137,132:138,133:139,134:140,135:141,136:142,138:[1,146],139:[1,147],140:[1,143],141:[1,144],142:[1,149],143:[1,145],144:[1,148]},{9:[1,24],13:129,33:[1,132],81:134,82:22,83:23,99:206,102:115,107:116,111:117,112:[1,122],113:[1,121],114:118,118:[1,119],119:[1,120],120:123,121:130,122:[1,135],123:124,124:131,125:[1,136],126:[1,125],127:[1,126],128:127,129:128,130:133,131:137,132:138,133:139,134:140,135:141,136:142,138:[1,146],139:[1,147],140:[1,143],141:[1,144],142:[1,149],143:[1,145],144:[1,148]},{9:[1,24],13:129,33:[1,132],81:134,82:22,83:23,99:207,102:115,107:116,111:117,112:[1,122],113:[1,121],114:118,118:[1,119],119:[1,120],120:123,121:130,122:[1,135],123:124,124:131,125:[1,136],126:[1,125],127:[1,126],128:127,129:128,130:133,131:137,132:138,133:139,134:140,135:141,136:142,138:[1,146],139:[1,147],140:[1,143],141:[1,144],142:[1,149],143:[1,145],144:[1,148]},{9:[1,24],13:129,33:[1,132],81:134,82:22,83:23,102:208,107:116,111:117,112:[1,122],113:[1,121],114:118,118:[1,119],119:[1,120],120:123,121:130,122:[1,135],123:124,124:131,125:[1,136],126:[1,125],127:[1,126],128:127,129:128,130:133,131:137,132:138,133:139,134:140,135:141,136:142,138:[1,146],139:[1,147],140:[1,143],141:[1,144],142:[1,149],143:[1,145],144:[1,148]},{9:[1,24],13:129,33:[1,132],81:134,82:22,83:23,102:209,107:116,111:117,112:[1,122],113:[1,121],114:118,118:[1,119],119:[1,120],120:123,121:130,122:[1,135],123:124,124:131,125:[1,136],126:[1,125],127:[1,126],128:127,129:128,130:133,131:137,132:138,133:139,134:140,135:141,136:142,138:[1,146],139:[1,147],140:[1,143],141:[1,144],142:[1,149],143:[1,145],144:[1,148]},{9:[1,24],13:129,33:[1,132],81:134,82:22,83:23,102:210,107:116,111:117,112:[1,122],113:[1,121],114:118,118:[1,119],119:[1,120],120:123,121:130,122:[1,135],123:124,124:131,125:[1,136],126:[1,125],127:[1,126],128:127,129:128,130:133,131:137,132:138,133:139,134:140,135:141,136:142,138:[1,146],139:[1,147],140:[1,143],141:[1,144],142:[1,149],143:[1,145],144:[1,148]},{9:[1,24],13:129,33:[1,132],81:134,82:22,83:23,102:211,107:116,111:117,112:[1,122],113:[1,121],114:118,118:[1,119],119:[1,120],120:123,121:130,122:[1,135],123:124,124:131,125:[1,136],126:[1,125],127:[1,126],128:127,129:128,130:133,131:137,132:138,133:139,134:140,135:141,136:142,138:[1,146],139:[1,147],140:[1,143],141:[1,144],142:[1,149],143:[1,145],144:[1,148]},{9:[1,24],13:129,33:[1,132],81:134,82:22,83:23,107:212,111:117,112:[1,122],113:[1,121],114:118,118:[1,119],119:[1,120],120:123,121:130,122:[1,135],123:124,124:131,125:[1,136],126:[1,125],127:[1,126],128:127,129:128,130:133,131:137,132:138,133:139,134:140,135:141,136:142,138:[1,146],139:[1,147],140:[1,143],141:[1,144],142:[1,149],143:[1,145],144:[1,148]},{9:[1,24],13:129,33:[1,132],81:134,82:22,83:23,107:213,111:117,112:[1,122],113:[1,121],114:118,118:[1,119],119:[1,120],120:123,121:130,122:[1,135],123:124,124:131,125:[1,136],126:[1,125],127:[1,126],128:127,129:128,130:133,131:137,132:138,133:139,134:140,135:141,136:142,138:[1,146],139:[1,147],140:[1,143],141:[1,144],142:[1,149],143:[1,145],144:[1,148]},{9:[1,24],13:129,33:[1,132],81:134,82:22,83:23,107:214,111:117,112:[1,122],113:[1,121],114:118,118:[1,119],119:[1,120],120:123,121:130,122:[1,135],123:124,124:131,125:[1,136],126:[1,125],127:[1,126],128:127,129:128,130:133,131:137,132:138,133:139,134:140,135:141,136:142,138:[1,146],139:[1,147],140:[1,143],141:[1,144],142:[1,149],143:[1,145],144:[1,148]},{9:[1,24],13:129,33:[1,132],81:134,82:22,83:23,111:215,112:[1,122],113:[1,121],114:118,118:[1,119],119:[1,120],120:123,121:130,122:[1,135],123:124,124:131,125:[1,136],126:[1,125],127:[1,126],128:127,129:128,130:133,131:137,132:138,133:139,134:140,135:141,136:142,138:[1,146],139:[1,147],140:[1,143],141:[1,144],142:[1,149],143:[1,145],144:[1,148]},{9:[1,24],13:129,33:[1,132],81:134,82:22,83:23,111:216,112:[1,122],113:[1,121],114:118,118:[1,119],119:[1,120],120:123,121:130,122:[1,135],123:124,124:131,125:[1,136],126:[1,125],127:[1,126],128:127,129:128,130:133,131:137,132:138,133:139,134:140,135:141,136:142,138:[1,146],139:[1,147],140:[1,143],141:[1,144],142:[1,149],143:[1,145],144:[1,148]},{9:[1,24],13:129,33:[1,132],81:134,82:22,83:23,112:[1,122],113:[1,121],114:217,118:[1,119],119:[1,120],120:123,121:130,122:[1,135],123:124,124:131,125:[1,136],126:[1,125],127:[1,126],128:127,129:128,130:133,131:137,132:138,133:139,134:140,135:141,136:142,138:[1,146],139:[1,147],140:[1,143],141:[1,144],142:[1,149],143:[1,145],144:[1,148]},{9:[1,24],13:129,33:[1,132],81:134,82:22,83:23,112:[1,122],113:[1,121],114:218,118:[1,119],119:[1,120],120:123,121:130,122:[1,135],123:124,124:131,125:[1,136],126:[1,125],127:[1,126],128:127,129:128,130:133,131:137,132:138,133:139,134:140,135:141,136:142,138:[1,146],139:[1,147],140:[1,143],141:[1,144],142:[1,149],143:[1,145],144:[1,148]},{9:[1,24],13:129,33:[1,132],81:134,82:22,83:23,112:[1,122],113:[1,121],114:219,118:[1,119],119:[1,120],120:123,121:130,122:[1,135],123:124,124:131,125:[1,136],126:[1,125],127:[1,126],128:127,129:128,130:133,131:137,132:138,133:139,134:140,135:141,136:142,138:[1,146],139:[1,147],140:[1,143],141:[1,144],142:[1,149],143:[1,145],144:[1,148]},{10:[2,119],35:[2,119],41:[2,119],90:[2,119],92:[2,119],94:[2,119],96:[2,119],98:[2,119],100:[2,119],101:[2,119],103:[2,119],104:[2,119],105:[2,119],106:[2,119],108:[2,119],109:[2,119],110:[2,119],112:[2,119],113:[2,119],115:[2,119],116:[2,119],117:[2,119],122:[2,119],125:[2,119]},{10:[2,120],35:[2,120],41:[2,120],90:[2,120],92:[2,120],94:[2,120],96:[2,120],98:[2,120],100:[2,120],101:[2,120],103:[2,120],104:[2,120],105:[2,120],106:[2,120],108:[2,120],109:[2,120],110:[2,120],112:[2,120],113:[2,120],115:[2,120],116:[2,120],117:[2,120],122:[2,120],125:[2,120]},{10:[2,123],35:[2,123],41:[2,123],90:[2,123],92:[2,123],94:[2,123],96:[2,123],98:[2,123],100:[2,123],101:[2,123],103:[2,123],104:[2,123],105:[2,123],106:[2,123],108:[2,123],109:[2,123],110:[2,123],112:[2,123],113:[2,123],115:[2,123],116:[2,123],117:[2,123],122:[2,123],125:[2,123]},{10:[2,125],35:[2,125],41:[2,125],90:[2,125],92:[2,125],94:[2,125],96:[2,125],98:[2,125],100:[2,125],101:[2,125],103:[2,125],104:[2,125],105:[2,125],106:[2,125],108:[2,125],109:[2,125],110:[2,125],112:[2,125],113:[2,125],115:[2,125],116:[2,125],117:[2,125],122:[2,125],125:[2,125]},{10:[2,127],35:[2,127],41:[2,127],90:[2,127],92:[2,127],94:[2,127],96:[2,127],98:[2,127],100:[2,127],101:[2,127],103:[2,127],104:[2,127],105:[2,127],106:[2,127],108:[2,127],109:[2,127],110:[2,127],112:[2,127],113:[2,127],115:[2,127],116:[2,127],117:[2,127],122:[2,127],125:[2,127]},{10:[2,128],35:[2,128],41:[2,128],90:[2,128],92:[2,128],94:[2,128],96:[2,128],98:[2,128],100:[2,128],101:[2,128],103:[2,128],104:[2,128],105:[2,128],106:[2,128],108:[2,128],109:[2,128],110:[2,128],112:[2,128],113:[2,128],115:[2,128],116:[2,128],117:[2,128],122:[2,128],125:[2,128]},{35:[1,220]},{10:[2,122],35:[2,122],41:[2,122],90:[2,122],92:[2,122],94:[2,122],96:[2,122],98:[2,122],100:[2,122],101:[2,122],103:[2,122],104:[2,122],105:[2,122],106:[2,122],108:[2,122],109:[2,122],110:[2,122],112:[2,122],113:[2,122],115:[2,122],116:[2,122],117:[2,122],122:[2,122],125:[2,122]},{10:[2,124],35:[2,124],41:[2,124],90:[2,124],92:[2,124],94:[2,124],96:[2,124],98:[2,124],100:[2,124],101:[2,124],103:[2,124],104:[2,124],105:[2,124],106:[2,124],108:[2,124],109:[2,124],110:[2,124],112:[2,124],113:[2,124],115:[2,124],116:[2,124],117:[2,124],122:[2,124],125:[2,124]},{35:[1,221]},{35:[1,222]},{10:[2,82]},{10:[2,143],35:[2,143],41:[2,143],90:[2,143],92:[2,143],94:[2,143],96:[2,143],98:[2,143],100:[2,143],101:[2,143],103:[2,143],104:[2,143],105:[2,143],106:[2,143],108:[2,143],109:[2,143],110:[2,143],112:[2,143],113:[2,143],115:[2,143],116:[2,143],117:[2,143],122:[2,143],125:[2,143]},{35:[1,223],41:[1,224]},{35:[2,145],41:[2,145]},{9:[1,225]},{35:[2,30]},{10:[2,89],35:[2,89],41:[2,89],90:[2,89],92:[1,166]},{10:[2,91],35:[2,91],41:[2,91],90:[2,91],92:[2,91],94:[1,167]},{10:[2,93],35:[2,93],41:[2,93],90:[2,93],92:[2,93],94:[2,93],96:[1,168]},{10:[2,95],35:[2,95],41:[2,95],90:[2,95],92:[2,95],94:[2,95],96:[2,95],98:[1,169]},{10:[2,97],35:[2,97],41:[2,97],90:[2,97],92:[2,97],94:[2,97],96:[2,97],98:[2,97],100:[1,170],101:[1,171]},{10:[2,99],35:[2,99],41:[2,99],90:[2,99],92:[2,99],94:[2,99],96:[2,99],98:[2,99],100:[2,99],101:[2,99],103:[1,172],104:[1,173],105:[1,174],106:[1,175]},{10:[2,100],35:[2,100],41:[2,100],90:[2,100],92:[2,100],94:[2,100],96:[2,100],98:[2,100],100:[2,100],101:[2,100],103:[1,172],104:[1,173],105:[1,174],106:[1,175]},{10:[2,102],35:[2,102],41:[2,102],90:[2,102],92:[2,102],94:[2,102],96:[2,102],98:[2,102],100:[2,102],101:[2,102],103:[2,102],104:[2,102],105:[2,102],106:[2,102],108:[1,176],109:[1,177],110:[1,178]},{10:[2,103],35:[2,103],41:[2,103],90:[2,103],92:[2,103],94:[2,103],96:[2,103],98:[2,103],100:[2,103],101:[2,103],103:[2,103],104:[2,103],105:[2,103],106:[2,103],108:[1,176],109:[1,177],110:[1,178]},{10:[2,104],35:[2,104],41:[2,104],90:[2,104],92:[2,104],94:[2,104],96:[2,104],98:[2,104],100:[2,104],101:[2,104],103:[2,104],104:[2,104],105:[2,104],106:[2,104],108:[1,176],109:[1,177],110:[1,178]},{10:[2,105],35:[2,105],41:[2,105],90:[2,105],92:[2,105],94:[2,105],96:[2,105],98:[2,105],100:[2,105],101:[2,105],103:[2,105],104:[2,105],105:[2,105],106:[2,105],108:[1,176],109:[1,177],110:[1,178]},{10:[2,107],35:[2,107],41:[2,107],90:[2,107],92:[2,107],94:[2,107],96:[2,107],98:[2,107],100:[2,107],101:[2,107],103:[2,107],104:[2,107],105:[2,107],106:[2,107],108:[2,107],109:[2,107],110:[2,107],112:[1,179],113:[1,180]},{10:[2,108],35:[2,108],41:[2,108],90:[2,108],92:[2,108],94:[2,108],96:[2,108],98:[2,108],100:[2,108],101:[2,108],103:[2,108],104:[2,108],105:[2,108],106:[2,108],108:[2,108],109:[2,108],110:[2,108],112:[1,179],113:[1,180]},{10:[2,109],35:[2,109],41:[2,109],90:[2,109],92:[2,109],94:[2,109],96:[2,109],98:[2,109],100:[2,109],101:[2,109],103:[2,109],104:[2,109],105:[2,109],106:[2,109],108:[2,109],109:[2,109],110:[2,109],112:[1,179],113:[1,180]},{10:[2,111],35:[2,111],41:[2,111],90:[2,111],92:[2,111],94:[2,111],96:[2,111],98:[2,111],100:[2,111],101:[2,111],103:[2,111],104:[2,111],105:[2,111],106:[2,111],108:[2,111],109:[2,111],110:[2,111],112:[2,111],113:[2,111],115:[1,181],116:[1,182],117:[1,183]},{10:[2,112],35:[2,112],41:[2,112],90:[2,112],92:[2,112],94:[2,112],96:[2,112],98:[2,112],100:[2,112],101:[2,112],103:[2,112],104:[2,112],105:[2,112],106:[2,112],108:[2,112],109:[2,112],110:[2,112],112:[2,112],113:[2,112],115:[1,181],116:[1,182],117:[1,183]},{10:[2,114],35:[2,114],41:[2,114],90:[2,114],92:[2,114],94:[2,114],96:[2,114],98:[2,114],100:[2,114],101:[2,114],103:[2,114],104:[2,114],105:[2,114],106:[2,114],108:[2,114],109:[2,114],110:[2,114],112:[2,114],113:[2,114],115:[2,114],116:[2,114],117:[2,114]},{10:[2,115],35:[2,115],41:[2,115],90:[2,115],92:[2,115],94:[2,115],96:[2,115],98:[2,115],100:[2,115],101:[2,115],103:[2,115],104:[2,115],105:[2,115],106:[2,115],108:[2,115],109:[2,115],110:[2,115],112:[2,115],113:[2,115],115:[2,115],116:[2,115],117:[2,115]},{10:[2,116],35:[2,116],41:[2,116],90:[2,116],92:[2,116],94:[2,116],96:[2,116],98:[2,116],100:[2,116],101:[2,116],103:[2,116],104:[2,116],105:[2,116],106:[2,116],108:[2,116],109:[2,116],110:[2,116],112:[2,116],113:[2,116],115:[2,116],116:[2,116],117:[2,116]},{9:[1,24],13:129,33:[1,132],81:134,82:22,83:23,112:[1,122],113:[1,121],114:226,118:[1,119],119:[1,120],120:123,121:130,122:[1,135],123:124,124:131,125:[1,136],126:[1,125],127:[1,126],128:127,129:128,130:133,131:137,132:138,133:139,134:140,135:141,136:142,138:[1,146],139:[1,147],140:[1,143],141:[1,144],142:[1,149],143:[1,145],144:[1,148]},{9:[1,24],10:[1,91],13:96,19:[1,69],43:86,63:228,65:229,66:82,67:83,68:84,69:87,70:88,71:[1,89],72:227,74:[1,230],75:[1,231],76:[1,232],77:[1,233],78:[1,90],79:92,80:93,81:94,82:22,83:23,85:95},{9:[1,24],10:[1,91],13:96,19:[1,69],43:86,63:234,65:81,66:82,67:83,68:84,69:87,70:88,71:[1,89],78:[1,90],79:92,80:93,81:94,82:22,83:23,85:95},{10:[2,144],35:[2,144],41:[2,144],90:[2,144],92:[2,144],94:[2,144],96:[2,144],98:[2,144],100:[2,144],101:[2,144],103:[2,144],104:[2,144],105:[2,144],106:[2,144],108:[2,144],109:[2,144],110:[2,144],112:[2,144],113:[2,144],115:[2,144],116:[2,144],117:[2,144],122:[2,144],125:[2,144]},{9:[1,24],13:129,33:[1,132],47:235,81:134,82:22,83:23,86:107,88:108,89:109,91:110,93:111,95:112,97:113,99:114,102:115,107:116,111:117,112:[1,122],113:[1,121],114:118,118:[1,119],119:[1,120],120:123,121:130,122:[1,135],123:124,124:131,125:[1,136],126:[1,125],127:[1,126],128:127,129:128,130:133,131:137,132:138,133:139,134:140,135:141,136:142,138:[1,146],139:[1,147],140:[1,143],141:[1,144],142:[1,149],143:[1,145],144:[1,148]},{35:[1,236]},{10:[2,134],35:[2,134],41:[2,134],90:[2,134],92:[2,134],94:[2,134],96:[2,134],98:[2,134],100:[2,134],101:[2,134],103:[2,134],104:[2,134],105:[2,134],106:[2,134],108:[2,134],109:[2,134],110:[2,134],112:[2,134],113:[2,134],115:[2,134],116:[2,134],117:[2,134],122:[2,134],125:[2,134]},{73:[1,237]},{9:[2,66],10:[2,66],19:[2,66],21:[2,66],50:[2,66],53:[2,66],54:[2,66],55:[2,66],56:[2,66],57:[2,66],58:[2,66],59:[2,66],71:[2,66],78:[2,66]},{9:[2,68],10:[2,68],19:[2,68],21:[2,68],50:[2,68],53:[2,68],54:[2,68],55:[2,68],56:[2,68],57:[2,68],58:[2,68],59:[2,68],71:[2,68],73:[2,68],78:[2,68]},{73:[2,69]},{73:[2,70]},{73:[2,71]},{73:[2,72]},{9:[2,73],10:[2,73],19:[2,73],21:[2,73],50:[2,73],53:[2,73],54:[2,73],55:[2,73],56:[2,73],57:[2,73],58:[2,73],59:[2,73],71:[2,73],78:[2,73]},{35:[2,146],41:[2,146]},{19:[2,28]},{9:[1,24],10:[1,91],13:96,19:[1,69],43:86,63:238,65:81,66:82,67:83,68:84,69:87,70:88,71:[1,89],78:[1,90],79:92,80:93,81:94,82:22,83:23,85:95},{9:[2,67],10:[2,67],19:[2,67],21:[2,67],50:[2,67],53:[2,67],54:[2,67],55:[2,67],56:[2,67],57:[2,67],58:[2,67],59:[2,67],71:[2,67],78:[2,67]}],
    defaultActions: {2:[2,1],8:[2,13],10:[2,14],13:[2,2],16:[2,3],19:[2,4],27:[2,5],29:[2,6],30:[2,7],34:[2,15],37:[2,8],46:[2,39],59:[2,16],60:[2,17],63:[2,25],93:[2,76],94:[2,77],102:[2,29],159:[2,26],161:[2,27],164:[2,31],195:[2,82],200:[2,30],230:[2,69],231:[2,70],232:[2,71],233:[2,72],236:[2,28]},
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
        if (typeof this.lexer.yylloc == 'undefined')
            this.lexer.yylloc = {};
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
                        last_column: lstack[lstack.length-1].last_column
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
                                   last_column: lines ? lines[lines.length-1].length-1 : this.yylloc.last_column + match[0].length}
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
    case 0:/* skip comments */
    break;
    case 1:/* skip comments */
    break;
    case 2:/* skip whitespace */
    break;
    case 3:return 19; /* Basic Syntax */
    break;
    case 4:return 21;
    break;
    case 5:return 33;
    break;
    case 6:return 35;
    break;
    case 7:return 37;
    break;
    case 8:return 38;
    break;
    case 9:return 41;
    break;
    case 10:return 10;
    break;
    case 11:return 18; /* Modifier */
    break;
    case 12:return 'MODIFIER_PRIVATE';
    break;
    case 13:return 'MODIFIER_PROTECTED';
    break;
    case 14:return 31;
    break;
    case 15:return 32;
    break;
    case 16:return 'MODIFIER_FINAL';
    break;
    case 17:return 8; /* Keywords */
    break;
    case 18:return 12;
    break;
    case 19:return 71;
    break;
    case 20:return 73;
    break;
    case 21:return 78;
    break;
    case 22:return 138;
    break;
    case 23:return 139;
    break;
    case 24:return 16;
    break;
    case 25:return 50;
    break;
    case 26:return 53;
    break;
    case 27:return 54;
    break;
    case 28:return 55;
    break;
    case 29:return 56;
    break;
    case 30:return 57;
    break;
    case 31:return 58;
    break;
    case 32:return 59;
    break;
    case 33:return 36;
    break;
    case 34:return 108;
    break;
    case 35:return 110;
    break;
    case 36:return 109;
    break;
    case 37:return 104;
    break;
    case 38:return 103;
    break;
    case 39:return 100;
    break;
    case 40:return 106;
    break;
    case 41:return 105;
    break;
    case 42:return 101;
    break;
    case 43:return 90;
    break;
    case 44:return 94;
    break;
    case 45:return 96;
    break;
    case 46:return 92;
    break;
    case 47:return 98;
    break;
    case 48:return 126;
    break;
    case 49:return 127;
    break;
    case 50:return 45;
    break;
    case 51:return 122;
    break;
    case 52:return 112;
    break;
    case 53:return 125;
    break;
    case 54:return 113;
    break;
    case 55:return 115;
    break;
    case 56:return 116;
    break;
    case 57:return 117;
    break;
    case 58:return 142;
    break;
    case 59:return 9; /* Varying form */
    break;
    case 60:return 143;
    break;
    case 61:return 140;
    break;
    case 62:return 144;
    break;
    case 63:return 141;
    break;
    case 64:return 84;
    break;
    case 65:return 4;
    break;
    case 66:return 'INVALID';
    break;
    }
    };
    lexer.rules = [/^\/\/.*/,/^\/\*(.|\n)*\*\//,/^\s+/,/^\{/,/^\}/,/^\(/,/^\)/,/^\[/,/^\]/,/^,/,/^;/,/^public\b/,/^private\b/,/^protected\b/,/^static\b/,/^void\b/,/^final\b/,/^package\b/,/^import\b/,/^if\b/,/^else\b/,/^while\b/,/^true\b/,/^false\b/,/^class\b/,/^boolean\b/,/^byte\b/,/^short\b/,/^int\b/,/^long\b/,/^char\b/,/^float\b/,/^double\b/,/^String\b/,/^<</,/^>>>/,/^>>/,/^<=/,/^</,/^==/,/^>=/,/^>/,/^!=/,/^\|\|/,/^\|/,/^\^/,/^&&/,/^&/,/^~/,/^!/,/^=/,/^\+\+/,/^\+/,/^--/,/^-/,/^\*/,/^\//,/^%/,/^null\b/,/^[a-zA-Z][a-zA-Z0-9_]*/,/^((0|[1-9][0-9]*)\.(0|[1-9][0-9]*)?([Ee][+-]?(0|[1-9][0-9]*))?[fFdD]?|\.(0|[1-9][0-9]*)([Ee][+-]?(0|[1-9][0-9]*))?[fFdD]?|(0|[1-9][0-9]*)([Ee][+-]?(0|[1-9][0-9]*))[fFdD]?|(0|[1-9][0-9]*)([Ee][+-]?(0|[1-9][0-9]*))?[fFdD])(?=([^\w]|$))/,/^(0|[1-9][0-9]*)[lL]?\b\b/,/^".*"/,/^'.'/,/^\./,/^$/,/^./];
    lexer.conditions = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66],"inclusive":true}};return lexer;})()
    parser.lexer = lexer;
    return parser;
    })();
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
    return exports;
  
  }({}).parser;
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
      return this.__compiled || (this.__compiled = this.compileNode(indent));
    }
    
    /**
     * Returns the type of node.
     */
    ASTNode.prototype.getType = function () {
      return this.type;
    }
    
    /**
     * Checks whether node is of provided Vava type.
     *
     * Some, but not all nodes possess a Vava type, that can be known at compile
     * time either directly or through recursive computation.
     *
     * @param vavaType Type to compare with
     */
    ASTNode.prototype.isVavaType = function (vavaType) {
      return this.vavaType === vavaType;
    };
    
    /**
     * Returns a string signature containing information about the node.
     */
    ASTNode.prototype.assembleSignature = function () {
      var sigStr = '<' + this.getType();
      var signature = this.getSignature && this.getSignature() || {};
      if (!signature.vavaType && this.vavaType) signature.vavaType = this.vavaType;
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
      return 'this.__env.BooleanValue.intern(' + this.value + ')';
    };
    
    /**
     * Creates a node for an Integer literal.
     *
     * @param num The number
     */
    var IntegerLiteral = exports.IntegerLiteral = function (num) {
      this.type = 'IntegerLiteral';
      this.children = [];
      if (/l$/i.test(num)) {
        this.vavaType = 'long';
        num = num.substr(0, num.length - 1);
      } else {
        this.vavaType = 'int';
      }
      // TODO Octal and hexal numbers
      if ((parseFloat(num) === parseInt(num)) && !isNaN(num)) {
        this.value = num;
      } else {
        throw new TypeError('Expected number to be an integer.');
      }
    };
    
    IntegerLiteral.inherits(ASTNode);
    
    IntegerLiteral.prototype.getSignature = function () {
      return {value : this.value, vavaType : this.vavaType};
    };
    
    IntegerLiteral.prototype.compileNode = function (indent) {
      if (this.vavaType === 'long') {
        return builder.functionCall('this.__env.LongValue.intern', [this.value], false);
      } else {
        return builder.functionCall('this.__env.IntValue.intern', [this.value], false);
      }
    };
    
    /**
     * Creates a node for a char literal.
     *
     * @param character The character
     */
    var CharLiteral = exports.CharLiteral = function (character) {
      this.type = 'CharLiteral';
      this.children = [];
      this.character = character.substr(1,1);
    };
    
    CharLiteral.inherits(ASTNode);
    
    CharLiteral.prototype.getSignature = function () {
      return {character : this.character};
    };
    
    CharLiteral.prototype.compileNode = function (indent) {
      return builder.functionCall('this.__env.CharValue.intern', [builder.string(this.character)], false);
    };
    
    /**
     * Creates a node for a FloatingPoint literal.
     *
     * @param numString The string describing the number
     */
    var FloatingPointLiteral = exports.FloatingPointLiteral = function (numString) {
      this.type = 'FloatingPointLiteral';
      this.children = [];
      var parts;
      if (parts = numString.match(/^(0|[1-9][0-9]*)\.([1-9][0-9]*)?(?:[Ee]([+-])?([1-9][0-9]*))?([fFdD])?/)) {
        this.prePoint = Number(parts[1]);
        this.postPoint = (parts[2] && Number(parts[2])) || 0;
        this.exponent = (parts[4] || 0) * (parts[3] === '-' ? -1 : 1);
        this.vavaType = (parts[5] && parts[5].toLowerCase()) === 'f' ? 'float' : 'double';
      } else if (parts = numString.match(/\.([1-9][0-9]*)(?:[Ee]([+-])?([1-9][0-9]*))?([fFdD])?/)) {
        this.prePoint = 0;
        this.postPoint = Number(parts[1]);
        this.exponent = (parts[3] || 0) * (parts[2] === '-' ? -1 : 1);
        this.vavaType = (parts[4] && parts[4].toLowerCase()) === 'f' ? 'float' : 'double';
      } else if (parts = numString.match(/(0|[1-9][0-9]*)(?:[Ee]([+-])?([1-9][0-9]*))([fFdD])?/)) {
        this.prePoint = Number(parts[1]);
        this.postPoint = 0;
        this.exponent = parts[3] * (parts[2] === '-' ? -1 : 1);
        this.vavaType = (parts[4] && parts[4].toLowerCase()) === 'f' ? 'float' : 'double';
      } else if (parts = numString.match(/(0|[1-9][0-9]*)(?:[Ee]([+-])?([1-9][0-9]*))?([fFdD])/)) {
        this.prePoint = Number(parts[1]);
        this.postPoint = 0;
        this.exponent = (parts[3] || 0) * (parts[2] === '-' ? -1 : 1);
        this.vavaType = parts[4].toLowerCase() === 'f' ? 'float' : 'double';
      } else {
        throw new Error("Invalid floating point format: " + numString);
      }
    
    };
    
    FloatingPointLiteral.inherits(ASTNode);
    
    FloatingPointLiteral.prototype.getSignature = function () {
      return {
        prePoint : this.prePoint, postPoint : this.postPoint,
        exponent : this.exponent, vavaType : this.vavaType
      };
    };
    
    FloatingPointLiteral.prototype.compileNode = function (indent) {
      var num = (this.prePoint + this.postPoint/Math.pow(10,this.postPoint.toString(10).length)) * Math.pow(10, this.exponent);
      if (this.isVavaType('float')) {
        return builder.functionCall('this.__env.FloatValue.intern', [num], false);
      } else {
        return builder.functionCall('this.__env.DoubleValue.intern', [num], false);
      }
    };
    
    /**
     * Creates a node for a null literal.
     *
     */
    var NullLiteral = exports.NullLiteral = function () {
      this.type = 'NullLiteral';
      this.children = [];
    };
    
    NullLiteral.inherits(ASTNode);
    
    NullLiteral.prototype.compileNode = function (indent) {
      return 'this.__env.NullValue.intern()';
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
    
    // TODO Interned strings
    StringLiteral.prototype.compileNode = function (indent) {
      return builder.constructorCall('this.__env.StringValue', [this.value], false);
    };
    
    //// Operations
    
    // Unary
    
    /**
     * Creates a node for a unary minus expression.
     *
     * @param unaryExpressoin The operand
     */
    var UnaryMinus = exports.UnaryMinus = function (unaryExpression) {
      this.type = 'UnaryMinus';
      this.children = [];
    
      this.appendChild(unaryExpression);
    };
    
    UnaryMinus.inherits(ASTNode);
    
    UnaryMinus.prototype.getSignature = function () {
      return {};
    };
    
    UnaryMinus.prototype.compileNode = function (indent) {
      return builder.functionCall(this.children[0].compile() + '.inverse', [], false);
    };
    
    /**
     * Creates a node for a unary plus expression.
     *
     * @param unaryExpression The operand
     */
    var UnaryPlus = exports.UnaryPlus = function (unaryExpression) {
      this.type = 'UnaryPlus';
      this.children = [];
    
      this.appendChild(unaryExpression);
    };
    
    UnaryPlus.inherits(ASTNode);
    
    UnaryPlus.prototype.getSignature = function () {
      return {};
    };
    
    UnaryPlus.prototype.compileNode = function (indent) {
      return this.children[0].compile();
    };
    
    /**
     * Creates a node for post incrementing.
     *
     * @param variable The variable to increment
     */
    var PostIncrement = exports.PostIncrement = function (variable) {
      this.type = 'PostIncrement';
      this.children = [];
      this.vavaType = 'int';
      this.appendChild(variable);
    };
    
    PostIncrement.inherits(ASTNode);
    
    PostIncrement.prototype.compileNode = function (indent) {
      return builder.functionCall(
        this.children[0].compileNode('set') + '.postInc', [], false
      );
    }
    
    /**
     * Creates a node for post decrementing.
     *
     * @param variable The variable to decrement
     */
    var PostDecrement = exports.PostDecrement = function (variable) {
      this.type = 'PostDecrement';
      this.children = [];
      this.vavaType = 'int';
      this.appendChild(variable);
    };
    
    PostDecrement.inherits(ASTNode);
    
    PostDecrement.prototype.compileNode = function (indent) {
      return builder.functionCall(
        this.children[0].compileNode('set') + '.postDec', [], false
      );
    }
    
    /**
     * Creates a node for pre incrementing.
     *
     * @param variable The variable to increment
     */
    var PreIncrement = exports.PreIncrement = function (variable) {
      this.type = 'PreIncrement';
      this.children = [];
      this.vavaType = 'int';
      this.appendChild(variable);
    };
    
    PreIncrement.inherits(ASTNode);
    
    PreIncrement.prototype.compileNode = function (indent) {
      return builder.functionCall(
        this.children[0].compileNode('set') + '.preInc', [], false
      );
    }
    
    /**
     * Creates a node for pre decrementing.
     *
     * @param variable The variable to decrement
     */
    var PreDecrement = exports.PreDecrement = function (variable) {
      this.type = 'PreDecrement';
      this.children = [];
      this.vavaType = 'int';
      this.appendChild(variable);
    };
    
    PreDecrement.inherits(ASTNode);
    
    PreDecrement.prototype.compileNode = function (indent) {
      return builder.functionCall(
        this.children[0].compileNode('set') + '.preDec', [], false
      );
    }
    
    /**
     * Creates a node for a cast expression.
     *
     * @param vavaType The type to cast to
     * @param unaryExpression The expression whose value to cast
     */
    var CastExpression = exports.CastExpression = function (vavaType, unaryExpression) {
      this.type = 'CastExpression';
      this.children = [];
      this.vavaType = vavaType;
      this.appendChild(unaryExpression);
    };
    
    CastExpression.inherits(ASTNode);
    
    CastExpression.prototype.compileNode = function (indent) {
      return builder.functionCall('(' + this.children[0].compile() + ').to', [builder.string(this.vavaType)], false);
    };
    
    // Binary
    
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
     * Creates a node for less than comparison.
     *
     * @param a First value to be compared
     * @param b Second value to be compared
     */
    var LessThan = exports.LessThan = function (a, b) {
      this.type = 'LessThan';
      this.vavaType = 'boolean';
      this.children = [];
      if (!a || !b) {
        throw new TypeError('Expected two values to compare (lt).');
      }
      this.appendChild(a);
      this.appendChild(b);
    };
    
    LessThan.inherits(ASTNode);
    
    LessThan.prototype.compileNode = function (indent) {
      return utils.indent(
        builder.functionCall(
          'this.__env.BooleanValue.intern',
          [builder.functionCall('(' + this.children[0].compile() + ').isLessThan', [this.children[1].compile()], false)],
          false
        ),
        indent
      );
    };
    
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
      return utils.indent('this.__env.BooleanValue.intern(' + this.children[0].compile() + ' === ' + this.children[1].compile() + ')', indent);
    };
    
    /**
     * Creates a node for a greater than comparison.
     *
     * @param a First value to be compared
     * @param b Second value to be compared
     */
    var GreaterThan = exports.GreaterThan = function (a, b) {
      this.type = 'GreaterThan';
      this.vavaType = 'boolean';
      this.children = [];
      if (!a || !b) {
        throw new TypeError('Expected two values to compare (gt).');
      }
      this.appendChild(a);
      this.appendChild(b);
    };
    
    GreaterThan.inherits(ASTNode);
    
    GreaterThan.prototype.compileNode = function (indent) {
      return utils.indent(
        builder.functionCall(
          'this.__env.BooleanValue.intern',
          [builder.functionCall('(' + this.children[0].compile() + ').isGreaterThan', [this.children[1].compile()], false)],
          false
        ),
        indent
      );
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
      return utils.indent('this.__env.BooleanValue.intern(' + this.children[0].compile() + ' !== ' + this.children[1].compile() + ')', indent);
    };
    
    /**
     * Creates a node for a logical AND.
     *
     * @param boolA First truth value
     * @param boolB Second truth value
     */
    var LogicalAnd = exports.LogicalAnd = function (boolA, boolB) {
      this.type = 'LogicalAnd';
      this.vavaType = 'boolean';
      this.children = [];
      this.appendChild(boolA);
      this.appendChild(boolB);
    }
    
    LogicalAnd.inherits(ASTNode);
    
    LogicalAnd.prototype.compileNode = function (indent) {
      return builder.functionCall(
        'this.__env.BooleanValue.intern',
        [this.children[0].compile() + '.get() && ' + this.children[1].compile() + '.get()'],
        false
      );
    };
    
    /**
     * Creates a node for a logical OR.
     *
     * @param boolA First truth value
     * @param boolB Second truth value
     */
    var LogicalOr = exports.LogicalOr = function (boolA, boolB) {
      this.type = 'LogicalOr';
      this.vavaType = 'boolean';
      this.children = [];
      this.appendChild(boolA);
      this.appendChild(boolB);
    }
    
    LogicalOr.inherits(ASTNode);
    
    LogicalOr.prototype.compileNode = function (indent) {
      return builder.functionCall(
        'this.__env.BooleanValue.intern',
        [this.children[0].compile() + '.get() || ' + this.children[1].compile() + '.get()'],
        false
      );
    };
    
    /**
     * Creates a node for an inclusive logical AND.
     *
     * @param a First value
     * @param b Second value
     */
    var InclusiveAnd = exports.InclusiveAnd = function (a, b) {
      this.type = 'InclusiveAnd';
      // TODO depends on args
      this.vavaType = 'boolean';
      this.children = [];
      this.appendChild(a);
      this.appendChild(b);
    }
    
    InclusiveAnd.inherits(ASTNode);
    
    InclusiveAnd.prototype.compileNode = function (indent) {
      return builder.functionCall(
        this.children[0].compile() + '.and',
        [this.children[1].compile()],
        false
      );
    };
    
    /**
     * Creates a node for an inclusive logical OR.
     *
     * @param a First value
     * @param b Second value
     */
    var InclusiveOr = exports.InclusiveOr = function (a, b) {
      this.type = 'InclusiveOr';
      // TODO depends on args
      this.vavaType = 'boolean';
      this.children = [];
      this.appendChild(a);
      this.appendChild(b);
    }
    
    InclusiveOr.inherits(ASTNode);
    
    InclusiveOr.prototype.compileNode = function (indent) {
      return builder.functionCall(
        this.children[0].compile() + '.or',
        [this.children[1].compile()],
        false
      );
    };
    
    /**
     * Creates a node for an exclusive logical OR.
     *
     * @param a First value
     * @param b Second value
     */
    var ExclusiveOr = exports.ExclusiveOr = function (a, b) {
      this.type = 'ExclusiveOr';
      // TODO depends on args
      this.vavaType = 'boolean';
      this.children = [];
      this.appendChild(a);
      this.appendChild(b);
    }
    
    ExclusiveOr.inherits(ASTNode);
    
    ExclusiveOr.prototype.compileNode = function (indent) {
      return builder.functionCall(
        this.children[0].compile() + '.xor',
        [this.children[1].compile()],
        false
      );
    };
    
    /**
     * Creates a node for a logical negation.
     *
     * @param boolA Expression of boolean type
     */
    var Negation = exports.Negation = function (boolA) {
      this.type = 'Negation';
      this.vavaType = 'boolean';
      this.children = [];
      this.appendChild(boolA);
    }
    
    Negation.inherits(ASTNode);
    
    Negation.prototype.compileNode = function (indent) {
      return this.children[0].compile() + '.not()';
    };
    
    /**
     * Creates a node for a bitwise negation.
     *
     * @param num Expression of integral type
     */
    var BitwiseNegation = exports.BitwiseNegation = function (num) {
      this.type = 'BitwiseNegation';
      this.vavaType = 'int';
      this.children = [];
      // TODO Check condition
      this.appendChild(num);
    }
    
    BitwiseNegation.inherits(ASTNode);
    
    BitwiseNegation.prototype.compileNode = function (indent) {
      return this.children[0].compile() + '.bitwiseNot()';
    };
    
    /**
     * Creates a node for a leftshift operation.
     *
     * @param a First value
     * @param b Second value
     */
    var LeftShift = exports.LeftShift = function (a, b) {
      this.type = 'LeftShift';
      this.vavaType = 'int';
      this.children = [];
      this.appendChild(a);
      this.appendChild(b);
    }
    
    LeftShift.inherits(ASTNode);
    
    LeftShift.prototype.compileNode = function (indent) {
      return builder.functionCall(
        this.children[0].compile() + '.leftshift',
        [this.children[1].compile()],
        false
      );
    };
    
    /**
     * Creates a node for a rightshift operation.
     *
     * @param a First value
     * @param b Second value
     */
    var RightShift = exports.RightShift = function (a, b) {
      this.type = 'RightShift';
      this.vavaType = 'int';
      this.children = [];
      this.appendChild(a);
      this.appendChild(b);
    }
    
    RightShift.inherits(ASTNode);
    
    RightShift.prototype.compileNode = function (indent) {
      return builder.functionCall(
        this.children[0].compile() + '.rightshift',
        [this.children[1].compile()],
        false
      );
    };
    
    /**
     * Creates a node for a zero-filling rightshift operation.
     *
     * @param a First value
     * @param b Second value
     */
    var ZeroFillRightShift = exports.ZeroFillRightShift = function (a, b) {
      this.type = 'ZeroFillRightShift';
      this.vavaType = 'int';
      this.children = [];
      this.appendChild(a);
      this.appendChild(b);
    }
    
    ZeroFillRightShift.inherits(ASTNode);
    
    ZeroFillRightShift.prototype.compileNode = function (indent) {
      return builder.functionCall(
        this.children[0].compile() + '.zerofillRightshift',
        [this.children[1].compile()],
        false
      );
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
      var js = 'if (this.__env.BooleanValue.intern(true) === ';
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
      var js = utils.indent('if (this.__env.BooleanValue.intern(true) === ', indent);
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
      var js = utils.indent('while (this.__env.BooleanValue.intern(true) === ', indent);
      js += this.children[0].compileNode() + ') {\n';
      js += this.children[1].compileNode(indent + 2) + '\n';
      js += utils.indent('}\n', indent);
      return js;
    };
    
  
    return exports;
  
  }({});
  parser.yy.utils = utils.yyUtils;
  
  // Simple interface for now
  exports.run = function (vavaSrc) {
    if (typeof vavaSrc !== 'string') {
      throw new TypeError('Expected Vava source to be provided as string.');
    }
    var vavaAST = parser.parse(vavaSrc);
    var compilation = vavaAST.compile();
    
    var runner = new Function (compilation);
    // TODO How does the import of `java.lang` happen in Java?
    var scope = new vava.scope.Scope({__env : vava.env}).__add(stdlib).__add(stdlib.java.lang);
    runner.call(scope);
  }
  
    return exports;
  
  }({});

  return exports;
}({});
