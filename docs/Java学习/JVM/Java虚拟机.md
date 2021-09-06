

# Java 虚拟机

### 1.基本结构

![1586420423350.png](https://gitee.com/linqin07/pic/raw/master/1586420423350.png)

- 类加载子系统:

  主要负责负责加载 Class 信息，加载的类信息都存放在方法区的类存空间中。 当 JVM 使用类加载器装载某个类时，它首先要定位对应的 class 文件，然后读入这个 class 文件，最后，JVM 提取该文件的内容信息，并将这些信息存储到方法区，最后返回一个 class 实例

- 方法区（线程共享

  方法区主要存储的是方法，静态成员，常量。方法区中给每个类都规定了空间并且持有 this 和 super 的引用。当运行到哪个对象的时候，通过 this 动态指向该对象，引用该对象的成员变量，然后和方法以及局部变量一起在栈中进行运算。 
  方法区的大小不必是固定的，默认最小值为 16 MB，最大值为 64 MB，JVM 可根据应用需要动态调整。同时，方法区也不一定是连续的，方法区可以在一个堆(甚至是 JVM 自己的堆)中自由分配。 

- java 堆（线程共享）

  存放了对象实例及数组(所有 new 的对象)。也就是 Object object = new Object(); 这里 objec t只是一个引用是放在栈里面的，new Object() 被放在了堆内存里面， 
  由于现在收集器都是采用分代收集算法，堆被划分为`新生代`和`老年代`。
  
  其中：刚创建的对象放在eden区（伊甸园），S0 和 S1 大小相当，可以相互转化。
  
  java8 分为新生代（eden，from，to），metaSpace。当新生区内存满了后触发 YGC，把存活的对象放到其中一个 Survive 中，然后进行垃圾清理。直接完全清理 eden。下次 GC，便把对象放到另一个 Survive 内。如此循环。（复制清理算法）
  
  如果有特别大的对象，新生代放不下，就会使用老年代的担保，直接放到老年代里面。因为 JVM 认为，一般大对象的存活时间一般比较久远。
  
  老年代回收，使用标记整理，移动存活到一边





![1586420581769.png](https://gitee.com/linqin07/pic/raw/master/1586420581769.png)

- 垃圾回收系统

  垃圾回收系统是 jvm 的重要组成部分，垃圾回收器 可以直接对方法区 ，java 堆和直接内存进行回收，在其中 `java堆`则是垃圾回收器的 重点工作区域。

- java 栈

  每一个线程中都有私有的 java 栈，一个线程的 java 栈 在线程被创建的时候就会被创建，java 栈中保存着，局部变量，方法参数，并且对象的引用也存在栈中。

  栈的结构是栈帧组成的，调用一个方法就压入一帧，帧上面存储局部变量表，操
  作数栈，方法出口等信息，局部变量表存放的是 8 大基础类型加上一个应用类型，所
  以还是一个指向地址的指针

- 本地方法栈（线程私有）

  主要为 Native 方法服务

- PC寄存器

  寄存器是每个线程所有私有的空间，每个线程都会有寄存器，当线程在执行方法是，而这个方法不是本地方法，寄存器就指向当前被执行的指令

- 执行引擎

  执行引擎则是 jvm 最核心的组件之一，他负责执行字节码





![1586428096983.png](https://gitee.com/linqin07/pic/raw/master/1586428096983.png)

新生代为堆（heap）的 3/8 ，持久代一般固定 64M，最大非堆内存为 128M。



# 二、垃圾收集

垃圾收集主要是针对堆和方法区进行。程序计数器、虚拟机栈和本地方法栈这三个区域属于线程私有的，只存在于线程的生命周期内，线程结束之后就会消失，因此不需要对这三个区域进行垃圾回收。

## 判断一个对象是否可被回收

### 1. 引用计数算法

为对象添加一个引用计数器，当对象增加一个引用时计数器加 1，引用失效时计数器减 1。引用计数为 0 的对象可被回收。

在两个对象出现循环引用的情况下，此时引用计数器永远不为 0，导致无法对它们进行回收。正是因为循环引用的存在，因此 Java 虚拟机不使用引用计数算法。`很难解决对象之间的循环引用问题。`

```java
public class Test {

    public Object instance = null;

    public static void main(String[] args) {
        Test a = new Test();
        Test b = new Test();
        a.instance = b;
        b.instance = a;
        a = null;
        b = null;
        doSomething();
    }
}
```

在上述代码中，a 与 b 引用的对象实例互相持有了对象的引用，因此当我们把对 a 对象与 b 对象的引用去除之后，由于两个对象还存在互相之间的引用，导致两个 Test 对象无法被回收。

### 2. 可达性分析算法

以 GC Roots 为起始点进行搜索，可达的对象都是存活的，不可达的对象可被回收。

Java 虚拟机使用该算法来判断对象是否可被回收，GC Roots 一般包含以下内容：

- 虚拟机栈中局部变量表中引用的对象
- 本地方法栈中 JNI 中引用的对象
- 方法区中类静态属性引用的对象
- 方法区中的常量引用的对象

![image-20210616124512778.png](https://gitee.com/linqin07/pic/raw/master/image-20210616124512778.png)

### 3. 方法区的回收

因为方法区主要存放永久代对象，而永久代对象的回收率比新生代低很多，所以在方法区上进行回收性价比不高。

主要是对常量池的回收和对类的卸载。

为了避免内存溢出，在大量使用反射和动态代理的场景都需要虚拟机具备类卸载功能。

类的卸载条件很多，需要满足以下三个条件，并且满足了条件也不一定会被卸载：

- 该类所有的实例都已经被回收，此时堆中不存在该类的任何实例。
- 加载该类的 ClassLoader 已经被回收。
- 该类对应的 Class 对象没有在任何地方被引用，也就无法在任何地方通过反射访问该类方法。

### 4. finalize()

类似 C++ 的析构函数，用于关闭外部资源。但是 try-finally 等方式可以做得更好，并且该方法运行代价很高，不确定性大，无法保证各个对象的调用顺序，因此最好不要使用。

当一个对象可被回收时，如果需要执行该对象的 finalize() 方法，那么就有可能在该方法中让对象重新被引用，从而实现自救。自救只能进行一次，如果回收的对象之前调用了 finalize() 方法自救，后面回收时不会再调用该方法。

### 5.垃圾收集算法

#### 标记-清除算法（Mark-Sweep）

分为标记和清除两个阶段。首先标记出所有需要回收的对象，在标记完成后统一回收被标记的对象。

**缺点:**

效率问题：标记和清除过程的效率都不高。

空间问题：标记清除之后会`产生大量不连续的内存碎片`，空间碎片太多可能导致，程序分配较大对象时无法找到足够的连续内存，不得不提前出发另一次垃圾收集动作。

![image-20210616124530223.png](https://gitee.com/linqin07/pic/raw/master/image-20210616124530223.png)

#### 复制算法（Copying）- `新生代`

将可用内存按容量划分为大小相等的两块，每次只使用其中一块。当这一块的内存用完了，就将存活着的对象复制到另一块上面，然后再把已经使用过的内存空间一次清理掉。

**优点**

复制算法使得每次都是针对其中的一块进行内存回收，内存分配时也不用考虑内存碎片等复杂情况，只要移动堆顶指针，按顺序分配内存即可，实现简单，运行高效。

**缺点**

将内存缩小为原来的一半。在对象存活率较高时，需要执行较多的复制操作，效率会变低。

![image-20210610185436515.png](https://gitee.com/linqin07/pic/raw/master/image-20210610185436515.png)

**应用**

商业的虚拟机都采用复制算法来回收新生代。因为新生代中的对象容易死亡，所以并不需要按照1:1的比例划分内存空间，而是将内存分为一块较大的 Eden 空间和两块较小的 Survivor 空间。每次使用 Eden 和其中的一块 Survivor。

当回收时，将 Eden 和 Survivor 中还存活的对象一次性拷贝到另外一块 Survivor 空间上，最后清理掉 Eden 和刚才用过的 Survivor 空间。Hotspot 虚拟机默认 Eden 和 Survivor 的大小比例是8:1，也就是每次新生代中可用内存空间为整个新生代容量的90%（80% + 10%），只有10%的内存是会被“浪费”的。

#### 标记-整理算法（Mark-Compact）-`老年代`

标记过程仍然与“标记-清除”算法一样，但不是直接对可回收对象进行清理，而是让所有存活的对象向一端移动，然后直接清理掉边界以外的内存。

![image-20210610185450582.png](https://gitee.com/linqin07/pic/raw/master/image-20210610185450582.png)

#### 分代收集算法

根据对象的存活周期，将内存划分为几块。一般是把 Java 堆分为新生代和老年代，这样就可以根据各个年代的特点，采用最适当的收集算法。

- 新生代：每次垃圾收集时会有大批对象死去，只有少量存活，所以选择复制算法，只需要少量存活对象的复制成本就可以完成收集。
- 老年代：对象存活率高、没有额外空间对它进行分配担保，必须使用“标记-清理”或“标记-整理”算法进行回收。

### 6. SafePoint 是什么

java 一直运行着很多不停的线程，要对这些线程进行产生的 heap、stack进行 GC。运行中的线程是不稳定的。safepoint 就是一个安全点，所有的线程执行到安全点的时候就会去检查是否需要执行 safepoint 操作，如果需要执行，那么所有的线程都将会等待，直到所有的线程进入safepoint。

安全点一般在什么位置？

- 循环的末尾 (防止大循环的时候一直不进入 safepoint，而其他线程在等待它进入
  safepoint)

- 方法返回前

- 调用方法的 call 之后

- 抛出异常的位置



## 引用类型

无论是通过引用计数算法判断对象的引用数量，还是通过可达性分析算法判断对象是否可达，判定对象是否可被回收都与引用有关。

Java 提供了四种强度不同的引用类型。

### 1. 强引用

被强引用关联的对象不会被回收。

使用 new 一个新对象的方式来创建强引用。

```java
Object obj = new Object();
```

### 2. 软引用

被软引用关联的对象只有在内存不够的情况下才会被回收。

使用 SoftReference 类来创建软引用。

```java
Object obj = new Object();
SoftReference<Object> sf = new SoftReference<Object>(obj);
obj = null;  // 使对象只被软引用关联
```

### 3. 弱引用

被弱引用关联的对象一定会被回收，也就是说它只能存活到下一次垃圾回收发生之前。

使用 WeakReference 类来创建弱引用。

```java
Object obj = new Object();
WeakReference<Object> wf = new WeakReference<Object>(obj);
obj = null;
```

### 4. 虚引用

又称为幽灵引用或者幻影引用，一个对象是否有虚引用的存在，不会对其生存时间造成影响，也无法通过虚引用得到一个对象。

为一个对象设置虚引用的唯一目的是能在这个对象被回收时收到一个系统通知。

使用 PhantomReference 来创建虚引用。

```java
Object obj = new Object();
PhantomReference<Object> pf = new PhantomReference<Object>(obj, null);
obj = null;
```



## 类与类加载器

两个类相等，需要类本身相等，并且使用同一个类加载器进行加载。这是因为每一个类加载器都拥有一个独立的类`命名空间`。

这里的相等，包括类的 Class 对象的 equals() 方法、isAssignableFrom() 方法、isInstance() 方法的返回结果为 true，也包括使用 instanceof 关键字做对象所属关系判定结果为 true。

### 类加载器分类

从 Java 虚拟机的角度来讲，只存在以下两种不同的类加载器：

- 启动类加载器（Bootstrap ClassLoader），使用 C++ 实现，是虚拟机自身的一部分；

- 所有其它类的加载器，使用 Java 实现，独立于虚拟机，继承自抽象类 java.lang.ClassLoader。

从 Java 开发人员的角度看，类加载器可以划分得更细致一些：

- 启动类加载器（Bootstrap ClassLoader）此类加载器负责将存放在 &lt;JRE_HOME>\lib 目录中的，或者被 -Xbootclasspath 参数所指定的路径中的，并且是虚拟机识别的（仅按照文件名识别，如 rt.jar，名字不符合的类库即使放在 lib 目录中也不会被加载）类库加载到虚拟机内存中。启动类加载器无法被 Java 程序直接引用，用户在编写自定义类加载器时，如果需要把加载请求委派给启动类加载器，直接使用 null 代替即可。

- 扩展类加载器（Extension ClassLoader）这个类加载器是由 ExtClassLoader（sun.misc.Launcher$ExtClassLoader）实现的。它负责将 &lt;JAVA_HOME>/lib/ext 或者被 java.ext.dir 系统变量所指定路径中的所有类库加载到内存中，开发者可以直接使用扩展类加载器。

- 应用程序类加载器（Application ClassLoader）这个类加载器是由 AppClassLoader（sun.misc.Launcher$AppClassLoader）实现的。由于这个类加载器是 ClassLoader 中的 getSystemClassLoader() 方法的返回值，因此一般称为系统类加载器。它负责加载用户类路径（ClassPath）上所指定的类库，开发者可以直接使用这个类加载器，如果应用程序中没有自定义过自己的类加载器，一般情况下这个就是程序中默认的类加载器。

<div data="modify <--"></div>
### 双亲委派模型

应用程序是由三种类加载器互相配合从而实现类加载，除此之外还可以加入自己定义的类加载器。

下图展示了类加载器之间的层次关系，称为双亲委派模型（Parents Delegation Model）。该模型要求除了顶层的启动类加载器外，其它的类加载器都要有自己的父类加载器。这里的父子关系一般通过组合关系（Composition）来实现，而不是继承关系（Inheritance）。

![image-20210616124551204.png](https://gitee.com/linqin07/pic/raw/master/image-20210616124551204.png)

### 1. 工作过程

一个类加载器首先将类加载请求转发到父类加载器，只有当父类加载器无法完成时才尝试自己加载。

### 2. 好处

使得 Java 类随着它的类加载器一起具有一种带有优先级的层次关系，从而使得基础类得到统一。

例如 java.lang.Object 存放在 rt.jar 中，如果编写另外一个 java.lang.Object 并放到 ClassPath 中，程序可以编译通过。由于双亲委派模型的存在，所以在 rt.jar 中的 Object 比在 ClassPath 中的 Object 优先级更高，这是因为 rt.jar 中的 Object 使用的是启动类加载器，而 ClassPath 中的 Object 使用的是应用程序类加载器。rt.jar 中的 Object 优先级更高，那么程序中所有的 Object 都是这个 Object。

### 3.源码解析

```java
 protected Class<?> loadClass(String name, boolean resolve)
        throws ClassNotFoundException
    {
        synchronized (getClassLoadingLock(name)) {
            // First, check if the class has already been loaded
            Class<?> c = findLoadedClass(name);
            if (c == null) {
                long t0 = System.nanoTime();
                try {
                    if (parent != null) {
                        c = parent.loadClass(name, false);
                    } else {
                        c = findBootstrapClassOrNull(name);
                    }
                } catch (ClassNotFoundException e) {
                    // ClassNotFoundException thrown if class not found
                    // from the non-null parent class loader
                }

                if (c == null) {
                    // If still not found, then invoke findClass in order
                    // to find the class.
                    long t1 = System.nanoTime();
                    c = findClass(name);

                    // this is the defining class loader; record the stats
                    sun.misc.PerfCounter.getParentDelegationTime().addTime(t1 - t0);
                    sun.misc.PerfCounter.getFindClassTime().addElapsedTimeFrom(t1);
                    sun.misc.PerfCounter.getFindClasses().increment();
                }
            }
            if (resolve) {
                resolveClass(c);
            }
            return c;
        }
    }
```

加载每个类路径，首先判断类是否被加载过，然后如果还有父类加载器，转交给父加载器直接，否则自己加载。如果加载结果为空，使用自定义加载器。`findClass`就是提供出来可以修改的方法。

双亲委派：加载类的顺序肯定是按照 `bootstrap(<JRE_HOME>\lib) > extend(<JAVA_HOME>/lib/ext) > application(ClassPath)` 如果都找不到类，才会使用自定义的类加载器去加载

场景：比如同时要加载两个es版本，同时引入会报错。只能先引入一个，另一个换个lib文件夹放jar包并使用自定义类加载器加载使用。

### 4.自定义类加载

打破双亲委派模型，那么就重写整个 loadClass 方法。不想打破双亲委派模型，那么只需要重写 findClass 方法即可

```java
public class FileSystemClassLoader extends ClassLoader {

    private String rootDir;

    public FileSystemClassLoader(String rootDir) {
        this.rootDir = rootDir;
    }
 //不想打破双亲委派模型，那么只需要重写findClass方法即可
    protected Class<?> findClass(String name) throws ClassNotFoundException {
        byte[] classData = getClassData(name);
        if (classData == null) {
            throw new ClassNotFoundException();
        } else {
            return defineClass(name, classData, 0, classData.length);
        }
    }

    private byte[] getClassData(String className) {
        String path = classNameToPath(className);
        try {
            InputStream ins = new FileInputStream(path);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            int bufferSize = 4096;
            byte[] buffer = new byte[bufferSize];
            int bytesNumRead;
            while ((bytesNumRead = ins.read(buffer)) != -1) {
                baos.write(buffer, 0, bytesNumRead);
            }
            return baos.toByteArray();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    private String classNameToPath(String className) {
        return rootDir + File.separatorChar
                + className.replace('.', File.separatorChar) + ".class";
    }
}
```

测试类

```java
FileSystemClassLoader fileSystemClassLoader = new FileSystemClassLoader("D:\\IDEAWorkspace\\Java基础知识\\SPI\\src\\main\\java");
        Class<?> person = fileSystemClassLoader.loadClass("org.example.bean.Person");
        Object o1 = person.newInstance();
        System.out.println(o1);
        System.out.println(o1.getClass().getClassLoader());
```



### 5.项目中使用类加载

使用情景：引入多个es客户端，引入多个kafka客户端。下面举例子使用自定义类加载引入es多个版本。

定义一个 common 模块最高层的接口，接口要实现es要做的所有事情集合，定义获取接口的工厂类，根据相应的参数判断选择加载不同模块的代码。

定义模块 es6 去实现这个common的接口，maven 内引入直接实现即可，包括所有需要的es依赖都可以引入进来。该模块提供工厂提供对外使用的 EsClient，并且这个 EsClient 不能使用 spring 注入，外部使用也不能依赖引入es6模块，否则便是 AppClassLoader 加载的。

web 模块里面使用 es 工厂类进行获取es操作。这样每个模块就解耦了。

最后打包 es6 后，包含 lib 同时排除依赖的 common 模块(不然反射由于参数非此类加载器加载的类，即使同名也不是一个东西)。这些 lib 放到指定路径下面由类加载进行加载（不同命名空间）

> tips: web项目中，由控制器进入往往是由继承 AppClassLoader 的 TomcatClassLoader 进行加载的。而网名通过模块去访问的是另外一个类加载器，直接请求会报错大量的 noclassfound、nodefclass。这时，我们往往只要把线程的类加载器主动设置一下就可以了 Thread.currentThread().setContextClassLoader(youclassLoader)



项目结构：

![image-20210610185617847.png](https://gitee.com/linqin07/pic/raw/master/image-20210610185617847.png)

项目地址



### Java 类的链接

Java类的链接指的是将Java类的二进制代码合并到JVM的运行状态之中的过程。在链接之前，这个类必须被成功加载。类的链接包括`验证、准备和解析`等几个步骤。验证是用来确保Java类的二进制表示在结构上是完全正确的。如果验证过程出现错误的话，会抛出  java.lang.VerifyError错误。

准备过程则是创建Java类中的静态域，并将这些域的值设为默认值。准备过程并不会执行代码。在一个Java类中会包含对其它类或接口的形式引用，包括它的父类、所实现的接口、方法的形式参数和返回值的Java类等。解析的过程就是确保这些被引用的类能被正确的找到。解析的过程可能会导致其它的 Java类被加载。不同的 JVM  实现可能选择不同的解析策略。

一种做法是在链接的时候，就递归的把所有依赖的形式引用都进行解析。而另外的做法则可能是只在一个形式引用真正需要的时候才进行解析。也就是说如果一个 Java 类只是被引用了，但是并没有被真正用到，那么这个类有可能就不会被解析。考虑下面的代码：

```java
public class LinkTest {
 public static void main(String[] args) {
  ToBeLinked toBeLinked = null;
  System.out.println("Test link.");
 }
}
```

类LinkTest 引用了类 ToBeLinked，但是并没有真正使用它，只是声明了一个变量，并没有创建该类的实例或是访问其中的静态域。

在  Oracle 的 JDK 6 中，如果把编译好的 ToBeLinked 的 Java 字节代码删除之后，再运行  LinkTest，程序不会抛出错误。这是因为 ToBeLinked 类没有被真正用到，而 Oracle 的 JDK 6  所采用的链接策略使得ToBeLinked 类不会被加载，因此也不会发现 ToBeLinked 的 Java  字节代码实际上是不存在的。如果把代码改成 ToBeLinked toBeLinked = new  ToBeLinked();之后，再按照相同的方法运行，就会抛出异常了。因为这个时候 ToBeLinked 这个类被真正使用到了，会需要加载这个类。



## JVM-逃逸分析

定义
一个对象在方法中被定义，但却被方法以外的其他代码使用。

Java中的对象不一定是在堆上分配的，因为JVM通过逃逸分析，能够分析出一个新对
象的使用范围，并以此确定是否要将这个对象分配到堆上。如果JVM发现某些对象没有逃逸出方法，就
很有可能被优化成在栈上分配。

所以，并不是所有的对象和数组，都是在堆上进行分配的，由于即时编译的存在，如果JVM发现某些对
象没有逃逸出方法，就很有可能被优化成在栈上分配。

### 逃逸分析具体配置项如下：

- 开启逃逸分析（JDK8中，逃逸分析默认开启。）
  `-XX:+DoEscapeAnalysis`
- 关闭逃逸分析
  `-XX:-DoEscapeAnalysis`
- 逃逸分析结果展示
  `-XX:+PrintEscapeAnalysis`



### 逃逸分析优点

- 对象栈上分配

  JVM通过逃逸分析，分析出新对象的使用范围，就可能将对象在栈上进行分配。栈分配可以快速地在栈
  帧上创建和销毁对象，不用再将对象分配到堆空间，可以有效地减少 JVM 垃圾回收的压力

- 分离对象标量替换

  把无法逃逸的对象进行拆分为不可拆分的标量（成员变量），使用标量替换整个对象（标量替换）

- 消除同步锁

  锁消除：如果JVM通过逃逸分析，发现一个对象只能从一个线程被访问到，则访问这个对象时，可以不加同步
  锁。如果程序中使用了synchronized锁，则JVM会将synchronized锁消除

  锁粗化：把一个方法里面多个synchronize代码快粗化为一个。



### 案例

返回参数导致逃逸

```java
public class ObjectReturn {
    public User createUser() {
        User user = new User();
        return user;
    }
}
```

方法变量外部使用

```
public class ObjectEscape {
    private User user;

    public void init() {
        user = new User();
    }
}

```

测试

```java
public class Test {
    public static void main(String[] args) throws IOException {
        User user = null;
        long start = System.currentTimeMillis();

        for (int i = 0; i < 1000000; i++) {
            // new ObjectEscape().init();
            user =  new ObjectReturn().createUser();
        }
        long end = System.currentTimeMillis();
        System.out.println("cost: " + (end - start));

        System.out.println("==== APP  STARTED ====");
        RuntimeMXBean runtime = ManagementFactory.getRuntimeMXBean();
        String name = runtime.getName();
        System.out.println(name);
        System.out.println("Process ID: " + name.substring(0, name.indexOf("@")));
        System.in.read();
    }
}
```

增加 jvm 配置 -Xmx1G -XX:-DoEscapeAnalysis -XX:+PrintGCDetails -XX:+EliminateAllocations

可以发现不开启逃逸分析 jmap -histo PID 结果

```
 num     #instances         #bytes  class name
----------------------------------------------
   1:       1000000       16000000  ObjectReturn
   2:       1000000       16000000  User
```

开启后

```
 num     #instances         #bytes  class name
----------------------------------------------
   1:           695        3325072  [I
   2:        143359        2293744  ObjectReturn
   3:        143359        2293744  User

```

可以看到对象变少了，同时 cost 也变快了。