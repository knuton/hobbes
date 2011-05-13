public class Casting {
  
  public static void main(String[] args) {
    
    byte  a = 8;
    short b = 16;
    int   c = 32;
    long  d = 64;

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

  }

}
