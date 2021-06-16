1.**设计表的时候尽量符号三大范式**

- 第一范式:`不可再分`原则,例如联系方式分为电话和手机
- 第二范式: 不存在`依赖关系`,如课程表里面有课程id还有学生id应该分为两个表
- 第三范式:不存在`传递依赖`,比如每个表都有学校名或者有学校地址,应该拆分为两个表

2. 最好每个表有**主键**，设置 auto_increment 字段，避免有 null，default默认可以为空字符串。

3.**text 类型无法建立索引**。enum 类型最好使用 小整形 来记录。

4.尽量避免使用 GROUP BY、DISTINCT 、OR、IN 等语句的使用，避免使用大表联合查询和子查询，因为将使执行效率大大下降

5.针对索引字段使用 >, >=, =, <, <=, IF NULL 和 BETWEEN 将会使用索引， 如果对某个索引字段进行 LIKE 查询，使用 LIKE ‘%abc%’不能使用索引，使用 **LIKE ‘abc%’** 将能够使用索引。

6.**查询条件左边不要用任何的函数**，数学运算，尽可能用UNION ALL 取代UNION 。组合索引最左边的值要在条件中有用到才有用。

::: tip

最左匹配原则: 

理解下MySQL的索引最左匹配原则：
如联合索引（a，b，c），where 条件里面有 a, ab, ba, abc, bac.. 等都行，与顺序无关。

::: 

数据更新频繁的列不宜建立索引；

查看索引：`show index from table`

删除：`ALTER table user DROP INDEX  UK_d2ia11oqhsynodbsi46m80vfc`

创建索引：`create INDEX age_password on user(age,password)` 

唯一索引： `ALTER table xxx add unique ('a', 'b')`

### explain

- **select_type:**	 

  ​	`SIMPLE`:简单SELECT(不使用UNION或子查询)，`UNION`:UNION中的第二个或后面的SELECT语句

- **table**: 对应的表

- **type**：最重要的一个参数（顺序排，最优到最差）

  性能从最优到最差的排序：system > const > eq_ref > ref > range > index > all

  > **all**：（full table scan）全表扫描无疑是最差，若是百万千万级数据量，全表扫描会非常慢。
  >
  > **index**：（full index scan）全索引文件扫描比all好很多，毕竟从索引树中找数据，比从全表中找数据要快。一般是使用了覆盖索引。
  >
  > **range**：只检索给定范围的行，使用索引来匹配行。范围缩小了，当然比全表扫描和全索引文件扫描要快。sql语句中一般会有between，in，>，< 等查询。
  >
  > **ref**：非唯一性索引扫描，本质上也是一种索引访问，返回所有匹配某个单独值的行。比如查询公司所有属于研发团队的同事，匹配的结果是多个并非唯一值。
  >
  > **eq_ref**：唯一性索引扫描，对于每个索引键，表中有一条记录与之匹配。比如查询公司的CEO，匹配的结果只可能是一条记录，
  >
  > **const**：表示通过索引一次就可以找到，const用于比较primary key 或者unique索引。因为只匹配一行数据，所以很快，若将主键置于where列表中，MySQL就能将该查询转换为一个常量。使用聚集索引
  >
  > **system**：表只有一条记录（等于系统表），这是const类型的特列，平时不会出现

- **possible_keys**：指出MySQL能使用哪个索引在该表中找到行

- **key_len**：显示MySQL决定使用的键长度。如果键是NULL,则长度为NULL

- **ref**：显示使用哪个列或常数与key一起从表中选择行

- **rows**：显示MySQL认为它执行查询时必须检查的行数。多行之间的数据相乘可以估算要处理的行数

- **Extra**：Using index 就是代表了优化器使用了覆盖索引（即从辅助索引中
  就可以得到查询的记录,而不需要查询聚集索引中的记录。）

![解析sql](F:\hexo\vuepress\docs\.vuepress\picBak\1551868481422.png)

 