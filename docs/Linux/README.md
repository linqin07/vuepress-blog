# Introduction

#### 不同操作系统的换行符

- Dos 和 windows 采用**“回车+换行，CR/LF”**表示下一行，对应`\r\n`；
- UNIX/Linux 采用**“换行符，LF”**表示下一行，对应`\n`；
- 苹果机(MAC OS 系统)则采用**“回车符，CR”**表示下一行 ，对应`\r`。

#### Windows 常用命令

- tasklist | findstr `pid` 等价于 ps -ef | grep pid


- taskkill /f /pid `pid` 等价于 kill -9 pid


- 
  ping 192.168.100.81 `-n` 5 -w 1000  等价于 ping 127.0.0.1 `-c` 5 -w 1000
- 获取全部目录及文件  tree /F

### 设置环境变量

#### 添加临时环境变量（当前shell有效）

查看环境变量: `echo $PATH`

export JAVA_HOME = /data/java

追加 PATH：`export PATH=APath:$PATH`

临时取消：unset  JAVA_HOME

#### 修改全局环境变量 /etc/enviroment

####  修改 /etc/profile

vi /etc/profile

```sh
export PATH=$PATH:/usr/local/mysql/bin
```

修改完这个文件必须要使用 以下命令在不用重启系统的情况下使修改的内容生效。

source /etc/profile

#### 修改 .bashrc 文件是在当前用户 shell 下生效



#### 备份原来的vpa文件夹

```sh
mv vpa{,`date +%Y-%m-%d_%H:%M`}
```



