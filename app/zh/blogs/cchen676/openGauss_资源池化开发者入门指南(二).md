---
title: 'openGauss资源池化开发者入门指南(二)'
date: '2023-01-12'
category: 'blog'
tags: ['openGauss使用增强']
archives: '2023-01'
author: 'cchen676'
summary: 'openGauss资源池化开发者入门指南'
img: '/zh/post/cchen676/title/img26.png'
times: '16:30'
---

# openGauss 资源池化开发者入门指南(二)

### 一、内容简介

openGauss 资源池化是 openGauss 推出的一种新型的集群架构.通过 DMS 和 DSS 组件,实现集群中多个节点的底层存储数据共享和节点间的内存实时共享

达到节省底层存储资源以及集群内部支持一写多读且可以实时一致性读的目的.

本系列的主旨在于帮助对资源池化开发感兴趣的开发者快速入门

以及提供一些对开发有帮助的经验总结

### 二、预备知识

开发者最好具备以下基础:

1. Linux 的基础命令，比如 dd 命令，iscis 等
2. 对磁阵有一定的了解
3. 对传统的 openGauss 编译方式十分熟悉

### 三、开发自验证编译安装指南

1. 资源池化架构参考:
   ![图1](./title/dms1.jpg '图1')
2. 在社区正式发布的版本中, 如果需要搭建资源池化架构, 硬件上需要准备磁阵, 服务器和光交换机.
3. 在社区正式发布的版本中, CM 和 OM 是必选的组件
4. 这里介绍一种可以用于开发者自己学习或开发的编译环境搭建方式, 不需要 cm 和 om, 不需要磁阵, 仅需要一台普通的物理机就可以搭建出资源池化的环境.
5. 需要注意的是, 因为没用到 cm, 这种方式搭建的环境不能用于调试主备倒换或 failover 场景, 只能用于验证集群正常运行时的场景

### 四、独立编译安装指南

**注意:**

- 以下请勿用于生产环境
- 必须是 debug 版本,不能用 release 版本
- 因为本博客介绍的安装方式为非 cm 安装，需要对 DSS 组件使用 Dsstest 方式进行编译，因此在编译数据库之前，需要下载 DSS 对应代码并自行采用 dsstest 方式对 DSS 进行编译。方法为 a.下载最新版本 CBB 代码，编译安装替换三方库中的 CBB; b.下载最新版本的 DSS 代码，并根据 src/gausskernel/ddes/ddes_commit_id 内的版本号，回退 DSS 至指定版本; c.编译安装替换三方库中的 DSS 组件，命令如下：

```shell
#-3rd后面跟三方库对应的绝对路径
sh build.sh -3rd /xxx/.../binarylibs -t cmake -m DebugDsstest
```

- 三方库版本可能不是最新，此时需要手动更新 DMS 组件。方法为 a.下载最新版本 CBB 代码，编译安装替换三方库中的 CBB(上条操作已经执行过); b.下载最新版本的 DMS 代码，并根据 src/gausskernel/ddes/ddes_commit_id 内的版本号，回退 DMS 至指定版本; c.编译安装替换三方库中的 DMS 组件
- 当编译完 DSS、DMS、CBB 之后，会自动更新到三方库，不需要手动拷贝，只需要按正常流程编译数据库就行了

1. 环境预备: 仅需要一台单独的物理机, 剩余磁盘空间最好足够大, 建议大于 2T, 如果没有太大业务量，最小大于等于 100G
2. 环境预备: 假设已经自行使用编译方式编译出了 openGauss 带资源池化代码的 debug 版本的安装包, 可以通过确认生成的 bin 目录下是否有 dssserver, dsscmd, lib 目录下是否有 libdms.so, libdssapi.so , libdssaio.so, 来判断，同时要保证已经编译出的安装包使用的是 Dsstest 方式的 DSS 组件

下面是以 2 个节点为例 3. 配置好环境变量/home/cctest/envfile, 参考示例, 其中 DSS_HOME 是 dn 实例 1 的 dssserver 运行时需要的目录, 需要手动新建

```shell
export GAUSSHOME=/home/test/openGauss-server/dest/
export LD_LIBRARY_PATH=$GAUSSHOME/lib:$LD_LIBRARY_PATH
export PATH=$GAUSSHOME/bin:$PATH
export DSS_HOME=/home/test/dss/dss0/dssdba
```

4. 需要注意的是一台服务器上建多个 dn(数据库)节点, ip 是相同的, 服务使用的端口号不同
5. 新建 dsssever 需要的目录:

```shell
cd /home/test
mkdir -p dss/dss0/dssdba/cfg
mkdir -p dss/dss0/dssdba/log
mkdir -p dss/dss1/dssdba/cfg
mkdir -p dss/dss1/dssdba/log
mkdir -p dss/dev
```

6. 用 dd 命令创建一个模拟的块设备文件(执行时间依赖于磁盘的性能), 下面的命令是建 2T 的命令

- 请不要直接拷贝, 请务必根据自己需要的大小自己调整下 bs 和 count 的值, 否则磁盘会爆

```shell
dd if=/dev/zero of=/home/test/dss/dev/dss-dba bs=2M count=1024000 >/dev/null 2>&1
```

7. 创建 2 个 dn 节点需要的 dss 实例 1 和 dss 实例 0 的配置:

实例 1 配置:

```shell
vim /home/test/dss/dss0/dssdba/cfg/dss_inst.ini
```

dss 实例 1 的内容如下:

