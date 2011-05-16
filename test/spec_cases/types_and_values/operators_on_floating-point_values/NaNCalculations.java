public class NaNCalculations {

  public static void main(String[] args) {

    float nan = 1f/0f;
    float num = 5f;

    System.out.println(nan);
    System.out.println(num);

    System.out.println(nan + num);
    System.out.println(num + nan);
    System.out.println(nan - num);
    System.out.println(num - nan);
    System.out.println(nan * num);
    System.out.println(num * nan);
    System.out.println(nan / num);
    System.out.println(num / nan);
    System.out.println(nan % num);
    System.out.println(num % nan);
    System.out.println(nan++);
    System.out.println(nan--);
    System.out.println(++nan);
    System.out.println(--nan);

    System.out.println(nan == nan);
    System.out.println(nan == num);
    System.out.println(nan >  nan);
    System.out.println(nan >  num);
    System.out.println(nan >= nan);
    System.out.println(nan >= num);
    System.out.println(nan <  nan);
    System.out.println(nan <  num);
    System.out.println(nan <= nan);
    System.out.println(nan <= num);
    System.out.println(nan != nan);
    System.out.println(nan != num);

  }

}
