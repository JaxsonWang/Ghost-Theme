#!/bin/bash

# 执行备份脚本并捕获输出
backup_output=$(bash $HOME/backup/backup.sh 2>&1)
exit_status=$?

# 生成格式化时间 (等效于 parseTime)
current_time=$(date "+%Y-%m-%d %H:%M:%S")

# 设置通知内容
if [ $exit_status -ne 0 ]; then
    title="Ghost 备份失败"
    # 截取前200个字符防止消息过长，同时对可能破坏JSON的特殊字符进行转义
    message=$(echo "${backup_output:0:200}" | sed 's/\\/\\\\/g; s/"/\\"/g; s/\n/\\n/g')
else
    title="Ghost 备份成功"
    message="${current_time} 已备份成功！"
fi

json_payload=$(printf '{
  "title": "%s",
  "body": "%s",
  "icon": "https://img.alicdn.com/imgextra/i1/2038135983/O1CN01Tg5zkp1u4GkdfU9J1_!!2038135983.jpg",
  "group": "Ghost",
  "isArchive": 1
}' "$title" "$message")


curl -X "POST" "https://api.day.app/token" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d "$json_payload"
