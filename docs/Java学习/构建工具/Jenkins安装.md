### 外网安装

**1.Jenkins下载**

　　下载地址：http://mirrors.jenkins.io/war-stable/latest/jenkins.war

​      外网Linux机器上执行以下命令进行下载：

```sh
　　curl -L -O http://mirrors.jenkins.io/war-stable/latest/jenkins.war
```

　　或者本机下载后上传至Linux机器。

   命令启动

```sh
java -jar jenkins.war --httpPort=8899
```

用户数据都在`/root/.jenkins`文件夹中，包含所有插件、用户配置数据，内网安装可以把外网这个文件夹 copy 到对应机器即可。

##### 2.修改源

到目录`/root/.jenkins/updates`下执行替换字符命令修改源

```sh
sed -i 's/http:\/\/updates.jenkins-ci.org\/download/https:\/\/mirrors.tuna.tsinghua.edu.cn\/jenkins/g' default.json && sed -i 's/http:\/\/www.google.com/https:\/\/www.baidu.com/g' default.json
```

##### 3.修改Jenkins修改默认工作空间路径workspace

对应是`/root/.jenkins/config.xml`修改里面的 workspaceDir 为具体路径即可，修改完成重启 

##### 4.离线安装插件

[点击搜索下载插件](https://plugins.jenkins.io/)

![1604631866505.png](https://gitee.com/linqin07/pic/raw/master/1604631866505.png)

导入，最后安装完成的插件会在 `~.jenkins/plugins` 里面，离线安装可以复制这个新增的文件到内网即可。

![1604631978975.png](https://gitee.com/linqin07/pic/raw/master/1604631978975.png)