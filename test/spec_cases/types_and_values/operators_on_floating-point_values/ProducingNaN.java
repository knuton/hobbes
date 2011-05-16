public class ProducingNaN {

  public static void main(String[] args) {

    float foo = 0f/5f;
    float bar = 5f/0f;
    System.out.println(foo);
    System.out.println(bar);

    double doubleFoo = 0f/5f;
    double doubleBar = 5f/0f;
    System.out.println(doubleFoo);
    System.out.println(doubleBar);

  }

}
