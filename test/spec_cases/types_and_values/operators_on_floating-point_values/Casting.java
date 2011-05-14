public class Casting {
  
  public static void main(String[] args) {
    
    float  e = 128.5f;
    double f = 256.5d;

    // Cast `float`
    byte floatToByte = (byte) e;
    System.out.println(floatToByte);
    short floatToShort = (short) e;
    System.out.println(floatToShort);
    int floatToInt = (int) e;
    System.out.println(floatToInt);
    long floatToLong = (long) e;
    System.out.println(floatToLong);
    float floatToFloat = (float) e;
    System.out.println(floatToFloat);
    double floatToDouble = (double) e;
    System.out.println(floatToDouble);
    char floatToChar = (char) e;
    System.out.println(floatToChar);

    // Cast `double`
    byte doubleToByte = (byte) f;
    System.out.println(doubleToByte);
    short doubleToShort = (short) f;
    System.out.println(doubleToShort);
    int doubleToInt = (int) f;
    System.out.println(doubleToInt);
    long doubleToLong = (long) f;
    System.out.println(doubleToLong);
    float doubleToFloat = (float) f;
    System.out.println(doubleToFloat);
    double doubleToDouble = (double) f;
    System.out.println(doubleToDouble);
    char doubleToChar = (char) f;
    System.out.println(doubleToChar);

    // Giant `double` to `char` (unsigned int)
    short w00t = (short) (char) 25e+7;
    System.out.println(w00t);
  }

}
