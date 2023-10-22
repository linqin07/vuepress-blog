## Server-sent events



`SSE`它是基于`HTTP`协议的，我们知道一般意义上的HTTP协议是无法做到服务端主动向客户端推送消息的，但SSE是个例外，它变换了一种思路



SSE在服务器和客户端之间打开一个单向通道，服务端响应的不再是一次性的数据包而是`text/event-stream`类型的数据流信息，在有数据变更时从服务器流式传输到客户端。



整体的实现思路有点类似于在线视频播放，视频流会连续不断的推送到浏览器，你也可以理解成，客户端在完成一次用时很长（网络不畅）的下载



`SSE`与`WebSocket`作用相似，都可以建立服务端与浏览器之间的通信，实现服务端向客户端推送消息，但还是有些许不同：



- SSE 是**基于HTTP协议**的，它们不需要特殊的协议或服务器实现即可工作；`WebSocket`需单独服务器来处理协议。
- SSE 单向通信，只能由**服务端向客户端单向通信**；webSocket全双工通信，即通信的双方可以同时发送和接受信息。
- SSE 实现简单开发成本低，无需引入其他组件；WebSocket传输数据需做二次解析，开发门槛高一些。
- SSE 默认**支持断线重连**；WebSocket则需要自己实现。
- SSE **只能传送文本消息**，二进制数据需要经过编码后传送；WebSocket默认支持传送二进制数据



### 前端页面



```html
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <title>Server-Sent Events client example with EventSource</title>
</head>
<body>
<script>
   if (window.EventSource == null) {
       alert('The browser does not support Server-Sent Events');
   } else {
       var eventSource = new EventSource('http://localhost:8080/sse/mvc/words');

       eventSource.onopen = function () {
           console.log('connection is established');
       };

       eventSource.onerror = function (error) {
           console.log('connection state: ' + eventSource.readyState + ', error: ' + event);
       };

       eventSource.onmessage = function (event) {
           console.log('id: ' + event.lastEventId + ', data: ' + event.data);

           if (event.data.endsWith('.')) {
               eventSource.close();
               console.log('connection is closed');
           }
       };
   }
</script>
</body>
</html>
```



### 后端控制器



```java
@Controller
@RequestMapping("/sse/mvc")
public class WordsController {

​    private static final String[] WORDS = "The quick brown fox jumps over the lazy dog.".split(" ");

​    private final ExecutorService cachedThreadPool = Executors.newCachedThreadPool();

​    @GetMapping(path = "/words", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
​    SseEmitter getWords() {
​        SseEmitter emitter = new SseEmitter();

​        cachedThreadPool.execute(() -> {
​            try {
​                for (int i = 0; i < WORDS.length; i++) {
​                    emitter.send(WORDS[i]);
​                    TimeUnit.SECONDS.sleep(1);
​                }

​                emitter.complete();
​            } catch (Exception e) {
​                emitter.completeWithError(e);
​            }
​        });

​        return emitter;
​    }
​    }
```



注意：页面访问会跨域，解决跨越需增加配置

 

```java
/**
 * 服务器跨域问题
 */
@Configuration
```