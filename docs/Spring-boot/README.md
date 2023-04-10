# Introduction

多个 http 请求到达 controller 的时候，是不同的线程进行处理的。照理说应该是可以并行的。

不能并行的场景：

Chrome：同一个浏览器连续多次访问同一个 url 会造成多次访问的关系变为串行。如果请求阻塞，后续相同请求也会阻塞。当请求参数不一样的时候，就会并行，可以给url增加一个时间戳。

Firefox和Safari:连续多次访问同一个 url，并行。

-Dfile.encoding=utf-8 

-Dspring.profiles.active=local

<Valine/>