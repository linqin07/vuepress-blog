### 离线安装 node.js 和 npm

##### 1.下载官方安装包并拷贝到离线机器上。

官方下载地址：https://nodejs.org/en/download/

##### 2.解压文件：

tar -xJf node-v8.9.4-linux-x64.tar.xz

##### 2.放到相应目录例如/opt/

sudo mv node-v8.9.4-linux-x64 /opt/

##### 3.建立文件链接使npm和node命令到系统命令

sudo ln -s /opt/node-v8.9.4-linux-x64/bin/node /usr/local/bin/node

sudo ln -s /opt/node-v8.9.4-linux-x64/bin/npm /usr/local/bin/npm
 

##### 4.检查是否安装成功

node-v

npm-v