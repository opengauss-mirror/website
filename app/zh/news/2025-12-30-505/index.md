---
title: 'openGauss 5.0.5版本正式发布！'
date: '2025-12-30'
tags: ['theme']
author: 'openGauss'
category: 'news'
summary: 'openGauss 5.0.5 Update版本是openGauss 5.0.0 Release的第四个补丁版本。基于5.0.3补丁版本基础上，回合和修复了一些影响功能的缺陷，发布5.0.5补丁版本。'
---


## 版本介绍

openGauss 5.0.5 Update版本是openGauss 5.0.0 Release的第四个补丁版本。基于5.0.3补丁版本基础上，回合和修复了一些影响功能的缺陷，发布5.0.5补丁版本。

## 升级路径支持

| 基础版本             | 目标版本             |
| -------------------- | -------------------- |
| 3.0.5(不带CM + 带CM) | 5.0.5(不带CM + 带CM) |
| 5.0.0(不带CM + 带CM) | 5.0.5(不带CM + 带CM) |
| 5.0.1(不带CM + 带CM) | 5.0.5(不带CM + 带CM) |
| 5.0.2(不带CM + 带CM) | 5.0.5(不带CM + 带CM) |
| 5.0.3(不带CM + 带CM) | 5.0.5(不带CM + 带CM) |
| 5.0.5(不带CM + 带CM) | master(不带CM + 带CM) |

## 回合需求

|	描述	|	PR链接	|
| ----- | ----- | 
| 延迟备机优化需求 | https://gitee.com/opengauss/openGauss-server/pulls/6082    |
| 添加gs_lwlock_status视图 | https://gitee.com/opengauss/openGauss-server/pulls/6220    |
| I9HZ82 备库日志回放能力增强，新增一种日志分发算法 | https://gitee.com/opengauss/openGauss-server/pulls/5136 | 
| enable组dispatch，从而提升并行恢复的redo效率 | https://gitee.com/opengauss/openGauss-server/pulls/3878 |
| dss支持增量build | https://gitee.com/opengauss/DCC/pulls/24 |

## 回合缺陷

### 统计

| 仓库     | 转测问题单 | 
| -------- | ---- | 
| 5.0.5B001   | 39   |
| 5.0.5B002   | 5   |
| 总计 | 44   |

### 5.0.5B001转测列表

