# Introduction

一些 mysql 的总结。

#### 1.重复插入sql直接处理

ON DUPLICATE KEY  针对 id 和 唯一索引。插入失败则会执行更新。

```sql
INSERT INTO table (a,b,c) VALUES (1,2,3)  
  ON DUPLICATE KEY UPDATE c=c+1;  
```

insert ignore  判断的是主键或者索引是否重复，重复着不处理（不会报错）

```sql
INSERT IGNORE INTO log_domain (id) VALUES(45)
```

replace into  等同于先删除再插入，所以没一次影响记录为两条。也是针对索引

```sql
REPLACE INTO log_domain (NAME) VALUES("aaa") 
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

#### 3.执行sql命令输出

```sh
mysql -uroot -p'root123' tablename > /tmp/my.sql <<EOF
UPDATE log_es_index_par SET early_data = DATE_SUB(create_time,INTERVAL 1 DAY), late_data=CONCAT(index_time, ' 23:59:59') where early_data is null；   
EOF
```



#### 4.请求url地址链接时区

```sh
jdbc:mysql://192.168.32.187:3306/db?useSSL=false&useUnicode=true&characterEncoding=UTF-8&allowMultiQueries=true&serverTimezone=Asia/Shanghai
```



#### 5.sql 里面的 int(4) 是0填充

**int(11) ZEROFILL**

单单int(4)是没有用的。而且对于0001这种，底层存储的还是1，只是在展示的会补0。并不是显示它的长度。

适合学号这种场景

取消0填充  **int(11) unsign**