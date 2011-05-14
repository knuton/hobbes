public class FloatingPointOperators {
  
  public static void main(String[] args) {
    // Numerical comparison
    System.out.println(1f <  0f);
    System.out.println(1f <  1f);
    System.out.println(1f <  2f);
    System.out.println(1f <= 0f);
    System.out.println(1f <= 1f);
    System.out.println(1f <= 2f);
    System.out.println(1f == 0f);
    System.out.println(1f == 1f);
    System.out.println(1f == 2f);
    System.out.println(1f >  0f);
    System.out.println(1f >  1f);
    System.out.println(1f >  2f);
    System.out.println(1f >= 0f);
    System.out.println(1f >= 1f);
    System.out.println(1f >= 2f);
    System.out.println(1f != 0f);
    System.out.println(1f != 1f);
    System.out.println(1f != 2f);

    // Arithmetic operators
    System.out.println(5f + 3f);
    System.out.println(5f - 3f);
    System.out.println(5f * 3f);
    System.out.println(5f / 3f);
    System.out.println(5f % 3f);

    // Increment and decrement
    float a = 1f;
    System.out.println(a++);
    System.out.println(a);
    System.out.println(a--);
    System.out.println(a);

    System.out.println(++a);
    System.out.println(a);
    System.out.println(--a);
    System.out.println(a);
  }

}
