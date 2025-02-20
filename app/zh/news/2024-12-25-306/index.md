---
title: 'openGauss 3.0.6版本正式发布！'
date: '2024-12-25'
tags: ['theme']
author: 'openGauss'
category: 'news'
summary: 'openGauss 3.0.6 Update版本是openGauss 3.0.0 Release的补丁版本。基于3.0.5补丁版本基础上，回合主干分支的部分DFX需求和缺陷，发布3.0.6补丁版本。'
---

## 版本介绍

openGauss 3.0.6 Update版本是openGauss 3.0.0 Release的补丁版本。基于3.0.5补丁版本基础上，回合主干分支的部分DFX需求和缺陷，发布3.0.6补丁版本。


## 需求范围

openGauss 3.0.6 补丁版本回合的需求列表：

|	描述	|	PR链接	|	ISSUE链接	|
| ----- | ----- | ----- |
|	延迟备机优化需求	|	https://gitee.com/opengauss/openGauss-server/pulls/6506	|	https://e.gitee.com/opengaussorg/dashboard?issue=IA7M2X<br/>https://gitee.com/opengauss/openGauss-server/issues/I9521L<br/>https://gitee.com/opengauss/openGauss-server/issues/I8FVVU	|
|	添加一个内置函数 gs_get_recv_locations(), 支持主机挂了之后还能存放和查询备机flush lsn位点	|	https://gitee.com/opengauss/openGauss-server/pulls/6533	|	https://gitee.com/opengauss/openGauss-server/issues/I8USAY	|
|	#I9HZ82 备库日志回放能力增强，新增一种日志分发算法	|	https://gitee.com/opengauss/openGauss-server/pulls/5136	|	https://e.gitee.com/opengaussorg/dashboard?issue=I9HZ82	|
|	【同步DFX】支持switchover超时打印数据库内核的堆栈	|	https://gitee.com/opengauss/openGauss-server/pulls/6709	|	https://e.gitee.com/opengaussorg/dashboard?issue=I6DCAO	|

## 升级路径支持

| 基础版本             | 目标版本                     |
| -------------------- | ---------------------------- |
| 2.0.*(不带CM)        | 3.0.6(不带CM + 带CM)         |
| 3.0.0(不带CM + 带CM) | 3.0.6(不带CM + 带CM)         |
| 3.0.3(不带CM + 带CM) | 3.0.6(不带CM + 带CM)         |
| 3.0.5(不带CM + 带CM) | 3.0.6(不带CM + 带CM)         |
| 3.0.6(不带CM + 带CM) | >=6.0.1(不带CM + 带CM)       |
| 3.0.6(不带CM + 带CM) | master\|7.0.0(不带CM + 带CM) |

## CVE漏洞

当前补丁版本没有CVE披露漏洞。

## 缺陷回合列表


