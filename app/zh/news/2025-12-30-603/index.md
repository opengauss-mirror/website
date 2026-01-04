---
title: 'openGauss 6.0.3版本正式发布！'
date: '2025-12-30'
tags: ['theme']
author: 'openGauss'
category: 'news'
summary: 'openGauss 6.0.3 版本是 openGauss 6.0.0 Release 的补丁版本。在 6.0.2 版本基础上，回合主干分支的部分需求和缺陷，发布 6.0.3 补丁版本。'
---


## 版本介绍

openGauss 6.0.3 版本是 openGauss 6.0.0 Release 的补丁版本。在 6.0.2 版本基础上，回合主干分支的部分需求和缺陷，发布 6.0.3 补丁版本。

## 需求范围

openGauss 6.0.3 补丁版本回合的需求列表：

|      序号      |       需求描述    |
| ------| ------------------------------------------------------------ |
|   1   | cpu、内存资源使用优化                                             |
|   2   | sqlserver兼容性                                                   |
|   3   | 子事务场景autosave性能提升                                        |
|   4   | 增量build场景支持校验commit lsn                                   |
|   5   | 视图pg_stat_all_tables新增列last_seq_scan和last_idx_scan          |
|   6   | B库sysbench性能优化                                               |

## 升级路径支持

| 基础版本                | 目标版本                       |
| ----------------------- | ------------------------------ |
| 5.0.\*(不带 CM + 带 CM) | 6.0.3(不带 CM + 带 CM)         |
| 6.0.\*(不带 CM + 带 CM)  | 6.0.3(不带 CM + 带 CM)         |
| 6.0.3(不带 CM + 带 CM)  | master\|7.0.0RC3(不带 CM + 带 CM) |

共享存储升级支持：

| 基础版本                | 目标版本                       |
| ----------------------- | ------------------------------ |
| 6.0.1-6.0.2   |    6.0.3        |
| 6.0.3    |    master\|7.0.0RC3    |

## CVE 漏洞修复

| 漏洞编号       | 涉及组件   |
| ----------- | ---------- |
| CVE-2025-6170 | libxml2 |
| CVE-2025-49794 | libxml2 |
| CVE-2025-49796 | libxml2 |
| CVE-2025-6021 | libxml2 |
| CVE-2025-47287 | tornado |
| CVE-2025-54349 | iperf |
| CVE-2025-54350 | iperf |
| CVE-2025-54351 | iperf |
| CVE-2023-53154 | cJSON |
| CVE-2025-10823 | fio |
| CVE-2025-9230 | openssl |
| CVE-2025-57052 | cJSON |
| CVE-2025-0167 | libcurl |
| CVE-2025-0725 | libcurl |
| CVE-2025-9086 | libcurl |
| CVE-2025-1094 | gsql |

## 缺陷回合列表

| 版本      | 修复issue                                                    |
| --------- | ------------------------------------------------------------ |
| 6.0.3B001 | 内核: 128 <br/>插件: 36  <br/>工具: 26  <br/>驱动: 12   <br/>SqlServer兼容性：91 <br/> |
| 6.0.3B002 | 14                                                           |
| 6.0.3B003 | 6                                                            |



## 6.0.3B001回合转测列表：

