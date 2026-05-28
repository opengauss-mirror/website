---
title: 'openGauss 6.0.5版本正式发布！'
date: '2026-05-15'
banner: '605.png'
tags: ['theme']
author: 'openGauss'
category: 'news'
summary: 'openGauss 6.0.5 版本是 openGauss 6.0.0 Release 的补丁版本。在 6.0.3 版本基础上，回合主干分支的部分需求和缺陷，发布 6.0.5 补丁版本。'
---


## 版本介绍

openGauss 6.0.5 版本是 openGauss 6.0.0 Release 的补丁版本。在 6.0.3 版本基础上，回合主干分支的部分需求和缺陷，发布 6.0.5 补丁版本。

## 需求范围

openGauss 6.0.5 补丁版本回合的需求列表：

|      序号      |       需求描述    |  PR链接 |
| ------| ------------------------------------------------------------ | ------------------------------------------------------------ |
|   1   | openGauss整机资源瘦身 -- CPU、内存、IO资源优化          |  https://gitcode.com/opengauss/openGauss-server/pull/9143 |


## 升级路径支持

| 基础版本                | 目标版本                       |
| ----------------------- | ------------------------------ |
| 5.0.\*(不带 CM + 带 CM) | 6.0.5(不带 CM + 带 CM)         |
| 6.0.\*(不带 CM + 带 CM)  | 6.0.5(不带 CM + 带 CM)         |
| 6.0.5(不带 CM + 带 CM)  | master(不带 CM + 带 CM) |

共享存储升级支持：

| 基础版本                | 目标版本                       |
| ----------------------- | ------------------------------ |
| 6.0.1-6.0.3   |    6.0.5        |
| 6.0.5    |    master    |

## CVE 漏洞修复

| 漏洞编号       | 涉及组件   |
| ----------- | ---------- |
| CVE-2024-7264 | libcurl |
| CVE-2025-67726 | tornado |
| CVE-2025-14017 | libcurl |
| CVE-2025-14524 | libcurl |
| CVE-2023-2650 | openssl |
| CVE-2026-23490 | pyasn1 |
| CVE-2025-68160 | openssl |
| CVE-2025-69418 | openssl |
| CVE-2025-69420 | openssl |
| CVE-2025-69421 | openssl |
| CVE-2026-22795 | openssl |
| CVE-2025-69419 | openssl |
| CVE-2026-22796 | openssl |
| CVE-2025-15079 | libcurl |
| CVE-2025-15224 | libcurl |
| CVE-2023-50782 | cryptography |
| CVE-2026-1965 | libcurl |
| CVE-2026-3784 | libcurl |
| CVE-2026-3783 | libcurl |
| CVE-2023-46049 | llvm |
| CVE-2024-31852 | llvm |
| CVE-2026-28387 | openssl |
| CVE-2026-28388 | openssl |
| CVE-2026-35536 | tornado |
| CVE-2026-27448 | pyopenssl |
| CVE-2026-31958 | tornado |


## 缺陷回合列表

| 版本      | 修复issue                                                    |
| --------- | ------------------------------------------------------------ |
| 6.0.5B001 | 内核: 37 <br/>插件: 11  <br/>工具: 3  <br/>驱动: 12  <br/>DDES: 2 |
| 6.0.5B002 | 7                                                            |



## 6.0.5B001回合转测列表：