| 标题 | issue | PR |
| ----- | ----- |  ----- |
| 	GUC参数无法使备机关闭CBM线程 | https://e.gitee.com/opengaussorg/dashboard?issue=I8NPJP | https://gitee.com/opengauss/openGauss-server/pulls/4610                                                                               |
| 	修复gs_xlog_keepers函数在升级前后在pg_proc显示不同的bug，第二次修改 | https://e.gitee.com/opengaussorg/dashboard?issue=I9P3QO | https://gitee.com/opengauss/openGauss-server/pulls/6037                                        |
| 	pg_terminate_active_session_socket builtini里面添加参数名称 | https://e.gitee.com/opengaussorg/dashboard?issue=I9P3QO | https://gitee.com/opengauss/openGauss-server/pulls/6102                                                |
| 	[OpenUndoFile:402]could not open undo file "undo/permanent/00004.meta.0000000": No such file or directory | https://e.gitee.com/opengaussorg/dashboard?issue=IAL72X | https://gitee.com/opengauss/openGauss-server/pulls/6188 |
| 	Debug 模式下重建系统表索引，可能触发 Assert （!ReindexIsProcessingIndex）导致进程退出 | https://e.gitee.com/opengaussorg/dashboard?issue=I96604 | https://gitee.com/opengauss/openGauss-server/pulls/5071                     |
| 	模拟业务insert分区表同时，分区表执行vacuum full，会检测到死锁 | https://e.gitee.com/opengaussorg/dashboard?issue=IAAT1L | https://gitee.com/opengauss/openGauss-server/pulls/6200                                             |
| 	字符集增加pg_description | https://e.gitee.com/opengaussorg/dashboard?issue=I9P3QO | https://gitee.com/opengauss/openGauss-server/pulls/6343                                                                                  |
| 	表分区删除后，执行查询语句报错partition does not exist【M】 | https://e.gitee.com/opengaussorg/dashboard?issue=IA931U | https://gitee.com/opengauss/openGauss-server/pulls/6369                                               |
| 	社区发布的包不包含 ecpg相关头文件，导致无法使用ecpg [XY] | https://e.gitee.com/opengaussorg/dashboard?issue=I92YYZ | https://gitee.com/opengauss/openGauss-server/pulls/5695                                                  |
| 	当表空间设置成最大值后，并发插入数据并撑满表空间，发生core | https://e.gitee.com/opengaussorg/dashboard?issue=IAPAW1 | https://gitee.com/opengauss/openGauss-server/pulls/6237                                                |
| 	【测试类型：功能测试】【测试版本：6.0.0】使用substring函数时报错 | https://e.gitee.com/opengaussorg/dashboard?issue=I96BCH | https://gitee.com/opengauss/openGauss-server/pulls/5893                                          |
| 	hash 索引回放在 hash_xlog_split_allocate_page core | https://e.gitee.com/opengaussorg/dashboard?issue=I96EY4 | https://gitee.com/opengauss/openGauss-server/pulls/5208                                                        |
| 	3.0.5升级到5.0.3，回滚后函数pg_terminate_active_session_socket丢失 | https://e.gitee.com/opengaussorg/dashboard?issue=IB4T4O | https://gitee.com/opengauss/openGauss-server/pulls/6681                                        |
| 	【mysql兼容性】group_concat在结果字符串长度小于4时概率报错 | https://e.gitee.com/opengaussorg/dashboard?issue=IB5ENT | https://gitee.com/opengauss/openGauss-server/pulls/6700                                                |
| 	支持switchover超时打印数据库内核的堆栈 | https://e.gitee.com/opengaussorg/dashboard?issue=I6DCAO | https://gitee.com/opengauss/openGauss-server/pulls/6710                                                                    |
| 	ThreadPoolSessControl::CheckIdleInTransactionSessionTimeout()中计数变量错误 | https://e.gitee.com/opengaussorg/dashboard?issue=IAPBG8 | https://gitee.com/opengauss/openGauss-server/pulls/6238                               |
| 	bin/script下的工具help命令有内存泄漏 | https://gitee.com/opengauss/openGauss-server/issues/IAX8GO | https://gitee.com/opengauss/openGauss-server/pulls/6532                                                                   |
| 	createuser工具在密码不合规情况下有内存泄漏 | https://e.gitee.com/opengaussorg/dashboard?issue=IAX8BX | https://gitee.com/opengauss/openGauss-server/pulls/6531                                                                |
| 	由于CPU乱序可能会发生较小的xid(xid<page base_id)插入到page中的情况 | https://e.gitee.com/opengaussorg/dashboard?issue=I8H74U | https://gitee.com/opengauss/openGauss-server/pulls/6919                                        |
| 	recovery_min_apply_delay修改后无需重启才能生效为新_x005f设置值【M】 | https://e.gitee.com/opengaussorg/dashboard?issue=IB4BQV | https://gitee.com/opengauss/openGauss-server/pulls/7037                                     |
| 	update_lockwait_timeout参数不生效 | https://e.gitee.com/opengaussorg/dashboard?issue=IBPBPO | https://gitee.com/opengauss/openGauss-server/pulls/7251                                                                         |
| 	并行回放场景下，分区表在开启autovacuum后，执行大量的update操作+global索引操作将导致回放性能下降【xy】 | https://e.gitee.com/opengaussorg/dashboard?issue=I8LMB0 | https://gitee.com/opengauss/openGauss-server/pulls/7195     |
| 	create view 中含有connect by会报错 | https://e.gitee.com/opengaussorg/dashboard?issue=IBBUB6 | https://gitee.com/opengauss/openGauss-server/pulls/7477                                                                        |
| 	修改表结构后相关的查询报错【M】 | https://e.gitee.com/opengaussorg/dashboard?issue=I98WM5 | https://gitee.com/opengauss/openGauss-server/pulls/7502                                                                           |
| 	主备切换过程中主机降备时候逻辑复制相关的walsender线程没退出导致切换失败【YC】 | https://e.gitee.com/opengaussorg/issues/table?issue=IBY8ZR | https://gitee.com/opengauss/openGauss-server/pulls/7513                          |
| 	gs_probackup工具中pgut_execute_extended函数有libpq内存泄漏 | https://e.gitee.com/opengaussorg/dashboard?issue=IAJ27J | https://gitee.com/opengauss/openGauss-server/pulls/7544                                                |
| 	分区表 drop index concurrently 和 reindex partition 同时执行，在 debug 版本有概率触发 Assert | https://e.gitee.com/opengaussorg/dashboard?issue=IAOKGK | https://gitee.com/opengauss/openGauss-server/pulls/6205              |
| 	Startup回放线程卡死，回放不进行 | https://e.gitee.com/opengaussorg/dashboard?issue=IAJAKO | https://gitee.com/opengauss/openGauss-server/pulls/7563                                                                           |
| 	debug版本修改enable_incremental_checkpoint = on -> off 产生 coredump | https://e.gitee.com/opengaussorg/issues/table?issue=I88WBU | https://gitee.com/opengauss/openGauss-server/pulls/7572                                   |
| 	修复tinyint index in int array报错 | https://e.gitee.com/opengaussorg/dashboard?issue=IC3CCL | https://gitee.com/opengauss/openGauss-server/pulls/7594                                                                        |
| 	optimize smp quit condition, add log for trace | https://e.gitee.com/opengaussorg/dashboard?issue=I7L7EI | https://gitee.com/opengauss/openGauss-server/pulls/3784                                                            |
| 	支持修改计划缓存（plan cache）的结果类型 | https://e.gitee.com/opengaussorg/dashboard?issue=I98WM5 | https://gitee.com/opengauss/openGauss-server/pulls/5157                                                                  |
| 	fix CVE-2025-1094 | https://e.gitee.com/opengaussorg/dashboard?issue=IBQHTP | https://gitee.com/opengauss/openGauss-server/pulls/7329                                                                                         |
| 	resolve the issue csnlog cannot truncate when enable_ustore set off | https://e.gitee.com/opengaussorg/dashboard?issue=IBGJVS | https://gitee.com/opengauss/openGauss-server/pulls/7095                                       |
| 	【B库兼容】使用 create table t2 like t1 创建表，数据库coredump掉【zyzx】 | https://e.gitee.com/opengaussorg/dashboard?issue=IBBU7O | https://gitee.com/opengauss/Plugin/pulls/1932                                            |
| 	当in条件后字符序与表字符序不符合时，执行查询数据库core | https://e.gitee.com/opengaussorg/dashboard?issue=IBF4BE | https://gitee.com/opengauss/openGauss-server/pulls/6961                                                    |
| 	修复编码转换时保存常量地址导致的core问题 | https://e.gitee.com/opengaussorg/dashboard?issue=IB8X4I | https://gitee.com/opengauss/openGauss-server/pulls/6809                                                                  |
| 	偶现autoanalyze或autovacuum不及时导致出现慢sql | https://e.gitee.com/opengaussorg/dashboard?issue=I8WAC0 | https://gitee.com/opengauss/openGauss-server/pulls/4908                                                            |
| 	批量插入在opfusion下疑似内存泄漏[lm] | https://e.gitee.com/opengaussorg/dashboard?issue=IB0QG4 | https://gitee.com/opengauss/openGauss-server/pulls/7365                                                                      |

