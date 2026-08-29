---
title: 'openGauss 6.0.6版本正式发布！'
date: '2026-08-30'
banner: '/category/news/2026-08-30/606.png'
tags: ['theme']
author: 'openGauss'
category: 'news'
summary: 'openGauss 6.0.6 版本是 openGauss 6.0.0 Release 的补丁版本。在 6.0.5 版本基础上，回合主干分支的部分需求和缺陷，发布 6.0.6 补丁版本。'
---


## 版本介绍

openGauss 6.0.6 版本是 openGauss 6.0.0 Release 的补丁版本。在 6.0.5 版本基础上，回合主干分支的部分需求和缺陷，发布 6.0.6 补丁版本。

## 需求范围

openGauss 6.0.6 补丁版本回合的需求列表：

| 序号 | 模块 | 需求描述 | PR链接 |
| ---- | ---- | -------- | ------ |
| 1 | 工具 | 支持openEuler2403操作系统 | https://gitcode.com/opengauss/openGauss-server/pull/9379 |
| 2 | 向量数据库 | DiskANN索引支持在线创建，增加向标混合多列索引构建和查询能力 | https://gitcode.com/opengauss/openGauss-server/pull/9221 |
| 3 | 向量数据库 | 支持LSG索引 | https://gitcode.com/opengauss/openGauss-server/pull/9219 |
| 4 | 向量数据库 | IVF_RABITQ支持索引构建和查询 | https://gitcode.com/opengauss/openGauss-server/merge_requests/9056<br/>https://gitcode.com/opengauss/openGauss-server/merge_requests/9055 |
| 5 | 向量数据库 | HNSW_RABITQ 增加vacuum和halfvec支持 | https://gitcode.com/opengauss/openGauss-server/merge_requests/9045 |
| 6 | 向量数据库 | HNSW_RABITQ支持以及增加fp32和sq8精排 | https://gitcode.com/opengauss/openGauss-server/merge_requests/9042<br/>https://gitcode.com/opengauss/openGauss-server/merge_requests/9038 |
| 7 | 向量数据库 | BM25索引空间优化 + BM25自定义分词器 | https://gitcode.com/opengauss/openGauss-server/merge_requests/9206 |
| 8 | 向量数据库 | 支持halfvec | https://gitcode.com/opengauss/openGauss-server/merge_requests/9240 |
| 9 | 内核 | 支持ADIO | https://gitcode.com/opengauss/openGauss-server/pull/9310<br/>https://gitcode.com/opengauss/openGauss-server/pull/9318 |
| 10 | 内核 | 压缩支持兼容升级到7.0.0 | https://gitcode.com/opengauss/openGauss-server/pull/9540 |
| 11 | 超节点 | 支持rack_mem、dlopen libmemfabric.so | https://gitcode.com/opengauss/openGauss-server/pull/9460 |
| 12 | 超节点 | Clog/CSNLog/Oldestxmin传输优化 | https://gitcode.com/opengauss/openGauss-server/pull/9480 |
| 13 | 超节点 | 小包RPC优化页面传输 | https://gitcode.com/opengauss/openGauss-server/pull/9491 |
| 14 | 超节点 | SysSentry故障检测 | https://gitcode.com/opengauss/openGauss-server/pull/9480 |


## 升级路径支持

| 基础版本                | 目标版本                       |
| ----------------------- | ------------------------------ |
| 5.0.\*(不带 CM + 带 CM) | 6.0.6(不带 CM + 带 CM)         |
| 6.0.\*(不带 CM + 带 CM)  | 6.0.6(不带 CM + 带 CM)         |
| 6.0.6(不带 CM + 带 CM)  | master(不带 CM + 带 CM) |

共享存储升级支持：

| 基础版本                | 目标版本                       |
| ----------------------- | ------------------------------ |
| 6.0.1-6.0.5   |    6.0.6        |
| 6.0.6    |    master    |

## CVE 漏洞修复

