### Ghost-QiNiu-Store

图床配置如下：

```json
{
  // ...
  "storage": {
    "active": "qn-store",
    "qn-store": {
      "accessKey": "your access key", // https://portal.qiniu.com/user/key获取AK密匙
      "secretKey": "your secret key", // https://portal.qiniu.com/user/key获取SK密匙
      "bucket": "your bucket name", // 存储对象空间名字
      "domain": "http://xx.xx.xx.glb.clouddn.com", // 七牛CDN地址
      "format": "${year}/${month}/${name}${ext}"
    }
  }
  // ...
}
```
