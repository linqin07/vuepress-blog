mysql 的字符集

其中 utf-8 真正对应的是 utf8mb4 这个字符集

`show processlist`查看进程

`show full processlist`显示完整sql

根据上面查的耗时 sql 可以用 explain 进行分析，看下能否加索引进行优化，或则sql可以改造。

sending data 时间长问题。

打开配置 `set profiling=on;`

执行一个耗时的sql，使用 `show profiles` 查看 query id，再使用 `show profile for query query_id`查看详细信息;