```shell
INST_ID=0
_LOG_LEVEL=255
DSS_NODES_LIST=0:127.0.0.1:17102,1:127.0.0.1:18102
DISK_LOCK_FILE_PATH=/home/test/dss/dss0
LSNR_PATH=/home/test/dss/dss0
_LOG_MAX_FILE_SIZE=20M
_LOG_BACKUP_FILE_COUNT=128
```

dss 卷配置:

```shell
vim /home/test/dss/dss0/dssdba/cfg/dss_vg_conf.ini
```

dss 实例 1 的内容如下, 里面就是卷名加 dd 模拟出来的设备名字:

```shell
data:/home/test/dss/dev/dss-dba
```

实例 2 配置:

```shell
vim /home/test/dss/dss1/dssdba/cfg/dss_inst.ini
```

dss 实例 2 的内容如下, 注意 DISK_LOCK_FILE_PATH 配置的与 1 一致:

```shell
INST_ID=1
_LOG_LEVEL=255
DSS_NODES_LIST=0:127.0.0.1:17102,1:127.0.0.1:18102
DISK_LOCK_FILE_PATH=/home/test/dss/dss0
LSNR_PATH=/home/test/dss/dss1
_LOG_MAX_FILE_SIZE=20M
_LOG_BACKUP_FILE_COUNT=128
```

dss 卷配置:

```shell
vim /home/test/dss/dss1/dssdba/cfg/dss_vg_conf.ini
```

dss 实例 2 的内容如下, 里面就是卷名加 dd 模拟出来的设备名字:

```shell
data:/home/test/dss/dev/dss-dba
```

8. 建 dssserver 需要的卷, 起 dssserver

```shell
##这里是步骤3中配好的环境变量
source /home/cctest/envfile
dsscmd cv -g data -v /home/test/dss/dev/dss-dba
dssserver -D /home/test/dss/dss0/dssdba &
#上个命令显示DSS SERVER STARTED即为成功
dssserver -D /home/test/dss/dss1/dssdba &
#上个命令显示DSS SERVER STARTED即为成功

#创建完可以通过如下命令确认是否建卷成功
dsscmd lsvg -U UDS:/home/test/dss/dss0/.dss_unix_d_socket
dsscmd ls -m M -p +data -U UDS:/home/test/dss/dss0/.dss_unix_d_socket
```

- 注意: dss 不支持启动后修改卷组配置，如涉及修改请重新执行上述步骤

9. 手动执行多节点的 initdb

```shell
mkdir -p /home/test/data
rm -rf node1 node2

gs_intdb -D /home/test/data/node1 --nodename=node1 -U tester -w Pasword --vgname=+data --enable-dss --dms_url="0:127.0.0.1:1613,1:127.0.0.1:1614" -I 0 --socketpath='UDS:/home/test/dss/dss0/.dss_unix_d_socket'

echo "ss_enable_ssl = off
listen_addresses = '*'
port=12210
ss_enable_reform = off
ss_work_thread_count = 32
enable_segment = on
ss_log_level = 255
ss_log_backup_file_count = 100
ss_log_max_file_size = 1GB
" >> /home/test/data/node1/postgresql.conf

sed '91 ahost       all        all         0.0.0.0/0        sha256' -i /home/test/data/node1/pg_hba.conf

gs_intdb -D /home/test/data/node2 --nodename=node2 -U tester -w Pasword --vgname=+data --enable-dss --dms_url="0:127.0.0.1:1613,1:127.0.0.1:1614" -I 1 --socketpath='UDS:/home/test/dss/dss1/.dss_unix_d_socket'

echo "ss_enable_ssl = off
listen_addresses = '*'
port=13210
ss_enable_reform = off
ss_work_thread_count = 32
enable_segment = on
ss_log_level = 255
ss_log_backup_file_count = 100
ss_log_max_file_size = 1GB
" >> /home/test/data/node2/postgresql.conf

sed '91 ahost       all        all         0.0.0.0/0        sha256' -i /home/test/data/node2/pg_hba.conf
```

10. 依次启动节点 1 和节点 2

```shell
 gs_ctrl start -D /home/test/data/node1
 gs_ctrl start -D /home/test/data/node2
```

11. 部分补充说明:

- ss_log_level 参数用于控制日志中打印 DMS 和 DSS 相关的日志, 日志目录在 pg_log/DMS 里面
- 17102 和 18102 是 dssserver 要用的端口
- 1613 和 1614 是 dms 通信要用的端口
- 12210 和 13210 是 openGauss 数据库提供服务需要用的端口
- dssserver 配置中 INST_ID 不能有冲突, 比如多个 dssserver 配置成相同的 ID
- 该方式搭建出来的环境不支持高可用, 不能测试倒换和 failover
- 如果启动时报错，提示如“dms library version is not matched”等报错，表示 DMS/DSS 组件版本号错误，请参考第三章步骤 2 重新编译
- 非 CM 环境下，限制了 0 节点为主节点，因此需要确保 initdb 阶段 0 节点创建成功
- 如果安装过程出现报错，再次 initdb 时候可能会提示目录不为空。此时需要清理文件系统及 DSS 中的残留文件。文件系统可以通过 rm 命令直接删除 node 文件夹，DSS 中可以对模拟的块设备文件头部写 0（DSS 将元数据信息记录在头部），之后重新从第 8 步开始执行

```shell
rm -rf /home/test/data/node1 /home/test/data/node2
dd if=/dev/zero of=/home/test/dss/dev/dss-dba bs=2M count=10 conv=notrunc >/dev/null 2>&1

```
