# Java

```bash
# 编译
javac Helloworld.java
# 运行
java Helloworld
```

java跨平台特性的本质：虚拟机，java运行在虚拟机之上，虚拟机运行在操作系统之上。

JDK：java开发工具包，包括JVM、核心类库、开发工具

JRE：java运行环境，包括JVM、核心类库

## 常用

### 键盘输入

```java
import java.util.Scanner;

Scanner sc = new Scanner(System.in);
int a = sc.nextInt();
```

1. nextInt() 接受整数

   nextDouble() 接受小数

   next() 接受字符串

   遇到空格，制表符，回车就停止接受

2. nextLine() 读取一行字符串

   可以接受空格，制表符，遇到回车就停止接受

### 生成随机数

```java
import java.util.Random;

Random r = new Random();
int a = r.nextInt(100) + 1 //范围为 1 ~ 100
```

### 数组

```java
// 静态初始化
int[] a1 = new int[]{1,2,3,4,5,6,7,8,9,10}; // 完整写法
int[] a2 = {1,2,3,4,5,6,7,8,9,10}; // 简洁写法

// 数组的地址为 [I@b4c966a
// [ 表示为数组
// I 表示为int
// @b4c966a 表示为内存地址

// 遍历
for(int i = 0;i < a2.length;i++){
    System.out.println(a2[i]);
}

// 动态初始化
int[] a3 = new int[10];

// 二维数组
int[][] a4 = new int[][]{{11,22},{33,44}};

int[][] a5 = new int[10][10];
```

## 数据类型

### 基本数据类型

1. byte
2. short
3. int
4. long
5. float
6. double
7. char
8. boolean

### 引用数据类型

1. String
2. Object
3. 数组

## java内存分配

1. 栈：存放基本数据类型、对象引用
2. 堆：存放对象实例
3. 方法区：存放类信息、静态变量、常量 
4. 程序计数器：记录当前执行的行数
5. 本地方法栈：存放本地方法调用的参数、返回值

## 方法

### 方法是程序中的最小执行单元

### 方法调用后会进栈执行

```java
// 最简单的方法定义和调用
public static void playGame(){
    system.out.println("开始游戏");
}

playGame();

// 带参数和返回值的方法定义和调用
public static int add(int a, int b){
    return a + b;
}

int sum = add(1,2);
```

### 方法的重载

#### 同一个类中，方法名相同，参数不同的方法，与返回值无关

参数不同：个数不同，类型不同，顺序不同

```java
// 方法重载的思想，设计比较两个数(int, double类型)是否相同
public static boolean equals(int a, int b){
    return a == b;
}
public static boolean equals(double a, double b){ 
    return a == b;
}
```

## 类和对象

1. Javabean类：描述一类事物的类
2. 测试类：用来检查其他类是否书写正确，带有main函数的类
3. 工具类：提供工具方法的类

### 三大特性：封装、继承、多态

1. 类：模板，定义对象的属性和方法
2. 对象：实例，类创建的对象

```java
public class Phone{
    string brand;
    string color;
    double price;

    public void call(string name){
        System.out.println("正在给" + name + "打电话");
    }
}

Phone phone1 = new Phone();
phone1.brand = "华为";
phone1.color = "蓝色";
phone1.price = 3999;
phone1.call("张三");
```

#### private关键字

1. 是一个权限修饰符
2. 可以修饰成员（成员变量和成员方法）
3. 被private修饰的成员，只能在本类中访问

```java
public class Phone{
    private String brand;
}
```

#### this关键字

this表示当前对象

#### 构造方法

1. 构造方法与类名相同
2. 构造方法没有返回值类型，没有返回值
3. 如果没写构造方法，系统会默认添加一个无参构造方法
4. 如果定义了自己的构造方法，那么系统将不再提供无参构造方法

### 面向对象进阶

#### static

1. static修饰的成员变量，静态变量，也叫静态成员变量
   - 静态变量，所有对象共享一个变量
   - 类名调用
   - 静态变量随着类的加载而加载，优先于对象
2. static修饰的成员方法，被称为静态成员方法
   - 静态方法，只能访问静态成员变量和静态成员方法
   - 类名调用

## String

字符串在Lang包下，核心包，不用导入

字符串不能修改

### String构造

```java
// 直接赋值
String s1 = "abc";

// new方式空参构造
String s2 = new String();

// new方式有参构造
String s3 = new String("abc");

// 传递一个字符数组
char[] chs = {'a','b','c','d'};
String s4 = new String(chs);

// 传递一个字节数组
byte[] bytes = {97,98,99,100};
String s5 = new String(bytes);                           
```

### String常用方法

#### 比较

