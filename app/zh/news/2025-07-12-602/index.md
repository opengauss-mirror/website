---
title: 'openGauss 6.0.2版本正式发布！'
date: '2025-07-12'
tags: ['theme']
author: 'openGauss'
category: 'news'
summary: 'openGauss 6.0.2 版本是openGauss 6.0.0 Release的补丁版本。基于6.0.1版本基础上，回合主干分支的部分DFX需求和缺陷，发布6.0.2补丁版本。'
---



## 版本介绍

openGauss 6.0.2 版本是 openGauss 6.0.0 Release 的补丁版本。在 6.0.1 版本基础上，回合主干分支的部分 DFX 需求和缺陷，发布 6.0.2 补丁版本。

## 需求范围

openGauss 6.0.2 补丁版本回合的需求列表：

|      分类      |       需求描述    |
| ---------- | ------------------------------------------------------------ |
| 工具       | dss支持增量build <br>OM和CM支持IPV6                          |
| 内核       | 批量插入性能优化                                             |
| 向量数据库 | DataVec向量数据库能力增强  <br/> 向量数据库轻量化改造  <br/> 支持BM25全文检索 |
| 共享存储   | 资源池化实时构建支持流控 <br/> 可维护性提升，维护视图支持更详细的等待粒度 <br/> multipath支持资源池化 <br/> 优化资源池化下共享盘文件io操作，解决dss故障导致的各类问题 <br/> XLOG支持日志合一 <br/> 内存控制和视图监控 <br/> 资源池化临时表/unlogged表/物化视图支持页式存储 <br/> 资源池化xlog支持归档 <br/> 资源池化支持虚拟机方式部署，支持非dorado方式的共享存储安装方式，支持NOF以及FCSAN存储接口 |

## 升级路径支持

| 基础版本                | 目标版本                       |
| ----------------------- | ------------------------------ |
| 5.0.\*(不带 CM + 带 CM) | 6.0.2(不带 CM + 带 CM)         |
| 6.0.\*(不带 CM + 带 CM)  | 6.0.2(不带 CM + 带 CM)         |
| 6.0.2(不带 CM + 带 CM)  | master\|7.0.0(不带 CM + 带 CM) |

共享存储升级支持：

| 基础版本                | 目标版本                       |
| ----------------------- | ------------------------------ |
| 6.0.1   |    6.0.2        |
| 6.0.2    |    master\|7.0.0       |

## CVE 漏洞

当前补丁版本没有 CVE 披露漏洞。

## 缺陷回合列表

6.0.2B001回合转测列表：

#### 内核

