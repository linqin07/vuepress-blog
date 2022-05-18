## find 查询条件

查询语法

```sql
db.c.find()
db.getCollection("c")find()
```

匹配一个字符串,多个条件就是 map 多一个属性

```
db.c.find({"username" : "joe"})
b.users.find({"username" : "joe", "age" : 27}) 
```

指定需要返回的键，find 还重载了第二个参数指定返回什么字段，比如下面的查询需要返回 username = 1, 不需要 email = 0。此外，字段 `_id` 默认返回，也可以排除掉 `"_id":0`

```
db.users.find({}, {"username" : 1, "email" : 0})
```

条件查询

// todo

https://segmentfault.com/a/1190000019442525