### 内核
|	标题	|	关联PR	|	关联ISSUE	|
| ----- | ----- | ----- |
|	【回合6.0.0】修复bypass 开启enable_beta_opfusion查询结果不一致问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8640	|	https://gitcode.com/opengauss/openGauss-server/issues/7421	|
|	【回合6.0.0】修复指令乱序发射可能导致的XLOG缓存申请与XLOG插入状态不一致的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8638	|	https://gitcode.com/opengauss/openGauss-server/issues/7050	|
|	【回合6.0.0】power_var_int精度问题修复	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8637	|	https://gitcode.com/opengauss/openGauss-server/issues/7315	|
|	【回合6.0.0】代码分析发现支持控制事务线程主动刷日志特性可能影响资源池化性能	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8258	|	https://gitcode.com/opengauss/openGauss-server/issues/6992	|
|	【回合6.0.0】解决GPC特性未生效问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8256	|	https://gitcode.com/opengauss/openGauss-server/issues/7074	|
|	【回合6.0.0】修改在对用户的select行为使用相关配置后没有生效的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7917	|	https://gitcode.com/opengauss/openGauss-server/issues/7289	|
|	【回合6.0.0】包含空表时可以做短路处理修复	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8244	|	https://gitcode.com/opengauss/openGauss-server/issues/7264	|
|	【回合6.0.0】创建索引core修复	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7919	|	https://gitcode.com/opengauss/openGauss-server/issues/6885	|
|	【回合6.0.0】修复xlog_write_core问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8672	|	无	|
|	回合向量索引不支持分区表/不支持concurrently构建	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8191	|	https://gitcode.com/opengauss/openGauss-server/issues/7386	|
|	回合optimizer告警与bugfix修改	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8619	|	https://gitcode.com/opengauss/openGauss-server/issues/7624	|
|	【回合6.0.0】fastcheck测试是发现内存泄露	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8618	|	https://gitcode.com/opengauss/openGauss-server/issues/7075	|
|	回合分区表性能优化	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8616	|	https://gitcode.com/opengauss/openGauss-server/issues/7438	|
|	【回合6.0.0】修复x86计算问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8615	|	https://gitcode.com/opengauss/openGauss-server/issues/7473	|
|	[回合6.0.0] 修改部分func申请内存校验	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8614	|	https://gitcode.com/opengauss/openGauss-server/issues/7458	|
|	【bugfix】解决gs_ctl query 和reload同时执行报错	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8609	|	https://gitcode.com/opengauss/openGauss-server/issues/7706	|
|	【回合】修复shared_buffers 配置不是16的倍数时，slot计算结果异常问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7091	|	https://gitcode.com/opengauss/openGauss-server/issues/6373	|
|	[回合6.0.0] dolphin升级4.3	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8600	|	https://gitcode.com/opengauss/release-management/issues/13	|
|	【回合6.0.0】在7.0.0RC3B005版本，在可编程逻辑的变量声明中，声明变量类型为unknown后，数据库挂掉	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8597	|	https://gitcode.com/opengauss/openGauss-server/issues/7695	|
|	fix memchk error	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8582	|	https://gitcode.com/opengauss/openGauss-server/issues/7693	|
|	【master 回合 6.0】修复池化模拟环境tpcc导仓等锁超时的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8572	|	https://gitcode.com/opengauss/openGauss-server/issues/7691	|
|	【回合6.0.0】解决并行删除分区表报错的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8562	|	https://gitcode.com/opengauss/release-management/issues/13	|
|	【回合6.0.0】修复上万张表连接导致爆栈的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8557	|	https://gitcode.com/opengauss/openGauss-server/issues/7681	|
|	增加部分information schema视图	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8550	|	https://gitcode.com/opengauss/Plugin/issues/1571	|
|	[回合600]修复参数化视图查询时出现的内存泄漏问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8548	|	https://gitcode.com/opengauss/openGauss-server/issues/7333	|
|	【回合6.0.0】删除视图依赖表同步server && 修改若干bug	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8519	|	https://gitcode.com/opengauss/openGauss-server/issues/7661	|
|	【回合6.0.0】修复异构备份	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8502	|	https://gitcode.com/opengauss/openGauss-server/issues/7647	|
|	【回合6.0.0】fix uname -p bug	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8499	|	https://gitcode.com/opengauss/openGauss-server/issues/7649	|
|	【回合6.0.0】修复pg_am升级元数据不一致的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8491	|	https://gitcode.com/opengauss/openGauss-server/issues/7605	|
|	【回合6.0.0】去掉wlm_init_done参数对WLM线程起事务的限制	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8434	|	https://gitcode.com/opengauss/openGauss-server/issues/7540	|
|	[master回合6.0.0]修复gsql反复重连内存泄露的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8425	|	https://gitcode.com/opengauss/openGauss-server/issues/7405	|
|	修复存储过程中包含DECLARE EXIT handler FOR SQLEXCEPTION，前面的return不生效的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8417	|	https://gitcode.com/opengauss/openGauss-server/issues/6675	|
|	【回合6.0.0】修复spq readfuncs和outfuncs遗漏版本号控制的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8402	|	https://gitcode.com/opengauss/openGauss-server/issues/7573	|
|	bugfix: server仓不稳定用例hw_partition_hash_dml函数pg_stat_get_live_tuples执行失败	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8352	|	https://gitcode.com/opengauss/openGauss-server/issues/7424	|
|	回合-存储过程exit失败导致死循环	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8337	|	https://gitcode.com/opengauss/openGauss-server/issues/6567	|
|	【回合6.0.0】fix ecpg decdiv/decmul numeric to decimal overflow error & add Test	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8317	|	https://gitcode.com/opengauss/openGauss-server/issues/7291	|
|	fix delete index issue	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8304	|	https://gitcode.com/opengauss/openGauss-server/issues/7409	|
|	bugfix 修复sonic hash agg处理int4类型部分情况下match失败，导致去重不正确的问题-回合6.0.0	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8263	|	https://gitcode.com/opengauss/openGauss-server/issues/7363	|
|	【代码回合】回合6.0.0分支, 修复导出enum问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8200	|	https://gitcode.com/opengauss/openGauss-server/issues/7392	|
|	PBE代码优化重构 	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7767	|	https://gitcode.com/opengauss/org-issue/issues/1279	|
|	feat: count()+索引扫描支持sql bypass	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7721	|	https://gitcode.com/opengauss/openGauss-server/issues/7001	|
|	修复GUC参数shared_preload_libraries设置多个值时重启core 	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7682	|	https://gitcode.com/opengauss/openGauss-server/issues/6964	|
|	schema-only选项控制interval分区的dump 	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7976	|	https://gitcode.com/opengauss/openGauss-server/issues/7161	|
|	修复B库非严格模式下replace null报错问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7940	|	https://gitcode.com/opengauss/openGauss-server/issues/7174	|
|	修复interval分区表dump结果缺失分区的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7920	|	https://gitcode.com/opengauss/openGauss-server/issues/7161	|
|	修复继承表错误生成等价类条件导致coredump的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7914	|	https://gitcode.com/opengauss/openGauss-server/issues/7109	|
|	修复UserVar查询结果错误的问题 	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7896	|	https://gitcode.com/opengauss/Plugin/issues/1484	|
|	禁止initdb创建数字开头用户名	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7978	|	https://gitcode.com/opengauss/openGauss-server/issues/7204	|
|	修复灾备集群级联备switchover错误问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7772	|	https://gitcode.com/opengauss/openGauss-server/issues/7081	|
|	修复db4ai_bug 	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7444	|	https://gitcode.com/opengauss/openGauss-server/issues/6736	|
|	[bugfix]gs_probackup restore偶现恢复失败问题修改	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7971	|	https://gitcode.com/opengauss/CM/issues/218	|
|	修复一处double write日志打印导致的崩溃	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7972	|	https://gitcode.com/opengauss/openGauss-server/issues/6089	|
|	pg_buffercache_pages用例添加checkpoint操作	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7982	|	https://gitcode.com/opengauss/openGauss-server/issues/7187	|
|	修复视图查询term值异常问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8005	|	https://gitcode.com/opengauss/CM/issues/216	|
|	修复sum_ext 走不了 fusion的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8043	|	https://gitcode.com/opengauss/Plugin/issues/1518	|
|	修复DOMAIN上NOT VALID的约束无法导出的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8049	|	https://gitcode.com/opengauss/openGauss-server/issues/7285	|
|	修复订阅端并行构建索引失败的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8052	|	https://gitcode.com/opengauss/openGauss-server/issues/7164	|
|	修复exit失败导致死循环缺陷	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8064	|	https://gitcode.com/opengauss/openGauss-server/issues/6876	|
|	小幅优化numeric计算性能	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8084	|	https://gitcode.com/opengauss/Plugin/issues/1521	|
|	小性能优化	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8089	|	https://gitcode.com/opengauss/Plugin/issues/1521	|
|	优化索引扫描性能	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8094	|	https://gitcode.com/opengauss/Plugin/issues/1521	|
|	[bugfix] repair generated_when and generated_kind params in node Constraint	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8118	|	https://gitcode.com/opengauss/Plugin/issues/1511	|
|	支持insert类型对分区表做seqscan操作	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8121	|	https://gitcode.com/opengauss/openGauss-server/issues/7357	|
|	修复增加表字段，调用存储过程传入新增参数，数据库core掉的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8124	|	https://gitcode.com/opengauss/openGauss-server/issues/7097	|
|	check_log_duration优化	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8135	|	https://gitcode.com/opengauss/Plugin/issues/1521	|
|	[bugfix] adding security_plugin in shared_preload_libraries	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8138	|	https://gitcode.com/opengauss/openGauss-server/issues/7257	|
|	修改xlog init问题，避免爆栈	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8141	|	https://gitcode.com/opengauss/openGauss-server/issues/966	|
|	使用分布式宏控制setCachedPlanBucketId相关代码	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8148	|	https://gitcode.com/opengauss/Plugin/issues/1521	|
|	将load library时的mutex lock改为rdlock，提升并发性	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8160	|	https://gitcode.com/opengauss/Plugin/issues/1521	|
|	修复enable_multi_charset下initdb失败的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8165	|	https://gitcode.com/opengauss/openGauss-server/issues/7370	|
|	修复enum类型导入导出时失败的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8182	|	https://gitcode.com/opengauss/openGauss-server/issues/7392	|
|	将cfunchash从全局变量改为u_sess变量，去除大部分使用g_dlerror_lock_rw的地方	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8185	|	https://gitcode.com/opengauss/Plugin/issues/1521	|
|	修复guc参数设置问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8199	|	https://gitcode.com/opengauss/openGauss-server/issues/7358	|
|	[bugfix] memory leak	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8207	|	https://gitcode.com/opengauss/openGauss-server/issues/7417	|
|	优化DML场景的部分索引状态判断和default on update判断条件，提升性能	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8209	|	https://gitcode.com/opengauss/Plugin/issues/1521	|
|	在kernel侧增加对sql语句中占位符个数和实际传入的绑定参数个数做校验，避免libpq调用PQexecParams接口执行查询时入参数错误触发异常	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8224	|	https://gitcode.com/opengauss/openGauss-server/issues/7429	|
|	修复外键检查导致返回行数错误的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8225	|	https://gitcode.com/opengauss/Plugin/issues/1498	|
|	提升B库下serial列插入性能	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8228	|	https://gitcode.com/opengauss/Plugin/issues/1521	|
|	修改编码问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8229	|	https://gitcode.com/opengauss/openGauss-server/issues/7408	|
|	修复@@操作符执行长时间无响应且无法打断的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8230	|	https://gitcode.com/opengauss/openGauss-server/issues/7437	|
|	修复polygon数据使用&&运算符报错type line is not implemented的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8234	|	https://gitcode.com/opengauss/openGauss-server/issues/7365	|
|	优化B库在低并发下的filter、projection场景时的性能	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8237	|	https://gitcode.com/opengauss/Plugin/issues/1521	|
|	禁止非初始用户修改系统视图	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8239	|	https://gitcode.com/opengauss/openGauss-server/issues/7369	|
|	bm25索引在enable_bm25_taat参数为off场景下查询结果重复的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8241	|	https://gitcode.com/opengauss/openGauss-server/issues/7060	|
|	修复bm25索引查询&操作符一样场景校验存在问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8242	|	https://gitcode.com/opengauss/openGauss-server/issues/7119	|
|	修复bm25字段校验问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8243	|	https://gitcode.com/opengauss/openGauss-server/issues/7024	|
|	修复b_format_behavior_compat_options=enable_multi_charset数据库gs_init失败	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8245	|	https://gitcode.com/opengauss/openGauss-server/issues/7370	|
|	修复全文检索分数不变的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8246	|	https://gitcode.com/opengauss/openGauss-server/issues/7094	|
|	【bugfix】 修复max_connection配置太小，资源池化起不来的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8247	|	https://gitcode.com/opengauss/openGauss-server/issues/7372	|
|	[bugfix] repair sql select	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8248	|	https://gitcode.com/opengauss/openGauss-server/issues/7467	|
|	fix analyze memory palloc failed	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8249	|	https://gitcode.com/opengauss/openGauss-server/issues/7384	|
|	[bugfix] adding return value for function	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8250	|	https://gitcode.com/opengauss/openGauss-server/issues/7470	|
|	修复自适应计划选择的断言失败问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8251	|	https://gitcode.com/opengauss/openGauss-server/issues/7439	|
|	修复检查分区键是否属于所有唯一约束键子集的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8255	|	https://gitcode.com/opengauss/openGauss-server/issues/7452	|
|	修复线程池模式下设置max_stack_depth未生效的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8265	|	https://gitcode.com/opengauss/openGauss-server/issues/7453	|
|	修复函数返回值问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8268	|	https://gitcode.com/opengauss/openGauss-server/issues/6692	|
|	修复一主一备一级联集群中，级联备机无法执行switchover命令	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8277	|	https://gitcode.com/opengauss/openGauss-server/issues/6617	|
|	fix analyze bug	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8279	|	https://gitcode.com/opengauss/openGauss-server/issues/7384	|
|	解决并行删除分区表报错的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8283	|	https://gitcode.com/opengauss/openGauss-server/issues/6889	|
|	bugfix 修复表达式索引相关问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8286	|	https://gitcode.com/opengauss/openGauss-server/issues/7273	|
|	修复CBM问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8287	|	https://gitcode.com/opengauss/openGauss-server/issues/313	|
|	修复Ustore表中regexp_substr字符处理有误得问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8289	|	https://gitcode.com/opengauss/openGauss-server/issues/7188	|
|	bugfix 修复流水线parse_xlog概率性报错问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8292	|	https://gitcode.com/opengauss/openGauss-server/issues/7423	|
|	支持alter trigger set owner	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8298	|	https://gitcode.com/opengauss/openGauss-server/issues/7273	|
|	修复jemalloc三方库未日落存在的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8299	|	https://gitcode.com/opengauss/openGauss-server/issues/7346	|
|	fix pg_relation_size coredump	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8301	|	https://gitcode.com/opengauss/openGauss-server/issues/7432	|
|	bugfix: gs_dump core	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8311	|	https://gitcode.com/opengauss/openGauss-server/issues/7469	|
|	编码规范	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8315	|	https://gitcode.com/opengauss/openGauss-server/issues/7408	|
|	[bugfix]代码扫描整改	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8324	|	https://gitcode.com/opengauss/openGauss-server/issues/7408	|
|	优化B库在低并发下的filter、projection场景时的性能	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8327	|	https://gitcode.com/opengauss/Plugin/issues/1521	|
|	input gsql connect_timeout valid	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8336	|	https://gitcode.com/opengauss/openGauss-server/issues/7463	|
|	bugfix: server仓不稳定用例hw_partition_hash_dml函数pg_stat_get_live_tuples执行失败	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8348	|	https://gitcode.com/opengauss/openGauss-server/issues/7424	|
|	修复server仓多处代码存在内存泄漏或空指针引用问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8358	|	https://gitcode.com/opengauss/openGauss-server/issues/7518	|
|	修复变量不支持中文名字的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8372	|	https://gitcode.com/opengauss/openGauss-server/issues/7509	|
|	修复存储过程exception内存泄漏的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8374	|	https://gitcode.com/opengauss/openGauss-server/issues/7511	|
|	fix bug disater	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8376	|	https://gitcode.com/opengauss/openGauss-server/issues/7431	|
|	fix null	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8380	|	https://gitcode.com/opengauss/openGauss-server/issues/7520	|
|	修复jdbc驱动无法获取指定自增值的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8386	|	https://gitcode.com/opengauss/openGauss-server/issues/7538	|
|	修复部分情况下isnull错误的问题2	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8393	|	https://gitcode.com/opengauss/Plugin/issues/1552	|
|	修复polygon数据使用&&运算符报错type line is not implemented的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8394	|	https://gitcode.com/opengauss/openGauss-server/issues/7365	|
|	修复into @var和into 自定义变量不能混用的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8405	|	https://gitcode.com/opengauss/openGauss-server/issues/7521	|
|	modify exit produce	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8408	|	https://gitcode.com/opengauss/openGauss-server/issues/7552	|
|	修复嵌套数组插入表时异常的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8409	|	https://gitcode.com/opengauss/openGauss-server/issues/7516	|
|	修复存储过程中包含DECLARE EXIT handler FOR SQLEXCEPTION，前面的return不生效的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8411	|	https://gitcode.com/opengauss/openGauss-server/issues/6675	|
|	bugfix 按需回放适配clean up场景	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8421	|	https://gitcode.com/opengauss/openGauss-server/issues/7087	|
|	add gsql default connect timeout	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8438	|	https://gitcode.com/opengauss/openGauss-server/issues/7597	|
|	fix bug for standby cluster when switchover	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8461	|	https://gitcode.com/opengauss/openGauss-server/issues/7618	|
|	fix bm25 insert bug	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8479	|	https://gitcode.com/opengauss/openGauss-server/issues/7637	|