| 漏洞编号 | 涉及组件 | 修复链接 |
| -------- | -------- | -------- |
| CVE-2026-45447 | openssl | https://atomgit.com/opengauss/openGauss-third_party/pull/457 |
| CVE-2026-7383 | openssl | https://atomgit.com/opengauss/openGauss-third_party/pull/457 |
| CVE-2026-9076 | openssl | https://atomgit.com/opengauss/openGauss-third_party/pull/457 |
| CVE-2026-28389 | openssl | https://atomgit.com/opengauss/openGauss-third_party/pull/468 |
| CVE-2026-28390 | openssl | https://atomgit.com/opengauss/openGauss-third_party/pull/468 |
| CVE-2026-40356 | krb5 | https://atomgit.com/opengauss/openGauss-third_party/pull/468 |
| CVE-2026-40355 | krb5 | https://atomgit.com/opengauss/openGauss-third_party/pull/468 |
| CVE-2026-5773 | libcurl | https://atomgit.com/opengauss/openGauss-third_party/pull/468 |
| CVE-2026-6276 | libcurl | https://atomgit.com/opengauss/openGauss-third_party/pull/468 |
| CVE-2026-11856 | libcurl | https://atomgit.com/opengauss/openGauss-third_party/pull/462 |
| CVE-2026-5545 | libcurl | https://atomgit.com/opengauss/openGauss-third_party/pull/468 |
| CVE-2026-8924 | libcurl | https://atomgit.com/opengauss/openGauss-third_party/pull/462 |
| CVE-2026-8932 | libcurl | https://atomgit.com/opengauss/openGauss-third_party/pull/462 |
| CVE-2026-4873 | libcurl | https://atomgit.com/opengauss/openGauss-third_party/pull/468 |
| CVE-2026-6429 | libcurl | https://atomgit.com/opengauss/openGauss-third_party/pull/468 |
| CVE-2026-7168 | libcurl | https://atomgit.com/opengauss/openGauss-third_party/pull/468 |
| CVE-2026-8458 | libcurl | https://atomgit.com/opengauss/openGauss-third_party/pull/462 |
| CVE-2026-8286 | libcurl | https://atomgit.com/opengauss/openGauss-third_party/pull/462 |
| CVE-2026-8927 | libcurl | https://atomgit.com/opengauss/openGauss-third_party/pull/462 |
| CVE-2026-6253 | libcurl | https://atomgit.com/opengauss/openGauss-third_party/pull/468 |
| CVE-2026-9547 | libcurl | https://atomgit.com/opengauss/openGauss-third_party/pull/468 |
| CVE-2026-11850 | kerberos | https://gitcode.com/opengauss/openGauss-third_party/pull/480 |
| CVE-2026-30922 | pyasn1 | https://gitcode.com/opengauss/openGauss-third_party/pull/480 |
| CVE-2026-45409 | idna | https://atomgit.com/opengauss/openGauss-third_party/pull/449 |
| CVE-2026-13573 | llvm | https://atomgit.com/opengauss/openGauss-third_party/pull/466 |
| CVE-2026-13574 | llvm | https://atomgit.com/opengauss/openGauss-third_party/pull/466 |

经评估无影响不处理的漏洞：

| 漏洞编号 | 涉及组件 | 说明 |
| -------- | -------- | ---- |
| CVE-2026-22184 | zlib | 主干评估无影响 |
| CVE-2026-34073 | cryptography | 该漏洞在做证书校验有问题，OM只用来加解密不涉及校验调用。OM依赖版本较低升级影响大，评估不处理。 |
| CVE-2026-44405 | paramiko | 涉及功能未使用，无影响 |


## 缺陷回合列表

| 版本 | 修复issue |
| ---- | --------- |
| 6.0.6B001 | 内核: 57 <br/>插件: 19  <br/>工具: 3  <br/>驱动: 3  <br/>DDES: 3 |
| 6.0.6B002-B004 | 35 |


## 6.0.6B001回合转测列表：

