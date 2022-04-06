

## 读取文件数据操作

![image-20210610213620832.png](https://blog-07.oss-cn-guangzhou.aliyuncs.com/picBak/image-20210610213620832.png)

传统的读取文件数据并发送到网络的步骤如下：

1. 操作系统将数据从`磁盘`文件中读取到`内核空间`的页面缓存；
2. 应用程序将数据从内核空间读入`用户空间缓冲区`；
3. 应用程序将读到数据写回内核空间并放入socket缓冲区；
4. 操作系统将数据从socket缓冲区复制到网卡接口，此时数据才能通过网络发送



## 零拷贝提供了两种方式：

- mmap+write

  即将一个文件或者其它对象映射到进程的地址空间，实现文件磁盘地址和进程虚拟地址空间中一段虚拟地址的一一对映关系；这样就可以省掉原来内核read缓冲区copy数据到用户缓冲区

- sendfile

  将读到内核空间的数据，转到 socket buffer，进行网络发送

### **Memory Mapped Files**

简称 mmap，简单描述其作用就是：将磁盘文件映射到内存, 用户通过修改内存就能修改磁盘文件。
它的工作原理是直接利用操作系统的Page来实现文件到物理内存的直接映射。完成映射之后你对物理内存的操作会被同步到硬盘上（操作系统在适当的时候）。

通过 mmap，进程像读写硬盘一样读写内存（当然是虚拟机内存），也不必关心内存的大小有虚拟内存为我们兜底。
使用这种方式可以获取很大的I/O提升，省去了用户空间到内核空间复制的开销。

mmap 也有一个很明显的缺陷——不可靠，写到 mmap 中的数据并没有被真正的写到硬盘，操作系统会在程序主动调用flush的时候才把数据真正的写到硬盘。Kafka 提供了一个参数—— producer.type 来控制是不是主动 flush；如果 Kafka 写入到 mmap 之后就立即 flush 然后再返回 Producer 叫同步 (sync)；写入 mmap 之后立即返回 Producer 不调用flush叫异步 (async)。

## Java零拷贝

### 1.MappedByteBuffer

java nio 提供的 FileChannel 提供了 map() 方法，该方法可以在一个打开的文件和 MappedByteBuffer 之间建立一个虚拟内存映射，MappedByteBuffer 继承于 ByteBuffer，类似于一个基于内存的缓冲区，只不过该对象的数据元素存储在磁盘的一个文件中；

调用 `get()` 方法会从磁盘中获取数据，此数据反映该文件当前的内容，调用`put()`方法会更新磁盘上的文件，并且对文件做的修改对其他阅读者也是可见的；

```java
public class MappedByteBufferTest {
    public static void main(String[] args) throws IOException {
        File file = new File("D:\\certs\\证书使用说明.txt");
        long len = file.length();
        byte[] ds = new byte[(int) len];
        // 映射到内存
        MappedByteBuffer mappedByteBuffer = new FileInputStream(file).getChannel().map(FileChannel.MapMode.READ_ONLY, 0,
                len);
        for (int offset = 0; offset < len; offset++) {
            byte b = mappedByteBuffer.get();
            ds[offset] = b;
        }
        Scanner scan = new Scanner(new ByteArrayInputStream(ds)).useDelimiter(",");
        while (scan.hasNext()) {
            System.out.print(scan.next() + " ");
        }
    }
}
```

### 2.Channel-to-Channel 传输

经常需要从一个位置将文件传输到另外一个位置，FileChannel提供了transferTo()方法用来提高传输的效率

```java
public class ChannelTransfer {
    public static void main(String[] args) throws IOException {
        FileInputStream fis = new FileInputStream("D:\\certs\\证书使用说明.txt");
        FileChannel channel = fis.getChannel();
        //transferTo()允许将一个通道交叉连接到另一个通道，而不需要一个中间缓冲区来传递数据
        channel.transferTo(0, channel.size(), Channels.newChannel(System.out));
        channel.close();
        fis.close();
    }
}
```