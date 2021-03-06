public class BooleanInControlFlow {

  public static void main(String[] args) {
    
    boolean t = true;
    int a = t ? 1 : 0;
    System.out.println(a);
    System.out.println(a == 0 ? 0 : 1);

    while (a < 10) {
      System.out.println(a++);
    }

    do {
      System.out.println(a--);
    } while (a > 1);

    while (a < 5) while (a < 10) System.out.println(a++);

    for (int i = 0; i < 10; i++) {
      System.out.println(i != 10);
    }

  }

}