### 内核
| 标题 | 关联PR | 关联ISSUE |
| ---- | ------ | --------- |
| reject shell metacharacters in string GUC values | https://gitcode.com/opengauss/openGauss-server/pull/9395 | https://gitcode.com/opengauss/openGauss-server/issues/8271 |
| 修复substring函数的部分问题8795 | https://gitcode.com/opengauss/openGauss-server/pull/8795 | https://gitcode.com/opengauss/openGauss-server/issues/7811 |
| 修复insert并行时插入的数据为空的问题8862 | https://gitcode.com/opengauss/openGauss-server/pull/8862 | https://gitcode.com/opengauss/openGauss-server/pull/8795 |
| 修复部分内存泄漏问题8879 | https://gitcode.com/opengauss/openGauss-server/pull/8879 | https://gitcode.com/opengauss/openGauss-server/issues/7881 |
| 修复B库的时候prepare传入tinyint时报错的问题8910 | https://gitcode.com/opengauss/openGauss-server/pull/8910 | https://gitcode.com/opengauss/Plugin/issues/1595 |
| predpush 支持非并行场景8954 | https://gitcode.com/opengauss/openGauss-server/pull/8954 | https://gitcode.com/opengauss/openGauss-server/issues/6422 |
| 修复jsonb时传入空报错的问题8978 | https://gitcode.com/opengauss/openGauss-server/pull/8978 | https://gitcode.com/opengauss/openGauss-server/issues/7819 |
| 修复一个enable_modify_column影响多字符集的问题9003 | https://gitcode.com/opengauss/openGauss-server/pull/9003 | https://gitcode.com/opengauss/openGauss-server/issues/7968 |
| 修复enable_multi_charset的参数导致create function带name set时失败的问题9006 | https://gitcode.com/opengauss/openGauss-server/pull/9006 | https://gitcode.com/opengauss/openGauss-server/issues/7964 |
| 回合4个代码加固 | https://gitcode.com/opengauss/openGauss-server/pull/9384 | NA |
| 全量build失败 current_len_left is invalid [YC] | https://gitcode.com/opengauss/openGauss-server/merge_requests/9386 | https://gitcode.com/opengauss/openGauss-server/issues/784 |
| shark 里两处编译上下文入栈顺序，保持和原生 plpgsql 一致 | https://gitcode.com/opengauss/openGauss-server/pull/9212 | https://gitcode.com/opengauss/openGauss-server/issues/8109 |
| [bugfix] repair tablespace privileges | https://gitcode.com/opengauss/openGauss-server/pull/9265 | https://gitcode.com/opengauss/openGauss-server/issues/8162 |
| 修改代码逻辑，删除无用的赋值语句 | https://gitcode.com/opengauss/openGauss-server/pull/9180 | https://gitcode.com/opengauss/openGauss-server/issues/8089 |
| 修改代码逻辑，删除无用的赋值语句 | https://gitcode.com/opengauss/openGauss-server/pull/9181 | https://gitcode.com/opengauss/openGauss-server/issues/8089 |
| 修复cmake编译shark 3.0插件无对应视图的问题 | https://gitcode.com/opengauss/openGauss-server/pull/9176 | https://gitcode.com/opengauss/Plugin/issues/1589 |
| 修复cmake编译shark 3.0插件无对应视图的问题 | https://gitcode.com/opengauss/openGauss-server/pull/9170 | https://gitcode.com/opengauss/Plugin/issues/1589 |
| bugfix，修改memechek版本发现的heap-buffer-overflow问题 | https://gitcode.com/opengauss/openGauss-server/pull/9139 | https://gitcode.com/opengauss/openGauss-server/issues/8068 |
| 修复cmake编译shark 3.0插件无对应视图的问题 | https://gitcode.com/opengauss/openGauss-server/pull/8872 | https://gitcode.com/opengauss/Plugin/issues/1589 |
| [testcase] adding array_union testcase | https://gitcode.com/opengauss/openGauss-server/pull/8863 | https://gitcode.com/opengauss/openGauss-server/issues/7876 |
| 修复cmake编译shark 3.0插件无对应视图的问题 | https://gitcode.com/opengauss/openGauss-server/pull/8849 | https://gitcode.com/opengauss/Plugin/issues/1589 |
| 修复cmake编译shark 3.0插件无对应视图的问题 | https://gitcode.com/opengauss/openGauss-server/pull/8850 | https://gitcode.com/opengauss/Plugin/issues/1589 |
| 修复cmake编译shark 3.0插件无对应视图的问题 | https://gitcode.com/opengauss/openGauss-server/pull/8848 | https://gitcode.com/opengauss/Plugin/issues/1589 |
| 修复cmake编译shark 3.0插件无对应视图的问题 | https://gitcode.com/opengauss/openGauss-server/pull/8847 | https://gitcode.com/opengauss/Plugin/issues/1589 |
| 修复cmake编译shark 3.0插件无对应视图的问题 | https://gitcode.com/opengauss/openGauss-server/pull/8846 | https://gitcode.com/opengauss/Plugin/issues/1589 |
| [bugfix] d_format_behavior_compat_options = default_collation | https://gitcode.com/opengauss/openGauss-server/pull/8798 | https://gitcode.com/opengauss/openGauss-server/issues/7822 |
| bugfix，修复存储存储过程或匿名块执行select into table 临时表报语法错误 | https://gitcode.com/opengauss/openGauss-server/pull/9075 | https://gitcode.com/opengauss/openGauss-server/issues/8005 |
| 修复资源池化实时构建 failover 边界下 sync xact 未回放导致事务状态丢失的问题 | https://gitcode.com/opengauss/openGauss-server/pull/9272 | https://gitcode.com/opengauss/openGauss-server/issues/8080 |
| 【测试版本：7.0.0-RC3】【资源池化】主节点执行业务，集群可靠性能力测试，发现pagewriter相关core | https://gitcode.com/opengauss/openGauss-server/pull/9104 | https://gitcode.com/opengauss/openGauss-server/issues/8054 |
| 修复灾备集群增量build时候删除了表空间目录 | https://gitcode.com/opengauss/openGauss-server/merge_requests/9379 | https://gitcode.com/opengauss/openGauss-server/issues/8140 |
| 【回合6.0.0】修复主备模式开启极致rto后select for update/share core的问题 | https://gitcode.com/opengauss/openGauss-server/merge_requests/9367 | https://gitcode.com/opengauss/openGauss-server/issues/8235 |
| 修复openGauss 7.0.0-RC2 在特定协议发包序列下触发 OpFusion::describe() SIGSEGV 并导致服务端崩溃的问题 | https://gitcode.com/opengauss/openGauss-server/merge_requests/9264 | https://gitcode.com/opengauss/openGauss-server/issues/8143 |
| 修复openGauss 7.0.0-RC2 在特定 Query/Parse/Bind/Close 协议序列下触发 OpFusion::IsGlobal() heap-use-after-free的问题 | https://gitcode.com/opengauss/openGauss-server/merge_requests/9267 | https://gitcode.com/opengauss/openGauss-server/issues/8144 |
| 修复default_collation参数gs_dump导出sql再执行报错multiple COLLATE clauses not allowed | https://gitcode.com/opengauss/openGauss-server/merge_requests/9326 | https://gitcode.com/opengauss/openGauss-server/issues/7956 |
| 修复执行SQL后优化器阶段make_restrictinfo触发异常导致进程abort的问题 | https://gitcode.com/opengauss/openGauss-server/merge_requests/9191 | https://gitcode.com/opengauss/openGauss-server/issues/8063 |
| 修复 创建了用户`mysql`@`%`并配置了存储过程函数的definer和owner后，gs_dump导出后再gsql导入报错 | https://gitcode.com/opengauss/openGauss-server/merge_requests/9358 | https://gitcode.com/opengauss/Plugin/issues/1613 |
| 修复O兼容性外连接语法转换时没有删除占位符的问题 | https://gitcode.com/opengauss/openGauss-server/merge_requests/8759 | https://gitcode.com/opengauss/openGauss-server/issues/7777 |
| D兼容（shark）ROTATE EXTRACT(quarter) 解析失败与 NOT ROTATE NVARCHAR 截断联合修复 | https://gitcode.com/opengauss/openGauss-server/merge_requests/9052 | https://gitcode.com/opengauss/openGauss-server/issues/8020 |
| 修复B兼容下HAVING同名别名解析错误 | https://gitcode.com/opengauss/openGauss-server/merge_requests/9098 | https://gitcode.com/opengauss/openGauss-server/issues/8057 |
| 修复B兼容HAVING别名前置解析误伤GROUPING参数 | https://gitcode.com/opengauss/openGauss-server/merge_requests/9111 | https://gitcode.com/opengauss/openGauss-server/issues/8057 |
| 修复表策略审计场景语句级内存未释放 | https://gitcode.com/opengauss/openGauss-server/merge_requests/9135 | https://gitcode.com/opengauss/openGauss-server/issues/8075 |
| 修复 magicset 改写带 limit 聚合子查询结果不一致 | https://gitcode.com/opengauss/openGauss-server/merge_requests/9261 | https://gitcode.com/opengauss/openGauss-server/issues/8045 |
| 修复COPY FROM text/CSV异常输入资源消耗问题 | https://gitcode.com/opengauss/openGauss-server/merge_requests/9286 | https://gitcode.com/opengauss/openGauss-server/issues/8192 |
| 修复COPY安全路径符号链接绕过 | https://gitcode.com/opengauss/openGauss-server/merge_requests/9288 | https://gitcode.com/opengauss/openGauss-server/issues/8194 |
| 修复b_compatibility_user_host_auth影响@操作符解析 | https://gitcode.com/opengauss/openGauss-server/merge_requests/9315 | https://gitcode.com/opengauss/openGauss-server/issues/8172 |
| 修复安全策略脱敏刷新与审计内存问题 | https://gitcode.com/opengauss/openGauss-server/merge_requests/9334 | https://gitcode.com/opengauss/openGauss-server/issues/8139 |
| [6.0.0]回合 scheduler external job 安全修复及 CharsetClause 默认 collation 修复 | https://gitcode.com/opengauss/openGauss-server/pull/9278 | https://gitcode.com/opengauss/openGauss-server/issues/8170 |
| [6.0.0]回合 scheduler external job 安全修复及 CharsetClause 默认 collation 修复 | https://gitcode.com/opengauss/openGauss-server/pull/9282 | https://gitcode.com/opengauss/openGauss-server/issues/8183 |
| [6.0.0]回合 scheduler external job 安全修复及 CharsetClause 默认 collation 修复 | https://gitcode.com/opengauss/openGauss-server/pull/9323 | https://gitcode.com/opengauss/openGauss-server/issues/8177 |
| 【6.0.0回合】修改rowtovec时候投影bug | https://gitcode.com/opengauss/openGauss-server/merge_requests/9347 | https://gitcode.com/opengauss/openGauss-server/pull/9190 |
| 【6.0.0回合】修复创建相互依赖package时候内存问题 | https://gitcode.com/opengauss/openGauss-server/merge_requests/9345 | https://gitcode.com/opengauss/openGauss-server/issues/8076 |
| 【回合6.0.0】支持通过guc参数或者表选项控制vacuum/autovacuum时是否truncate尾部空白页面 | https://gitcode.com/opengauss/openGauss-server/merge_requests/9344 | https://gitcode.com/opengauss/openGauss-server/issues/8039 |
| fix pqtabledistance check problems | https://gitcode.com/opengauss/openGauss-server/merge_requests/9297 | https://gitcode.com/opengauss/openGauss-server/issues/8203 |
| [bugfix] upgrade from 605 to 606 | https://gitcode.com/opengauss/openGauss-server/merge_requests/9241 | https://gitcode.com/opengauss/openGauss-server/issues/8137 |
| fix guc: avoid race condition when PGC_SIGHUP instance-level variables are written back to boot_val during thread initialization | https://gitcode.com/opengauss/openGauss-server/merge_requests/9208 | https://gitcode.com/opengauss/openGauss-server/issues/8085 |
| gs_guc设置cm_server参数upgrade_from | https://gitcode.com/opengauss/openGauss-server/merge_requests/9205 | https://gitcode.com/opengauss/CM/issues/262 |
| mot memcheck 回合 6.0.0 | https://gitcode.com/opengauss/openGauss-server/merge_requests/9164 | https://gitcode.com/opengauss/openGauss-server/issues/7890 |



