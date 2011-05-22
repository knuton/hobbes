exports.source = {};

exports.source['IO'] = 'public class AlgoToolsIO {\n\n  public static void print(String s) {\n    System.out.print(s);\n  }\n\n  public static void println(String s) {\n    print(s + "\\n");\n  }\n  \n  public static void println(boolean b) {\n    print(b + "\\n");\n  }\n  \n  public static void println(byte b) {\n    print(b + "\\n");\n  }\n  \n  public static void println(short s) {\n    print(s + "\\n");\n  }\n  \n  public static void println(int i) {\n    print(i + "\\n");\n  }\n  \n  public static void println(long l) {\n    print(l + "\\n");\n  }\n  \n  public static void println(float f) {\n    print(f + "\\n");\n  }\n  \n  public static void println(double d) {\n    print(d + "\\n");\n  }\n\n  public static int readInt() {\n    int in = System.in.readInt();\n    return in;\n  }\n  \n  public static int readInt(String s) {\n    print(s);\n    int in = System.in.readInt();\n    println(in);\n    return in;\n  }\n  \n  public static void main(String[] args) {\n    println("Hi");\n    println(true);\n    println(5);\n    println(5f);\n  }\n\n}\n';