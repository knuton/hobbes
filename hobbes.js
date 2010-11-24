/**
 * hobbes.js -- a Java subset interpreter in JavaScript
 * (c) 2010 Johannes Emerich (jemerich@uos.de)
 * v0.1
 */

// TODO
//  - HTML- und CLI-Umgebungen
//  - Vernuenftige Grammatik
//  - Anschliessend Laufzeit-Umgebung nachfuegen

exports.version = '0.1';

require('./hobbes/extensions');
exports.compiler = require('./hobbes/compiler');
exports.vava     = require('./hobbes/vava');
exports.browser  = require('./hobbes/browser');

