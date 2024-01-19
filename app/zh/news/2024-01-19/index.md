---
title: 'openGauss 3.0.5版本发行说明'
date: '2024-01-19'
tags: ['theme']
category: 'news'
banner: '/category/news/2024-01-19/banner.png'
author: 'openGauss'
summary: 'openGauss 3.0.5版本发行说明'
---

## 版本背景

openGauss 3.0.5 Update版本是openGauss 3.0.0 Release的补丁版本。基于3.0.3补丁版本基础上，回合主干分支的部分需求和缺陷，发布3.0.5补丁版本。

## 需求范围

openGauss 3.0.5 补丁版本回合的需求列表：

| 编号	|  描述  |  PR链接  |
| ---   | ---   |   ---  |
| 1	   | 支持openEuler22.03 安装	| https://gitee.com/opengauss/openGauss-server/pulls/2793 |
| 2  |	支持CM VIP需求 |	https://gitee.com/opengauss/openGauss-server/pulls/3595   |
| 3  |	主备高可用能力增强  |	https://gitee.com/opengauss/openGauss-server/pulls/3515  |
| 4  |	shared_buffers支持大页内存   |	https://gitee.com/opengauss/openGauss-server/pulls/3551   |
| 5  |	子事务回滚锁抢占问题优化	  |   https://gitee.com/opengauss/openGauss-server/pulls/3958   |
| 6  |	使用新参数控制A兼容性下空字符串意义    |	https://gitee.com/opengauss/openGauss-server/pulls/3964   |
| 7  |	性能优化 |   减少btree部分分支计算	https://gitee.com/opengauss/openGauss-server/pulls/3928   <br/> local refcount 多级缓存	https://gitee.com/opengauss/openGauss-server/pulls/3933 <br/>bufferalloc半无锁hash	https://gitee.com/opengauss/openGauss-server/pulls/3935   <br/>lwlock 状态变量多路cas更新	https://gitee.com/opengauss/openGauss-server/pulls/3939   <br/>pinbuffer state更新改为fetchadd	https://gitee.com/opengauss/openGauss-server/pulls/3943   |
| 8  |	enable组dispatch，从而提升并行恢复的redo效率 |	https://gitee.com/opengauss/openGauss-server/pulls/3996 |

## 升级路径支持

| 		 基础版本		  |		 目标版本 		|
| ----- | ----- |
| 2.0.0(不带CM)         |    3.0.5(不带CM + 带CM) |
| 2.0.1(不带CM)         |    3.0.5(不带CM + 带CM) |
| 2.0.4(不带CM)         |    3.0.5(不带CM + 带CM) |
| 2.0.5(不带CM)         |    3.0.5(不带CM + 带CM) |
| 3.0.0(不带CM + 带CM)         |    3.0.5(不带CM + 带CM) |
| 3.0.2(不带CM + 带CM)         |    3.0.5(不带CM + 带CM) |
| 3.0.3(不带CM + 带CM)         |    3.0.5(不带CM + 带CM) |
| 3.0.5(不带CM + 带CM)         |    5.0.1(不带CM + 带CM) |
| 3.0.5(不带CM + 带CM)         |    master(不带CM + 带CM) |

## 回合缺陷

### 统计

| 仓库  |  严重  | 主要 | 次要 | 不重要 | 未指定 |  总计  |
| ---   | --- | ---    |  ---  | ---  |   ---  |  ---  |
| Server | 3    | 27   | 43   | 4     |  38   |   115  |
| OM     | 0    | 8    | 11    | 2    |   8   |   29   |
| CM    | 0    | 0    | 5    | 0    |   2    |   7    |
| 驱动   |  0   | 0    |  1    | 0    | 1      |   2    |

### server仓库回合缺陷列表

