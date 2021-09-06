### git命令

在当前目录新建一个Git代码库
`git init`
新建一个目录，将其初始化为Git代码库
`​git init [project-name]`
下载一个项目和它的整个代码历史

### GIT 中文乱码

`micro .gitconfig` 添加：

```sh
[gui]
    encoding = utf-8  
    # 代码库统一使用utf-8  
[i18n]
    commitencoding = utf-8  
    # log编码  
[svn]
    pathnameencoding = utf-8  
    # 支持中文路径  
[core]
	quotepath = false 
	# status引用路径不再是八进制（反过来说就是允许显示中文）
```

`git clone [url]`

### Git的工作流程

https://gitee.com/linqin07/pic/raw/master/1552467555151.png

Git add
添加到缓存里面

- `git add .` 

 不加参数默认为将修改操作的文件和未跟踪新添加的文件添加到git系统的暂存区，注意不包括删除

- `git add -u .`

 -u  == --update ，表示将已跟踪文件中的修改和删除的文件添加到暂存区，不包括新增加的文件，注意这些被删除的文件被加入到暂存区再被提交并推送到服务器的版本库之后这个文件就会从git系统中消失了。

-  `git add -A .`

 -A == --all  ， 表示将所有的已跟踪的文件的修改与删除和新增的未跟踪的文件都添加到暂存区。

-  `git add -i .`

 日常工作中了解前三个命令已足够能满足我们的使用需求了，但是了解一下这个交互式拣选操作也是不错的。这个命令它也是作用于版本库中已被跟踪的文件中的执行过修改与删除操作的文件。

### 查看git远程仓库

到根目录下，关联/修改远程仓库

```shell
git remote -v
git remote rm origin
git remote add origin https://github.com/wuyihao1992/SingTel.git
// push不上去报错Push to origin/master was rejected，由于服务器上面有不相干的历史，执行下面命令
git pull origin master --allow-unrelated-histories
```

### 测试git连接

```sh
 ssh -T git@github.com
```

### 清空远程仓库

```sh
git rm -r --cached .
// 删除add的某个文件夹
git rm -r --cached target
```

```sh
git add .
```

```sh
git commit -m ".gitignore is now working"
```

```sh
git push -u origin master
```

### 还原

```shell
// 未add到版本里面的
git checkout -f xxxfileName
```

```sh
//git撤销本地所有未提交的更改
git reset --hard
```

```sh
//git撤销本地所有已经提交的更改，仅仅是撤回commit操作，您写的代码仍然保留
git reset --soft
```

```sh
// HEAD^的意思是上一个版本，也可以写成HEAD~1,2次commit，想都撤回，可以使用HEAD~2
git reset --soft HEAD~1
```

### git暂时忽略

忽略不提交git中已修改入库的文件。

```sh
git update-index --assume-unchanged config/secretKeyConf.js
```

取消忽略

```sh
git update-index --no-assume-unchanged config/secretKeyConf.js
```

查看：当文件比较多时，还可以借助 grep 命令来筛选，例如：

```
git ls-files -v| grep '^h'
```

git 既然支持 alias，可以通过配置 alias 来简化操作，编辑 .git/config 文件，把下述配置加入到 alias 段即可

```sh
[alias]
	ignore = update-index --assume-unchanged
	unignore = update-index --no-assume-unchange
	ignored = !git ls-files -v | grep "^h"
```

**语法**

```sh
git [ignore|unignore|ignored] filename
```



### .gitignore

git 目录创建文件 

```
touch .gitignore
```

常用配置

```
.idea
**/target/*
xxxfile
xxxfloder
*.log
```

.gitignore规则不生效，或者删除服务器上已经存在的忽略文件

```
git rm -r --cached .
git add .
git commit -m '忽略文件'
git push
```