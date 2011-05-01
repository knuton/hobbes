var vavaClass = require('./vava/class');
var vavaMethod = require('./vava/method');
var vavaType = require('./vava/type');

exports.scope = require('./vava/scope');

exports.env = {
  VavaClass  : vavaClass.VavaClass,
  VavaMethod : vavaMethod.VavaMethod,
  TypedVariable : vavaType.TypedVariable,
  BooleanValue : vavaType.BooleanValue,
  IntValue   : vavaType.IntValue,
  StringValue : vavaType.StringValue,
}
