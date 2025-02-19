---
title: 'openGauss 5.0.3版本正式发布！'
date: '2024-08-15'
tags: ['theme']
author: 'openGauss'
category: 'news'
summary: 'openGauss 5.0.3 Update 版本是 openGauss 5.0.0 Release 的第三个补丁版本。基于 5.0.0 版本基础上，修复部分影响功能和性能的缺陷，发布 5.0.3 补丁版本。'
---

## 版本介绍

openGauss 5.0.3 Update版本是openGauss 5.0.0 Release的第三个补丁版本。基于5.0.2补丁版本基础上，回合和修复了一些影响性能的缺陷，发布5.0.3补丁版本。

## 升级路径支持

| 基础版本             | 目标版本             |
| -------------------- | -------------------- |
| 3.0.5(不带CM + 带CM) | 5.0.3(不带CM + 带CM) |
| 5.0.0(不带CM + 带CM) | 5.0.3(不带CM + 带CM) |
| 5.0.1(不带CM + 带CM) | 5.0.3(不带CM + 带CM) |
| 5.0.2(不带CM + 带CM) | 5.0.3(不带CM + 带CM) |
| 5.0.3(不带CM + 带CM) | 6.0.0(不带CM + 带CM) |

## CVE漏洞

当前补丁版本没有CVE披露漏洞。

## 回合缺陷

### 统计

| 仓库     | 严重 | 主要 | 次要 | 不重要 | 未指定 | 总计 |
| -------- | ---- | ---- | ---- | ------ | ------ | ---- |
| Server   | 2    | 0    | 10   | 0      | 1      | 13   |
| Plugin   | 1    | 2    | 8    | 1      | 0      | 12   |
| JDBC驱动 | 0    | 0    | 4    | 5      | 1      | 10   |

### Plugin兼容性回合修复列表

| 标题                                                         | pr链接                                                  | issue链接                                               | 问题级别 |
| ------------------------------------------------------------ | ------------------------------------------------------- | ------------------------------------------------------- | -------- |
| 修复子查询带别名时大小写不敏感的问题                         | https://gitee.com/opengauss/Plugin/pulls/1641           | https://e.gitee.com/opengaussorg/dashboard?issue=IA6R56 | 次要     |
| 【回合】修复cmake编译问题                                    | https://gitee.com/opengauss/Plugin/pulls/1648           | https://e.gitee.com/opengaussorg/dashboard?issue=IA7XZ2 | 严重     |
| 【zyzx】char数据使用cast函数转signed失败，B模式库            | https://gitee.com/opengauss/Plugin/pulls/1643           | https://e.gitee.com/opengaussorg/dashboard?issue=IA9YRX | 次要     |
| 【bugfix】timestamp数据类型使用between and时不走索引         | https://gitee.com/opengauss/Plugin/pulls/1638           | https://e.gitee.com/opengaussorg/dashboard?issue=IA8DH7 | 次要     |
| b兼容模式下，order by跟索引键无法走索引[zyzx]                | https://gitee.com/opengauss/Plugin/pulls/1623           | https://e.gitee.com/opengaussorg/dashboard?issue=IA7ET2 | 次要     |
| 修复locatime(3) + 10等场景下精度丢失的问题                   | https://gitee.com/opengauss/Plugin/pulls/1479           | https://e.gitee.com/opengaussorg/dashboard?issue=I9CKN9 | 不重要   |
| 修复vacuum analyze table 的core问题                          | https://gitee.com/opengauss/Plugin/pulls/1485           | https://e.gitee.com/opengaussorg/dashboard?issue=I9DMZC | 主要     |
| 处理issue：ModifyTable不支持SMP导致CORE                      | https://gitee.com/opengauss/Plugin/pulls/1488           | https://e.gitee.com/opengaussorg/dashboard?issue=I9D629 | 主要     |
| 修复elt函数的core问题                                        | https://gitee.com/opengauss/Plugin/pulls/1555           | https://e.gitee.com/opengaussorg/dashboard?issue=I9N07G | 次要     |
| 修复bit_and函数core问题                                      | https://gitee.com/opengauss/Plugin/pulls/1569           | https://e.gitee.com/opengaussorg/dashboard?issue=I9O7RU | 次要     |
| 修复hour函数小数部分没有四舍五入的问题                       | https://gitee.com/opengauss/Plugin/pulls/1585           | https://e.gitee.com/opengaussorg/dashboard?issue=I9RDKY | 次要     |
| 修复count函数语法冲突问题                                    | https://gitee.com/opengauss/Plugin/pulls/1593           | https://e.gitee.com/opengaussorg/dashboard?issue=I9R6XB | 次要     |
| 【masterPR回归5.0】gs_basebackup对用户权限提示信息需优化_5.0.0 | https://gitee.com/opengauss/openGauss-server/pulls/4606 | https://e.gitee.com/opengaussorg/dashboard?issue=I8NFWY | 未指定   |
| 设置behavior_compat_options为accept_empty_str，执行select replace('abc', 'abc') is null;报错 | https://gitee.com/opengauss/openGauss-server/pulls/5874 | https://e.gitee.com/opengaussorg/dashboard?issue=IAF9GW | 次要     |
| 修复sequence大小写忽略问题                                   | https://gitee.com/opengauss/openGauss-server/pulls/5844 | https://e.gitee.com/opengaussorg/dashboard?issue=IABEN0 | 次要     |

