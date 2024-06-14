---
title: 'FAQ'
category: 'faq'
---

# 常见问题

## 1. openGauss数据库开源许可协议是什么？

木兰宽松许可证 MulanPSL2 V2，无传染

## 2. openGauss支持部署的硬件架构及操作系统有哪些？

ARM：openEuler 20.03LTS（推荐采用此操作系统）｜openEuler 22.03LTS｜Kylin-V10｜FusionOS 22｜统信

X86：openEuler 20.03LTS｜openEuler 22.03LTS｜Kylin-V10｜CentOS 7.6｜Asianux 7.6｜FusionOS 22｜统信

<br/>

ubuntu  / centos8 /centos10 / 红旗 需要适配编译数据库；在飞腾/海光 等服务器上安装需要重新适配编译。

## 3. openGauss有哪些版本？

openGauss社区每两年发布一个LTS版本，LTS版本作为长期支持版本，可规模上线使用。半年发布一个创新版本，创新版本供用户联创测试使用；涉及重大问题修复时，会按需发布补丁版本。同时按照不同场景分为以下版本：

(1) openGauss 企业版:具备更齐全的集群管理功能,适合企业用户。

(2) openGauss极简版:安装配置简单,解压可用,适合个人开发者。

(3) openGauss 轻量版:精简功能,缩减安装包大小,内存占用更少。

(4) openGauss 分布式镜像:基于ShardingSphere和k8s的分布式容器化镜像。

详情参考openGauss官网“学习”->“文档”区域。

## 4. openGauss分布式部署方案是什么？

1. 基于openLookeng实现分布式分析能力，与shardingsphere配合openGauss组成HTAP数据库。
2. 基于分布式中间件shardingsphere使openGauss具备分布式数据库能力。
3. 使用kubernetes部署分布式数据库

更多分布式部署方案请参考openGauss官网“学习”->“文档”区域。

## 5. openGauss支持的连接方式有哪些？

1. 连接方式有JDBC / ODBC以及其它语言的驱动
2. 连接客户端工具Data Studio 、Dbeaver、Navicat，可以参考官网“下载”->"支持工具"区域；同时DataKit的WebDS也支持客户端连接, 在官网“下载”->版本包 里，下载DataKit即可

## 6. openGauss迁移方案有哪些？

1. openGauss社区版本支持MySQL迁移，提供全量的迁移工具集，可在官网 ""下载""->版本包 ，openGauss Tools 里下载；操作可参考openGauss社区官网“社区”->“迁移专区”；
2. openGauss DBV的商业发行版支持常见数据库的迁移工具

## 7. openGauss支持的生态工具有哪些？

参考官网“下载”->“支持工具”区域。

## 8. openGauss行业应用实践有哪些？

详细案例参考官网“社区”->“用户实践”版块

openGauss已经在包括金融、电信、政府、制造、能源、交通、医疗、教育等行业规模应用

## 9. 如何加入openGauss社区？

参考openGauss官网“社区”->“社区贡献”->“签署CLA”

个人和企业分别通过签署个人/企业CLA（贡献者许可协议）加入openGauss社区

## 10. openGauss相关问题学习及咨询渠道有哪些？

"学习渠道：openGauss官网文档、openGauss的B站视频、openGauss视频号视频、openGauss技术交流微信群

咨询渠道：社区邮件列表->官网“社区”->“线上交流”版块, 订阅对应SIG组邮件列表，咨询交流

更多问题请添加社区微信小助手：openGauss-bot"

## 11. cm的基本命令

查询集群状态：`cm_ctl query -Civdp｜停止集群：cm_ctl stop ｜启动集群：cm_ctl start｜指定节点切换为主机：cm_ctl switchover -n 2 -D dn1｜重建备机：cm_ctl build -n 2 -D dn1

## 12. cm的命令在集群中任意节点执行都可以吗?

cm的命令可以远程执行，所以通常在任意节点均可执行，执行方式主要由两种：

1. 依赖节点间互信由cm_ctl工具直接远程执行。
2. 将待执行指令发送给cms主，再由cms主下发到对应节点的cma。因此只要互信和网络没有问题在集群中任意节点均可执行

## 13. openGauss 5.0.0集群同步是否支持v6地址？

暂时只有server支持ipv6,   om  cm暂时不支持。

## 14. 主从复制能指定用户吗？现在都是用的初始化用户，能否指定一个只有复制权限的用户，主备间数据同步能否指定用户

主备之间的数据复制固定是初始用户，无法指定。

## 15. 安装前能否通过配置，默认指定字符集为utf8，这样就不用在建库的时候指定了

`gs_install`安装时指定`--gsinit-parameter`参数，完整命令为：

`gs_install -X /home/guowb/single.xml --gsinit-parameter=""--locale=zh_CN.utf8 --encoding=UTF-8""`，创建后默认库为utf8,创建新库create database test1；不指定encoding，字符集也为utf8

## 16. 归档和备份恢复区别和关系

归档：归档功能默认只是简单的备份xlog日志

增量备份：是一个连续性的链式的行为，有一个基础的全量备份，在此基础上可以每隔一段时间就进行一次增量备份，每一次的增量备份都是在前一次的备份基础上的增量，也就是差分增量，通常是间隔固定时间增量备份一次，这样基础的全量备份和多次的增量备份就可以形成一个备份链，比如叫A-->B-->C-->D，每个位置都会记录它的时间、lsn、xid、备份名，那么当你要恢复的时候就会根据你所要恢复到的位置去找最近的备份点，在这个备份点的基础上进行恢复，比如你要恢复到C和D之间的某个位置，那就基于C进行增量恢复，只需要回放C到你要恢复的位置之间的xlog即可，这样就不需要从A开始回放，可以大大的降低恢复的时间。另外probackup有很多备份管理功能，比如清理、合并等这些都是归档所不具备的。另外备份恢复的pitr恢复功能是需要借助归档功能来备份增量的xlog的。

## 17. xlog文件堆积可能有哪些原因

1. 存在异常备机
2. 存在非活跃的逻辑或物理复制槽
3. 开启了归档，但是由于某些原因导致归档受阻
4. 备份失败
5. Xlog回收速率慢于日志产生速度
6. Xlog相关参数配置不合理，与xlog保留数量相关的参数包括`wal_keep_segments`、`checkpoint_segments`，集群状态正常的情况下最多有wal_keep_segments + checkpoint_segments * 2 + 1个

## 18. 根据core文件解析core堆栈步骤

1. 官网下载版本、系统、架构匹配的符号表
2. 将下载的符号表压缩包上传到环境，解压，将`symbol/lib/和symbol/bin/`目录下的所有内容拷贝到对应的`$GAUSSHOME/lib`和`$GAUSSHOME/bin`目录下，并保证权限正确
3. 找到core文件目录，解压core文件，lz4 -d  文件名
4. gdb gaussdb 解压后的core文件名（如果是其他的进程core了，gaussdb替换为其他的二进制名称）
5. bt查看core堆栈

## 19. 数据库启动报错回显信息为waitpid xxx failed

由于数据库异常终止，gaussdb.state文件错误，将数据目录下gaussdb.state文件删掉重新启动即可。

## 20. 常见数据库场景下文件句柄数设置不足，导致数据库状态异常怎么处理

查看数据库日志数据库报错为`PANIC:could not open file "pg_xlog*****"`,系统文件句柄数设置不够，查看ulimit -n为1024，建议参考官方安装文档，设置为100w,重启系统后在启动数据库。