### 插件
| 标题 | 关联PR | 关联ISSUE |
| ---- | ------ | --------- |
| 修复blob类型和bool比较的问题 | https://gitcode.com/opengauss/Plugin/merge_requests/2375 | https://gitcode.com/opengauss/openGauss-server/issues/7946 |
| 修复lower_case_table_names导致升级失败的问题 | https://gitcode.com/opengauss/Plugin/merge_requests/2366 | https://gitcode.com/opengauss/openGauss-server/issues/7902 |
| 修复非public模式下show index失败的问题 | https://gitcode.com/opengauss/Plugin/merge_requests/2348 | https://gitcode.com/opengauss/Plugin/merge_requests/2348 |
| 修复严格模式下两次函数调用执行结果不同的问题 | https://gitcode.com/opengauss/Plugin/merge_requests/2335 | https://gitcode.com/opengauss/openGauss-server/pull/8733 |
| convert_to_datetime接口相关函数添加时区后结果与未添加结果一致 | https://gitcode.com/opengauss/Plugin/merge_requests/2300 | https://gitcode.com/opengauss/Plugin/issues/1573 |
| 修复enable_set_variables变量影响<@等操作符的部分场景 | https://gitcode.com/opengauss/Plugin/merge_requests/2367 | https://gitcode.com/opengauss/openGauss-server/issues/7935 |
| 【回合6.0.0】重构B兼容ALTER原序执行避免丢失subcmd元数据 | https://gitcode.com/opengauss/Plugin/pull/2474 | https://gitcode.com/opengauss/Plugin/issues/1584 |
| [Bug]: 24.03 arm使用cmake编译，加载shark插件后查询不到系统视图 | https://gitcode.com/opengauss/Plugin/merge_requests/2470 | https://gitcode.com/opengauss/Plugin/issues/1589 |
| 修复开启default_collation后, 建表语句中ENUM区分大小写, 但是查询显示时不区分大小写, 与mysql行为不符的问题 | https://gitcode.com/opengauss/Plugin/merge_requests/2469 | https://gitcode.com/opengauss/Plugin/issues/1605 |
| 修复MySQL JDBC连接openGauss B库url串中指定的database无法完全生效的问题 | https://gitcode.com/opengauss/Plugin/merge_requests/2469 | https://gitcode.com/opengauss/openGauss-server/issues/8078 |
| 修复dolphin.lower_case_table_names为0的 情况下, 创建schema之后无法用use schema选择的问题 | https://gitcode.com/opengauss/Plugin/merge_requests/2469 | https://gitcode.com/opengauss/Plugin/issues/1607 |
| [Bug]: B库下timestamp类型数据date_format格式化毫秒位精度不正确 | https://gitcode.com/opengauss/Plugin/merge_requests/2469 | https://gitcode.com/opengauss/openGauss-server/issues/8128 |
| 修复default_collation参数gs_dump导出sql再执行报错multiple COLLATE clauses not allowed的问题 | https://gitcode.com/opengauss/Plugin/merge_requests/2469 | https://gitcode.com/opengauss/openGauss-server/issues/7956 |
| 同步B兼容HAVING同名别名解析及回归用例 | https://gitcode.com/opengauss/Plugin/merge_requests/2462 | https://gitcode.com/opengauss/openGauss-server/issues/8057 |
| 插入数据日志存在异常情况下，查询导致数据库coredump（heap_fill_tuple） | https://gitcode.com/opengauss/Plugin/merge_requests/2462 | https://gitcode.com/opengauss/openGauss-server/issues/8087 |
| 修复 Dolphin 取模除零兼容行为 | https://gitcode.com/opengauss/Plugin/merge_requests/2462 | https://gitcode.com/opengauss/openGauss-server/issues/8127 |
| 修复b_compatibility_user_host_auth影响@操作符解析 | https://gitcode.com/opengauss/Plugin/merge_requests/2462 | https://gitcode.com/opengauss/openGauss-server/issues/8172 |
| 【6.0.0回合】enable_modify_column 下 MODIFY 改列类型与视图解耦，支持懒修复 | https://gitcode.com/opengauss/Plugin/merge_requests/2459 | https://gitcode.com/opengauss/Plugin/pull/2453 |
| [6.0.0回合]修复B库多字符集兼容性问题 | https://gitcode.com/opengauss/Plugin/merge_requests/2458 | https://gitcode.com/opengauss/openGauss-server/issues/8226 |