### 插件
|	标题	|	关联PR	|	关联ISSUE	|
| ----- | ----- | ----- |
|	修复sysbench通过mysql协议执行失败的问题	|	https://gitcode.com/opengauss/Plugin/merge_requests/2137	|	https://gitcode.com/opengauss/openGauss-server/issues/7072	|
|	修复prepare enum/set失败的问题	|	https://gitcode.com/opengauss/Plugin/merge_requests/2138	|	https://gitcode.com/opengauss/Plugin/issues/1491	|
|	mysql协议-小性能优化	|	https://gitcode.com/opengauss/Plugin/merge_requests/2157	|	https://gitcode.com/opengauss/org-issue/issues/1279	|
|	删除视图依赖表同步server && 修改若干bug	|	https://gitcode.com/opengauss/Plugin/merge_requests/1912	|	https://gitcode.com/opengauss/openGauss-server/issues/21	|
|	dolphin插件限制聚合场景SMP并行	|	https://gitcode.com/opengauss/Plugin/merge_requests/2168	|	https://gitcode.com/opengauss/openGauss-server/issues/7052	|
|	【bugfix】解决extract结果不对的问题	|	https://gitcode.com/opengauss/Plugin/merge_requests/2162	|	https://gitcode.com/opengauss/openGauss-server/issues/6936	|
|	修复mysql协议setLong传入负数时数据溢出的问题	|	https://gitcode.com/opengauss/Plugin/merge_requests/2122	|	https://gitcode.com/opengauss/Plugin/issues/1488	|
|	修复mod函数与mysql不一致问题	|	https://gitcode.com/opengauss/Plugin/merge_requests/2158	|	https://gitcode.com/opengauss/Plugin/issues/1500	|
|	【测试用例】修复sum(int)走不了bypass的问题	|	https://gitcode.com/opengauss/Plugin/merge_requests/2184	|	https://gitcode.com/opengauss/Plugin/issues/1518	|
|	B协议场景性能优化	|	https://gitcode.com/opengauss/Plugin/merge_requests/2189	|	https://gitcode.com/opengauss/Plugin/issues/1521	|
|	使用simple hash存储b_typoid2DolphinMarcoHash	|	https://gitcode.com/opengauss/Plugin/merge_requests/2200	|	https://gitcode.com/opengauss/Plugin/issues/1521	|
|	Plugin仓安全整改	|	https://gitcode.com/opengauss/Plugin/merge_requests/2202	|	https://gitcode.com/opengauss/openGauss-server/issues/7335	|
|	小性能优化	|	https://gitcode.com/opengauss/Plugin/merge_requests/2204	|	https://gitcode.com/opengauss/Plugin/issues/1521	|
|	B协议性能优化	|	https://gitcode.com/opengauss/Plugin/merge_requests/2210	|	https://gitcode.com/opengauss/Plugin/issues/1521	|
|	B协议性能优化	|	https://gitcode.com/opengauss/Plugin/merge_requests/2211	|	https://gitcode.com/opengauss/Plugin/issues/1521	|
|	修复B协议执行desc plan阻塞的问题	|	https://gitcode.com/opengauss/Plugin/merge_requests/2213	|	https://gitcode.com/opengauss/Plugin/issues/1526	|
|	B协议性能优化	|	https://gitcode.com/opengauss/Plugin/merge_requests/2214	|	https://gitcode.com/opengauss/Plugin/issues/1521	|
|	修复在B库使用协议兼容，用mysql jdbc连接og，使用autocommit功能，状态异常的问题	|	https://gitcode.com/opengauss/Plugin/merge_requests/2215	|	https://gitcode.com/opengauss/Plugin/issues/1525	|
|	将load library时的mutex lock改为rdlock，提升并发性	|	https://gitcode.com/opengauss/Plugin/merge_requests/2222	|	https://gitcode.com/opengauss/Plugin/issues/1521	|
|	【B库B协议加固】修复b协议jdbc打印time等时间类型错误的问题	|	https://gitcode.com/opengauss/Plugin/merge_requests/2225	|	https://gitcode.com/opengauss/Plugin/issues/1532	|
|	修复int8和text比较结果不正确的问题	|	https://gitcode.com/opengauss/Plugin/merge_requests/2226	|	https://gitcode.com/opengauss/Plugin/issues/1535	|
|	将cfunchash从全局变量改为u_sess变量，去除大部分使用g_dlerror_lock_rw的地方	|	https://gitcode.com/opengauss/Plugin/merge_requests/2229	|	https://gitcode.com/opengauss/Plugin/issues/1521	|
|	B协议性能优化	|	https://gitcode.com/opengauss/Plugin/merge_requests/2232	|	https://gitcode.com/opengauss/Plugin/issues/1521	|
|	修复transform_unknown_param_type_as_column_type_first打开时uint8到bit比较错误的问题	|	https://gitcode.com/opengauss/Plugin/merge_requests/2233	|	https://gitcode.com/opengauss/openGauss-server/issues/7369	|
|	【同步server代码】优化DML场景的部分索引状态判断和default on update判断条件，提升性能	|	https://gitcode.com/opengauss/Plugin/merge_requests/2236	|	https://gitcode.com/opengauss/Plugin/issues/1521	|
|	优化B库在低并发下的filter、projection场景时的性能	|	https://gitcode.com/opengauss/Plugin/merge_requests/2247	|	https://gitcode.com/opengauss/Plugin/issues/1521	|
|	修复cmake编译不带4.1--4.2.sql的问题	|	https://gitcode.com/opengauss/Plugin/merge_requests/2265	|	https://gitcode.com/opengauss/Plugin/issues/1560	|
|	fix spq	|	https://gitcode.com/opengauss/Plugin/merge_requests/2256	|	https://gitcode.com/opengauss/Plugin/issues/1544	|
|	优化B库在低并发下的filter、projection场景时的性能	|	https://gitcode.com/opengauss/Plugin/merge_requests/2257	|	https://gitcode.com/opengauss/Plugin/issues/1521	|
|	修复B模式DATE为0000-00-00时查找和删除结果不一致的问题	|	https://gitcode.com/opengauss/Plugin/merge_requests/2263	|	https://gitcode.com/opengauss/Plugin/issues/1561	|
|	优化B库OG协议下的数据类型打印性能	|	https://gitcode.com/opengauss/Plugin/merge_requests/2266	|	https://gitcode.com/opengauss/Plugin/issues/1521	|
|	B库B协议基础算子数据类型输出性能优化	|	https://gitcode.com/opengauss/Plugin/merge_requests/2267	|	https://gitcode.com/opengauss/Plugin/issues/1521	|
|	修复jdbc驱动无法获取指定自增值的问题	|	https://gitcode.com/opengauss/Plugin/merge_requests/2272	|	https://gitcode.com/opengauss/openGauss-server/issues/7538	|
|	修复alter partition organize报错的问题	|	https://gitcode.com/opengauss/Plugin/merge_requests/2274	|	https://gitcode.com/opengauss/openGauss-server/issues/7485	|
|	修复select into 用户自定义变量和局部定义变量不能混合使用的问题	|	https://gitcode.com/opengauss/Plugin/merge_requests/2277	|	https://gitcode.com/opengauss/openGauss-server/issues/7521	|
|	添加spq异常判空	|	https://gitcode.com/opengauss/Plugin/merge_requests/2291	|	https://gitcode.com/opengauss/Plugin/issues/1570	|


