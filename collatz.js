var hobbes = require('./hobbes');
var src = "package wildbore; class Wurst { int foo = 5, bar = 6, baz; int fop = 7; int main (int bar) { int a, b = 5; boolean c; boolean d = true; if (c) { a = 2; } else { a = 3; } int x; while (x != b) { x = x + 1; } int e = a + b - 2*2/4 + fop % 6; boolean f = 4 == 2*2; } }";

var src = 'import AlgoTools.IO; public class Collatz { public static void main(String [] foo) { int x, z; x = 3; z = 0; while (x != 1) { if (x % 2 == 0) x = x / 2; else x = 3*x+1; z = z+1; } IO.println("Anzahl der Iterationen: " + z); } }';

console.log(hobbes.compiler.parser.parse(src).toString());
console.log(hobbes.compiler.parser.parse(src).compile());
hobbes.compiler.run(src);
