https://www.infoq.cn/article/analysis-of-elasticsearch-cluster-part01?utm_campaign=rightbar_v2&utm_source=infoq&utm_medium=articles_link&utm_content=link_text

#### 常见问题：

1. 日志中出现：[FORBIDDEN/12/index read-only / allow delete (api)]

这是由于 ES 新节点的数据目录 data 存储空间不足，导致从 master 主节点接收同步数据的时候失败，此时 ES 集群为了保护数据，会自动把索引分片 index 置为只读 read-only，解决好磁盘问题后执行以下命令。

```sh
curl -XPUT -H "Content-Type: application/json" http://localhost:9200/_all/_settings -d '{"index.blocks.read_only_allow_delete": null}'
```

2.清空索引

数据大就很删除要很慢

```sh
curl -XPOST  -H "Content-Type: application/json"  192.168.32.188:9201/south_mgr_20210531/_doc/_delete_by_query -d  '{ "query": { "match_all": {} } }'
```