### 工具
|	标题	|	关联PR	|	关联ISSUE	|
| ----- | ----- | ----- |
|	去除lib符号表 	|	https://gitcode.com/opengauss/openGauss-OM/merge_requests/1197	|	https://gitcode.com/opengauss/security/issues/358	|
|	preinstall的校验升级操作里面，区分下是否子用户在做preinstall操作	|	https://gitcode.com/opengauss/openGauss-OM/merge_requests/1197	|	https://gitcode.com/opengauss/openGauss-server/issues/7419	|
|	升级提交，删除新版本没有，旧版本有的文件 	|	https://gitcode.com/opengauss/openGauss-OM/merge_requests/1197	|	https://gitcode.com/opengauss/openGauss-server/issues/7319	|
|	在preinstall前检查下集群是否存在升级未提交状态，存在则拦截升级	|	https://gitcode.com/opengauss/openGauss-OM/merge_requests/1197	|	https://gitcode.com/opengauss/openGauss-server/issues/6278	|
|	修复扩容没有拷贝cm配置的问题	|	https://gitcode.com/opengauss/openGauss-OM/merge_requests/1197	|	https://gitcode.com/opengauss/openGauss-OM/issues/720	|
|	fix dss_home目录偶现创建失败 	|	https://gitcode.com/opengauss/openGauss-OM/merge_requests/1197	|	https://gitcode.com/opengauss/openGauss-server/issues/7115	|
|	适配EulerOS系统	|	https://gitcode.com/opengauss/openGauss-OM/merge_requests/1197	|	https://gitcode.com/opengauss/openGauss-server/issues/7141	|
|	修复gs_sdr搭建容灾时,没有恢复wal_keep_segments	|	https://gitcode.com/opengauss/openGauss-OM/merge_requests/1197	|	https://gitcode.com/opengauss/openGauss-OM/issues/700	|
|	【bugfix】节点角色重复导致缩容后dn脑裂	|	https://gitcode.com/opengauss/openGauss-OM/merge_requests/1178	|	https://gitcode.com/opengauss/openGauss-OM/issues/737	|
|	【回合6.0.0】解决缩容时ip相互包含导致缩容失败	|	https://gitcode.com/opengauss/openGauss-OM/merge_requests/1177	|	https://gitcode.com/opengauss/openGauss-OM/issues/735	|
|	【bugfix】修改缩容时ip匹配	|	https://gitcode.com/opengauss/openGauss-OM/merge_requests/1172	|	https://gitcode.com/opengauss/openGauss-OM/issues/735	|
|	偶现缩容存在超时	|	https://gitcode.com/opengauss/openGauss-OM/merge_requests/1167	|	https://gitcode.com/opengauss/openGauss-OM/issues/731	|
|	修复主备名称有包含关系时候缩容失败	|	https://gitcode.com/opengauss/openGauss-OM/merge_requests/1158	|	https://gitcode.com/opengauss/openGauss-OM/issues/730	|
|	解决缩容过程因hostname字符串匹配错误导致缩容失败问题	|	https://gitcode.com/opengauss/openGauss-OM/merge_requests/1157	|	https://gitcode.com/opengauss/openGauss-OM/issues/730	|
|	带CM库容指定local模式下，需要主动主新节点做下重启	|	https://gitcode.com/opengauss/openGauss-OM/merge_requests/1156	|	https://gitcode.com/opengauss/openGauss-OM/issues/704	|
|	修复升级不在第一个节点执行报错的问题	|	https://gitcode.com/opengauss/openGauss-OM/merge_requests/1141	|	https://gitcode.com/opengauss/openGauss-OM/issues/726	|
|	编译选项整改	|	https://gitcode.com/opengauss/CM/merge_requests/439	|	https://gitcode.com/opengauss/security/issues/358	|
|	修复灾备集群 switchover -D -n 超时问题	|	https://gitcode.com/opengauss/CM/merge_requests/439	|	https://gitcode.com/opengauss/CM/issues/241	|
|	CM支持自动failover级联备	|	https://gitcode.com/opengauss/CM/merge_requests/439	|	https://gitcode.com/opengauss/openGauss-server/issues/6692	|
|	传统主备灾备集群支持 switchover	|	https://gitcode.com/opengauss/CM/merge_requests/439	|	https://gitcode.com/opengauss/CM/issues/225	|
|	[bugfix]增加cms切主后清理内存中只读信息机制	|	https://gitcode.com/opengauss/CM/merge_requests/439	|	https://gitcode.com/opengauss/CM/issues/17	|
|	修复状态更新异常问题	|	https://gitcode.com/opengauss/CM/merge_requests/435	|	https://gitcode.com/opengauss/openGauss-server/issues/7534	|
|	修复ha状态显示异常问题	|	https://gitcode.com/opengauss/CM/merge_requests/435	|	https://gitcode.com/opengauss/openGauss-server/issues/7545	|
|	修改退出顺序，避免openssl踩内存问题	|	https://gitcode.com/opengauss/CM/merge_requests/435	|	https://gitcode.com/opengauss/openGauss-server/issues/7554	|
|	控制退出时序	|	https://gitcode.com/opengauss/CM/merge_requests/435	|	https://gitcode.com/opengauss/CM/issues/245	|
|	修复两节点cms连接问题【回合6.0.0】	|	https://gitcode.com/opengauss/CM/merge_requests/434	|	https://gitcode.com/opengauss/CM/issues/243	|