|	描述	|	PR链接	|	ISSUE链接	|
| ----- | ----- | ----- | 
|	openGauss305版本，数据库由于压缩表问题启动失败【M】	|	https://gitee.com/opengauss/openGauss-server/pulls/5459	|	https://gitee.com/opengauss/openGauss-server/issues/I9OTX6?from=project-issue	|
|	305版本，执行 \d 查看gs_obsscaninfo 系统表报错：Oid 5680 does not belong to any catalog relation【M】	|	https://gitee.com/opengauss/openGauss-server/pulls/5209	|	https://gitee.com/opengauss/openGauss-server/issues/I9JSPN	|
|	开启querydop后，产生synchronize quit等待事件且无法清理【M】	|	https://gitee.com/opengauss/openGauss-server/pulls/5489	|	https://gitee.com/opengauss/openGauss-server/issues/I9IRI9	|
|	执行gs_basebackup后，启动为主库回放速度比启动为备库慢【M】	|	https://gitee.com/opengauss/openGauss-server/pulls/5115	|	https://gitee.com/opengauss/openGauss-server/issues/I9ET1R#note_26552763	|
|	修改表结构后相关的查询报错【M】	|	https://gitee.com/opengauss/openGauss-server/pulls/5162	|	https://gitee.com/opengauss/openGauss-server/issues/I98WM5?from=project-issue	|
|	物理复制槽为f，xlog不回收问题	|	https://gitee.com/opengauss/openGauss-server/pulls/5521	|	https://e.gitee.com/opengaussorg/dashboard?issue=I9JWCD	|
|	分区表删除分区会使全局索引失效	|	https://gitee.com/opengauss/openGauss-server/pulls/5131	|	https://e.gitee.com/opengaussorg/dashboard?issue=I9C0LY	|
|	分区表全局唯一索引失效后，insert分区无报错，可能导致脏数据	|	https://gitee.com/opengauss/openGauss-server/pulls/5189	|	https://e.gitee.com/opengaussorg/dashboard?issue=I9HBFS	|
|	og 3.0.0 range interval自动分区存在多个相同时间范围分区子表	|	https://gitee.com/opengauss/openGauss-server/pulls/5522	|	https://gitee.com/opengauss/openGauss-server/issues/I8SS5J?from=project-issue	|
|	local_syscache满后清理分区表cache较慢导致出现业务超时	|	https://gitee.com/opengauss/openGauss-server/pulls/5212	|	https://e.gitee.com/opengaussorg/dashboard?issue=I9KQWM	|
|	gaussdb.state文件大小为0导致数据库启动失败	|	https://gitee.com/opengauss/openGauss-server/pulls/5180	|	https://gitee.com/opengauss/openGauss-server/issues/I8Q1FZ	|
|	数据库日志不断刷：too many history info in the memory，current history tecord is 79438	|	https://gitee.com/opengauss/openGauss-server/pulls/5519	|	https://gitee.com/opengauss/openGauss-server/issues/I8XITB	|
|	安装opengauss数据库后，无pg_archivecleanup命令	|	https://gitee.com/opengauss/openGauss-server/pulls/5525	|	https://e.gitee.com/opengaussorg/dashboard?issue=I9HCCQ	|
|	【测试类型：工具功能】【测试版本：6.0.0】【自动化】gs_probackup -j 16 在备机远程备份主机，线程无法退出，长时间打印keepalive message is received	|	https://gitee.com/opengauss/openGauss-server/pulls/5525	|	https://e.gitee.com/opengaussorg/dashboard?issue=I95N4J	|
|	【3.0.0】修复gs_catalog_attribute_records缺少description	|	https://gitee.com/opengauss/openGauss-server/pulls/5466	|	https://e.gitee.com/opengaussorg/dashboard?issue=I9P3QO	|
|	【测试类型：存储功能】【测试版本：3.0.0】 数据表开启压缩后，备份数据恢复后报错【AS】	|	https://gitee.com/opengauss/openGauss-server/pulls/5184	|	https://e.gitee.com/opengaussorg/dashboard?issue=I9ILH5	|
|	修复age(xid)函数在事务gap超过40亿时，显示不正确的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/5084	|	https://e.gitee.com/opengaussorg/dashboard?issue=I9DISV	|
|	ERROR: function pgcatalog.gs.catalog_attribute_records(unknown) is not unique【M】	|	https://gitee.com/opengauss/openGauss-server/pulls/4983	|	https://e.gitee.com/opengaussorg/dashboard?issue=I942SL	|
|	开启globalsyscache，压测CPU接近100%	|	https://gitee.com/opengauss/openGauss-server/pulls/5532	|	https://gitee.com/opengauss/openGauss-server/issues/I9PXHQ	|
|	表分区删除后，执行查询语句报错partition does not exist【M】	|	https://gitee.com/opengauss/openGauss-server/pulls/6564	|	https://gitee.com/opengauss/openGauss-server/issues/IA931U	|		|
|	autoanalyze不及时	|	https://gitee.com/opengauss/openGauss-server/pulls/4908	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8WAC0	|		|
|	修复多个session间隔执行select for update wait X sec,等待的预期时间不一致的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/6543	|	https://e.gitee.com/opengaussorg/dashboard?issue=IAFIIN	|		|
|	支持设定连接的主机类型	|	https://gitee.com/opengauss/openGauss-connector-odbc/pulls/54	|	https://e.gitee.com/opengaussorg/dashboard?issue=I9QOUM	|		|
|	hash 索引回放在 hash_xlog_split_allocate_page core	|	https://gitee.com/opengauss/openGauss-server/pulls/5208	|	https://gitee.com/opengauss/openGauss-server/issues/I96EY4	|		|
|	 执行层次查询，告警后挂库，产生core	|	https://gitee.com/opengauss/openGauss-server/pulls/5945	|	https://gitee.com/opengauss/openGauss-server/issues/IAH9Z7	|		|
|	客户端将sslmode设置为disable，仍然加载ssl相关lib，导致客户端core	|	https://gitee.com/opengauss/openGauss-connector-odbc/pulls/56	|	https://e.gitee.com/opengaussorg/dashboard?issue=I9T4EC	|		|
|	修复分区拆分后订阅段数据重复的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/5542	|	https://e.gitee.com/opengaussorg/dashboard?issue=I97JSX	|		|
|	处理gs_restore恢复带主键的表时报错	|	https://gitee.com/opengauss/openGauss-server/pulls/5540	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8FJY4	|		|
|	修复异常场景下主机残留的级联备复制槽未被清理的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/5577	|	https://gitee.com/opengauss/openGauss-server/issues/I9VA9H	|		|
|	解决3.0.0版本升级3.0.5元数据不一致问题	|	https://gitee.com/opengauss/openGauss-server/pulls/5663<br/>https://gitee.com/opengauss/openGauss-server/pulls/5656<br/>https://gitee.com/opengauss/openGauss-server/pulls/5673<br/>https://gitee.com/opengauss/openGauss-server/pulls/6086<br/>https://gitee.com/opengauss/openGauss-server/pulls/6103 |https://e.gitee.com/opengaussorg/dashboard?issue=I9Q7PF | |
|	同步 hash 索引 redo xlog 出现 LSN bigger than want 报错 bugfix	|	https://gitee.com/opengauss/openGauss-server/pulls/5704	|	https://gitee.com/opengauss/openGauss-server/issues/IA8NBQ	|		|
|	修复walsender线程重启导致的业务线程hung问题	|	https://gitee.com/opengauss/openGauss-server/pulls/5716	|	https://e.gitee.com/opengaussorg/dashboard?issue=IAA5ZP	|		|
|	gs_probackup备份偶现恢复后拉起实例失败修复	|	https://gitee.com/opengauss/openGauss-server/pulls/5798	|	https://e.gitee.com/opengaussorg/dashboard?issue=I9V3FZ	|		|
|	GUC参数无法使备机关闭CBM线程_3.0.0	|	https://gitee.com/opengauss/openGauss-server/pulls/4609	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8NPJP	|		|
|	业务insert分区表同时，分区表执行vacuum full，会检测到死锁	|	https://gitee.com/opengauss/openGauss-server/pulls/5777	|	https://e.gitee.com/opengaussorg/dashboard?issue=IAAT1L	|		|
|	修复PgPreparedStatement未实现setObjecSQLType(int, Object, SQLType)的问题	|	https://gitee.com/opengauss/openGauss-connector-jdbc/pulls/317	|	https://e.gitee.com/opengaussorg/dashboard?issue=I6609T	|		|
|	修复gs_dropnode后cms进程拉不起来的问题	|	https://gitee.com/opengauss/openGauss-OM/pulls/891	|	https://e.gitee.com/opengaussorg/dashboard?issue=IAP0HK	|		|
|	同步修复分区表全表更新时存在内存泄露 bugfix 到 3.0 版本	|	https://gitee.com/opengauss/openGauss-server/pulls/6582	|	https://e.gitee.com/opengaussorg/dashboard?issue=I6Z3JF	|		|
|	修复由于并发wal写入导致的db core问题	|	https://gitee.com/opengauss/openGauss-server/pulls/6607	|	https://e.gitee.com/opengaussorg/dashboard?issue=IB1GDC	|		|
|	优化GSC的淘汰内存回收和内存统计	|	https://gitee.com/opengauss/openGauss-server/pulls/5961	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8ZWNY	|		|
|	replace(string,substring)函数2个参数一样时报错，预期返回null	|	https://gitee.com/opengauss/openGauss-server/pulls/3898	|	https://e.gitee.com/opengaussorg/dashboard?issue=I7P9P9	|		|
|	修复SWCB在空格场景下的core问题	|	https://gitee.com/opengauss/openGauss-server/pulls/2891	|	https://e.gitee.com/opengaussorg/dashboard?issue=I6DJHY	|		|
|	函数中处理数组元素引用变量报错	|	https://gitee.com/opengauss/openGauss-server/pulls/1735	|	https://e.gitee.com/opengaussorg/issues/table?issue=I3IPYJ 	|	 	|
|	select * from pg_stat_segment_extent_usage(1663,18541, 1,4)，数据库宕机	|	https://gitee.com/opengauss/openGauss-server/pulls/3376	|	https://e.gitee.com/opengaussorg/issues/table?issue=I6RYPD	|		|
|	新增失效信息相关日志打印	|	https://gitee.com/opengauss/openGauss-server/pulls/6715	|		|		|
|	【306问题回合】PR6738 修复部分极端情况下可能存在后台线程退出失败的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/6749	|	https://e.gitee.com/opengaussorg/dashboard?issue=IB7W0G	|		|
