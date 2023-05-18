---
title: '【我和openGauss的故事】初识openGauss'

date: '2022-09-29'
category: 'blog'
tags: ['【我和openGauss的故事】初识openGauss', 'SQL']

archives: '2022-09'

author: 'liwt'

sumary: 'openGauss是一款全面友好开放，携手伙伴共同打造的企业级开源关系型数据库。'
---

## 一、openGauss 的介绍

openGauss 是一款全面友好开放，携手伙伴共同打造的企业级开源关系型数据库。openGauss 提供面向多核架构的极致性能、全链路的业务、数据安全、基于 AI 的调优和高效运维的能力。openGaus 深度融合华为在数据库领域多年的研发经验，结合企业级场景需求，持续构建竞争力特性

### 1、关系型数据库

关系型数据库，是建立在关系模型基础上的数据库，借助于集合代数等数学概念和方法来处理数据库中的数据。现实世界中的各种实体以及实体之间的各种联系均用关系模型来表示。标准数据查询语言 SQL 就是一种基于关系数据库的语言，这种语言执行对关系数据库中数据的检索和操作。

openGauss 的 SQL 部分代表 “结构化查询语言”。这是一种特殊目的的编程语言，是一种数据库查询和程序设计语言，用于存取数据以及查询、更新和管理关系型数据库系统。简单来说，就是更方便的去管理我们系统中的数据。

（1）关系模型的组成

数据结构（表结构）+关系操作（八个操作）+完整性约束（三个完整性）

- 1、实体完整性 在关系表中，所有元组主码的值都不能为空。
- 2、参照完整性 在关系模型中，采用给关系定义外键的形式进行关系间属性的引用，从而实现参照完整性。
- 3、自定义完整性 能反映某一具体应用所涉及的数据必须满足的语义要求的约束条件，称为用户自定义的完整性。

（2）关系模型的特点

- 1、每一列不可再分；
- 2、同一关系中属性(字段)不允许重名;
- 3、关系中不允许有完全相同的元组
- 4、关系中交换任意两行的位置不影响数据的实际含义；
- 5、关系中交换任意两列的位置不影响数据的实际含义

### 2、openGauss 的高性能

1、高性能

提供了面向多核架构的并发控制技术结合鲲鹏硬件优化，在两路鲲鹏下 TPCC Benchmark 达成性能 150 万 tpmc。
针对当前硬件多核 numa 的架构趋势， 在内核关键结构上采用了 Numa-Aware 的数据结构。
提供 Sql-bypass 智能快速引擎技术。
针对频繁更新场景，提供 ustore 存储引擎。

2、高可用

支持主备同步，异步以及级联备机多种部署模式。
数据页 CRC 校验，损坏数据页通过备机自动修复。
备机并行恢复，10 秒内可升主提供服务。
提供基于 paxos 分布式一致性协议的日志复制及选主框架。

3、高安全

支持全密态计算，访问控制、加密认证、数据库审计、动态数据脱敏等安全特性，提供全方位端到端的数据安全保护。

4、易运维

基于 AI 的智能参数调优和索引推荐，提供 AI 自动参数推荐。
慢 SQL 诊断，多维性能自监控视图，实时掌控系统的性能表现。
提供在线自学习的 SQL 时间预测。

5、全开放

采用木兰宽松许可证协议，允许对代码自由修改，使用，引用。
数据库内核能力全开放。
提供丰富的伙伴认证，培训体系和高校课程。

## 二、openGauss 的使用

### 1、登录数据库主节点

（1）启动服务

分布式 openGauss：
gs_om -t start 启动服务
gs_om -t restart 重启服务
集中式 openGauss：
gs_om -t stop 关闭服务
gs_om -t start 启动服务

（2）查询 openGauss 各实例状态情况

gs_om -t status --detail

（3）检查数据库性能

gs_checkperf

1. 以简要格式在屏幕上显示性能统计结果。
   gs_checkperf -i pmk -U omm
2. 以详细格式在屏幕上显示性能统计结果。
   gs_checkperf -i pmk -U omm --detai

（4）确认数据库主节点的端口号

查到的数据库主节点数据路径下的 postgresql.conf 文件中查看端口号信息。示例如下：

```
cat /opt/gaussdb/master1/postgresql.conf |grep port

[omm@openGauss01 ~]$ cat /opt/gaussdb/master1/postgresql.conf |grep port
port = '36000' # (change requires restart)
#ssl_renegotiation_limit = 0 # amount of data between renegotiations, no longer supported # supported by the operating system:
```

36000 为数据库主节点的端口号
端口号在安装数据库时，会在 xml 文件中配置，查看安装时的 xml 配置文件也可以找到端口

（5）列出所有可用的数据库

```
gsql -d postgres -p 36000 -l
[omm@openGauss01 ~]$ gsql -d postgres -p 36000 -l
List of databases
Name | Owner | Encoding | Collate | Ctype | Access privileges
-----------+-------+-----------+---------+-------+-------------------
db1 | song | SQL_ASCII | C | C |
db2 | song | SQL_ASCII | C | C |
kwdb | kw | SQL_ASCII | C | C |
mydb | song | GBK | C | C |
postgres | omm | SQL_ASCII | C | C |
song_suse | song | SQL_ASCII | C | C |
template0 | omm | SQL_ASCII | C | C | =c/omm +
| | | | | omm=CTc/omm
template1 | omm | SQL_ASCII | C | C | =c/omm +
| | | | | omm=CTc/omm
(8 rows)
```

2、查看数据库对象

1. 登陆默认数据库 postgres：

```
   gsql -d postgres -p 36000
   [omm@openGauss01 ~]$ gsql -d postgres -p 36000
   gsql ((GaussDB Kernel V500R002C00 build fab4f5ea) compiled at 2021-10-24 11:58:09 commit 3086 last mr 6592 release)
   Non-SSL connection (SSL connection is recommended when requiring high-security)
   Type "help" for help.
openGauss=#
```

2.  登陆自建数据库 song_suse:

```
gsql -d 数据库名 -p 36000 -U 用户名 -W 密码 -r
[omm@openGauss01 ~]$ gsql -d song_suse -p 36000 -U song -W Info1234 -r
gsql ((GaussDB Kernel V500R002C00 build fab4f5ea) compiled at 2021-10-24 11:58:09 commit 3086 last mr 6592 release)
Non-SSL connection (SSL connection is recommended when requiring high-security)
Type "help" for help.

song_suse=>
```

（1）查看帮助信息：

`postgres=# ?`

（2）切换数据库：

`postgres=# c dbname`

（3）列举数据库：

使用 l 元命令查看数据库系统的数据库列表。

`postgres=# l`
使用如下命令通过系统表 pg_database 查询数据库列表。
`postgres=# select dataname from pg_database;`
（4）列举表：

```
postgres=# dt
postgres=# d
```

（5）查询表空间：

使用 gsql 程序的元命令查询表空间。postgres=# db
检查 pg_tablespace 系统表。如下命令可查到系统和用户定义的全部表空间。
postgres=# select spcname from pg_tablespace;
