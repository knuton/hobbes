var utils = (typeof hobbes !== 'undefined' && hobbes.utils) || require('./utils');

var vavaEntity = require('./vava/entity');
var vavaType = require('./vava/type');
var vavaClass = require('./vava/class');
var vavaMethod = require('./vava/method');

exports.scope = require('./vava/scope');

exports.mixins = {
  TypeChecking : vavaType.TypeChecking
};

exports.env = utils.merge(
  vavaClass,
  vavaMethod,
  vavaType
);