| 标题                                                         | PR链接                                                       | ISSUE链接                                                    |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 修复gs_probackup备份时文件刷盘权限不足问题                   | https://gitcode.com/opengauss/openGauss-server/merge_requests/7901 | https://e.gitee.com/opengaussorg/dashboard?issue=IBDU4S      |
| 修复远端恢复失败的问题                                       | https://gitcode.com/opengauss/openGauss-server/merge_requests/7901 | https://e.gitee.com/opengaussorg/issues/table?issue=IB83HR   |
| 【回合600】添加GUC参数控制B库下创建分区表默认表现为LOCAL | https://gitcode.com/opengauss/openGauss-server/merge_requests/7895 | https://gitee.com/opengauss/openGauss-server/issues/IAR8VL |
| 解决show events报语法错误的问题                              | https://gitcode.com/opengauss/openGauss-server/merge_requests/7894 | https://gitcode.com/opengauss/openGauss-server/issues/7008   |
| 回合600修复db4ai安全漏洞                                     | https://gitcode.com/opengauss/openGauss-server/merge_requests/7891 | https://e.gitee.com/opengaussorg/dashboard?issue=IBUMIP      |
| 【测试版本：7.0.0-RC1】db4ai升级脚本b库报错                  | https://gitcode.com/opengauss/openGauss-server/merge_requests/7891 | https://e.gitee.com/opengaussorg/dashboard?issue=IBVB87      |
| 6.0.0升级至7.0.0-RC2，pg_catalog.pg_proc系统表校验不一致问题 | https://gitcode.com/opengauss/openGauss-server/merge_requests/7891 | https://e.gitee.com/opengaussorg/issues/table?issue=IC1R9T   |
| 执行hw_create_table_llt引起宕机                              | https://gitcode.com/opengauss/openGauss-server/merge_requests/7887 | https://gitee.com/opengauss/openGauss-server/issues/IBXF6U   |
| 存储过程中携带execute prepare语句，创建存储过程成功但执行失败 | https://gitcode.com/opengauss/openGauss-server/merge_requests/7887 | https://gitee.com/opengauss/Plugin/issues/IAZYW7             |
| 【回合6.0.0】普通用户通过gs_clean线程加载插件 && 修复设置b_format_behavior_compat_options连接B库coredump的问题 | https://gitcode.com/opengauss/openGauss-server/merge_requests/7880 | https://e.gitee.com/opengaussorg/dashboard?issue=IC1COP      |
| opengauss不支持子用户加载dolphin插件                         | https://gitcode.com/opengauss/openGauss-server/merge_requests/7880 | https://e.gitee.com/opengaussorg/dashboard?issue=IC1U2Y      |
| 关键字on作为索引名，报错信息有误                             | https://gitcode.com/opengauss/openGauss-server/merge_requests/7879 | https://gitcode.com/opengauss/openGauss-server/issues/6532   |
| 兼容B库UTC_TIME(True)函数报错信息多了括号                    | https://gitcode.com/opengauss/openGauss-server/merge_requests/7879 | https://gitcode.com/opengauss/Plugin/issues/1388             |
| trc日志改为默认关                                            | https://gitcode.com/opengauss/openGauss-server/merge_requests/7876 | https://e.gitee.com/opengaussorg/dashboard?issue=IBARG6      |
| 【回合 600】修复若干 asan 内存问题                           | https://gitcode.com/opengauss/openGauss-server/merge_requests/7875 | https://gitcode.com/opengauss/openGauss-server/issues/6094   |
| 【回合 600】修复 24.03 通过 lscpu 获取 CPU 数量有误的问题    | https://gitcode.com/opengauss/openGauss-server/merge_requests/7874 | https://gitcode.com/opengauss/openGauss-server/issues/6981   |
| 【回合 6.0.0】修正 `CREATE USER` 语法解析报错信息            | https://gitcode.com/opengauss/openGauss-server/merge_requests/7863 | https://gitcode.com/opengauss/openGauss-server/issues/305    |
| [回合6.0.0] 解决不支持avx指令集的x86环境编译失败问题         | https://gitcode.com/opengauss/openGauss-server/merge_requests/7837 | https://e.gitee.com/opengaussorg/dashboard?issue=IAFML0      |
| 【资源池化6.0.2回合】fix bug for open log file with no permission | https://gitcode.com/opengauss/openGauss-server/merge_requests/7834 | https://gitcode.com/opengauss/openGauss-server/issues/6868   |
| 回合传统主备归档逻辑问题至6.0.0                              | https://gitcode.com/opengauss/openGauss-server/merge_requests/7824 | https://gitcode.com/opengauss/openGauss-server/issues/356    |
| 解决创建ivfflat索引时，lists较大导致内存分配不足创建失败的问题 | https://gitcode.com/opengauss/openGauss-server/merge_requests/7817 | https://gitcode.com/opengauss/openGauss-server/issues/6697   |
| 【回合6.0.0】修复SPQ场景下subplan新增连接类型实现不完全的错误 | https://gitcode.com/opengauss/openGauss-server/merge_requests/7816 | https://e.gitee.com/opengaussorg/dashboard?issue=IAQCBD      |
| 【回合6.0.0】 修复函数带variadic, numeric类型转换报错问题    | https://gitcode.com/opengauss/openGauss-server/merge_requests/7810 | https://e.gitee.com/opengaussorg/dashboard?issue=IB5MX1      |
| 【回合6.0.0】增加dolphin协议中的nextSeqid                    | https://gitcode.com/opengauss/openGauss-server/merge_requests/7805 | https://gitcode.com/opengauss/Plugin/issues/1487             |
| 【回合6.0.0】修复fastcheck_single回归测试用例hw_cstore_insert时发生coredump问题 | https://gitcode.com/opengauss/openGauss-server/merge_requests/7802 | https://gitcode.com/opengauss/openGauss-server/issues/6974   |
| 【测试版本：6.0.0】 memcheck+CI连跑log                       | https://gitee.com/opengauss/openGauss-server/pulls/6436      | https://e.gitee.com/opengaussorg/dashboard?issue=IAOSCU      |
| ndo目录下尤其是undometa占了不小的空间，池化并不支持ustore，不应该有不合理的空间占用 | https://gitee.com/opengauss/openGauss-server/pulls/6868      | https://e.gitee.com/opengaussorg/dashboard?issue=IBBRBJ      |
| 【测试版本：7.0.0-RC1】update_lockwait_timeout参数不生效     | https://gitee.com/opengauss/openGauss-server/pulls/7322      | https://e.gitee.com/opengaussorg/dashboard?issue=IBPBPO      |
| 【回合6.0.0】修复upsert在冲突场景下逻辑解码的问题            | https://gitcode.com/opengauss/openGauss-server/merge_requests/7793 | https://gitcode.com/opengauss/openGauss-server/issues/7065   |
| [6.0.1]fix: 修复fsm page刷盘时卡在等xlog flush的问题         | https://gitcode.com/opengauss/openGauss-server/merge_requests/7696 | https://gitcode.com/opengauss/openGauss-server/issues/6980   |
| 修复smp stream线程查询ustore表可见性判断错误的问题           | https://gitcode.com/opengauss/openGauss-server/merge_requests/7661 | https://gitcode.com/opengauss/openGauss-server/issues/6683   |
| 【6.0.0】修复tinyint index in int array报错                  | https://gitcode.com/opengauss/openGauss-server/merge_requests/7595 | https://e.gitee.com/opengaussorg/issues/table?issue=IC3CCL   |
| 【6.0.0】修复3.0.3升级至6.0.1报错                            | https://gitcode.com/opengauss/openGauss-server/merge_requests/7588 | https://e.gitee.com/opengaussorg/issues/table?issue=IC1H0E   |
| 修复 “debug版本修改enable_incremental_checkpoint = on -&gt; off 产生 coredump” 的问题 | https://gitcode.com/opengauss/openGauss-server/merge_requests/7571 | https://e.gitee.com/opengaussorg/issues/table?issue=I88WBU   |
| 【bugfix】6.0.0 修复abort事务时，如果事务内创建了大量文可能会导致abort卡死的问题 | https://gitcode.com/opengauss/openGauss-server/merge_requests/7564 | https://e.gitee.com/opengaussorg/dashboard?issue=IAJAKO      |
| 支持构建Lite版本镜像                                         | https://gitcode.com/opengauss/openGauss-server/merge_requests/7541 | https://e.gitee.com/opengaussorg/dashboard?issue=IBW259      |
| 完善ustore表对oid不支持功能拦截                              | https://gitcode.com/opengauss/openGauss-server/merge_requests/7531 | https://e.gitee.com/opengaussorg/dashboard?issue=IBXYT5      |
| [3.0.0回合6.0.0]修复开启备机逻辑复制，执行倒换时如果同步备先退，主机的逻辑复制walsender不会退出的问题 | https://gitcode.com/opengauss/openGauss-server/merge_requests/7511 | https://e.gitee.com/opengaussorg/issues/table?issue=IBY8ZR   |
| [3.0.0回合6.0.0]修复btvacuumscan中有遍历扫描lastBlockVacuumed到lastBlockLocked生成btree vacuum xlog的问题 | https://gitcode.com/opengauss/openGauss-server/merge_requests/7508 | https://e.gitee.com/opengaussorg/issues/table?issue=I8LMB0   |
| 【回合】处理issue：create view 中含有connect by会报错        | https://gitcode.com/opengauss/openGauss-server/merge_requests/7475 | https://gitee.com/opengauss/openGauss-server/issues/IBBUB6   |
| 【7396、7436回合6.0.0】修复子查询提升mergejoin的排序规则报错问题 | https://gitcode.com/opengauss/openGauss-server/merge_requests/7445 | https://gitee.com/opengauss/openGauss-server/issues/IBSV1A   |
| 解决tablespace指定在PGDATA目录下，basebackup备份后，tablespace路径不正确 | https://gitcode.com/opengauss/openGauss-server/merge_requests/7394 | https://gitcode.com/opengauss/openGauss-server/issues/6628   |
| SSL_set_fd_ex 静态函数增加相应的wrap函数，供其它模块调用     | https://gitcode.com/opengauss/openGauss-server/merge_requests/7374 | https://gitcode.com/opengauss/openGauss-server/issues/6250   |
| 【回合6.0.0】修复部分非保留关键字不能做表名、列名            | https://gitcode.com/opengauss/openGauss-server/merge_requests/7359 | https://e.gitee.com/opengaussorg/dashboard?issue=IBJLVZ      |
| 修复回收站对象超期未回收问题                                 | https://gitcode.com/opengauss/openGauss-server/merge_requests/7353 | https://e.gitee.com/opengaussorg/dashboard?issue=IBS1OB      |
| 修复资源池化升级到6.0.1失败问题                              | https://gitcode.com/opengauss/openGauss-server/merge_requests/7345 | https://e.gitee.com/opengaussorg/dashboard?issue=IBRD5J      |
| 【回合】修复部分等锁参数失效问题                             | https://gitcode.com/opengauss/openGauss-server/merge_requests/7252 | https://gitee.com/opengauss/openGauss-server/issues/IBPBPO   |
| 修复jsonb的value为空时建jsonb gin索引失败的问题              | https://gitcode.com/opengauss/openGauss-server/merge_requests/7193 | https://gitcode.com/opengauss/openGauss-server/issues/6543   |
| 【回合6.0.0】resolve the issue csnlog cannot truncate when enable_ustore set off | https://gitcode.com/opengauss/openGauss-server/merge_requests/7096 | https://e.gitee.com/opengaussorg/dashboard?issue=IBGJVS      |
| 修复用户自定义变量内存增长问题                               | https://gitcode.com/opengauss/openGauss-server/merge_requests/7070 | https://gitee.com/opengauss/Plugin/issues/IBIYZB             |
| 修复smp场景嵌套concat执行效率慢的问题                        | https://gitcode.com/opengauss/openGauss-server/pull/7605     | https://gitcode.com/opengauss/openGauss-server/issues/6856   |
| 带用户变量赋值的查询禁用smp                                  | https://gitcode.com/opengauss/openGauss-server/pull/7601     | https://gitcode.com/opengauss/Plugin/issues/1472             |
| 修复smp下cstore insert场景没有分配事务号的问题 && 修复smp下执行带userset变量语句失败的问题 | https://gitcode.com/opengauss/openGauss-server/pull/7522     | https://gitcode.com/opengauss/openGauss-server/issues/6854   |
| 修复rowlevelsecurity问题                                     | https://gitcode.com/opengauss/openGauss-server/pull/7451     | https://gitcode.com/opengauss/openGauss-server/issues/6671   |
| 修复replace死循环的问题                                      | https://gitcode.com/opengauss/openGauss-server/pull/7267     | https://gitcode.com/opengauss/openGauss-server/issues/6568   |
| 修复普通用户通过函数非法提权的问题                           | https://gitcode.com/opengauss/openGauss-server/pull/7260     | https://gitcode.com/opengauss/openGauss-server/issues/6455   |
| 修复线程池下跨事务游标fetch的core问题                        | https://gitcode.com/opengauss/openGauss-server/pull/7213     | https://gitcode.com/opengauss/openGauss-server/issues/6112   |
| 修复create index if not exists不带索引名时coredump的问题     | https://gitcode.com/opengauss/openGauss-server/pull/7001     | https://gitcode.com/opengauss/openGauss-server/issues/6299   |
| 支持b库创建自增序列最大值为int8_max/uint8_max                | https://gitcode.com/opengauss/openGauss-server/pull/6881     | https://e.gitee.com/opengaussorg/dashboard?issue=IB7UXD      |
| 修复并发修改存储过程导致的core问题                           | https://gitcode.com/opengauss/openGauss-server/pull/6818     | https://e.gitee.com/opengaussorg/dashboard?issue=IB8X7K      |
| 修复编码转换时保存常量地址导致的core问题                     | https://gitcode.com/opengauss/openGauss-server/pull/6809     | https://e.gitee.com/opengaussorg/dashboard?issue=IB8X4I      |
| 修复bitmapscan扫描结果异常的问题                             | https://gitcode.com/opengauss/openGauss-server/pull/6781     | https://e.gitee.com/opengaussorg/dashboard?issue=IB7Z7F      |
| gs_retrieve提前检查输出目录是否存在                          | https://gitcode.com/opengauss/openGauss-server/pull/6714     | https://e.gitee.com/opengaussorg/dashboard?issue=IB5FS6      |
| 修复非轻量版cmake不带dblink，以及dolphin插件无法使用问题     | https://gitcode.com/opengauss/openGauss-server/pull/6684     | https://gitee.com/opengauss/openGauss-server/issues/IB52NP   |
| 修复创建抽象类型不支持逻辑解码导致发布订阅check失败的问题    | https://gitcode.com/opengauss/openGauss-server/pull/6587     | https://gitcode.com/opengauss/openGauss-server/issues/295    |
| 修复subscription check若干问题                               | https://gitcode.com/opengauss/openGauss-server/pull/6499     | https://gitcode.com/opengauss/openGauss-server/issues/295    |
| A 库下处理hash分区遇到null值输入报错问题                     | https://gitcode.com/opengauss/openGauss-server/pull/7226     | https://gitcode.com/opengauss/community/issues/384           |
| fix dolphin \d+ print collation id > 10000 produce core      | https://gitcode.com/opengauss/openGauss-server/pull/7209     | https://e.gitee.com/opengaussorg/dashboard?issue=IBMXV7      |
| 修复event门禁概率失败情形                                    | https://gitcode.com/opengauss/openGauss-server/pull/7023     | https://gitcode.com/opengauss/openGauss-server/issues/6126   |
| utf8编码的兼容B库场景下，mot外表的char字段类型插入时校验长度存在问题，报错“ERROR:  value too long for column size (30)” | https://gitcode.com/opengauss/openGauss-server/pull/6660     | https://e.gitee.com/opengaussorg/dashboard?issue=IB1G4D      |
| 【Sync】回合并发drop&reindex导致core问题bugfixed             | https://gitee.com/opengauss/openGauss-server/pulls/7566      | https://e.gitee.com/opengaussorg/dashboard?issue=IAOKGK      |
| 解决DEBUG版分区表在禁用seqscan时count出现core的问题          | https://gitee.com/opengauss/openGauss-server/pulls/7494      | https://e.gitee.com/opengaussorg/dashboard?issue=IBWRXK      |
| 解决union all出现core问题                                    | https://gitee.com/opengauss/openGauss-server/pulls/7488      | https://e.gitee.com/opengaussorg/dashboard?issue=IBVP4P      |
| 解决memcheck版本执行窗口函数语句宕机问题                     | https://gitee.com/opengauss/openGauss-server/pulls/6962      | https://e.gitee.com/opengaussorg/dashboard?issue=IBF7XQ      |
| 解决表达式作分区键时split分区报错的问题                      | https://gitee.com/opengauss/openGauss-server/pulls/6880/     | https://e.gitee.com/opengaussorg/dashboard?issue=IAGUZL      |
| 解决前缀索引+in或any条件匹配结果不正确的问题                 | https://gitee.com/opengauss/openGauss-server/pulls/6867      | https://e.gitee.com/opengaussorg/dashboard?issue=IB41J1      |
| 兼容mysql的unique_checks参数                                 | https://gitcode.com/opengauss/openGauss-server/pull/7554     | https://gitcode.com/opengauss/Plugin/issues/1470             |
| 修复jsonb的value为空时建jsonb gin索引失败的问题              | https://gitcode.com/opengauss/openGauss-server/pull/7189     | https://gitcode.com/opengauss/openGauss-server/issues/6543   |
| 修复存储过程使用set_variables传参报different character set data is not allowed | https://gitcode.com/opengauss/openGauss-server/pull/6957     | https://gitcode.com/opengauss/Plugin/issues/1344             |
| 修复standard_conforming_strings = off时B库初始化时core的问题 | https://gitcode.com/opengauss/openGauss-server/pull/6931     | https://gitcode.com/opengauss/openGauss-server/issues/1038   |
| 修复" 不能被转义成“的问题                                    | https://gitcode.com/opengauss/openGauss-server/pull/6505     | https://gitcode.com/opengauss/Plugin/issues/36               |
| 修复支持FOREIGN_KEY_CHECKS=0且只有外键触发器的时候无法走sql-bypass的问题 | https://gitcode.com/opengauss/openGauss-server/pull/7667     | https://gitcode.com/opengauss/openGauss-server/issues/6952   |
| 支持整型常量按照参数形式解释                                 | https://gitcode.com/opengauss/openGauss-server/pull/7670     | https://gitcode.com/opengauss/openGauss-server/issues/6660   |
| 支持通过unique_checks开关跳过唯一性检查                      | https://gitcode.com/opengauss/openGauss-server/pull/7695     | https://gitcode.com/opengauss/openGauss-server/issues/6660   |
| 优化_bt_compare中int1和int2比较的性能                        | https://gitcode.com/opengauss/openGauss-server/pull/7697     | https://gitcode.com/opengauss/openGauss-server/issues/6660   |
| 修复备机写转发在备机自己报错后无法转ROLLBACK给主机的问题     | https://gitee.com/opengauss/openGauss-server/pulls/6619      | https://e.gitee.com/opengaussorg/dashboard?issue=IB235O      |
| 修复页面中在读磁盘的过程中触发了rebuild, 在dms中对比校验失败的问题 | https://gitee.com/opengauss/openGauss-server/pulls/7109      | https://e.gitee.com/opengaussorg/dashboard?issue=IBHI4Q      |
| 解决jdbc中直接发送显式的prepare语句，备机写转发报错的问题    | https://gitee.com/opengauss/openGauss-server/pulls/7296      | https://e.gitee.com/opengaussorg/dashboard?issue=IBQSMP      |
| 解决按需回放部分问题：                                       | https://gitcode.com/opengauss/openGauss-server/pull/6592     | https://e.gitee.com/opengaussorg/issues/table?issue=IATB4V   |
| 7.0.0修复【写转发】参数命名单词错误，enable_remote_excute修改为enable_remote_execute | https://gitcode.com/opengauss/openGauss-server/pull/6603     | https://gitee.com/opengauss/openGauss-server/issues/IAQC5D   |
| 解决内置函数query_node_reform_info部分回放时间/构建时间字段获取异常问题 | https://gitcode.com/opengauss/openGauss-server/pull/6707     | https://gitcode.com/opengauss/openGauss-server/issues/1038   |
| 【bugfix】修复redo阶段大量线程pin同一个页面，导致cleanup锁饿死的问题 | https://gitcode.com/opengauss/openGauss-server/pull/6742     | https://gitcode.com/opengauss/openGauss-server/issues/215    |
| 【bugfix】修改资源池化switchover时checkpoint线程有概率core的问题 | https://gitcode.com/opengauss/openGauss-server/pull/6829     | https://gitee.com/opengauss/openGauss-server/issues/IAXCAU   |
| 【7.0.0-RC1】修复开启实时构建特性下，内置函数query_node_reform_info部分字段无法获取有效值 | https://gitcode.com/opengauss/openGauss-server/pull/6830     | https://gitcode.com/opengauss/openGauss-server/issues/47     |
| 【bugfix】修复极致RTO分发XLOG_SWITCH日志时卡住的问题         | https://gitcode.com/opengauss/openGauss-server/pull/6896     | https://gitcode.com/opengauss/openGauss-server/issues/6158   |
| 修复资源池化下wal日志段文件大小调整为1G，实际查询结果为16MB的问题 | https://gitcode.com/opengauss/openGauss-server/pull/6997     | https://gitcode.com/opengauss/openGauss-server/issues/6129   |
| 【bugfix】修复按需回放执行drop table后发生failover卡住的问题 | https://gitcode.com/opengauss/openGauss-server/pull/7064     | https://gitcode.com/opengauss/openGauss-server/issues/6102   |
| 【bugfix】 修复按需回放部分core问题                          | https://gitcode.com/opengauss/openGauss-server/pull/7145     | https://gitcode.com/opengauss/openGauss-server/issues/6415   |
| 【bugfix】修复开启全量checkpoint后，备机存在写xlog的问题     | https://gitcode.com/opengauss/openGauss-server/pull/7181     | https://gitcode.com/opengauss/openGauss-server/issues/6433   |
| 【bugfix】按需回放redo阶段分区锁流程加固                     | https://gitcode.com/opengauss/openGauss-server/pull/7217     | https://gitcode.com/opengauss/openGauss-server/issues/6239   |
| 修复小型化安装数据库，节点IP监听错误问题                     | https://gitcode.com/opengauss/openGauss-server/pull/7273     | https://e.gitee.com/opengaussorg/dashboard?issue=IBOJ4Y      |
| 【bugfix】 修复主机重启场景，主机flushcopy时有概率拿到invalidbuffer | https://gitcode.com/opengauss/openGauss-server/pull/7327     | https://gitcode.com/opengauss/openGauss-server/issues/6569   |
| 【bugfix】修复资源池化主机重启场景备机死锁的问题             | https://gitcode.com/opengauss/openGauss-server/pull/7357     | https://gitcode.com/opengauss/openGauss-server/issues/6312   |
| bugfix 修复主机重启时有概率死锁问题                          | https://gitcode.com/opengauss/openGauss-server/pull/7390     | https://e.gitee.com/opengaussorg/dashboard?issue=IBI15Q      |
| 【bugfix】修复主机重启场景按需回放备机new lsn is less than past lsn问题 | https://gitcode.com/opengauss/openGauss-server/pull/7422     | https://gitcode.com/opengauss/openGauss-server/issues/6610   |
| 【bugfix】master修复abort事务时，如果事务内创建了大量文可能会导致abort卡死的问题 | https://gitcode.com/opengauss/openGauss-server/pull/7562     | https://gitcode.com/opengauss/openGauss-server/issues/598    |

