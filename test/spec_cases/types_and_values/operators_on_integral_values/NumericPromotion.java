public class NumericPromotion {

  public static void main(String[] args) {
  
    int a = 2147483647;
    int b = -2147483648;

    System.out.println(a+a);
    System.out.println(a*2);
    System.out.println(-b);
    System.out.println(-b-a);
    System.out.println(-a*2);

    long c = 2147483647;
    long d = -2147483648;

    System.out.println(a+c);
    System.out.println(c*2);
    System.out.println(-d);
    System.out.println(d-a);
    System.out.println(-c*2);
    System.out.println(3*d/2);
    System.out.println(22147483649L % 20000000000L);
    System.out.println(20000000000L - 20000000000L);

  }

}
