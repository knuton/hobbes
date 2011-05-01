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

require('./hobbes/extensions');
exports.utils    = require('./hobbes/utils');
exports.vava     = require('./hobbes/vava');
exports.stdlib   = require('./hobbes/stdlib');
exports.compiler = require('./hobbes/compiler');