### 内核
|	标题	|	关联PR	|	关联ISSUE	|
| ----- | ----- | ----- |
|	【6.0.0回合】修复用户链接时候B库用户名查找问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/9148	|	https://gitcode.com/opengauss/openGauss-tools-chameleon/issues/306
|	fix gs_dump elevates privileges bug (回合6.0.0）	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/9144	|	https://gitcode.com/opengauss/openGauss-server/issues/7928
|	修复REPLACE误拦AUTO_INCREMENT列	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/9129	|	https://gitcode.com/opengauss/Plugin/issues/1604
|	[特性]: B协议场景下性能优化	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/9113	|	https://gitcode.com/opengauss/Plugin/issues/1521
|	分区表剪枝考虑增加表达式	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/9031	|	https://gitcode.com/opengauss/Plugin/issues/1601
|	gs_dump导出和gsql导入，在加密数据生成密钥只在开始生成一次，避免每行数据导出生成影响性能	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/9007	|	https://gitcode.com/opengauss/openGauss-server/issues/7987
|	替换rdtscp指令集为rdtsc，兼容不存在该指令集的机器	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8998	|	https://gitcode.com/opengauss/community/issues/435
|	dolphin升级4.4	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8996	|	https://gitcode.com/opengauss/org-issue/issues/1360
|	back port from 7.0, support launch bgworker by another bgworker	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8993	|	https://gitcode.com/opengauss/org-issue/issues/27
|	[6.0.0回合]FILTER和WHERE对复合类型数据是否为空的判断不正确	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8991	|	https://gitcode.com/opengauss/openGauss-server/issues/7898
|	修复oid回卷导致新建分区和已存在表oid相同，vacuum产生core	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8984	|	https://gitcode.com/opengauss/openGauss-server/issues/7981
|	修复线程池模式下b库加载顺序问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8957	|	https://gitcode.com/opengauss/openGauss-server/issues/7941
|	修复分区键携带表达式存在的内存持续积累问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8941	|	https://gitcode.com/opengauss/openGauss-server/issues/7925
|	clean up subxact exprcontext	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8914	|	https://gitcode.com/opengauss/openGauss-server/issues/7638
|	【回合6.0.0】fix several undo problems	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8907	|	
|	[回合6.0.0]: 聚合函数报错	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8882	|	https://gitcode.com/opengauss/openGauss-server/issues/7879
|	[6.0.0]非BD库禁止导出pg_namespace.nspcollation	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8824	|	https://gitcode.com/opengauss/openGauss-server/issues/7833
|	【回合6.0.0】加固bitposition	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8811	|	https://gitcode.com/opengauss/openGauss-server/issues/7800
|	增加guc参数控制是否解析interval error code	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8808	|	https://gitcode.com/opengauss/openGauss-server/pull/8507
|	fortify source fix	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8807	|	https://gitcode.com/opengauss/openGauss-server/issues/7786
|	【回合6.0.0】修复线程池模式下DefaultTopMemoryContext内存申请不释放问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8768	|	https://gitcode.com/opengauss/openGauss-server/issues/7763
|	修复reindex相关问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8800	|	https://gitcode.com/opengauss/openGauss-server/issues/7708
|	修复Query resource track memory context上下文泄露问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8787	|	https://gitcode.com/opengauss/openGauss-server/issues/7748
|	修GUC参数controlled_memory_context内存泄露问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8934	|	https://gitcode.com/opengauss/openGauss-server/issues/7897
|	b_format_behavior_compat_options参数改变时重新对齐collation_connection值	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/9015	|	https://gitcode.com/opengauss/openGauss-server/issues/7992
|	SPI Proc / IudExprReuseContext 在 enable_pbe_optimization 关闭场景下内存累积修复	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/9048	|	https://gitcode.com/opengauss/openGauss-server/issues/8018
|	调整 IudExprReuseContext 清理边界避免表达式回归	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/9085	|	https://gitcode.com/opengauss/openGauss-server/issues/8018
|	修复timestamp_diff函数计算结果不准确的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8770	|	https://gitcode.com/opengauss/openGauss-server/issues/7782
|	修复B库兼容存储过程@变量问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8936	|	https://gitcode.com/opengauss/openGauss-server/issues/7892
|	fix ustore off membug【回合6.0.0】	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/9162	|	https://gitcode.com/opengauss/openGauss-server/issues/8081
|	支持事务日志缓存单独配置，发布订阅线程按需启动	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/9150	|	https://gitcode.com/opengauss/openGauss-server/issues/7972
|	 修复evaluate_expr共享上下文释放边界	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/9157	|	https://gitcode.com/opengauss/openGauss-server/issues/8061
|	修复严格模式下两次函数调用执行结果不同的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8733	|	https://gitcode.com/opengauss/Plugin/issues/1566
|	修复添加自增列失败的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/9018  	|	https://gitcode.com/opengauss/openGauss-server/issues/7874
|	修复设置default_collation时创建带varbinary列的视图失败的问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8975	|	https://gitcode.com/opengauss/openGauss-server/issues/7954
|	修复default_collation和enable_multi_charset若干问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8968	|	https://gitcode.com/opengauss/openGauss-server/issues/7937<br/>https://gitcode.com/opengauss/openGauss-server/issues/7933<br/>https://gitcode.com/opengauss/openGauss-server/issues/7936
|	修复向量化引擎下并发更新的core问题	|	https://gitcode.com/opengauss/openGauss-server/merge_requests/8752	|	https://gitcode.com/opengauss/openGauss-server/issues/7754



### 插件
|	标题	|	关联PR	|	关联ISSUE	|
| ----- | ----- | ----- |
|	分区表剪枝考虑增加表达式增加测试用例	|	https://gitcode.com/opengauss/Plugin/merge_requests/2385	|	https://gitcode.com/opengauss/Plugin/issues/1601	|
|	版本升级与同步yearweek兼容性函数	|	https://gitcode.com/opengauss/Plugin/merge_requests/2374	|	https://gitcode.com/opengauss/openGauss-server/issues/7895	|
|	【回合6.0.0】加固bitposition	|	https://gitcode.com/opengauss/Plugin/merge_requests/2346	|	https://gitcode.com/opengauss/openGauss-server/issues/7800	|
|	修复添加自增列失败的问题	|	https://gitcode.com/opengauss/Plugin/merge_requests/2381	|	https://gitcode.com/opengauss/openGauss-server/issues/7874	|
|	修复设置default_collation时创建带varbinary列的视图失败的问题	|	https://gitcode.com/opengauss/Plugin/merge_requests/2371	|	https://gitcode.com/opengauss/openGauss-server/issues/7967 <br/> https://gitcode.com/opengauss/openGauss-server/issues/7938	|
|	修复right函数报错的问题	|	https://gitcode.com/opengauss/Plugin/merge_requests/2341	|	https://gitcode.com/opengauss/openGauss-server/issues/7718	|
|	修复default_collation和enable_multi_charset参数值影响枚举值结果的问题-Plugin-AtomGit | GitCode	|	https://gitcode.com/opengauss/Plugin/merge_requests/2373	|	https://gitcode.com/opengauss/openGauss-server/issues/7963 <br/> https://gitcode.com/opengauss/openGauss-server/issues/7961	|
|	修复 enable_multi_charset 场景下 enum 转换二次释放导致 core	|	https://gitcode.com/opengauss/Plugin/merge_requests/2382	|	https://gitcode.com/opengauss/openGauss-server/issues/7992	|
|	B兼容库 current_date - 数值 运算结果错误修复	|	https://gitcode.com/opengauss/Plugin/merge_requests/2386	|	https://gitcode.com/opengauss/openGauss-server/issues/8016	|
|	同步evaluate_expr共享上下文释放修复	|	https://gitcode.com/opengauss/Plugin/merge_requests/2400	|	https://gitcode.com/opengauss/openGauss-server/issues/8061	|
|	添加date_format(date, text)函数	|	https://gitcode.com/opengauss/Plugin/merge_requests/2334	|	https://gitcode.com/opengauss/Plugin/issues/1575	|



### 工具
|	标题	|	关联PR	|	关联ISSUE	|
| ----- | ----- | ----- |
|	修复preinstall设置日志路径属组问题	|	https://gitcode.com/opengauss/openGauss-OM/pull/1218	|	https://gitcode.com/opengauss/openGauss-server/issues/7717	|
|	解决集群设置了 uppercase_attribute_name = on时缩容失败问题	|	https://gitcode.com/opengauss/openGauss-OM/pull/1219	|	https://gitcode.com/opengauss/openGauss-OM/issues/749	|
|	在已经建好了root和omm互信情况下，主备安装preinstall加上--non-interactive报错	|	https://gitcode.com/opengauss/openGauss-OM/pull/1243	|	https://gitcode.com/opengauss/openGauss-OM/issues/758	|



### DDES
|	标题	|	关联PR	|	关联ISSUE	|
| ----- | ----- | ----- |
|	延长dcc最大运行时间	|	https://gitcode.com/opengauss/DCC/pull/49	|	https://gitcode.com/opengauss/CM/issues/259	|
|	修复dcc build的core问题	|	https://gitcode.com/opengauss/DCC/pull/53	|	https://gitcode.com/opengauss/DCC/issues/29	|



### 驱动

|	标题	|	关联PR	|	关联ISSUE	|
| ----- | ----- | ----- |
|	修复返回oid为负数导致sql执行失败问题	|	https://gitcode.com/opengauss/openGauss-connector-jdbc/pull/407	|	https://gitcode.com/opengauss/openGauss-connector-jdbc/issues/669	|



## 6.0.5B002修复问题列表：

| 序号  | 标题                                                         | ISSUE链接                                                  |
| ----- | ----------------------------------------------------------- | ---------------------------------------------------------- |
1	|	[Bug]: 【升级】5.0.5升级到6.0.5版本，升级报错	|	https://gitcode.com/opengauss/openGauss-server/issues/8116	|
2	|	[Bug]: 【升级】【传统】6.0.5升级7.0.0LTS，升级失败，数据库core	|	https://gitcode.com/opengauss/openGauss-server/issues/8118	|
3	|	[Bug]: A库下建依赖function的视图，重建相同的function后视图，引用表 tmp_reuslt	|	https://gitcode.com/opengauss/openGauss-server/issues/8120	|
4	|	[Bug]: 【6.0.5】gs_guc -Z cmserver -N all -I all -c upgrade_from="0"失败	|	https://gitcode.com/opengauss/CM/issues/262	|
5	|	[Bug]: b_format_behavior_compat_options = ''时，不支持tinyblob，mediumblob等前缀索引	|	https://gitcode.com/opengauss/openGauss-server/issues/8129	|
6	|	[Bug]: 6.0.5补丁创建订阅端失败	|	https://gitcode.com/opengauss/openGauss-server/issues/8131	|
7	|	[Bug]: realtime_build_log_ctrl_status函数从500升级到605和直装605存在差异	|	https://gitcode.com/opengauss/openGauss-server/issues/8137	|