### 工具
| 标题 | 关联PR | 关联ISSUE |
| ---- | ------ | --------- |
| [Bug]: 多次使用gs_sdr做异地灾备切换，偶发一次切换失败，OM报0xaa乱码错误 | https://gitcode.com/opengauss/openGauss-OM/merge_requests/1287 | https://gitcode.com/opengauss/openGauss-OM/issues/769 |
| 同步元数据校验屏蔽项 | https://gitcode.com/opengauss/openGauss-OM/merge_requests/1260 | https://gitcode.com/opengauss/openGauss-OM/issues/763<br/>https://gitcode.com/opengauss/openGauss-OM/issues/761<br/>https://gitcode.com/opengauss/openGauss-OM/issues/764 |
| [同步到600分支]修复在高版本python下搭建灾备失败问题 | https://gitcode.com/opengauss/openGauss-OM/merge_requests/1259 | https://gitcode.com/opengauss/openGauss-server/issues/8153 |



### DDES
| 标题 | 关联PR | 关联ISSUE |
| ---- | ------ | --------- |
| 【回合600】修改最大保存日志个数范围 | https://gitcode.com/opengauss/CM/merge_requests/491 | https://gitcode.com/opengauss/openGauss-server/issues/8155 |
| CM 两节点安装， 配置第三方网管ip做高可用，在频繁杀掉主机做高可用测试时候会偶发备升主失败 | https://gitcode.com/opengauss/DCF/pull/54 | https://gitcode.com/opengauss/DCF/issues/20 |
| 多次使用gs_sdr做异地灾备切换，偶发一次切换失败，OM报0xaa乱码错误 | https://gitcode.com/opengauss/CM/pull/507 | https://gitcode.com/opengauss/openGauss-OM/issues/769 |



