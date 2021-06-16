## 什么是WebService?

WebService 其实就是大家经常说的**接口**的一种实现方式。通过**接口**不同的系统可以进行数据交互。

### 1.IDEA构建WebService服务

![webService](F:\hexo\vuepress\docs\.vuepress\picBak\1597728150753.png)

完成后默认有一个 HelloWorld.java，启动访问 http://localhost:9000/HelloWorld`?wsdl` 可以看到 xml

```java
@WebService()
public class HelloWorld {
  @WebMethod
  public String sayHelloWorldFrom(String from) {
    String result = "Hello, world, from " + from;
    System.out.println(result);
    return result;
  }
  public static void main(String[] argv) {
    Object implementor = new HelloWorld ();
    String address = "http://localhost:9000/HelloWorld";
    Endpoint.publish(address, implementor);
  }
}
```

### 2.wsdl 文件生成客户端、服务端代码

另存 http://localhost:9000/HelloWorld?wsdl 为 wsdl 格式，下载 apache-cxf 解压在 bin 目录下执行命令

```cmd
wsdl2java -encoding utf8 -p client -d D:\IDEAWorkspace\Java基础知识\WebService\src -all E:\ChromeDownload\HelloWorld.wsdl
```

使用
wsdl2java.bat用法：

wsdl2java -encoding utf8 –p com.jdf –d F:\xxx\src\main\java -all xx.wsdl

- -p指定wsdl的命名空间，也就是要生成代码的包名

- -d指令要生成代码所在目录

- -client生成客户端测试web service的代码

- -server生成服务器启动web service代码

- -impl生成web service的实现代码，我们在方式一用的就是这个

- -ant生成build.xml文件

- -all生成所有开始端点代码。

文件目录 client 为生成代码

```powershell
WebService
│  WebService.iml
│
└─src
    │  build.xml
    │
    ├─client
    │      HelloWorld.java
    │      HelloWorldPortImpl.java
    │      HelloWorldService.java
    │      HelloWorld_HelloWorldPort_Client.java
    │      HelloWorld_HelloWorldPort_Server.java
    │      ObjectFactory.java
    │      package-info.java
    │      SayHelloWorldFrom.java
    │      SayHelloWorldFromResponse.java
    │
    └─example
            HelloWorld.java
```



::: warning 注意

1. 生成是需要开启原来的 EndPoint 服务，由于增 wsdl 文件是生成的，需要直连服务。

2. 启动 HelloWorld_HelloWorldPort_Server.java 如果报错找不到 wsdl，可以注释掉 HelloWorldPortImpl 的

   wsdlLocation = "file:/E:/ChromeDownload/HelloWorld.wsdl"

   ```sh
   Exception in thread "main" com.sun.xml.internal.ws.server.ServerRtException: [failed to localize] cannot.load.wsdl(file:/E:/ChromeDownload/HelloWorld.wsdl)
   ```

   

:::