| 描述                                                         | 原始链接                                                | 严重级别 | 关联issue                                               |
| ------------------------------------------------------------ | ------------------------------------------------------- | -------- | ------------------------------------------------------- |
| 解决从2.0.5升级到3.0.3，升级过程中执行 select nextval导致数据库core掉，升级失败的问题 | https://gitee.com/opengauss/openGauss-server/pulls/3955 | 严重     | https://e.gitee.com/opengaussorg/dashboard?issue=I7NUKT |
| 修复json_to_record的偶些场景的core问题                       | https://gitee.com/opengauss/openGauss-server/pulls/3320 | 严重     | https://e.gitee.com/opengaussorg/dashboard?issue=I6SXJL |
| gs_probackup备份后 restore 后报错                            | https://gitee.com/opengauss/openGauss-server/pulls/2240 | 主要     | https://e.gitee.com/opengaussorg/dashboard?issue=I5SWXF |
| 【回合】修复流式容灾切换过程中主备机群由于网络原因断开后切换无法完成的问题 | https://gitee.com/opengauss/openGauss-server/pulls/4062 | 严重     | https://e.gitee.com/opengaussorg/dashboard?issue=I7QTSY |
| 修复日志在备机回放过程中 lsn 校验失败问题                    | https://gitee.com/opengauss/openGauss-server/pulls/4108 | 主要     | https://e.gitee.com/opengaussorg/dashboard?issue=I7WOBH |
| 修改问题：账本数据库历史表中，rec_num字段作为主键出现了重复  | https://gitee.com/opengauss/openGauss-server/pulls/2343 | 主要     | https://e.gitee.com/opengaussorg/dashboard?issue=I5YAOX |
| 修复codegen下游标fetch的内存泄漏。                           | https://gitee.com/opengauss/openGauss-server/pulls/2409 | 主要     | https://e.gitee.com/opengaussorg/dashboard?issue=I5WLOG |
| dcf模式下不支持gs_ctl failover操作                           | https://gitee.com/opengauss/openGauss-server/pulls/2429 | 主要     | https://e.gitee.com/opengaussorg/dashboard?issue=I5Y9LW |
| 修复带自定义函数的查询执行smp错误                            | https://gitee.com/opengauss/openGauss-server/pulls/2457 | 主要     | https://e.gitee.com/opengaussorg/dashboard?issue=I5ZPGO |
| [bugfix] 修复alter system set 命令中信号发送时间不当导致guc参数不生效的问题 | https://gitee.com/opengauss/openGauss-server/pulls/2511 | 主要     | https://e.gitee.com/opengaussorg/dashboard?issue=I5YQ05 |
| 修复WLM线程在内存不足时可能卡在PGconnectdb过程中阻塞数据库关闭 | https://gitee.com/opengauss/openGauss-server/pulls/2641 | 主要     | https://e.gitee.com/opengaussorg/dashboard?issue=I66FUD |
| 修复gsql没有适配0列数据的问题                                | https://gitee.com/opengauss/openGauss-server/pulls/2649 | 主要     | https://e.gitee.com/opengaussorg/dashboard?issue=I66O3V |
| 设置wdr_snapshot_interval生成快照时间间隔未立即生效          | https://gitee.com/opengauss/openGauss-server/pulls/2820 | 主要     | https://e.gitee.com/opengaussorg/dashboard?issue=I6ACEB |
| 修复开启partial seq scan后Seq Scan算子初始化期间core         | https://gitee.com/opengauss/openGauss-server/pulls/2869 | 主要     | https://e.gitee.com/opengaussorg/dashboard?issue=I6BST2 |
| 修复plpgsql空数组core问题                                    | https://gitee.com/opengauss/openGauss-server/pulls/2870 | 主要     | https://e.gitee.com/opengaussorg/dashboard?issue=I6CNFP |
| 修复hash info的heap-use-after-free问题                       | https://gitee.com/opengauss/openGauss-server/pulls/3261 | 主要     | https://e.gitee.com/opengaussorg/dashboard?issue=I6PYSJ |
| 修复执行带自治事务的存储过程未及时释放内存的问题             | https://gitee.com/opengauss/openGauss-server/pulls/3315 | 主要     | https://e.gitee.com/opengaussorg/dashboard?issue=I6SLS6 |
| 修复cluster下盘场景coredump问题                              | https://gitee.com/opengauss/openGauss-server/pulls/3393 | 主要     | https://e.gitee.com/opengaussorg/dashboard?issue=I6Z16C |
| 修复merge into 导致的core dump问题                           | https://gitee.com/opengauss/openGauss-server/pulls/3583 | 主要     | https://e.gitee.com/opengaussorg/dashboard?issue=I7DUZG |
| 修复重复索引的问题                                           | https://gitee.com/opengauss/openGauss-server/pulls/3159 | 主要     | https://e.gitee.com/opengaussorg/dashboard?issue=I6DR4K |
| 修复copy from制定timestamp format中包含FF6导致coredump的问题 | https://gitee.com/opengauss/openGauss-server/pulls/3995 | 主要     | https://e.gitee.com/opengaussorg/dashboard?issue=I7AU3E |
| 当正常关闭数据库时，无日志表不会被删除                       | https://gitee.com/opengauss/openGauss-server/pulls/4034 | 次要     | https://e.gitee.com/opengaussorg/dashboard?issue=I7TDBX |
| 修复redo性能优化patch导致的hung的问题                        | https://gitee.com/opengauss/openGauss-server/pulls/4145 | 次要     | https://e.gitee.com/opengaussorg/dashboard?issue=I7VMIG |
| 【3.0.0】修复并行回放下pitr启动失败的问题                    | https://gitee.com/opengauss/openGauss-server/pulls/3922 | 次要     | https://e.gitee.com/opengaussorg/dashboard?issue=I7PHBK |
| 【3.0.0回合】大页内存guc参数更改为不向备机同步               | https://gitee.com/opengauss/openGauss-server/pulls/3908 | 次要     | https://e.gitee.com/opengaussorg/dashboard?issue=I7FA2U |
| gs_probackup备份后 restore 后未删除绝对路径文件              | https://gitee.com/opengauss/openGauss-server/pulls/2294 | 次要     | https://e.gitee.com/opengaussorg/dashboard?issue=I5V0HQ |
| 修复explain merge into报错的问题                             | https://gitee.com/opengauss/openGauss-server/pulls/2362 | 次要     | https://e.gitee.com/opengaussorg/dashboard?issue=I5TVBA |
| 修改禁用indexscan时候误禁用indexonlyscan                     | https://gitee.com/opengauss/openGauss-server/pulls/2371 | 次要     | https://e.gitee.com/opengaussorg/dashboard?issue=I5ZAB8 |
| 修复创建资源池时整数回转的问题                               | https://gitee.com/opengauss/openGauss-server/pulls/2390 | 次要     | https://e.gitee.com/opengaussorg/dashboard?issue=I5ZK93 |
| 修复潜在的整数溢出问题                                       | https://gitee.com/opengauss/openGauss-server/pulls/2395 | 次要     | https://e.gitee.com/opengaussorg/dashboard?issue=I70KOE |
| 修复a outerjoin (+)的bug                                     | https://gitee.com/opengauss/openGauss-server/pulls/2402 | 次要     | https://e.gitee.com/opengaussorg/dashboard?issue=I5ZEZX |
| [bugfix] 修复pyog驱动执行select into 返回的结果不为INSERT的问题 | https://gitee.com/opengauss/openGauss-server/pulls/2426 | 次要     | https://e.gitee.com/opengaussorg/dashboard?issue=I5YV0S |
| 修复二级分区表分区可以指定tablespace为pg_global              | https://gitee.com/opengauss/openGauss-server/pulls/2476 | 次要     | https://e.gitee.com/opengaussorg/dashboard?issue=I61XRL |
| 【海量】创建存储过程时，包1内包含同名存储过程，创建同义词，调用失败 | https://gitee.com/opengauss/openGauss-server/pulls/2497 | 次要     | https://e.gitee.com/opengaussorg/dashboard?issue=I62JMH |
| 修复table sample场景下，随机数取值没有考虑到多个sample执行的情况 | https://gitee.com/opengauss/openGauss-server/pulls/2500 | 次要     | https://e.gitee.com/opengaussorg/dashboard?issue=I5TLIJ |
| 修改smgr hash 的match/compare函数，在计算和匹配时，忽略opt属性。 | https://gitee.com/opengauss/openGauss-server/pulls/2578 | 次要     | https://e.gitee.com/opengaussorg/dashboard?issue=I5LQU2 |
| 禁止手动删除列存分区的delta/cudesc表                         | https://gitee.com/opengauss/openGauss-server/pulls/2609 | 次要     | https://e.gitee.com/opengaussorg/dashboard?issue=I5UITO |
| 修复record类型中定义的not null约束未生效的问题               | https://gitee.com/opengauss/openGauss-server/pulls/2627 | 次要     | https://e.gitee.com/opengaussorg/dashboard?issue=I65RH5 |
| 增加语法解析阶段bison的默认栈大小                            | https://gitee.com/opengauss/openGauss-server/pulls/2629 | 次要     | https://e.gitee.com/opengaussorg/dashboard?issue=I619RB |
| 层次函数嵌套聚集函数报错问题                                 | https://gitee.com/opengauss/openGauss-server/pulls/2630 | 次要     | https://e.gitee.com/opengaussorg/dashboard?issue=I63I6W |
| 修复pg_stat_replication存在race condition并且有可能造成宕机的问题 | https://gitee.com/opengauss/openGauss-server/pulls/2677 | 次要     | https://e.gitee.com/opengaussorg/dashboard?issue=I674AZ |
| 修复并行查询下agg语句执行结果不一致的问题                    | https://gitee.com/opengauss/openGauss-server/pulls/2692 | 次要     | https://e.gitee.com/opengaussorg/dashboard?issue=I6736H |
| 修复列存子连接包含rownum和one time filter时找不到var的问题   | https://gitee.com/opengauss/openGauss-server/pulls/2706 | 次要     | https://e.gitee.com/opengaussorg/dashboard?issue=I67NP1 |
| 修复synonym命名冲突但仍然允许通过的问题                      | https://gitee.com/opengauss/openGauss-server/pulls/2833 | 次要     | https://e.gitee.com/opengaussorg/dashboard?issue=I6AQO2 |
| 解决pg、b兼容模式下中文字符串显式转换宕机问题                | https://gitee.com/opengauss/openGauss-server/pulls/2835 | 次要     | https://e.gitee.com/opengaussorg/dashboard?issue=I6AHJM |
| 解决在synchronous_standby_names='*'时gs_probackup备份失败的问题 | https://gitee.com/opengauss/openGauss-server/pulls/2838 | 次要     | https://e.gitee.com/opengaussorg/dashboard?issue=I6A0GX |
| 修复配置jdbc驱动参数preferQueryMode为不同参数值，yat执行用例结果不一样的问题 | https://gitee.com/opengauss/openGauss-server/pulls/2905 | 次要     | https://e.gitee.com/opengaussorg/dashboard?issue=I6AU8Z |
| 修复explain后导致匿名块无法调用存储过程的bug                 | https://gitee.com/opengauss/openGauss-server/pulls/2940 | 次要     | https://e.gitee.com/opengaussorg/dashboard?issue=I6DWLN |
| 修复alter table set schema可修改为系统内部模式的问题         | https://gitee.com/opengauss/openGauss-server/pulls/2957 | 次要     | https://e.gitee.com/opengaussorg/dashboard?issue=I6E18S |
| undo launcher线程结束时释放共享内存中的latch                 | https://gitee.com/opengauss/openGauss-server/pulls/3006 | 次要     | https://e.gitee.com/opengaussorg/dashboard?issue=I6IQXE |
| 修复JDBC setMaxRows查询完成后不会自动提交事务的bug           | https://gitee.com/opengauss/openGauss-server/pulls/3049 | 次要     | https://e.gitee.com/opengaussorg/dashboard?issue=I69LMK |
| 修复同步提交机制失效问题                                     | https://gitee.com/opengauss/openGauss-server/pulls/3054 | 次要     | https://e.gitee.com/opengaussorg/dashboard?issue=I6AENE |
| [bugfix] 修复在启动阶段内存不足时,elog打印函数内部core的问题（5.0.0回合master) | https://gitee.com/opengauss/openGauss-server/pulls/3149 | 次要     | https://e.gitee.com/opengaussorg/dashboard?issue=I6GMBX |
| 解决列存alter table add column回滚的core问题                 | https://gitee.com/opengauss/openGauss-server/pulls/3194 | 次要     | https://e.gitee.com/opengaussorg/dashboard?issue=I6JEG9 |
| 修复打开plsql_show_all_error后coredump的问题                 | https://gitee.com/opengauss/openGauss-server/pulls/3246 | 次要     | https://e.gitee.com/opengaussorg/dashboard?issue=I6O2DY |
| 闪回恢复操作在drop两次同名表时的设计缺陷                     | https://gitee.com/opengauss/openGauss-server/pulls/3330 | 次要     | https://e.gitee.com/opengaussorg/dashboard?issue=I6GE2Y |
| 修复通过同义词refresh物化视图失败的问题                      | https://gitee.com/opengauss/openGauss-server/pulls/3333 | 次要     | https://e.gitee.com/opengaussorg/dashboard?issue=I6RW16 |
| 修复打开plsql_show_all_error后未记录gs_error表的问题         | https://gitee.com/opengauss/openGauss-server/pulls/3367 | 次要     | https://e.gitee.com/opengaussorg/dashboard?issue=I6RUMQ |
| 解决gs_dump does not resolve circular dependency的问题       | https://gitee.com/opengauss/openGauss-server/pulls/3366 | 次要     | https://e.gitee.com/opengaussorg/dashboard?issue=I6SKVA |
| 修复baselocatortype为'\0'，导致nodeToString输出字符串被截断的问题 | https://gitee.com/opengauss/openGauss-server/pulls/2339 | 不重要   | https://e.gitee.com/opengaussorg/dashboard?issue=I5U2KC |
| 修复设置log_truncate_on_rotation=on，设置系统时间为一周后，日志未覆盖写入而是追加写入问题 | https://gitee.com/opengauss/openGauss-server/pulls/2360 | 不重要   | https://e.gitee.com/opengaussorg/dashboard?issue=I5EWX1 |
| [轻量级MR]修复pendingOps hash表在删除时因为cxt为null导致coredump的问题 | https://gitee.com/opengauss/openGauss-server/pulls/3070 | 不重要   | https://e.gitee.com/opengaussorg/dashboard?issue=I6KMV4 |
| 修复local_debug_server_info函数返回值类型错误的问题          | https://gitee.com/opengauss/openGauss-server/pulls/3454 | 不重要   | https://e.gitee.com/opengaussorg/dashboard?issue=I72JSK |
| 修复分区表page数量估算错误的问题                             | https://gitee.com/opengauss/openGauss-server/pulls/2305 | 未指定   | 未指定                                                  |
| 【轻量级 PR】：修复删除数据库后，backend id被复用导致的lsc资源清理时的core问题 | https://gitee.com/opengauss/openGauss-server/pulls/2675 | 未指定   | https://e.gitee.com/opengaussorg/dashboard?issue=I671N9 |
| 防止arm操作系统由于调度算法的问题导致xlog follower等待被分配太多CPU的问题 | https://gitee.com/opengauss/openGauss-server/pulls/2685 | 未指定   | https://e.gitee.com/opengaussorg/dashboard?issue=I65VE6 |
| 函数InitConfigureNamesBool内部结构localConfigureNamesBool赋值有误 | https://gitee.com/opengauss/openGauss-server/pulls/2727 | 未指定   | https://e.gitee.com/opengaussorg/dashboard?issue=I68IPU |
| 函数GetPartOidByATcmd内部枚举值PART_AREA_INTERVAL使用有误    | https://gitee.com/opengauss/openGauss-server/pulls/2729 | 未指定   | https://e.gitee.com/opengaussorg/dashboard?issue=I68J5O |
| gs_ctl启动/停止时根据配置文件的data_directory执行启动/停止   | https://gitee.com/opengauss/openGauss-server/pulls/2730 | 未指定   | https://e.gitee.com/opengaussorg/dashboard?issue=I68IL9 |
| 函数pgaudit_ProcessUtility内T_AlterTableStmt分支判断sequence有误 | https://gitee.com/opengauss/openGauss-server/pulls/2737 | 未指定   | https://e.gitee.com/opengaussorg/dashboard?issue=I68NV0 |
| 函数getPrivateModeDataNodeTask内拼接路径使用‘\’              | https://gitee.com/opengauss/openGauss-server/pulls/2739 | 未指定   | https://e.gitee.com/opengaussorg/dashboard?issue=I68OAX |
| 函数StrToInt32内部判断范围代码无效                           | https://gitee.com/opengauss/openGauss-server/pulls/2740 | 未指定   | https://e.gitee.com/opengaussorg/dashboard?issue=I68OQT |
| 函数get_random_job_id内部判断job_max_number范围不准确会导致后续异常 | https://gitee.com/opengauss/openGauss-server/pulls/2750 | 未指定   | https://e.gitee.com/opengaussorg/dashboard?issue=I68VQH |
| 修复alter role的core问题                                     | https://gitee.com/opengauss/openGauss-server/pulls/2789 | 未指定   | https://e.gitee.com/opengaussorg/dashboard?issue=I69HWA |
| 修复plpgsql_parse_wordtype函数未判空问题                     | https://gitee.com/opengauss/openGauss-server/pulls/2791 | 未指定   | https://e.gitee.com/opengaussorg/dashboard?issue=I5SA0C |
| 解决非线程池模式下，pl_debugger导致数据库无法停库的问题。    | https://gitee.com/opengauss/openGauss-server/pulls/2823 | 未指定   | https://e.gitee.com/opengaussorg/dashboard?issue=I6AQUF |
| autovacuum launcher线程开始时重置queryMemInChunks相关变量    | https://gitee.com/opengauss/openGauss-server/pulls/2874 | 未指定   | https://e.gitee.com/opengaussorg/dashboard?issue=I6DEEF |
| jsonb中展示小数的前缀0                                       | https://gitee.com/opengauss/openGauss-server/pulls/3002 | 未指定   | https://e.gitee.com/opengaussorg/dashboard?issue=I6IO9R |
| issue修复：COMMENT ON对存储过程注释后，gs_dump导出内容导入失败问题修复 | https://gitee.com/opengauss/openGauss-server/pulls/3292 | 未指定   | https://e.gitee.com/opengaussorg/dashboard?issue=I6QWI9 |
| 修复uppercase_attribute_name打开的场景下，gs_dump的core问题  | https://gitee.com/opengauss/openGauss-server/pulls/3327 | 未指定   | https://e.gitee.com/opengaussorg/dashboard?issue=I6SOQU |
| 修复 NasWrite 中free之后还继续使用指针的问题                 | https://gitee.com/opengauss/openGauss-server/pulls/3383 | 未指定   | https://e.gitee.com/opengaussorg/dashboard?issue=I6YG27 |
| 构建二进制默认加上pg_xlogdump和pagehack工具                  | https://gitee.com/opengauss/openGauss-server/pulls/3792 | 未指定   | https://e.gitee.com/opengaussorg/dashboard?issue=I7LSPQ |
| 修复merge into同时并发update/delete的问题                    | https://gitee.com/opengauss/openGauss-server/pulls/3728 | 未指定   | https://e.gitee.com/opengaussorg/dashboard?issue=I7IV86 |
| 修复回放慢时备机偶现unknow状态                               | https://gitee.com/opengauss/openGauss-server/pulls/3531 | 未指定   | https://e.gitee.com/opengaussorg/dashboard?issue=I7BBKF |
| drop extension 支持删除自定义扩展                            | https://gitee.com/opengauss/openGauss-server/pulls/3521 | 未指定   | 未指定                                                  |
| 解决逻辑复制相关问题                                         | https://gitee.com/opengauss/openGauss-server/pulls/3322 | 未指定   | 未指定                                                  |
| 实现pg_terminate_active_session_socket用于直接关闭session的socket | https://gitee.com/opengauss/openGauss-server/pulls/3786 | 未指定   | 未指定                                                  |
| 修复读与回放冲突后查询cancel不掉的问题                       | https://gitee.com/opengauss/openGauss-server/pulls/3786 | 未指定   | 未指定                                                  |
| 同步生成列create table like解析问题                          | https://gitee.com/opengauss/openGauss-server/pulls/3786 | 未指定   | 未指定                                                  |
| 解析空页面                                                   | https://gitee.com/opengauss/openGauss-server/pulls/3786 | 未指定   | 未指定                                                  |
|	opengauss丢失csnlog文件	|	https://gitee.com/opengauss/openGauss-server/pulls/4633	|	未指定	|	https://e.gitee.com/opengaussorg/issues/list?issue=I8H74U	|
|	【测试类型：压力长稳】【测试版本：3.0.5】【需求名称：无】 tpcc业务长跑，备机回放卡住	|	https://gitee.com/opengauss/openGauss-server/pulls/4377	|	主要	|	https://e.gitee.com/opengaussorg/issues/list?issue=I8BWOP	|
|	备机回放卡住，杀掉备机后出现core	|	https://gitee.com/opengauss/openGauss-server/pulls/4377	|	主要	|	https://e.gitee.com/opengaussorg/issues/list?issue=I8BVOZ	|
|	3.0.5版本failover后，most_available_sync参数不生效	|	https://gitee.com/opengauss/openGauss-server/pulls/4365	|	未指定	|	https://e.gitee.com/opengaussorg/issues/list?issue=I8CYKG	|
|	【测试类型：SQL功能】【测试版本：3.0.3】从O迁移了一个view到openGauss，drop view时报错无法删除	|	https://gitee.com/opengauss/openGauss-server/pulls/4465	|	次要	|	https://e.gitee.com/opengaussorg/issues/list?issue=I8CSRM	|
|	3.0.5版本failover后，新主节点most_available_sync值查询不一致	|	https://gitee.com/opengauss/openGauss-server/pulls/4365	|	未指定	|	https://e.gitee.com/opengaussorg/issues/list?issue=I8BCGQ	|
|	【测试类型：功能测试】【测试版本：3.0.5】一主一备，备机Replay不推进	|	https://gitee.com/opengauss/openGauss-server/pulls/4377	|	主要	|	https://e.gitee.com/opengaussorg/issues/list?issue=I83R1D	|
|	【测试类型：SQL功能】【测试版本：3.0.5】【自动化】 删除数据库时产生了core，数据库宕机	|	https://gitee.com/opengauss/openGauss-server/pulls/4377	|	主要	|	https://e.gitee.com/opengaussorg/issues/list?issue=I7QILN	|
|	【测试类型：SQL功能】【测试版本：3.0.2】 count(*)与count主键返回的数据不一致 	|	https://gitee.com/opengauss/blog/pulls/877	|	未指定	|	https://e.gitee.com/opengaussorg/issues/list?issue=I8AID0	|
|	一主四备ANY1 ANY1同步备配置模式下，当后面整个AZ2 6004 6005的实例挂掉，不管是否开启最大可用模式，都会阻塞主机写业务【Y】	|	https://gitee.com/opengauss/openGauss-server/pulls/4512	|	次要	|	https://e.gitee.com/opengaussorg/issues/list?issue=I8AD19	|
|	麒麟系统一主两备集群，执行TPCC过程中，备机异常stop，pg日志报错包含FATAL:  cannot wait on a latch owned by another process	|	https://gitee.com/opengauss/openGauss-server/pulls/4583	|	主要	|	https://e.gitee.com/opengaussorg/issues/list?issue=I89URT	|
|	【测试类型：功能测试】【测试版本：3.0.5】【并行apply优化】GUC参数parallel_recovery_cost_record需要改变为enable_time_report	|	https://gitee.com/opengauss/openGauss-server/pulls/4204	|	次要	|	https://e.gitee.com/opengaussorg/issues/list?issue=I83UJ5	|
|	catchup2normal_wait_time设置为0，TPS降低【M】	|	https://gitee.com/opengauss/openGauss-server/pulls/4511	|	未指定	|	https://e.gitee.com/opengaussorg/issues/list?issue=I82STY	|
|	autovacuum触发比较频繁的情况下，toast表数据无法清理，数据表空间一直涨	|	https://gitee.com/opengauss/openGauss-server/pulls/4507	|	未指定	|	https://e.gitee.com/opengaussorg/issues/list?issue=I8E7EG	|
|   修复设置catchup2normal_wait_time后性能下降的问题  |		https://gitee.com/opengauss/openGauss-server/pulls/4511	| 未指定 |	https://e.gitee.com/opengaussorg/dashboard?issue=I82STY |
|   社区发布的tools包缺少cjson文件，无法使用  	| 		https://gitee.com/opengauss/openGauss-server/pulls/4569	|  次要	|  https://e.gitee.com/opengaussorg/dashboard?issue=I8IJRI  |
|   麒麟系统一主两备集群，执行TPCC过程中，备机异常stop，pg日志报错包含FATAL: cannot wait on a latch owned by another process  |	https://gitee.com/opengauss/openGauss-server/pulls/4583	|  主要 |	https://e.gitee.com/opengaussorg/dashboard?issue=I89URT  |
|   减少对pg_partition进行vacuum操作时日志输出	|  https://gitee.com/opengauss/openGauss-server/pulls/4596	| 未指定	|  https://e.gitee.com/opengaussorg/dashboard?issue=I8MIJL  |
|   优化SyncRepLock的耗时		|	https://gitee.com/opengauss/openGauss-server/pulls/4598	| 未指定 | 	未指定 | 
|   opengauss丢失csnlog文件	|	https://gitee.com/opengauss/openGauss-server/pulls/4633	| 未指定 |	https://e.gitee.com/opengaussorg/dashboard?issue=I8H74U |
|   修复备机statement_history视图不能用的问题   |	https://gitee.com/opengauss/openGauss-server/pulls/4663	  |  主要	|  https://e.gitee.com/opengaussorg/dashboard?issue=I8Q2UT |
|   【回合】修复升级过程中备机回放阻塞问题       | https://gitee.com/opengauss/openGauss-server/pulls/4691    |  主要   |  https://e.gitee.com/opengaussorg/issues/table?issue=I8S8WD |
|    复归代码，在postmaster中加锁可能会导致core | https://gitee.com/opengauss/openGauss-server/pulls/4689    |  次要   |  https://e.gitee.com/opengaussorg/dashboard?issue=I8R39Q   |
|    备节点使用gs_basebackup备份报错           |  https://gitee.com/opengauss/openGauss-server/pulls/4700   |  未指定 | https://e.gitee.com/opengaussorg/dashboard?issue=I8S004 |
|  jdbc预编译插入SQL语句，5w数据之前版本3min插入完成，现在插入时间10min左右 | https://gitee.com/opengauss/openGauss-server/pulls/4702 | 主要 | https://e.gitee.com/opengaussorg/dashboard?issue=I8T5CA |