### 驱动

| 标题 | 关联PR | 关联ISSUE |
| ---- | ------ | --------- |
| 解决数据库重连之后内核prepare不存在问题 | https://gitcode.com/opengauss/openGauss-connector-jdbc/merge_requests/417 | https://gitcode.com/opengauss/openGauss-connector-jdbc/issues/671 |
| iteration count值范围校验 | https://gitcode.com/opengauss/openGauss-connector-jdbc/merge_requests/413 | https://gitcode.com/opengauss/openGauss-server/issues/8155 |
| 修复返回oid为负数导致sql执行失败问题 | https://gitcode.com/opengauss/openGauss-connector-jdbc/merge_requests/408 | https://gitcode.com/opengauss/openGauss-connector-jdbc/issues/669 |



## 6.0.6B002-B004转测列表：

| 序号 | 标题 | ISSUE链接 |
| ---- | ---- | --------- |
| 1 | [Bug]: CM 两节点安装， 配置第三方网管ip做高可用，在频繁杀掉主机做高可用测试时候会偶发备升主失败【HK】 | https://gitcode.com/opengauss/DCF/issues/20 |
| 2 | [Bug]: 【测试类型：功能测试】【测试版本：6.0.6】搭建容灾集群时报错 | https://gitcode.com/opengauss/openGauss-server/issues/8296 |
| 3 | [Bug]: dolphin.lower_case_table_names为1的 情况下， 开启ansi_quotes创建schema之后无法用use schema选择 | https://gitcode.com/opengauss/Plugin/issues/1615 |
| 4 | [Bug]: 【测试类型：资料测试】【测试版本：6.0.0LTS】ADIO已回合6.0.0.资料需同步修改 | https://gitcode.com/opengauss/docs/issues/7252 |
| 5 | [Bug]: 【测试类型：资料测试】【测试版本：6.0.0LTS】BM25支持自定义词典、索引空间优化已回合6.0.0 资料需同步修改 | https://gitcode.com/opengauss/docs/issues/7253 |
| 6 | [Bug]: 【测试类型：功能测试】【资源池化】【升级】6.0.0版本升级到6.0.6版本，元数据校验失败 | https://gitcode.com/opengauss/openGauss-server/issues/8301 |
| 7 | [Bug]: 【测试类型：资料测试】【测试版本：6.0.0LTS】RabitQ相关资料同步修改 | https://gitcode.com/opengauss/docs/issues/7254 |
| 8 | [Bug]: 【测试类型：功能测试】【ADIO】设置enable_adio_debug = on成功，查询结果为off | https://gitcode.com/opengauss/openGauss-server/issues/8302 |
| 9 | [Bug]: 【测试类型：功能测试】【资源池化】【升级】6.0.3版本升级到6.0.6版本后回滚，执行gs_upgradechk verify报错 | https://gitcode.com/opengauss/openGauss-server/issues/8303 |
| 10 | [Bug]: 【6.0.6】parallel_workers范围为[1，128]，当前为[1，32]，未更新 | https://gitcode.com/opengauss/openGauss-server/issues/8307 |
| 11 | [Bug]: 【测试类型：功能测试】【升级】5.0.0/5.0.5版本升级到6.0.6版本，元数据校验失败 | https://gitcode.com/opengauss/openGauss-server/issues/8310 |
| 12 | [Bug]: 【测试类型：功能测试】【升级】6.0.0/6.0.5版本升级到6.0.6版本，元数据校验失败 | https://gitcode.com/opengauss/openGauss-server/issues/8311 |
| 13 | [Bug]: 在6.0.6上的A库，执行模零操作不报错 | https://gitcode.com/opengauss/openGauss-server/issues/8312 |
| 14 | [Bug]: 【测试类型：功能测试】【传统主备】【升级】6.0.0版本升级到6.0.6版本场景，执行gs_upgradechk verify报错 | https://gitcode.com/opengauss/openGauss-server/issues/8313 |
| 15 | [Bug]: magicset开启或关闭导致了结果集不一致，致命bug | https://gitcode.com/opengauss/openGauss-server/issues/8315 |
| 16 | [Bug]: 6.0.6  opensslCVE | https://gitcode.com/opengauss/openGauss-third_party/issues/275 |
| 17 | [Bug]: libcurl的几个CVE漏洞：CVE-2026-5773 CVE-2026-6276 CVE-2026-5545 CVE-2026-4873 CVE-2026-6429 CVE-2026-7168 CVE-2026-9547 | https://gitcode.com/opengauss/openGauss-third_party/issues/276 |
| 18 | [Bug]: 当表格类型为UNLOGGED表时，创建LSG索引导致数据库崩溃 | https://gitcode.com/opengauss/openGauss-server/issues/8319 |
| 19 | [Bug]: 【测试类型：功能测试】【测试版本：6.0.6】gs_check 在高版本linux OS中使用时报错，和ifconfig相关 | https://gitcode.com/opengauss/openGauss-server/issues/8325 |
| 20 | [Bug]: 【测试类型：工具功能】【测试版本：6.0.6】gs_checkperf 检查SSD性能报错不符合预期 | https://gitcode.com/opengauss/openGauss-server/issues/8326 |
| 21 | [Bug]: 【测试类型：SQL功能】【测试版本：6.0.6】B库format函数报错 | https://gitcode.com/opengauss/openGauss-server/issues/8327 |
| 22 | [Bug]: 【测试类型：SQL功能】【测试版本：6.0.6】B库设置dolphin.lower_case_table_names=0;执行show events语法报错 | https://gitcode.com/opengauss/openGauss-server/issues/8328 |
| 23 | [Bug]: 【测试类型：SQL功能】【测试版本：6.0.6】B库left函数报错 | https://gitcode.com/opengauss/openGauss-server/issues/8329 |
| 24 | [Bug]: 【测试类型：SQL功能】【测试版本：6.0.6】B库创建列存表，不插入数据查询表数据总数为null | https://gitcode.com/opengauss/openGauss-server/issues/8332 |
| 25 | [Bug]: 【测试类型：工具功能】【测试版本：6.0.6】收集日志信息报错（gs_collector ） | https://gitcode.com/opengauss/openGauss-OM/issues/772 |
| 26 | [Bug]: 【测试类型：SQL功能】【测试版本：6.0.6】创建timescaledb插件报错 | https://gitcode.com/opengauss/openGauss-server/issues/8334 |
| 27 | [Bug]: [6.0.6]发布端备机switchover升主，订阅端未同步数据 | https://gitcode.com/opengauss/openGauss-server/issues/8339 |
| 28 | [Bug]: 开启"ss_interconnect_type = 'SHM'"数据库重启备机启动失败 | https://gitcode.com/opengauss/openGauss-server/issues/8346 |
| 29 | [Bug]: 【测试类型：功能测试】【资源池化】6.0.6版本安装出现dss相关core，导致集群不能拉起 | https://gitcode.com/opengauss/openGauss-server/issues/8373 |
| 30 | [Bug]: guc set 未校验 ss_interconnect_type 参数的合法值范围 | https://gitcode.com/opengauss/openGauss-server/issues/8378 |
| 31 | [Bug]: openEuler24.03机器存在RemoteMemTotal，om安装配置shared_buffer失败 | https://gitcode.com/opengauss/openGauss-OM/issues/776 |
| 32 | [Bug]: 606版本漏洞 CVE-2026-30922 & CVE-2026-11850 & CVE-2026-34073 | https://gitcode.com/opengauss/openGauss-third_party/issues/289 |
| 33 | [Bug]: 【测试类型：功能测试】【升级】6.0.0升级到6.0.6B003存在元数据校验失败项 | https://gitcode.com/opengauss/openGauss-server/issues/8386 |
| 34 | [Bug]: 6.0.6资源池化sysbench不达标 | https://gitcode.com/opengauss/openGauss-server/issues/8390 |
| 35 | [Bug]: 资源池化CI测试6.0.6，GSDROPNODE用例执行失败，gs_dropnode工具检测到重复进程无法执行 | https://gitcode.com/opengauss/openGauss-OM/issues/778 |
