public class InvocableCode {

  public static void main(String[] args) {
    invoke();
    invokeOne(5);
  }

  public static void invoke() {
    System.out.println("No args");
  }

  public static void invokeOne(int num) {
    System.out.println(num);
  }

}
