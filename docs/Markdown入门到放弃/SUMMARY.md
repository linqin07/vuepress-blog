typora 软件使用picGo上传图片到阿里云图床

配置脚本如下

```json
{
    "picBed": {
        "uploader": "aliyun",
        "aliyun": {
            "accessKeyId": "yourAccessKeyId",
            "accessKeySecret": "yourAccessKeySecret",
            "bucket": "blog-07",
            "area": "oss-cn-guangzhou",
            "path": "picBak/",
            "customUrl": "",
            "options": ""
        }
    },
    "picgoPlugins": {}
}
```

