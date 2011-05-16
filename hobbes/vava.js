var utils = (typeof hobbes !== 'undefined' && hobbes.utils) || require('./utils');

var vavaClass = require('./vava/class');
var vavaMethod = require('./vava/method');
var vavaType = require('./vava/type');

exports.scope = require('./vava/scope');

exports.mixins = {
  TypeChecking : vavaType.TypeChecking
};

exports.env = utils.merge(
  vavaClass,
  vavaMethod,
  vavaType
);