1. ==

    基本数据类型：比较数据值

    引用数据类型：比较地址值

    ```java
    String s1 = "abc";
    String s2 = "abc";
    System.out.println(s1 == s2); // true

    String s3 = new String("abc");
    System.out.println(s1 == s3); // false
    ```

2. boolean equals(Object obj) // 完全一样才是true

    ```java
    String s1 = "abc";
    String s2 = "abc";
    System.out.println(s1.equals(s2)); // true
    ```

3. boolean equalsIgnoreCase(String str) // 忽略大小写

   ```java
   String s1 = "abc";
   String s2 = "ABC";
   System.out.println(s1.equalsIgnoreCase(s2)); // true
   ```

#### 下标获取字符

char charAt(int index) // 获取指定下标字符

```java
String s1 = "abc";
s1.charAt(0)
```

#### 长度

int length() // 获取字符串长度

```java
String s1 = "abc";
s1.length();
// 注意，数组的长度是属性，.length，而字符串的长度是方法，.length()
```

#### 截取

String substring(int beginIndex, int endIndex) // 左闭右开

不加endIndex，截取到末尾

```java
String s1 = "19906231009";
String s2 = s1.substring(0,3); // 199
String s3 = s1.subString(7); // 0623
String s4 = s2 + "****" + s3; // 199****0623
```

#### 替换

String replace(char oldChar, char newChar)

```java
String s1 = "abc";
String s2 = s1.replace('a','b'); // bbc

```

### StringBuilder

StringBuilder可以看成是一个容器，创建之后里面的内容是可变的

是Java已经写好的类，底层有特殊处理，打印对象不是地址值而是属性值

使用场景：字符串拼接 反转

#### 构造

StringBuilder() // 创建一个空对象

```java
StringBuilder sb = new StringBuilder();

StringBuilder sb = new StringBuilder("hello");
```

#### 添加

StringBuilder append(Object obj) // 添加内容

```java
StringBuilder sb = new StringBuilder();
sb.append("hello");
```

#### 反转

StringBuilder reverse() // 容器内直接反转

```java
StringBuilder sb = new StringBuilder("hello");
sb.reverse();
```

#### 长度

int length() // 获取字符串长度

```java
StringBuilder sb = new StringBuilder("hello");
int len = sb.length();
```

#### 转换为字符串

String toString()

```java
StringBuilder sb = new StringBuilder("hello");
String s = sb.toString();
```

### StringJoiner

拼接快速简单

#### 构造 添加

StringJoiner(String delimiter) // 间隔符号

StringJoiner(String delimiter, String prefix, String suffix) // 间隔符号 前缀和后缀

StringJoiner add(String element) // 添加内容（只能添加字符串）

```java
StringJoiner sj = new StringJoiner(",");
sj.add("hello").add("world");
System.out.println(sj);
System.out.println(sj.length());
System.out.println(sj.toString());
```

## 集合ArrayList

特点：
1. 长度可变
2. 存储引用数据类型，如果要存基本数据类型，要转变为包装类

## 网络编程

1. C/S 架构：客户端/服务端

    优点
    - 画面精美，用户体验好
    - 需要开发客户端，也需要服务端

    缺点
    - 用户下载更新时候麻烦

2. B/S 架构：浏览器/服务器

    优点
    - 不需要客户端，只要页面+服务端
    - 用户无需下载，打开浏览器就能使用

    缺点
    - 如果应用过大，用户体验受影响

### InetAddress对象

获取电脑对象

```java
        InetAddress address = InetAddress.getByName("PC");
        System.out.println(address);
```

### UDP

#### 发送数据

```java
     // 1.创建对象（快递公司）
        DatagramSocket ds = new DatagramSocket();
        // 2.打包
        String str = "hello,felix";
        byte[] bytes = str.getBytes();
        InetAddress address = InetAddress.getByName("127.0.0.1");
        int port = 10086;
        DatagramPacket dp = new DatagramPacket(bytes,bytes.length,address,port);
        // 3.发送
        ds.send(dp);
        // 4.释放
        ds.close();
```

#### 接收数据

```java
     // UDP接收数据
        // 1.创建对象（快递公司）
        DatagramSocket ds = new DatagramSocket(10086);
        // 2.接收数据
        byte[] bytes = new byte[1024];
        DatagramPacket dp = new DatagramPacket(bytes, bytes.length);
        ds.receive(dp);
        // 3.解析数据
        byte[] data = dp.getData();
        int len = dp.getLength();
        InetAddress address = dp.getAddress();
        int port = dp.getPort();
        System.out.println("接收到数据" + new String(data,0,len));
        System.out.println("来自" + address+ ":" + port);
        // 4.释放资源
        ds.close();
```
