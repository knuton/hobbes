/*
 * Intended for use with Mozilla's SpiderMonkey JS REPL.
 *
 * Provides a `require` method for uniform loading of modules across
 * CLI and browser.
 *
 */
function require(moduleName) {
  load(moduleName + '.js');
}
