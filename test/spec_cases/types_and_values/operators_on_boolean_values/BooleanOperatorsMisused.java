public class BooleanOperatorsMisused {

  public static void main(String[] args) {
    int a = 0;
    // Logical Conditional Or
    System.out.println(true || 1);
    System.out.println(true || a);

    // Logical Conditional And
    System.out.println(true && 1);
    System.out.println(true && a);

    // Negation
    System.out.println(!1);
    System.out.println(!!a);
  }

}
