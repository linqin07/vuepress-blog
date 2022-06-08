

### MongoDB 连接命令

直接 use 就创建出来了，插入数据才可以查看的见。

```sh
./mongo

> use runoob
switched to db runoob
>
> db.runoob.insert({"name":"菜鸟教程"})
WriteResult({ "nInserted" : 1 })

//删除集合
db.runoob.drop()
```

### 创建删除集合

在 MongoDB 中，你不需要创建集合。当你插入一些文档时，MongoDB 会自动创建集合。

主动创建也是可以的

> db.createCollection("mycol",{})
> { "ok" : 1 }

> db.mycol.drop()
> true

### find 查询条件

查询语法

```sh
db.c.find()
db.getCollection("c")find()
```

匹配一个字符串,多个条件就是 map 多一个属性

```sh
db.c.find({"username" : "joe"})
b.users.find({"username" : "joe", "age" : 27}) 
```

指定需要返回的键，find 还重载了第二个参数指定返回什么字段，比如下面的查询需要返回 username = 1, 不需要 email = 0。此外，字段 `_id` 默认返回，也可以排除掉 `"_id":0`

```sh
db.users.find({}, {"username" : 1, "email" : 0})
```

条件查询

```sh
//db.collection.find(query)
db.runoob.find({"likes":{$gt:99}, $or:[{title:'update title1'}, {by:'aa'}]})
```

创建索引

```sh
db.runoob.createIndex({"title":1})
db.runoob.getIndexes()
```

删除数据

```sh
//删除deleteMany\deleteOne
db.runoob.deleteOne({_id: ObjectId("628f2904f62a000074006abe")})
```