### 驱动
|	标题	|	关联PR	|	关联ISSUE	|
| ----- | ----- | ----- |
|	解决preparedStatementCacheQueries参数不生效问题	|	https://gitcode.com/opengauss/openGauss-connector-jdbc/merge_requests/373	|	https://gitcode.com/opengauss/openGauss-connector-jdbc/issues/639	|
|	jdbc接口方法加固	|	https://gitcode.com/opengauss/openGauss-connector-jdbc/merge_requests/373	|	https://gitcode.com/opengauss/openGauss-connector-jdbc/issues/641	|
|	将getGuc改为prepareStatement预编译模式执行 	|	https://gitcode.com/opengauss/openGauss-connector-jdbc/merge_requests/373	|	https://gitcode.com/opengauss/openGauss-connector-jdbc/issues/626	|
|	[任务]: 代码仓静态扫描分析和修复	|	https://gitcode.com/opengauss/openGauss-connector-jdbc/merge_requests/373	|	https://gitcode.com/opengauss/openGauss-workbench/issues/1080	|
|	[任务]: openGauss开源仓编码加固	|	https://gitcode.com/opengauss/openGauss-connector-jdbc/merge_requests/373	|	https://gitcode.com/opengauss/openGauss-server/issues/7335	|
|	[Bug]: jdbc获取列信息缺少生成列 IS_GENERATEDCOLUMN	|	https://gitcode.com/opengauss/openGauss-connector-jdbc/merge_requests/373	|	https://gitcode.com/opengauss/openGauss-connector-jdbc/issues/625	|
|	【安全整改】密钥硬编码整改	|	https://gitcode.com/opengauss/openGauss-connector-odbc/merge_requests/77	|	https://gitcode.com/opengauss/openGauss-server/issues/7335	|
|	针对ODBC的lib库分离符号表	|	https://gitcode.com/opengauss/openGauss-connector-odbc/merge_requests/77	|	https://gitcode.com/opengauss/openGauss-connector-odbc/issues/27	|
|	odbc的lib库没有抽离符号表，安全扫描告警	|	https://gitcode.com/opengauss/openGauss-connector-odbc/merge_requests/77	|	https://gitcode.com/opengauss/openGauss-connector-odbc/issues/27	|
|	修复psycopg2安全漏洞	|	https://gitcode.com/opengauss/openGauss-connector-python-psycopg2/merge_requests/61	|	https://gitcode.com/opengauss/openGauss-connector-python-psycopg2/issues/44	|
|	fix security compile	|	https://gitcode.com/opengauss/openGauss-connector-python-psycopg2/merge_requests/61	|	https://gitcode.com/opengauss/openGauss-connector-python-psycopg2/issues/43	|
|	组件接口优化	|	https://gitcode.com/opengauss/openGauss-connector-python-psycopg2/merge_requests/61	|	https://gitcode.com/opengauss/openGauss-server/issues/7582	|