#### 插件

| 标题                                                         | PR链接                                                   | ISSUE链接                                                    |
| ------------------------------------------------------------ | -------------------------------------------------------- | ------------------------------------------------------------ |
| 【回合 600】处理issue：desc 查看表结构与之前不一致           | https://gitcode.com/opengauss/Plugin/merge_requests/2151 | https://gitcode.com/opengauss/Plugin/issues/1348             |
| 【回合 600】修复interval to类型转换以及interval表达式溢出报错core | https://gitcode.com/opengauss/Plugin/merge_requests/2150 | https://gitcode.com/opengauss/Plugin/issues/1400             |
| 【回合 600】修复set character_set_connection=binary语法报错  | https://gitcode.com/opengauss/Plugin/merge_requests/2149 | https://gitcode.com/opengauss/Plugin/issues/1349             |
| 【回合 600】修复若干 asan 内存问题                           | https://gitcode.com/opengauss/Plugin/merge_requests/2148 | https://gitcode.com/opengauss/openGauss-server/issues/6094   |
| 【回合 600】修复 GetPeakVarBit 中获取 VarBit* 有误导致崩溃的问题 | https://gitcode.com/opengauss/Plugin/merge_requests/2147 | https://gitcode.com/opengauss/Plugin/issues/323              |
| 添加GUC参数控制B库下创建分区表默认表现为LOCAL                | https://gitcode.com/opengauss/Plugin/merge_requests/2146 | https://gitee.com/opengauss/openGauss-server/issues/IAR8VL   |
| 修复schema.index大小写的问题                                 | https://gitcode.com/opengauss/Plugin/merge_requests/2146 | https://e.gitee.com/opengaussorg/dashboard?issue=IAS5TU      |
| 升级绑定ansi_quotes                                          | https://gitcode.com/opengauss/Plugin/merge_requests/2146 | https://gitee.com/opengauss/Plugin/issues/IBBAKL             |
| 解决create table like未报错与if case结果不对的问题           | https://gitcode.com/opengauss/Plugin/merge_requests/2145 | https://gitee.com/opengauss/openGauss-server/issues/IBO9IY   |
| 【回合600】回合pr 1886 处理issue:存储过程中携带execute prepare语句，创建存储过程成功但执行失败 | https://gitcode.com/opengauss/Plugin/merge_requests/2144 | https://gitee.com/opengauss/Plugin/issues/IAZYW7             |
| 【回合6.0.0】修复alter default privileges grant index        | https://gitcode.com/opengauss/Plugin/merge_requests/2143 | https://gitcode.com/opengauss/Plugin/issues/1414             |
| 处理issue：mysql驱动连接表时间字段为空时报错                 | https://gitcode.com/opengauss/Plugin/merge_requests/2143 | https://gitee.com/opengauss/community/issues/IC291Y          |
| 适配6.0.0 dolphin 4.1-4.2的升级                              | https://gitcode.com/opengauss/Plugin/merge_requests/2130 | https://gitcode.com/opengauss/openGauss-server/issues/7095   |
| 【sync】回合B库创建外键时int转bpchar导致的core问题bugfix代码至6.0.0 | https://gitcode.com/opengauss/Plugin/merge_requests/2128 | https://e.gitee.com/opengaussorg/dashboard?issue=IBY06Z      |
| 【测试类型：兼容性】【测试版本：7.0.0-RC1】B库下用户1给用户2赋予proxy权限后，用户2再给用户1 赋予proxy权限失败 | https://gitcode.com/opengauss/Plugin/merge_requests/2127 | https://gitcode.com/opengauss/Plugin/issues/1427             |
| 修复代码中拼写错误，enerate_relation_name改为generate_relation_name，ODLPHIN宏修改正确DOLPHIN | https://gitcode.com/opengauss/Plugin/merge_requests/2125 | https://gitcode.com/opengauss/Plugin/issues/147              |
| 【回合6.0.0】修复light_comm打开下mysql客户端连接失败的问题   | https://gitcode.com/opengauss/Plugin/merge_requests/2123 | https://gitcode.com/opengauss/Plugin/issues/1487             |
| 修复alter function set报错的问题                             | https://gitcode.com/opengauss/Plugin/merge_requests/2120 | https://gitee.com/opengauss/Plugin/issues/IAVG75             |
| 修复门禁用例不稳定的问题                                     | https://gitcode.com/opengauss/Plugin/merge_requests/2120 | https://gitee.com/opengauss/Plugin/issues/IB1YTV             |
| 修复非轻量版dolphin插件无法使用问题                          | https://gitcode.com/opengauss/Plugin/merge_requests/2120 | https://gitee.com/opengauss/openGauss-server/issues/IB52NP   |
| 函数支持入参为enum类型                                       | https://gitcode.com/opengauss/Plugin/merge_requests/2120 | https://e.gitee.com/opengaussorg/dashboard?issue=IB5BB3      |
| 产生列支持引用特定入参的concat函数                           | https://gitcode.com/opengauss/Plugin/merge_requests/2120 | https://e.gitee.com/opengaussorg/dashboard?issue=IBC4Q5      |
| 修改b库的自增列序列最大值为INT64_MAX/UINT64_MAX              | https://gitcode.com/opengauss/Plugin/merge_requests/2120 | https://e.gitee.com/opengaussorg/dashboard?issue=IB7UXD      |
| 修复b库下指定分区转换无法走imcs scan的问题                   | https://gitcode.com/opengauss/Plugin/merge_requests/2120 | https://gitcode.com/opengauss/Plugin/issues/1383             |
| 修复json_object入参为null时的coredump问题                    | https://gitcode.com/opengauss/Plugin/merge_requests/2120 | https://e.gitee.com/opengaussorg/issues/table?issue=IBPR87   |
| 修复timestampadd函数的memcheck问题                           | https://gitcode.com/opengauss/Plugin/merge_requests/2120 | https://gitcode.com/opengauss/Plugin/issues/1426             |
| 解决因为read阻塞调用导致信号处理过程pthead_exit无法生效，进而线程无法退出的问题 | https://gitcode.com/opengauss/Plugin/merge_requests/2038 | https://gitcode.com/opengauss/openGauss-server/issues/6250   |
| 【回合6.0.0】修复部分关键字无法做表名列名                    | https://gitcode.com/opengauss/Plugin/merge_requests/2037 | https://e.gitee.com/opengaussorg/dashboard?tab=files&issue=IBJLWZ |
| 【回合6.0.0】分区健检测约束时大小写不匹配问题修复            | https://gitcode.com/opengauss/Plugin/merge_requests/2009 | https://gitee.com/opengauss/openGauss-server/issues/IBO3HQ   |
| 修复 bool 与 bit 和 time 之间无法做异或的问题                | https://gitcode.com/opengauss/Plugin/merge_requests/2006 | https://gitcode.com/opengauss/Plugin/issues/1379             |
| 修复set@自定义变量存储过程中内存泄漏问题【回合600】          | https://gitcode.com/opengauss/Plugin/merge_requests/1997 | https://e.gitee.com/opengaussorg/issues/table?issue=IBL67U   |
| 修复json中->>中转义处理和mysql不一致的问题                   | https://gitcode.com/opengauss/Plugin/merge_requests/2124 | https://gitcode.com/opengauss/Plugin/issues/1420             |
| 修复tpcc-mysql对接og时的问题                                 | https://gitcode.com/opengauss/Plugin/merge_requests/2124 | https://gitcode.com/opengauss/Plugin/pull/2079               |
| 增加mysql兼容的UNIQUE_CHECKS参数                             | https://gitcode.com/opengauss/Plugin/merge_requests/2124 | https://gitcode.com/opengauss/Plugin/issues/1470             |
| 修复tpcc-mysql对接openGuass Q14执行失败的问题-修复MYSQL协议+SELECT，prepare场景返回的协议报文中结果集列数错误的问题 | https://gitcode.com/opengauss/Plugin/merge_requests/2124 | https://gitcode.com/opengauss/Plugin/issues/1467             |
| 修复unknow 参数无法匹配索引的问题                            | https://gitcode.com/opengauss/Plugin/merge_requests/2124 | https://e.gitee.com/opengaussorg/dashboard?issue=IC1WBI      |
| 修复json_unquote在转义场景下与mysql不一致的问题              | https://gitcode.com/opengauss/Plugin/merge_requests/2124 | https://gitcode.com/opengauss/Plugin/issues/1483             |
| 修复mysql协议连接场景的内存泄漏问题                          | https://gitcode.com/opengauss/Plugin/merge_requests/2124 | https://gitee.com/opengauss/Plugin/issues/IC2L7L             |

