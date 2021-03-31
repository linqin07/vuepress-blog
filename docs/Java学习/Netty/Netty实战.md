## 一、Netty 异步和事件驱动

### 1.1 java 网络编程

最早期的 Java API（java.net）只支持由本地系统套接字（Socket）库提供的所谓的阻塞函数。这段代码片段将只能同时处理一个连接，要管理多个并发客户端，需要为每个新的客户端
Socket 创建一个新的 Thread。

### 1.2 Java NIO

使用上了选择器，进行选择空闲的 socket 连接。

![使用了选择器的非阻塞IO](https://i.loli.net/2021/03/31/EQor69SdpWsy2u5.png)

### 1.3 Netty 核心组件

- Channel

  目前，可以把 Channel 看作是传入（入站）或者传出（出站）数据的载体。因此，它可以
  被打开或者被关闭，连接或者断开连接。在内部，将会为每个 Channel 分配一个 EventLoop，用以处理所有事件

- 回调

  一个回调其实就是一个方法，一个指向已经被提供给另外一个方法的方法的引用。指定执行该有的顺序。

- Future

  Future 提供了另一种在操作完成时通知应用程序的方式。

- 事件和 ChannelHandler

  具体的处理。

## 二、开发你的第一款Netty应用程序

### 2.1 编写Echo服务器处理逻辑

EchoServerHandler 简单打印一下接收到的消息， channelRead 表示接收消息，可以看到 msg 转换成了ByteBuf，然后打印，也就是把Client传过来的消息打印了一下，你会发现每次打印完后，channelReadComplete也会调用，如果你试着传一个超长的字符串过来，超过 1024 个字母长度，你会发现 channelRead 会调用多次，而c hannelReadComplete 只调用一次。

所以这就比较清晰了吧，因为 ByteBuf 是有长度限制的，所以超长了，就会多次读取，也就是调用多次channelRead，而 channelReadComplete 则是每条消息只会调用一次，无论你多长，分多少次读取，只在该条消息最后一次读取完成的时候调用。

```java
/**
 * 标示一个Channel-Handler 可以被多个 Channel 安全地共享
 */
@ChannelHandler.Sharable
public class EchoServerHandler extends ChannelInboundHandlerAdapter {
    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) {
        ByteBuf in = (ByteBuf) msg;
        System.out.println(
                "Server received: " + in.toString(CharsetUtil.UTF_8));
        ctx.write(in);
    }

    @Override
    public void channelReadComplete(ChannelHandlerContext ctx) {
        //  通知ChannelInboundHandler最后一次对channelRead()的调用是当前批量读取中的最后一条消息；
        ctx.writeAndFlush(Unpooled.EMPTY_BUFFER)
           .addListener(ChannelFutureListener.CLOSE);
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx,
            Throwable cause) {
        cause.printStackTrace();
        ctx.close();
    }
}
```

### 2.2 引导服务器

```java
public class EchoServer {
    private final int port;

    public EchoServer(int port) {
        this.port = port;
    }

    public static void main(String[] args) throws Exception {
        int port = 8080;
        new EchoServer(port).start();
    }

    public void start() throws Exception {
        final EchoServerHandler serverHandler = new EchoServerHandler();
        // 创建Event-LoopGroup
        EventLoopGroup group = new NioEventLoopGroup();
        try {
            // 创建ServerBootstrap
            ServerBootstrap b = new ServerBootstrap();
            b.group(group)
             .channel(NioServerSocketChannel.class)
             .localAddress(new InetSocketAddress(port))
             .childHandler(new ChannelInitializer<SocketChannel>() {
                 @Override
                 public void initChannel(SocketChannel ch)
                         throws Exception {
                     ch.pipeline().addLast(serverHandler);
                 }
             });
            ChannelFuture f = b.bind().sync();
            f.channel().closeFuture().sync();
        } finally {
            group.shutdownGracefully().sync();
        }
    }
}
```

### 2.3 编写Echo客户端处理逻辑

```java
@ChannelHandler.Sharable
public class EchoClientHandler extends SimpleChannelInboundHandler<ByteBuf> {


    @Override
    protected void channelRead0(ChannelHandlerContext channelHandlerContext, ByteBuf byteBuf) throws Exception {
        // 记录已接收,消息的转储
        System.out.println(
                "Client received: " + byteBuf.toString(CharsetUtil.UTF_8));
    }

    @Override
    public void channelReadComplete(ChannelHandlerContext ctx) throws Exception {
        super.channelReadComplete(ctx);
    }

    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        // 被通知 Channel
        // 是活跃的时候，发
        // 送一条消息
        ctx.writeAndFlush(Unpooled.copiedBuffer("Netty rocks!",
                CharsetUtil.UTF_8));
        // super.channelActive(ctx);
    }

}
```

### 2.4 引导服务器

```java
public class EchoClient {
    private final String host;
    private final int port;

    public EchoClient(String host, int port) {
        this.host = host;
        this.port = port;
    }

    public static void main(String[] args) throws Exception {
        String host = "127.0.0.1";
        int port = 8080;
        new EchoClient(host, port).start();
    }

    public void start() throws Exception {
        EventLoopGroup group = new NioEventLoopGroup();
        try {
            Bootstrap b = new Bootstrap();
            b.group(group)
             .channel(NioSocketChannel.class)
             .remoteAddress(new InetSocketAddress(host, port))
             .handler(new ChannelInitializer<SocketChannel>() {
                 @Override
                 public void initChannel(SocketChannel ch)
                         throws Exception {
                     ch.pipeline().addLast(
                             new EchoClientHandler());
                 }
             });
            ChannelFuture f = b.connect().sync();
            f.channel().closeFuture().sync();
        } finally {
            group.shutdownGracefully().sync();
        }
    }
}
```

## 三、Netty的组件和设计

### 3.1 Channel 接口

基本的 I/O 操作（bind()、connect()、read()和 write()）依赖于底层网络传输所提
供的原语。在基于 Java 的网络编程中，其基本的构造是 class Socket。Netty 的 Channel 接
口所提供的 API，大大地降低了直接使用 Socket 类的复杂性。此外，Channel 也是拥有许多
预定义的、专门化实现的广泛类层次结构的根，下面是一个简短的部分清单：

- EmbeddedChannel 
- LocalServerChannel
- NioDatagramChannel
- NioSctpChannel 
- NioSocketChannel 

### 3.2 EventLoop 接口

图 3-1
在高层次上说明了 Channel、EventLoop、Thread 以及 EventLoopGroup 之间的关系

![netty模型处理关系](https://i.loli.net/2021/03/31/1hpDKGbzCMmtfqj.png)

- 一个 EventLoopGroup 包含一个或者多个 EventLoop
- 一个 EventLoop 在它的生命周期内只和一个 Thread 绑定
- 所有由 EventLoop 处理的 I/O 事件都将在它专有的 Thread 上被处理
- 一个 Channel 在它的生命周期内只注册于一个 EventLoop
- 一个 EventLoop 可能会被分配给一个或多个 Channel

### 3.3 ChannelFuture 接口

Netty 中所有的 I/O 操作都是异步的。因为一个操作可能不会
立即返回，所以我们需要一种用于在之后的某个时间点确定其结果的方法。为此，Netty 提供了
ChannelFuture 接口，其 addListener()方法注册了一个 ChannelFutureListener，以
便在某个操作完成时（无论是否成功）得到通知。

### 3.4 ChannelHandler 和 ChannelPipeline

Netty 的主要组件是 ChannelHandler，它充当了所有
处理入站和出站数据的应用程序逻辑的容器。

ChannelPipeline 为 ChannelHandler 链提供了容器。

一个 ChannelPipeline 装着多个 ChannelHandler

![image-20210220124610746](https://i.loli.net/2021/03/31/SelfMmTrw8tVoAp.png)

经常使用到的适配器类

- ChannelHandlerAdapter

- ChannelInboundHandlerAdapter 
- ChannelOutboundHandlerAdapter
- ChannelDuplexHandler

## 四、传输

- OIO——阻塞传输 OioServerSocketChannel

- NIO——异步传输 NioServerSocketChannel

- Local——JVM 内部的异步通信

  用于在同一个 JVM 中运行的客户端和服务器程序之间的异步通信

- Embedded——测试你的 ChannelHandle

> 零拷贝
> 零拷贝（zero-copy）是一种目前只有在使用 NIO 和 Epoll 传输时才可使用的特性。它使你可以快速
> 高效地将数据从文件系统移动到网络接口，而不需要将其从内核空间复制到用户空间，其在像 FTP 或者
> HTTP 这样的协议中可以显著地提升性能。但是，并不是所有的操作系统都支持这一特性。

## 五、ByteBuf

### 5.1 数据结构

ByteBuf 维护了两个不同的索引：一个用于读取，一个用于写入。当你从 ByteBuf 读取时，
它的 readerIndex 将会被递增已经被读取的字节数。同样地，当你写入 ByteBuf 时，它的
writerIndex 也会被递增。名称以 read 或者 write 开头的 ByteBuf 方法，将会推进其对应的索引，而名称以 set 或
者 get 开头的操作则不会。

![ByteBuf数据结构](https://i.loli.net/2021/03/31/GWSqEs2Z9lFYtcI.png)

### 5.2 ByteBuf的使用模式

- 堆缓冲区(数组)

  数据存储在JVM的堆中可以快速创建和快速释放，并且提供了数组的直接快速访问的方法

  ```java
  ByteBuf heapBuf = ...;
  // 检查 ByteBuf 是否有一个支撑数组
  if (heapBuf.hasArray()) { 
  byte[] array = heapBuf.array();
  int offset = heapBuf.arrayOffset() + heapBuf.readerIndex();
  int length = heapBuf.readableBytes();
  handleArray(array, offset, length); //使用数组、偏移量和长度作为参数调用你的方法
  }
  ```

- 直接缓冲区

  数据直接在内存中，不存在从JVM拷贝数据到直接缓冲区的过程，性能好

  ```java
  ByteBuf directBuf = ...;
  if (!directBuf.hasArray()) {
  int length = directBuf.readableBytes();
  byte[] array = new byte[length];
  directBuf.getBytes(directBuf.readerIndex(), array);
  handleArray(array, 0, length); //使用数组、偏移量和长度作为参数调用你的方法
  }
  ```

- 复合缓冲区

  Netty 通过一个 ByteBuf 子类——CompositeByteBuf ——实现了这个模式，它提供了一
  个将多个缓冲区表示为单个合并缓冲区的虚拟表示。

  ![image-20210226125517009](https://i.loli.net/2021/03/31/bVrDpBvzgNqAesj.png)

  

常用方法：

```java
        ByteBuf byteBuf = Unpooled.copiedBuffer("hello netty! 123", Charset.defaultCharset());

        // 遍历方式1
        for (int i = 0; i < byteBuf.capacity(); i++) {
            System.out.println((char) byteBuf.getByte(i));
        }
        // 遍历方式2
        System.out.println("----------------------");
        while (byteBuf.isReadable()) {
            System.out.println((char) byteBuf.readByte());
        }

        // 切片，对元数据进行操作会影响本体,切割后元数据也就剩下那么多了
        ByteBuf slice = byteBuf.slice(0, 11);
        System.out.println(slice.toString(Charset.defaultCharset()));
        byteBuf.setByte(0, (byte) 'H');
        System.out.println(slice.toString(Charset.defaultCharset()));

        // 复制的场景，不影响本体
        ByteBuf copy = byteBuf.copy(0, 11);
        System.out.println(copy.toString(Charset.defaultCharset()));
        byteBuf.setByte(0, (byte) 'H');
        System.out.println(copy.toString(Charset.defaultCharset()));
```

### 5.3 Unpooled 缓冲区

可能某些情况下，你未能获取一个到 ByteBufAllocator 的引用。对于这种情况，Netty 提
供了一个简单的称为 Unpooled 的工具类，它提供了静态的辅助方法来创建未池化的 ByteBuf
实例。

| 名 称                                                        | 描 述                                           |
| ------------------------------------------------------------ | ----------------------------------------------- |
| buffer()<br/>buffer(int initialCapacity)<br/>buffer(int initialCapacity, int maxCapacity) | 返回一个未池化的基于堆内存存储的<br/>ByteBuf    |
| directBuffer()<br/>directBuffer(int initialCapacity)<br/>directBuffer(int initialCapacity, int maxCapacity) | 返回一个未池化的基于直接内存存储<br/>的 ByteBuf |
| wrappedBuffer()                                              | 返回一个包装了给定数据的 ByteBuf                |
| copiedBuffer()                                               | 返回一个复制了给定数据的 ByteBuf                |



## 六、ChannelHandler和ChannelPipeline

### 6.1 ChannelPipeline 接口

如果你认为ChannelPipeline是一个拦截流经Channel的入站和出站事件的Channel-
Handler 实例链

![image-20210226171149682](https://i.loli.net/2021/03/31/KH6I8ithfrTS5cA.png)

通过调用 ChannePipeline 上的相关方法， ChannelHandler 可以添加、删除或者替换其他
的 ChannelHandler，从而实时地修改 ChannelPipeline 的布局。（它也可以将它自己从
ChannelPipeline 中移除。）这是 ChannelHandler 最重要的能力之一，所以我们将仔细地来看
看它是如何做到的。

```java
ChannelPipeline pipeline = ..;
FirstHandler firstHandler = new FirstHandler();
pipeline.addLast("handler1", firstHandler);
pipeline.addFirst("handler2", new SecondHandler());
pipeline.addLast("handler3", new ThirdHandler());
...
pipeline.remove("handler3");
pipeline.remove(firstHandler);
pipeline.replace("handler2", "handler4", new ForthHandler());
```

> Handle的方法实现顺序
>
> 1. channelRegistered
> 2. channelActive
> 3. channelRead
> 4. channelReadComplete
> 5. channelInactive
> 6. channelUnregistered



### 6.2 ChannelPipeline触发事件

ChannelPipeline的API公开了用于调用入站和出站操作的附加方法：

ChannelPipeline的入站操作：

| 方法名称                      | 描述                                                         |
| ----------------------------- | ------------------------------------------------------------ |
| fireChannelRegistered         | 调用ChannelPipeline中下一个ChannelInboundHandler的channelRegistered(ChannelHandlerContext)方法 |
| fireChannelUnregistered       | 调用ChannelPipeline中下一个ChannelInboundHandler的fireChannelUnregistered(ChannelHandlerContext)方法 |
| fireChannelActive             | 调用ChannelPipeline中下一个ChannelInboundHandler的fireChannelActive(ChannelHandlerContext)方法 |
| fireChannelInactive           | 调用ChannelPipeline中下一个ChannelInboundHandler的fireChannelInactive(ChannelHandlerContext)方 |
| fireExceptionCaught           | 调用ChannelPipeline中下一个ChannelInboundHandler的fireExceptionCaught(ChannelHandlerContext)方法 |
| fireUserEventTriggered        | 调用ChannelPipeline中下一个ChannelInboundHandler的fireUserEventTriggered(ChannelHandlerContext)方法 |
| `fireChannelRead`             | 调用ChannelPipeline中下一个ChannelInboundHandler的fireChannelRead(ChannelHandlerContext)方法 |
| fireChannelReadComplete       | 调用ChannelPipeline中下一个ChannelInboundHandler的fireChannelReadComplete(ChannelHandlerContext)方法 |
| fireChannelWritabilityChanged | 调用ChannelPipeline中下一个ChannelInboundHandler的fireChannelWritabilityChanged(ChannelHandlerContext)方法 |

### 6.3 使用 ChannelHandlerContext

```java
@Sharable
public class SharableHandler extends ChannelInboundHandlerAdapter {
@Override
public void channelRead(ChannelHandlerContext ctx, Object msg) {
System.out.println("Channel read message: " + msg);
ctx.fireChannelRead(msg);
}
}
```