### DDES
|	标题	|	关联PR	|	关联ISSUE	|
| ----- | ----- | ----- |
|	retry and add log	|	https://gitcode.com/opengauss/DSS/merge_requests/675	|	https://gitcode.com/opengauss/openGauss-server/issues/7547	|
|	【修改】修改锁超时时间，避免报错	|	https://gitcode.com/opengauss/DSS/merge_requests/674	|	https://gitcode.com/opengauss/openGauss-server/issues/7224	|
|	修改退出逻辑，在因socket繁忙超时时，进行重试	|	https://gitcode.com/opengauss/DSS/merge_requests/671	|	https://gitcode.com/opengauss/DSS/issues/382	|
|	添加定位日志并且对信号处理进行优化	|	https://gitcode.com/opengauss/CBB/merge_requests/342	|	https://gitcode.com/opengauss/openGauss-server/issues/7547	|
|	增加超时时间，适配DSS握手重试	|	https://gitcode.com/opengauss/CBB/merge_requests/340	|	https://gitcode.com/opengauss/CBB/issues/187	|
|	修复tcp lsnr线程没启动无法pause的场景	|	https://gitcode.com/opengauss/CBB/merge_requests/333	|	https://gitcode.com/opengauss/CBB/issues/186	|
|	修复SSL内存泄漏	|	https://gitcode.com/opengauss/CBB/merge_requests/331	|	https://gitcode.com/opengauss/DSS/issues/379	|


### SqlServer兼容性回合列表

