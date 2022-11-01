#!/bin/bash
. ~/.bashrc

alipanBackupPath="Ghost/"

now=$(date +'%Y-%m-%d_%H-%M')
database="$HOME/backup/ghost/iiong-$now.sql.gz"
ghostdata="$HOME/backup/ghost/content-$now.tar.gz"

echo "保存数据库文件到备份文件夹"
mysqldump iiong --no-tablespaces | gzip > $database

echo "备份 Ghost 数据"
tar -zcvf $ghostdata --absolute-names /var/www/ghost/content/ > /dev/null

echo "备份Ghost和数据库文件到阿里云盘"
aliyunpan-cli upload -p $ghostdata $database $alipanBackupPath
