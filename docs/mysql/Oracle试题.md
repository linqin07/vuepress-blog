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

13. ceil() 往上取整

14. floor() 往下取整

15. round() 四舍五入

16. trunc() 截断

17. 分页

    ```sql
    /*****普通的查询(30数据)****/
    select * from ENVIRONMENT_APPLY_AUDIT;
    
    
    /*******查询带行号的数据**/
    select ROWNUM ru,AAA.* from (      select * from ENVIRONMENT_APPLY_AUDIT   ) AAA;
    
    /*******查询第一页   每页5条数据***/
    select * from (select AAA.*,ROWNUM ru from (select * from ENVIRONMENT_APPLY_AUDIT ) AAA where ROWNUM<6);
    select * from (select ROWNUM ru,AAA.* from (select * from ENVIRONMENT_APPLY_AUDIT ) AAA where ROWNUM<6) where ru>0;
    
    
    /**********查询第二页数据********************/
    select * from (select ROWNUM ru,AAA.* from (select * from ENVIRONMENT_APPLY_AUDIT ) AAA where ROWNUM<11) where ru>5;
    
    
    /**********查询第三页数据********************/
    select * from (select ROWNUM ru,AAA.* from (select * from ENVIRONMENT_APPLY_AUDIT ) AAA where ROWNUM<16) where ru>10;
    ```

    

为什么基于ROWNUM的oracle分页实现，要采用三层嵌套的方式？ 

1. 首先，在没有order by clause的情况下，oracle的查询结果的顺序会是不确定的

2. 其次，在order by 和 ROWNUM同时使用时，oracle默认的策略是先为伪列rownum赋值，再order by。

3. 再次，因为rownum不可使用 >(=) 来判断的原因，所以需要最外围的第三层嵌套 