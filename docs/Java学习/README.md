# Introduction

1GB=1024MB 、1MB=1024KB 、1KB=1024Byte 、1byte=8bit

​	

```tiki wiki
byte  ->   8 bits  -->1字节
char  ->   16 bit  -->2字节
short ->   16 bits -->2字节
int   ->   32 bits -->4字节
float ->   32 bits -->4字节
long  ->   64 bits -->8字节
```

3亿个数字大小： 3亿 * 4字节 / 1024 / 1024 /1024 ≈ 1.11 G 内存



这些是基元数组（ [B == byte [] ， [C == char ， [I == int ）。 [Lx; 是类型 x 的数组。

```java
 [Z =布尔值
 [B =字节
 [S = short 
 [I = int 
 [J = long 
 [F = float 
 [D = double 
 [C = char 
 [L =任何非-primitives（Object）
```



#### 多个三目运算

```java
int i = 0;
int gg = i == 0 ? 0 : i == 1 ? 1 : 2;
```



### cookies

cookies 核心参数设置 path，其中 path 访问子路径时，会包含其父路径的Cookie,而在访问父路径时，不包含子路径的Cookie。比如请求 127.0.0.1:8080/a/b/c/helloword, 可以获取到 /、/a、/a/b、/a/b/c 的 cookies

后端可以获取到这个值,和获取普通 header 字段一样。

```java
//sso_session_id=245daa107ea1196d59d4f9e836e3d4ed; session_id=0a6c7a4b8bb9fbc6d27703376196eb03;
String cookie = request.getHeader("cookie");

//设置 cookie
 // 死编码
cookie.setPath("/hello/xx");
   // 活编码
cookie.setPath(request.getContextPath() + "/");
```



