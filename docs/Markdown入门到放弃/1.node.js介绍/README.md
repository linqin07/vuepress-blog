## 1.node.js

#### 1.node.js

- `npm`: Nodejs下的包管理器。

- webpack: 它主要的用途是通过CommonJS的语法把所有浏览器端需要发布的静态资源做相应的准备，比如资源的合并和打包。
- vue-cli: 用户生成Vue工程模板。（帮你快速开始一个vue的项目，也就是给你一套vue的结构，包含基础的依赖库，只需要 npm install就可以安装）

#### 2.下载

[下载链接](https://nodejs.org/en/)

下载**左边**的即可。

![1550052930676.png](https://gitee.com/linqin07/pic/raw/master/1550052930676.png)

#### 3.安装

> 双击安装，选择安装位置。
>
> 我装d盘：D:\Program Files\nodejs\

默认会添加`系统环境变量` D:\Program Files\nodejs\

```powershell
node -v 
```

查看 node 版本，安装成功。

现在安装包默认都是带npm包管理的。

```powershell
npm -v 
```

查看 npm 版本，安装成功。

#### 4.修改缓存路径

默认 npm prefix 路径: C:\Users\用户名\AppData\Roaming\npm，并且是`用户环境变量`

默认 npm cache 路径: C:\Users\用户名\AppData\Roaming\npm-cache

##### 修改方式一：

**打开安装目录列表**

![1550053690454.png](https://gitee.com/linqin07/pic/raw/master/1550053690454.png)

新增文件夹：`node_global` 及 `node_cache`，分别对应 prefix 和 cache 目录。

**设置路径**

```powershell
npm config set prefix "D:\Program Files\nodejs\node_global"
npm config set cache "D:\Program Files\nodejs\node_cache"
```

**查看配置**

> npm config ls

![1550053905127.png](https://gitee.com/linqin07/pic/raw/master/1550053905127.png)

**修改环境变量 `node_global**`

![1550054130507.png](https://gitee.com/linqin07/pic/raw/master/1550054130507.png)

查看是否修改环境变量成功：

> npm root -g

如果这里没有修改成功。那么再执行命令的时候会报错，安装的npm模块命令会提示命令不存在。

同时修改用户的环境变量，安装 nodejs 默认会生成用户的 npm 环境变量，并且顺序要自己修改的 node_global 在默认的 `C:\Users\用户名\AppData\Roaming\npm`之前。

![1560742502250.png](https://gitee.com/linqin07/pic/raw/master/1560742502250.png)

##### 修改方式二：

直接修改配置文件，用户目录下隐藏文件.npmrc，对应就是`‪C:\Users\用户名\.npmrc`

```properties
prefix=D:\Program Files\nodejs\node_global
cache=D:\Program Files\nodejs\node_cache
registry=http://registry.npm.taobao.org
```

然后其他的查看配置，修改环境变量同上。

### 其他配置

###### 修改下载源

```shell
npm config set registry=http://registry.npm.taobao.org
```

###### 设置默认全局安装

```shell
npm set global=true
```