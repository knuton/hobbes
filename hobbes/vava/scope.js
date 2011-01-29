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
};

Scope.prototype.__descend = function () {
  var newScope = {};
  newScope.prototype = this;
  return newScope;
};
