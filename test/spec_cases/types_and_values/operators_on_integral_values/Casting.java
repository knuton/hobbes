public class Casting {
  
  public static void main(String[] args) {
    
    byte  a = 8;
    short b = 16;
    int   c = 32;
    long  d = 64;

    float  e = 128.5f;
    double f = 256.5d;

    char g = 'g';

    // Promote `byte`
    byte byteToByte = (byte) a;
    System.out.println(byteToByte);
    short byteToShort = (short) a;
    System.out.println(byteToShort);
    int byteToInt = (int) a;
    System.out.println(byteToInt);
    long byteToLong = (long) a;
    System.out.println(byteToLong);
    float byteToFloat = (float) a;
    System.out.println(byteToFloat);
    double byteToDouble = (double) a;
    System.out.println(byteToDouble);
    char byteToChar = (char) a;
    System.out.println(byteToChar);

    // Cast `short`
    byte shortToByte = (byte) b;
    System.out.println(shortToByte);
    short shortToShort = (short) b;
    System.out.println(shortToShort);
    int shortToInt = (int) b;
    System.out.println(shortToInt);
    long shortToLong = (long) b;
    System.out.println(shortToLong);
    float shortToFloat = (float) b;
    System.out.println(shortToFloat);
    double shortToDouble = (double) b;
    System.out.println(shortToDouble);
    char shortToChar = (char) b;
    System.out.println(shortToChar);

    // Cast `int`
    byte intToByte = (byte) c;
    System.out.println(intToByte);
    short intToShort = (short) c;
    System.out.println(intToShort);
    int intToInt = (int) c;
    System.out.println(intToInt);
    long intToLong = (long) c;
    System.out.println(intToLong);
    float intToFloat = (float) c;
    System.out.println(intToFloat);
    double intToDouble = (double) c;
    System.out.println(intToDouble);
    char intToChar = (char) c;
    System.out.println(intToChar);

    // Cast `long`
    byte longToByte = (byte) d;
    System.out.println(longToByte);
    short longToShort = (short) d;
    System.out.println(longToShort);
    int longToInt = (int) d;
    System.out.println(longToInt);
    long longToLong = (long) d;
    System.out.println(longToLong);
    float longToFloat = (float) d;
    System.out.println(longToFloat);
    double longToDouble = (double) d;
    System.out.println(longToDouble);
    char longToChar = (char) d;
    System.out.println(longToChar);

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
