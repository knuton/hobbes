public class InvalidReturn {

  public static void main(String[] args) {
    System.out.println(fab());
    System.out.println(noReturn());
    fub();
  }

  public static byte fab () {
    boolean c = true;
    return c;
  }

  public static int noReturn () {
    int a = 1;
  }
  public static void fub () {
    return 1;
  }

}
