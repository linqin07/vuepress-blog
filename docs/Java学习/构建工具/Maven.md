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
  mvn install -pl :B -am
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

### 3.maven 指定配置文件

`-s,--settings`

`-gs,--global-settings`

```sh
mvn -gs /data/maven/setting.xml clean
mvn gs /data/maven/setting.xml clean
```

