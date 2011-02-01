var hobbes = require('./hobbes');
var src = "package wildbore; class Wurst { int foo = 5, bar = 6, baz; int fop = 7; int main (int bar) { int a, b = 5; boolean c; boolean d = true; int x; if (x == a) x = 5; int e = a + b - 2*2/4 + fop % 6; boolean f = 4 == 2*2; } }";

console.log(hobbes.compiler.parser.parse(src).toString());
console.log(hobbes.compiler.parser.parse(src).compile());
hobbes.compiler.run(src);
