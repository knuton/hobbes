public class NonBooleanInControlFlow {

  public static void main(String[] args) {
    
    int tI = 1;
    char fC = 0;
    float tF = 1f;
    System.out.println(tI ? 1 : 0);

    while (tI) {
      System.out.println(tI);
      tI = 0;
    }

    do {
      System.out.println(tI);
    } while (tI);

    for (int i = 0; i; i++) {
      System.out.println(i != 10);
    }

  }

}
