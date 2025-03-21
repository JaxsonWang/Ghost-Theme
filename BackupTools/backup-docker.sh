#!/bin/bash
. ~/.bashrc

alipanBackupPath="/Ghost/"

now=$(date +'%Y-%m-%d_%H-%M')
database="$HOME/backup/ghost/iiong-$now.sql.gz"
ghostdata="$HOME/backup/ghost/content-$now.tar.gz"

echo "保存数据库文件到备份文件夹"
docker exec -i ghost-db mysqldump --defaults-extra-file=/etc/mysql/conf.d/my.cnf --no-tablespaces ghost | gzip > $database

echo "备份 Ghost 数据"
tar -zcvf $ghostdata --absolute-names $HOME/docker-ghost/ghost/ > /dev/null

echo "备份Ghost和数据库文件到阿里云盘"
aliyunpan upload $ghostdata $database $alipanBackupPath

echo "删除文件"
rm $database
rm $ghostdata
