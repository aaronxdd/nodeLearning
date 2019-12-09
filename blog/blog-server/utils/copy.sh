#!bin/sh
cd /Users/xudongdong/文稿/workSapce/nodeLearningDemo/blog/blog-server/logs
cp access.log $(date +%Y-%m-%d).access.log
echo '' > access.log
