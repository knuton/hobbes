var hobbes = function (exports) {
  var require = 'lol', hobbes = exports;
  /**
   * hobbes -- a Java subset interpreter in JavaScript
   * (c) 2011 Johannes Emerich (jemerich@uos.de)
   * v0.1
   */
  
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
   * @constructor
   * Creates a mixin containing instance methods.
   *
   * @param {string} name The mixin's name
   * @param {object} methods Hash containing as keys method namesd, as values fns
   */
  var Mixin = exports.Mixin = function (name, methods_hash) {
    if (typeof name !== 'string' || !methods_hash) {
      throw new Error('Mixin requires name and method hash.');
    }
    this.name = name;
    this.methods = {};
    for (methName in methods_hash) {
      if (typeof methName !== 'string')
        throw new Error('Not a method name: ' + methName);
      if (typeof methods_hash[methName] !== 'function')
        throw new Error('Not a function: ' + methods_hash[methName]);
      this.methods[methName] = methods_hash[methName];
    }
  };
  
  /**
   * Copys the mixin's methods to the constructor's prototype.
   *
   * @param constructor The constructor to augment
   */
  Mixin.prototype.mixInto = function (constructor) {
    for (methName in this.methods) {
      if (!constructor.prototype[methName]) {
        constructor.prototype[methName] = this.methods[methName];
      }
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
      number = 0;
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
     * Wraps a string in parentheses.
     *
     * @param str The string to wrap
     */
    var wrapParens = exports.wrapParens = function (str) {
      return '(' + str + ')';
    };
    
    
    /**
     * Builds a string of variable declaration.
     *
     * @param identifierStr Variable identifier
     * @param semicolonInsertion `true` to insert semicolon at line end (default: true)
     */
    var declaration = exports.declaration = function (identifierStr, semicolonInsertion) {
      return semicolize(['var', identifierStr].join(' '), semicolonInsertion);
    };
    
    /**
     * Builds a string of variable declaration and assignment.
     *
     * @param identifierStr Variable identifier
     * @param expressionStr Variable value
     * @param semicolonInsertion `true` to insert semicolon at line end (default: true)
     */
    var declarationAssignment = exports.declarationAssignment = function (identifierStr, expressionStr, semicolonInsertion) {
      return semicolize([declaration(identifierStr, false), '=', expressionStr].join(' '), semicolonInsertion);
    };
    
    /*** FUNCTIONS ***/
    
    /**
     * Wraps a string of expressions or an array of these as a function.
     *
     * @param code The string of expressions or array of strings of expressions
     * @param params Optional array of paramater list
     * @param noNewline if truthy, no newline is introduced
     */
    var wrapAsFunction = exports.wrapAsFunction = function (code, params, noNewline) {
      code = Array.isArray(code) ? code : [code];
      params = params || [];
      var nlChar = noNewline ? '' : '\n';
      return 'function (' + params.join(', ') + ') {' + nlChar + code.join('\n') + nlChar + '}';
    };
     
    
    /**
     * Builds a string for a function call.
     *
     * @param identifierStr Function identifier
     * @param fnArgs Array of arguments to the function
     * @param semicolonInsertion `true` to insert semicolon at line end (default: true)
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
     * @param semicolonInsertion `true` to insert semicolon at line end (default: true)
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
  
  /**
   * Returns the value found in a given object under a chain of names.
   *
   * e.g. for {hi: {hey: {ha: 5}}}, ['hi', hey'] returns {ha: 5}
   *      for          ''         , ['hi', 'huh'] returns undefined
   * @param obj Object to look up in
   * @param nameChain Array of strings to use as keys
   */
  var objectPath = exports.objectPath = function (obj, nameChain) {
    var curr = obj;
    for (var i = 0; i < nameChain.length; i++) {
      curr = curr[nameChain[i]];
      if (typeof curr !== 'object' && typeof curr !== 'function') return undefined;
    }
    return curr;
  };
  
  exports.yyUtils = {
    merge: merge
  };
  
    return exports;
  
  }({});
  exports.vava     = function (exports) {
  var utils = (typeof hobbes !== 'undefined' && hobbes.utils);
  
  var vavaEntity = function (exports) {
    /**
     * IDEA
     *
     * Access control is implemented through a chain of scopes, the outermost being
     *
    
    /**
     * Names are used to refer to entities declared in a program. A declared entity
     * is a package, class type, interface type, member (class, interface, field,
     * or method) of a reference type, parameter (to a method, constructor, or
     * exception handler), or local variable.
     */
    var Entity = exports.Entity = function () {
      this.scope = {};
    };
    
    Entity.prototype.setScope = function (scope) {
      this.scope = scope;
    };
    
    /**
     * Allows access to an entity's scope.
     * Access control can be specified in a class, interface, method, or field
     * declaration to control when access to a member is allowed.
     *
     * @param name Name to look up
     */
    Entity.prototype.access = function (name) {
      return this.scope[name];
    };
    
    var AccessControlledEntity = exports.AccessControlledEntity = function () {
    
    };
    
    AccessControlledEntity.inherits(Entity);
    
    AccessControlledEntity.prototype.setScope = function (scope) {
      this.scope = scope.__descend();
      this.protectedScope = this.scope.__descend({__public: this.scope});
      this.defaultScope = this.protectedScope.__descend({__protected: this.protectedScope});
      this.privateScope = this.defaultScope.__descend({__default: this.defaultScope});
      this.privateScope.__private = this.privateScope;
    };
  
    return exports;
  
  }({});
  var vavaType = function (exports) {
    /**
     * Defines objects handling type in the runtime environment.
     */
    
    var utils = (typeof hobbes !== 'undefined' && hobbes.utils);
    
    var TypeChecking = exports.TypeChecking = new utils.Mixin('TypeChecking', {
    
      /**
       * Returns the object's vava type.
       */
      getVavaType : function () {
        return this.vavaType;
      },
    
      /**
       * Checks if variable is of given type.
       *
       * @param vavaType Type to check for
       */
      isVavaType : function (vavaType) {
        return this.getVavaType() === vavaType;
      },
    
      /**
       * Checks if variable is of native type.
       *
       * That is, whether it is one of {boolean, byte, short, int, long, char, float, double}.
       */
      isPrimitive : function () {
        var vT = this.getVavaType();
        return (vT === "boolean" || vT === "byte" || vT === "short" || vT === "int" || vT === "long" || vT === "char" || vT === "float" || vT === "double");
      },
    
      /**
       * Checks if variable is of integral type.
       *
       * That is, whether it is one of {byte, short, int, long, char}.
       */
      isIntegral : function () {
        var vT = this.getVavaType();
        return (vT === "byte" || vT === "short" || vT === "char" || vT === "int" || vT === "long");
      },
    
      /**
       * Checks if variable is of floating point type.
       *
       * That is, whether it is one of {float, double}.
       */
      isFloatingPoint : function () {
        var vT = this.getVavaType();
        return (vT === "float" || vT === "double");
      },
    
      /**
       * Checks if variable is of number type.
       *
       * That is, whether it is one of {byte, short, int, long, char, float, double}.
       */
      isNumber : function () {
        return this.isIntegral() || this.isFloatingPoint();
      },
    
      /**
       * Checks for compatibility of own and provided type.
       *
       * TODO Autocasting for natives
       * TODO Hierarchical compatibility for reference types
       */
      isAssignmentCompatible : function (typedValue) {
        if (this.isPrimitive()) {
          if (typedValue.getVavaType() === this.getVavaType()) return true;
          if (this.isIntegral() && typedValue.isIntegral()) return true;
          return this.isFloatingPoint() && typedValue.isNumber();
        } else {
          var vavaType = typedValue.getVavaType();
          return (vavaType === "null" || vavaType === this.getVavaType());
        }
      }
    
    });
    
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
    
    TypeChecking.mixInto(TypedVariable);
    
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
      if (this.getVavaType() === typedValue.getVavaType())
        this.typedValue = typedValue;
      else
        this.typedValue = typedValue.to(this.vavaType);
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
    
    TypeChecking.mixInto(TypedValue);
    
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
    
    // STRING CONCATENATION
    BooleanValue.prototype.add = function (other) {
      if (other.isVavaType('String')) {
         return StringValue.intern(this.toString()).add(other);
      } else {
        throw Error('Called BooleanValue#add with other than String value');
      }
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
      if (other.isIntegral()) {
        return (other.isVavaType('long') || this.isVavaType('long') ? LongValue : IntValue).intern(this.get() + other.get());
      } else if (other.isVavaType('String')) {
        return StringValue.intern(this.toString()).add(other);
      } else {
        return other.add(this);
      }
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
    
    FloatingPointValue.prototype.checkedValue = function (rawValue, sign) {
      // Actual NaN
      if (String(rawValue) === 'NaN')
        return this.rawValue = NaN;
      if (isNaN(rawValue)) {
        throw new Error('Not a number in floating point constructor: ' + rawValue);
      }
      if (rawValue > this.constructor.MAX_VALUE) return this.rawValue = Number.POSITIVE_INFINITY;
      if (rawValue < -this.constructor.MAX_VALUE) return this.rawValue = Number.NEGATIVE_INFINITY;
      if (rawValue > 0 && rawValue < this.constructor.MIN_VALUE) {
        this._sign = 1;
        return this.rawValue = 0;
      }
      if (rawValue < 0 && rawValue > -this.constructor.MIN_VALUE) {
        this._sign = -1;
        return this.rawValue = 0;
      }
      return this.rawValue = rawValue;
    };
    
    FloatingPointValue.prototype.add = function (other) {
      if (other.isVavaType('String')) {
         return StringValue.intern(this.toString()).add(other);
      }
      return (other.isVavaType('double') ? other : this).constructor.intern(this.get() + other.get());
    };
    
    FloatingPointValue.prototype.subtract = function (other) {
      return this.add(other.inverse());
    };
    
    FloatingPointValue.prototype.times = function (other) {
      return (other.isVavaType('double') ? other : this).constructor.intern(this.get() * other.get());
    };
    
    FloatingPointValue.prototype.divide = function (other) {
      var thisRaw = this.get(),
          otherRaw = other.get();
      if (otherRaw === 0) {
        if (thisRaw === 0)
          return (other.isVavaType('double') ? other : this).constructor.intern(NaN);
      }
      
      return (other.isVavaType('double') ? other : this).constructor.intern(this.get() / other.get());
    };
    
    FloatingPointValue.prototype.modulo = function (other) {
      return (other.isVavaType('double') ? other : this).constructor.intern(this.get() % other.get());
    };
    
    FloatingPointValue.prototype.sign = function () {
      return this._sign || this.rawValue / Math.abs(this.rawValue);
    };
    
    FloatingPointValue.prototype.signSymbol = function () {
      return this._sign < 0 ? '-' : '';
    };
    
    FloatingPointValue.prototype.toString = function () {
      var value = this.get();
      // remove sign, fix to precision 15, remove pre-point digits, remove exponent
      //var valueFixedToFifteen = Math.abs(value).toFixed(15).split('.').pop().split(/e/i).shift(),
      //    postPointDigits;
      //for (postPointDigits = 15; postPointDigits > 0 && valueFixedToFifteen.charAt(postPointDigits - 1) === '0'; postPointDigits--) {
      //  console.log('pp', postPointDigits);
      //}
      // sign symbol for signed zero, post-point zero for whole numbers, at least 15 digit precision unless less non-zero digits
      //return this.signSymbol() + (parseInt(value, 10) === value ? value.toFixed(1) : value.toPrecision(postPointDigits < 15 ? postPointDigits : 15));
      return this.signSymbol() + (parseInt(value, 10) === value ? value.toFixed(1) : value);
    };
    
    var FloatValue = exports.FloatValue = function (rawValue, sign) {
      
      this.vavaType = 'float';
      this.checkedValue(rawValue, sign);
    
    };
    
    FloatValue.inherits(FloatingPointValue, {stored: {}, MIN_VALUE: 1.40239846e-45, MAX_VALUE: 3.40282347e+38});
    
    var DoubleValue = exports.DoubleValue = function (rawValue, sign) {
      
      this.vavaType = 'double';
      this.checkedValue(rawValue, sign);
    
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
    
    StringValue.stored = {};
    
    StringValue.prototype.vavaMethods = [];
    
    /**
     * Returns a truthy/false value depending on the string possessing a method
     * with the given signature.
     *
     * Returns the method's return type, if it does, otherwise returns false.
     *
     * e.g. StringValue.intern("foo").hasMethod('fib(int)')
     */
    StringValue.prototype.hasMethod = function (methodSignature) {
      return !!this.vavaMethods[methodSignature] && this.vavaMethods[methodSignature].getVavaType();
    };
    
    /**
     * Sends the string a message to call its method of the provided name.
     *
     * @param methodName Name of the method to call
     * @param params Parameters to pass
     */
    StringValue.prototype.send = function (methodSignature, params) {
      return this.vavaMethods[methodSignature].call(this, params);
    };
    
    StringValue.prototype.add = function (other) {
      return StringValue.intern(this.toString() + other.toString());
    };
    
    StringValue.prototype.toString = function () {
      return this.rawValue;
    };
    
    /**
     * Used to intern StringValues.
     *
     * @param rawStr The string value to lookup/insert
     */
    StringValue.intern = function (rawStr) {
      if (this.stored[rawStr])
        return this.stored[rawStr];
      else
        return (this.stored[rawStr] = new this(rawStr));
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
  var vavaClass = function (exports) {
    var entity = (typeof vavaEntity !== 'undefined' && vavaEntity);
    
    var VavaClass = exports.VavaClass = function (vavaClassName, vavaClassDefinition, scope) {
      
      this.vavaClassName = vavaClassName;
      this.setScope(scope);
      this.addFields(vavaClassDefinition.fields);
      this.scope.__class = this.scope.__self = this;
      this.addMethods(vavaClassDefinition.methods);
      
      setModifiers(this, vavaClassDefinition.vavaModifiers);
      
    };
    
    VavaClass.inherits(entity.AccessControlledEntity);
    
    VavaClass.prototype.addFields = function (fieldDefinitions) {
      if (!fieldDefinitions || !fieldDefinitions.length) return;
      for (var i = 0; i < fieldDefinitions.length; i++) {
        var fieldDef = fieldDefinitions[i];
        this.privateScope['__' + fieldDef.visibility].__add(fieldDef.variables);
      }
    };
    
    VavaClass.prototype.addMethods = function (methodDefinitions) {
      if (!methodDefinitions || !methodDefinitions.length || this.vavaMethods) return;
      this.vavaMethods = [];
      for (var i = 0; i < methodDefinitions.length; i++) {
        var methodDef = methodDefinitions[i];
        this.vavaMethods[methodDef.signature()] = methodDef;
      }
    };
    
    /**
     * Returns a truthy/false value depending on the class possessing a method
     * with the given signature.
     *
     * Returns the method's return type, if it does, otherwise returns false.
     *
     * e.g. vavaClass.hasMethod('fib(int)')
     */
    VavaClass.prototype.hasMethod = function (methodSignature) {
      return !!this.vavaMethods[methodSignature] && this.vavaMethods[methodSignature].getVavaType();
    };
    
    /**
     * Sends the class a message to call its method of the provided name.
     *
     * @param methodName Name of the method to call
     * @param params Parameters to pass
     */
    VavaClass.prototype.send = function (methodSignature, params) {
      return this.vavaMethods[methodSignature].call(this.privateScope, params);
    };
    
    function setModifiers (classInstance, modifierOptions) {
      modifierOptions = modifierOptions || {};
      classInstance.vavaVisibility = modifierOptions.vavaVisibility || 'default';
    }
  
    return exports;
  
  }({});
  var vavaMethod = function (exports) {
    var type = (typeof vavaType !== 'undefined' && vavaType);
    
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
      this.vavaFormalParameters = vavaFormalParameters || [];
      this.vavaBlock = vavaBlock;
      
    };
    
    /**
     * Returns the method's name.
     */
    VavaMethod.prototype.name = function () {
      return this.vavaMethodName;
    };
    
    VavaMethod.prototype.signature = function () {
      return this.name() + '(' + this.formalParameterTypes().join(',') + ')';
    };
    
    VavaMethod.prototype.getVavaType = function () {
      return this.vavaReturnType;
    };
    
    VavaMethod.prototype.formalParameterTypes = function () {
      return this.vavaFormalParameters.map(function (fp) {
        return fp.vavaType;
      });
    };
    
    /**
     * Calls its block after checking type validity of arguments.
     *
     * @param args Array of parameters
     */
    VavaMethod.prototype.call = function (scope, args) {
      
      var locals = {};
    
      for (var i = 0; i < this.vavaFormalParameters.length; i++) {
        var identifier = this.vavaFormalParameters[i].identifier;
        var value = args[i];
        locals[identifier] = new type.TypedVariable(value.getVavaType(), identifier, value);
      }
      return this.vavaBlock.apply(scope.__descend(locals));
      
    };
  
    return exports;
  
  }({});
  
  // Add some String instance methods
  vavaType.StringValue.prototype.vavaMethods['length()'] = new vavaMethod.VavaMethod('length', 'int', [], function () {});
  vavaType.StringValue.prototype.vavaMethods['length()'].call = function (stringObj, args) {
    return vavaType.IntValue.intern(stringObj.length);
  };
  
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
    
    Scope.prototype.__addName = function (name, value) {
      this[name] = value;
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
  
  exports.mixins = {
    TypeChecking : vavaType.TypeChecking
  };
  
  exports.env = utils.merge(
    vavaClass,
    vavaMethod,
    vavaType
  );
  
    return exports;
  
  }({});
  exports.stdlib   = function (exports) {
  exports.java = function (exports) {
    exports.lang = function (exports) {
        var vava = (typeof hobbes !== 'undefined' && hobbes.vava);
        
        exports.System = function (exports) {
              var vava = (typeof hobbes !== 'undefined' && hobbes.vava);
              
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
              
              
                // Construct input element
                var inputElem = document.createElement('textarea');
                inputElem.setAttribute('style', 'display: none;');
                if(typeof document !== 'undefined' && document.body)
                  document.body.appendChild(inputElem);
              
                // Return classes with elem as output element
                return {
                  'in' : new vava.env.VavaClass(
                    'In',
                    {
                      methods : [
                        // :'(
                        new vava.env.VavaMethod(
                          'readln',
                          'String',
                          [],
                          function () {
                            return this.__env.StringValue.intern(prompt());
                          }
                        ),
                        new vava.env.VavaMethod(
                          'readln',
                          'String',
                          [{identifier: 's', vavaType: 'String'}],
                          function () {
                            return this.__env.StringValue.intern(prompt(this.s.get()));
                          }
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
              
        
          return exports;
        
        }({}).System;
        
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
        
    
      return exports;
    
    }({});
  
    return exports;
  
  }({});
  exports.AlgoTools = function (exports) {
    exports.source = {};
    
    exports.source['IO'] = 'public class IO {\n\n  public static void print(String s) {\n    System.out.print(s);\n  }\n\n  public static void print(char c) {\n    System.out.print(c);\n  }\n\n  public static void println(String s) {\n    print(s + "\\n");\n  }\n  \n  public static void println(boolean b) {\n    print(b + "\\n");\n  }\n  \n  public static void println(byte b) {\n    print(b + "\\n");\n  }\n  \n  public static void println(short s) {\n    print(s + "\\n");\n  }\n  \n  public static void println(char c) {\n    print(c + "\\n");\n  }\n  \n  public static void println(int i) {\n    print(i + "\\n");\n  }\n  \n  public static void println(long l) {\n    print(l + "\\n");\n  }\n  \n  public static void println(long l, int len) {\n    String s = Long.toString(l);\n    while (s.length() < len) {\n      s = " " + s;\n    }\n    println(s);\n  }\n  \n  public static void println(float f) {\n    print(f + "\\n");\n  }\n  \n  public static void println(double d) {\n    print(d + "\\n");\n  }\n\n  public static int readInt() {\n    int in = Integer.parseInt(System.in.readln());\n    println(in);\n    return in;\n  }\n  \n  public static int readInt(String s) {\n    print(s);\n    int in = Integer.parseInt(System.in.readln(s));\n    println(in);\n    return in;\n  }\n  \n  public static void main(String[] args) {\n    println("Hi");\n    println(true);\n    println(5);\n    println(5f);\n  }\n\n}\n';
  
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
    symbols_: {"error":2,"compilation_unit":3,"EOF":4,"package_declaration":5,"import_declarations":6,"type_declarations":7,"literal":8,"integer_literal":9,"character_literal":10,"floating_point_literal":11,"boolean_literal":12,"string_literal":13,"null_literal":14,"DECIMAL_INTEGER_LITERAL":15,"FLOATING_POINT_LITERAL":16,"TRUE_LITERAL":17,"FALSE_LITERAL":18,"CHAR_LITERAL":19,"STRING_LITERAL":20,"NULL_LITERAL":21,"KEYWORD_PACKAGE":22,"IDENTIFIER":23,"LINE_TERMINATOR":24,"import_declaration":25,"KEYWORD_IMPORT":26,"name":27,"type_declaration":28,"class_declaration":29,"modifiers":30,"modifier":31,"public":32,"private":33,"protected":34,"static":35,"final":36,"KEYWORD_CLASS":37,"class_body":38,"EMBRACE":39,"class_body_declarations":40,"UNBRACE":41,"class_body_declaration":42,"class_member_declaration":43,"field_declaration":44,"method_declaration":45,"type":46,"variable_declarators":47,"method_header":48,"method_body":49,"method_declarator":50,"void":51,"LEFT_PAREN":52,"formal_parameter_list":53,"RIGHT_PAREN":54,"LEFT_BRACKET":55,"RIGHT_BRACKET":56,"formal_parameter":57,"COMMA":58,"variable_declarator_id":59,"block":60,"variable_declarator":61,"OPERATOR_ASSIGNMENT":62,"variable_initializer":63,"expression":64,"primitive_type":65,"STRING_TYPE":66,"numeric_type":67,"PRIMITIVE_BOOLEAN":68,"integral_type":69,"floating_point_type":70,"PRIMITIVE_BYTE":71,"PRIMITIVE_SHORT":72,"PRIMITIVE_INTEGER":73,"PRIMITIVE_LONG":74,"PRIMITIVE_CHAR":75,"PRIMITIVE_FLOAT":76,"PRIMITIVE_DOUBLE":77,"block_statements":78,"block_statement":79,"local_variable_declaration_statement":80,"statement":81,"local_variable_declaration":82,"statement_without_trailing_substatement":83,"if_then_statement":84,"if_then_else_statement":85,"while_statement":86,"for_statement":87,"statement_no_short_if":88,"labeled_statement_no_short_if":89,"if_then_else_statement_no_short_if":90,"while_statement_no_short_if":91,"for_statement_no_short_if":92,"empty_statement":93,"expression_statement":94,"switch_statement":95,"do_statement":96,"break_statement":97,"return_statement":98,"statement_expression":99,"break":100,"assignment":101,"pre_increment_expression":102,"pre_decrement_expression":103,"post_increment_expression":104,"post_decrement_expression":105,"method_invocation":106,"return":107,"KEYWORD_IF":108,"KEYWORD_ELSE":109,"switch":110,"switch_block":111,"switch_block_statement_groups":112,"switch_labels":113,"switch_block_statement_group":114,"switch_label":115,"case":116,"constant_expression":117,"COLON":118,"default":119,"KEYWORD_WHILE":120,"KEYWORD_DO":121,"KEYWORD_FOR":122,"for_init":123,"for_update":124,"statement_expression_list":125,"simple_name":126,"qualified_name":127,"SEPARATOR_DOT":128,"primary":129,"primary_no_new_array":130,"argument_list":131,"postfix_expression":132,"OPERATOR_INCREMENT":133,"OPERATOR_DECREMENT":134,"unary_expression":135,"OPERATOR_SUBTRACTION":136,"OPERATOR_ADDITION":137,"unary_expression_not_plus_minus":138,"OPERATOR_BITWISE_NEGATION":139,"OPERATOR_NEGATION":140,"cast_expression":141,"multiplicative_expression":142,"OPERATOR_MULTIPLICATION":143,"OPERATOR_DIVISON":144,"OPERATOR_MODULO":145,"additive_expression":146,"shift_expression":147,"OPERATOR_LEFTSHIFT":148,"OPERATOR_RIGHTSHIFT":149,"OPERATOR_ZEROFILL_RIGHTSHIFT":150,"relational_expression":151,"OPERATOR_LESS_THAN":152,"OPERATOR_LESS_THAN_EQUAL":153,"OPERATOR_GREATER_THAN":154,"OPERATOR_GREATER_THAN_EQUAL":155,"equality_expression":156,"OPERATOR_EQUAL":157,"OPERATOR_NOT_EQUAL":158,"and_expression":159,"OPERATOR_INCLUSIVE_AND":160,"exclusive_or_expression":161,"OPERATOR_XOR":162,"inclusive_or_expression":163,"OPERATOR_INCLUSIVE_OR":164,"conditional_and_expression":165,"OPERATOR_LOGICAL_AND":166,"conditional_or_expression":167,"OPERATOR_LOGICAL_OR":168,"conditional_expression":169,"QUESTION_MARK":170,"assignment_expression":171,"+=":172,"/=":173,"assignment_operator":174,"$accept":0,"$end":1},
    terminals_: {2:"error",4:"EOF",15:"DECIMAL_INTEGER_LITERAL",16:"FLOATING_POINT_LITERAL",17:"TRUE_LITERAL",18:"FALSE_LITERAL",19:"CHAR_LITERAL",20:"STRING_LITERAL",21:"NULL_LITERAL",22:"KEYWORD_PACKAGE",23:"IDENTIFIER",24:"LINE_TERMINATOR",26:"KEYWORD_IMPORT",32:"public",33:"private",34:"protected",35:"static",36:"final",37:"KEYWORD_CLASS",39:"EMBRACE",41:"UNBRACE",51:"void",52:"LEFT_PAREN",54:"RIGHT_PAREN",55:"LEFT_BRACKET",56:"RIGHT_BRACKET",58:"COMMA",62:"OPERATOR_ASSIGNMENT",66:"STRING_TYPE",68:"PRIMITIVE_BOOLEAN",71:"PRIMITIVE_BYTE",72:"PRIMITIVE_SHORT",73:"PRIMITIVE_INTEGER",74:"PRIMITIVE_LONG",75:"PRIMITIVE_CHAR",76:"PRIMITIVE_FLOAT",77:"PRIMITIVE_DOUBLE",89:"labeled_statement_no_short_if",100:"break",107:"return",108:"KEYWORD_IF",109:"KEYWORD_ELSE",110:"switch",116:"case",118:"COLON",119:"default",120:"KEYWORD_WHILE",121:"KEYWORD_DO",122:"KEYWORD_FOR",128:"SEPARATOR_DOT",133:"OPERATOR_INCREMENT",134:"OPERATOR_DECREMENT",136:"OPERATOR_SUBTRACTION",137:"OPERATOR_ADDITION",139:"OPERATOR_BITWISE_NEGATION",140:"OPERATOR_NEGATION",143:"OPERATOR_MULTIPLICATION",144:"OPERATOR_DIVISON",145:"OPERATOR_MODULO",148:"OPERATOR_LEFTSHIFT",149:"OPERATOR_RIGHTSHIFT",150:"OPERATOR_ZEROFILL_RIGHTSHIFT",152:"OPERATOR_LESS_THAN",153:"OPERATOR_LESS_THAN_EQUAL",154:"OPERATOR_GREATER_THAN",155:"OPERATOR_GREATER_THAN_EQUAL",157:"OPERATOR_EQUAL",158:"OPERATOR_NOT_EQUAL",160:"OPERATOR_INCLUSIVE_AND",162:"OPERATOR_XOR",164:"OPERATOR_INCLUSIVE_OR",166:"OPERATOR_LOGICAL_AND",168:"OPERATOR_LOGICAL_OR",170:"QUESTION_MARK",172:"+=",173:"/="},
    productions_: [0,[3,1],[3,2],[3,2],[3,2],[3,3],[3,3],[3,3],[3,4],[8,1],[8,1],[8,1],[8,1],[8,1],[8,1],[9,1],[11,1],[12,1],[12,1],[10,1],[13,1],[14,1],[5,3],[6,1],[6,2],[25,3],[7,1],[28,1],[30,1],[30,2],[31,1],[31,1],[31,1],[31,1],[31,1],[29,3],[29,4],[38,3],[40,1],[40,2],[42,1],[43,1],[43,1],[44,3],[44,4],[45,2],[48,3],[48,2],[48,3],[48,2],[50,4],[50,3],[50,7],[53,1],[53,3],[57,2],[49,1],[47,1],[47,3],[61,1],[61,3],[59,1],[63,1],[46,1],[46,1],[65,1],[65,1],[67,1],[67,1],[69,1],[69,1],[69,1],[69,1],[69,1],[70,1],[70,1],[60,2],[60,3],[78,1],[78,2],[79,1],[79,1],[80,2],[82,2],[82,3],[81,1],[81,1],[81,1],[81,1],[81,1],[88,1],[88,1],[88,1],[88,1],[88,1],[83,1],[83,1],[83,1],[83,1],[83,1],[83,1],[83,1],[93,1],[94,2],[97,2],[99,1],[99,1],[99,1],[99,1],[99,1],[99,1],[98,2],[98,1],[84,5],[84,5],[84,5],[84,5],[84,5],[85,7],[85,7],[85,7],[85,7],[85,7],[90,7],[90,7],[90,7],[90,7],[90,7],[95,5],[111,2],[111,4],[111,3],[111,3],[112,1],[112,2],[114,2],[113,1],[113,2],[115,3],[115,2],[86,5],[91,5],[96,7],[87,9],[87,8],[87,8],[87,7],[87,8],[87,7],[87,7],[87,6],[92,9],[92,8],[92,8],[92,7],[92,8],[92,7],[92,7],[92,6],[123,1],[123,1],[124,1],[125,1],[125,3],[27,1],[27,1],[126,1],[127,3],[129,1],[130,1],[130,3],[130,1],[131,1],[131,3],[106,3],[106,4],[132,1],[132,1],[132,1],[132,1],[104,2],[105,2],[135,1],[135,1],[135,2],[135,2],[135,1],[102,2],[103,2],[138,1],[138,2],[138,2],[138,1],[141,4],[142,1],[142,3],[142,3],[142,3],[146,1],[146,3],[146,3],[147,1],[147,3],[147,3],[147,3],[151,1],[151,3],[151,3],[151,3],[151,3],[156,1],[156,3],[156,3],[159,1],[159,3],[161,1],[161,3],[163,1],[163,3],[165,1],[165,3],[167,1],[167,3],[169,1],[169,5],[171,1],[171,1],[101,3],[101,3],[101,3],[174,1],[64,1],[117,1]],
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
    case 9: this.$ = $$[$0]; 
    break;
    case 10: this.$ = $$[$0]; 
    break;
    case 11: this.$ = $$[$0]; 
    break;
    case 12: this.$ = $$[$0]; 
    break;
    case 13: this.$ = $$[$0]; 
    break;
    case 14: this.$ = $$[$0]; 
    break;
    case 15: this.$ = new yy.IntegerLiteral($$[$0], _$[$0]); 
    break;
    case 16: this.$ = new yy.FloatingPointLiteral($$[$0], _$[$0]); 
    break;
    case 17: this.$ = new yy.BooleanLiteral($$[$0], _$[$0]); 
    break;
    case 18: this.$ = new yy.BooleanLiteral($$[$0], _$[$0]); 
    break;
    case 19: this.$ = new yy.CharLiteral($$[$0], _$[$0]); 
    break;
    case 20: this.$ = new yy.StringLiteral($$[$0], _$[$0]); 
    break;
    case 21: this.$ = new yy.NullLiteral($$[$0], _$[$0]); 
    break;
    case 22: this.$ = $$[$0-1]; 
    break;
    case 23: this.$ = new yy.ImportDeclarations($$[$0], _$[$0]); 
    break;
    case 24: $$[$0-1].appendChild($$[$0]); this.$ = $$[$0-1]; 
    break;
    case 25: this.$ = new yy.ImportDeclaration($$[$0-1], this._$); 
    break;
    case 26: this.$ = $$[$0]; 
    break;
    case 27: this.$ = $$[$0]; 
    break;
    case 28: this.$ = $$[$0]; 
    break;
    case 29: this.$ = yy.utils.merge($$[$0-1], $$[$0]); 
    break;
    case 30: this.$ = {visibility: 'public'}; 
    break;
    case 31: this.$ = {visibility: 'private'}; 
    break;
    case 32: this.$ = {visibility: 'protected'}; 
    break;
    case 33: this.$ = {staticity: 'static'}; 
    break;
    case 34: this.$ = {valuedness: 'final'}; 
    break;
    case 35: this.$ = new yy.ClassDeclaration($$[$0-1], $$[$0], this._$); 
    break;
    case 36: this.$ = new yy.ClassDeclaration($$[$0-1], $$[$0], this._$); 
    break;
    case 37: this.$ = $$[$0-1]; 
    break;
    case 38: this.$ = [$$[$0]]; 
    break;
    case 39: $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
    break;
    case 40: this.$ = $$[$0] 
    break;
    case 41: this.$ = $$[$0]; 
    break;
    case 42: this.$ = $$[$0]; 
    break;
    case 43: this.$ = new yy.FieldDeclaration($$[$0-2], $$[$0-1], this._$); 
    break;
    case 44: this.$ = new yy.FieldDeclaration($$[$0-2], $$[$0-1], $$[$0-3], this._$); 
    break;
    case 45: this.$ = new yy.MethodDeclaration($$[$0-1], $$[$0], $$[$0-1].loc); 
    break;
    case 46: this.$ = yy.utils.merge({vavaType: $$[$0-1]}, $$[$0]); 
    break;
    case 47: this.$ = yy.utils.merge({vavaType: $$[$0-1]}, $$[$0]); 
    break;
    case 48: this.$ = yy.utils.merge({vavaType: $$[$0-1]}, $$[$0]); 
    break;
    case 49: this.$ = yy.utils.merge({vavaType: $$[$0-1]}, $$[$0]); 
    break;
    case 50: this.$ = {vavaIdentifier: $$[$0-3], vavaFormalParameters: $$[$0-1], loc: _$[$0-3]}; 
    break;
    case 51: this.$ = {vavaIdentifier: $$[$0-2], loc: _$[$0-2]}; 
    break;
    case 52: this.$ = {vavaIdentifier: $$[$0-6], vavaFormalParameters: [new yy.FormalParameter('String[]', $$[$0-1])], loc: _$[$0-6]}; 
    break;
    case 53: this.$ = [$$[$0]]; 
    break;
    case 54: this.$ = $$[$0-2]; this.$.push($$[$0]); 
    break;
    case 55: this.$ = new yy.FormalParameter($$[$0-1], $$[$0], this._$); 
    break;
    case 56: this.$ = $$[$0]; 
    break;
    case 57: this.$ = new yy.VariableDeclarators($$[$0], _$[$0]); 
    break;
    case 58: $$[$0-2].appendChild($$[$0]); this.$ = $$[$0-2]; 
    break;
    case 59: this.$ = new yy.VariableDeclarator($$[$0], _$[$0]); 
    break;
    case 60: this.$ = new yy.VariableDeclarator($$[$0-2], $$[$0], this._$); 
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
    case 66: this.$ = $$[$0]; 
    break;
    case 67: this.$ = $$[$0]; 
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
    case 73: this.$ = $$[$0]; 
    break;
    case 74: this.$ = $$[$0]; 
    break;
    case 75: this.$ = $$[$0]; 
    break;
    case 76: this.$ = new yy.Block(this._$); 
    break;
    case 77: this.$ = new yy.Block($$[$0-1], this._$); 
    break;
    case 78: this.$ = [$$[$0]]; 
    break;
    case 79: this.$ = $$[$0-1]; this.$.push($$[$0]); 
    break;
    case 80: this.$ = $$[$0]; 
    break;
    case 81: this.$ = $$[$0]; 
    break;
    case 82: this.$ = new yy.LocalVariableDeclarationStatement($$[$0-1], this._$); 
    break;
    case 83: this.$ = new yy.LocalVariableDeclaration($$[$0-1], $$[$0], this._$); 
    break;
    case 84: this.$ = new yy.LocalVariableDeclaration($$[$0-1], $$[$0], $$[$0-2], this._$); 
    break;
    case 85: this.$ = $$[$0]; 
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
    case 91: this.$ = $$[$0]; 
    break;
    case 92: this.$ = $$[$0]; 
    break;
    case 93: this.$ = $$[$0]; 
    break;
    case 94: this.$ = $$[$0]; 
    break;
    case 95: this.$ = $$[$0]; 
    break;
    case 96: this.$ = $$[$0]; 
    break;
    case 97: this.$ = $$[$0]; 
    break;
    case 98: this.$ = $$[$0]; 
    break;
    case 99: this.$ = $$[$0]; 
    break;
    case 100: this.$ = $$[$0]; 
    break;
    case 101: this.$ = $$[$0]; 
    break;
    case 102: this.$ = new yy.ASTNode(); 
    break;
    case 103: this.$ = new yy.ExpressionStatement($$[$0-1], _$[$0-1]); 
    break;
    case 104: this.$ = new yy.BreakStatement(_$[$0-1]); 
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
    case 110: this.$ = $$[$0]; 
    break;
    case 111: this.$ = new yy.ReturnStatement($$[$0], this._$); 
    break;
    case 112: this.$ = new yy.ReturnStatement(this._$); 
    break;
    case 113: this.$ = new yy.IfThen($$[$0-2], $$[$0], this._$); 
    break;
    case 114: this.$ = new yy.IfThen($$[$0-2], $$[$0], this._$); 
    break;
    case 115: this.$ = new yy.IfThen($$[$0-2], $$[$0], this._$); 
    break;
    case 116: this.$ = new yy.IfThen($$[$0-2], $$[$0], this._$); 
    break;
    case 117: this.$ = new yy.IfThen($$[$0-2], $$[$0], this._$); 
    break;
    case 118: this.$ = new yy.IfThenElse($$[$0-4], $$[$0-2], $$[$0], this._$); 
    break;
    case 119: this.$ = new yy.IfThenElse($$[$0-4], $$[$0-2], $$[$0], this._$); 
    break;
    case 120: this.$ = new yy.IfThenElse($$[$0-4], $$[$0-2], $$[$0], this._$); 
    break;
    case 121: this.$ = new yy.IfThenElse($$[$0-4], $$[$0-2], $$[$0], this._$); 
    break;
    case 122: this.$ = new yy.IfThenElse($$[$0-4], $$[$0-2], $$[$0], this._$); 
    break;
    case 123: this.$ = new yy.IfThenElse($$[$0-4], $$[$0-2], $$[$0], this._$); 
    break;
    case 124: this.$ = new yy.IfThenElse($$[$0-4], $$[$0-2], $$[$0], this._$); 
    break;
    case 125: this.$ = new yy.IfThenElse($$[$0-4], $$[$0-2], $$[$0], this._$); 
    break;
    case 126: this.$ = new yy.IfThenElse($$[$0-4], $$[$0-2], $$[$0], this._$); 
    break;
    case 127: this.$ = new yy.IfThenElse($$[$0-4], $$[$0-2], $$[$0], this._$); 
    break;
    case 128: this.$ = new yy.Switch($$[$0-2], $$[$0], this._$); 
    break;
    case 129: this.$ = new yy.SwitchBlock([], [], this._$); 
    break;
    case 130: this.$ = new yy.SwitchBlock($$[$0-2], $$[$0-1], this._$); 
    break;
    case 131: this.$ = new yy.SwitchBlock([], $$[$0], this._$); 
    break;
    case 132: this.$ = new yy.SwitchBlock($$[$0-1], [], this._$); 
    break;
    case 133: this.$ = [$$[$0]]; 
    break;
    case 134: $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
    break;
    case 135: this.$ = new yy.SwitchBlockStatementGroup($$[$0-1], $$[$0], this._$); 
    break;
    case 136: this.$ = [$$[$0]]; 
    break;
    case 137: $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
    break;
    case 138: this.$ = new yy.SwitchLabel($$[$0-1], this._$); 
    break;
    case 139: this.$ = new yy.SwitchLabel(this._$); 
    break;
    case 140: this.$ = new yy.WhileLoop($$[$0-2], $$[$0], this._$); 
    break;
    case 141: this.$ = new yy.WhileLoop($$[$0-2], $$[$0], this._$); 
    break;
    case 142: this.$ = new yy.DoWhileLoop($$[$0-5], $$[$0-2], this._$); 
    break;
    case 143: this.$ = new yy.ForLoop($$[$0-6], $$[$0-4], $$[$0-2], $$[$0], this._$); 
    break;
    case 144: this.$ = new yy.ForLoop($$[$0-5], $$[$0-3], null, $$[$0], this._$); 
    break;
    case 145: this.$ = new yy.ForLoop($$[$0-5], null, $$[$0-2], $$[$0], this._$); 
    break;
    case 146: this.$ = new yy.ForLoop($$[$0-4], null, null, $$[$01], this._$); 
    break;
    case 147: this.$ = new yy.ForLoop(null, $$[$0-4], $$[$0-2], $$[$0], this._$); 
    break;
    case 148: this.$ = new yy.ForLoop(null, $$[$0-3], null, $$[$01], this._$); 
    break;
    case 149: this.$ = new yy.ForLoop(null, null, $$[$0-1], $$[$01], this._$); 
    break;
    case 150: this.$ = new yy.ForLoop(null, null, null, $$[$02], this._$); 
    break;
    case 151: this.$ = new yy.ForLoop($$[$0-6], $$[$0-4], $$[$0-2], $$[$0], this._$); 
    break;
    case 152: this.$ = new yy.ForLoop($$[$0-5], $$[$0-3], null, $$[$0], this._$); 
    break;
    case 153: this.$ = new yy.ForLoop($$[$0-5], null, $$[$0-2], $$[$0], this._$); 
    break;
    case 154: this.$ = new yy.ForLoop($$[$0-4], null, null, $$[$01], this._$); 
    break;
    case 155: this.$ = new yy.ForLoop(null, $$[$0-4], $$[$0-2], $$[$0], this._$); 
    break;
    case 156: this.$ = new yy.ForLoop(null, $$[$0-3], null, $$[$01], this._$); 
    break;
    case 157: this.$ = new yy.ForLoop(null, null, $$[$0-1], $$[$01], this._$); 
    break;
    case 158: this.$ = new yy.ForLoop(null, null, null, $$[$02], this._$); 
    break;
    case 159: this.$ = $$[$0]; 
    break;
    case 160: this.$ = $$[$0]; 
    break;
    case 161: this.$ = $$[$0]; 
    break;
    case 162: this.$ = new yy.StatementExpressionList($$[$0]); 
    break;
    case 163: $$[$0-2].appendChild($$[$0]); this.$ = $$[$0-2]; 
    break;
    case 164: this.$ = $$[$0]; 
    break;
    case 165: this.$ = $$[$0]; 
    break;
    case 166: this.$ = new yy.Name($$[$0], _$[$0]); 
    break;
    case 167: this.$ = new yy.Name($$[$0-2].qualified() + '.' + $$[$0], this._$); 
    break;
    case 168: this.$ = $$[$0]; 
    break;
    case 169: this.$ = $$[$0]; 
    break;
    case 170: this.$ = $$[$0-1]; 
    break;
    case 171: this.$ = $$[$0]; 
    break;
    case 172: this.$ = new yy.ArgumentList($$[$0], _$[$0]); 
    break;
    case 173: $$[$0-2].appendChild($$[$0]); this.$ = $$[$0-2]; 
    break;
    case 174: this.$ = new yy.MethodInvocation($$[$0-2], new yy.ArgumentList(), this._$); 
    break;
    case 175: this.$ = new yy.MethodInvocation($$[$0-3], $$[$0-1], this._$); 
    break;
    case 176: this.$ = $$[$0]; 
    break;
    case 177: this.$ = $$[$0]; 
    break;
    case 178: this.$ = $$[$0]; 
    break;
    case 179: this.$ = $$[$0]; 
    break;
    case 180: this.$ = new yy.PostIncrement($$[$0-1], _$[$0]); 
    break;
    case 181: this.$ = new yy.PostDecrement($$[$0-1], _$[$0]); 
    break;
    case 182: this.$ = $$[$0]; 
    break;
    case 183: this.$ = $$[$0]; 
    break;
    case 184: this.$ = new yy.UnaryMinus($$[$0], _$[$0-1]); 
    break;
    case 185: this.$ = new yy.UnaryPlus($$[$0], _$[$0-1]); 
    break;
    case 186: this.$ = $$[$0]; 
    break;
    case 187: this.$ = new yy.PreIncrement($$[$0], _$[$0-1]); 
    break;
    case 188: this.$ = new yy.PreDecrement($$[$0], _$[$0-1]); 
    break;
    case 189: this.$ = $$[$0]; 
    break;
    case 190: this.$ = new yy.BitwiseNegation($$[$0], _$[$0-1]); 
    break;
    case 191: this.$ = new yy.Negation($$[$0], _$[$0-1]); 
    break;
    case 192: this.$ = $$[$0]; 
    break;
    case 193: this.$ = new yy.CastExpression($$[$0-2], $$[$0], _$[$0]); 
    break;
    case 194: this.$ = $$[$0]; 
    break;
    case 195: this.$ = new yy.Multiplication($$[$0-2], $$[$0], _$[$0-1]); 
    break;
    case 196: this.$ = new yy.Division($$[$0-2], $$[$0], _$[$0-1]); 
    break;
    case 197: this.$ = new yy.Modulo($$[$0-2], $$[$0], _$[$0-1]); 
    break;
    case 198: this.$ = $$[$0]; 
    break;
    case 199: this.$ = new yy.Addition($$[$0-2], $$[$0], _$[$0-1]); 
    break;
    case 200: this.$ = new yy.Subtraction($$[$0-2], $$[$0], _$[$0-1]); 
    break;
    case 201: this.$ = $$[$0]; 
    break;
    case 202: this.$ = new yy.LeftShift($$[$0-2], $$[$0], _$[$0-1]); 
    break;
    case 203: this.$ = new yy.RightShift($$[$0-2], $$[$0], _$[$0-1]); 
    break;
    case 204: this.$ = new yy.ZeroFillRightShift($$[$0-2], $$[$0], _$[$0-1]); 
    break;
    case 205: this.$ = $$[$0]; 
    break;
    case 206: this.$ = new yy.LessThan($$[$0-2], $$[$0], _$[$0-1]); 
    break;
    case 207: this.$ = new yy.LessThanEqual($$[$0-2], $$[$0], _$[$0-1]); 
    break;
    case 208: this.$ = new yy.GreaterThan($$[$0-2], $$[$0], _$[$0-1]); 
    break;
    case 209: this.$ = new yy.GreaterThanEqual($$[$0-2], $$[$0], _$[$0-1]); 
    break;
    case 210: this.$ = $$[$0]; 
    break;
    case 211: this.$ = new yy.Equals($$[$0-2], $$[$0], _$[$0-1]); 
    break;
    case 212: this.$ = new yy.NotEquals($$[$0-2], $$[$0], _$[$0-1]); 
    break;
    case 213: this.$ = $$[$0]; 
    break;
    case 214: this.$ = new yy.InclusiveAnd($$[$0-2], $$[$0], _$[$0-1]); 
    break;
    case 215: this.$ = $$[$0]; 
    break;
    case 216: this.$ = new yy.ExclusiveOr($$[$0-2], $$[$0], _$[$0-1]); 
    break;
    case 217: this.$ = $$[$0]; 
    break;
    case 218: this.$ = new yy.InclusiveOr($$[$0-2], $$[$0], _$[$0-1]); 
    break;
    case 219: this.$ = $$[$0]; 
    break;
    case 220: this.$ = new yy.LogicalAnd($$[$0-2], $$[$0], _$[$0-1]); 
    break;
    case 221: this.$ = $$[$0]; 
    break;
    case 222: this.$ = new yy.LogicalOr($$[$0-2], $$[$0], _$[$0-1]); 
    break;
    case 223: this.$ = $$[$0]; 
    break;
    case 224: this.$ = new yy.TernaryOperator($$[$0-4], $$[$0-2], $$[$0], this._$); 
    break;
    case 225: this.$ = $$[$0]; 
    break;
    case 226: this.$ = $$[$0]; 
    break;
    case 227: this.$ = new yy.Assignment($$[$0-2], $$[$0], _$[$0-2]); 
    break;
    case 228: this.$ = new yy.Assignment($$[$0-2], new yy.Addition($$[$0-2], $$[$0], _$[$0-1]), _$[$0-2]); 
    break;
    case 229: this.$ = new yy.Assignment($$[$0-2], new yy.Division($$[$0-2], $$[$0], _$[$0-1]), _$[$0-2]); 
    break;
    case 230: this.$ = $$[$0]; 
    break;
    case 231: this.$ = $$[$0]; 
    break;
    case 232: this.$ = $$[$0]; 
    break;
    }
    },
    table: [{3:1,4:[1,2],5:3,6:4,7:5,22:[1,6],25:7,26:[1,9],28:8,29:10,32:[1,12],37:[1,11]},{1:[3]},{1:[2,1]},{4:[1,13],6:14,7:15,25:7,26:[1,9],28:8,29:10,32:[1,12],37:[1,11]},{4:[1,16],7:17,25:18,26:[1,9],28:8,29:10,32:[1,12],37:[1,11]},{4:[1,19]},{23:[1,20]},{4:[2,23],26:[2,23],32:[2,23],37:[2,23]},{4:[2,26]},{23:[1,24],27:21,126:22,127:23},{4:[2,27]},{23:[1,25]},{37:[1,26]},{1:[2,2]},{4:[1,27],7:28,25:18,26:[1,9],28:8,29:10,32:[1,12],37:[1,11]},{4:[1,29]},{1:[2,3]},{4:[1,30]},{4:[2,24],26:[2,24],32:[2,24],37:[2,24]},{1:[2,4]},{24:[1,31]},{24:[1,32],128:[1,33]},{15:[2,164],16:[2,164],17:[2,164],18:[2,164],19:[2,164],20:[2,164],21:[2,164],23:[2,164],24:[2,164],32:[2,164],33:[2,164],34:[2,164],35:[2,164],36:[2,164],39:[2,164],41:[2,164],52:[2,164],54:[2,164],58:[2,164],62:[2,164],66:[2,164],68:[2,164],71:[2,164],72:[2,164],73:[2,164],74:[2,164],75:[2,164],76:[2,164],77:[2,164],100:[2,164],107:[2,164],108:[2,164],109:[2,164],110:[2,164],116:[2,164],118:[2,164],119:[2,164],120:[2,164],121:[2,164],122:[2,164],128:[2,164],133:[2,164],134:[2,164],136:[2,164],137:[2,164],143:[2,164],144:[2,164],145:[2,164],148:[2,164],149:[2,164],150:[2,164],152:[2,164],153:[2,164],154:[2,164],155:[2,164],157:[2,164],158:[2,164],160:[2,164],162:[2,164],164:[2,164],166:[2,164],168:[2,164],170:[2,164],172:[2,164],173:[2,164]},{15:[2,165],16:[2,165],17:[2,165],18:[2,165],19:[2,165],20:[2,165],21:[2,165],23:[2,165],24:[2,165],32:[2,165],33:[2,165],34:[2,165],35:[2,165],36:[2,165],39:[2,165],41:[2,165],52:[2,165],54:[2,165],58:[2,165],62:[2,165],66:[2,165],68:[2,165],71:[2,165],72:[2,165],73:[2,165],74:[2,165],75:[2,165],76:[2,165],77:[2,165],100:[2,165],107:[2,165],108:[2,165],109:[2,165],110:[2,165],116:[2,165],118:[2,165],119:[2,165],120:[2,165],121:[2,165],122:[2,165],128:[2,165],133:[2,165],134:[2,165],136:[2,165],137:[2,165],143:[2,165],144:[2,165],145:[2,165],148:[2,165],149:[2,165],150:[2,165],152:[2,165],153:[2,165],154:[2,165],155:[2,165],157:[2,165],158:[2,165],160:[2,165],162:[2,165],164:[2,165],166:[2,165],168:[2,165],170:[2,165],172:[2,165],173:[2,165]},{15:[2,166],16:[2,166],17:[2,166],18:[2,166],19:[2,166],20:[2,166],21:[2,166],23:[2,166],24:[2,166],32:[2,166],33:[2,166],34:[2,166],35:[2,166],36:[2,166],39:[2,166],41:[2,166],52:[2,166],54:[2,166],58:[2,166],62:[2,166],66:[2,166],68:[2,166],71:[2,166],72:[2,166],73:[2,166],74:[2,166],75:[2,166],76:[2,166],77:[2,166],100:[2,166],107:[2,166],108:[2,166],109:[2,166],110:[2,166],116:[2,166],118:[2,166],119:[2,166],120:[2,166],121:[2,166],122:[2,166],128:[2,166],133:[2,166],134:[2,166],136:[2,166],137:[2,166],143:[2,166],144:[2,166],145:[2,166],148:[2,166],149:[2,166],150:[2,166],152:[2,166],153:[2,166],154:[2,166],155:[2,166],157:[2,166],158:[2,166],160:[2,166],162:[2,166],164:[2,166],166:[2,166],168:[2,166],170:[2,166],172:[2,166],173:[2,166]},{38:34,39:[1,35]},{23:[1,36]},{1:[2,5]},{4:[1,37]},{1:[2,6]},{1:[2,7]},{4:[2,22],26:[2,22],32:[2,22],37:[2,22]},{4:[2,25],26:[2,25],32:[2,25],37:[2,25]},{23:[1,38]},{4:[2,35]},{30:45,31:49,32:[1,53],33:[1,54],34:[1,55],35:[1,56],36:[1,57],40:39,42:40,43:41,44:42,45:43,46:44,48:46,51:[1,50],65:47,66:[1,48],67:51,68:[1,52],69:58,70:59,71:[1,60],72:[1,61],73:[1,62],74:[1,63],75:[1,64],76:[1,65],77:[1,66]},{38:67,39:[1,35]},{1:[2,8]},{15:[2,167],16:[2,167],17:[2,167],18:[2,167],19:[2,167],20:[2,167],21:[2,167],23:[2,167],24:[2,167],32:[2,167],33:[2,167],34:[2,167],35:[2,167],36:[2,167],39:[2,167],41:[2,167],52:[2,167],54:[2,167],58:[2,167],62:[2,167],66:[2,167],68:[2,167],71:[2,167],72:[2,167],73:[2,167],74:[2,167],75:[2,167],76:[2,167],77:[2,167],100:[2,167],107:[2,167],108:[2,167],109:[2,167],110:[2,167],116:[2,167],118:[2,167],119:[2,167],120:[2,167],121:[2,167],122:[2,167],128:[2,167],133:[2,167],134:[2,167],136:[2,167],137:[2,167],143:[2,167],144:[2,167],145:[2,167],148:[2,167],149:[2,167],150:[2,167],152:[2,167],153:[2,167],154:[2,167],155:[2,167],157:[2,167],158:[2,167],160:[2,167],162:[2,167],164:[2,167],166:[2,167],168:[2,167],170:[2,167],172:[2,167],173:[2,167]},{30:45,31:49,32:[1,53],33:[1,54],34:[1,55],35:[1,56],36:[1,57],41:[1,68],42:69,43:41,44:42,45:43,46:44,48:46,51:[1,50],65:47,66:[1,48],67:51,68:[1,52],69:58,70:59,71:[1,60],72:[1,61],73:[1,62],74:[1,63],75:[1,64],76:[1,65],77:[1,66]},{32:[2,38],33:[2,38],34:[2,38],35:[2,38],36:[2,38],41:[2,38],51:[2,38],66:[2,38],68:[2,38],71:[2,38],72:[2,38],73:[2,38],74:[2,38],75:[2,38],76:[2,38],77:[2,38]},{32:[2,40],33:[2,40],34:[2,40],35:[2,40],36:[2,40],41:[2,40],51:[2,40],66:[2,40],68:[2,40],71:[2,40],72:[2,40],73:[2,40],74:[2,40],75:[2,40],76:[2,40],77:[2,40]},{32:[2,41],33:[2,41],34:[2,41],35:[2,41],36:[2,41],41:[2,41],51:[2,41],66:[2,41],68:[2,41],71:[2,41],72:[2,41],73:[2,41],74:[2,41],75:[2,41],76:[2,41],77:[2,41]},{32:[2,42],33:[2,42],34:[2,42],35:[2,42],36:[2,42],41:[2,42],51:[2,42],66:[2,42],68:[2,42],71:[2,42],72:[2,42],73:[2,42],74:[2,42],75:[2,42],76:[2,42],77:[2,42]},{23:[1,73],47:70,50:71,59:74,61:72},{31:76,32:[1,53],33:[1,54],34:[1,55],35:[1,56],36:[1,57],46:75,51:[1,77],65:47,66:[1,48],67:51,68:[1,52],69:58,70:59,71:[1,60],72:[1,61],73:[1,62],74:[1,63],75:[1,64],76:[1,65],77:[1,66]},{39:[1,80],49:78,60:79},{23:[2,63],55:[2,63]},{23:[2,64],55:[2,64]},{32:[2,28],33:[2,28],34:[2,28],35:[2,28],36:[2,28],51:[2,28],66:[2,28],68:[2,28],71:[2,28],72:[2,28],73:[2,28],74:[2,28],75:[2,28],76:[2,28],77:[2,28]},{23:[1,82],50:81},{23:[2,65],54:[2,65],55:[2,65]},{23:[2,66],54:[2,66],55:[2,66]},{32:[2,30],33:[2,30],34:[2,30],35:[2,30],36:[2,30],51:[2,30],66:[2,30],68:[2,30],71:[2,30],72:[2,30],73:[2,30],74:[2,30],75:[2,30],76:[2,30],77:[2,30]},{32:[2,31],33:[2,31],34:[2,31],35:[2,31],36:[2,31],51:[2,31],66:[2,31],68:[2,31],71:[2,31],72:[2,31],73:[2,31],74:[2,31],75:[2,31],76:[2,31],77:[2,31]},{32:[2,32],33:[2,32],34:[2,32],35:[2,32],36:[2,32],51:[2,32],66:[2,32],68:[2,32],71:[2,32],72:[2,32],73:[2,32],74:[2,32],75:[2,32],76:[2,32],77:[2,32]},{32:[2,33],33:[2,33],34:[2,33],35:[2,33],36:[2,33],51:[2,33],66:[2,33],68:[2,33],71:[2,33],72:[2,33],73:[2,33],74:[2,33],75:[2,33],76:[2,33],77:[2,33]},{32:[2,34],33:[2,34],34:[2,34],35:[2,34],36:[2,34],51:[2,34],66:[2,34],68:[2,34],71:[2,34],72:[2,34],73:[2,34],74:[2,34],75:[2,34],76:[2,34],77:[2,34]},{23:[2,67],54:[2,67],55:[2,67]},{23:[2,68],54:[2,68],55:[2,68]},{23:[2,69],54:[2,69],55:[2,69]},{23:[2,70],54:[2,70],55:[2,70]},{23:[2,71],54:[2,71],55:[2,71]},{23:[2,72],54:[2,72],55:[2,72]},{23:[2,73],54:[2,73],55:[2,73]},{23:[2,74],54:[2,74],55:[2,74]},{23:[2,75],54:[2,75],55:[2,75]},{4:[2,36]},{4:[2,37]},{32:[2,39],33:[2,39],34:[2,39],35:[2,39],36:[2,39],41:[2,39],51:[2,39],66:[2,39],68:[2,39],71:[2,39],72:[2,39],73:[2,39],74:[2,39],75:[2,39],76:[2,39],77:[2,39]},{24:[1,83],58:[1,84]},{39:[2,47]},{24:[2,57],58:[2,57]},{24:[2,61],52:[1,85],58:[2,61],62:[2,61]},{24:[2,59],58:[2,59],62:[1,86]},{23:[1,73],47:87,50:88,59:74,61:72},{32:[2,29],33:[2,29],34:[2,29],35:[2,29],36:[2,29],51:[2,29],66:[2,29],68:[2,29],71:[2,29],72:[2,29],73:[2,29],74:[2,29],75:[2,29],76:[2,29],77:[2,29]},{23:[1,82],50:89},{32:[2,45],33:[2,45],34:[2,45],35:[2,45],36:[2,45],41:[2,45],51:[2,45],66:[2,45],68:[2,45],71:[2,45],72:[2,45],73:[2,45],74:[2,45],75:[2,45],76:[2,45],77:[2,45]},{32:[2,56],33:[2,56],34:[2,56],35:[2,56],36:[2,56],41:[2,56],51:[2,56],66:[2,56],68:[2,56],71:[2,56],72:[2,56],73:[2,56],74:[2,56],75:[2,56],76:[2,56],77:[2,56]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,113],27:125,30:102,31:49,32:[1,53],33:[1,54],34:[1,55],35:[1,56],36:[1,57],39:[1,80],41:[1,90],46:101,52:[1,132],60:103,65:47,66:[1,48],67:51,68:[1,52],69:58,70:59,71:[1,60],72:[1,61],73:[1,62],74:[1,63],75:[1,64],76:[1,65],77:[1,66],78:91,79:92,80:93,81:94,82:95,83:96,84:97,85:98,86:99,87:100,93:104,94:105,95:106,96:107,97:108,98:109,99:114,100:[1,117],101:119,102:120,103:121,104:122,105:123,106:124,107:[1,118],108:[1,110],110:[1,115],120:[1,111],121:[1,116],122:[1,112],126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{39:[2,49]},{52:[1,85]},{32:[2,43],33:[2,43],34:[2,43],35:[2,43],36:[2,43],41:[2,43],51:[2,43],66:[2,43],68:[2,43],71:[2,43],72:[2,43],73:[2,43],74:[2,43],75:[2,43],76:[2,43],77:[2,43]},{23:[1,147],59:74,61:146},{46:150,53:148,54:[1,149],57:151,65:47,66:[1,48],67:51,68:[1,52],69:58,70:59,71:[1,60],72:[1,61],73:[1,62],74:[1,63],75:[1,64],76:[1,65],77:[1,66]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:125,52:[1,179],63:152,64:153,101:156,102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:167,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176,142:166,146:165,147:164,151:163,156:162,159:161,161:160,163:159,165:158,167:157,169:155,171:154},{24:[1,181],58:[1,84]},{39:[2,46]},{39:[2,48]},{15:[2,76],16:[2,76],17:[2,76],18:[2,76],19:[2,76],20:[2,76],21:[2,76],23:[2,76],24:[2,76],32:[2,76],33:[2,76],34:[2,76],35:[2,76],36:[2,76],39:[2,76],41:[2,76],51:[2,76],52:[2,76],66:[2,76],68:[2,76],71:[2,76],72:[2,76],73:[2,76],74:[2,76],75:[2,76],76:[2,76],77:[2,76],100:[2,76],107:[2,76],108:[2,76],109:[2,76],110:[2,76],116:[2,76],119:[2,76],120:[2,76],121:[2,76],122:[2,76],133:[2,76],134:[2,76]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,113],27:125,30:102,31:49,32:[1,53],33:[1,54],34:[1,55],35:[1,56],36:[1,57],39:[1,80],41:[1,182],46:101,52:[1,132],60:103,65:47,66:[1,48],67:51,68:[1,52],69:58,70:59,71:[1,60],72:[1,61],73:[1,62],74:[1,63],75:[1,64],76:[1,65],77:[1,66],79:183,80:93,81:94,82:95,83:96,84:97,85:98,86:99,87:100,93:104,94:105,95:106,96:107,97:108,98:109,99:114,100:[1,117],101:119,102:120,103:121,104:122,105:123,106:124,107:[1,118],108:[1,110],110:[1,115],120:[1,111],121:[1,116],122:[1,112],126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{15:[2,78],16:[2,78],17:[2,78],18:[2,78],19:[2,78],20:[2,78],21:[2,78],23:[2,78],24:[2,78],32:[2,78],33:[2,78],34:[2,78],35:[2,78],36:[2,78],39:[2,78],41:[2,78],52:[2,78],66:[2,78],68:[2,78],71:[2,78],72:[2,78],73:[2,78],74:[2,78],75:[2,78],76:[2,78],77:[2,78],100:[2,78],107:[2,78],108:[2,78],110:[2,78],116:[2,78],119:[2,78],120:[2,78],121:[2,78],122:[2,78],133:[2,78],134:[2,78]},{15:[2,80],16:[2,80],17:[2,80],18:[2,80],19:[2,80],20:[2,80],21:[2,80],23:[2,80],24:[2,80],32:[2,80],33:[2,80],34:[2,80],35:[2,80],36:[2,80],39:[2,80],41:[2,80],52:[2,80],66:[2,80],68:[2,80],71:[2,80],72:[2,80],73:[2,80],74:[2,80],75:[2,80],76:[2,80],77:[2,80],100:[2,80],107:[2,80],108:[2,80],110:[2,80],116:[2,80],119:[2,80],120:[2,80],121:[2,80],122:[2,80],133:[2,80],134:[2,80]},{15:[2,81],16:[2,81],17:[2,81],18:[2,81],19:[2,81],20:[2,81],21:[2,81],23:[2,81],24:[2,81],32:[2,81],33:[2,81],34:[2,81],35:[2,81],36:[2,81],39:[2,81],41:[2,81],52:[2,81],66:[2,81],68:[2,81],71:[2,81],72:[2,81],73:[2,81],74:[2,81],75:[2,81],76:[2,81],77:[2,81],100:[2,81],107:[2,81],108:[2,81],110:[2,81],116:[2,81],119:[2,81],120:[2,81],121:[2,81],122:[2,81],133:[2,81],134:[2,81]},{24:[1,184]},{15:[2,85],16:[2,85],17:[2,85],18:[2,85],19:[2,85],20:[2,85],21:[2,85],23:[2,85],24:[2,85],32:[2,85],33:[2,85],34:[2,85],35:[2,85],36:[2,85],39:[2,85],41:[2,85],52:[2,85],66:[2,85],68:[2,85],71:[2,85],72:[2,85],73:[2,85],74:[2,85],75:[2,85],76:[2,85],77:[2,85],100:[2,85],107:[2,85],108:[2,85],110:[2,85],116:[2,85],119:[2,85],120:[2,85],121:[2,85],122:[2,85],133:[2,85],134:[2,85]},{15:[2,86],16:[2,86],17:[2,86],18:[2,86],19:[2,86],20:[2,86],21:[2,86],23:[2,86],24:[2,86],32:[2,86],33:[2,86],34:[2,86],35:[2,86],36:[2,86],39:[2,86],41:[2,86],52:[2,86],66:[2,86],68:[2,86],71:[2,86],72:[2,86],73:[2,86],74:[2,86],75:[2,86],76:[2,86],77:[2,86],100:[2,86],107:[2,86],108:[2,86],110:[2,86],116:[2,86],119:[2,86],120:[2,86],121:[2,86],122:[2,86],133:[2,86],134:[2,86]},{15:[2,87],16:[2,87],17:[2,87],18:[2,87],19:[2,87],20:[2,87],21:[2,87],23:[2,87],24:[2,87],32:[2,87],33:[2,87],34:[2,87],35:[2,87],36:[2,87],39:[2,87],41:[2,87],52:[2,87],66:[2,87],68:[2,87],71:[2,87],72:[2,87],73:[2,87],74:[2,87],75:[2,87],76:[2,87],77:[2,87],100:[2,87],107:[2,87],108:[2,87],110:[2,87],116:[2,87],119:[2,87],120:[2,87],121:[2,87],122:[2,87],133:[2,87],134:[2,87]},{15:[2,88],16:[2,88],17:[2,88],18:[2,88],19:[2,88],20:[2,88],21:[2,88],23:[2,88],24:[2,88],32:[2,88],33:[2,88],34:[2,88],35:[2,88],36:[2,88],39:[2,88],41:[2,88],52:[2,88],66:[2,88],68:[2,88],71:[2,88],72:[2,88],73:[2,88],74:[2,88],75:[2,88],76:[2,88],77:[2,88],100:[2,88],107:[2,88],108:[2,88],110:[2,88],116:[2,88],119:[2,88],120:[2,88],121:[2,88],122:[2,88],133:[2,88],134:[2,88]},{15:[2,89],16:[2,89],17:[2,89],18:[2,89],19:[2,89],20:[2,89],21:[2,89],23:[2,89],24:[2,89],32:[2,89],33:[2,89],34:[2,89],35:[2,89],36:[2,89],39:[2,89],41:[2,89],52:[2,89],66:[2,89],68:[2,89],71:[2,89],72:[2,89],73:[2,89],74:[2,89],75:[2,89],76:[2,89],77:[2,89],100:[2,89],107:[2,89],108:[2,89],110:[2,89],116:[2,89],119:[2,89],120:[2,89],121:[2,89],122:[2,89],133:[2,89],134:[2,89]},{23:[1,147],47:185,59:74,61:72},{31:76,32:[1,53],33:[1,54],34:[1,55],35:[1,56],36:[1,57],46:186,65:47,66:[1,48],67:51,68:[1,52],69:58,70:59,71:[1,60],72:[1,61],73:[1,62],74:[1,63],75:[1,64],76:[1,65],77:[1,66]},{15:[2,95],16:[2,95],17:[2,95],18:[2,95],19:[2,95],20:[2,95],21:[2,95],23:[2,95],24:[2,95],32:[2,95],33:[2,95],34:[2,95],35:[2,95],36:[2,95],39:[2,95],41:[2,95],52:[2,95],66:[2,95],68:[2,95],71:[2,95],72:[2,95],73:[2,95],74:[2,95],75:[2,95],76:[2,95],77:[2,95],100:[2,95],107:[2,95],108:[2,95],109:[2,95],110:[2,95],116:[2,95],119:[2,95],120:[2,95],121:[2,95],122:[2,95],133:[2,95],134:[2,95]},{15:[2,96],16:[2,96],17:[2,96],18:[2,96],19:[2,96],20:[2,96],21:[2,96],23:[2,96],24:[2,96],32:[2,96],33:[2,96],34:[2,96],35:[2,96],36:[2,96],39:[2,96],41:[2,96],52:[2,96],66:[2,96],68:[2,96],71:[2,96],72:[2,96],73:[2,96],74:[2,96],75:[2,96],76:[2,96],77:[2,96],100:[2,96],107:[2,96],108:[2,96],109:[2,96],110:[2,96],116:[2,96],119:[2,96],120:[2,96],121:[2,96],122:[2,96],133:[2,96],134:[2,96]},{15:[2,97],16:[2,97],17:[2,97],18:[2,97],19:[2,97],20:[2,97],21:[2,97],23:[2,97],24:[2,97],32:[2,97],33:[2,97],34:[2,97],35:[2,97],36:[2,97],39:[2,97],41:[2,97],52:[2,97],66:[2,97],68:[2,97],71:[2,97],72:[2,97],73:[2,97],74:[2,97],75:[2,97],76:[2,97],77:[2,97],100:[2,97],107:[2,97],108:[2,97],109:[2,97],110:[2,97],116:[2,97],119:[2,97],120:[2,97],121:[2,97],122:[2,97],133:[2,97],134:[2,97]},{15:[2,98],16:[2,98],17:[2,98],18:[2,98],19:[2,98],20:[2,98],21:[2,98],23:[2,98],24:[2,98],32:[2,98],33:[2,98],34:[2,98],35:[2,98],36:[2,98],39:[2,98],41:[2,98],52:[2,98],66:[2,98],68:[2,98],71:[2,98],72:[2,98],73:[2,98],74:[2,98],75:[2,98],76:[2,98],77:[2,98],100:[2,98],107:[2,98],108:[2,98],109:[2,98],110:[2,98],116:[2,98],119:[2,98],120:[2,98],121:[2,98],122:[2,98],133:[2,98],134:[2,98]},{15:[2,99],16:[2,99],17:[2,99],18:[2,99],19:[2,99],20:[2,99],21:[2,99],23:[2,99],24:[2,99],32:[2,99],33:[2,99],34:[2,99],35:[2,99],36:[2,99],39:[2,99],41:[2,99],52:[2,99],66:[2,99],68:[2,99],71:[2,99],72:[2,99],73:[2,99],74:[2,99],75:[2,99],76:[2,99],77:[2,99],100:[2,99],107:[2,99],108:[2,99],109:[2,99],110:[2,99],116:[2,99],119:[2,99],120:[2,99],121:[2,99],122:[2,99],133:[2,99],134:[2,99]},{15:[2,100],16:[2,100],17:[2,100],18:[2,100],19:[2,100],20:[2,100],21:[2,100],23:[2,100],24:[2,100],32:[2,100],33:[2,100],34:[2,100],35:[2,100],36:[2,100],39:[2,100],41:[2,100],52:[2,100],66:[2,100],68:[2,100],71:[2,100],72:[2,100],73:[2,100],74:[2,100],75:[2,100],76:[2,100],77:[2,100],100:[2,100],107:[2,100],108:[2,100],109:[2,100],110:[2,100],116:[2,100],119:[2,100],120:[2,100],121:[2,100],122:[2,100],133:[2,100],134:[2,100]},{15:[2,101],16:[2,101],17:[2,101],18:[2,101],19:[2,101],20:[2,101],21:[2,101],23:[2,101],24:[2,101],32:[2,101],33:[2,101],34:[2,101],35:[2,101],36:[2,101],39:[2,101],41:[2,101],52:[2,101],66:[2,101],68:[2,101],71:[2,101],72:[2,101],73:[2,101],74:[2,101],75:[2,101],76:[2,101],77:[2,101],100:[2,101],107:[2,101],108:[2,101],109:[2,101],110:[2,101],116:[2,101],119:[2,101],120:[2,101],121:[2,101],122:[2,101],133:[2,101],134:[2,101]},{52:[1,187]},{52:[1,188]},{52:[1,189]},{15:[2,102],16:[2,102],17:[2,102],18:[2,102],19:[2,102],20:[2,102],21:[2,102],23:[2,102],24:[2,102],32:[2,102],33:[2,102],34:[2,102],35:[2,102],36:[2,102],39:[2,102],41:[2,102],52:[2,102],66:[2,102],68:[2,102],71:[2,102],72:[2,102],73:[2,102],74:[2,102],75:[2,102],76:[2,102],77:[2,102],100:[2,102],107:[2,102],108:[2,102],109:[2,102],110:[2,102],116:[2,102],119:[2,102],120:[2,102],121:[2,102],122:[2,102],133:[2,102],134:[2,102]},{24:[1,190]},{52:[1,191]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,113],27:125,39:[1,80],52:[1,132],60:103,81:192,83:96,84:97,85:98,86:99,87:100,93:104,94:105,95:106,96:107,97:108,98:109,99:114,100:[1,117],101:119,102:120,103:121,104:122,105:123,106:124,107:[1,118],108:[1,110],110:[1,115],120:[1,111],121:[1,116],122:[1,112],126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{24:[1,193]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[2,112],27:125,32:[2,112],33:[2,112],34:[2,112],35:[2,112],36:[2,112],39:[2,112],41:[2,112],52:[1,179],64:194,66:[2,112],68:[2,112],71:[2,112],72:[2,112],73:[2,112],74:[2,112],75:[2,112],76:[2,112],77:[2,112],100:[2,112],101:156,102:168,103:169,104:177,105:178,106:180,107:[2,112],108:[2,112],109:[2,112],110:[2,112],116:[2,112],119:[2,112],120:[2,112],121:[2,112],122:[2,112],126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:167,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176,142:166,146:165,147:164,151:163,156:162,159:161,161:160,163:159,165:158,167:157,169:155,171:154},{24:[2,105],54:[2,105],58:[2,105]},{24:[2,106],54:[2,106],58:[2,106]},{24:[2,107],54:[2,107],58:[2,107]},{24:[2,108],54:[2,108],58:[2,108],133:[2,108],134:[2,108]},{24:[2,109],54:[2,109],58:[2,109],133:[2,109],134:[2,109]},{24:[2,110],54:[2,110],58:[2,110],133:[2,110],134:[2,110]},{15:[2,177],16:[2,177],17:[2,177],18:[2,177],19:[2,177],20:[2,177],21:[2,177],23:[2,177],24:[2,177],32:[2,177],33:[2,177],34:[2,177],35:[2,177],36:[2,177],39:[2,177],41:[2,177],52:[1,198],54:[2,177],58:[2,177],62:[1,195],66:[2,177],68:[2,177],71:[2,177],72:[2,177],73:[2,177],74:[2,177],75:[2,177],76:[2,177],77:[2,177],100:[2,177],107:[2,177],108:[2,177],109:[2,177],110:[2,177],116:[2,177],118:[2,177],119:[2,177],120:[2,177],121:[2,177],122:[2,177],128:[1,33],133:[2,177],134:[2,177],136:[2,177],137:[2,177],143:[2,177],144:[2,177],145:[2,177],148:[2,177],149:[2,177],150:[2,177],152:[2,177],153:[2,177],154:[2,177],155:[2,177],157:[2,177],158:[2,177],160:[2,177],162:[2,177],164:[2,177],166:[2,177],168:[2,177],170:[2,177],172:[1,196],173:[1,197]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:200,52:[1,179],102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:199,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:200,52:[1,179],102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:201,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176},{133:[1,202],134:[1,203]},{15:[2,176],16:[2,176],17:[2,176],18:[2,176],19:[2,176],20:[2,176],21:[2,176],23:[2,176],24:[2,176],32:[2,176],33:[2,176],34:[2,176],35:[2,176],36:[2,176],39:[2,176],41:[2,176],52:[2,176],54:[2,176],58:[2,176],66:[2,176],68:[2,176],71:[2,176],72:[2,176],73:[2,176],74:[2,176],75:[2,176],76:[2,176],77:[2,176],100:[2,176],107:[2,176],108:[2,176],109:[2,176],110:[2,176],116:[2,176],118:[2,176],119:[2,176],120:[2,176],121:[2,176],122:[2,176],133:[2,176],134:[2,176],136:[2,176],137:[2,176],143:[2,176],144:[2,176],145:[2,176],148:[2,176],149:[2,176],150:[2,176],152:[2,176],153:[2,176],154:[2,176],155:[2,176],157:[2,176],158:[2,176],160:[2,176],162:[2,176],164:[2,176],166:[2,176],168:[2,176],170:[2,176]},{15:[2,168],16:[2,168],17:[2,168],18:[2,168],19:[2,168],20:[2,168],21:[2,168],23:[2,168],24:[2,168],32:[2,168],33:[2,168],34:[2,168],35:[2,168],36:[2,168],39:[2,168],41:[2,168],52:[2,168],54:[2,168],58:[2,168],66:[2,168],68:[2,168],71:[2,168],72:[2,168],73:[2,168],74:[2,168],75:[2,168],76:[2,168],77:[2,168],100:[2,168],107:[2,168],108:[2,168],109:[2,168],110:[2,168],116:[2,168],118:[2,168],119:[2,168],120:[2,168],121:[2,168],122:[2,168],133:[2,168],134:[2,168],136:[2,168],137:[2,168],143:[2,168],144:[2,168],145:[2,168],148:[2,168],149:[2,168],150:[2,168],152:[2,168],153:[2,168],154:[2,168],155:[2,168],157:[2,168],158:[2,168],160:[2,168],162:[2,168],164:[2,168],166:[2,168],168:[2,168],170:[2,168]},{15:[2,169],16:[2,169],17:[2,169],18:[2,169],19:[2,169],20:[2,169],21:[2,169],23:[2,169],24:[2,169],32:[2,169],33:[2,169],34:[2,169],35:[2,169],36:[2,169],39:[2,169],41:[2,169],52:[2,169],54:[2,169],58:[2,169],66:[2,169],68:[2,169],71:[2,169],72:[2,169],73:[2,169],74:[2,169],75:[2,169],76:[2,169],77:[2,169],100:[2,169],107:[2,169],108:[2,169],109:[2,169],110:[2,169],116:[2,169],118:[2,169],119:[2,169],120:[2,169],121:[2,169],122:[2,169],133:[2,169],134:[2,169],136:[2,169],137:[2,169],143:[2,169],144:[2,169],145:[2,169],148:[2,169],149:[2,169],150:[2,169],152:[2,169],153:[2,169],154:[2,169],155:[2,169],157:[2,169],158:[2,169],160:[2,169],162:[2,169],164:[2,169],166:[2,169],168:[2,169],170:[2,169]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:125,52:[1,179],64:204,101:156,102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:167,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176,142:166,146:165,147:164,151:163,156:162,159:161,161:160,163:159,165:158,167:157,169:155,171:154},{15:[2,9],16:[2,9],17:[2,9],18:[2,9],19:[2,9],20:[2,9],21:[2,9],23:[2,9],24:[2,9],32:[2,9],33:[2,9],34:[2,9],35:[2,9],36:[2,9],39:[2,9],41:[2,9],52:[2,9],54:[2,9],58:[2,9],66:[2,9],68:[2,9],71:[2,9],72:[2,9],73:[2,9],74:[2,9],75:[2,9],76:[2,9],77:[2,9],100:[2,9],107:[2,9],108:[2,9],109:[2,9],110:[2,9],116:[2,9],118:[2,9],119:[2,9],120:[2,9],121:[2,9],122:[2,9],133:[2,9],134:[2,9],136:[2,9],137:[2,9],143:[2,9],144:[2,9],145:[2,9],148:[2,9],149:[2,9],150:[2,9],152:[2,9],153:[2,9],154:[2,9],155:[2,9],157:[2,9],158:[2,9],160:[2,9],162:[2,9],164:[2,9],166:[2,9],168:[2,9],170:[2,9]},{15:[2,10],16:[2,10],17:[2,10],18:[2,10],19:[2,10],20:[2,10],21:[2,10],23:[2,10],24:[2,10],32:[2,10],33:[2,10],34:[2,10],35:[2,10],36:[2,10],39:[2,10],41:[2,10],52:[2,10],54:[2,10],58:[2,10],66:[2,10],68:[2,10],71:[2,10],72:[2,10],73:[2,10],74:[2,10],75:[2,10],76:[2,10],77:[2,10],100:[2,10],107:[2,10],108:[2,10],109:[2,10],110:[2,10],116:[2,10],118:[2,10],119:[2,10],120:[2,10],121:[2,10],122:[2,10],133:[2,10],134:[2,10],136:[2,10],137:[2,10],143:[2,10],144:[2,10],145:[2,10],148:[2,10],149:[2,10],150:[2,10],152:[2,10],153:[2,10],154:[2,10],155:[2,10],157:[2,10],158:[2,10],160:[2,10],162:[2,10],164:[2,10],166:[2,10],168:[2,10],170:[2,10]},{15:[2,11],16:[2,11],17:[2,11],18:[2,11],19:[2,11],20:[2,11],21:[2,11],23:[2,11],24:[2,11],32:[2,11],33:[2,11],34:[2,11],35:[2,11],36:[2,11],39:[2,11],41:[2,11],52:[2,11],54:[2,11],58:[2,11],66:[2,11],68:[2,11],71:[2,11],72:[2,11],73:[2,11],74:[2,11],75:[2,11],76:[2,11],77:[2,11],100:[2,11],107:[2,11],108:[2,11],109:[2,11],110:[2,11],116:[2,11],118:[2,11],119:[2,11],120:[2,11],121:[2,11],122:[2,11],133:[2,11],134:[2,11],136:[2,11],137:[2,11],143:[2,11],144:[2,11],145:[2,11],148:[2,11],149:[2,11],150:[2,11],152:[2,11],153:[2,11],154:[2,11],155:[2,11],157:[2,11],158:[2,11],160:[2,11],162:[2,11],164:[2,11],166:[2,11],168:[2,11],170:[2,11]},{15:[2,12],16:[2,12],17:[2,12],18:[2,12],19:[2,12],20:[2,12],21:[2,12],23:[2,12],24:[2,12],32:[2,12],33:[2,12],34:[2,12],35:[2,12],36:[2,12],39:[2,12],41:[2,12],52:[2,12],54:[2,12],58:[2,12],66:[2,12],68:[2,12],71:[2,12],72:[2,12],73:[2,12],74:[2,12],75:[2,12],76:[2,12],77:[2,12],100:[2,12],107:[2,12],108:[2,12],109:[2,12],110:[2,12],116:[2,12],118:[2,12],119:[2,12],120:[2,12],121:[2,12],122:[2,12],133:[2,12],134:[2,12],136:[2,12],137:[2,12],143:[2,12],144:[2,12],145:[2,12],148:[2,12],149:[2,12],150:[2,12],152:[2,12],153:[2,12],154:[2,12],155:[2,12],157:[2,12],158:[2,12],160:[2,12],162:[2,12],164:[2,12],166:[2,12],168:[2,12],170:[2,12]},{15:[2,13],16:[2,13],17:[2,13],18:[2,13],19:[2,13],20:[2,13],21:[2,13],23:[2,13],24:[2,13],32:[2,13],33:[2,13],34:[2,13],35:[2,13],36:[2,13],39:[2,13],41:[2,13],52:[2,13],54:[2,13],58:[2,13],66:[2,13],68:[2,13],71:[2,13],72:[2,13],73:[2,13],74:[2,13],75:[2,13],76:[2,13],77:[2,13],100:[2,13],107:[2,13],108:[2,13],109:[2,13],110:[2,13],116:[2,13],118:[2,13],119:[2,13],120:[2,13],121:[2,13],122:[2,13],133:[2,13],134:[2,13],136:[2,13],137:[2,13],143:[2,13],144:[2,13],145:[2,13],148:[2,13],149:[2,13],150:[2,13],152:[2,13],153:[2,13],154:[2,13],155:[2,13],157:[2,13],158:[2,13],160:[2,13],162:[2,13],164:[2,13],166:[2,13],168:[2,13],170:[2,13]},{15:[2,14],16:[2,14],17:[2,14],18:[2,14],19:[2,14],20:[2,14],21:[2,14],23:[2,14],24:[2,14],32:[2,14],33:[2,14],34:[2,14],35:[2,14],36:[2,14],39:[2,14],41:[2,14],52:[2,14],54:[2,14],58:[2,14],66:[2,14],68:[2,14],71:[2,14],72:[2,14],73:[2,14],74:[2,14],75:[2,14],76:[2,14],77:[2,14],100:[2,14],107:[2,14],108:[2,14],109:[2,14],110:[2,14],116:[2,14],118:[2,14],119:[2,14],120:[2,14],121:[2,14],122:[2,14],133:[2,14],134:[2,14],136:[2,14],137:[2,14],143:[2,14],144:[2,14],145:[2,14],148:[2,14],149:[2,14],150:[2,14],152:[2,14],153:[2,14],154:[2,14],155:[2,14],157:[2,14],158:[2,14],160:[2,14],162:[2,14],164:[2,14],166:[2,14],168:[2,14],170:[2,14]},{15:[2,15],16:[2,15],17:[2,15],18:[2,15],19:[2,15],20:[2,15],21:[2,15],23:[2,15],24:[2,15],32:[2,15],33:[2,15],34:[2,15],35:[2,15],36:[2,15],39:[2,15],41:[2,15],52:[2,15],54:[2,15],58:[2,15],66:[2,15],68:[2,15],71:[2,15],72:[2,15],73:[2,15],74:[2,15],75:[2,15],76:[2,15],77:[2,15],100:[2,15],107:[2,15],108:[2,15],109:[2,15],110:[2,15],116:[2,15],118:[2,15],119:[2,15],120:[2,15],121:[2,15],122:[2,15],133:[2,15],134:[2,15],136:[2,15],137:[2,15],143:[2,15],144:[2,15],145:[2,15],148:[2,15],149:[2,15],150:[2,15],152:[2,15],153:[2,15],154:[2,15],155:[2,15],157:[2,15],158:[2,15],160:[2,15],162:[2,15],164:[2,15],166:[2,15],168:[2,15],170:[2,15]},{15:[2,19],16:[2,19],17:[2,19],18:[2,19],19:[2,19],20:[2,19],21:[2,19],23:[2,19],24:[2,19],32:[2,19],33:[2,19],34:[2,19],35:[2,19],36:[2,19],39:[2,19],41:[2,19],52:[2,19],54:[2,19],58:[2,19],66:[2,19],68:[2,19],71:[2,19],72:[2,19],73:[2,19],74:[2,19],75:[2,19],76:[2,19],77:[2,19],100:[2,19],107:[2,19],108:[2,19],109:[2,19],110:[2,19],116:[2,19],118:[2,19],119:[2,19],120:[2,19],121:[2,19],122:[2,19],133:[2,19],134:[2,19],136:[2,19],137:[2,19],143:[2,19],144:[2,19],145:[2,19],148:[2,19],149:[2,19],150:[2,19],152:[2,19],153:[2,19],154:[2,19],155:[2,19],157:[2,19],158:[2,19],160:[2,19],162:[2,19],164:[2,19],166:[2,19],168:[2,19],170:[2,19]},{15:[2,16],16:[2,16],17:[2,16],18:[2,16],19:[2,16],20:[2,16],21:[2,16],23:[2,16],24:[2,16],32:[2,16],33:[2,16],34:[2,16],35:[2,16],36:[2,16],39:[2,16],41:[2,16],52:[2,16],54:[2,16],58:[2,16],66:[2,16],68:[2,16],71:[2,16],72:[2,16],73:[2,16],74:[2,16],75:[2,16],76:[2,16],77:[2,16],100:[2,16],107:[2,16],108:[2,16],109:[2,16],110:[2,16],116:[2,16],118:[2,16],119:[2,16],120:[2,16],121:[2,16],122:[2,16],133:[2,16],134:[2,16],136:[2,16],137:[2,16],143:[2,16],144:[2,16],145:[2,16],148:[2,16],149:[2,16],150:[2,16],152:[2,16],153:[2,16],154:[2,16],155:[2,16],157:[2,16],158:[2,16],160:[2,16],162:[2,16],164:[2,16],166:[2,16],168:[2,16],170:[2,16]},{15:[2,17],16:[2,17],17:[2,17],18:[2,17],19:[2,17],20:[2,17],21:[2,17],23:[2,17],24:[2,17],32:[2,17],33:[2,17],34:[2,17],35:[2,17],36:[2,17],39:[2,17],41:[2,17],52:[2,17],54:[2,17],58:[2,17],66:[2,17],68:[2,17],71:[2,17],72:[2,17],73:[2,17],74:[2,17],75:[2,17],76:[2,17],77:[2,17],100:[2,17],107:[2,17],108:[2,17],109:[2,17],110:[2,17],116:[2,17],118:[2,17],119:[2,17],120:[2,17],121:[2,17],122:[2,17],133:[2,17],134:[2,17],136:[2,17],137:[2,17],143:[2,17],144:[2,17],145:[2,17],148:[2,17],149:[2,17],150:[2,17],152:[2,17],153:[2,17],154:[2,17],155:[2,17],157:[2,17],158:[2,17],160:[2,17],162:[2,17],164:[2,17],166:[2,17],168:[2,17],170:[2,17]},{15:[2,18],16:[2,18],17:[2,18],18:[2,18],19:[2,18],20:[2,18],21:[2,18],23:[2,18],24:[2,18],32:[2,18],33:[2,18],34:[2,18],35:[2,18],36:[2,18],39:[2,18],41:[2,18],52:[2,18],54:[2,18],58:[2,18],66:[2,18],68:[2,18],71:[2,18],72:[2,18],73:[2,18],74:[2,18],75:[2,18],76:[2,18],77:[2,18],100:[2,18],107:[2,18],108:[2,18],109:[2,18],110:[2,18],116:[2,18],118:[2,18],119:[2,18],120:[2,18],121:[2,18],122:[2,18],133:[2,18],134:[2,18],136:[2,18],137:[2,18],143:[2,18],144:[2,18],145:[2,18],148:[2,18],149:[2,18],150:[2,18],152:[2,18],153:[2,18],154:[2,18],155:[2,18],157:[2,18],158:[2,18],160:[2,18],162:[2,18],164:[2,18],166:[2,18],168:[2,18],170:[2,18]},{15:[2,20],16:[2,20],17:[2,20],18:[2,20],19:[2,20],20:[2,20],21:[2,20],23:[2,20],24:[2,20],32:[2,20],33:[2,20],34:[2,20],35:[2,20],36:[2,20],39:[2,20],41:[2,20],52:[2,20],54:[2,20],58:[2,20],66:[2,20],68:[2,20],71:[2,20],72:[2,20],73:[2,20],74:[2,20],75:[2,20],76:[2,20],77:[2,20],100:[2,20],107:[2,20],108:[2,20],109:[2,20],110:[2,20],116:[2,20],118:[2,20],119:[2,20],120:[2,20],121:[2,20],122:[2,20],133:[2,20],134:[2,20],136:[2,20],137:[2,20],143:[2,20],144:[2,20],145:[2,20],148:[2,20],149:[2,20],150:[2,20],152:[2,20],153:[2,20],154:[2,20],155:[2,20],157:[2,20],158:[2,20],160:[2,20],162:[2,20],164:[2,20],166:[2,20],168:[2,20],170:[2,20]},{15:[2,21],16:[2,21],17:[2,21],18:[2,21],19:[2,21],20:[2,21],21:[2,21],23:[2,21],24:[2,21],32:[2,21],33:[2,21],34:[2,21],35:[2,21],36:[2,21],39:[2,21],41:[2,21],52:[2,21],54:[2,21],58:[2,21],66:[2,21],68:[2,21],71:[2,21],72:[2,21],73:[2,21],74:[2,21],75:[2,21],76:[2,21],77:[2,21],100:[2,21],107:[2,21],108:[2,21],109:[2,21],110:[2,21],116:[2,21],118:[2,21],119:[2,21],120:[2,21],121:[2,21],122:[2,21],133:[2,21],134:[2,21],136:[2,21],137:[2,21],143:[2,21],144:[2,21],145:[2,21],148:[2,21],149:[2,21],150:[2,21],152:[2,21],153:[2,21],154:[2,21],155:[2,21],157:[2,21],158:[2,21],160:[2,21],162:[2,21],164:[2,21],166:[2,21],168:[2,21],170:[2,21]},{24:[2,58],58:[2,58]},{24:[2,61],54:[2,61],58:[2,61],62:[2,61]},{54:[1,205],58:[1,206]},{39:[2,51]},{23:[1,147],55:[1,207],59:208},{54:[2,53],58:[2,53]},{24:[2,60],58:[2,60]},{24:[2,62],58:[2,62]},{15:[2,231],16:[2,231],17:[2,231],18:[2,231],19:[2,231],20:[2,231],21:[2,231],23:[2,231],24:[2,231],32:[2,231],33:[2,231],34:[2,231],35:[2,231],36:[2,231],39:[2,231],41:[2,231],52:[2,231],54:[2,231],58:[2,231],66:[2,231],68:[2,231],71:[2,231],72:[2,231],73:[2,231],74:[2,231],75:[2,231],76:[2,231],77:[2,231],100:[2,231],107:[2,231],108:[2,231],109:[2,231],110:[2,231],116:[2,231],118:[2,231],119:[2,231],120:[2,231],121:[2,231],122:[2,231],133:[2,231],134:[2,231]},{15:[2,225],16:[2,225],17:[2,225],18:[2,225],19:[2,225],20:[2,225],21:[2,225],23:[2,225],24:[2,225],32:[2,225],33:[2,225],34:[2,225],35:[2,225],36:[2,225],39:[2,225],41:[2,225],52:[2,225],54:[2,225],58:[2,225],66:[2,225],68:[2,225],71:[2,225],72:[2,225],73:[2,225],74:[2,225],75:[2,225],76:[2,225],77:[2,225],100:[2,225],107:[2,225],108:[2,225],109:[2,225],110:[2,225],116:[2,225],118:[2,225],119:[2,225],120:[2,225],121:[2,225],122:[2,225],133:[2,225],134:[2,225]},{15:[2,226],16:[2,226],17:[2,226],18:[2,226],19:[2,226],20:[2,226],21:[2,226],23:[2,226],24:[2,226],32:[2,226],33:[2,226],34:[2,226],35:[2,226],36:[2,226],39:[2,226],41:[2,226],52:[2,226],54:[2,226],58:[2,226],66:[2,226],68:[2,226],71:[2,226],72:[2,226],73:[2,226],74:[2,226],75:[2,226],76:[2,226],77:[2,226],100:[2,226],107:[2,226],108:[2,226],109:[2,226],110:[2,226],116:[2,226],118:[2,226],119:[2,226],120:[2,226],121:[2,226],122:[2,226],133:[2,226],134:[2,226]},{15:[2,223],16:[2,223],17:[2,223],18:[2,223],19:[2,223],20:[2,223],21:[2,223],23:[2,223],24:[2,223],32:[2,223],33:[2,223],34:[2,223],35:[2,223],36:[2,223],39:[2,223],41:[2,223],52:[2,223],54:[2,223],58:[2,223],66:[2,223],68:[2,223],71:[2,223],72:[2,223],73:[2,223],74:[2,223],75:[2,223],76:[2,223],77:[2,223],100:[2,223],107:[2,223],108:[2,223],109:[2,223],110:[2,223],116:[2,223],118:[2,223],119:[2,223],120:[2,223],121:[2,223],122:[2,223],133:[2,223],134:[2,223],168:[1,210],170:[1,209]},{15:[2,221],16:[2,221],17:[2,221],18:[2,221],19:[2,221],20:[2,221],21:[2,221],23:[2,221],24:[2,221],32:[2,221],33:[2,221],34:[2,221],35:[2,221],36:[2,221],39:[2,221],41:[2,221],52:[2,221],54:[2,221],58:[2,221],66:[2,221],68:[2,221],71:[2,221],72:[2,221],73:[2,221],74:[2,221],75:[2,221],76:[2,221],77:[2,221],100:[2,221],107:[2,221],108:[2,221],109:[2,221],110:[2,221],116:[2,221],118:[2,221],119:[2,221],120:[2,221],121:[2,221],122:[2,221],133:[2,221],134:[2,221],166:[1,211],168:[2,221],170:[2,221]},{15:[2,219],16:[2,219],17:[2,219],18:[2,219],19:[2,219],20:[2,219],21:[2,219],23:[2,219],24:[2,219],32:[2,219],33:[2,219],34:[2,219],35:[2,219],36:[2,219],39:[2,219],41:[2,219],52:[2,219],54:[2,219],58:[2,219],66:[2,219],68:[2,219],71:[2,219],72:[2,219],73:[2,219],74:[2,219],75:[2,219],76:[2,219],77:[2,219],100:[2,219],107:[2,219],108:[2,219],109:[2,219],110:[2,219],116:[2,219],118:[2,219],119:[2,219],120:[2,219],121:[2,219],122:[2,219],133:[2,219],134:[2,219],164:[1,212],166:[2,219],168:[2,219],170:[2,219]},{15:[2,217],16:[2,217],17:[2,217],18:[2,217],19:[2,217],20:[2,217],21:[2,217],23:[2,217],24:[2,217],32:[2,217],33:[2,217],34:[2,217],35:[2,217],36:[2,217],39:[2,217],41:[2,217],52:[2,217],54:[2,217],58:[2,217],66:[2,217],68:[2,217],71:[2,217],72:[2,217],73:[2,217],74:[2,217],75:[2,217],76:[2,217],77:[2,217],100:[2,217],107:[2,217],108:[2,217],109:[2,217],110:[2,217],116:[2,217],118:[2,217],119:[2,217],120:[2,217],121:[2,217],122:[2,217],133:[2,217],134:[2,217],162:[1,213],164:[2,217],166:[2,217],168:[2,217],170:[2,217]},{15:[2,215],16:[2,215],17:[2,215],18:[2,215],19:[2,215],20:[2,215],21:[2,215],23:[2,215],24:[2,215],32:[2,215],33:[2,215],34:[2,215],35:[2,215],36:[2,215],39:[2,215],41:[2,215],52:[2,215],54:[2,215],58:[2,215],66:[2,215],68:[2,215],71:[2,215],72:[2,215],73:[2,215],74:[2,215],75:[2,215],76:[2,215],77:[2,215],100:[2,215],107:[2,215],108:[2,215],109:[2,215],110:[2,215],116:[2,215],118:[2,215],119:[2,215],120:[2,215],121:[2,215],122:[2,215],133:[2,215],134:[2,215],160:[1,214],162:[2,215],164:[2,215],166:[2,215],168:[2,215],170:[2,215]},{15:[2,213],16:[2,213],17:[2,213],18:[2,213],19:[2,213],20:[2,213],21:[2,213],23:[2,213],24:[2,213],32:[2,213],33:[2,213],34:[2,213],35:[2,213],36:[2,213],39:[2,213],41:[2,213],52:[2,213],54:[2,213],58:[2,213],66:[2,213],68:[2,213],71:[2,213],72:[2,213],73:[2,213],74:[2,213],75:[2,213],76:[2,213],77:[2,213],100:[2,213],107:[2,213],108:[2,213],109:[2,213],110:[2,213],116:[2,213],118:[2,213],119:[2,213],120:[2,213],121:[2,213],122:[2,213],133:[2,213],134:[2,213],157:[1,215],158:[1,216],160:[2,213],162:[2,213],164:[2,213],166:[2,213],168:[2,213],170:[2,213]},{15:[2,210],16:[2,210],17:[2,210],18:[2,210],19:[2,210],20:[2,210],21:[2,210],23:[2,210],24:[2,210],32:[2,210],33:[2,210],34:[2,210],35:[2,210],36:[2,210],39:[2,210],41:[2,210],52:[2,210],54:[2,210],58:[2,210],66:[2,210],68:[2,210],71:[2,210],72:[2,210],73:[2,210],74:[2,210],75:[2,210],76:[2,210],77:[2,210],100:[2,210],107:[2,210],108:[2,210],109:[2,210],110:[2,210],116:[2,210],118:[2,210],119:[2,210],120:[2,210],121:[2,210],122:[2,210],133:[2,210],134:[2,210],152:[1,217],153:[1,218],154:[1,219],155:[1,220],157:[2,210],158:[2,210],160:[2,210],162:[2,210],164:[2,210],166:[2,210],168:[2,210],170:[2,210]},{15:[2,205],16:[2,205],17:[2,205],18:[2,205],19:[2,205],20:[2,205],21:[2,205],23:[2,205],24:[2,205],32:[2,205],33:[2,205],34:[2,205],35:[2,205],36:[2,205],39:[2,205],41:[2,205],52:[2,205],54:[2,205],58:[2,205],66:[2,205],68:[2,205],71:[2,205],72:[2,205],73:[2,205],74:[2,205],75:[2,205],76:[2,205],77:[2,205],100:[2,205],107:[2,205],108:[2,205],109:[2,205],110:[2,205],116:[2,205],118:[2,205],119:[2,205],120:[2,205],121:[2,205],122:[2,205],133:[2,205],134:[2,205],148:[1,221],149:[1,222],150:[1,223],152:[2,205],153:[2,205],154:[2,205],155:[2,205],157:[2,205],158:[2,205],160:[2,205],162:[2,205],164:[2,205],166:[2,205],168:[2,205],170:[2,205]},{15:[2,201],16:[2,201],17:[2,201],18:[2,201],19:[2,201],20:[2,201],21:[2,201],23:[2,201],24:[2,201],32:[2,201],33:[2,201],34:[2,201],35:[2,201],36:[2,201],39:[2,201],41:[2,201],52:[2,201],54:[2,201],58:[2,201],66:[2,201],68:[2,201],71:[2,201],72:[2,201],73:[2,201],74:[2,201],75:[2,201],76:[2,201],77:[2,201],100:[2,201],107:[2,201],108:[2,201],109:[2,201],110:[2,201],116:[2,201],118:[2,201],119:[2,201],120:[2,201],121:[2,201],122:[2,201],133:[2,201],134:[2,201],136:[1,225],137:[1,224],148:[2,201],149:[2,201],150:[2,201],152:[2,201],153:[2,201],154:[2,201],155:[2,201],157:[2,201],158:[2,201],160:[2,201],162:[2,201],164:[2,201],166:[2,201],168:[2,201],170:[2,201]},{15:[2,198],16:[2,198],17:[2,198],18:[2,198],19:[2,198],20:[2,198],21:[2,198],23:[2,198],24:[2,198],32:[2,198],33:[2,198],34:[2,198],35:[2,198],36:[2,198],39:[2,198],41:[2,198],52:[2,198],54:[2,198],58:[2,198],66:[2,198],68:[2,198],71:[2,198],72:[2,198],73:[2,198],74:[2,198],75:[2,198],76:[2,198],77:[2,198],100:[2,198],107:[2,198],108:[2,198],109:[2,198],110:[2,198],116:[2,198],118:[2,198],119:[2,198],120:[2,198],121:[2,198],122:[2,198],133:[2,198],134:[2,198],136:[2,198],137:[2,198],143:[1,226],144:[1,227],145:[1,228],148:[2,198],149:[2,198],150:[2,198],152:[2,198],153:[2,198],154:[2,198],155:[2,198],157:[2,198],158:[2,198],160:[2,198],162:[2,198],164:[2,198],166:[2,198],168:[2,198],170:[2,198]},{15:[2,194],16:[2,194],17:[2,194],18:[2,194],19:[2,194],20:[2,194],21:[2,194],23:[2,194],24:[2,194],32:[2,194],33:[2,194],34:[2,194],35:[2,194],36:[2,194],39:[2,194],41:[2,194],52:[2,194],54:[2,194],58:[2,194],66:[2,194],68:[2,194],71:[2,194],72:[2,194],73:[2,194],74:[2,194],75:[2,194],76:[2,194],77:[2,194],100:[2,194],107:[2,194],108:[2,194],109:[2,194],110:[2,194],116:[2,194],118:[2,194],119:[2,194],120:[2,194],121:[2,194],122:[2,194],133:[2,194],134:[2,194],136:[2,194],137:[2,194],143:[2,194],144:[2,194],145:[2,194],148:[2,194],149:[2,194],150:[2,194],152:[2,194],153:[2,194],154:[2,194],155:[2,194],157:[2,194],158:[2,194],160:[2,194],162:[2,194],164:[2,194],166:[2,194],168:[2,194],170:[2,194]},{15:[2,182],16:[2,182],17:[2,182],18:[2,182],19:[2,182],20:[2,182],21:[2,182],23:[2,182],24:[2,182],32:[2,182],33:[2,182],34:[2,182],35:[2,182],36:[2,182],39:[2,182],41:[2,182],52:[2,182],54:[2,182],58:[2,182],66:[2,182],68:[2,182],71:[2,182],72:[2,182],73:[2,182],74:[2,182],75:[2,182],76:[2,182],77:[2,182],100:[2,182],107:[2,182],108:[2,182],109:[2,182],110:[2,182],116:[2,182],118:[2,182],119:[2,182],120:[2,182],121:[2,182],122:[2,182],133:[2,182],134:[2,182],136:[2,182],137:[2,182],143:[2,182],144:[2,182],145:[2,182],148:[2,182],149:[2,182],150:[2,182],152:[2,182],153:[2,182],154:[2,182],155:[2,182],157:[2,182],158:[2,182],160:[2,182],162:[2,182],164:[2,182],166:[2,182],168:[2,182],170:[2,182]},{15:[2,183],16:[2,183],17:[2,183],18:[2,183],19:[2,183],20:[2,183],21:[2,183],23:[2,183],24:[2,183],32:[2,183],33:[2,183],34:[2,183],35:[2,183],36:[2,183],39:[2,183],41:[2,183],52:[2,183],54:[2,183],58:[2,183],66:[2,183],68:[2,183],71:[2,183],72:[2,183],73:[2,183],74:[2,183],75:[2,183],76:[2,183],77:[2,183],100:[2,183],107:[2,183],108:[2,183],109:[2,183],110:[2,183],116:[2,183],118:[2,183],119:[2,183],120:[2,183],121:[2,183],122:[2,183],133:[2,183],134:[2,183],136:[2,183],137:[2,183],143:[2,183],144:[2,183],145:[2,183],148:[2,183],149:[2,183],150:[2,183],152:[2,183],153:[2,183],154:[2,183],155:[2,183],157:[2,183],158:[2,183],160:[2,183],162:[2,183],164:[2,183],166:[2,183],168:[2,183],170:[2,183]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:200,52:[1,179],102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:229,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:200,52:[1,179],102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:230,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176},{15:[2,186],16:[2,186],17:[2,186],18:[2,186],19:[2,186],20:[2,186],21:[2,186],23:[2,186],24:[2,186],32:[2,186],33:[2,186],34:[2,186],35:[2,186],36:[2,186],39:[2,186],41:[2,186],52:[2,186],54:[2,186],58:[2,186],66:[2,186],68:[2,186],71:[2,186],72:[2,186],73:[2,186],74:[2,186],75:[2,186],76:[2,186],77:[2,186],100:[2,186],107:[2,186],108:[2,186],109:[2,186],110:[2,186],116:[2,186],118:[2,186],119:[2,186],120:[2,186],121:[2,186],122:[2,186],133:[2,186],134:[2,186],136:[2,186],137:[2,186],143:[2,186],144:[2,186],145:[2,186],148:[2,186],149:[2,186],150:[2,186],152:[2,186],153:[2,186],154:[2,186],155:[2,186],157:[2,186],158:[2,186],160:[2,186],162:[2,186],164:[2,186],166:[2,186],168:[2,186],170:[2,186]},{15:[2,189],16:[2,189],17:[2,189],18:[2,189],19:[2,189],20:[2,189],21:[2,189],23:[2,189],24:[2,189],32:[2,189],33:[2,189],34:[2,189],35:[2,189],36:[2,189],39:[2,189],41:[2,189],52:[2,189],54:[2,189],58:[2,189],66:[2,189],68:[2,189],71:[2,189],72:[2,189],73:[2,189],74:[2,189],75:[2,189],76:[2,189],77:[2,189],100:[2,189],107:[2,189],108:[2,189],109:[2,189],110:[2,189],116:[2,189],118:[2,189],119:[2,189],120:[2,189],121:[2,189],122:[2,189],133:[1,202],134:[1,203],136:[2,189],137:[2,189],143:[2,189],144:[2,189],145:[2,189],148:[2,189],149:[2,189],150:[2,189],152:[2,189],153:[2,189],154:[2,189],155:[2,189],157:[2,189],158:[2,189],160:[2,189],162:[2,189],164:[2,189],166:[2,189],168:[2,189],170:[2,189]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:200,52:[1,179],102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:231,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:200,52:[1,179],102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:232,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176},{15:[2,192],16:[2,192],17:[2,192],18:[2,192],19:[2,192],20:[2,192],21:[2,192],23:[2,192],24:[2,192],32:[2,192],33:[2,192],34:[2,192],35:[2,192],36:[2,192],39:[2,192],41:[2,192],52:[2,192],54:[2,192],58:[2,192],66:[2,192],68:[2,192],71:[2,192],72:[2,192],73:[2,192],74:[2,192],75:[2,192],76:[2,192],77:[2,192],100:[2,192],107:[2,192],108:[2,192],109:[2,192],110:[2,192],116:[2,192],118:[2,192],119:[2,192],120:[2,192],121:[2,192],122:[2,192],133:[2,192],134:[2,192],136:[2,192],137:[2,192],143:[2,192],144:[2,192],145:[2,192],148:[2,192],149:[2,192],150:[2,192],152:[2,192],153:[2,192],154:[2,192],155:[2,192],157:[2,192],158:[2,192],160:[2,192],162:[2,192],164:[2,192],166:[2,192],168:[2,192],170:[2,192]},{15:[2,178],16:[2,178],17:[2,178],18:[2,178],19:[2,178],20:[2,178],21:[2,178],23:[2,178],24:[2,178],32:[2,178],33:[2,178],34:[2,178],35:[2,178],36:[2,178],39:[2,178],41:[2,178],52:[2,178],54:[2,178],58:[2,178],66:[2,178],68:[2,178],71:[2,178],72:[2,178],73:[2,178],74:[2,178],75:[2,178],76:[2,178],77:[2,178],100:[2,178],107:[2,178],108:[2,178],109:[2,178],110:[2,178],116:[2,178],118:[2,178],119:[2,178],120:[2,178],121:[2,178],122:[2,178],133:[2,178],134:[2,178],136:[2,178],137:[2,178],143:[2,178],144:[2,178],145:[2,178],148:[2,178],149:[2,178],150:[2,178],152:[2,178],153:[2,178],154:[2,178],155:[2,178],157:[2,178],158:[2,178],160:[2,178],162:[2,178],164:[2,178],166:[2,178],168:[2,178],170:[2,178]},{15:[2,179],16:[2,179],17:[2,179],18:[2,179],19:[2,179],20:[2,179],21:[2,179],23:[2,179],24:[2,179],32:[2,179],33:[2,179],34:[2,179],35:[2,179],36:[2,179],39:[2,179],41:[2,179],52:[2,179],54:[2,179],58:[2,179],66:[2,179],68:[2,179],71:[2,179],72:[2,179],73:[2,179],74:[2,179],75:[2,179],76:[2,179],77:[2,179],100:[2,179],107:[2,179],108:[2,179],109:[2,179],110:[2,179],116:[2,179],118:[2,179],119:[2,179],120:[2,179],121:[2,179],122:[2,179],133:[2,179],134:[2,179],136:[2,179],137:[2,179],143:[2,179],144:[2,179],145:[2,179],148:[2,179],149:[2,179],150:[2,179],152:[2,179],153:[2,179],154:[2,179],155:[2,179],157:[2,179],158:[2,179],160:[2,179],162:[2,179],164:[2,179],166:[2,179],168:[2,179],170:[2,179]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:125,52:[1,179],64:204,65:233,67:51,68:[1,52],69:58,70:59,71:[1,60],72:[1,61],73:[1,62],74:[1,63],75:[1,64],76:[1,65],77:[1,66],101:156,102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:167,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176,142:166,146:165,147:164,151:163,156:162,159:161,161:160,163:159,165:158,167:157,169:155,171:154},{15:[2,171],16:[2,171],17:[2,171],18:[2,171],19:[2,171],20:[2,171],21:[2,171],23:[2,171],24:[2,171],32:[2,171],33:[2,171],34:[2,171],35:[2,171],36:[2,171],39:[2,171],41:[2,171],52:[2,171],54:[2,171],58:[2,171],66:[2,171],68:[2,171],71:[2,171],72:[2,171],73:[2,171],74:[2,171],75:[2,171],76:[2,171],77:[2,171],100:[2,171],107:[2,171],108:[2,171],109:[2,171],110:[2,171],116:[2,171],118:[2,171],119:[2,171],120:[2,171],121:[2,171],122:[2,171],133:[2,171],134:[2,171],136:[2,171],137:[2,171],143:[2,171],144:[2,171],145:[2,171],148:[2,171],149:[2,171],150:[2,171],152:[2,171],153:[2,171],154:[2,171],155:[2,171],157:[2,171],158:[2,171],160:[2,171],162:[2,171],164:[2,171],166:[2,171],168:[2,171],170:[2,171]},{32:[2,44],33:[2,44],34:[2,44],35:[2,44],36:[2,44],41:[2,44],51:[2,44],66:[2,44],68:[2,44],71:[2,44],72:[2,44],73:[2,44],74:[2,44],75:[2,44],76:[2,44],77:[2,44]},{15:[2,77],16:[2,77],17:[2,77],18:[2,77],19:[2,77],20:[2,77],21:[2,77],23:[2,77],24:[2,77],32:[2,77],33:[2,77],34:[2,77],35:[2,77],36:[2,77],39:[2,77],41:[2,77],51:[2,77],52:[2,77],66:[2,77],68:[2,77],71:[2,77],72:[2,77],73:[2,77],74:[2,77],75:[2,77],76:[2,77],77:[2,77],100:[2,77],107:[2,77],108:[2,77],109:[2,77],110:[2,77],116:[2,77],119:[2,77],120:[2,77],121:[2,77],122:[2,77],133:[2,77],134:[2,77]},{15:[2,79],16:[2,79],17:[2,79],18:[2,79],19:[2,79],20:[2,79],21:[2,79],23:[2,79],24:[2,79],32:[2,79],33:[2,79],34:[2,79],35:[2,79],36:[2,79],39:[2,79],41:[2,79],52:[2,79],66:[2,79],68:[2,79],71:[2,79],72:[2,79],73:[2,79],74:[2,79],75:[2,79],76:[2,79],77:[2,79],100:[2,79],107:[2,79],108:[2,79],110:[2,79],116:[2,79],119:[2,79],120:[2,79],121:[2,79],122:[2,79],133:[2,79],134:[2,79]},{15:[2,82],16:[2,82],17:[2,82],18:[2,82],19:[2,82],20:[2,82],21:[2,82],23:[2,82],24:[2,82],32:[2,82],33:[2,82],34:[2,82],35:[2,82],36:[2,82],39:[2,82],41:[2,82],52:[2,82],66:[2,82],68:[2,82],71:[2,82],72:[2,82],73:[2,82],74:[2,82],75:[2,82],76:[2,82],77:[2,82],100:[2,82],107:[2,82],108:[2,82],110:[2,82],116:[2,82],119:[2,82],120:[2,82],121:[2,82],122:[2,82],133:[2,82],134:[2,82]},{24:[2,83],58:[1,84]},{23:[1,147],47:234,59:74,61:72},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:125,52:[1,179],64:235,101:156,102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:167,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176,142:166,146:165,147:164,151:163,156:162,159:161,161:160,163:159,165:158,167:157,169:155,171:154},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:125,52:[1,179],64:236,101:156,102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:167,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176,142:166,146:165,147:164,151:163,156:162,159:161,161:160,163:159,165:158,167:157,169:155,171:154},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,238],27:125,30:102,31:49,32:[1,53],33:[1,54],34:[1,55],35:[1,56],36:[1,57],46:101,52:[1,132],65:47,66:[1,48],67:51,68:[1,52],69:58,70:59,71:[1,60],72:[1,61],73:[1,62],74:[1,63],75:[1,64],76:[1,65],77:[1,66],82:240,99:241,101:119,102:120,103:121,104:122,105:123,106:124,123:237,125:239,126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{15:[2,103],16:[2,103],17:[2,103],18:[2,103],19:[2,103],20:[2,103],21:[2,103],23:[2,103],24:[2,103],32:[2,103],33:[2,103],34:[2,103],35:[2,103],36:[2,103],39:[2,103],41:[2,103],52:[2,103],66:[2,103],68:[2,103],71:[2,103],72:[2,103],73:[2,103],74:[2,103],75:[2,103],76:[2,103],77:[2,103],100:[2,103],107:[2,103],108:[2,103],109:[2,103],110:[2,103],116:[2,103],119:[2,103],120:[2,103],121:[2,103],122:[2,103],133:[2,103],134:[2,103]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:125,52:[1,179],64:242,101:156,102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:167,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176,142:166,146:165,147:164,151:163,156:162,159:161,161:160,163:159,165:158,167:157,169:155,171:154},{120:[1,243]},{15:[2,104],16:[2,104],17:[2,104],18:[2,104],19:[2,104],20:[2,104],21:[2,104],23:[2,104],24:[2,104],32:[2,104],33:[2,104],34:[2,104],35:[2,104],36:[2,104],39:[2,104],41:[2,104],52:[2,104],66:[2,104],68:[2,104],71:[2,104],72:[2,104],73:[2,104],74:[2,104],75:[2,104],76:[2,104],77:[2,104],100:[2,104],107:[2,104],108:[2,104],109:[2,104],110:[2,104],116:[2,104],119:[2,104],120:[2,104],121:[2,104],122:[2,104],133:[2,104],134:[2,104]},{15:[2,111],16:[2,111],17:[2,111],18:[2,111],19:[2,111],20:[2,111],21:[2,111],23:[2,111],24:[2,111],32:[2,111],33:[2,111],34:[2,111],35:[2,111],36:[2,111],39:[2,111],41:[2,111],52:[2,111],66:[2,111],68:[2,111],71:[2,111],72:[2,111],73:[2,111],74:[2,111],75:[2,111],76:[2,111],77:[2,111],100:[2,111],107:[2,111],108:[2,111],109:[2,111],110:[2,111],116:[2,111],119:[2,111],120:[2,111],121:[2,111],122:[2,111],133:[2,111],134:[2,111]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:125,52:[1,179],101:156,102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:167,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176,142:166,146:165,147:164,151:163,156:162,159:161,161:160,163:159,165:158,167:157,169:155,171:244},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:125,52:[1,179],101:156,102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:167,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176,142:166,146:165,147:164,151:163,156:162,159:161,161:160,163:159,165:158,167:157,169:155,171:245},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:125,52:[1,179],101:156,102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:167,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176,142:166,146:165,147:164,151:163,156:162,159:161,161:160,163:159,165:158,167:157,169:155,171:246},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:125,52:[1,179],54:[1,247],64:249,101:156,102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,131:248,132:173,133:[1,126],134:[1,127],135:167,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176,142:166,146:165,147:164,151:163,156:162,159:161,161:160,163:159,165:158,167:157,169:155,171:154},{15:[2,187],16:[2,187],17:[2,187],18:[2,187],19:[2,187],20:[2,187],21:[2,187],23:[2,187],24:[2,187],32:[2,187],33:[2,187],34:[2,187],35:[2,187],36:[2,187],39:[2,187],41:[2,187],52:[2,187],54:[2,187],58:[2,187],66:[2,187],68:[2,187],71:[2,187],72:[2,187],73:[2,187],74:[2,187],75:[2,187],76:[2,187],77:[2,187],100:[2,187],107:[2,187],108:[2,187],109:[2,187],110:[2,187],116:[2,187],118:[2,187],119:[2,187],120:[2,187],121:[2,187],122:[2,187],133:[2,187],134:[2,187],136:[2,187],137:[2,187],143:[2,187],144:[2,187],145:[2,187],148:[2,187],149:[2,187],150:[2,187],152:[2,187],153:[2,187],154:[2,187],155:[2,187],157:[2,187],158:[2,187],160:[2,187],162:[2,187],164:[2,187],166:[2,187],168:[2,187],170:[2,187]},{15:[2,177],16:[2,177],17:[2,177],18:[2,177],19:[2,177],20:[2,177],21:[2,177],23:[2,177],24:[2,177],32:[2,177],33:[2,177],34:[2,177],35:[2,177],36:[2,177],39:[2,177],41:[2,177],52:[1,198],54:[2,177],58:[2,177],66:[2,177],68:[2,177],71:[2,177],72:[2,177],73:[2,177],74:[2,177],75:[2,177],76:[2,177],77:[2,177],100:[2,177],107:[2,177],108:[2,177],109:[2,177],110:[2,177],116:[2,177],118:[2,177],119:[2,177],120:[2,177],121:[2,177],122:[2,177],128:[1,33],133:[2,177],134:[2,177],136:[2,177],137:[2,177],143:[2,177],144:[2,177],145:[2,177],148:[2,177],149:[2,177],150:[2,177],152:[2,177],153:[2,177],154:[2,177],155:[2,177],157:[2,177],158:[2,177],160:[2,177],162:[2,177],164:[2,177],166:[2,177],168:[2,177],170:[2,177]},{15:[2,188],16:[2,188],17:[2,188],18:[2,188],19:[2,188],20:[2,188],21:[2,188],23:[2,188],24:[2,188],32:[2,188],33:[2,188],34:[2,188],35:[2,188],36:[2,188],39:[2,188],41:[2,188],52:[2,188],54:[2,188],58:[2,188],66:[2,188],68:[2,188],71:[2,188],72:[2,188],73:[2,188],74:[2,188],75:[2,188],76:[2,188],77:[2,188],100:[2,188],107:[2,188],108:[2,188],109:[2,188],110:[2,188],116:[2,188],118:[2,188],119:[2,188],120:[2,188],121:[2,188],122:[2,188],133:[2,188],134:[2,188],136:[2,188],137:[2,188],143:[2,188],144:[2,188],145:[2,188],148:[2,188],149:[2,188],150:[2,188],152:[2,188],153:[2,188],154:[2,188],155:[2,188],157:[2,188],158:[2,188],160:[2,188],162:[2,188],164:[2,188],166:[2,188],168:[2,188],170:[2,188]},{15:[2,180],16:[2,180],17:[2,180],18:[2,180],19:[2,180],20:[2,180],21:[2,180],23:[2,180],24:[2,180],32:[2,180],33:[2,180],34:[2,180],35:[2,180],36:[2,180],39:[2,180],41:[2,180],52:[2,180],54:[2,180],58:[2,180],66:[2,180],68:[2,180],71:[2,180],72:[2,180],73:[2,180],74:[2,180],75:[2,180],76:[2,180],77:[2,180],100:[2,180],107:[2,180],108:[2,180],109:[2,180],110:[2,180],116:[2,180],118:[2,180],119:[2,180],120:[2,180],121:[2,180],122:[2,180],133:[2,180],134:[2,180],136:[2,180],137:[2,180],143:[2,180],144:[2,180],145:[2,180],148:[2,180],149:[2,180],150:[2,180],152:[2,180],153:[2,180],154:[2,180],155:[2,180],157:[2,180],158:[2,180],160:[2,180],162:[2,180],164:[2,180],166:[2,180],168:[2,180],170:[2,180]},{15:[2,181],16:[2,181],17:[2,181],18:[2,181],19:[2,181],20:[2,181],21:[2,181],23:[2,181],24:[2,181],32:[2,181],33:[2,181],34:[2,181],35:[2,181],36:[2,181],39:[2,181],41:[2,181],52:[2,181],54:[2,181],58:[2,181],66:[2,181],68:[2,181],71:[2,181],72:[2,181],73:[2,181],74:[2,181],75:[2,181],76:[2,181],77:[2,181],100:[2,181],107:[2,181],108:[2,181],109:[2,181],110:[2,181],116:[2,181],118:[2,181],119:[2,181],120:[2,181],121:[2,181],122:[2,181],133:[2,181],134:[2,181],136:[2,181],137:[2,181],143:[2,181],144:[2,181],145:[2,181],148:[2,181],149:[2,181],150:[2,181],152:[2,181],153:[2,181],154:[2,181],155:[2,181],157:[2,181],158:[2,181],160:[2,181],162:[2,181],164:[2,181],166:[2,181],168:[2,181],170:[2,181]},{54:[1,250]},{39:[2,50]},{46:252,57:251,65:47,66:[1,48],67:51,68:[1,52],69:58,70:59,71:[1,60],72:[1,61],73:[1,62],74:[1,63],75:[1,64],76:[1,65],77:[1,66]},{56:[1,253]},{54:[2,55],58:[2,55]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:125,52:[1,179],64:254,101:156,102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:167,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176,142:166,146:165,147:164,151:163,156:162,159:161,161:160,163:159,165:158,167:157,169:155,171:154},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:200,52:[1,179],102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:167,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176,142:166,146:165,147:164,151:163,156:162,159:161,161:160,163:159,165:255},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:200,52:[1,179],102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:167,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176,142:166,146:165,147:164,151:163,156:162,159:161,161:160,163:256},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:200,52:[1,179],102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:167,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176,142:166,146:165,147:164,151:163,156:162,159:161,161:257},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:200,52:[1,179],102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:167,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176,142:166,146:165,147:164,151:163,156:162,159:258},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:200,52:[1,179],102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:167,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176,142:166,146:165,147:164,151:163,156:259},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:200,52:[1,179],102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:167,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176,142:166,146:165,147:164,151:260},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:200,52:[1,179],102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:167,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176,142:166,146:165,147:164,151:261},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:200,52:[1,179],102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:167,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176,142:166,146:165,147:262},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:200,52:[1,179],102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:167,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176,142:166,146:165,147:263},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:200,52:[1,179],102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:167,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176,142:166,146:165,147:264},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:200,52:[1,179],102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:167,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176,142:166,146:165,147:265},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:200,52:[1,179],102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:167,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176,142:166,146:266},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:200,52:[1,179],102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:167,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176,142:166,146:267},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:200,52:[1,179],102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:167,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176,142:166,146:268},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:200,52:[1,179],102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:167,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176,142:269},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:200,52:[1,179],102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:167,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176,142:270},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:200,52:[1,179],102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:271,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:200,52:[1,179],102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:272,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:200,52:[1,179],102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:273,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176},{15:[2,184],16:[2,184],17:[2,184],18:[2,184],19:[2,184],20:[2,184],21:[2,184],23:[2,184],24:[2,184],32:[2,184],33:[2,184],34:[2,184],35:[2,184],36:[2,184],39:[2,184],41:[2,184],52:[2,184],54:[2,184],58:[2,184],66:[2,184],68:[2,184],71:[2,184],72:[2,184],73:[2,184],74:[2,184],75:[2,184],76:[2,184],77:[2,184],100:[2,184],107:[2,184],108:[2,184],109:[2,184],110:[2,184],116:[2,184],118:[2,184],119:[2,184],120:[2,184],121:[2,184],122:[2,184],133:[2,184],134:[2,184],136:[2,184],137:[2,184],143:[2,184],144:[2,184],145:[2,184],148:[2,184],149:[2,184],150:[2,184],152:[2,184],153:[2,184],154:[2,184],155:[2,184],157:[2,184],158:[2,184],160:[2,184],162:[2,184],164:[2,184],166:[2,184],168:[2,184],170:[2,184]},{15:[2,185],16:[2,185],17:[2,185],18:[2,185],19:[2,185],20:[2,185],21:[2,185],23:[2,185],24:[2,185],32:[2,185],33:[2,185],34:[2,185],35:[2,185],36:[2,185],39:[2,185],41:[2,185],52:[2,185],54:[2,185],58:[2,185],66:[2,185],68:[2,185],71:[2,185],72:[2,185],73:[2,185],74:[2,185],75:[2,185],76:[2,185],77:[2,185],100:[2,185],107:[2,185],108:[2,185],109:[2,185],110:[2,185],116:[2,185],118:[2,185],119:[2,185],120:[2,185],121:[2,185],122:[2,185],133:[2,185],134:[2,185],136:[2,185],137:[2,185],143:[2,185],144:[2,185],145:[2,185],148:[2,185],149:[2,185],150:[2,185],152:[2,185],153:[2,185],154:[2,185],155:[2,185],157:[2,185],158:[2,185],160:[2,185],162:[2,185],164:[2,185],166:[2,185],168:[2,185],170:[2,185]},{15:[2,190],16:[2,190],17:[2,190],18:[2,190],19:[2,190],20:[2,190],21:[2,190],23:[2,190],24:[2,190],32:[2,190],33:[2,190],34:[2,190],35:[2,190],36:[2,190],39:[2,190],41:[2,190],52:[2,190],54:[2,190],58:[2,190],66:[2,190],68:[2,190],71:[2,190],72:[2,190],73:[2,190],74:[2,190],75:[2,190],76:[2,190],77:[2,190],100:[2,190],107:[2,190],108:[2,190],109:[2,190],110:[2,190],116:[2,190],118:[2,190],119:[2,190],120:[2,190],121:[2,190],122:[2,190],133:[2,190],134:[2,190],136:[2,190],137:[2,190],143:[2,190],144:[2,190],145:[2,190],148:[2,190],149:[2,190],150:[2,190],152:[2,190],153:[2,190],154:[2,190],155:[2,190],157:[2,190],158:[2,190],160:[2,190],162:[2,190],164:[2,190],166:[2,190],168:[2,190],170:[2,190]},{15:[2,191],16:[2,191],17:[2,191],18:[2,191],19:[2,191],20:[2,191],21:[2,191],23:[2,191],24:[2,191],32:[2,191],33:[2,191],34:[2,191],35:[2,191],36:[2,191],39:[2,191],41:[2,191],52:[2,191],54:[2,191],58:[2,191],66:[2,191],68:[2,191],71:[2,191],72:[2,191],73:[2,191],74:[2,191],75:[2,191],76:[2,191],77:[2,191],100:[2,191],107:[2,191],108:[2,191],109:[2,191],110:[2,191],116:[2,191],118:[2,191],119:[2,191],120:[2,191],121:[2,191],122:[2,191],133:[2,191],134:[2,191],136:[2,191],137:[2,191],143:[2,191],144:[2,191],145:[2,191],148:[2,191],149:[2,191],150:[2,191],152:[2,191],153:[2,191],154:[2,191],155:[2,191],157:[2,191],158:[2,191],160:[2,191],162:[2,191],164:[2,191],166:[2,191],168:[2,191],170:[2,191]},{54:[1,274]},{24:[2,84],58:[1,84]},{54:[1,275]},{54:[1,276]},{24:[1,277]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,279],27:125,52:[1,179],64:278,101:156,102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:167,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176,142:166,146:165,147:164,151:163,156:162,159:161,161:160,163:159,165:158,167:157,169:155,171:154},{24:[2,159],58:[1,280]},{24:[2,160]},{24:[2,162],54:[2,162],58:[2,162]},{54:[1,281]},{52:[1,282]},{15:[2,227],16:[2,227],17:[2,227],18:[2,227],19:[2,227],20:[2,227],21:[2,227],23:[2,227],24:[2,227],32:[2,227],33:[2,227],34:[2,227],35:[2,227],36:[2,227],39:[2,227],41:[2,227],52:[2,227],54:[2,227],58:[2,227],66:[2,227],68:[2,227],71:[2,227],72:[2,227],73:[2,227],74:[2,227],75:[2,227],76:[2,227],77:[2,227],100:[2,227],107:[2,227],108:[2,227],109:[2,227],110:[2,227],116:[2,227],118:[2,227],119:[2,227],120:[2,227],121:[2,227],122:[2,227],133:[2,227],134:[2,227]},{15:[2,228],16:[2,228],17:[2,228],18:[2,228],19:[2,228],20:[2,228],21:[2,228],23:[2,228],24:[2,228],32:[2,228],33:[2,228],34:[2,228],35:[2,228],36:[2,228],39:[2,228],41:[2,228],52:[2,228],54:[2,228],58:[2,228],66:[2,228],68:[2,228],71:[2,228],72:[2,228],73:[2,228],74:[2,228],75:[2,228],76:[2,228],77:[2,228],100:[2,228],107:[2,228],108:[2,228],109:[2,228],110:[2,228],116:[2,228],118:[2,228],119:[2,228],120:[2,228],121:[2,228],122:[2,228],133:[2,228],134:[2,228]},{15:[2,229],16:[2,229],17:[2,229],18:[2,229],19:[2,229],20:[2,229],21:[2,229],23:[2,229],24:[2,229],32:[2,229],33:[2,229],34:[2,229],35:[2,229],36:[2,229],39:[2,229],41:[2,229],52:[2,229],54:[2,229],58:[2,229],66:[2,229],68:[2,229],71:[2,229],72:[2,229],73:[2,229],74:[2,229],75:[2,229],76:[2,229],77:[2,229],100:[2,229],107:[2,229],108:[2,229],109:[2,229],110:[2,229],116:[2,229],118:[2,229],119:[2,229],120:[2,229],121:[2,229],122:[2,229],133:[2,229],134:[2,229]},{15:[2,174],16:[2,174],17:[2,174],18:[2,174],19:[2,174],20:[2,174],21:[2,174],23:[2,174],24:[2,174],32:[2,174],33:[2,174],34:[2,174],35:[2,174],36:[2,174],39:[2,174],41:[2,174],52:[2,174],54:[2,174],58:[2,174],66:[2,174],68:[2,174],71:[2,174],72:[2,174],73:[2,174],74:[2,174],75:[2,174],76:[2,174],77:[2,174],100:[2,174],107:[2,174],108:[2,174],109:[2,174],110:[2,174],116:[2,174],118:[2,174],119:[2,174],120:[2,174],121:[2,174],122:[2,174],133:[2,174],134:[2,174],136:[2,174],137:[2,174],143:[2,174],144:[2,174],145:[2,174],148:[2,174],149:[2,174],150:[2,174],152:[2,174],153:[2,174],154:[2,174],155:[2,174],157:[2,174],158:[2,174],160:[2,174],162:[2,174],164:[2,174],166:[2,174],168:[2,174],170:[2,174]},{54:[1,283],58:[1,284]},{54:[2,172],58:[2,172]},{15:[2,170],16:[2,170],17:[2,170],18:[2,170],19:[2,170],20:[2,170],21:[2,170],23:[2,170],24:[2,170],32:[2,170],33:[2,170],34:[2,170],35:[2,170],36:[2,170],39:[2,170],41:[2,170],52:[2,170],54:[2,170],58:[2,170],66:[2,170],68:[2,170],71:[2,170],72:[2,170],73:[2,170],74:[2,170],75:[2,170],76:[2,170],77:[2,170],100:[2,170],107:[2,170],108:[2,170],109:[2,170],110:[2,170],116:[2,170],118:[2,170],119:[2,170],120:[2,170],121:[2,170],122:[2,170],133:[2,170],134:[2,170],136:[2,170],137:[2,170],143:[2,170],144:[2,170],145:[2,170],148:[2,170],149:[2,170],150:[2,170],152:[2,170],153:[2,170],154:[2,170],155:[2,170],157:[2,170],158:[2,170],160:[2,170],162:[2,170],164:[2,170],166:[2,170],168:[2,170],170:[2,170]},{54:[2,54],58:[2,54]},{23:[1,147],59:208},{23:[1,285]},{118:[1,286]},{15:[2,222],16:[2,222],17:[2,222],18:[2,222],19:[2,222],20:[2,222],21:[2,222],23:[2,222],24:[2,222],32:[2,222],33:[2,222],34:[2,222],35:[2,222],36:[2,222],39:[2,222],41:[2,222],52:[2,222],54:[2,222],58:[2,222],66:[2,222],68:[2,222],71:[2,222],72:[2,222],73:[2,222],74:[2,222],75:[2,222],76:[2,222],77:[2,222],100:[2,222],107:[2,222],108:[2,222],109:[2,222],110:[2,222],116:[2,222],118:[2,222],119:[2,222],120:[2,222],121:[2,222],122:[2,222],133:[2,222],134:[2,222],166:[1,211],168:[2,222],170:[2,222]},{15:[2,220],16:[2,220],17:[2,220],18:[2,220],19:[2,220],20:[2,220],21:[2,220],23:[2,220],24:[2,220],32:[2,220],33:[2,220],34:[2,220],35:[2,220],36:[2,220],39:[2,220],41:[2,220],52:[2,220],54:[2,220],58:[2,220],66:[2,220],68:[2,220],71:[2,220],72:[2,220],73:[2,220],74:[2,220],75:[2,220],76:[2,220],77:[2,220],100:[2,220],107:[2,220],108:[2,220],109:[2,220],110:[2,220],116:[2,220],118:[2,220],119:[2,220],120:[2,220],121:[2,220],122:[2,220],133:[2,220],134:[2,220],164:[1,212],166:[2,220],168:[2,220],170:[2,220]},{15:[2,218],16:[2,218],17:[2,218],18:[2,218],19:[2,218],20:[2,218],21:[2,218],23:[2,218],24:[2,218],32:[2,218],33:[2,218],34:[2,218],35:[2,218],36:[2,218],39:[2,218],41:[2,218],52:[2,218],54:[2,218],58:[2,218],66:[2,218],68:[2,218],71:[2,218],72:[2,218],73:[2,218],74:[2,218],75:[2,218],76:[2,218],77:[2,218],100:[2,218],107:[2,218],108:[2,218],109:[2,218],110:[2,218],116:[2,218],118:[2,218],119:[2,218],120:[2,218],121:[2,218],122:[2,218],133:[2,218],134:[2,218],162:[1,213],164:[2,218],166:[2,218],168:[2,218],170:[2,218]},{15:[2,216],16:[2,216],17:[2,216],18:[2,216],19:[2,216],20:[2,216],21:[2,216],23:[2,216],24:[2,216],32:[2,216],33:[2,216],34:[2,216],35:[2,216],36:[2,216],39:[2,216],41:[2,216],52:[2,216],54:[2,216],58:[2,216],66:[2,216],68:[2,216],71:[2,216],72:[2,216],73:[2,216],74:[2,216],75:[2,216],76:[2,216],77:[2,216],100:[2,216],107:[2,216],108:[2,216],109:[2,216],110:[2,216],116:[2,216],118:[2,216],119:[2,216],120:[2,216],121:[2,216],122:[2,216],133:[2,216],134:[2,216],160:[1,214],162:[2,216],164:[2,216],166:[2,216],168:[2,216],170:[2,216]},{15:[2,214],16:[2,214],17:[2,214],18:[2,214],19:[2,214],20:[2,214],21:[2,214],23:[2,214],24:[2,214],32:[2,214],33:[2,214],34:[2,214],35:[2,214],36:[2,214],39:[2,214],41:[2,214],52:[2,214],54:[2,214],58:[2,214],66:[2,214],68:[2,214],71:[2,214],72:[2,214],73:[2,214],74:[2,214],75:[2,214],76:[2,214],77:[2,214],100:[2,214],107:[2,214],108:[2,214],109:[2,214],110:[2,214],116:[2,214],118:[2,214],119:[2,214],120:[2,214],121:[2,214],122:[2,214],133:[2,214],134:[2,214],157:[1,215],158:[1,216],160:[2,214],162:[2,214],164:[2,214],166:[2,214],168:[2,214],170:[2,214]},{15:[2,211],16:[2,211],17:[2,211],18:[2,211],19:[2,211],20:[2,211],21:[2,211],23:[2,211],24:[2,211],32:[2,211],33:[2,211],34:[2,211],35:[2,211],36:[2,211],39:[2,211],41:[2,211],52:[2,211],54:[2,211],58:[2,211],66:[2,211],68:[2,211],71:[2,211],72:[2,211],73:[2,211],74:[2,211],75:[2,211],76:[2,211],77:[2,211],100:[2,211],107:[2,211],108:[2,211],109:[2,211],110:[2,211],116:[2,211],118:[2,211],119:[2,211],120:[2,211],121:[2,211],122:[2,211],133:[2,211],134:[2,211],152:[1,217],153:[1,218],154:[1,219],155:[1,220],157:[2,211],158:[2,211],160:[2,211],162:[2,211],164:[2,211],166:[2,211],168:[2,211],170:[2,211]},{15:[2,212],16:[2,212],17:[2,212],18:[2,212],19:[2,212],20:[2,212],21:[2,212],23:[2,212],24:[2,212],32:[2,212],33:[2,212],34:[2,212],35:[2,212],36:[2,212],39:[2,212],41:[2,212],52:[2,212],54:[2,212],58:[2,212],66:[2,212],68:[2,212],71:[2,212],72:[2,212],73:[2,212],74:[2,212],75:[2,212],76:[2,212],77:[2,212],100:[2,212],107:[2,212],108:[2,212],109:[2,212],110:[2,212],116:[2,212],118:[2,212],119:[2,212],120:[2,212],121:[2,212],122:[2,212],133:[2,212],134:[2,212],152:[1,217],153:[1,218],154:[1,219],155:[1,220],157:[2,212],158:[2,212],160:[2,212],162:[2,212],164:[2,212],166:[2,212],168:[2,212],170:[2,212]},{15:[2,206],16:[2,206],17:[2,206],18:[2,206],19:[2,206],20:[2,206],21:[2,206],23:[2,206],24:[2,206],32:[2,206],33:[2,206],34:[2,206],35:[2,206],36:[2,206],39:[2,206],41:[2,206],52:[2,206],54:[2,206],58:[2,206],66:[2,206],68:[2,206],71:[2,206],72:[2,206],73:[2,206],74:[2,206],75:[2,206],76:[2,206],77:[2,206],100:[2,206],107:[2,206],108:[2,206],109:[2,206],110:[2,206],116:[2,206],118:[2,206],119:[2,206],120:[2,206],121:[2,206],122:[2,206],133:[2,206],134:[2,206],148:[1,221],149:[1,222],150:[1,223],152:[2,206],153:[2,206],154:[2,206],155:[2,206],157:[2,206],158:[2,206],160:[2,206],162:[2,206],164:[2,206],166:[2,206],168:[2,206],170:[2,206]},{15:[2,207],16:[2,207],17:[2,207],18:[2,207],19:[2,207],20:[2,207],21:[2,207],23:[2,207],24:[2,207],32:[2,207],33:[2,207],34:[2,207],35:[2,207],36:[2,207],39:[2,207],41:[2,207],52:[2,207],54:[2,207],58:[2,207],66:[2,207],68:[2,207],71:[2,207],72:[2,207],73:[2,207],74:[2,207],75:[2,207],76:[2,207],77:[2,207],100:[2,207],107:[2,207],108:[2,207],109:[2,207],110:[2,207],116:[2,207],118:[2,207],119:[2,207],120:[2,207],121:[2,207],122:[2,207],133:[2,207],134:[2,207],148:[1,221],149:[1,222],150:[1,223],152:[2,207],153:[2,207],154:[2,207],155:[2,207],157:[2,207],158:[2,207],160:[2,207],162:[2,207],164:[2,207],166:[2,207],168:[2,207],170:[2,207]},{15:[2,208],16:[2,208],17:[2,208],18:[2,208],19:[2,208],20:[2,208],21:[2,208],23:[2,208],24:[2,208],32:[2,208],33:[2,208],34:[2,208],35:[2,208],36:[2,208],39:[2,208],41:[2,208],52:[2,208],54:[2,208],58:[2,208],66:[2,208],68:[2,208],71:[2,208],72:[2,208],73:[2,208],74:[2,208],75:[2,208],76:[2,208],77:[2,208],100:[2,208],107:[2,208],108:[2,208],109:[2,208],110:[2,208],116:[2,208],118:[2,208],119:[2,208],120:[2,208],121:[2,208],122:[2,208],133:[2,208],134:[2,208],148:[1,221],149:[1,222],150:[1,223],152:[2,208],153:[2,208],154:[2,208],155:[2,208],157:[2,208],158:[2,208],160:[2,208],162:[2,208],164:[2,208],166:[2,208],168:[2,208],170:[2,208]},{15:[2,209],16:[2,209],17:[2,209],18:[2,209],19:[2,209],20:[2,209],21:[2,209],23:[2,209],24:[2,209],32:[2,209],33:[2,209],34:[2,209],35:[2,209],36:[2,209],39:[2,209],41:[2,209],52:[2,209],54:[2,209],58:[2,209],66:[2,209],68:[2,209],71:[2,209],72:[2,209],73:[2,209],74:[2,209],75:[2,209],76:[2,209],77:[2,209],100:[2,209],107:[2,209],108:[2,209],109:[2,209],110:[2,209],116:[2,209],118:[2,209],119:[2,209],120:[2,209],121:[2,209],122:[2,209],133:[2,209],134:[2,209],148:[1,221],149:[1,222],150:[1,223],152:[2,209],153:[2,209],154:[2,209],155:[2,209],157:[2,209],158:[2,209],160:[2,209],162:[2,209],164:[2,209],166:[2,209],168:[2,209],170:[2,209]},{15:[2,202],16:[2,202],17:[2,202],18:[2,202],19:[2,202],20:[2,202],21:[2,202],23:[2,202],24:[2,202],32:[2,202],33:[2,202],34:[2,202],35:[2,202],36:[2,202],39:[2,202],41:[2,202],52:[2,202],54:[2,202],58:[2,202],66:[2,202],68:[2,202],71:[2,202],72:[2,202],73:[2,202],74:[2,202],75:[2,202],76:[2,202],77:[2,202],100:[2,202],107:[2,202],108:[2,202],109:[2,202],110:[2,202],116:[2,202],118:[2,202],119:[2,202],120:[2,202],121:[2,202],122:[2,202],133:[2,202],134:[2,202],136:[1,225],137:[1,224],148:[2,202],149:[2,202],150:[2,202],152:[2,202],153:[2,202],154:[2,202],155:[2,202],157:[2,202],158:[2,202],160:[2,202],162:[2,202],164:[2,202],166:[2,202],168:[2,202],170:[2,202]},{15:[2,203],16:[2,203],17:[2,203],18:[2,203],19:[2,203],20:[2,203],21:[2,203],23:[2,203],24:[2,203],32:[2,203],33:[2,203],34:[2,203],35:[2,203],36:[2,203],39:[2,203],41:[2,203],52:[2,203],54:[2,203],58:[2,203],66:[2,203],68:[2,203],71:[2,203],72:[2,203],73:[2,203],74:[2,203],75:[2,203],76:[2,203],77:[2,203],100:[2,203],107:[2,203],108:[2,203],109:[2,203],110:[2,203],116:[2,203],118:[2,203],119:[2,203],120:[2,203],121:[2,203],122:[2,203],133:[2,203],134:[2,203],136:[1,225],137:[1,224],148:[2,203],149:[2,203],150:[2,203],152:[2,203],153:[2,203],154:[2,203],155:[2,203],157:[2,203],158:[2,203],160:[2,203],162:[2,203],164:[2,203],166:[2,203],168:[2,203],170:[2,203]},{15:[2,204],16:[2,204],17:[2,204],18:[2,204],19:[2,204],20:[2,204],21:[2,204],23:[2,204],24:[2,204],32:[2,204],33:[2,204],34:[2,204],35:[2,204],36:[2,204],39:[2,204],41:[2,204],52:[2,204],54:[2,204],58:[2,204],66:[2,204],68:[2,204],71:[2,204],72:[2,204],73:[2,204],74:[2,204],75:[2,204],76:[2,204],77:[2,204],100:[2,204],107:[2,204],108:[2,204],109:[2,204],110:[2,204],116:[2,204],118:[2,204],119:[2,204],120:[2,204],121:[2,204],122:[2,204],133:[2,204],134:[2,204],136:[1,225],137:[1,224],148:[2,204],149:[2,204],150:[2,204],152:[2,204],153:[2,204],154:[2,204],155:[2,204],157:[2,204],158:[2,204],160:[2,204],162:[2,204],164:[2,204],166:[2,204],168:[2,204],170:[2,204]},{15:[2,199],16:[2,199],17:[2,199],18:[2,199],19:[2,199],20:[2,199],21:[2,199],23:[2,199],24:[2,199],32:[2,199],33:[2,199],34:[2,199],35:[2,199],36:[2,199],39:[2,199],41:[2,199],52:[2,199],54:[2,199],58:[2,199],66:[2,199],68:[2,199],71:[2,199],72:[2,199],73:[2,199],74:[2,199],75:[2,199],76:[2,199],77:[2,199],100:[2,199],107:[2,199],108:[2,199],109:[2,199],110:[2,199],116:[2,199],118:[2,199],119:[2,199],120:[2,199],121:[2,199],122:[2,199],133:[2,199],134:[2,199],136:[2,199],137:[2,199],143:[1,226],144:[1,227],145:[1,228],148:[2,199],149:[2,199],150:[2,199],152:[2,199],153:[2,199],154:[2,199],155:[2,199],157:[2,199],158:[2,199],160:[2,199],162:[2,199],164:[2,199],166:[2,199],168:[2,199],170:[2,199]},{15:[2,200],16:[2,200],17:[2,200],18:[2,200],19:[2,200],20:[2,200],21:[2,200],23:[2,200],24:[2,200],32:[2,200],33:[2,200],34:[2,200],35:[2,200],36:[2,200],39:[2,200],41:[2,200],52:[2,200],54:[2,200],58:[2,200],66:[2,200],68:[2,200],71:[2,200],72:[2,200],73:[2,200],74:[2,200],75:[2,200],76:[2,200],77:[2,200],100:[2,200],107:[2,200],108:[2,200],109:[2,200],110:[2,200],116:[2,200],118:[2,200],119:[2,200],120:[2,200],121:[2,200],122:[2,200],133:[2,200],134:[2,200],136:[2,200],137:[2,200],143:[1,226],144:[1,227],145:[1,228],148:[2,200],149:[2,200],150:[2,200],152:[2,200],153:[2,200],154:[2,200],155:[2,200],157:[2,200],158:[2,200],160:[2,200],162:[2,200],164:[2,200],166:[2,200],168:[2,200],170:[2,200]},{15:[2,195],16:[2,195],17:[2,195],18:[2,195],19:[2,195],20:[2,195],21:[2,195],23:[2,195],24:[2,195],32:[2,195],33:[2,195],34:[2,195],35:[2,195],36:[2,195],39:[2,195],41:[2,195],52:[2,195],54:[2,195],58:[2,195],66:[2,195],68:[2,195],71:[2,195],72:[2,195],73:[2,195],74:[2,195],75:[2,195],76:[2,195],77:[2,195],100:[2,195],107:[2,195],108:[2,195],109:[2,195],110:[2,195],116:[2,195],118:[2,195],119:[2,195],120:[2,195],121:[2,195],122:[2,195],133:[2,195],134:[2,195],136:[2,195],137:[2,195],143:[2,195],144:[2,195],145:[2,195],148:[2,195],149:[2,195],150:[2,195],152:[2,195],153:[2,195],154:[2,195],155:[2,195],157:[2,195],158:[2,195],160:[2,195],162:[2,195],164:[2,195],166:[2,195],168:[2,195],170:[2,195]},{15:[2,196],16:[2,196],17:[2,196],18:[2,196],19:[2,196],20:[2,196],21:[2,196],23:[2,196],24:[2,196],32:[2,196],33:[2,196],34:[2,196],35:[2,196],36:[2,196],39:[2,196],41:[2,196],52:[2,196],54:[2,196],58:[2,196],66:[2,196],68:[2,196],71:[2,196],72:[2,196],73:[2,196],74:[2,196],75:[2,196],76:[2,196],77:[2,196],100:[2,196],107:[2,196],108:[2,196],109:[2,196],110:[2,196],116:[2,196],118:[2,196],119:[2,196],120:[2,196],121:[2,196],122:[2,196],133:[2,196],134:[2,196],136:[2,196],137:[2,196],143:[2,196],144:[2,196],145:[2,196],148:[2,196],149:[2,196],150:[2,196],152:[2,196],153:[2,196],154:[2,196],155:[2,196],157:[2,196],158:[2,196],160:[2,196],162:[2,196],164:[2,196],166:[2,196],168:[2,196],170:[2,196]},{15:[2,197],16:[2,197],17:[2,197],18:[2,197],19:[2,197],20:[2,197],21:[2,197],23:[2,197],24:[2,197],32:[2,197],33:[2,197],34:[2,197],35:[2,197],36:[2,197],39:[2,197],41:[2,197],52:[2,197],54:[2,197],58:[2,197],66:[2,197],68:[2,197],71:[2,197],72:[2,197],73:[2,197],74:[2,197],75:[2,197],76:[2,197],77:[2,197],100:[2,197],107:[2,197],108:[2,197],109:[2,197],110:[2,197],116:[2,197],118:[2,197],119:[2,197],120:[2,197],121:[2,197],122:[2,197],133:[2,197],134:[2,197],136:[2,197],137:[2,197],143:[2,197],144:[2,197],145:[2,197],148:[2,197],149:[2,197],150:[2,197],152:[2,197],153:[2,197],154:[2,197],155:[2,197],157:[2,197],158:[2,197],160:[2,197],162:[2,197],164:[2,197],166:[2,197],168:[2,197],170:[2,197]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:200,52:[1,179],102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:287,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,113],27:125,39:[1,80],52:[1,132],60:103,83:288,84:289,85:290,86:291,87:292,89:[1,293],90:294,91:295,92:296,93:104,94:105,95:106,96:107,97:108,98:109,99:114,100:[1,117],101:119,102:120,103:121,104:122,105:123,106:124,107:[1,118],108:[1,297],110:[1,115],120:[1,298],121:[1,116],122:[1,299],126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,113],27:125,39:[1,80],52:[1,132],60:103,81:300,83:96,84:97,85:98,86:99,87:100,93:104,94:105,95:106,96:107,97:108,98:109,99:114,100:[1,117],101:119,102:120,103:121,104:122,105:123,106:124,107:[1,118],108:[1,110],110:[1,115],120:[1,111],121:[1,116],122:[1,112],126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,302],27:125,52:[1,179],64:301,101:156,102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:167,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176,142:166,146:165,147:164,151:163,156:162,159:161,161:160,163:159,165:158,167:157,169:155,171:154},{24:[1,303]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:125,52:[1,132],54:[1,305],99:241,101:119,102:120,103:121,104:122,105:123,106:124,124:304,125:306,126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:125,52:[1,132],99:307,101:119,102:120,103:121,104:122,105:123,106:124,126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{39:[1,309],111:308},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:125,52:[1,179],64:310,101:156,102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:167,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176,142:166,146:165,147:164,151:163,156:162,159:161,161:160,163:159,165:158,167:157,169:155,171:154},{15:[2,175],16:[2,175],17:[2,175],18:[2,175],19:[2,175],20:[2,175],21:[2,175],23:[2,175],24:[2,175],32:[2,175],33:[2,175],34:[2,175],35:[2,175],36:[2,175],39:[2,175],41:[2,175],52:[2,175],54:[2,175],58:[2,175],66:[2,175],68:[2,175],71:[2,175],72:[2,175],73:[2,175],74:[2,175],75:[2,175],76:[2,175],77:[2,175],100:[2,175],107:[2,175],108:[2,175],109:[2,175],110:[2,175],116:[2,175],118:[2,175],119:[2,175],120:[2,175],121:[2,175],122:[2,175],133:[2,175],134:[2,175],136:[2,175],137:[2,175],143:[2,175],144:[2,175],145:[2,175],148:[2,175],149:[2,175],150:[2,175],152:[2,175],153:[2,175],154:[2,175],155:[2,175],157:[2,175],158:[2,175],160:[2,175],162:[2,175],164:[2,175],166:[2,175],168:[2,175],170:[2,175]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:125,52:[1,179],64:311,101:156,102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:167,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176,142:166,146:165,147:164,151:163,156:162,159:161,161:160,163:159,165:158,167:157,169:155,171:154},{54:[1,312]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:200,52:[1,179],102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:167,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176,142:166,146:165,147:164,151:163,156:162,159:161,161:160,163:159,165:158,167:157,169:313},{15:[2,193],16:[2,193],17:[2,193],18:[2,193],19:[2,193],20:[2,193],21:[2,193],23:[2,193],24:[2,193],32:[2,193],33:[2,193],34:[2,193],35:[2,193],36:[2,193],39:[2,193],41:[2,193],52:[2,193],54:[2,193],58:[2,193],66:[2,193],68:[2,193],71:[2,193],72:[2,193],73:[2,193],74:[2,193],75:[2,193],76:[2,193],77:[2,193],100:[2,193],107:[2,193],108:[2,193],109:[2,193],110:[2,193],116:[2,193],118:[2,193],119:[2,193],120:[2,193],121:[2,193],122:[2,193],133:[2,193],134:[2,193],136:[2,193],137:[2,193],143:[2,193],144:[2,193],145:[2,193],148:[2,193],149:[2,193],150:[2,193],152:[2,193],153:[2,193],154:[2,193],155:[2,193],157:[2,193],158:[2,193],160:[2,193],162:[2,193],164:[2,193],166:[2,193],168:[2,193],170:[2,193]},{15:[2,113],16:[2,113],17:[2,113],18:[2,113],19:[2,113],20:[2,113],21:[2,113],23:[2,113],24:[2,113],32:[2,113],33:[2,113],34:[2,113],35:[2,113],36:[2,113],39:[2,113],41:[2,113],52:[2,113],66:[2,113],68:[2,113],71:[2,113],72:[2,113],73:[2,113],74:[2,113],75:[2,113],76:[2,113],77:[2,113],100:[2,113],107:[2,113],108:[2,113],109:[1,314],110:[2,113],116:[2,113],119:[2,113],120:[2,113],121:[2,113],122:[2,113],133:[2,113],134:[2,113]},{15:[2,114],16:[2,114],17:[2,114],18:[2,114],19:[2,114],20:[2,114],21:[2,114],23:[2,114],24:[2,114],32:[2,114],33:[2,114],34:[2,114],35:[2,114],36:[2,114],39:[2,114],41:[2,114],52:[2,114],66:[2,114],68:[2,114],71:[2,114],72:[2,114],73:[2,114],74:[2,114],75:[2,114],76:[2,114],77:[2,114],100:[2,114],107:[2,114],108:[2,114],110:[2,114],116:[2,114],119:[2,114],120:[2,114],121:[2,114],122:[2,114],133:[2,114],134:[2,114]},{15:[2,115],16:[2,115],17:[2,115],18:[2,115],19:[2,115],20:[2,115],21:[2,115],23:[2,115],24:[2,115],32:[2,115],33:[2,115],34:[2,115],35:[2,115],36:[2,115],39:[2,115],41:[2,115],52:[2,115],66:[2,115],68:[2,115],71:[2,115],72:[2,115],73:[2,115],74:[2,115],75:[2,115],76:[2,115],77:[2,115],100:[2,115],107:[2,115],108:[2,115],110:[2,115],116:[2,115],119:[2,115],120:[2,115],121:[2,115],122:[2,115],133:[2,115],134:[2,115]},{15:[2,116],16:[2,116],17:[2,116],18:[2,116],19:[2,116],20:[2,116],21:[2,116],23:[2,116],24:[2,116],32:[2,116],33:[2,116],34:[2,116],35:[2,116],36:[2,116],39:[2,116],41:[2,116],52:[2,116],66:[2,116],68:[2,116],71:[2,116],72:[2,116],73:[2,116],74:[2,116],75:[2,116],76:[2,116],77:[2,116],100:[2,116],107:[2,116],108:[2,116],110:[2,116],116:[2,116],119:[2,116],120:[2,116],121:[2,116],122:[2,116],133:[2,116],134:[2,116]},{15:[2,117],16:[2,117],17:[2,117],18:[2,117],19:[2,117],20:[2,117],21:[2,117],23:[2,117],24:[2,117],32:[2,117],33:[2,117],34:[2,117],35:[2,117],36:[2,117],39:[2,117],41:[2,117],52:[2,117],66:[2,117],68:[2,117],71:[2,117],72:[2,117],73:[2,117],74:[2,117],75:[2,117],76:[2,117],77:[2,117],100:[2,117],107:[2,117],108:[2,117],110:[2,117],116:[2,117],119:[2,117],120:[2,117],121:[2,117],122:[2,117],133:[2,117],134:[2,117]},{109:[1,315]},{109:[1,316]},{109:[1,317]},{109:[1,318]},{52:[1,319]},{52:[1,320]},{52:[1,321]},{15:[2,140],16:[2,140],17:[2,140],18:[2,140],19:[2,140],20:[2,140],21:[2,140],23:[2,140],24:[2,140],32:[2,140],33:[2,140],34:[2,140],35:[2,140],36:[2,140],39:[2,140],41:[2,140],52:[2,140],66:[2,140],68:[2,140],71:[2,140],72:[2,140],73:[2,140],74:[2,140],75:[2,140],76:[2,140],77:[2,140],100:[2,140],107:[2,140],108:[2,140],110:[2,140],116:[2,140],119:[2,140],120:[2,140],121:[2,140],122:[2,140],133:[2,140],134:[2,140]},{24:[1,322]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:125,52:[1,132],54:[1,324],99:241,101:119,102:120,103:121,104:122,105:123,106:124,124:323,125:306,126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:125,52:[1,132],54:[1,326],99:241,101:119,102:120,103:121,104:122,105:123,106:124,124:325,125:306,126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{54:[1,327]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,113],27:125,39:[1,80],52:[1,132],60:103,81:328,83:96,84:97,85:98,86:99,87:100,93:104,94:105,95:106,96:107,97:108,98:109,99:114,100:[1,117],101:119,102:120,103:121,104:122,105:123,106:124,107:[1,118],108:[1,110],110:[1,115],120:[1,111],121:[1,116],122:[1,112],126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{54:[2,161],58:[1,280]},{24:[2,163],54:[2,163],58:[2,163]},{15:[2,128],16:[2,128],17:[2,128],18:[2,128],19:[2,128],20:[2,128],21:[2,128],23:[2,128],24:[2,128],32:[2,128],33:[2,128],34:[2,128],35:[2,128],36:[2,128],39:[2,128],41:[2,128],52:[2,128],66:[2,128],68:[2,128],71:[2,128],72:[2,128],73:[2,128],74:[2,128],75:[2,128],76:[2,128],77:[2,128],100:[2,128],107:[2,128],108:[2,128],109:[2,128],110:[2,128],116:[2,128],119:[2,128],120:[2,128],121:[2,128],122:[2,128],133:[2,128],134:[2,128]},{41:[1,329],112:330,113:331,114:332,115:333,116:[1,334],119:[1,335]},{54:[1,336]},{54:[2,173],58:[2,173]},{39:[2,52]},{15:[2,224],16:[2,224],17:[2,224],18:[2,224],19:[2,224],20:[2,224],21:[2,224],23:[2,224],24:[2,224],32:[2,224],33:[2,224],34:[2,224],35:[2,224],36:[2,224],39:[2,224],41:[2,224],52:[2,224],54:[2,224],58:[2,224],66:[2,224],68:[2,224],71:[2,224],72:[2,224],73:[2,224],74:[2,224],75:[2,224],76:[2,224],77:[2,224],100:[2,224],107:[2,224],108:[2,224],109:[2,224],110:[2,224],116:[2,224],118:[2,224],119:[2,224],120:[2,224],121:[2,224],122:[2,224],133:[2,224],134:[2,224]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,113],27:125,39:[1,80],52:[1,132],60:103,81:337,83:96,84:97,85:98,86:99,87:100,93:104,94:105,95:106,96:107,97:108,98:109,99:114,100:[1,117],101:119,102:120,103:121,104:122,105:123,106:124,107:[1,118],108:[1,110],110:[1,115],120:[1,111],121:[1,116],122:[1,112],126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,113],27:125,39:[1,80],52:[1,132],60:103,81:338,83:96,84:97,85:98,86:99,87:100,93:104,94:105,95:106,96:107,97:108,98:109,99:114,100:[1,117],101:119,102:120,103:121,104:122,105:123,106:124,107:[1,118],108:[1,110],110:[1,115],120:[1,111],121:[1,116],122:[1,112],126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,113],27:125,39:[1,80],52:[1,132],60:103,81:339,83:96,84:97,85:98,86:99,87:100,93:104,94:105,95:106,96:107,97:108,98:109,99:114,100:[1,117],101:119,102:120,103:121,104:122,105:123,106:124,107:[1,118],108:[1,110],110:[1,115],120:[1,111],121:[1,116],122:[1,112],126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,113],27:125,39:[1,80],52:[1,132],60:103,81:340,83:96,84:97,85:98,86:99,87:100,93:104,94:105,95:106,96:107,97:108,98:109,99:114,100:[1,117],101:119,102:120,103:121,104:122,105:123,106:124,107:[1,118],108:[1,110],110:[1,115],120:[1,111],121:[1,116],122:[1,112],126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,113],27:125,39:[1,80],52:[1,132],60:103,81:341,83:96,84:97,85:98,86:99,87:100,93:104,94:105,95:106,96:107,97:108,98:109,99:114,100:[1,117],101:119,102:120,103:121,104:122,105:123,106:124,107:[1,118],108:[1,110],110:[1,115],120:[1,111],121:[1,116],122:[1,112],126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:125,52:[1,179],64:342,101:156,102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:167,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176,142:166,146:165,147:164,151:163,156:162,159:161,161:160,163:159,165:158,167:157,169:155,171:154},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:125,52:[1,179],64:343,101:156,102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:167,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176,142:166,146:165,147:164,151:163,156:162,159:161,161:160,163:159,165:158,167:157,169:155,171:154},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,345],27:125,30:102,31:49,32:[1,53],33:[1,54],34:[1,55],35:[1,56],36:[1,57],46:101,52:[1,132],65:47,66:[1,48],67:51,68:[1,52],69:58,70:59,71:[1,60],72:[1,61],73:[1,62],74:[1,63],75:[1,64],76:[1,65],77:[1,66],82:240,99:241,101:119,102:120,103:121,104:122,105:123,106:124,123:344,125:239,126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:125,52:[1,132],54:[1,347],99:241,101:119,102:120,103:121,104:122,105:123,106:124,124:346,125:306,126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{54:[1,348]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,113],27:125,39:[1,80],52:[1,132],60:103,81:349,83:96,84:97,85:98,86:99,87:100,93:104,94:105,95:106,96:107,97:108,98:109,99:114,100:[1,117],101:119,102:120,103:121,104:122,105:123,106:124,107:[1,118],108:[1,110],110:[1,115],120:[1,111],121:[1,116],122:[1,112],126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{54:[1,350]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,113],27:125,39:[1,80],52:[1,132],60:103,81:351,83:96,84:97,85:98,86:99,87:100,93:104,94:105,95:106,96:107,97:108,98:109,99:114,100:[1,117],101:119,102:120,103:121,104:122,105:123,106:124,107:[1,118],108:[1,110],110:[1,115],120:[1,111],121:[1,116],122:[1,112],126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,113],27:125,39:[1,80],52:[1,132],60:103,81:352,83:96,84:97,85:98,86:99,87:100,93:104,94:105,95:106,96:107,97:108,98:109,99:114,100:[1,117],101:119,102:120,103:121,104:122,105:123,106:124,107:[1,118],108:[1,110],110:[1,115],120:[1,111],121:[1,116],122:[1,112],126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{15:[2,150],16:[2,150],17:[2,150],18:[2,150],19:[2,150],20:[2,150],21:[2,150],23:[2,150],24:[2,150],32:[2,150],33:[2,150],34:[2,150],35:[2,150],36:[2,150],39:[2,150],41:[2,150],52:[2,150],66:[2,150],68:[2,150],71:[2,150],72:[2,150],73:[2,150],74:[2,150],75:[2,150],76:[2,150],77:[2,150],100:[2,150],107:[2,150],108:[2,150],110:[2,150],116:[2,150],119:[2,150],120:[2,150],121:[2,150],122:[2,150],133:[2,150],134:[2,150]},{15:[2,129],16:[2,129],17:[2,129],18:[2,129],19:[2,129],20:[2,129],21:[2,129],23:[2,129],24:[2,129],32:[2,129],33:[2,129],34:[2,129],35:[2,129],36:[2,129],39:[2,129],41:[2,129],52:[2,129],66:[2,129],68:[2,129],71:[2,129],72:[2,129],73:[2,129],74:[2,129],75:[2,129],76:[2,129],77:[2,129],100:[2,129],107:[2,129],108:[2,129],109:[2,129],110:[2,129],116:[2,129],119:[2,129],120:[2,129],121:[2,129],122:[2,129],133:[2,129],134:[2,129]},{41:[1,354],113:353,114:355,115:333,116:[1,334],119:[1,335]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,113],27:125,30:102,31:49,32:[1,53],33:[1,54],34:[1,55],35:[1,56],36:[1,57],39:[1,80],41:[1,356],46:101,52:[1,132],60:103,65:47,66:[1,48],67:51,68:[1,52],69:58,70:59,71:[1,60],72:[1,61],73:[1,62],74:[1,63],75:[1,64],76:[1,65],77:[1,66],78:358,79:92,80:93,81:94,82:95,83:96,84:97,85:98,86:99,87:100,93:104,94:105,95:106,96:107,97:108,98:109,99:114,100:[1,117],101:119,102:120,103:121,104:122,105:123,106:124,107:[1,118],108:[1,110],110:[1,115],115:357,116:[1,334],119:[1,335],120:[1,111],121:[1,116],122:[1,112],126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{41:[2,133],116:[2,133],119:[2,133]},{15:[2,136],16:[2,136],17:[2,136],18:[2,136],19:[2,136],20:[2,136],21:[2,136],23:[2,136],24:[2,136],32:[2,136],33:[2,136],34:[2,136],35:[2,136],36:[2,136],39:[2,136],41:[2,136],52:[2,136],66:[2,136],68:[2,136],71:[2,136],72:[2,136],73:[2,136],74:[2,136],75:[2,136],76:[2,136],77:[2,136],100:[2,136],107:[2,136],108:[2,136],110:[2,136],116:[2,136],119:[2,136],120:[2,136],121:[2,136],122:[2,136],133:[2,136],134:[2,136]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:125,52:[1,179],64:360,101:156,102:168,103:169,104:177,105:178,106:180,117:359,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:167,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176,142:166,146:165,147:164,151:163,156:162,159:161,161:160,163:159,165:158,167:157,169:155,171:154},{118:[1,361]},{24:[1,362]},{15:[2,118],16:[2,118],17:[2,118],18:[2,118],19:[2,118],20:[2,118],21:[2,118],23:[2,118],24:[2,118],32:[2,118],33:[2,118],34:[2,118],35:[2,118],36:[2,118],39:[2,118],41:[2,118],52:[2,118],66:[2,118],68:[2,118],71:[2,118],72:[2,118],73:[2,118],74:[2,118],75:[2,118],76:[2,118],77:[2,118],100:[2,118],107:[2,118],108:[2,118],110:[2,118],116:[2,118],119:[2,118],120:[2,118],121:[2,118],122:[2,118],133:[2,118],134:[2,118]},{15:[2,119],16:[2,119],17:[2,119],18:[2,119],19:[2,119],20:[2,119],21:[2,119],23:[2,119],24:[2,119],32:[2,119],33:[2,119],34:[2,119],35:[2,119],36:[2,119],39:[2,119],41:[2,119],52:[2,119],66:[2,119],68:[2,119],71:[2,119],72:[2,119],73:[2,119],74:[2,119],75:[2,119],76:[2,119],77:[2,119],100:[2,119],107:[2,119],108:[2,119],110:[2,119],116:[2,119],119:[2,119],120:[2,119],121:[2,119],122:[2,119],133:[2,119],134:[2,119]},{15:[2,120],16:[2,120],17:[2,120],18:[2,120],19:[2,120],20:[2,120],21:[2,120],23:[2,120],24:[2,120],32:[2,120],33:[2,120],34:[2,120],35:[2,120],36:[2,120],39:[2,120],41:[2,120],52:[2,120],66:[2,120],68:[2,120],71:[2,120],72:[2,120],73:[2,120],74:[2,120],75:[2,120],76:[2,120],77:[2,120],100:[2,120],107:[2,120],108:[2,120],110:[2,120],116:[2,120],119:[2,120],120:[2,120],121:[2,120],122:[2,120],133:[2,120],134:[2,120]},{15:[2,121],16:[2,121],17:[2,121],18:[2,121],19:[2,121],20:[2,121],21:[2,121],23:[2,121],24:[2,121],32:[2,121],33:[2,121],34:[2,121],35:[2,121],36:[2,121],39:[2,121],41:[2,121],52:[2,121],66:[2,121],68:[2,121],71:[2,121],72:[2,121],73:[2,121],74:[2,121],75:[2,121],76:[2,121],77:[2,121],100:[2,121],107:[2,121],108:[2,121],110:[2,121],116:[2,121],119:[2,121],120:[2,121],121:[2,121],122:[2,121],133:[2,121],134:[2,121]},{15:[2,122],16:[2,122],17:[2,122],18:[2,122],19:[2,122],20:[2,122],21:[2,122],23:[2,122],24:[2,122],32:[2,122],33:[2,122],34:[2,122],35:[2,122],36:[2,122],39:[2,122],41:[2,122],52:[2,122],66:[2,122],68:[2,122],71:[2,122],72:[2,122],73:[2,122],74:[2,122],75:[2,122],76:[2,122],77:[2,122],100:[2,122],107:[2,122],108:[2,122],110:[2,122],116:[2,122],119:[2,122],120:[2,122],121:[2,122],122:[2,122],133:[2,122],134:[2,122]},{54:[1,363]},{54:[1,364]},{24:[1,365]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,367],27:125,52:[1,179],64:366,101:156,102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:167,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176,142:166,146:165,147:164,151:163,156:162,159:161,161:160,163:159,165:158,167:157,169:155,171:154},{54:[1,368]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,113],27:125,39:[1,80],52:[1,132],60:103,81:369,83:96,84:97,85:98,86:99,87:100,93:104,94:105,95:106,96:107,97:108,98:109,99:114,100:[1,117],101:119,102:120,103:121,104:122,105:123,106:124,107:[1,118],108:[1,110],110:[1,115],120:[1,111],121:[1,116],122:[1,112],126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,113],27:125,39:[1,80],52:[1,132],60:103,81:370,83:96,84:97,85:98,86:99,87:100,93:104,94:105,95:106,96:107,97:108,98:109,99:114,100:[1,117],101:119,102:120,103:121,104:122,105:123,106:124,107:[1,118],108:[1,110],110:[1,115],120:[1,111],121:[1,116],122:[1,112],126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{15:[2,146],16:[2,146],17:[2,146],18:[2,146],19:[2,146],20:[2,146],21:[2,146],23:[2,146],24:[2,146],32:[2,146],33:[2,146],34:[2,146],35:[2,146],36:[2,146],39:[2,146],41:[2,146],52:[2,146],66:[2,146],68:[2,146],71:[2,146],72:[2,146],73:[2,146],74:[2,146],75:[2,146],76:[2,146],77:[2,146],100:[2,146],107:[2,146],108:[2,146],110:[2,146],116:[2,146],119:[2,146],120:[2,146],121:[2,146],122:[2,146],133:[2,146],134:[2,146]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,113],27:125,39:[1,80],52:[1,132],60:103,81:371,83:96,84:97,85:98,86:99,87:100,93:104,94:105,95:106,96:107,97:108,98:109,99:114,100:[1,117],101:119,102:120,103:121,104:122,105:123,106:124,107:[1,118],108:[1,110],110:[1,115],120:[1,111],121:[1,116],122:[1,112],126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{15:[2,148],16:[2,148],17:[2,148],18:[2,148],19:[2,148],20:[2,148],21:[2,148],23:[2,148],24:[2,148],32:[2,148],33:[2,148],34:[2,148],35:[2,148],36:[2,148],39:[2,148],41:[2,148],52:[2,148],66:[2,148],68:[2,148],71:[2,148],72:[2,148],73:[2,148],74:[2,148],75:[2,148],76:[2,148],77:[2,148],100:[2,148],107:[2,148],108:[2,148],110:[2,148],116:[2,148],119:[2,148],120:[2,148],121:[2,148],122:[2,148],133:[2,148],134:[2,148]},{15:[2,149],16:[2,149],17:[2,149],18:[2,149],19:[2,149],20:[2,149],21:[2,149],23:[2,149],24:[2,149],32:[2,149],33:[2,149],34:[2,149],35:[2,149],36:[2,149],39:[2,149],41:[2,149],52:[2,149],66:[2,149],68:[2,149],71:[2,149],72:[2,149],73:[2,149],74:[2,149],75:[2,149],76:[2,149],77:[2,149],100:[2,149],107:[2,149],108:[2,149],110:[2,149],116:[2,149],119:[2,149],120:[2,149],121:[2,149],122:[2,149],133:[2,149],134:[2,149]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,113],27:125,30:102,31:49,32:[1,53],33:[1,54],34:[1,55],35:[1,56],36:[1,57],39:[1,80],41:[1,372],46:101,52:[1,132],60:103,65:47,66:[1,48],67:51,68:[1,52],69:58,70:59,71:[1,60],72:[1,61],73:[1,62],74:[1,63],75:[1,64],76:[1,65],77:[1,66],78:358,79:92,80:93,81:94,82:95,83:96,84:97,85:98,86:99,87:100,93:104,94:105,95:106,96:107,97:108,98:109,99:114,100:[1,117],101:119,102:120,103:121,104:122,105:123,106:124,107:[1,118],108:[1,110],110:[1,115],115:357,116:[1,334],119:[1,335],120:[1,111],121:[1,116],122:[1,112],126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{15:[2,132],16:[2,132],17:[2,132],18:[2,132],19:[2,132],20:[2,132],21:[2,132],23:[2,132],24:[2,132],32:[2,132],33:[2,132],34:[2,132],35:[2,132],36:[2,132],39:[2,132],41:[2,132],52:[2,132],66:[2,132],68:[2,132],71:[2,132],72:[2,132],73:[2,132],74:[2,132],75:[2,132],76:[2,132],77:[2,132],100:[2,132],107:[2,132],108:[2,132],109:[2,132],110:[2,132],116:[2,132],119:[2,132],120:[2,132],121:[2,132],122:[2,132],133:[2,132],134:[2,132]},{41:[2,134],116:[2,134],119:[2,134]},{15:[2,131],16:[2,131],17:[2,131],18:[2,131],19:[2,131],20:[2,131],21:[2,131],23:[2,131],24:[2,131],32:[2,131],33:[2,131],34:[2,131],35:[2,131],36:[2,131],39:[2,131],41:[2,131],52:[2,131],66:[2,131],68:[2,131],71:[2,131],72:[2,131],73:[2,131],74:[2,131],75:[2,131],76:[2,131],77:[2,131],100:[2,131],107:[2,131],108:[2,131],109:[2,131],110:[2,131],116:[2,131],119:[2,131],120:[2,131],121:[2,131],122:[2,131],133:[2,131],134:[2,131]},{15:[2,137],16:[2,137],17:[2,137],18:[2,137],19:[2,137],20:[2,137],21:[2,137],23:[2,137],24:[2,137],32:[2,137],33:[2,137],34:[2,137],35:[2,137],36:[2,137],39:[2,137],41:[2,137],52:[2,137],66:[2,137],68:[2,137],71:[2,137],72:[2,137],73:[2,137],74:[2,137],75:[2,137],76:[2,137],77:[2,137],100:[2,137],107:[2,137],108:[2,137],110:[2,137],116:[2,137],119:[2,137],120:[2,137],121:[2,137],122:[2,137],133:[2,137],134:[2,137]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,113],27:125,30:102,31:49,32:[1,53],33:[1,54],34:[1,55],35:[1,56],36:[1,57],39:[1,80],41:[2,135],46:101,52:[1,132],60:103,65:47,66:[1,48],67:51,68:[1,52],69:58,70:59,71:[1,60],72:[1,61],73:[1,62],74:[1,63],75:[1,64],76:[1,65],77:[1,66],79:183,80:93,81:94,82:95,83:96,84:97,85:98,86:99,87:100,93:104,94:105,95:106,96:107,97:108,98:109,99:114,100:[1,117],101:119,102:120,103:121,104:122,105:123,106:124,107:[1,118],108:[1,110],110:[1,115],116:[2,135],119:[2,135],120:[1,111],121:[1,116],122:[1,112],126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{118:[1,373]},{118:[2,232]},{15:[2,139],16:[2,139],17:[2,139],18:[2,139],19:[2,139],20:[2,139],21:[2,139],23:[2,139],24:[2,139],32:[2,139],33:[2,139],34:[2,139],35:[2,139],36:[2,139],39:[2,139],41:[2,139],52:[2,139],66:[2,139],68:[2,139],71:[2,139],72:[2,139],73:[2,139],74:[2,139],75:[2,139],76:[2,139],77:[2,139],100:[2,139],107:[2,139],108:[2,139],110:[2,139],116:[2,139],119:[2,139],120:[2,139],121:[2,139],122:[2,139],133:[2,139],134:[2,139]},{15:[2,142],16:[2,142],17:[2,142],18:[2,142],19:[2,142],20:[2,142],21:[2,142],23:[2,142],24:[2,142],32:[2,142],33:[2,142],34:[2,142],35:[2,142],36:[2,142],39:[2,142],41:[2,142],52:[2,142],66:[2,142],68:[2,142],71:[2,142],72:[2,142],73:[2,142],74:[2,142],75:[2,142],76:[2,142],77:[2,142],100:[2,142],107:[2,142],108:[2,142],109:[2,142],110:[2,142],116:[2,142],119:[2,142],120:[2,142],121:[2,142],122:[2,142],133:[2,142],134:[2,142]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,113],27:125,39:[1,80],52:[1,132],60:103,83:374,84:289,85:290,86:291,87:292,89:[1,375],90:376,91:377,92:378,93:104,94:105,95:106,96:107,97:108,98:109,99:114,100:[1,117],101:119,102:120,103:121,104:122,105:123,106:124,107:[1,118],108:[1,297],110:[1,115],120:[1,298],121:[1,116],122:[1,299],126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,113],27:125,39:[1,80],52:[1,132],60:103,81:300,83:380,84:97,85:98,86:99,87:100,88:379,89:[1,381],90:382,91:383,92:384,93:104,94:105,95:106,96:107,97:108,98:109,99:114,100:[1,117],101:119,102:120,103:121,104:122,105:123,106:124,107:[1,118],108:[1,297],110:[1,115],120:[1,298],121:[1,116],122:[1,299],126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,386],27:125,52:[1,179],64:385,101:156,102:168,103:169,104:177,105:178,106:180,126:22,127:23,129:129,130:130,132:173,133:[1,126],134:[1,127],135:167,136:[1,170],137:[1,171],138:172,139:[1,174],140:[1,175],141:176,142:166,146:165,147:164,151:163,156:162,159:161,161:160,163:159,165:158,167:157,169:155,171:154},{24:[1,387]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:125,52:[1,132],54:[1,389],99:241,101:119,102:120,103:121,104:122,105:123,106:124,124:388,125:306,126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,113],27:125,39:[1,80],52:[1,132],60:103,81:390,83:96,84:97,85:98,86:99,87:100,93:104,94:105,95:106,96:107,97:108,98:109,99:114,100:[1,117],101:119,102:120,103:121,104:122,105:123,106:124,107:[1,118],108:[1,110],110:[1,115],120:[1,111],121:[1,116],122:[1,112],126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{15:[2,144],16:[2,144],17:[2,144],18:[2,144],19:[2,144],20:[2,144],21:[2,144],23:[2,144],24:[2,144],32:[2,144],33:[2,144],34:[2,144],35:[2,144],36:[2,144],39:[2,144],41:[2,144],52:[2,144],66:[2,144],68:[2,144],71:[2,144],72:[2,144],73:[2,144],74:[2,144],75:[2,144],76:[2,144],77:[2,144],100:[2,144],107:[2,144],108:[2,144],110:[2,144],116:[2,144],119:[2,144],120:[2,144],121:[2,144],122:[2,144],133:[2,144],134:[2,144]},{15:[2,145],16:[2,145],17:[2,145],18:[2,145],19:[2,145],20:[2,145],21:[2,145],23:[2,145],24:[2,145],32:[2,145],33:[2,145],34:[2,145],35:[2,145],36:[2,145],39:[2,145],41:[2,145],52:[2,145],66:[2,145],68:[2,145],71:[2,145],72:[2,145],73:[2,145],74:[2,145],75:[2,145],76:[2,145],77:[2,145],100:[2,145],107:[2,145],108:[2,145],110:[2,145],116:[2,145],119:[2,145],120:[2,145],121:[2,145],122:[2,145],133:[2,145],134:[2,145]},{15:[2,147],16:[2,147],17:[2,147],18:[2,147],19:[2,147],20:[2,147],21:[2,147],23:[2,147],24:[2,147],32:[2,147],33:[2,147],34:[2,147],35:[2,147],36:[2,147],39:[2,147],41:[2,147],52:[2,147],66:[2,147],68:[2,147],71:[2,147],72:[2,147],73:[2,147],74:[2,147],75:[2,147],76:[2,147],77:[2,147],100:[2,147],107:[2,147],108:[2,147],110:[2,147],116:[2,147],119:[2,147],120:[2,147],121:[2,147],122:[2,147],133:[2,147],134:[2,147]},{15:[2,130],16:[2,130],17:[2,130],18:[2,130],19:[2,130],20:[2,130],21:[2,130],23:[2,130],24:[2,130],32:[2,130],33:[2,130],34:[2,130],35:[2,130],36:[2,130],39:[2,130],41:[2,130],52:[2,130],66:[2,130],68:[2,130],71:[2,130],72:[2,130],73:[2,130],74:[2,130],75:[2,130],76:[2,130],77:[2,130],100:[2,130],107:[2,130],108:[2,130],109:[2,130],110:[2,130],116:[2,130],119:[2,130],120:[2,130],121:[2,130],122:[2,130],133:[2,130],134:[2,130]},{15:[2,138],16:[2,138],17:[2,138],18:[2,138],19:[2,138],20:[2,138],21:[2,138],23:[2,138],24:[2,138],32:[2,138],33:[2,138],34:[2,138],35:[2,138],36:[2,138],39:[2,138],41:[2,138],52:[2,138],66:[2,138],68:[2,138],71:[2,138],72:[2,138],73:[2,138],74:[2,138],75:[2,138],76:[2,138],77:[2,138],100:[2,138],107:[2,138],108:[2,138],110:[2,138],116:[2,138],119:[2,138],120:[2,138],121:[2,138],122:[2,138],133:[2,138],134:[2,138]},{15:[2,113],16:[2,113],17:[2,113],18:[2,113],19:[2,113],20:[2,113],21:[2,113],23:[2,113],24:[2,113],32:[2,113],33:[2,113],34:[2,113],35:[2,113],36:[2,113],39:[2,113],41:[2,113],52:[2,113],66:[2,113],68:[2,113],71:[2,113],72:[2,113],73:[2,113],74:[2,113],75:[2,113],76:[2,113],77:[2,113],100:[2,113],107:[2,113],108:[2,113],109:[1,391],110:[2,113],116:[2,113],119:[2,113],120:[2,113],121:[2,113],122:[2,113],133:[2,113],134:[2,113]},{109:[1,392]},{109:[1,393]},{109:[1,394]},{109:[1,395]},{109:[2,141]},{15:[2,85],16:[2,85],17:[2,85],18:[2,85],19:[2,85],20:[2,85],21:[2,85],23:[2,85],24:[2,85],32:[2,85],33:[2,85],34:[2,85],35:[2,85],36:[2,85],39:[2,85],41:[2,85],52:[2,85],66:[2,85],68:[2,85],71:[2,85],72:[2,85],73:[2,85],74:[2,85],75:[2,85],76:[2,85],77:[2,85],100:[2,85],107:[2,85],108:[2,85],109:[2,85],110:[2,85],116:[2,85],119:[2,85],120:[2,85],121:[2,85],122:[2,85],133:[2,85],134:[2,85]},{109:[2,91]},{109:[2,92]},{109:[2,93]},{109:[2,94]},{24:[1,396]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:125,52:[1,132],54:[1,398],99:241,101:119,102:120,103:121,104:122,105:123,106:124,124:397,125:306,126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:125,52:[1,132],54:[1,400],99:241,101:119,102:120,103:121,104:122,105:123,106:124,124:399,125:306,126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{54:[1,401]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,113],27:125,39:[1,80],52:[1,132],60:103,81:328,83:380,84:97,85:98,86:99,87:100,88:402,89:[1,381],90:382,91:383,92:384,93:104,94:105,95:106,96:107,97:108,98:109,99:114,100:[1,117],101:119,102:120,103:121,104:122,105:123,106:124,107:[1,118],108:[1,297],110:[1,115],120:[1,298],121:[1,116],122:[1,299],126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{15:[2,143],16:[2,143],17:[2,143],18:[2,143],19:[2,143],20:[2,143],21:[2,143],23:[2,143],24:[2,143],32:[2,143],33:[2,143],34:[2,143],35:[2,143],36:[2,143],39:[2,143],41:[2,143],52:[2,143],66:[2,143],68:[2,143],71:[2,143],72:[2,143],73:[2,143],74:[2,143],75:[2,143],76:[2,143],77:[2,143],100:[2,143],107:[2,143],108:[2,143],110:[2,143],116:[2,143],119:[2,143],120:[2,143],121:[2,143],122:[2,143],133:[2,143],134:[2,143]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,113],27:125,39:[1,80],52:[1,132],60:103,81:337,83:380,84:97,85:98,86:99,87:100,88:403,89:[1,381],90:382,91:383,92:384,93:104,94:105,95:106,96:107,97:108,98:109,99:114,100:[1,117],101:119,102:120,103:121,104:122,105:123,106:124,107:[1,118],108:[1,297],110:[1,115],120:[1,298],121:[1,116],122:[1,299],126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,113],27:125,39:[1,80],52:[1,132],60:103,81:338,83:380,84:97,85:98,86:99,87:100,88:404,89:[1,381],90:382,91:383,92:384,93:104,94:105,95:106,96:107,97:108,98:109,99:114,100:[1,117],101:119,102:120,103:121,104:122,105:123,106:124,107:[1,118],108:[1,297],110:[1,115],120:[1,298],121:[1,116],122:[1,299],126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,113],27:125,39:[1,80],52:[1,132],60:103,81:339,83:380,84:97,85:98,86:99,87:100,88:405,89:[1,381],90:382,91:383,92:384,93:104,94:105,95:106,96:107,97:108,98:109,99:114,100:[1,117],101:119,102:120,103:121,104:122,105:123,106:124,107:[1,118],108:[1,297],110:[1,115],120:[1,298],121:[1,116],122:[1,299],126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,113],27:125,39:[1,80],52:[1,132],60:103,81:340,83:380,84:97,85:98,86:99,87:100,88:406,89:[1,381],90:382,91:383,92:384,93:104,94:105,95:106,96:107,97:108,98:109,99:114,100:[1,117],101:119,102:120,103:121,104:122,105:123,106:124,107:[1,118],108:[1,297],110:[1,115],120:[1,298],121:[1,116],122:[1,299],126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,113],27:125,39:[1,80],52:[1,132],60:103,81:341,83:380,84:97,85:98,86:99,87:100,88:407,89:[1,381],90:382,91:383,92:384,93:104,94:105,95:106,96:107,97:108,98:109,99:114,100:[1,117],101:119,102:120,103:121,104:122,105:123,106:124,107:[1,118],108:[1,297],110:[1,115],120:[1,298],121:[1,116],122:[1,299],126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],27:125,52:[1,132],54:[1,409],99:241,101:119,102:120,103:121,104:122,105:123,106:124,124:408,125:306,126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{54:[1,410]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,113],27:125,39:[1,80],52:[1,132],60:103,81:349,83:380,84:97,85:98,86:99,87:100,88:411,89:[1,381],90:382,91:383,92:384,93:104,94:105,95:106,96:107,97:108,98:109,99:114,100:[1,117],101:119,102:120,103:121,104:122,105:123,106:124,107:[1,118],108:[1,297],110:[1,115],120:[1,298],121:[1,116],122:[1,299],126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{54:[1,412]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,113],27:125,39:[1,80],52:[1,132],60:103,81:351,83:380,84:97,85:98,86:99,87:100,88:413,89:[1,381],90:382,91:383,92:384,93:104,94:105,95:106,96:107,97:108,98:109,99:114,100:[1,117],101:119,102:120,103:121,104:122,105:123,106:124,107:[1,118],108:[1,297],110:[1,115],120:[1,298],121:[1,116],122:[1,299],126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,113],27:125,39:[1,80],52:[1,132],60:103,81:352,83:380,84:97,85:98,86:99,87:100,88:414,89:[1,381],90:382,91:383,92:384,93:104,94:105,95:106,96:107,97:108,98:109,99:114,100:[1,117],101:119,102:120,103:121,104:122,105:123,106:124,107:[1,118],108:[1,297],110:[1,115],120:[1,298],121:[1,116],122:[1,299],126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{109:[2,158]},{109:[2,123]},{109:[2,124]},{109:[2,125]},{109:[2,126]},{109:[2,127]},{54:[1,415]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,113],27:125,39:[1,80],52:[1,132],60:103,81:369,83:380,84:97,85:98,86:99,87:100,88:416,89:[1,381],90:382,91:383,92:384,93:104,94:105,95:106,96:107,97:108,98:109,99:114,100:[1,117],101:119,102:120,103:121,104:122,105:123,106:124,107:[1,118],108:[1,297],110:[1,115],120:[1,298],121:[1,116],122:[1,299],126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,113],27:125,39:[1,80],52:[1,132],60:103,81:370,83:380,84:97,85:98,86:99,87:100,88:417,89:[1,381],90:382,91:383,92:384,93:104,94:105,95:106,96:107,97:108,98:109,99:114,100:[1,117],101:119,102:120,103:121,104:122,105:123,106:124,107:[1,118],108:[1,297],110:[1,115],120:[1,298],121:[1,116],122:[1,299],126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{109:[2,154]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,113],27:125,39:[1,80],52:[1,132],60:103,81:371,83:380,84:97,85:98,86:99,87:100,88:418,89:[1,381],90:382,91:383,92:384,93:104,94:105,95:106,96:107,97:108,98:109,99:114,100:[1,117],101:119,102:120,103:121,104:122,105:123,106:124,107:[1,118],108:[1,297],110:[1,115],120:[1,298],121:[1,116],122:[1,299],126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{109:[2,156]},{109:[2,157]},{8:131,9:133,10:134,11:135,12:136,13:137,14:138,15:[1,139],16:[1,141],17:[1,142],18:[1,143],19:[1,140],20:[1,144],21:[1,145],23:[1,24],24:[1,113],27:125,39:[1,80],52:[1,132],60:103,81:390,83:380,84:97,85:98,86:99,87:100,88:419,89:[1,381],90:382,91:383,92:384,93:104,94:105,95:106,96:107,97:108,98:109,99:114,100:[1,117],101:119,102:120,103:121,104:122,105:123,106:124,107:[1,118],108:[1,297],110:[1,115],120:[1,298],121:[1,116],122:[1,299],126:22,127:23,129:129,130:130,132:128,133:[1,126],134:[1,127]},{109:[2,152]},{109:[2,153]},{109:[2,155]},{109:[2,151]}],
    defaultActions: {2:[2,1],8:[2,26],10:[2,27],13:[2,2],16:[2,3],19:[2,4],27:[2,5],29:[2,6],30:[2,7],34:[2,35],37:[2,8],67:[2,36],68:[2,37],71:[2,47],81:[2,49],88:[2,46],89:[2,48],149:[2,51],205:[2,50],240:[2,160],312:[2,52],360:[2,232],379:[2,141],381:[2,91],382:[2,92],383:[2,93],384:[2,94],402:[2,158],403:[2,123],404:[2,124],405:[2,125],406:[2,126],407:[2,127],411:[2,154],413:[2,156],414:[2,157],416:[2,152],417:[2,153],418:[2,155],419:[2,151]},
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
    case 1:this.begin('comment');
    break;
    case 2:this.popState();
    break;
    case 3:/* skip comment content*/
    break;
    case 4:/* skip whitespace */
    break;
    case 5:return 39; /* Basic Syntax */
    break;
    case 6:return 41;
    break;
    case 7:return 52;
    break;
    case 8:return 54;
    break;
    case 9:return 55;
    break;
    case 10:return 56;
    break;
    case 11:return 58;
    break;
    case 12:return 170;
    break;
    case 13:return 118;
    break;
    case 14:return 24;
    break;
    case 15:return 32; /* Modifier */
    break;
    case 16:return 33;
    break;
    case 17:return 34;
    break;
    case 18:return 35;
    break;
    case 19:return 36;
    break;
    case 20:return 51;
    break;
    case 21:return 22; /* Keywords */
    break;
    case 22:return 26;
    break;
    case 23:return 108;
    break;
    case 24:return 109;
    break;
    case 25:return 120;
    break;
    case 26:return 121;
    break;
    case 27:return 122;
    break;
    case 28:return 100;
    break;
    case 29:return 110;
    break;
    case 30:return 116;
    break;
    case 31:return 119;
    break;
    case 32:return 17;
    break;
    case 33:return 18;
    break;
    case 34:return 37;
    break;
    case 35:return 107;
    break;
    case 36:return 68;
    break;
    case 37:return 71;
    break;
    case 38:return 72;
    break;
    case 39:return 73;
    break;
    case 40:return 74;
    break;
    case 41:return 75;
    break;
    case 42:return 76;
    break;
    case 43:return 77;
    break;
    case 44:return 66;
    break;
    case 45:return 148;
    break;
    case 46:return 150;
    break;
    case 47:return 149;
    break;
    case 48:return 153;
    break;
    case 49:return 152;
    break;
    case 50:return 157;
    break;
    case 51:return 155;
    break;
    case 52:return 154;
    break;
    case 53:return 158;
    break;
    case 54:return 'OPERATOR_INSTANCEOF';
    break;
    case 55:return 168;
    break;
    case 56:return 164;
    break;
    case 57:return 162;
    break;
    case 58:return 166;
    break;
    case 59:return 160;
    break;
    case 60:return 139;
    break;
    case 61:return 140;
    break;
    case 62:return 62;
    break;
    case 63:return 172;
    break;
    case 64:return '-=';
    break;
    case 65:return '*=';
    break;
    case 66:return 173;
    break;
    case 67:return '%=';
    break;
    case 68:return '&=';
    break;
    case 69:return '^=';
    break;
    case 70:return '|=';
    break;
    case 71:return '<<=';
    break;
    case 72:return '>>=';
    break;
    case 73:return '>>>=';
    break;
    case 74:return 133;
    break;
    case 75:return 137;
    break;
    case 76:return 134;
    break;
    case 77:return 136;
    break;
    case 78:return 143;
    break;
    case 79:return 144;
    break;
    case 80:return 145;
    break;
    case 81:return 21;
    break;
    case 82:return 23; /* Varying form */
    break;
    case 83:return 16;
    break;
    case 84:return 15;
    break;
    case 85:return 20;
    break;
    case 86:return 20;
    break;
    case 87:return 19;
    break;
    case 88:return 128;
    break;
    case 89:return 4;
    break;
    case 90:return 'INVALID';
    break;
    }
    };
    lexer.rules = [/^\/\/.*/,/^\/\*/,/^\*\//,/^./,/^\s+/,/^\{/,/^\}/,/^\(/,/^\)/,/^\[/,/^\]/,/^,/,/^\?/,/^:/,/^;/,/^public\b/,/^private\b/,/^protected\b/,/^static\b/,/^final\b/,/^void\b/,/^package\b/,/^import\b/,/^if\b/,/^else\b/,/^while\b/,/^do\b/,/^for\b/,/^break\b/,/^switch\b/,/^case\b/,/^default\b/,/^true\b/,/^false\b/,/^class\b/,/^return\b/,/^boolean\b/,/^byte\b/,/^short\b/,/^int\b/,/^long\b/,/^char\b/,/^float\b/,/^double\b/,/^String\b/,/^<</,/^>>>/,/^>>/,/^<=/,/^</,/^==/,/^>=/,/^>/,/^!=/,/^instanceof\b/,/^\|\|/,/^\|/,/^\^/,/^&&/,/^&/,/^~/,/^!/,/^=/,/^\+=/,/^-=/,/^\*=/,/^\/=/,/^%=/,/^&=/,/^\^=/,/^\|=/,/^<<=/,/^>>=/,/^>>>=/,/^\+\+/,/^\+/,/^--/,/^-/,/^\*/,/^\//,/^%/,/^null\b/,/^[a-zA-Z][a-zA-Z0-9_]*/,/^((0|[1-9][0-9]*)\.(0|[1-9][0-9]*)?([Ee][+-]?(0|[1-9][0-9]*))?[fFdD]?|\.(0|[1-9][0-9]*)([Ee][+-]?(0|[1-9][0-9]*))?[fFdD]?|(0|[1-9][0-9]*)([Ee][+-]?(0|[1-9][0-9]*))[fFdD]?|(0|[1-9][0-9]*)([Ee][+-]?(0|[1-9][0-9]*))?[fFdD])(?=([^\w]|$))/,/^(0|[1-9][0-9]*)[lL]?\b\b/,/^""/,/^".*"/,/^'.'/,/^\./,/^$/,/^./];
    lexer.conditions = {"comment":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90],"inclusive":true},"INITIAL":{"rules":[0,1,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90],"inclusive":true}};return lexer;})()
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
    var vava = (typeof hobbes !== 'undefined' && hobbes.vava);
    var builder = utils.builder;
    
    var ASTNodeInterface = exports.ASTNodeInterface = new utils.Interface('ASTNode', 'appendChild', 'compile', 'getType', 'setLoc', 'toString');
    
    /**
     * @constructor
     * Creates an ASTNode.
     *
     * Inheritants need to make sure they have children of their own!
     */
    var ASTNode = exports.ASTNode = function ASTNode () {
      // Node type
      this.type = 'ASTNode';
      this.setLoc();
      // Lists the node's child nodes
      this.children = [];
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
    };
    
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
    ASTNode.prototype.compile = function (opts) {
      var result = this.storedOrNewCompilation(opts);
      this.compileTimeCheck(opts);
      return result;
    };
    
    ASTNode.prototype.storedOrNewCompilation = function (opts) {
      this.__compiled = this.__compiled || {};
      var dictKey = '';
      for (key in opts) {
        // Not failsafe, but should cover all relevant cases
        dictKey += key + String(opts[key]);
      }
      return this.__compiled[dictKey] || (this.__compiled[dictKey] = this.compileNode(opts));
    };
    
    /**
     * Default compilation: empty string
     */
    ASTNode.prototype.compileNode = function () { return ''; };
    
    /**
     * Implement in each node to check for compile time errors.
     *
     * @param opts Options hash
     *
     * @throws CompileTimeError via `fatalError`, or adds one
     * to opts.errors via `nonFatalError`
     */
    ASTNode.prototype.compileTimeCheck = function (opts) {};
    
    /**
     * Returns the type of node.
     */
    ASTNode.prototype.getType = function () {
      return this.type;
    };
    
    /**
     * Sets location information.
     *
     * Any node may be passed location information as the last argument to its
     * constructor, revealing the location of the corresponding code fragment
     * in the source code.
     *
     * @params locHash Hash containing the location information
     */
    ASTNode.prototype.setLoc = function (locHash) {
      this.loc = locHash || {};
    };
    
    ASTNode.prototype.fatalError = function (message, description, loc) {
      throw this.nonFatalError(message, description, loc);
    };
    
    ASTNode.prototype.nonFatalError = function (message, description, loc) {
      var err = new Error(message);
      err.type = 'CompileTimeError';
      err.description = description;
      err.loc = loc || this.loc;
      return err;
    };
    
    ASTNode.prototype.typeMismatchDescription = function (found, required) {
      return 'found   : ' + found + '\nrequired: ' + required;
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
    };
    
    vava.mixins.TypeChecking.mixInto(ASTNode);
    
    /**
     * Creates a node for a compilation unit, the root node of a Vava AST.
     */
    var CompilationUnit = exports.CompilationUnit = function CompilationUnit () {
      this.type = 'CompilationUnit';
      this.setLoc();
      this.children = [];
      this.vavaPackage = null;
    };
    
    CompilationUnit.inherits(ASTNode);
    
    /**
     * Compiles the unit, with recursive calls to child nodes and attention to
     *   - the `package` property,
     *   - the list of `imports`.
     */
    CompilationUnit.prototype.compileNode = function (opts) {
      var opts = opts || {};
      opts.errors = [];
      opts.names = opts.names || new vava.scope.Scope();
      opts.mergeOpts = function (extraOptions) {
        var F = function () {};
        F.prototype = this;
        var obj = new F();
        for (var key in (extraOptions || {})) {
          obj[key] = extraOptions[key];
        }
        return obj;
      };
      opts.descendScope = function(extraOptions) {
        var obj = this.mergeOpts(extraOptions);
        obj.names = this.names.__descend();
        return obj;
      };
      opts.changeIndent = function (num) {
        if (typeof num === 'number' && num !== 0) return this.mergeOpts({indent: (this.indent || 0) + num});
        if (num === 0) return this.mergeOpts({indent: 0});
        return this;
      }
      opts.setModifier = function (modifier, name, onOrOff) {
        this.names['__' + modifier + '-' + name] = !!onOrOff;
      };
      opts.hasModifier = function (modifier, name) {
        return this.names['__' + modifier + '-' + name];
      };
      opts.addError = function (err) {
        opts.errors.push(err);
      }
      var jsSource = '';
      
      this.children.forEach(function (child) {
        jsSource += child.compile(opts) + '\n';
      });
      
      if (opts.errors.length > 0) {
        throw opts.errors;
      }
    
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
      this.setLoc(arguments[arguments.length-1]);
    
      if (importDeclaration) this.appendChild(importDeclaration);
    };
    
    ImportDeclarations.inherits(ASTNode);
    
    ImportDeclarations.prototype.compileNode = function (opts) {
      return [this.children.map(function (child) { return child.compile(opts) })].join('\n');
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
      this.setLoc(arguments[arguments.length-1]);
      this.appendChild(name);
    };
    
    ImportDeclaration.inherits(ASTNode);
    
    ImportDeclaration.prototype.checkChild = function (name) {
      if (!name || name.getType() !== 'Name') {
        throw new TypeError('Expected import declaration to be of type `Name`.');
      }
    };
    
    ImportDeclaration.prototype.compileNode = function (opts) {
      for (var i = 0; i < this.children.length; i++) {
        var name = this.children[i];
        opts.names[name.simple()] = utils.objectPath(opts.names, name.parts());
      }
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
      this.setLoc(arguments[arguments.length-1]);
      this.children = classBody;
    };
    
    ClassDeclaration.inherits(ASTNode);
    
    ClassDeclaration.prototype.getSignature = function () {
      return {
        vavaClassName : this.vavaClassName
      };
    };
    
    ClassDeclaration.prototype.compileNode = function (opts) {
      var self = this;
    
      // Add class name to compilation unit scope
      opts.names.__addName(this.vavaClassName, this);
      var classOpts = opts.descendScope();
    
      var fields = this.children.filter(function (child) {
        return child.getType() === 'FieldDeclaration';
      });
      // Need to add this information now as execution is vertically linear only in
      // methods, but not in classes. i.e. a method appearing earlier in the source
      // might call a method declared later. If we added types while regularly
      // compiling down the tree, an earlier method might not have information
      // about return types of methods declared later.
      var methods = this.children.filter(function (child) {
        if (child.getType() === 'MethodDeclaration') {
          var methSig = child.signature();
          if (opts.names[methSig]) {
            opts.addError(child.nonFatalError(methSig + ' is already defined in ' + self.vavaClassName));
          }
          opts.names.__addName(methSig, child.getVavaType());
          return true;
        }
        else return false;
      });
      var serializedBody = builder.joinToObject(
        // Field Declarations
        builder.keyValue(
          'fields',
          builder.array(
            fields.map(function (field) { return field.compile(classOpts) })
          )
        ),
        // Method Declarations
        builder.keyValue(
          'methods',
          builder.array(
            methods.map(function (method) { return method.compile(classOpts) })
          )
        )
      );
      
      return builder.addPairToScope(
        this.vavaClassName,
        builder.constructorCall('this.__env.VavaClass', [builder.string(this.vavaClassName), serializedBody, 'this'], false)
      ) + '\nreturn ' + 'this["' + this.vavaClassName + '"];';
    };
    
    /**
     * Creates a node for a FieldDeclaration, containing one or several VariableDeclarators.
     *
     * @param vavaType The Vava type of the declared fields
     * @param variableDeclarators Array of VariableDeclaration objects
     * @param Hash containing modifier information
     */
    var FieldDeclaration = exports.FieldDeclaration = function (vavaType, variableDeclarators, modifiers) {
      if (typeof vavaType !== 'string') {
        throw new TypeError('Expected Vava type to be string.');
      }
      if (!variableDeclarators || variableDeclarators.getType() !== "VariableDeclarators" || variableDeclarators.length() < 1) {
        throw new TypeError('Expected one or more variable declarators.');
      }
      this.type  = 'FieldDeclaration';
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      this.vavaType = vavaType;
      this.parseModifiers(modifiers || {});
      this.appendChild(variableDeclarators);
    };
    
    FieldDeclaration.inherits(ASTNode);
    
    FieldDeclaration.prototype.parseModifiers = function (modifiers) {
      this.visibility = modifiers.visibility || 'default';
      this.staticness = !!modifiers.staticness;
      this.valuedness = modifiers.valuedness;
    };
    
    FieldDeclaration.prototype.compileNode = function (opts) {
      return builder.joinToObject(
        builder.keyValue('isStatic', String(this.staticness)),
        builder.keyValue('visibility', builder.string(this.visibility)),
        builder.keyValue('variables',
          builder.joinToObject(
            function (obj) {
              var declarations = [];
              for (declName in obj) {
                declarations.push(builder.keyValue(declName, obj[declName]));
              }
              return declarations;
            }(this.children[0].compileForField(opts.mergeOpts({vavaType: this.vavaType, valuedness: this.valuedness})))
          )
        )
      );
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
     * @param modifiers Optional modifiers, s.a. `final` as object
     */
    var LocalVariableDeclaration = exports.LocalVariableDeclaration = function (vavaType, variableDeclarators, modifiers) {
      if (typeof vavaType !== 'string') {
        throw new TypeError('Expected Vava type to be string.');
      }
      if (!variableDeclarators || variableDeclarators.getType() !== "VariableDeclarators" || variableDeclarators.length() < 1) {
        throw new TypeError('Expected one or more variable declarators.');
      }
      this.type  = 'LocalVariableDeclaration';
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      this.vavaType = vavaType;
      // For `final`
      this.valuedness = modifiers && modifiers.valuedness;
      this.appendChild(variableDeclarators);
    };
    
    LocalVariableDeclaration.inherits(ASTNode);
    
    LocalVariableDeclaration.prototype.compileNode = function (opts) {
      return utils.indent('this.__add({' + this.children[0].compile(opts.mergeOpts({vavaType: this.vavaType, valuedness: this.valuedness, local: true})) + '})', opts.indent);
    };
    
    /**
     * Creates node for a LocalVariableDeclarationStatement, adding line separation to a LocalVariableDeclaration.
     *
     * @param locVarDec Local variable declaration node
     */
    var LocalVariableDeclarationStatement = exports.LocalVariableDeclarationStatement = function (locVarDec) {
      this.type  = 'LocalVariableDeclarationStatement';
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      this.appendChild(locVarDec);
    };
    
    LocalVariableDeclarationStatement.inherits(ASTNode);
    
    LocalVariableDeclarationStatement.prototype.compileNode = function (opts) {
      return utils.indent(this.children[0].compile(opts) + ';', opts.indent);
    };
    
    /**
     * Creates a node for VariableDeclarators, a group of comma separated variable
     * declarations.
     *
     * @param variableDeclarator Optional first variable declarator
     */
    var VariableDeclarators = exports.VariableDeclarators = function (variableDeclarator) {
      this.type = 'VariableDeclarators';
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
    
      if (variableDeclarator) this.appendChild(variableDeclarator);
    };
    
    VariableDeclarators.inherits(ASTNode);
    
    VariableDeclarators.prototype.compileNode = function (opts) {
      return [this.children.map(function (child) { return child.compile(opts) })].join(',');
    };
    
    VariableDeclarators.prototype.compileForField = function (opts) {
      return utils.merge(this.children.map(function (child) { return child.compileForField(opts) }));
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
      this.type = 'VariableDeclarator';
      this.setLoc(arguments[arguments.length-1]);
      // set vavaExpression to undefined, if it is loc hash
      if (vavaExpression && vavaExpression.first_line) {
        vavaExpression = undefined;
      }
      this.children = [];
      this.vavaIdentifier = vavaIdentifier;
      this.vavaInitializer = vavaExpression;
    };
    
    VariableDeclarator.inherits(ASTNode);
    
    VariableDeclarator.prototype.compile = function (opts) {
      var result = this.storedOrNewCompilation(opts);
      return result;
    };
    
    VariableDeclarator.prototype.compileNode = function (opts) {
      var result = builder.keyValue(
        this.vavaIdentifier,
        builder.constructorCall(
          'this.__env.TypedVariable',
          [builder.string(opts.vavaType), builder.string(this.vavaIdentifier), this.vavaInitializer && this.vavaInitializer.compile(opts)].filter(
            function (value) { return !!value; }
          ),
          false
        )
      );
      // TODO error on wrong type
      this.vavaType = opts.vavaType;
      this.compileTimeCheck(opts);
      opts.names.__addName(this.vavaIdentifier, this.vavaType);
      opts.setModifier('final', this.vavaIdentifier, opts.valuedness === 'final');
      opts.setModifier('local', this.vavaIdentifier, true);
      opts.setModifier('initialized', this.vavaIdentifier, !!this.vavaInitializer);
      return result;
    };
    
    VariableDeclarator.prototype.compileForField = function (opts) {
      var obj = {};
      obj[this.vavaIdentifier] = builder.constructorCall(
        'this.__env.TypedVariable',
        [builder.string(opts.vavaType), builder.string(this.vavaIdentifier), this.vavaInitializer && this.vavaInitializer.compile(opts)].filter(
          function (value) { return !!value; }
        ),
        false
      );
      this.vavaType = opts.vavaType;
      this.compileTimeCheck(opts);
      opts.names.__addName(this.vavaIdentifier, this.vavaType);
      opts.setModifier('final', this.vavaIdentifier, opts.valuedness === 'final');
      return obj;
    };
    
    VariableDeclarator.prototype.compileTimeCheck = function (opts) {
      // TODO Type mismatch
      if (opts.names.hasOwnProperty(this.vavaIdentifier))
        opts.addError(
          this.nonFatalError(this.vavaIdentifier + ' is already defined')
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
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      this.appendChild(name);
      this.appendChild(value);
    };
    
    Assignment.inherits(ASTNode);
    
    Assignment.prototype.compileNode = function (opts) {
      var result = utils.indent(this.children[0].compile(opts.mergeOpts({noGet: true})) + '.set(' + this.children[1].compile(opts) + ')', opts.indent);
      this.vavaType = this.children[1].getVavaType();
      // TODO qualified names
      opts.names.__addName(this.children[0].simple(), this.vavaType);
      opts.setModifier('initialized', this.children[0].qualified(), true);
      return result;
    };
    
    Assignment.prototype.compileTimeCheck = function (opts) {
      // TODO Type mismatch
      if (opts.hasModifier('final', this.children[0].simple())) {
        opts.addError(
          this.nonFatalError('cannot assign a value to final variable ' + this.children[0].simple())
        );
      }
    };
    
    /**
     * Creates a node for a MethodDeclaration.
     *
     * @param vavaHeader An object containing header information
     * @param vavaBlock A block of Vava expressions
     */
    var MethodDeclaration = exports.MethodDeclaration = function (vavaHeader, vavaBlock) {
      this.type = 'MethodDeclaration';
      this.setLoc(arguments[arguments.length-1]);
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
    };
    
    MethodDeclaration.inherits(ASTNode);
    
    MethodDeclaration.prototype.signature = function () {
      return [
        this.vavaIdentifier, '(',
        this.vavaFormalParameters.map(function (fP) {
          return fP.vavaType;
        }).join(','), ')'
      ].join('');
    };
    
    MethodDeclaration.prototype.compileNode = function (opts) {
      var methodOpts = opts.descendScope({returnType: this.vavaType});
      return builder.constructorCall(
        'this.__env.VavaMethod',
        [
          builder.string(this.vavaIdentifier),
          builder.string(this.vavaType),
          builder.array(this.vavaFormalParameters.map(function (fP) { return fP.compile(methodOpts); })),
          builder.wrapAsFunction(this.children[0].compile(methodOpts))
        ],
        false
      );
    };
    
    MethodDeclaration.prototype.getSignature = function () {
      return {
        vavaType: this.vavaType,
        vavaIdentifier: this.vavaIdentifier
      };
    };
    
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
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      this.vavaType = vavaType;
      this.vavaIdentifier = vavaIdentifier;
    };
    
    FormalParameter.inherits(ASTNode);
    
    FormalParameter.prototype.compileNode = function (opts) {
      opts.names.__addName(this.vavaIdentifier, this.vavaType);
      return builder.joinToObject(builder.keyValue('identifier', builder.string(this.vavaIdentifier)), builder.keyValue('vavaType', builder.string(this.vavaType)));
    };
    
    FormalParameter.prototype.getSignature = function () {
      return {
        vavaType: this.vavaType,
        vavaIdentifier: this.vavaIdentifier
      };
    };
    
    /**
     * Creates a node for a return statement. 
     *
     * @param expression Optional expression giving return value
     */
    var ReturnStatement = exports.ReturnStatement = function (expression) {
      this.type = 'ReturnStatement';
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      if (expression && expression.compile) this.appendChild(expression);
    };
    
    ReturnStatement.inherits(ASTNode);
    
    ReturnStatement.prototype.compileNode = function (opts) {
      return utils.indent('return' + (this.children[0] ? ' ' + this.children[0].compile(opts) + ';' : ';'), opts.indent);
    };
    
    ReturnStatement.prototype.compileTimeCheck = function (opts) {
      this.vavaType = opts.returnType;
      if (opts.returnType === 'void' && this.children.length !== 0) {
        opts.addError(
          this.nonFatalError('cannot return a value from method whose result type is void', null, this.children[0].loc)
        );
        // TODO Too coarse
      } else if (this.children[0] && !this.isAssignmentCompatible(this.children[0])) {
        opts.addError(
          this.nonFatalError('incompatible types', this.typeMismatchDescription(this.children[0].getVavaType(), this.vavaType), this.children[0].loc)
        );
      }
    };
    
    /**
     * Creates a node for a method invocation.
     *
     * @param name The name of the method
     * @param argumentList List of arguments
     */
    var MethodInvocation = exports.MethodInvocation = function (name, argumentList) {
      this.type = 'MethodInvocation';
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      this.name = name;
      this.appendChild(argumentList);
    };
    
    MethodInvocation.inherits(ASTNode);
    
    MethodInvocation.autoCast = {
      'byte': ['short', 'char', 'int', 'long', 'float', 'double'],
      'short': ['char', 'int', 'long', 'float', 'double'],
      'char': ['short', 'int', 'long', 'float', 'double'],
      'int': ['long', 'float', 'double'],
      'long': ['float', 'double'],
      'float': ['double']
    };
    
    MethodInvocation.prototype.compileNode = function (opts) {
      var argumentList = this.children[0].compile(opts);
      var vavaTypes = this.children[0].getVavaTypes();
      // Before we go on, let's see whether there might have been errors earlier in compiling
      for (var i = 0; i < vavaTypes.length; i++) {
        if (typeof vavaTypes[i] === 'undefined') return;
      }
      // OK, looks legit
      var methodSig = this.name.simple() + '(' + vavaTypes.join(',') + ')';
      // method call with simple name
      if (this.name.isSimple()) {
        this.vavaType = opts.names[methodSig];
        // look for compatible types if no exact match found
        if (!this.vavaType) {
          for (var i = 0; !this.vavaType && i < vavaTypes.length; i++) {
            for (var j = 0; !this.vavaType && MethodInvocation.autoCast[vavaTypes[i]] && j < MethodInvocation.autoCast[vavaTypes[i]]; j++) {
              methodSig = this.name.simple() + '(' + vavaTypes.splice(0, i).concat(MethodInvocation.autoCast[vavaTypes[i]][j], vavaTypes.splice(i+1, 0)).join(',') + ')';
              this.vavaType = opts.names[methodSig];
            }
          }
        }
        // finally found no matching method
        if (!this.vavaType)
          this.fatalError('non-existent method on ' + this.name.qualified(), this.children[0].loc);
        return utils.indent('this.__self.send("' + methodSig + '", ' + argumentList + ')', opts.indent);
      // method call on qualified name
      } else {
        var resolvedName = utils.objectPath(opts.names, this.name.prefixParts());
        if (resolvedName && (this.vavaType = resolvedName.hasMethod(methodSig))) {
          // found method, will return later
        // otherwise look for compatible types
        } else if (resolvedName) {
          for (var i = 0; !this.vavaType && i < vavaTypes.length; i++) {
            for (var j = 0; !this.vavaType && MethodInvocation.autoCast[vavaTypes[i]] && j < MethodInvocation.autoCast[vavaTypes[i]].length; j++) {
              methodSig = this.name.simple() + '(' + vavaTypes.splice(0, i).concat(MethodInvocation.autoCast[vavaTypes[i]][j], vavaTypes.splice(i+1, 0)).join(',') + ')';
              this.vavaType = resolvedName.hasMethod(methodSig);
            }
          }
        // I am really sorry :'(
        } else if (opts.names[this.name.prefix()] === 'String') {
          if (this.name.simple() === 'length') this.vavaType = 'int';
        }
      }
    
      if (this.vavaType) {
        return utils.indent('this.' + this.name.prefix() + '.send("' + methodSig + '", ' + argumentList + ')', opts.indent);
      }
    
      this.fatalError('non-existent method on ' + this.name.qualified(), this.typeMismatchDescription(this.children[0].getVavaType(), this.vavaType), this.children[0].loc);
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
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      
      if (firstArg && firstArg.compile) this.appendChild(firstArg);
    };
    
    ArgumentList.inherits(ASTNode);
    
    ArgumentList.prototype.compileNode = function (opts) {
      return '[' + this.children.map(function (child) { return child.compile(opts) }).join(', ') + ']';
    };
    
    ArgumentList.prototype.compileTimeCheck = function (opts) {
      this.vavaTypes = [];
      for (var i = 0; i < this.children.length; i++) {
        this.vavaTypes[i] = this.children[i].getVavaType();
      }
    };
    
    ArgumentList.prototype.getVavaTypes = function () {
      return this.vavaTypes || [];
    };
    
    /**
     * Creates a node for a Block.
     * 
     * @param vavaStatements A list of statements
     */
    var Block = exports.Block = function (vavaStatements) {
      this.type = 'Block';
      this.setLoc(arguments[arguments.length-1]);
      // Set statements to undefined if only loc hash has been given
      if (typeof vavaStatements === 'object' && !utils.isArray(vavaStatements)) {
        vavaStatements = undefined;
      }
      this.children = [];
      if (typeof vavaStatements !== 'undefined' && !utils.isArray(vavaStatements)) {
        throw new TypeError('Expected Vava statements to be undefined or array.');
      }
      vavaStatements = vavaStatements || [];
      for (var i = 0; i < vavaStatements.length; i++) {
        this.appendChild(vavaStatements[i]);
      }
    };
    
    Block.inherits(ASTNode);
    
    Block.prototype.compileNode = function (opts) {
      var js = this.children.map(function (child) {
        return child.compile(opts.mergeOpts({indent: (opts.indent || 0) + 2}));
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
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      this.appendChild(expression);
    };
    
    ExpressionStatement.inherits(ASTNode);
    
    ExpressionStatement.prototype.compileNode = function (opts) {
      return this.children[0].compile(opts) + ';';
    };
    
    /**
     * Creates a node for a break statement.
     *
     */
    var BreakStatement = exports.BreakStatement = function () {
      this.type = 'BreakStatement';
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
    };
    
    BreakStatement.inherits(ASTNode);
    
    BreakStatement.prototype.compileNode = function (opts) {
      return 'break;';
    };
    
    /**
     * Creates a node for a name, i.e. a named reference.
     *
     * @param name The name in question
     */
    var Name = exports.Name = function (name) {
      this.type = 'Name';
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      if (!name || !(/[a-zA-Z][a-zA-Z0-9_]*/.test(name))) {
        throw new TypeError('Expected name to be an identifier.');
      }
      this.name = name;
    };
    
    Name.inherits(ASTNode);
    
    /**
     * Returns true if name is simple.
     */
    Name.prototype.isSimple = function () {
      return this.simple() === this.name;
    };
    
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
     * Return an array of the name's parts.
     */
    Name.prototype.parts = function () {
      return this.name.split('.');
    };
    
    /**
     * Return an array of the name's prefix's parts.
     */
    Name.prototype.prefixParts = function () {
      return this.parts().slice(0, -1);
    };
    
    /**
     * Simply resolve the name.
     *
     * @param opts
     *   [noGet] If truthy, don't call #get
     */
    Name.prototype.compileNode = function (opts) {
      var result = 'this.' + this.name + (opts.noGet ? '' : '.get()');
      // TODO Too simplified
      this.vavaType = opts.names[this.simple()];
      return result;
    };
    
    Name.prototype.compileTimeCheck = function (opts) {
      if (!opts.noGet && opts.hasModifier('local', this.simple()) && !opts.hasModifier('initialized', this.simple())) {
        opts.addError(
          this.nonFatalError('variable ' + this.simple() + ' might not have been initialized')
        );
      }
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
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      this.vavaType = 'boolean';
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
    };
    
    BooleanLiteral.prototype.compileNode = function (opts) {
      return 'this.__env.BooleanValue.intern(' + this.value + ')';
    };
    
    /**
     * Creates a node for an Integer literal.
     *
     * @param num The number
     */
    var IntegerLiteral = exports.IntegerLiteral = function (num) {
      this.type = 'IntegerLiteral';
      this.setLoc(arguments[arguments.length-1]);
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
    
    IntegerLiteral.prototype.compileNode = function (opts) {
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
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      this.vavaType = 'char';
      this.character = character.substr(1,1);
    };
    
    CharLiteral.inherits(ASTNode);
    
    CharLiteral.prototype.getSignature = function () {
      return {character : this.character};
    };
    
    CharLiteral.prototype.compileNode = function (opts) {
      return builder.functionCall('this.__env.CharValue.intern', [builder.string(this.character)], false);
    };
    
    /**
     * Creates a node for a FloatingPoint literal.
     *
     * @param numString The string describing the number
     */
    var FloatingPointLiteral = exports.FloatingPointLiteral = function (numString) {
      this.type = 'FloatingPointLiteral';
      this.setLoc(arguments[arguments.length-1]);
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
    
    FloatingPointLiteral.prototype.compileNode = function (opts) {
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
      this.vavaType = 'null';
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
    };
    
    NullLiteral.inherits(ASTNode);
    
    NullLiteral.prototype.compileNode = function (opts) {
      return 'this.__env.NullValue.intern()';
    };
    
    
    /**
     * Creates a node for a String literal.
     *
     * @param str The string
     */
    var StringLiteral = exports.StringLiteral = function (str) {
      this.type = 'StringLiteral';
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      this.vavaType = 'String';
      this.value = str;
    };
    
    StringLiteral.inherits(ASTNode);
    
    StringLiteral.prototype.getSignature = function () {
      return {value : this.value};
    };
    
    // TODO Interned strings
    StringLiteral.prototype.compileNode = function (opts) {
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
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      this.operator = '-';
    
      this.appendChild(unaryExpression);
    };
    
    UnaryMinus.inherits(ASTNode);
    
    UnaryMinus.prototype.getSignature = function () {
      return {};
    };
    
    UnaryMinus.prototype.compileNode = function (opts) {
      var result = builder.functionCall(this.children[0].compile(opts) + '.inverse', [], false);
      this.vavaType = this.children[0].getVavaType();
      return result;
    };
    
    UnaryMinus.prototype.compileTimeCheck = function (opts) {
      if (!this.isNumber())
        opts.addError(
          this.nonFatalError('operator ' + this.operator + ' cannot be applied to ' + this.children[0].getVavaType())
        );
    };
    
    /**
     * Creates a node for a unary plus expression.
     *
     * @param unaryExpression The operand
     */
    var UnaryPlus = exports.UnaryPlus = function (unaryExpression) {
      this.type = 'UnaryPlus';
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      this.operator = '+';
      this.appendChild(unaryExpression);
    };
    
    UnaryPlus.inherits(ASTNode);
    
    UnaryPlus.prototype.getSignature = function () {
      return {};
    };
    
    UnaryPlus.prototype.compileNode = function (opts) {
      var result = this.children[0].compile(opts);
      this.vavaType = this.children[0].getVavaType();
      return result;
    };
    
    UnaryPlus.prototype.compileTimeCheck = UnaryMinus.prototype.compileTimeCheck;
    
    /**
     * Creates a node for post incrementing.
     *
     * @param variable The variable to increment
     */
    var PostIncrement = exports.PostIncrement = function (variable) {
      this.type = 'PostIncrement';
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      this.operator = '++';
      this.appendChild(variable);
    };
    
    PostIncrement.inherits(ASTNode);
    
    PostIncrement.prototype.compileNode = function (opts) {
      var result = builder.functionCall(
        this.children[0].compile(opts.mergeOpts({noGet: true})) + '.postInc', [], false
      );
      this.vavaType = this.children[0].getVavaType();
      return result;
    };
    
    PostIncrement.prototype.compileTimeCheck = UnaryMinus.prototype.compileTimeCheck;
    
    /**
     * Creates a node for post decrementing.
     *
     * @param variable The variable to decrement
     */
    var PostDecrement = exports.PostDecrement = function (variable) {
      this.type = 'PostDecrement';
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      this.operator = '--';
      this.appendChild(variable);
    };
    
    PostDecrement.inherits(ASTNode);
    
    PostDecrement.prototype.compileNode = function (opts) {
      var result = builder.functionCall(
        this.children[0].compile(opts.mergeOpts({noGet: true})) + '.postDec', [], false
      );
      this.vavaType = this.children[0].getVavaType();
      return result;
    };
    
    PostDecrement.prototype.compileTimeCheck = UnaryMinus.prototype.compileTimeCheck;
    
    /**
     * Creates a node for pre incrementing.
     *
     * @param variable The variable to increment
     */
    var PreIncrement = exports.PreIncrement = function (variable) {
      this.type = 'PreIncrement';
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      this.operator = '++';
      this.appendChild(variable);
    };
    
    PreIncrement.inherits(ASTNode);
    
    PreIncrement.prototype.compileNode = function (opts) {
      var result = builder.functionCall(
        this.children[0].compile(opts.mergeOpts({noGet: true})) + '.preInc', [], false
      );
      this.vavaType = this.children[0].getVavaType();
      return result;
    };
    
    PreIncrement.prototype.compileTimeCheck = UnaryMinus.prototype.compileTimeCheck;
    
    /**
     * Creates a node for pre decrementing.
     *
     * @param variable The variable to decrement
     */
    var PreDecrement = exports.PreDecrement = function (variable) {
      this.type = 'PreDecrement';
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      this.operator = '--';
      this.appendChild(variable);
    };
    
    PreDecrement.inherits(ASTNode);
    
    PreDecrement.prototype.compileNode = function (opts) {
      var result = builder.functionCall(
        this.children[0].compile(opts.mergeOpts({noGet: true})) + '.preDec', [], false
      );
      this.vavaType = this.children[0].getVavaType();
      return result;
    };
    
    PreDecrement.prototype.compileTimeCheck = UnaryMinus.prototype.compileTimeCheck;
    
    /**
     * Creates a node for a cast expression.
     *
     * @param vavaType The type to cast to
     * @param unaryExpression The expression whose value to cast
     */
    var CastExpression = exports.CastExpression = function (vavaType, unaryExpression) {
      this.type = 'CastExpression';
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      this.vavaType = vavaType;
      this.appendChild(unaryExpression);
    };
    
    CastExpression.inherits(ASTNode);
    
    CastExpression.prototype.compileNode = function (opts) {
      return builder.functionCall('(' + this.children[0].compile(opts) + ').to', [builder.string(this.vavaType)], false);
    };
    
    CastExpression.prototype.compileTimeCheck = function () {
      if (this.isVavaType('boolean') ^ this.children[0].isVavaType('boolean'))
        this.fatalError('inconvertible types', 'found   : ' + this.children[0].getVavaType() + '\nrequired: ' + this.getVavaType());
    }
    
    // Binary
    
    var NumberTypes = {'byte': true, 'short': true, 'char': true, 'int': true, 'long': true, 'float': true, 'double': true};
    
    var BinaryOperatorNode = function () {};
    
    BinaryOperatorNode.inherits(ASTNode);
    
    BinaryOperatorNode.table = {
      'boolean' : {'boolean':'boolean'},
      'byte' : {'byte' : 'int','short' : 'int','char' : 'int','int' : 'int','long' : 'long','float' : 'float','double' : 'double','String' : 'String'},
      'short' : {'byte' : 'int','short' : 'int','char' : 'int','int' : 'int','long' : 'long','float' : 'float','double' : 'double','String' : 'String'},
      'char' : {'byte' : 'int','short' : 'int','char' : 'int','int' : 'int','long' : 'long','float' : 'float','double' : 'double','String' : 'String'},
      'int' : {'byte' : 'int','short' : 'int','char' : 'int','int' : 'int','long' : 'long','float' : 'float','double' : 'double','String' : 'String'},
      'long' : {'byte':'long', 'short':'long', 'char':'long', 'int':'long', 'long':'long', 'float':'float', 'double':'double', 'String':'String'},
      'float' : {'byte':'float', 'short':'float', 'char':'float', 'int':'float', 'long':'float', 'float':'float', 'double':'double', 'String':'String'},
      'double' : {'byte':'double', 'short':'double', 'char':'double', 'int':'double', 'long':'double', 'float':'double', 'double':'double', 'String':'String'},
      'String' : {'byte':'String', 'short':'String', 'char':'String', 'int':'String', 'long':'String', 'float':'String', 'double':'String', 'String':'String'}
    };
    
    BinaryOperatorNode.prototype.compileTimeCheck = function (opts) {
      if (!this.isApplicable())
        opts.addError(
          this.nonFatalError('operator ' + this.operator + ' cannot be applied to ' + this.children[0].getVavaType() + ',' + this.children[1].getVavaType())
        );
      else
        this.vavaType = this.constructor.table[this.children[0].getVavaType()][this.children[1].getVavaType()];
    };
    
    BinaryOperatorNode.prototype.isApplicable = function () {
      return (!!this.constructor.table[this.children[0].getVavaType()] &&
        !!this.constructor.table[this.children[0].getVavaType()][this.children[1].getVavaType()] &&
        !this.children[0].isVavaType('String') && !this.children[1].isVavaType('String')
      );
    };
    
    var BinaryNumberOperatorNode = function () {};
    
    BinaryNumberOperatorNode.inherits(BinaryOperatorNode);
    
    BinaryNumberOperatorNode.prototype.isApplicable = function () {
      return (!!this.constructor.table[this.children[0].getVavaType()] &&
        !!this.constructor.table[this.children[0].getVavaType()][this.children[1].getVavaType()] &&
        !this.children[0].isVavaType('String') && !this.children[1].isVavaType('String') &&
        this.children[0].isNumber()
      );
    };
    
    /**
     * Creates a node for an addition operation.
     *
     * @param numA The number to send the addition message to
     * @param numB The number to add
     */
    var Addition = exports.Addition = function (numA, numB) {
      this.type = 'Addition';
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      this.operator = '+';
      // TODO Compile-time type checking
      if (!(numA) || !(numB)) {
        throw new TypeError('Expected two integer numbers for addition.');
      }
      this.appendChild(numA);
      this.appendChild(numB);
    };
    
    Addition.inherits(BinaryOperatorNode);
    
    Addition.table = {
      'boolean' : {'String':'String'},
      'byte' : {'byte' : 'int','short' : 'int','char' : 'int','int' : 'int','long' : 'long','float' : 'float','double' : 'double','String' : 'String'},
      'short' : {'byte' : 'int','short' : 'int','char' : 'int','int' : 'int','long' : 'long','float' : 'float','double' : 'double','String' : 'String'},
      'char' : {'byte' : 'int','short' : 'int','char' : 'int','int' : 'int','long' : 'long','float' : 'float','double' : 'double','String' : 'String'},
      'int' : {'byte' : 'int','short' : 'int','char' : 'int','int' : 'int','long' : 'long','float' : 'float','double' : 'double','String' : 'String'},
      'long' : {'byte':'long', 'short':'long', 'char':'long', 'int':'long', 'long':'long', 'float':'float', 'double':'double', 'String':'String'},
      'float' : {'byte':'float', 'short':'float', 'char':'float', 'int':'float', 'long':'float', 'float':'float', 'double':'double', 'String':'String'},
      'double' : {'byte':'double', 'short':'double', 'char':'double', 'int':'double', 'long':'double', 'float':'double', 'double':'double', 'String':'String'},
      'String' : {'boolean':'String', 'byte':'String', 'short':'String', 'char':'String', 'int':'String', 'long':'String', 'float':'String', 'double':'String', 'String':'String'}
    };
    
    Addition.prototype.compileNode = function (opts) {
      return utils.indent(this.children[0].compile(opts) + '.add(' + this.children[1].compile(opts) + ')', opts.indent);
    };
    
    Addition.prototype.isApplicable = function () {
      return (!!Addition.table[this.children[0].getVavaType()] &&
        !!Addition.table[this.children[0].getVavaType()][this.children[1].getVavaType()]
      );
    };
    
    /**
     * Creates a node for an subtraction operation.
     *
     * @param numA The number to send the subtraction message to
     * @param numB The number to subtract
     */
    var Subtraction = exports.Subtraction = function (numA, numB) {
      this.type = 'Subtraction';
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      this.operator = '-';
      // TODO Compile-time type checking
      if (!(numA) || !(numB)) {
        throw new TypeError('Expected two integer numbers for subtraction.');
      }
      this.appendChild(numA);
      this.appendChild(numB);
    };
    
    Subtraction.inherits(BinaryNumberOperatorNode);
    
    Subtraction.prototype.compileNode = function (opts) {
      return utils.indent(this.children[0].compile(opts) + '.subtract(' + this.children[1].compile(opts) + ')', opts.indent);
    };
    
    /**
     * Creates a node for a multiplication operation.
     *
     * @param numA The number to send the multiplication message to
     * @param numB The number to multiply with
     */
    var Multiplication = exports.Multiplication = function (numA, numB) {
      this.type = 'Multiplication';
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      this.operator = '*';
      // TODO Compile-time type checking
      if (!(numA) || !(numB)) {
        throw new TypeError('Expected two integer numbers for multiplication.');
      }
      this.appendChild(numA);
      this.appendChild(numB);
    };
    
    Multiplication.inherits(BinaryNumberOperatorNode);
    
    Multiplication.prototype.compileNode = function (opts) {
      return utils.indent(this.children[0].compile(opts) + '.times(' + this.children[1].compile(opts) + ')', opts.indent);
    };
    
    /**
     * Creates a node for a division operation.
     *
     * @param numA The number to send the division message to
     * @param numB The number to divide by
     */
    var Division = exports.Division = function (numA, numB) {
      this.type = 'Division';
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      this.operator = '/';
      // TODO Compile-time type checking
      if (!(numA) || !(numB)) {
        throw new TypeError('Expected two integer numbers for division.');
      }
      this.appendChild(numA);
      this.appendChild(numB);
    };
    
    Division.inherits(BinaryNumberOperatorNode);
    
    Division.prototype.compileNode = function (opts) {
      // TODO division by zero
      return utils.indent(this.children[0].compile(opts) + '.divide(' + this.children[1].compile(opts) + ')', opts.indent);
    };
    
    /**
     * Creates a node for a modulo operation.
     *
     * @param numA The number to send the modulo message to
     * @param numB The number to modulate by
     */
    var Modulo = exports.Modulo = function (numA, numB) {
      this.type = 'Modulo';
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      this.operator = '%';
      // TODO Compile-time type checking
      if (!(numA) || !(numB)) {
        throw new TypeError('Expected two integer numbers for modulo.');
      }
      this.appendChild(numA);
      this.appendChild(numB);
    };
    
    Modulo.inherits(BinaryNumberOperatorNode);
    
    Modulo.prototype.compileNode = function (opts) {
      return utils.indent(this.children[0].compile(opts) + '.modulo(' + this.children[1].compile(opts) + ')', opts.indent);
    };
    
    /**
     * Creates a node for less than comparison.
     *
     * @param a First value to be compared
     * @param b Second value to be compared
     */
    var LessThan = exports.LessThan = function (a, b) {
      this.type = 'LessThan';
      this.setLoc(arguments[arguments.length-1]);
      this.vavaType = 'boolean';
      this.children = [];
      this.operator = '<';
      if (!a || !b) {
        throw new TypeError('Expected two values to compare (lt).');
      }
      this.appendChild(a);
      this.appendChild(b);
    };
    
    LessThan.inherits(ASTNode);
    
    LessThan.prototype.compileNode = function (opts) {
      return utils.indent(
        builder.functionCall(
          'this.__env.BooleanValue.intern',
          [builder.functionCall('(' + this.children[0].compile(opts) + ').isLessThan', [this.children[1].compile(opts)], false)],
          false
        ),
        opts.indent
      );
    };
    
    LessThan.prototype.compileTimeCheck = function (opts) {
      if (!(this.children[0].isNumber() && this.children[1].isNumber()))
        opts.addError(
          this.nonFatalError('operator ' + this.operator + ' cannot be applied to ' + this.children[0].getVavaType() + ',' + this.children[1].getVavaType())
        );
    };
    
    /**
     * Creates a node for less than/equal comparison.
     *
     * @param a First value to be compared
     * @param b Second value to be compared
     */
    var LessThanEqual = exports.LessThanEqual = function (a, b) {
      this.type = 'LessThanEqual';
      this.setLoc(arguments[arguments.length-1]);
      this.vavaType = 'boolean';
      this.children = [];
      this.operator = '<=';
      if (!a || !b) {
        throw new TypeError('Expected two values to compare (lte).');
      }
      this.appendChild(a);
      this.appendChild(b);
    };
    
    LessThanEqual.inherits(ASTNode);
    
    LessThanEqual.prototype.compileNode = function (opts) {
      return utils.indent(
        builder.functionCall(
          'this.__env.BooleanValue.intern',
          [builder.functionCall('(' + this.children[0].compile(opts) + ').isLessThan', [this.children[1].compile(opts)], false) + ' || ' + this.children[0].compile(opts) + ' === ' + this.children[1].compile(opts)],
          false
        ),
        opts.indent
      );
    };
    
    LessThanEqual.prototype.compileTimeCheck = LessThan.prototype.compileTimeCheck;
    
    /**
     * Creates a node for an equality comparison.
     *
     * @param a First value to be compared
     * @param b Second value to be compared
     */
    var Equals = exports.Equals = function (a, b) {
      this.type = 'Equals';
      this.setLoc(arguments[arguments.length-1]);
      this.vavaType = 'boolean';
      this.children = [];
      if (!a || !b) {
        throw new TypeError('Expected two values to compare for equality.');
      }
      this.appendChild(a);
      this.appendChild(b);
    };
    
    Equals.inherits(ASTNode);
    
    Equals.prototype.compileNode = function (opts) {
      return utils.indent('this.__env.BooleanValue.intern(' + this.children[0].compile(opts) + ' === ' + this.children[1].compile(opts) + ')', opts.indent);
    };
    
    /**
     * Creates a node for a greater than comparison.
     *
     * @param a First value to be compared
     * @param b Second value to be compared
     */
    var GreaterThan = exports.GreaterThan = function (a, b) {
      this.type = 'GreaterThan';
      this.setLoc(arguments[arguments.length-1]);
      this.vavaType = 'boolean';
      this.children = [];
      this.operator = '>';
      if (!a || !b) {
        throw new TypeError('Expected two values to compare (gt).');
      }
      this.appendChild(a);
      this.appendChild(b);
    };
    
    GreaterThan.inherits(ASTNode);
    
    GreaterThan.prototype.compileNode = function (opts) {
      return utils.indent(
        builder.functionCall(
          'this.__env.BooleanValue.intern',
          [builder.functionCall('(' + this.children[0].compile(opts) + ').isGreaterThan', [this.children[1].compile(opts)], false)],
          false
        ),
        opts.indent
      );
    };
    
    GreaterThan.prototype.compileTimeCheck = LessThan.prototype.compileTimeCheck;
    
    /**
     * Creates a node for greater than/equal comparison.
     *
     * @param a First value to be compared
     * @param b Second value to be compared
     */
    var GreaterThanEqual = exports.GreaterThanEqual = function (a, b) {
      this.type = 'GreaterThanEqual';
      this.setLoc(arguments[arguments.length-1]);
      this.vavaType = 'boolean';
      this.children = [];
      this.operator = '>=';
      if (!a || !b) {
        throw new TypeError('Expected two values to compare (gte).');
      }
      this.appendChild(a);
      this.appendChild(b);
    };
    
    GreaterThanEqual.inherits(ASTNode);
    
    GreaterThanEqual.prototype.compileNode = function (opts) {
      return utils.indent(
        builder.functionCall(
          'this.__env.BooleanValue.intern',
          [builder.functionCall('(' + this.children[0].compile(opts) + ').isGreaterThan', [this.children[1].compile(opts)], false) + ' || ' + this.children[0].compile(opts) + ' === ' + this.children[1].compile(opts)],
          false
        ),
        opts.indent
      );
    };
    
    GreaterThanEqual.prototype.compileTimeCheck = LessThan.prototype.compileTimeCheck;
    
    /**
     * Creates a node for an inequality comparison.
     *
     * @param a First value to be compared
     * @param b Second value to be compared
     */
    var NotEquals = exports.NotEquals = function (a, b) {
      this.type = 'NotEquals';
      this.setLoc(arguments[arguments.length-1]);
      this.vavaType = 'boolean';
      this.children = [];
      if (!a || !b) {
        throw new TypeError('Expected two values to compare for inequality.');
      }
      this.appendChild(a);
      this.appendChild(b);
    };
    
    NotEquals.inherits(ASTNode);
    
    NotEquals.prototype.compileNode = function (opts) {
      return utils.indent('this.__env.BooleanValue.intern(' + this.children[0].compile(opts) + ' !== ' + this.children[1].compile(opts) + ')', opts.indent);
    };
    
    /**
     * Creates a node for a ternary operator.
     *
     * @param condition expression of boolean type
     * @param optionA   Truthy option
     * @param optionB   Falsy option
     */
    var TernaryOperator = exports.TernaryOperator = function (condition, optionA, optionB) {
      this.type = 'TernaryOperator';
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      this.appendChild(condition);
      this.appendChild(optionA);
      this.appendChild(optionB);
    };
    
    TernaryOperator.inherits(ASTNode);
    
    TernaryOperator.prototype.compileNode = function (opts) {
      return ['((this.__env.BooleanValue.intern(true) === ', this.children[0].compile(opts), ') ? ', this.children[1].compile(opts), ' : ', this.children[2].compile(opts) + ')'].join('');
    };
    
    TernaryOperator.prototype.compileTimeCheck = function (opts) {
      this.vavaType = this.children[1].getVavaType();
      if (!this.children[0].isVavaType('boolean'))
        opts.addError(
          this.nonFatalError('incompatible types', this.typeMismatchDescription(this.children[0].getVavaType(), 'boolean'))
        );
    };
    
    /**
     * Creates a node for a logical AND.
     *
     * @param boolA First truth value
     * @param boolB Second truth value
     */
    var LogicalAnd = exports.LogicalAnd = function (boolA, boolB) {
      this.type = 'LogicalAnd';
      this.setLoc(arguments[arguments.length-1]);
      this.vavaType = 'boolean';
      this.children = [];
      this.operator = '&&';
      this.appendChild(boolA);
      this.appendChild(boolB);
    };
    
    LogicalAnd.inherits(BinaryOperatorNode);
    
    LogicalAnd.prototype.compileNode = function (opts) {
      return builder.functionCall(
        'this.__env.BooleanValue.intern',
        [this.children[0].compile(opts) + '.get() && ' + this.children[1].compile(opts) + '.get()'],
        false
      );
    };
    
    LogicalAnd.prototype.isApplicable = function () {
      return this.children[0].isVavaType('boolean') && this.children[1].isVavaType('boolean');
    };
    
    /**
     * Creates a node for a logical OR.
     *
     * @param boolA First truth value
     * @param boolB Second truth value
     */
    var LogicalOr = exports.LogicalOr = function (boolA, boolB) {
      this.type = 'LogicalOr';
      this.setLoc(arguments[arguments.length-1]);
      this.vavaType = 'boolean';
      this.children = [];
      this.operator = '||';
      this.appendChild(boolA);
      this.appendChild(boolB);
    };
    
    LogicalOr.inherits(BinaryOperatorNode);
    
    LogicalOr.prototype.compileNode = function (opts) {
      return builder.functionCall(
        'this.__env.BooleanValue.intern',
        [this.children[0].compile(opts) + '.get() || ' + this.children[1].compile(opts) + '.get()'],
        false
      );
    };
    
    LogicalOr.prototype.isApplicable = LogicalAnd.prototype.isApplicable;
    
    /**
     * Supertype for bitwise binary operators working on both booleans and integrals
     */
    var BitwiseBinaryOperatorNode = function () {};
    BitwiseBinaryOperatorNode.inherits(BinaryOperatorNode);
    
    BitwiseBinaryOperatorNode.prototype.isApplicable = function () {
      return (!!this.constructor.table[this.children[0].getVavaType()] &&
        !!this.constructor.table[this.children[0].getVavaType()][this.children[1].getVavaType()] &&
        !this.children[0].isVavaType('String') && !this.children[1].isVavaType('String') &&
        !this.children[0].isFloatingPoint() && !this.children[1].isFloatingPoint()
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
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      this.operator = '&';
      this.appendChild(a);
      this.appendChild(b);
    };
    
    InclusiveAnd.inherits(BitwiseBinaryOperatorNode);
    
    InclusiveAnd.prototype.compileNode = function (opts) {
      return builder.functionCall(
        this.children[0].compile(opts) + '.and',
        [this.children[1].compile(opts)],
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
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      this.operator = '|';
      this.appendChild(a);
      this.appendChild(b);
    };
    
    InclusiveOr.inherits(BitwiseBinaryOperatorNode);
    
    InclusiveOr.prototype.compileNode = function (opts) {
      return builder.functionCall(
        this.children[0].compile(opts) + '.or',
        [this.children[1].compile(opts)],
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
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      this.operator = '^';
      this.appendChild(a);
      this.appendChild(b);
    };
    
    ExclusiveOr.inherits(BitwiseBinaryOperatorNode);
    
    ExclusiveOr.prototype.compileNode = function (opts) {
      return builder.functionCall(
        this.children[0].compile(opts) + '.xor',
        [this.children[1].compile(opts)],
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
      this.setLoc(arguments[arguments.length-1]);
      this.vavaType = 'boolean';
      this.children = [];
      this.appendChild(boolA);
    };
    
    Negation.inherits(ASTNode);
    
    Negation.prototype.compileNode = function (opts) {
      return this.children[0].compile(opts) + '.not()';
    };
    
    Negation.prototype.compileTimeCheck = function (opts) {
      if (!this.children[0].isVavaType('boolean'))
        opts.addError(
          this.nonFatalError('operator ! cannot be applied to ' + this.children[0].getVavaType())
        );
    };
    
    /**
     * Creates a node for a bitwise negation.
     *
     * @param num Expression of integral type
     */
    var BitwiseNegation = exports.BitwiseNegation = function (num) {
      this.type = 'BitwiseNegation';
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      this.appendChild(num);
    };
    
    BitwiseNegation.inherits(ASTNode);
    
    BitwiseNegation.prototype.compileNode = function (opts) {
      return this.children[0].compile(opts) + '.bitwiseNot()';
    };
    
    BitwiseNegation.prototype.compileTimeCheck = function (opts) {
      if (!this.children[0].isIntegral())
        opts.addError(
          this.nonFatalError('operator ~ cannot be applied to ' + this.children[0].getVavaType())
        );
      else
        this.vavaType = this.children[0].getVavaType();
    };
    
    var ShiftOperator = function () {};
    ShiftOperator.inherits(BitwiseBinaryOperatorNode);
    
    ShiftOperator.prototype.isApplicable = function () {
      return (!!this.constructor.table[this.children[0].getVavaType()] &&
        !!this.constructor.table[this.children[0].getVavaType()][this.children[1].getVavaType()] &&
        !this.children[0].isVavaType('String') && !this.children[1].isVavaType('String') &&
        this.children[0].isIntegral() && this.children[1].isIntegral()
      );
    };
    
    /**
     * Creates a node for a leftshift operation.
     *
     * @param a First value
     * @param b Second value
     */
    var LeftShift = exports.LeftShift = function (a, b) {
      this.type = 'LeftShift';
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      this.operator = '<<';
      this.appendChild(a);
      this.appendChild(b);
    }
    
    LeftShift.inherits(ShiftOperator);
    
    LeftShift.prototype.compileNode = function (opts) {
      return builder.functionCall(
        this.children[0].compile(opts) + '.leftshift',
        [this.children[1].compile(opts)],
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
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      this.operator = '>>';
      this.appendChild(a);
      this.appendChild(b);
    };
    
    RightShift.inherits(ShiftOperator);
    
    RightShift.prototype.compileNode = function (opts) {
      return builder.functionCall(
        this.children[0].compile(opts) + '.rightshift',
        [this.children[1].compile(opts)],
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
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      this.operator = '>>>';
      this.appendChild(a);
      this.appendChild(b);
    };
    
    ZeroFillRightShift.inherits(ShiftOperator);
    
    ZeroFillRightShift.prototype.compileNode = function (opts) {
      return builder.functionCall(
        this.children[0].compile(opts) + '.zerofillRightshift',
        [this.children[1].compile(opts)],
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
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      if (!ifExpr || !thenExpr) {
        throw new TypeError('Expected condition and conditional.');
      }
      this.appendChild(ifExpr);
      this.appendChild(thenExpr);
    };
    
    IfThen.inherits(ASTNode);
    
    IfThen.prototype.compileNode = function (opts) {
      var blockOpts = opts.descendScope({indent: (opts.indent || 0) + 2});
      var js = 'if (this.__env.BooleanValue.intern(true) === ';
      js += this.children[0].compile(opts) + ') {\n';
      js += this.children[1].compile(blockOpts);
      return utils.indent(js + '\n}\n', opts.indent);
    };
    
    IfThen.prototype.compileTimeCheck = function (opts) {
      if (!this.children[0].isVavaType('boolean'))
        opts.addError(
          this.nonFatalError('incompatible types', this.typeMismatchDescription(this.children[0].getVavaType(),'boolean'), this.children[0].loc)
        );
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
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      if (!condition || !truthyStatement || !falsyStatement) {
        throw new TypeError('Expected condition and conditionals.');
      }
      this.appendChild(condition);
      this.appendChild(truthyStatement);
      this.appendChild(falsyStatement);
    };
    
    IfThenElse.inherits(ASTNode);
    
    IfThenElse.prototype.compileNode = function (opts) {
      var blockOpts = opts.descendScope({indent: (opts.indent || 0) + 2});
      var js = utils.indent('if (this.__env.BooleanValue.intern(true) === ', opts.indent);
      js += this.children[0].compile(blockOpts) + ') {\n';
      js += this.children[1].compile(blockOpts) + '\n';
      js += utils.indent('} else {\n', opts.indent);
      js += this.children[2].compile(blockOpts) + '\n';
      js += utils.indent('}', opts.indent);
      return js;
    };
    
    IfThenElse.prototype.compileTimeCheck = IfThen.prototype.compileTimeCheck;
    
    /**
     * Creates a node for a switch statement.
     *
     * @param expression Expression whose value to compare with cases 
     * @param switchBlock
     */
    var Switch = exports.Switch = function (expression, switchBlock) {
      this.type = 'Switch';
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      this.appendChild(expression);
      this.appendChild(switchBlock);
    };
    
    Switch.inherits(ASTNode);
    
    Switch.prototype.compileNode = function (opts) {
      return utils.indent('(' + builder.wrapAsFunction(' switch (' + this.children[0].compile(opts) + ') {\n' + this.children[1].compile(opts.changeIndent(2)) + '\n', [], 'noNewline') + '}).call(this.__descend());', opts.indent);
    };
    
    /**
     * Creates a node for a switch block.
     *
     * @param switchBlockStatementGroups Array of switch block statements groups 
     * @param switchLabels Array of switch labels
     */
    var SwitchBlock = exports.SwitchBlock = function (switchBlockStatementGroups, switchLabels) {
      this.type = 'SwitchBlock';
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      if (typeof switchBlockStatementGroups.length === 'undefined' || typeof switchLabels.length === 'undefined') {
        throw new Error('Expected arrays for block statement groups and switch labels.');
      }
      for (var i = 0; i < switchBlockStatementGroups.length; i++) this.appendChild(switchBlockStatementGroups[i]);
      for (var j = 0; j < switchLabels.length; j++) this.appendChild(switchLabels[j]);
    };
    
    SwitchBlock.inherits(ASTNode);
    
    SwitchBlock.prototype.compileNode = function (opts) {
      return this.children.map(function (child) { return child.compile(opts); }).join('\n');
    };
    
    /**
     * Creates a node for switch block statement group.
     *
     * @param switchLabels Array of switch labels
     * @param blockStatements Array of block statements
     */
    var SwitchBlockStatementGroup = exports.SwitchBlockStatementGroup = function (switchLabels, blockStatements) {
      this.type = 'SwitchBlockStatementGroup';
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      for (var i = 0; i < switchLabels.length; i++) this.appendChild(switchLabels[i]);
      for (var j = 0; j < blockStatements.length; j++) this.appendChild(blockStatements[j]);
    };
    
    SwitchBlockStatementGroup.inherits(ASTNode);
    
    SwitchBlockStatementGroup.prototype.compileNode = function (opts) {
      return this.children.map(function (child) { return child.compile(opts.changeIndent(0)); }).join(' ');
    };
    
    /**
     * Creates a node for switch label.
     *
     * With an expression as argument becomes
     *   `case <expression>:`
     * without becomes
     *   `default:` 
     *
     * @param expression Optional expression
     */
    var SwitchLabel = exports.SwitchLabel = function (expression) {
      this.type = 'SwitchLabel';
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      if (expression && expression.compile) this.appendChild(expression); 
    };
    
    SwitchLabel.inherits(ASTNode);
    
    SwitchLabel.prototype.compileNode = function (opts) {
      if (this.children[0]) {
        return 'case ' + this.children[0].compile(opts) + ':';
      } else {
        return 'default:';
      }
    };
    
    /**
     * Creates a node for a while loop.
     *
     * @param condition The condition
     * @param statement The looped statements
     */
    var WhileLoop = exports.WhileLoop = function (condition, statement) {
      this.type = 'WhileLoop';
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      if (!condition || !statement) {
        throw new TypeError('Expected condition and conditional.');
      }
      this.appendChild(condition);
      this.appendChild(statement);
    };
    
    WhileLoop.inherits(ASTNode);
    
    WhileLoop.prototype.compileNode = function (opts) {
      var blockOpts = opts.changeIndent(2);
      return utils.indent(builder.wrapParens(
        builder.wrapAsFunction(
          utils.indentSpaces(opts.indent + 2) + 'while (this.__env.BooleanValue.intern(true) === ' + this.children[0].compile(blockOpts) + ') { ' + builder.wrapParens(builder.wrapAsFunction(this.children[1].compile(blockOpts))) + '.call(blockScope); }',
          ['blockScope']
        )
      ) + '.call(this, this.__descend());', opts.indent);
    };
    
    WhileLoop.prototype.compileTimeCheck = IfThen.prototype.compileTimeCheck;
    
    /**
     * Creates a node for a do-while loop.
     *
     * @param statement The looped statements
     * @param condition The condition
     */
    var DoWhileLoop = exports.DoWhileLoop = function (statement, condition) {
      this.type = 'DoWhileLoop';
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      if (!condition || !statement) {
        throw new TypeError('Expected condition and conditional.');
      }
      this.appendChild(statement);
      this.appendChild(condition);
    };
    
    DoWhileLoop.inherits(ASTNode);
    
    DoWhileLoop.prototype.compileNode = function (opts) {
      var blockOpts = opts.changeIndent(2);
      return utils.indent(builder.wrapParens(
        builder.wrapAsFunction(
          utils.indentSpaces(opts.indent + 2) + 'while (freeRide || this.__env.BooleanValue.intern(true) === ' + this.children[1].compile(blockOpts) + ') { ' + builder.wrapParens(builder.wrapAsFunction(this.children[0].compile(blockOpts))) + '.call(blockScope); freeRide = false; }',
          ['freeRide', 'blockScope']
        )
      ) + '.call(this, true, this.__descend());', opts.indent);
    };
    
    DoWhileLoop.prototype.compileTimeCheck = function (opts) {
      if (!this.children[1].isVavaType('boolean'))
        opts.addError(
          this.nonFatalError('incompatible types', this.typeMismatchDescription(this.children[1].getVavaType(), 'boolean'), this.children[1].loc)
        );
    };
    
    /**
     * Creates a node for a for loop.
     *
     * @param init The initialization
     * @param condition The condition
     * @param update The update
     * @param statement The statement
     */
    var ForLoop = exports.ForLoop = function (init, condition, update, statement) {
      this.type = 'ForLoop';
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      init = init || new ASTNode();
      condition = condition || new BooleanLiteral(true);
      update = update || new ASTNode();
      this.appendChild(init);
      this.appendChild(condition);
      this.appendChild(update);
      this.appendChild(statement);
    };
    
    ForLoop.inherits(ASTNode);
    
    ForLoop.prototype.compileNode = function (opts) {
      var blockOpts = opts.changeIndent(2);
      return utils.indent(builder.wrapParens(
        builder.wrapAsFunction(
          utils.indentSpaces(opts.indent + 2) + 'for (' + this.children[0].compile(blockOpts) + '; this.__env.BooleanValue.intern(true) === ' + this.children[1].compile(blockOpts) + '; ' + this.children[2].compile(blockOpts) + ') { ' + builder.wrapParens(builder.wrapAsFunction(this.children[3].compile(blockOpts))) + '.call(blockScope); }',
          ['blockScope']
        )
      ) + '.call(this, this.__descend());', opts.indent);
    };
    
    ForLoop.prototype.compileTimeCheck = DoWhileLoop.prototype.compileTimeCheck;
    
    /**
     * Creates a node for a list of statement expressions
     *
     * @param firstChild Optional first child
     */
    var StatementExpressionList = exports.StatementExpressionList = function (firstChild) {
      this.type = 'StatementExpressionList';
      this.setLoc(arguments[arguments.length-1]);
      this.children = [];
      if (firstChild) this.appendChild(firstChild);
    
    };
    
    StatementExpressionList.inherits(ASTNode);
    
    StatementExpressionList.prototype.compileNode = function (opts) {
      return this.children.map(function (child) { return child.compile(opts); }).join(', ');
    };
    
  
    return exports;
  
  }({});
  parser.yy.utils = utils.yyUtils;
  
  // Simple interface
  exports.run = function (vavaSrc, options) {
    options = options || {};
    if (typeof vavaSrc !== 'string') {
      throw new TypeError('Expected Vava source to be provided as string.');
    }
    // Replace stdlib with customized version if passed
    stdlib = options.stdlib || stdlib;
  
    var scope = new vava.scope.Scope({__env : vava.env}).__add(stdlib).__add(stdlib.java.lang);
  
    var algoTools = {
      AlgoTools : {
        IO : loadClass(stdlib.AlgoTools.source.IO, scope, {})
      }
    };
    var vavaClass = loadClass(vavaSrc, scope.__add(algoTools), options);
  
    // Invoke `main`
    if (vavaClass && vavaClass.hasMethod('main(String[])')) {
      // TODO replace args for main with yet-to-come array
      vavaClass.send('main(String[])', [{getVavaType: function () { return true; }, to: function () {return this;}}]);
    } else {
      throw {type: 'NoSuchMethodError', message: 'Exception in thread "main" java.lang.NoSuchMethodError: main'};
    }
  };
  
  var loadClass = function (vavaSrc, scope, options) {
    // Overwrite parseError each time to have vavaSrc in closure
    parser.yy.parseError = function (message, hash) {
      var err = new Error(message);
      err.message = hash.expected.join(',') + ' expected';
      err.line = hash.line;
      err.description = errorDescription(vavaSrc, hash);
      err.toString = errorToString;
      var errArr = [err];
      errArr.type = 'ParseError';
      errArr.summary = '1 error';
      throw errArr;
    }
  
    // Parse and create AST
    var vavaAST = parser.parse(vavaSrc);
    // Debug info: print AST
    if (options.debug && typeof console !== 'undefined') {
      console.log(vavaAST.toString());
    }
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
  
    return exports;
  
  }({});
  
  exports.web = function (exports) {
  exports.setup = function (ioElem) {
  
    var sources = getElementsByClass('hobbesecutable');
  
    for (var i = 0; i < sources.length; i++) {
      var sourceElem = sources[i];
      var sourceElemStyle = window.getComputedStyle(sourceElem);
      var outerContainer = sourceElem.parentNode;
      var sourceContainer = document.createElement('div');
      sourceContainer.setAttribute('style', 'position: relative; padding: 0; margin: auto;');
      var linkContainer = document.createElement('p');
      linkContainer.setAttribute('style', 'width:' + sourceElemStyle.width + '; position: absolute; top: 3px; right: 3px; text-align:right;');
      var execButton = document.createElement('a');
      execButton.innerText = 'Run';
      execButton.setAttribute('href', '#run');
      execButton.setAttribute('class', 'runner');
      linkContainer.appendChild(execButton);
      sourceContainer.appendChild(sourceElem);
      sourceContainer.appendChild(linkContainer);
      outerContainer.appendChild(sourceContainer);
      execButton.addEventListener('click', function (e) {
        e.cancelBubble = true;
        if (e.stopPropagation) {
          e.stopPropagation();
        } else {
          e.cancelBubble = true;
        } 
        exports.execute(sourceElem, ioElem);
      });
    }
  
  };
  
  exports.execute = function (srcOrElem, ioElem) {
    var source;
    if (typeof srcOrElem === 'string') {
      source = srcOrElem;
    } else {
      source = srcOrElem.value || srcOrElem.innerHTML;
    }
  
    if (!ioElem) {
      ioElem = srcOrElem;
    }
    //// Shadow parts that need to be customized
    // Need to shadow stdlib
    var F = function () {};
    F.prototype = hobbes.stdlib;
    var stdlib = new F();
    // Need to shadow stdlib.java
    F.prototype = stdlib.java;
    var java = new F();
    // Need to shadow stdlib.java.lang
    F.prototype = stdlib.java.lang;
    var lang = new F();
    // Overwrite shadowed stdlib.java.lang's System with one bound to ioElem
    lang.System = hobbes.stdlib.java.lang.System(ioElem);
    java.lang = lang;
    stdlib.java = java;
    // Call compiler with modified stdlib
    hobbes.compiler.run(source, {stdlib: stdlib});
  
  };
  
  /*** Helper functions ***/
  function getElementsByClass(className,node,tag) {
    var classElements = [];
    node = node || document;
    tag  = tag  || '*';
  
    var tagElems = node.getElementsByTagName(tag);
    var numTagElems = tagElems.length;
    var pattern = new RegExp("(^|\\s)"+className+"(\\s|$)");
  
    for (i = 0, j = 0; i < numTagElems; i++) {
      if (pattern.test(tagElems[i].className)) {
        classElements[j++] = tagElems[i];
      }
    }
    return classElements;
  }
  
  
    return exports;
  
  }({});

  return exports;
}({});
