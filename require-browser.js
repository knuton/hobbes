/*
 * Provides a `require` method to be used in browsers.
 *
 * Needs to be called while the document is still loading.
 *
 */
function require(moduleName) {
  document.writeln('<script src="../' + moduleName + '.js">');
}
