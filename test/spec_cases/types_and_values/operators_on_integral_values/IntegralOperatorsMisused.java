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
    System.out.println(5 + 3);
    System.out.println(5 - 3);
    System.out.println(5 * 3);
    System.out.println(5 / 3);
    System.out.println(5 % 3);

    // Increment and decrement
    int c = 1;
    System.out.println(c++);
    System.out.println(c);
    System.out.println(c--);
    System.out.println(c);

    System.out.println(++c);
    System.out.println(c);
    System.out.println(--c);
    System.out.println(c);


    // Bitwise
    System.out.println(1 & 0);
    System.out.println(1 & 1);
    System.out.println(1 & 2);
    System.out.println(1 | 0);
    System.out.println(1 | 1);
    System.out.println(1 | 2);
    System.out.println(1 ^ 0);
    System.out.println(1 ^ 1);
    System.out.println(1 ^ 2);
    System.out.println(~0);
    System.out.println(~1);
    System.out.println(~2);
    System.out.println(1 << 0);
    System.out.println(1 << 1);
    System.out.println(1 << 2);
    System.out.println(1 >> 0);
    System.out.println(1 >> 1);
    System.out.println(1 >> 2);
    System.out.println(1 >>> 0);
    System.out.println(1 >>> 1);
    System.out.println(1 >>> 2);
  }

}