### OM仓库回合缺陷列表

|	描述	|	原始链接	|	严重级别	|	关联issue	|
| ----- | ----- | ----- | ----- |
|	3.0.3new就地升级到5.0.0报错删除索引不存在	|	https://gitee.com/opengauss/openGauss-OM/pulls/460	|	主要	|	https://e.gitee.com/opengaussorg/dashboard?issue=I6SWZA	|
|	【fixbug】【OM】【I6O0K6】修复灰度升级开启了ssl_enable 参数问题	|	https://gitee.com/opengauss/openGauss-OM/pulls/432	|	主要	|	https://e.gitee.com/opengaussorg/dashboard?issue=I6O0K6	|
|	【OM】【fixbug】【#I6O0K6】跨92547版本灰度升级提交失败（enable_ssl参数在切新版本前被打开问题）	|	https://gitee.com/opengauss/openGauss-OM/pulls/430	|	主要	|	https://e.gitee.com/opengaussorg/dashboard?issue=I6O0K6	|
|	fix bug about executing upgrade sql script in standby	|	https://gitee.com/opengauss/openGauss-OM/pulls/428	|	主要	|	https://e.gitee.com/opengaussorg/dashboard?issue=I6L6RP	|
|	【OM】【fixbug】【I6ARUJ】升级流程中适配CM参数(包括在跨92574版本升级enable_ssl参数的适配)	|	https://gitee.com/opengauss/openGauss-OM/pulls/423	|	主要	|	https://e.gitee.com/opengaussorg/dashboard?issue=I6ARUJ	|
|	修复-L模式扩容后备机的application_name未修改的问题	|	https://gitee.com/opengauss/openGauss-OM/pulls/398	|	主要	|	https://e.gitee.com/opengaussorg/dashboard?issue=I6ATET	|
|	数据库角色切换后无法使用gs_expansion进行扩容	|	https://gitee.com/opengauss/openGauss-OM/pulls/362	|	主要	|	https://e.gitee.com/opengaussorg/dashboard?issue=I60OO5	|
|	[bug fix]修复执行gs_expansion时校验syncNumFirst的问题	|	https://gitee.com/opengauss/openGauss-OM/pulls/361	|	主要	|	https://e.gitee.com/opengaussorg/dashboard?issue=I617FL	|
|	gs_sdr搭建流式集群设置most_available_sync	|	https://gitee.com/opengauss/openGauss-OM/pulls/450	|	次要	|	https://e.gitee.com/opengaussorg/dashboard?issue=I6TBNH	|
|	fix grammar about gs_uninstall --delete-data	|	https://gitee.com/opengauss/openGauss-OM/pulls/402	|	次要	|	https://e.gitee.com/opengaussorg/dashboard?issue=I6EFJB	|
|	修复异常情况下，安装报错upgrade_version文件不存在的问题	|	https://gitee.com/opengauss/openGauss-OM/pulls/400	|	次要	|	https://e.gitee.com/opengaussorg/dashboard?issue=I6C01Y	|
|	解决gs_sshexkey创建互信缺少encrypt文件	|	https://gitee.com/opengauss/openGauss-OM/pulls/394	|	次要	|	https://e.gitee.com/opengaussorg/dashboard?issue=I6AA0D	|
|	预安装报错log目录的属主不能是root用户	|	https://gitee.com/opengauss/openGauss-OM/pulls/380	|	次要	|	https://e.gitee.com/opengaussorg/dashboard?issue=I66FOD	|
|	fix set guc upgrade_mode failed	|	https://gitee.com/opengauss/openGauss-OM/pulls/436	|	不重要	|	https://e.gitee.com/opengaussorg/dashboard?issue=I6E5XA	|
|	修复缩容报错sslconnection创建失败的问题	|	https://gitee.com/opengauss/openGauss-OM/pulls/379	|	不重要	|	https://e.gitee.com/opengaussorg/dashboard?issue=I5TD7U	|
|	fix(TaskPool):修复执行ssh命令时找不到ssh可执行文件的问题	|	https://gitee.com/opengauss/openGauss-OM/pulls/447	|	未指定	|	https://e.gitee.com/opengaussorg/dashboard?issue=I6ULHA	|
|	修改子用户加载/etc/profile导致获取环境变量不对的问题	|	https://gitee.com/opengauss/openGauss-OM/pulls/411	|	未指定	|	https://e.gitee.com/opengaussorg/dashboard?issue=I6E7JV	|
|	修复预安装过程中环境句柄数文件覆盖写入的问题	|	https://gitee.com/opengauss/openGauss-OM/pulls/367	|	未指定	|	https://e.gitee.com/opengaussorg/dashboard?issue=I5W74V	|
|	修复gs_postuninstall失败的问题	|	https://gitee.com/opengauss/openGauss-OM/pulls/345	|	未指定	|	https://e.gitee.com/opengaussorg/dashboard?issue=I5Y12N	|
|	gs_dropnode命令删除节点，会把replconninfoX的值置空，置空以后会导致建立容灾的时候检查该参数时通不过	|	https://gitee.com/opengauss/openGauss-OM/pulls/521	|	次要	|	https://e.gitee.com/opengaussorg/dashboard?issue=I7OFP9	|，
|	主机挂了后，CM自动切主，原主机无法dropnode掉	|	https://gitee.com/opengauss/openGauss-OM/pulls/617	|	未指定	|	https://e.gitee.com/opengaussorg/issues/list?issue=I8AWJ1	|
|	偶现从2.0.1升级到3.0.5时候，被删除的guc参数没有删掉，导致启动失败的问题	|	https://gitee.com/opengauss/openGauss-OM/pulls/611	|	未指定	|	https://e.gitee.com/opengaussorg/issues/list?issue=I8FEDR	|
|	【测试类型：功能测试】【测试版本：3.0.5】3.0.5小版本升级提交后，upgrade_from参数不是0，导致主机磁盘超过85%无法切换和设置只读	|	https://gitee.com/opengauss/openGauss-OM/pulls/620	|	次要	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8MCV8	|
|	【测试类型：功能测试】【测试版本：3.0.5】麒麟系统上，升级openssh后，ssh工具和om无法使用	|	https://gitee.com/opengauss/openGauss-OM/pulls/635	|	未指定	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8MCW0	|
|	【测试类型：工具功能】【测试版本：3.0.5】【升级】2.0.1（不带cm）升级到3.0.5（带cm），回滚过程中报错找不到cm_agent.conf	|	https://gitee.com/opengauss/openGauss-OM/pulls/639	|	次要	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8NMZX	|
| 修复麒麟系统升级openssh后，和数据库出现ssh不兼容问题	| 	https://gitee.com/opengauss/openGauss-OM/pulls/635	|  未指定  |	https://e.gitee.com/opengaussorg/dashboard?issue=I8MCW0  |
| 【升级】2.0.1（不带cm）升级到3.0.5（带cm），回滚过程中报错找不到cm_agent.conf		|	https://gitee.com/opengauss/openGauss-OM/pulls/639	|  次要   |	https://e.gitee.com/opengaussorg/dashboard?issue=I8NMZX  |
| 【升级】2.0.1ncm-3.0.5cm 就地升级，升级过程中偶现备1core，但升级是成功的 | https://gitee.com/opengauss/openGauss-OM/pulls/659  | 次要  | https://e.gitee.com/opengaussorg/dashboard?issue=I8SAHE | 
| 3.0.5~5.1.1 cm_cm 就地升级_回滚_升级提交，升级过程中cms core | https://gitee.com/opengauss/openGauss-OM/pulls/660  |  次要     |  https://e.gitee.com/opengaussorg/dashboard?issue=I8S9YM |


