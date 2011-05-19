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
