## Deepin 系统安装优化

### 1.Deepin笔记本发热，风扇转得厉害解决方法

解决方法：
sudo gedit /etc/default/grub
编辑grub文件，其中两行改为如下：
GRUB_CMDLINE_LINUX="splash quiet "
GRUB_CMDLINE_LINUX_DEFAULT="intel_pstate=disable"
保存退出后更新一下grub
sudo update-grub
然后，重启系统。
再用i7z查看，已经能够自动降频了。

另一种方法，使用 tlp 默认配置，自己感觉效果和改 grub 差不多，但都比没改强。https://linrunner.de/tlp/installation/debian.html
安装：
sudo apt install tlp tlp-rdw
启动一次，之后就不用管了：
sudo tlp start
查看状态：
tlp-stat -s
改之前，改之后最好用 i7z 看下效果
sudo i7z



### 2.窗口宽额头

If you use light theme
~/.local/share/deepin/themes/deepin/light/titlebar.ini
If you use dark theme
~/.local/share/deepin/themes/deepin/dark/titlebar.ini
内容如下: 修改25即可 保存后重启电脑

[Active]
height=25

[Inactive]
height=25



### 3.deepin 建立应用快捷方式

https://www.jianshu.com/p/a21255182e10
自启动快捷方式 家目录下面 .config/autostart ,把快捷方式拖这就可以自动启动了

```sh
[Desktop Entry]
Name=Navicat
Exec=/home/navicat15.AppImage
Icon=/home/navicat.png
Type=Application
```

### 4.给自己杂乱的磁盘分区添加卷标

https://loafing.cn/posts/Hello-Deepin-my-old-friend.html
查看分区信息

lsblk
sudo blkid -c /dev/null
以下分区路径和挂载点仅供参考，不可盲目操作！！！

给 NTFS 分区打上 Windows10 标签
sudo ntfslabel -f /dev/nvme0n1p3 'Windows10'
/dev/nvme0n1p3 是该分区所在路径，-f 是强制的意思，方便对已挂载的分区进行操作。
给 BTRFS 分区打上 Arch 标签
sudo btrfs filesystem label /media/username/b3c6aa7f-23a6-47de-978d-285f622a8e34 'Arch'
/media/username/b3c6aa7f-23a6-47de-978d-285f622a8e34 是目标分区的挂载点。
给 swap 分区打上 SWAP 标签
sudo swaplabel -L ‘SWAP’ /dev/nvme0n1p5
显示 swaplabel: /dev/nvme0n1p5: failed to write label: 文本文件忙 ，问题不大，等下次刚开机， swap 分区还没被使用的时候再操作。
给 ext4 分区打上 Deepin 标签
sudo e2label /dev/nvme0n1p4 'Deepin'



### 5.系统状态信息栏展示

wget https://gitee.com/q77190858/dde-sys-monitor-plugin/raw/master/bin/libsys_monitor.so && \
 sudo mv libsys_monitor.so /usr/lib/dde-dock/plugins/ && \
 pkill dde-dock



### 6.安装mysql

https://cloud.tencent.com/developer/article/1611087



### 7.在应用商店发现了这么一个应用：

Play on Linux 安装了之后在终端就可以使用wine指令了，没啥卵用，丑的一逼版本极为落后



### 8.安装SecurityCRT

没啥卵用，系统自带的就够用了，主题也不好看，没 window 下面好看

https://www.jianshu.com/p/83ebe931ae0b



### 9.修改rm到回收站,对于自己的家目录

还可以，把删除放到自己用户的目录下

```sh
echo "alias rm='mv -t ~/.local/share/Trash/files'"> .bashrc 
```



### 10.直接安装sublime text4

避免各种中文问题。完美兼容搜狗输入法。
Sublime Text4怎么设置中文

1. 打开Sublime Text,使用快捷键S hift+Ctrl+P,弹出查找栏
2. 在搜索框中输入关键字install,出现下拉选项，点击选择其中的：Package Control:Install Package,刚点击之后并不会立刻有反应，需要稍等一会，（我当时就以为自己没点到，其实并不是），然后就会弹出一个消息框，表示插件列表加载完成
3. 在搜索框中输入chinese，选择下拉框中的ChineseLocalizations
4. 点击之后，中文包就安装完成了，注意需要重新打开Sublime Text，点击任务栏中的Help->最下面的Language->简体中文（不重新打开是找不到的哦）

### 科学上网

1. 安装Qv2ray,商店有
2. 参考[这个](https://pigacg.wordpress.com/2021/04/07/%EF%BC%BB%E7%A7%91%E6%8A%80%EF%BC%BD%E5%A6%82%E4%BD%95%E5%9C%A8deepin-linux%E4%B8%8A%E4%BD%BF%E7%94%A8qv2ray%E6%9C%BA%E5%9C%BA%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E4%BB%A3%E7%90%86%E8%BF%9B%E8%A1%8C/)文章设置github hosts，不然打不开GitHub
3. 商店安装的还要装核心文件,[参考文档](https://qv2ray.net/lang/zh/getting-started/step2.html#%E4%B8%8B%E8%BD%BD-v2ray-%E6%A0%B8%E5%BF%83%E6%96%87%E4%BB%B6) 
   下载地址 https://github.com/v2ray/v2ray-core/releases#
4. 设置用一下，粘贴上自己的 vmess，自己搞来，网上白嫖的很少

### 11在Deepin 20.2.2中运行Android安卓和自行安装软件的方法

https://www.ywnz.com/linuxsj/9702.html
手机界面	
/usr/bin/uengine-launch.sh --package=org.anbox.appmgr --component=org.anbox.appmgr.AppViewActivity



### 12.破解navicat

https://www.cnblogs.com/cure/p/15109941.html