### 5.0.5B002 转测列表

| 标题	|	PR	|	issue	|
| ----- | ----- |  ----- |
| 【升级】5.0.5以下多个版本带cm指定节点升级至5.0.5带cm失败  |	https://gitcode.com/opengauss/openGauss-OM/pull/1095	 |  https://gitcode.com/opengauss/openGauss-server/issues/7007  |
| 【升级】3.0.5/3.0.6/5.0.0/5.0.1/5.0.2/5.0.3不带cm指定节点升级至5.0.5带cm失败	 |  https://gitcode.com/opengauss/openGauss-OM/pull/1094 |	https://gitcode.com/opengauss/openGauss-server/issues/7006  |
| gs_probackup执行备份时发生core dump	 |  https://gitcode.com/opengauss/openGauss-server/pull/7756 |	https://gitcode.com/opengauss/openGauss-server/issues/7004  |
| 5.0.1/5.0.2/5.0.3升级至5.0.5对比直装5.0.5元数据不一致问题（gs_xlog_keepers） |	https://gitcode.com/opengauss/openGauss-server/pull/7804	 |  https://gitcode.com/opengauss/openGauss-server/issues/7012  |
| 修复upsert在冲突场景下逻辑解码的问题	 |  https://gitcode.com/opengauss/openGauss-server/pull/7792  |	https://gitcode.com/opengauss/openGauss-server/issues/7065 |



### 安全漏洞

| CVE漏洞       | 修复PR                                                  |
| ------------- | ------------------------------------------------------- |
| CVE-2025-1094 | https://gitee.com/opengauss/openGauss-server/pulls/7329 |



### 附录

5.0.5版本测试报告： https://gitcode.com/opengauss/QA/tree/master/Test_Result/openGauss_5.0.5