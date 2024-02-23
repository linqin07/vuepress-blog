### 1.构建多模块项目 A 里面的子项目 B

- `mvn package`当我真的想要时，是否必须为整个项目层次结构运行`B`，多模块慢

- 每次打包时都必须将A的快照安装到本地存储库中`B`吗

- `mvn install -pl :B -am` 

  ```
  -pl, --projects
          Build specified reactor projects instead of all projects
  -am, --also-make
          If project list is specified, also build projects required by the list
  ```

  因此，只需`cd`进入父P目录并运行：

  ```sh
  mvn install -pl B -am
  ```

  这将构建B以及B所需的模块。

  请注意，如果引用`artifactId`的目录名称与目录名称不同，则需要使用冒号：

  ```sh
  mvn
  ```



### 2.使用命令上传jar包

maven 的 setting 文件要配置好对应的私服地址，执行命令的目录要在有pom的地方，同时注意文件的路径会相应抓换为相对路径。

```sh
mvn deploy:deploy-file 
-DgroupId=com.xxx
-DartifactId=base-common 
-Dversion=1.0.0-SNAPSHOT 
-Dpackaging=jar -Dfile=D:/base-common-1.0.0-SNAPSHOT.Jar 
-Durl=http://192.168.13.51:8081/repository/my_snapshot 
-DrepositoryId=my_snapshot
```

本地jar上传私服，mvn命令可以两种方式，一种是自己填写DgroupId、DartifactId、Dversion，也可以直接不填这3个直接使用-DpomFile，指向本地仓库jar地址的pom文件
需要注意的是，需要预先复制对应的jar和pom到临时目录，否则直接再仓库目录执行会报错。
下面有一个bat脚本，新建一个临时文件夹，复制进去，cmd执行 `deploy.bat 仓库要上传的jar的目录` 
```
rem 修改utf-8字符集
chcp 65001

@echo off
setlocal enabledelayedexpansion

set "pom_path=%~1"

:: 改为自己的maven nexus地址
set "NEXUS_URL=http://artifacts.gxatek.com/artifactory/auto-mvn-snapshot-private/"
set "REPOSITORY_ID=mvn-releases"

set "POMS=poms.txt"
dir /s /b "%pom_path%\*.pom" | sort > %POMS% || exit /b 1
for /f "tokens=*" %%p in (%POMS%) do (
    :: 复制pom文件到当前目录\
    copy "%%p" .
    echo "复制pom文件%%p到当前目录"
    for /f "delims=" %%a in ("%%p") do set "pom_file_name=%%~nxa"
    set "jar=%%p"
    echo %%p
    echo Before replacement: !jar!
    :: 将pom文件后缀换成.jar找到对应的jar文件（此处根据约定pom/jar文件只是后缀不同来进行推测）
    set "jar=!jar:.pom=.jar!"

    :: 如果jar文件存在，则将其复制到当前目录
    if exist "!jar!" (
       echo "复制jar文件!jar!到当前目录"
        copy "!jar!" .
        for /f "delims=" %%a in ("!jar!") do set "jar_file_name=%%~nxa"
        :: 部署jar文件，附带自身提供的pom文件
        echo         mvn deploy:deploy-file -Dfile=!jar_file_name! -Durl=%NEXUS_URL% -DrepositoryId=%REPOSITORY_ID% -DpomFile=!pom_file_name! -Dpackaging=jar
        mvn deploy:deploy-file -Dfile=!jar_file_name! -Durl=%NEXUS_URL% -DrepositoryId=%REPOSITORY_ID% -DpomFile=!pom_file_name! -Dpackaging=jar

    ) else (
        :: 只部署pom文件
        mvn deploy:deploy-file -Dfile=!pom_file_name! -Durl=%NEXUS_URL% -DrepositoryId=%REPOSITORY_ID% -DpomFile=!pom_file_name! -Dpackaging=pom
    )

)
:: 清理POM列表文件
del /q /f %POMS%

endlocal

```

### 3.maven 指定配置文件

`-s,--settings`

`-gs,--global-settings`

```sh
mvn -gs /data/maven/setting.xml clean
mvn gs /data/maven/setting.xml clean
```



### 依赖原则

1. 依赖路径最短优先原则

```html
A -> B -> C -> X(1.0)
A -> D -> X(2.0)
```

由于 X(2.0) 路径最短，所以使用 X(2.0)。

2. 声明顺序优先原则

```html
A -> B -> X(1.0)
A -> C -> X(2.0)
```

在 POM 中最先声明的优先，上面的两个依赖如果先声明 B，那么最后使用 X(1.0)。

3. 覆写优先原则

子 POM 内声明的依赖优先于父 POM 中声明的依赖。

#### 依赖传递

项目之间有依赖引用，可以使用 `<optional>true</optional>`显式说明该依赖不用传递下去，适用于直接依赖关系或者使用 `<dependencies>` 进行依赖管理直接添加使用。

::: warning
模块关系为继承 parent 时，`<optional>` 设置
:::



#### 解决依赖冲突

找到 Maven 加载的 Jar 包版本，使用 `mvn dependency:tree` 查看依赖树，根据依赖原则来调整依赖在 POM 文件的声明顺序。
