### Oracle 中级试题

1. Oracle数据库的最基础的存储单位是`segment`

2. 从物理结构上讲，Oracle数据库包含数据文件、控制文件、`redo log file`、口令文件和参数文件

3. awrrpt.sql 是创建AWR报告的脚本

4. impdp 是数据库用来做数据导入的工具

5. 数据库后台核心进程

   > - smon 数据块管理，实例恢复
   > - pmon 进程异常终止，比如用户进程出错，这个进程清理它
   > - DBWn data blocks write 数据块写
   > - CheckPoint 检查点进程
   > - LGWR 进程负责将log buffer->online redo file,顺序写

6. Oracle启动过程分3步

   > 1.Oracle启动模式的nomount阶段
   >
   > 2.Oracle启动模式的mount阶段
   >
   > 3.Oracle启动模式的open阶段

7. 事务的`一致性`是指事务必须是数据库从一个一致性状态变到另一个一致性状态

8. 事务的`持久性`是指事务一旦提交，对数据库的修改就是永远的

9. 事务的`隔离性`保证多事务直接互不干扰

10. 事务是`原子性`的

11. 数据库逻辑结构单元

    > DataBase 数据库
    >
    > TableSpace 表空间
    >
    > Segment 段：一个表就是一个段
    >
    > Extent 区：区是磁盘空间分配的最小单位；oracle到这。
    >
    > Data Block 数据块

12. todo 17