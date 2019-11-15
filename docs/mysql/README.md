# Introduction

一些 mysql 的总结。

ON DUPLICATE KEY  针对 id 和 唯一索引。插入失败则会执行更新。

```sql
INSERT INTO table (a,b,c) VALUES (1,2,3)  
  ON DUPLICATE KEY UPDATE c=c+1;  
```

#### 2.导出数据字典

```sql
SELECT
TABLE_NAME '表名',
COLUMN_NAME '字段名',
COLUMN_TYPE '数据类型',
COLUMN_COMMENT '备注'
FROM
information_schema.COLUMNS
WHERE
TABLE_SCHEMA = '库名' and table_name = '表名';
```





