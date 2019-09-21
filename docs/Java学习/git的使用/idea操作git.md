### gitstash（贮藏）

备份当前修改。还原到pull状态。同步后再把修改写入操作。

![stash changes](https://i.loli.net/2019/06/15/5d046edacc6b341521.jpg)

unstash changes把修改的同步到代码里。

### Reset HEAD

还原提交

![1568119600136](https://i.loli.net/2019/09/21/QZLCYScM5uaAreJ.png)

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

![1568120353610](https://i.loli.net/2019/09/21/i4Ufak6KSmB5Ngv.png)