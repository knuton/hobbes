public class IntegralOperatorsMisused {
  
  public static void main(String[] args) {
    int a = 5;
    boolean b = true;
    // Numerical comparison
    System.out.println(1 <  false);
    System.out.println(b <  false);
    System.out.println(a <  b);
    System.out.println(1 <= false);
    System.out.println(b <= false);
    System.out.println(a <= b);
    System.out.println(1 >  false);
    System.out.println(b >  false);
    System.out.println(a >  b);
    System.out.println(1 >= false);
    System.out.println(b >= false);
    System.out.println(a >= b);

    // Arithmetic operators
    System.out.println(1 + false);
    System.out.println(b + false);
    System.out.println(a + b);
    System.out.println(1 - false);
    System.out.println(b - false);
    System.out.println(a - b);
    System.out.println(1 * false);
    System.out.println(b * false);
    System.out.println(a * b);
    System.out.println(1 / false);
    System.out.println(b / false);
    System.out.println(a / b);
    System.out.println(1 % false);
    System.out.println(b % false);
    System.out.println(a % b);

    // Increment and decrement
    System.out.println(b++);
    System.out.println(b--);

    System.out.println(++b);
    System.out.println(--b);


    // Bitwise
    System.out.println(1 & false);
    System.out.println(b & false);
    System.out.println(a & b);
    System.out.println(1 | false);
    System.out.println(b | false);
    System.out.println(a | b);
    System.out.println(1 ^ false);
    System.out.println(b ^ false);
    System.out.println(a ^ b);
    System.out.println(~false);
    System.out.println(~b);
    System.out.println(~2);
    System.out.println(1 << false);
    System.out.println(b << false);
    System.out.println(a << b);
    System.out.println(1 >> false);
    System.out.println(b >> false);
    System.out.println(a >> b);
    System.out.println(1 >>> false);
    System.out.println(b >>> false);
    System.out.println(a >>> b);
  }

}
