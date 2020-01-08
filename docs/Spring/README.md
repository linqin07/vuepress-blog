# Introduction

feign 填坑：

1. status 404 reading

   服务增加了context-path，feign客户端请求报错 404。

   解决方案：@FeignClient 设置 path，统一前缀，或者直接拼全路径。

2. 服务名称 `大写`，避免不必要的麻烦。

3. 设置了 @FeignClient 的 url 参数

   

   

   

   