#### 工具

| 标题                                                         | PR链接                                                       | ISSUE链接                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ---------------------------------------------------------- |
| 【回合到6.0.0】#IAPAKZ bugfix:建立容灾关系后，主集群扩容报错 | https://gitcode.com/opengauss/openGauss-OM/merge_requests/1077 | https://e.gitee.com/opengaussorg/issues/table?issue=IAPAKZ |
| 【回合6.0.0】修复cm的vip特性xml文件检查失败问题              | https://gitcode.com/opengauss/openGauss-OM/merge_requests/1072 | https://e.gitee.com/opengaussorg/dashboard?issue=IC1NL5    |
| fix uos查询os不支持uname -p                                  | https://gitcode.com/opengauss/openGauss-OM/merge_requests/1032 | https://e.gitee.com/opengaussorg/dashboard?issue=IBPIZP    |
| 修复ad vg导致的clean操作问题                                 | https://gitcode.com/opengauss/CM/pull/281                    | https://gitcode.com/opengauss/DSS/issues/10                |
| 【修复】因openssl退出导致的cm agent core dump的问题          | https://gitcode.com/opengauss/CM/pull/282                    | https://e.gitee.com/opengaussorg/issues/table?issue=IB2AUA |
| [bugfix]修复在add vg过程中可能因为检测unknow导致的clean异常行为 | https://gitcode.com/opengauss/CM/pull/285                    | https://e.gitee.com/opengaussorg/dashboard?issue=IB3ZSO    |
| 【bugfix】对因TIMEOUT时间过短所触发的CM Agent连接打满问题进行修复 | https://gitcode.com/opengauss/CM/pull/287                    | https://gitcode.com/opengauss/CM/pull/287                  |
| 修复：按需回放in ondemand redo阶段适配CM switchover          | https://gitcode.com/opengauss/CM/pull/293                    | https://e.gitee.com/opengaussorg/issues/table?issue=IB2EPM |
| 修改FINISH_CONNECTION宏定义，保证所有调用处风格统一，去除冗余 | https://gitcode.com/opengauss/CM/pull/295                    | https://gitee.com/opengauss/CM/issues/IB8Q82               |
| cm_ctl swtichover 适配回放优化                               | https://gitcode.com/opengauss/CM/pull/314                    | https://gitee.com/opengauss/openGauss-server/issues/IBQZUS |
| pause功能补充                                                | https://gitcode.com/opengauss/CM/pull/310                    | https://e.gitee.com/opengaussorg/dashboard?issue=IBLQUL    |
| 断连加日志                                                   | https://gitcode.com/opengauss/CM/pull/297                    | https://e.gitee.com/opengaussorg/issues/table?issue=IB15EH |
| 修复failover问题                                             | https://gitcode.com/opengauss/CM/pull/288                    | https://e.gitee.com/opengaussorg/dashboard?issue=IAUKPE    |
| 建库后首轮reform，强制指定official Id为lockowner             | https://gitcode.com/opengauss/CM/pull/286                    | https://gitcode.com/opengauss/CM/pull/286                  |
| 启动单节点，还在starting                                     | https://gitcode.com/opengauss/CM/pull/296                    | https://e.gitee.com/opengaussorg/dashboard?issue=IB7G0X    |
| start单节点回显与实际状态不符                                | https://gitcode.com/opengauss/CM/pull/280                    | https://e.gitee.com/opengaussorg/dashboard?issue=IAZ8X8    |
| 修复cm_server占用内存过高问题                                | https://gitcode.com/opengauss/CM/pull/289                    | https://e.gitee.com/opengaussorg/dashboard?issue=IB8MBT    |
| 修复start/stop并发问题                                       | https://gitcode.com/opengauss/CM/pull/300                    | https://e.gitee.com/opengaussorg/dashboard?issue=IB7TVJ    |
| 修复reload版本号之后参数不生效的问题                         | https://gitcode.com/opengauss/CM/pull/312                    | https://e.gitee.com/opengaussorg/issues/list?issue=IBPMUD  |
| 修改cm启动次数统计                                           | https://gitcode.com/opengauss/CM/pull/332                    | https://e.gitee.com/opengaussorg/dashboard?issue=IC29GJ    |
| 【资源池化】【bugfix】配置mes消息池遗漏比例                  | https://gitcode.com/opengauss/CM/pull/270                    | https://e.gitee.com/opengaussorg/dashboard?issue=IAQG6G    |
| 解决假死判断太敏感问题，导致短时间链接不上，杀掉DN，本问题发现于switchover背景 | https://gitcode.com/opengauss/CM/pull/321                    | https://e.gitee.com/opengaussorg/issues/table?issue=IBAOCA |
| 回合6.0.0 修复pthread冲突                                    | https://gitcode.com/opengauss/CM/merge_requests/357          | https://e.gitee.com/opengaussorg/issues/table?issue=IBTWUG |
| 修复DCC模式下CM编译                                          | https://gitcode.com/opengauss/CM/merge_requests/356          | https://gitcode.com/opengauss/CM/issues/205                |
| cm适配perctrl                                                | https://gitcode.com/opengauss/CM/merge_requests/356          | https://gitcode.com/opengauss/CM/issues/205                |
| 【回合6.0.0】兼容cmServerLevel参数                           | https://gitcode.com/opengauss/CM/merge_requests/355          | https://gitcode.com/opengauss/CM/issues/189                |
| 【回合6.0.0】修复reload获取参数值时读取''转换为"''"导致校验为空失败的问题 | https://gitcode.com/opengauss/CM/merge_requests/351          | https://gitcode.com/opengauss/CM/issues/175                |
| 【回合6.0.0】修复日志压缩文件权限与日志权限保持一致          | https://gitcode.com/opengauss/CM/merge_requests/349          | https://gitcode.com/opengauss/CM/issues/219                |

