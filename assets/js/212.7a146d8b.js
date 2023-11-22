(window.webpackJsonp=window.webpackJsonp||[]).push([[212],{436:function(e,n,s){"use strict";s.r(n);var a=s(2),t=Object(a.a)({},(function(){var e=this,n=e.$createElement,s=e._self._c||n;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"summary"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#summary","aria-hidden":"true"}},[e._v("#")]),e._v(" Summary")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("mysql> show variables like 'innodb_buffer_pool_size'\\G;\n*************************** 1. row ***************************\nVariable_name: innodb_buffer_pool_size\n        Value: 134217728\n\nmysql> show variables like 'innodb_buffer_pool_instances'\\G;\n*************************** 1. row ***************************\nVariable_name: innodb_buffer_pool_instances\n        Value: 1\n        \n// LRU 中位插入策略，插入到末尾 37% 约 正向 5/8 左右\nmysql> show variables like 'innodb_old_blocks_pct'\\G;  \n*************************** 1. row ***************************\nVariable_name: innodb_old_blocks_pct\n        Value: 37\n\n")])])]),s("p",[e._v("查询 InnoDb 状态")]),e._v(" "),s("div",{staticClass:"language-mysql extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("mysql> show engine innodb status\\G;\n*************************** 1. row ***************************\n  Type: InnoDB\n  Name: \nStatus: \n=====================================\n2020-03-09 18:24:07 0x7fa5c805a700 INNODB MONITOR OUTPUT\n=====================================\nPer second averages calculated from the last 29 seconds\n-----------------\nBACKGROUND THREAD\n-----------------\nsrv_master_thread loops: 1 srv_active, 0 srv_shutdown, 7753 srv_idle\nsrv_master_thread log flush and writes: 7754\n----------\nSEMAPHORES\n----------\nOS WAIT ARRAY INFO: reservation count 2\nOS WAIT ARRAY INFO: signal count 2\nRW-shared spins 0, rounds 4, OS waits 2\nRW-excl spins 0, rounds 0, OS waits 0\nRW-sx spins 0, rounds 0, OS waits 0\nSpin rounds per wait: 4.00 RW-shared, 0.00 RW-excl, 0.00 RW-sx\n------------\nTRANSACTIONS\n------------\nTrx id counter 3843\nPurge done for trx's n:o < 0 undo n:o < 0 state: running but idle\nHistory list length 0\nLIST OF TRANSACTIONS FOR EACH SESSION:\n---TRANSACTION 421825261168464, not started\n0 lock struct(s), heap size 1136, 0 row lock(s)\n--------\nFILE I/O\n--------\nI/O thread 0 state: waiting for completed aio requests (insert buffer thread)\nI/O thread 1 state: waiting for completed aio requests (log thread)\nI/O thread 2 state: waiting for completed aio requests (read thread)\nI/O thread 3 state: waiting for completed aio requests (read thread)\nI/O thread 4 state: waiting for completed aio requests (read thread)\nI/O thread 5 state: waiting for completed aio requests (read thread)\nI/O thread 6 state: waiting for completed aio requests (write thread)\nI/O thread 7 state: waiting for completed aio requests (write thread)\nI/O thread 8 state: waiting for completed aio requests (write thread)\nI/O thread 9 state: waiting for completed aio requests (write thread)\nPending normal aio reads: [0, 0, 0, 0] , aio writes: [0, 0, 0, 0] ,\n ibuf aio reads:, log i/o's:, sync i/o's:\nPending flushes (fsync) log: 0; buffer pool: 0\n252 OS file reads, 53 OS file writes, 7 OS fsyncs\n0.00 reads/s, 0 avg bytes/read, 0.00 writes/s, 0.00 fsyncs/s\n-------------------------------------\nINSERT BUFFER AND ADAPTIVE HASH INDEX  // 插入缓存\n-------------------------------------\n合并记录页数量   \nIbuf: size 1, free list len 0, seg size 2, 0 merges\nmerged operations:\n insert 0, delete mark 0, delete 0\ndiscarded operations:\n insert 0, delete mark 0, delete 0\nHash table size 34673, node heap has 0 buffer(s)\nHash table size 34673, node heap has 0 buffer(s)\nHash table size 34673, node heap has 0 buffer(s)\nHash table size 34673, node heap has 0 buffer(s)\nHash table size 34673, node heap has 0 buffer(s)\nHash table size 34673, node heap has 0 buffer(s)\nHash table size 34673, node heap has 0 buffer(s)\nHash table size 34673, node heap has 0 buffer(s)\n0.00 hash searches/s, 0.00 non-hash searches/s\n---\nLOG\n---\nLog sequence number 2630253\nLog flushed up to   2630253\nPages flushed up to 2630253\nLast checkpoint at  2630244\n0 pending log flushes, 0 pending chkp writes\n10 log i/o's done, 0.00 log i/o's/second\n----------------------\nBUFFER POOL AND MEMORY\n----------------------\nTotal large memory allocated 137428992\nDictionary memory allocated 102398\nBuffer pool size   8191  缓冲池页数 * 16k\nFree buffers       7938  空闲页\nDatabase pages     253   数据页\nOld database pages 0\nModified db pages  0     脏页\nPending reads      0\nPending writes: LRU 0, flush list 0, single page 0\nPages made young 0, not young 0\n0.00 youngs/s, 0.00 non-youngs/s\nPages read 244, created 37, written 47\n0.00 reads/s, 0.00 creates/s, 0.00 writes/s\n热点数据命中率\nBuffer pool hit rate 979 / 1000, young-making rate 0 / 1000 not 0 / 1000     \nPages read ahead 0.00/s, evicted without access 0.00/s, Random read ahead 0.00/s\n最近最少使用页大小   压缩页大小\nLRU len: 281, unzip_LRU len: 0\nI/O sum[0]:cur[0], unzip sum[0]:cur[0]\n--------------\nROW OPERATIONS\n--------------\n0 queries inside InnoDB, 0 queries in queue\n0 read views open inside InnoDB\nProcess ID=1247, Main thread ID=140349909485312, state: sleeping\nNumber of rows inserted 0, updated 0, deleted 0, read 9\n0.00 inserts/s, 0.00 updates/s, 0.00 deletes/s, 0.00 reads/s\n----------------------------\nEND OF INNODB MONITOR OUTPUT\n============================\n")])])])])}),[],!1,null,null,null);n.default=t.exports}}]);