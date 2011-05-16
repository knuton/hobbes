public class OverflowInfinity {

  public static void main(String[] args) {

    float a = 3.40282347e+38f;
    float b = 1.40239846e-45f;
    System.out.println(a+a);
    System.out.println(-a-a);
    System.out.println(0.1f*b);
    System.out.println((-0.1f)*b);

    double c = 1.79769313486231570e+308;
    double d = 4.94065645841246544e-324;
    System.out.println(c+c);
    System.out.println(-c-c);
    System.out.println(0.1d*d);
    // Untreatable for JavaScript, hence no sign here
    //System.out.println((-0.1d)*d);
  }

}
