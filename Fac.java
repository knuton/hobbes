public class Fac {

  int a = 1;

  public static void main(String[] args) {
    fac(2);
    System.out.println(a);
  }

  public static int fac(int n) {
    a = n + a;
    //if (n < 1) {
      //return 1;
    //}
    //return fac(n - 1);
  }


}
