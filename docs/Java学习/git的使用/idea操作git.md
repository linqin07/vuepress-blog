### gitstash（贮藏）

备份当前修改。还原到pull状态。同步后再把修改写入操作。

![image-20210610185018697.png](https://blog-07.oss-cn-guangzhou.aliyuncs.com/picBak/image-20210610185018697.png)

unstash changes把修改的同步到代码里。

### Reset HEAD

还原提交

![image-20210610184859051.png](https://blog-07.oss-cn-guangzhou.aliyuncs.com/picBak/image-20210610184859051.png)

--mixed 
意思是：不删除工作空间改动代码，撤销commit，并且撤销git add . 操作
这个为默认参数,git reset --mixed HEAD^ 和 git reset HEAD^ 效果是一样的。

--soft  不删除工作空间改动代码，撤销 commit，不撤销 git add . 

--hard
删除工作空间改动代码，撤销 commit，撤销 git add . 

> 如果你进行了2次commit，想都撤回，可以使用HEAD~2



### Shelve Changes

类似 stash 的功能，只是这个是 idea 的功能。两个命令都是把代码搁置，只是 stash 是 git 原生的。shelve 是idea 独有的。

1. shelve存在当前项目下.idea/shelve里
   
2. 查看shelve，打开version control面板，点开shelf
3. unshelve，在面板里选择你需要unshelve的条目即可

![image-20210610184912135.png](https://blog-07.oss-cn-guangzhou.aliyuncs.com/picBak/image-20210610184912135.png)

### 变基操作

#### 普通变基

![image-20210610184936139.png](https://blog-07.oss-cn-guangzhou.aliyuncs.com/picBak/image-20210610184936139.png)

Checkout and Rebase onto Current  合并当前分支 (dev) 的修改 提交到 master 并且检出到 master

Rebase Current onto Selected         将所选分支提交加入到当前分支

Merge into Current                         将所选分支提交合并到当前分支



#### 合并提交（交互式变基）

在代码没有pull前我们可以在本地分支进行提交的合并。这样会使得远程分支不去关心本地开发过程日志，而使得远程日志干净整洁。

变基前log

![img](https://blog-07.oss-cn-guangzhou.aliyuncs.com/picBak/105049_W10i_3452433.png)

找到要合并的第一条log，然后右键选择Interactively Rebase from Here...进行交互式变基

（此选项低版本IDEA可能没有请更新到2018版以上）

![img](https://blog-07.oss-cn-guangzhou.aliyuncs.com/picBak/105200_dATH_3452433.png)

除题一条外其他全部选择squash随前面的提交一并提交

![img](https://blog-07.oss-cn-guangzhou.aliyuncs.com/picBak/105609_0H5M_3452433.png)

编辑交互式变基提交说明。默认显示合并的所有提交的内容，我们也可以添加和修改内容。

![img](https://blog-07.oss-cn-guangzhou.aliyuncs.com/picBak/105817_wcsG_3452433.png)

变基后日志

![img](https://blog-07.oss-cn-guangzhou.aliyuncs.com/picBak/105836_LYFU_3452433.png)

 