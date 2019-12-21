## springmvc 的常用接口

- HandlerMethodArgumentResolver（参数绑定）

  controller 方法上竟然可以放这么多的参数，而且都能得到想要的对象，各种注解`@RequestParam`、`@RequestHeader`、`@RequestBody`、`@PathVariable`、`@ModelAttribute`每个注解都对应着一个类处理接收到的参数处理，处理完成都可以直接再 controller 使用。实现这个接口可以自定义处理入参。

- HandlerMethodReturnValueHandler（返回数据处理）

  `@ResponseBody`注解标记着返回 json 数据，对应着一个`序列化`的类。该类也可以自定义。

- HttpMessageConverter（消息处理）

- HandlerInterceptor（拦截器）

  全局拦截指定的路径，统一处理判断是否过滤掉。

- Converter（转换器）

  比如入参时间类型是 Date，统一经过转换器格式化成指定格式。



参考：https://my.oschina.net/sugarZone?tab=newest&catalogId=3411844

