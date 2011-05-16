public class NumericPromotion {

  public static void main(String[] args) {
  
    float a = 3.40282347e+38f;
    float b = 1.40239846e-45f;

    System.out.println(a+a);
    System.out.println(a*2f);
    System.out.println(0.5f*b);

    double c = 3.40282347e+38;
    double d = 1.40239846e-45;

    System.out.println(a+c);
    System.out.println(a*2d);
    System.out.println(0.5d*b);
    System.out.println(c*2f);
    System.out.println(0.5f*d);

  }

}
