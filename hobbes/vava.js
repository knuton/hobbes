var vavaClass = require('./vava/class');
var vavaMethod = require('./vava/method');
var vavaType = require('./vava/type');

exports.scope = require('./vava/scope');

exports.env = {
  VavaClass  : vavaClass.VavaClass,
  VavaMethod : vavaMethod.VavaMethod,
  TypedVariable : vavaType.TypedVariable,
  IntValue   : vavaType.IntValue
}