#### 驱动

| 标题                                     | PR链接                                                       | ISSUE链接                                                    |
| ---------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 修复连接超时时间和读写超时时间不生效问题 | https://gitcode.com/opengauss/openGauss-connector-odbc/merge_requests/67 | https://gitee.com/opengauss/openGauss-connector-odbc/issues/IBQM88 |
| 解决text、bool类型转int()报错问题        | https://gitcode.com/opengauss/openGauss-connector-python-psycopg2/merge_requests/44 | https://gitcode.com/opengauss/openGauss-connector-python-psycopg2/issues/39 |



6.0.2B002转测列表：

| 标题                                                         | issue链接                                                  |
| :----------------------------------------------------------- | ---------------------------------------------------------- |
| 在开启协议兼容下，用M* JDBC连接opengauss B库查询列为null时，转换成整数和浮点数时报错，与M*表现不一致 | https://gitcode.com/opengauss/Plugin/issues/1510           |
| 优化CM内存占用                                               | https://gitcode.com/opengauss/CM/issues/228                |
| 修复opengauss数据库设置不区分大小写，create type后，create table建联合主键失败的问题 | https://gitcode.com/opengauss/openGauss-server/issues/7269 |
| [Bug]: 设置b_format_behavior_compat_options = 'enable_multi_charset'后，执行gs_basebackup失败报错【M】 | https://gitcode.com/opengauss/openGauss-server/issues/7031 |
| [Bug]: 【测试类型：功能测试】【测试版本：6.0.2】【资源池化】稳定性测试，开启CBM特性回收过慢导致xlog堆积触发满盘 | https://gitcode.com/opengauss/openGauss-server/issues/7203 |
| "[Bug]: 【测试类型：SQL】【测试版本：6.0.2B001】	postgres_fdw外表增删改成功，但是实际查询数据未生效" | https://gitcode.com/opengauss/openGauss-server/issues/7202 |
| [Bug]: 【测试版本：6.0.2】【测试类型：性能】openGauss 20.03环境 4p单机6.0.2版本性能为221.41w，相对6.0.1B002版本性能237.30w，劣化约6.6% | https://gitcode.com/opengauss/openGauss-server/issues/7191 |
| [Bug]: 【测试版本：6.0.2】【测试类型：性能】openGauss 24.03环境 2p单机6.0.2版本性能为134.67w，相对6.0.1B002版本性能141.16w，劣化约4.6% | https://gitcode.com/opengauss/openGauss-server/issues/7190 |
| [Bug]: 【测试类型：功能测试】【测试版本：6.0.2】【资源池化】备1开启实时构建，主机故障后，集群状态卡住不能恢复 | https://gitcode.com/opengauss/openGauss-server/issues/7185 |
| [Bug]:【测试类型：SQL功能】【测试版本：6.0.2 B01】 timediff、to_seconds、time等函数在6.0.2版本执行结果错误 | https://gitcode.com/opengauss/Plugin/issues/1505           |
| [Bug]:【测试类型：SQL功能】【测试版本：6.0.2 B01】 timestamp函数在6.0.2版本结果错误 | https://gitcode.com/opengauss/Plugin/issues/1504           |
| [Bug]: 【测试类型：SQL功能】【测试版本：6.0.2 B01】time_format函数在6.0.2版本执行结果有误 | https://gitcode.com/opengauss/Plugin/issues/1503           |
| [Bug]: 【测试类型：SQL功能】【测试版本：6.0.2】【资源池化】执行页式表测试，创建unlogged表失败 | https://gitcode.com/opengauss/openGauss-server/issues/7205 |
| [Bug]: 资源池化6.0.2升级7.0.0RC2失败                         | https://gitcode.com/opengauss/openGauss-server/issues/7181 |
| [Bug]: 6.0.2企业版gs_preinstall时创建root互信报错            | https://gitcode.com/opengauss/openGauss-OM/issues/708      |
| [Bug]: 【测试类型：功能】【测试版本：6.0.2 B001】扩容创建互信出现段错误 | https://gitcode.com/opengauss/openGauss-OM/issues/707      |
| [Bug]: 【测试类型：功能测试】【测试版本：6.0.2】使用gs_dropnode工具缩容失败，备机的synchronous_standby_names未修改导致再次缩容有问题 | https://gitcode.com/opengauss/openGauss-OM/issues/706      |
| [Bug]: GMS_PROFILER.FLUSH_DATA导致数据库core，7.0.0已解决，6.0.2未回合 | https://gitcode.com/opengauss/openGauss-server/issues/7214 |
| [Bug]: 【测试类型：存储功能】【测试版本：6.0.2B001】字符串转vector部分场景存储占用空间不正确 | https://gitcode.com/opengauss/openGauss-server/issues/7201 |
| [Bug]: 6.0.2版本安装带CM环境，报错提示CM版本6.0.1与数据库6.0.2不一致 | https://gitcode.com/opengauss/CM/issues/226                |
| [Bug]: 【测试类型：稳定性测试】【测试版本：6.0.2】【资源池化】稳定性测试，业务连跑12H左右主节点被踢出 | https://gitcode.com/opengauss/openGauss-server/issues/7209 |
| [Bug]: 6.0.2版本OM数据库安装CM工具时，报错版本号不对         | https://gitcode.com/opengauss/openGauss-server/issues/7213 |
| [Bug]: gs_sdr命令报错                                        | https://gitcode.com/opengauss/openGauss-OM/issues/711      |
| [Bug]: 【测试类型：SQL功能】【测试版本：6.0.2】【升级】6.0.2升级至7.0.0升级报错 | https://gitcode.com/opengauss/openGauss-server/issues/7210 |
| [Bug]:【测试类型：SQL】【测试版本：6.0.2B001】向量数据库hnswpq创建索引部分场景存在码本未训练问题 | https://gitcode.com/opengauss/openGauss-server/issues/7197 |
| [Bug]: 【测试类型：功能测试】【测试版本：6.0.2】【资源池化】cm停止节点，实际已停掉，cm_ctl stop命令执行超时 | https://gitcode.com/opengauss/openGauss-server/issues/7193 |
| [Bug]: 【测试类型：SQL】【测试版本：6.0.2B001】向量索引查询报错“ERROR: cannot extract attribute from empty tuple slot” | https://gitcode.com/opengauss/openGauss-server/issues/7189 |
| [Bug]: 【测试类型：工具功能】【测试版本：6.0.2B001】x86openeuler20.03操作系统预安装时，报错“error while loading shared libraries: libreadline.so.8” | https://gitcode.com/opengauss/openGauss-server/issues/7176 |
| bm25索引资料说明仅支持text，实际varchar相关类型也可以创建成功，功能需要与资料保持一致 | https://gitcode.com/opengauss/openGauss-server/issues/7024 |
| 创建bm25索引列，存在仅空格的字段内容时，创建索引报错         | https://gitcode.com/opengauss/openGauss-server/issues/7026 |
| bm25表达式索引创建成功，索引查询数据库core                   | https://gitcode.com/opengauss/openGauss-server/issues/7033 |
| bm25索引创建，索引with选项均不支持，需要进行功能约束和资料约束 | https://gitcode.com/opengauss/openGauss-server/issues/7051 |
| bm25索引vacuum、及concurrently构建、重建索引等SQL异常        | https://gitcode.com/opengauss/openGauss-server/issues/7054 |
| bm25索引在enable_bm25_taat参数为off场景下查询，查询结果存在重复 | https://gitcode.com/opengauss/openGauss-server/issues/7060 |
| bm25索引查询，文档长度影响固定情况下，词频影响增大，部分数据存在打分不变的情况 | https://gitcode.com/opengauss/openGauss-server/issues/7094 |
| bm25索引查询<&>操作符一样场景校验存在问题                    | https://gitcode.com/opengauss/openGauss-server/issues/7119 |
| BM25索引资料写明不支持极致RTO，但是实际支持。需要进行功能统一 | https://gitcode.com/opengauss/openGauss-server/issues/7165 |

6.0.2B003转测列表

| 标题 | issue链接 |
| --- | --- |
|	两节点CM部署，配置第三方网关，主节点宕机之后备节点cm_server无法升主  |	https://gitcode.com/opengauss/CM/issues/234 |
|	高可用环境，cm_agent内存占用过高，5.6G【H】  |	https://gitcode.com/opengauss/CM/issues/230  |
|	smallint和uint1 hash join报错[YJ]  |	https://gitcode.com/opengauss/Plugin/issues/1522 |
|	[Bug]: create table as 含date_sub时建表失败[YJ]  |	https://gitcode.com/opengauss/Plugin/issues/1520  |
|	[Bug]: JSON 中有\n 表现与 mysql 不一样[YJ]	  |   https://gitcode.com/opengauss/Plugin/issues/1519 |
|	[Bug]: 池化6.0.0版本触发Failover，备机上的backend线程退不掉导致集群卡住   |	https://gitcode.com/opengauss/openGauss-server/issues/7304 |