### server内核回合修复列表

| 标题                                                         | pr链接                                                  | issue链接                                               | 问题级别 |
| ------------------------------------------------------------ | ------------------------------------------------------- | ------------------------------------------------------- | -------- |
| 修复整数左移溢出问题                                         | https://gitee.com/opengauss/openGauss-server/pulls/5406 | https://e.gitee.com/opengaussorg/dashboard?issue=I9NDXN | 次要     |
| 【同步代码】【发布订阅】拆分分区后，发布端与订阅端表数据不一致 | https://gitee.com/opengauss/openGauss-server/pulls/5541 | https://e.gitee.com/opengaussorg/dashboard?issue=I97JSX | 次要     |
| 同步一些内存泄漏问题至5.0.0                                  | https://gitee.com/opengauss/openGauss-server/pulls/5592 | https://e.gitee.com/opengaussorg/dashboard?issue=I9VUGG | 严重     |
| 修复gs_xlog_keepers在5.0.0升级5.0.2时，系统表中数据存在不同的问题。 | https://gitee.com/opengauss/openGauss-server/pulls/5676 | 不关联                                                  | 次要     |
| 回放 & debug 模式下，当从候选队列拿到的 buffer 又被写脏时，降低日志级别 | https://gitee.com/opengauss/openGauss-server/pulls/5073 | https://e.gitee.com/opengaussorg/dashboard?issue=I9E0B9 | 次要     |
| 【回合5.0.0】修复on update场景在sqlbypass下的问题            | https://gitee.com/opengauss/openGauss-server/pulls/5744 | https://e.gitee.com/opengaussorg/dashboard?issue=IA9N5L | 严重     |
| b兼容模式下，order by跟索引键无法走索引[zyzx]                | https://gitee.com/opengauss/openGauss-server/pulls/5666 | https://e.gitee.com/opengaussorg/dashboard?issue=IA7ET2 | 次要     |
| 兼容B库下null值的分区问题                                    | https://gitee.com/opengauss/openGauss-server/pulls/4887 | https://e.gitee.com/opengaussorg/dashboard?issue=I91XDR | 次要     |
| gs_probackup -j 16 在备机远程备份主机，线程无法退出，长时间打印keepalive message is received | https://gitee.com/opengauss/openGauss-server/pulls/5224 | https://e.gitee.com/opengaussorg/dashboard?issue=I95N4J | 次要     |
| show create table分区表结果有误                              | https://gitee.com/opengauss/openGauss-server/pulls/5792 | https://e.gitee.com/opengaussorg/dashboard?issue=I944DT | 次要     |

### jdbc驱动回合修复列表

