# Introduction

一些mysql的总结。

ON DUPLICATE KEY  针对 id 和 唯一索引。插入失败则会执行更新。

```sql
INSERT INTO table (a,b,c) VALUES (1,2,3)  
  ON DUPLICATE KEY UPDATE c=c+1;  
```

