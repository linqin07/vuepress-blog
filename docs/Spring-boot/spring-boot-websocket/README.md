# WebSocket

### 坑点：

1. ###### spring boot websocket 无法通过 @Autowired 注入 bean 的问题

   客户端每建立一个链接就会创建一个对象，可以理解为 new 出来的客户端，service 对象就无法注入了。spring 管理的都是单例，不会给第二个 websocket 对象注入 service，所以导致只要是用户连接创建的 websocket 对象，都不能再注入了。

   **解决办法：**

   - 使用全局 `ApplicationContext`进行获取对应的 `service` 实例。

   - 修改 service 变量为 `static`，使其属于类，在初始化是就是全局变量，多个实例公用。需要注意的是：set 方法不能是 static 的。

     > You cannot autowire or manually wire static fields in Spring
   >
     > 静态代码块static > 代码块{} > 构造方法 > autowire注入
     
     ```java
     private static ChatService chatService;
     // 注入的时候，给类的 service 注入
     @Autowired
     public void setChatService(ChatService chatService) {
         WebSocketHandler.chatService = chatService;
     }
     ```

2. ###### 前后端分离，nginx 代理转发需要额外配置

   使用nginx进行代理有加上配置

   ```nginx
   proxy_connect_timeout 4s; 
   proxy_read_timeout 7200s; 
   proxy_send_timeout 12s; 
   proxy_set_header Upgrade $http_upgrade;
   proxy_set_header Connection "upgrade";
   ```


3. ###### SpringBoot项目中增加了WebSocket功能无法运行测试

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
```

4. ###### 全局监听发送

   - websocket 中声明用来存放每个客户端对应的 MyWebSocket 对象，标记为`static`状态。
   - 声明启动线程，定时拉去`kafka`队列数据判断处理后进行推送，直接使用全局对象 MyWebSocket 调用 客户端对应发送的方法。

   