### CM仓库回合列表


CM 3.0.5版本同步5.0.0版本代码修改，在此基础上回合主干缺陷

|	描述	|	原始链接	|	严重级别	|	关联issue	|
| ----- | ----- | ----- | ---- |
|	【轻量级 PR】：磁盘心跳，每次读64M，占用带宽较多	|	https://gitee.com/opengauss/CM/pulls/115 	|	次要	|	https://e.gitee.com/opengaussorg/dashboard?issue=I6R77W	|
|	【轻量级 PR】: 添加了指针释放，修复了部分内存泄漏	|	https://gitee.com/opengauss/CM/pulls/120  	|	次要	|	https://e.gitee.com/opengaussorg/dashboard?issue=I6WUDA	|
|	修复cm_ctl远程设置event_triggers失败的问题	|	https://gitee.com/opengauss/CM/pulls/123	|	次要	|	https://e.gitee.com/opengaussorg/dashboard?issue=I71G1W	|
|	适配开启数据库参数uppercase_attribute_name	|	https://gitee.com/opengauss/CM/pulls/124 	|	次要	|	https://e.gitee.com/opengaussorg/dashboard?issue=I72BZW	|
|	start资源添加-u参数	|	https://gitee.com/opengauss/CM/pulls/125	|	次要	|	https://e.gitee.com/opengaussorg/dashboard?issue=I78PJL	|
|	修复resname为NULL导致段错误的问题	|	https://gitee.com/opengauss/CM/pulls/121 	|	未指定	|	https://e.gitee.com/opengaussorg/dashboard?issue=I6WIY6	|
|	支持配置等待静态主的时间	|	https://gitee.com/opengauss/CM/pulls/122  	|	未指定	|	https://e.gitee.com/opengaussorg/dashboard?issue=I71NS5	|


