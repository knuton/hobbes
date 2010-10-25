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
exports.parser = require('./hobbes/parser');
exports.browser = require('./hobbes/browser');