| 标题                                                         | pr链接                                                       | issue链接                                               | 问题级别 |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------- | -------- |
| 解决boolean数组类型报错问题                                  | https://gitee.com/opengauss/openGauss-connector-jdbc/pulls/254 | https://e.gitee.com/opengaussorg/dashboard?issue=IA71X3 | 次要     |
| 对a、b库区分bit的返回类型                                    | https://gitee.com/opengauss/openGauss-connector-jdbc/pulls/252 | https://e.gitee.com/opengaussorg/dashboard?issue=I9O68X | 次要     |
| 处理字符集报错问题                                           | https://gitee.com/opengauss/openGauss-connector-jdbc/pulls/232 | https://e.gitee.com/opengaussorg/dashboard?issue=I9JKUC | 不重要   |
| 处理time类型丢失秒后的精度问题                               | https://gitee.com/opengauss/openGauss-connector-jdbc/pulls/226 | https://e.gitee.com/opengaussorg/dashboard?issue=I9L0FB | 次要     |
| 处理字符集测试用例报错问题                                   | https://gitee.com/opengauss/openGauss-connector-jdbc/pulls/230 | https://e.gitee.com/opengaussorg/dashboard?issue=I9JKUC | 不重要   |
| 处理jdbc拦截部分字符集问题                                   | https://gitee.com/opengauss/openGauss-connector-jdbc/pulls/224 | https://e.gitee.com/opengaussorg/dashboard?issue=I9JKUC | 不重要   |
| 去掉将boolean类型转为bit类型的逻辑                           | https://gitee.com/opengauss/openGauss-connector-jdbc/pulls/220 | https://e.gitee.com/opengaussorg/dashboard?issue=I9HVTA | 不重要   |
| 处理getString()获取cast(负数 as time)值与mysql不一致问题     | https://gitee.com/opengauss/openGauss-connector-jdbc/pulls/212 | https://e.gitee.com/opengaussorg/dashboard?issue=I99QVU | 不重要   |
| 处理binyint、bit、String、long、int、double、BigDecimal等类型转boolean失败问题 | https://gitee.com/opengauss/openGauss-connector-jdbc/pulls/210 | https://e.gitee.com/opengaussorg/dashboard?issue=I9DVKZ | 次要     |
| 处理timestampdiff函数处理带时区的数据报错问题                | https://gitee.com/opengauss/openGauss-connector-jdbc/pulls/257 | https://e.gitee.com/opengaussorg/dashboard?issue=IAACU0 | 未设置   |

### 遗留问题

| Issue                                                      | Issue描述                                                    | 问题级别 | 原因和影响分析                                               |
| ---------------------------------------------------------- | ------------------------------------------------------------ | -------- | ------------------------------------------------------------ |
| https://e.gitee.com/opengaussorg/issues/table?issue=IAF4NL | 【测试类型：SQL功能】【测试版本：5.0.3】substring函数指定入参为int类型上边界，执行报错 | 次要     | 该问题仅为边界条件问题，substring截取的长度超过int32范围计算溢出报错。 |
| https://e.gitee.com/opengaussorg/issues/table?issue=IAEZZF | 【测试类型：SQL功能】【测试版本：5.0.3】 dblink相关功能dblink_open、dblink_close如果指定连接名场景下，连接名错误不存在时，数据库core | 次要     | 在指定了不存在的连接名称时候，建立连接失败rconn为空，未做NULL判断取了rconn属性导致空指针core掉。指定名称存在连接成功则无问题。 |
| https://e.gitee.com/opengaussorg/issues/table?issue=I7YEVF | 【测试类型：SQL功能】【测试版本：5.1.0】【自动化】 问题描述：部分函数入参是point类型，预期结果发生变更 | 次要     | 该问题为函数入参是point类型兼容问题，原在5.1.0版本提出，主干未彻底修复。Point类型500版本没有转相关特性回合，针对不适配问题暂时不处理。 |



### 附录

5.0.3版本测试报告： https://gitee.com/opengauss/QA/tree/master/Test_Result/openGauss_5.0.3