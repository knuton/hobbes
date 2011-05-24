var utils = (typeof hobbes !== 'undefined' && hobbes.utils) || require('./utils');

var vavaEntity = require('./vava/entity');
var vavaType = require('./vava/type');
var vavaClass = require('./vava/class');
var vavaMethod = require('./vava/method');

// Add some String instance methods
vavaType.StringValue.prototype.vavaMethods['length()'] = new vavaMethod.VavaMethod('length', 'int', [], function () {});
vavaType.StringValue.prototype.vavaMethods['length()'].call = function (stringObj, args) {
  return vavaType.IntValue.intern(stringObj.length);
};

exports.scope = require('./vava/scope');

exports.mixins = {
  TypeChecking : vavaType.TypeChecking
};

exports.env = utils.merge(
  vavaClass,
  vavaMethod,
  vavaType
);
