# Introduction



#### 不同操作系统的换行符

- Dos 和 windows 采用**“回车+换行，CR/LF”**表示下一行，对应`\r\n`；
- UNIX/Linux 采用**“换行符，LF”**表示下一行，对应`\n`；
- 苹果机(MAC OS 系统)则采用**“回车符，CR”**表示下一行 ，对应`\r`。

#### Windows 常用命令

tasklist | findstr `pid` 等价于 ps -ef | grep pid

taskkill /f /pid `pid` 等价于 kill -9 pid

ping 192.168.100.81 `-n` 5 -w 1000  等价于 ping 127.0.0.1 `-c` 5 -w 1000