|	标题	|	关联PR	|	关联ISSUE	|
| ----- | ----- | ----- |
|	D兼容插件shark基础框架	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7076	|	https://e.gitee.com/opengaussorg/dashboard?issue=IBF4A1	|
|	修复一个not rotate的core问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7100	|	https://gitcode.com/opengauss/openGauss-server/issues/6369	|
|	修复shark执行plsql时没有选择tsql_raw_parser的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7117	|	https://gitcode.com/opengauss/openGauss-server/issues/6401	|
|	SQL Server兼容功能实现 Part1	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/6996	|	https://e.gitee.com/opengaussorg/dashboard?issue=IBF4FC	|
|	修复b库下使用dbe_pldebugger语法错误的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7147	|	https://e.gitee.com/opengaussorg/dashboard?issue=IBF4A1	|
|	修复发布订阅在D库失败的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7152	|	https://gitcode.com/opengauss/openGauss-server/issues/6428	|
|	修复unrotate 与 A库表现不一致的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7161	|	https://gitcode.com/opengauss/openGauss-server/issues/6442	|
|	修复升级未提交时支持创建D库的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7164	|	https://gitcode.com/opengauss/openGauss-server/issues/6438	|
|	修复D兼容下无法使用中括号创建用户	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7203	|	https://e.gitee.com/opengaussorg/dashboard?issue=IBN4T9	|
|	添加GUC控制中括号包裹标识符	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7179	|	https://gitcode.com/opengauss/openGauss-server/issues/6440	|
|	修复rotate不支持聚合函数参数包含常量问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7311	|	https://gitcode.com/opengauss/openGauss-server/issues/6456	|
|	补充d库遗漏的测试用例	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7487	|	https://e.gitee.com/opengaussorg/dashboard?issue=IBJDHJ	|
|	修复dbcc(表名)时不进行reseed标识值的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7514	|	https://e.gitee.com/opengaussorg/dashboard?issue=IBJDHJ	|
|	修改视图列名为都是小写	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7519	|	https://gitcode.com/opengauss/openGauss-server/issues/6678	|
|	修复D库RAND函数NULL入参结果错误	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7546	|	https://gitcode.com/opengauss/openGauss-server/issues/6622	|
|	修复dbcc在空表时表现与D库不一样的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7574	|	https://e.gitee.com/opengaussorg/dashboard?issue=IC12IF	|
|	修复匿名块中使用dbcc报错的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7576	|	https://e.gitee.com/opengaussorg/dashboard?issue=IC28MP	|
|	修复dbcc new valud 范围不对的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7582	|	https://e.gitee.com/opengaussorg/dashboard?issue=IC23XK	|
|	修复D库pg_get_tabledef函数结果不符合预期	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7570	|	https://gitcode.com/opengauss/openGauss-server/issues/6881	|
|	修复dbcc不支持传参数的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7596	|	https://e.gitee.com/opengaussorg/dashboard?issue=IC27R3	|
|	修复使用rotate语法进行行转列操作，select后使用列名报错	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7614	|	https://gitcode.com/opengauss/openGauss-server/issues/6862	|
|	修复表无约束时dbcc core的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7617	|	https://e.gitee.com/opengaussorg/dashboard?issue=IC3VRO	|
|	修复列名为数字开头时not rotate core的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7618	|	https://gitcode.com/opengauss/openGauss-server/issues/6911	|
|	修复cmake编译创建D库shark插件报错	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7674	|	https://gitcode.com/opengauss/openGauss-server/issues/6960	|
|	D 库常用视图兼容 PART	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7663	|	https://gitcode.com/opengauss/org-issue/issues/44	|
|	修复object_id函数不支持dbnmae..objname格式问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7676	|	https://gitcode.com/opengauss/openGauss-server/issues/6904	|
|	D兼容性常用视图实现PART2第一部分	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7681	|	https://gitcode.com/opengauss/org-issue/issues/44	|
|	适配shark插件升级	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7700	|	https://gitcode.com/opengauss/openGauss-server/issues/6946	|
|	D库事务控制语句兼容	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7665	|	https://gitcode.com/opengauss/org-issue/issues/42	|
|	fix: D兼容性使用create schema if not  exists 创建新schema，给该schema下创建表提示报错	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7683	|	https://gitcode.com/opengauss/openGauss-server/issues/6942	|
|	【PR模版】:修复rotate的in表达式中诸如a.b等非法列名时表现与ss不一样的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7698	|	https://gitcode.com/opengauss/openGauss-server/issues/6972	|
|	【PR模版】:修复行列转换中源表输出列有a.b形式时结果不正确的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7701	|	https://gitcode.com/opengauss/openGauss-server/issues/6993	|
|	在shark中使用varbinary类型	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7652	|	https://gitcode.com/opengauss/openGauss-server/issues/6961	|
|	【PR模版】:D兼容性下支持sql_variant数据类型	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7662	|	https://gitcode.com/opengauss/openGauss-server/issues/7003	|
|	【PR模版】:修复not rotate子句后生成的表别名为保留关键字加双引号报错的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7730	|	https://gitcode.com/opengauss/openGauss-server/issues/6962	|
|	【PR模版】:修复修复使用not rotate语法时，添加where子句，where语句中使用转换后 的别名报错的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7731	|	https://gitcode.com/opengauss/openGauss-server/issues/6930	|
|	D库兼容openGauss事务控制语法	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7736	|	https://gitcode.com/opengauss/org-issue/issues/42	|
|	D模式下实现列的identity约束	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7656	|	https://gitcode.com/opengauss/openGauss-server/issues/7002	|
|	删除objectproperty函数中关于表类型的处理	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7718	|	https://gitcode.com/opengauss/openGauss-server/issues/6949	|
|	修复not rotate后边不能接join和多个not rotate的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7784	|	https://gitcode.com/opengauss/openGauss-server/issues/6939	|
|	[bugfix] sys.databases	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7912	|	https://gitcode.com/opengauss/docs/issues/6916	|
|	修复commit和rollback不支持加上关键字tran或transaction的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7939	|	https://gitcode.com/opengauss/openGauss-server/issues/7042	|
|	(feat): 兼容性常用语法兼容-常用函数兼容3	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7790	|	https://gitcode.com/opengauss/org-issue/issues/117	|
|	在shark插件创建后禁止在sys视图下修改内容	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7945	|	https://gitcode.com/opengauss/openGauss-server/issues/7184	|
|	[bugfix] information_schema_tsql.columns and sys.tables	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7959	|	https://gitcode.com/opengauss/docs/issues/6923	|
|	修复D库clustered语法缺失的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7958	|	https://gitcode.com/opengauss/openGauss-server/issues/7180	|
|	【feature】table_hint	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7926	|	https://gitcode.com/opengauss/org-issue/issues/41	|
|	修复D库identity表带schema插入失败的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8036	|	https://gitcode.com/opengauss/openGauss-server/issues/7280	|
|	修复带shark升级失败问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8047	|	https://gitcode.com/opengauss/openGauss-server/issues/7194	|
|	【feature】table_hint, remove DB_IS_CMPT(D_FORMAT)	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8060	|	https://gitcode.com/opengauss/org-issue/issues/41	|
|	修复删除identity标识列后执行scope_identity函数或删除带identity的表后执行函数，返回结果和S库不同的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8092	|	https://gitcode.com/opengauss/openGauss-server/issues/7254	|
|	修复scope_identity和ident_current导致的打印error message失败问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8090	|	https://gitcode.com/opengauss/openGauss-server/issues/7251	|
|	修复字段类型是serial，使用scope_identity函数可以获取到标识值，ident_current函数无法获取标识值的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8098	|	https://gitcode.com/opengauss/openGauss-server/issues/7277	|
|	【bugfix】ident_current function	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8065	|	https://gitcode.com/opengauss/openGauss-server/issues/7266	|
|	[bugfix] repair generated_when and generated_kind params in node Constraint	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8118	|	https://gitcode.com/opengauss/Plugin/issues/1511	|
|	修复shark使用CMAKE编译问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8172	|	https://gitcode.com/opengauss/Plugin/issues/1530	|
|	修复fetch_status函数返回值类型验证，使用LANGUAGE plpgsql的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8192	|	https://gitcode.com/opengauss/openGauss-server/issues/7400	|
|	[feature] ddl for d database	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8202	|	https://gitcode.com/opengauss/org-issue/issues/1286	|
|	【feature】testcase-ddl for d database	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8204	|	https://gitcode.com/opengauss/org-issue/issues/1286	|
|	【兼容性组】D库语法兼容-常用函数兼容4[PART 1]	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8211	|	https://gitcode.com/opengauss/org-issue/issues/1284	|
|	D库语法兼容-常用函数兼容4[PART 2]	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8212	|	https://gitcode.com/opengauss/org-issue/issues/1284	|
|	D库语法兼容-常用函数兼容4[PART 3]	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8213	|	https://gitcode.com/opengauss/org-issue/issues/1284	|
|	D库语法兼容-常用函数兼容4[PART 4]	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8214	|	https://gitcode.com/opengauss/org-issue/issues/1284	|
|	D库语法兼容-常用函数兼容4[PART 5]	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8215	|	https://gitcode.com/opengauss/org-issue/issues/1284	|
|	D库语法兼容-常用函数兼容4[PART 6]	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8216	|	https://gitcode.com/opengauss/org-issue/issues/1284	|
|	D库语法兼容-常用函数兼容4[PART 7]	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8217	|	https://gitcode.com/opengauss/org-issue/issues/1284	|
|	修复get_scope_identity在debug和release版本下初始条件下返回存在差异的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8155	|	https://gitcode.com/opengauss/openGauss-server/issues/7277	|
|	D库语法兼容-常用函数兼容4[PART 8]	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8219	|	https://gitcode.com/opengauss/org-issue/issues/1284	|
|	支持sqlserver @object声明变量语法	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/7785	|	https://gitcode.com/opengauss/openGauss-server/issues/7338	|
|	try catch特性	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8007	|	https://gitcode.com/opengauss/openGauss-server/issues/7443	|
|	D库语法兼容-常用函数兼容4[PART 9]	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8220	|	https://gitcode.com/opengauss/org-issue/issues/1284	|
|	D兼容性下支持时间相关函数--dateadd	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8108	|	https://gitcode.com/opengauss/openGauss-server/issues/7450	|
|	D兼容性下支持时间相关函数--datepart	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8226	|	https://gitcode.com/opengauss/openGauss-server/issues/7450	|
|	D兼容性下支持时间相关函数--datename/getdate/length	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8227	|	https://gitcode.com/opengauss/openGauss-server/issues/7450	|
|	修复特定情况下isnull返回值异常的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8300	|	https://gitcode.com/opengauss/Plugin/issues/1552	|
|	object_id函数类型不匹配时返回null	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8290	|	https://gitcode.com/opengauss/openGauss-server/issues/7301	|
|	移除错误添加到shark--1.0.sql的内容，应该只在shark--2.0.sql中	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8291	|	https://gitcode.com/opengauss/openGauss-server/issues/7301	|
|	[feature] table hint	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8325	|	https://gitcode.com/opengauss/org-issue/issues/41	|
|	修复bigint类型的identity边界问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8273	|	https://gitcode.com/opengauss/openGauss-server/issues/7267	|
|	ident_current函数支持视图	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8338	|	https://gitcode.com/opengauss/openGauss-server/issues/7276	|
|	[Bug]: 【D模式varbinary类型】空串''转varbinary类型失败	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8267	|	https://gitcode.com/opengauss/openGauss-server/issues/7253	|
|	修复可以超过varbinary typmod 8000的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8236	|	https://gitcode.com/opengauss/openGauss-server/issues/7241	|
|	解决varbinary 类型与运算符使用报错	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8276	|	https://gitcode.com/opengauss/openGauss-server/issues/7256	|
|	修复alter column时对identity类型的检查	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8275	|	https://gitcode.com/opengauss/openGauss-server/issues/7220	|
|	fix D兼容性下支持时间相关函数-dateadd问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8350	|	https://gitcode.com/opengauss/openGauss-server/issues/7529	|
|	修复D兼容性下特定允许typmod的类型使用默认值时表现与D库不一致的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8367	|	https://gitcode.com/opengauss/Plugin/issues/1559	|
|	修复bug：varbinary默认值问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8363	|	https://gitcode.com/opengauss/openGauss-server/issues/7258	|
|	修复部分情况下isnull错误的问题2	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8393	|	https://gitcode.com/opengauss/Plugin/issues/1552	|
|	修复varbianry typmod问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8384	|	https://gitcode.com/opengauss/openGauss-server/issues/7243	|
|	添加identity约束的帮助信息	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8271	|	https://gitcode.com/opengauss/openGauss-server/issues/7222	|
|	varbinary typecast for numeric DECIMAL time smalltimestamp	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8391	|	https://gitcode.com/opengauss/openGauss-server/issues/7260	|


