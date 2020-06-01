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

