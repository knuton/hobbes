public class NoExceptions {

  public static void main(String[] args) {

    System.out.println(5/0f);
    System.out.println(5f/0);
    System.out.println(5f/0f);

    System.out.println(5/(5f/0f));
  }

}