## 6.0.3B002转测列表：

| 标题                                                         | ISSUE链接                                                  |
| ----------------------------------------------------------- | ---------------------------------------------------------- |
| [Bug]: 【长稳】6.0.3版本开启极致RTO，使用默认配置报错提示wal receiver buf should not smaller than 32MB | https://gitcode.com/opengauss/openGauss-server/issues/7723 |
| [Bug]: 备2switchover后 1p2s缩容为1p1s失败 | https://gitcode.com/opengauss/openGauss-server/issues/7734                                                              |
| [Bug]: 6.0.3发布包中 jre带有安全编译选项问题，以及CVE漏洞 | https://gitcode.com/opengauss/security/issues/361                                                       |
| [Bug]: 6.0.3版本cjson，curl，krb5，pg组件存在CVE漏洞 | https://gitcode.com/opengauss/openGauss-third_party/issues/123                                               |
| [Bug]: 【6.0.3】lite版本shark插件创建失败 | https://gitcode.com/opengauss/openGauss-server/issues/7737                                                              |
| [Bug]: 【升级】3.0.5升级到6.0.3B001版本，带B库升级回滚后元数据校验报错 | https://gitcode.com/opengauss/openGauss-server/issues/7738                                 |
| [Bug]: 带CM安装6.0.3B001版本，安装好后CM主备切换有问题 | https://gitcode.com/opengauss/openGauss-server/issues/7739                                                 |
| [Bug]: 【测试类型：功能测试】【测试版本：6.0.3】【资源池化】【升级】连升场景升级到6.0.3版本升级报错 | https://gitcode.com/opengauss/openGauss-server/issues/7740    |
| [Bug]: 6.0.3分支代码cmake编译安装后，创建shark插件报错 | https://gitcode.com/opengauss/openGauss-server/issues/7742                                                 |
| [Bug]: 【升级】从5.0.1升级到6.0.3B001版本，升级报错Failed to upgrade-post catalog. | https://gitcode.com/opengauss/openGauss-server/issues/7746                     |
| [Bug]: 【升级】从6.0.0升级到6.0.3B001版本，升级报错Failed to upgrade-post catalog. | https://gitcode.com/opengauss/openGauss-server/issues/7747                     |
| [Bug]: 6.0.3 4k版本下 对段页式表进行增删操作导致数据库core | https://gitcode.com/opengauss/openGauss-server/issues/7756                                             |
| [Bug]: 6.0.3 4k B兼容模式下 对段页式表进行增删操作导致数据库core | https://gitcode.com/opengauss/openGauss-server/issues/7757                                       |
| [Bug]: 对于4k的包，启动后报错Unknown unit for runtime variable: 4kB | https://gitcode.com/opengauss/opengauss-prometheus-exporter/issues/16                         |


##  6.0.3B003转测列表：

| 标题 | ISSUE链接 |
| ----------------------------------------------------------- | ---------------------------------------------------------- |
| [Bug]: 6.0.34k页面版本，表插入数据后，创建hash索引报错 | https://gitcode.com/opengauss/openGauss-server/issues/7767                                                                  |
| [Bug]:6.0.3 4k页面 备节点进行build失败 | https://gitcode.com/opengauss/openGauss-server/issues/7774                                                                                  |
| [Bug]: 【测试类型：功能测试】【测试版本：6.0.3】【资源池化】自动化连跑，主节点修改系统时间，然后恢复时间，集群状态卡住 | https://gitcode.com/opengauss/openGauss-server/issues/7781  |
| [Bug]: [6.0.3CI]gs_checkse 修复A1不符合安全规范项目后再次检测, 显示修复成功，但任然打印告警信息 | https://gitcode.com/opengauss/openGauss-server/issues/7770                         |
| [Bug]: opengauss 6.0.2版本下，程序运行一些sql后，导致opengauss进程崩溃 | https://gitcode.com/opengauss/openGauss-server/issues/7764                                                  |
| 【回合6.0.0】修复ustore表并发执行merge into时的锁报错问题 | https://gitcode.com/opengauss/openGauss-server/issues/7762
