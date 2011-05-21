public class ParameterVariables {

  public static void main(String[] args) {
    fn(z, "hi");
  }

  public static void fn(int a, String b) {
    System.out.println(a);
    System.out.println(b);
  }

  public static int z = -5;

}