### JDBC仓库回合列表

|	描述	|	原始链接	|	严重级别	|	关联issue	|
| ----- | ----- | ----- | ---- |
|	JDBC进行批量插入时，preparedStatementCacheQueries参数不生效，数据库端cachedplan数据上升较快	|	https://e.gitee.com/opengaussorg/repos/opengauss/openGauss-connector-jdbc/pulls/186	|	未指定	|	https://e.gitee.com/opengaussorg/issues/list?issue=I8AJBK	|
|	使用JDBC连接数据，双引号列名强转成大写数据库无法插入	|	https://e.gitee.com/opengaussorg/repos/opengauss/openGauss-connector-jdbc/pulls/186	|	次要	|	https://e.gitee.com/opengaussorg/issues/list?issue=I8I0AW	|




### 已知问题转需求

| 描述 | issue链接 |
| ----- | ----- |
| 分区表的统计信息有误	|  https://e.gitee.com/opengaussorg/issues/list?issue=I8EDIL |
| 支持主机挂了之后还能存放和查询备机flush lsn位点  | https://e.gitee.com/opengaussorg/issues/table?issue=I8USAY |


### 已知问题遗留

|  问题描述 |  issue链接 |  问题结论 |
| ----- | ----- | ----- |
| 【测试类型：压力长稳】【测试版本：3.0.5】并行回放场景下，分区表在开启autovacuum后，执行大量的update操作+global索引操作将导致回放性能下降|	https://e.gitee.com/opengaussorg/issues/list?issue=I8LMB0 | 该问题在3.0.0版本测试发现。分区表高频update+global索引下，带来频繁的vacuum操作，备库回放每条xlog_btree_vacuum日志均需读取(lastBockVacuumed,blk)之间的大量页面导致回放很慢。3.0.0和3.0.5回放性能差别不大，本版本不修改 |
| SyncRepLock等待事件导致性能下降	|	https://e.gitee.com/opengaussorg/issues/list?issue=I8HU86  | 分析有可能是walsender接收备机XLog响应消息频繁进入唤醒backend流程 导致等待次数多；也有可能是walSender唤醒backend时的处理流程慢，比如enable_save_confirmed_lsn开启时，给复制槽设置多数派LSN，导致总体耗时多。 特定场景问题，优化起来复杂度较高，客户同意3.0.5遗留 |
| og 3.0.0 range interval自动分区存在多个相同时间范围分区子表 | https://e.gitee.com/opengaussorg/projects/361110/bugs/table?issue=I8SS5J  | 并发建分区和打开分区表时候，有概率出现问题。用户少数几个表低概率出现，添加监控收集日志，同步进行复现分析代码，不带入3.0.5版本 |
| max_size_for_xlog_prune参数：主机为断连的备机保留最大xlog不生效 | https://e.gitee.com/opengaussorg/projects/361110/bugs/table?issue=I8UGVD | 为了保证xlog最大力度保留，某些场景下清理不掉。建议该参数保留现有逻辑，增加一个参数，在满足多数派的时候，可以对主机xlog做强制清理|
| 备机文件句柄泄露 | https://e.gitee.com/opengaussorg/projects/361110/bugs/table?issue=I8UXBU  | max_files_per_process默认是100，在把这个参数配置比较大，10w时候，如果主机有大量建表或分区操作，会导致备机文件句柄增长，最大会到30W。只要确保/proc/sys/fs/file-max值大于30万（默认150万以上）不会有影响。后面考虑使用vfd方案做优化。 |