public class BooleanOperators {

  public static void main(String[] args) {
    // Logical Conditional Or
    System.out.println(true || true);
    System.out.println(true || false);
    System.out.println(false || true);
    System.out.println(false || false);
    // Conditional execution of second disjunct
    int a = 0;
    System.out.println(false || a++ > 2);
    System.out.println(a);
    System.out.println(true || a++ > 2);
    System.out.println(a);

    // Logical Inclusive Or
    System.out.println(true | true);
    System.out.println(true | false);
    System.out.println(false | true);
    System.out.println(false | false);
    // Execution of second disjunct
    System.out.println(false | a++ > 2);
    System.out.println(a);
    System.out.println(true | a++ > 2);

    // Logical Exclusive Or
    System.out.println(true ^ true);
    System.out.println(true ^ false);
    System.out.println(false ^ true);
    System.out.println(false ^ false);
    // Execution of second disjunct
    System.out.println(false ^ a++ > 2);
    System.out.println(a);
    System.out.println(true ^ a++ > 2);

    // Logical Conditional And
    System.out.println(true && true);
    System.out.println(true && false);
    System.out.println(false && true);
    System.out.println(false && false);
    // Conditional execution of second conjunct
    System.out.println(false && a++ > 2);
    System.out.println(a);
    System.out.println(true && a++ > 2);
    System.out.println(a);

    // Logical Inclusive And
    System.out.println(true & true);
    System.out.println(true & false);
    System.out.println(false & true);
    System.out.println(false & false);
    // Execution of second conjunct
    System.out.println(false & a++ > 2);
    System.out.println(a);
    System.out.println(true & a++ > 2);
    System.out.println(a);

    // Equality
    System.out.println(true == true);
    System.out.println(true == false);
    System.out.println(false == true);
    System.out.println(false == false);

    // Inequality
    System.out.println(true != true);
    System.out.println(true != false);
    System.out.println(false != true);
    System.out.println(false != false);

    // Negation
    System.out.println(!true);
    System.out.println(!!true);
  }

}
