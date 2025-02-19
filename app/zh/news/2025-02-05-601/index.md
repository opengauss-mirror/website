---
title: 'openGauss 6.0.1版本正式发布！'
date: '2025-02-05'
tags: ['theme']
author: 'openGauss'
category: 'news'
summary: 'openGauss 6.0.1 版本是openGauss 6.0.0 Release的补丁版本。基于6.0.0版本基础上，回合主干分支的部分DFX需求和缺陷，发布6.0.1补丁版本。'
---

## 版本介绍

openGauss 6.0.1 版本是openGauss 6.0.0 Release的补丁版本。在6.0.0版本基础上，回合主干分支的部分DFX需求和缺陷，发布6.0.1补丁版本。


## 需求范围

openGauss 6.0.1 补丁版本回合的需求列表：

|	描述	|	PR链接	|	ISSUE链接	|
| ----- | ----- | ----- |
|	延迟备机优化需求	|	https://gitee.com/opengauss/openGauss-server/pulls/6082	|	https://e.gitee.com/opengaussorg/dashboard?issue=IA7M2X<br/>https://gitee.com/opengauss/openGauss-server/issues/I9521L<br/>https://gitee.com/opengauss/openGauss-server/issues/I8FVVU	|
|	添加gs_lwlock_status视图	|	https://gitee.com/opengauss/openGauss-server/pulls/6220	|	https://e.gitee.com/opengaussorg/dashboard?issue=I9FH3U	|
|	#I9HZ82 备库日志回放能力增强，新增一种日志分发算法	|	https://gitee.com/opengauss/openGauss-server/pulls/5136	|	https://e.gitee.com/opengaussorg/dashboard?issue=I9HZ82	|


## 升级路径支持

| 基础版本             | 目标版本                     |
| -------------------- | --------------------------- |
| 3.0.*(不带CM + 带CM) | 6.0.1(不带CM + 带CM)         |
| 5.0.*(不带CM + 带CM) | 6.0.1(不带CM + 带CM)         |
| 6.0.0(不带CM + 带CM) | 6.0.1(不带CM + 带CM)         |
| 6.0.1(不带CM + 带CM) | master\|7.0.0(不带CM + 带CM) |

## CVE漏洞

当前补丁版本没有CVE披露漏洞。

## 缺陷回合列表

### 内核

|   描述  |   PR链接    |   ISSUE链接 |
| ----- | ----- | ----- | 
|	【回合6.0.0】处理issue：”开启M*协议兼容后，使用jdbc连接参数useOldAliasMetadataBehavior=false，查询语句查询结果别名与M*不一致	|	https://gitee.com/opengauss/openGauss-server/pulls/6597	|	https://e.gitee.com/opengaussorg/dashboard?issue=IBD5HI	|
|	【回合6.0.0】修复mysql协议下多命令结果错误问题	|	https://gitee.com/opengauss/openGauss-server/pulls/6598	|	https://e.gitee.com/opengaussorg/dashboard?issue=IATU9M	|
|	【回合6.0.0】修复大数据量下replace分配过多内存的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/6624	|	https://e.gitee.com/opengaussorg/dashboard?issue=IAZ7LL	|
|	修复sum（int）性能较差的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/6662<br/>https://gitee.com/opengauss/openGauss-server/pulls/6672		|	https://gitee.com/opengauss/Plugin/issues/IB3U11	|
|	【回合6.0.0】回合https://gitee.com/opengauss/openGauss-server/pulls/6505 到6.0.0	|	https://gitee.com/opengauss/openGauss-server/pulls/6666	|	https://gitee.com/opengauss/Plugin/issues/IAVXKM	|
|	【回合6.0.0】同步函数pg_terminate_active_session_socket	|	https://gitee.com/opengauss/openGauss-server/pulls/6680	|	https://e.gitee.com/opengaussorg/dashboard?issue=IATG0R	|
|	【mysql兼容性】解决group_concat下标计算为负数的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/6701	|	https://e.gitee.com/opengaussorg/dashboard?issue=IB5ENT	|
|	【回合6.0.0】修复Qual子句下查询计划记录问题	|	https://gitee.com/opengauss/openGauss-server/pulls/6704	|	https://e.gitee.com/opengaussorg/dashboard?issue=IB4ETM	|
|	修复 6.0.0 中几处代码问题	|	https://gitee.com/opengauss/openGauss-server/pulls/6649	|	https://e.gitee.com/opengaussorg/dashboard?issue=IB3O0M	|
|	解决《创表之后，gs_dump导出的时候上报告警，提示WARNING:archive items not in correct section order cursection》问题	|	https://gitee.com/opengauss/openGauss-server/pulls/6052	|	https://e.gitee.com/opengaussorg/dashboard?issue=IA87WO	|
|	gs_dump在导入备份数据，如果触发器对应的表不存在，删除触发器的时候会报错【YJ】	|	https://gitee.com/opengauss/openGauss-server/pulls/6780	|	https://e.gitee.com/opengaussorg/dashboard?issue=IB7LHQ	|
|	【回合6.0.0】gs_dump添加可选参数--force-clean	|	https://gitee.com/opengauss/openGauss-server/pulls/6773	|	https://e.gitee.com/opengaussorg/dashboard?issue=IB7LSW	|
|	当表有唯一性约束时，导致的表信息再导入的时候会报错【YJ】	|	https://gitee.com/opengauss/openGauss-server/pulls/6777	|	https://e.gitee.com/opengaussorg/dashboard?issue=IB7LKX	|
|	修复gs_dump 带-c -t时导出导入表后触发器丢失的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/6782	|	https://e.gitee.com/opengaussorg/dashboard?issue=IAW8G8	|
|	【回合】修复部分极端情况下可能存在后台线程退出失败的问题 	|	https://gitee.com/opengauss/openGauss-server/pulls/6802	|	https://e.gitee.com/opengaussorg/dashboard?issue=IB7W0G	|
|	【回合6.0.0】修复select count(*) from (select * from table_name union all select * from table_name) where now() is not null;导致数据库core的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/6833	|	https://e.gitee.com/opengaussorg/dashboard?issue=IBBACH	|
|	fix recoveryid no consistence for failover many times when enble reatime-build	|	https://gitee.com/opengauss/openGauss-server/pulls/6860	|	https://e.gitee.com/opengaussorg/dashboard?issue=IBA6U6	|
|	【回合6.0.0】修复mysql_fdw连接为空导致宕机异常	|	https://gitee.com/opengauss/openGauss-server/pulls/6884	|	https://e.gitee.com/opengaussorg/dashboard?issue=IB6RLT	|
|	增加3个wal统计函数的rows估算行数属性	|	https://gitee.com/opengauss/openGauss-server/pulls/6894	|	https://e.gitee.com/opengaussorg/dashboard?issue=IBD6NJ	|
|	统一ustore reset_val默认值	|	https://gitee.com/opengauss/openGauss-server/pulls/6887	|	https://e.gitee.com/opengaussorg/dashboard?issue=IBCLLO	|
|	Assert中判断条件语句修复	|	https://gitee.com/opengauss/openGauss-server/pulls/6895	|	https://e.gitee.com/opengaussorg/issues/list?issue=IAX9A9	|
|	【回合】未开启闪回功能时，关闭闪回后台快照抓取线程	|	https://gitee.com/opengauss/openGauss-server/pulls/6897	|	https://e.gitee.com/opengaussorg/dashboard?issue=IBBPW4	|
|	修复部分元数据升级不一致问题	|	https://gitee.com/opengauss/openGauss-server/pulls/6905	|	https://e.gitee.com/opengaussorg/issues/table?issue=IBD6WT	|
|	补充pg_buffercaches_page()函数的升级脚本	|	https://gitee.com/opengauss/openGauss-server/pulls/6907	|	https://e.gitee.com/opengaussorg/dashboard?issue=IBD6JW	|
|	修复5.0.3升级7.0.0RC1，元数据不一致问题	|	https://gitee.com/opengauss/openGauss-server/pulls/6910	|	https://e.gitee.com/opengaussorg/dashboard?issue=IBD4KV	|
|	【代码回合#4633】由于CPU乱序可能会发生较小的xid(xid<page base_id)插入到page中的情况，使此时page base_xid做负数shift	|	https://gitee.com/opengauss/openGauss-server/pulls/6921	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8H74U	|
|	元数据不一致修复	|	https://gitee.com/opengauss/openGauss-server/pulls/6916	|	https://e.gitee.com/opengaussorg/dashboard?issue=IBD4GL	|
|	【6.0.0】修复to_binary_float升级问题	|	https://gitee.com/opengauss/openGauss-server/pulls/6890	|	https://e.gitee.com/opengaussorg/dashboard?issue=IBD6VW	|
|	 处理issue：【升级】5.0.3升级7.0.0RC1，元数据不一致问题（一）	|	https://gitee.com/opengauss/openGauss-server/pulls/6898	|	https://gitee.com/opengauss/openGauss-server/issues/IBD4F8	|
|	修复升级元数据问题	|	https://gitee.com/opengauss/openGauss-server/pulls/6904	|	https://e.gitee.com/opengaussorg/dashboard?issue=IBD5HI	|
|	修复存储过程使用set_variables传参报different character set data is not allowed错误	|	https://gitee.com/opengauss/openGauss-server/pulls/6956	|	https://e.gitee.com/opengaussorg/dashboard?issue=IBEVKM	|
|	【同步6.0.0】修复存储过程关闭重编译的core问题	|	https://gitee.com/opengauss/openGauss-server/pulls/6952	|	https://e.gitee.com/opengaussorg/dashboard?issue=IBECUE	|
|	修复hash index回放问题	|	https://gitee.com/opengauss/openGauss-server/pulls/6929	|	https://gitee.com/opengauss/openGauss-server/issues/IBDGNW?from=project-issue	|
|	【测试类型：SQL功能】【测试版本：7.0.0-Rc1】【升级】5.0.3升级7.0.0RC1，元数据不一致问题（十四）	|	https://gitee.com/opengauss/openGauss-server/pulls/6885	|	https://e.gitee.com/opengaussorg/projects/676554/tasks/list?issue=IBD6RR	|
|	修复5.0.x升级到6.0.1失败的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/6989	|	https://e.gitee.com/opengaussorg/dashboard?issue=IBGHZ3	|
|	【回合6.0.0】fix spaces expansion of uheap	|	https://gitee.com/opengauss/openGauss-server/pulls/7009	|	https://e.gitee.com/opengaussorg/issues/table?issue=IBAWJ3	|
|	fix bug that recoveryInstId update when recovery and checkpoint done	|	https://gitee.com/opengauss/openGauss-server/pulls/7007	|	https://e.gitee.com/opengaussorg/dashboard?issue=IBGN3E	|
|	处理issue: 【升级】3.0.5升级至6.0.1后，gs_upgradechk工具执行报错	|	https://gitee.com/opengauss/openGauss-server/pulls/7028	|	https://gitee.com/opengauss/openGauss-server/issues/IBGNDF	|
|	修复5.0.3升级至6.0.1元数据不一致问题	|	https://gitee.com/opengauss/openGauss-server/pulls/7026	|	https://e.gitee.com/opengaussorg/dashboard?issue=IBG867	|
|	recovery_min_apply_delay修改后无需重启才能生效为新设置值【M】	|	https://gitee.com/opengauss/openGauss-server/pulls/7038	|	https://e.gitee.com/opengaussorg/dashboard?issue=IB4BQV	|
|	修复2p主备性能劣化问题	|	https://gitee.com/opengauss/openGauss-server/pulls/7044	|	https://gitee.com/opengauss/openGauss-server/issues/IAWLMP	|
|	【回合】修复带子事务的存储过程的执行计划core掉	|	https://gitee.com/opengauss/openGauss-server/pulls/7049	|	https://e.gitee.com/opengaussorg/dashboard?issue=IBI3XD	|
|	修复5.0.3升级至6.0.1元数据不一致问题	|	https://gitee.com/opengauss/openGauss-server/pulls/7026	|	https://e.gitee.com/opengaussorg/dashboard?issue=IBD7IQ	|

### 插件
|   描述  |   PR链接    |   ISSUE链接 |
| ----- | ----- | ----- | 
|	【回合6.0.0】适配mysql协议查询transaction_isolation	|	https://gitee.com/opengauss/Plugin/pulls/1866	|	https://e.gitee.com/opengaussorg/dashboard?issue=IATZ4E	|
|	【回合6.0.0】修复mysql协议下多命令结果错误问题	|	https://gitee.com/opengauss/Plugin/pulls/1867	|	https://e.gitee.com/opengaussorg/dashboard?issue=IATU9M	|
|	【回合6.0.0】处理issue：开启M*协议兼容后，使用jdbc连接参数tinyInt1isBit=true/transformedBitIsBoolean=true，查询语句查询结果返回结果集与M*不一致	|	https://gitee.com/opengauss/Plugin/pulls/1868	|	https://e.gitee.com/opengaussorg/issues/list?issue=IATYZY	|
|	【回合6.0.0】处理issue：开启M*协议兼容后，使用jdbc连接参数useOldAliasMetadataBehavior=false，查询语句查询结果别名与M*不一致	|	https://gitee.com/opengauss/Plugin/pulls/1870	|	https://e.gitee.com/opengaussorg/issues/list?issue=IATYXE	|
|	修复sum(int)性能较差的问题	|	https://gitee.com/opengauss/Plugin/pulls/1883	|	https://gitee.com/opengauss/Plugin/issues/IB3U11	|
|	Mysql中\"被转义成“, 但是openguass却报错【YJ】	|	https://gitee.com/opengauss/Plugin/pulls/1884	|	https://e.gitee.com/opengaussorg/dashboard?issue=IAVXKM	|
|	升级dolphin到4.1版本，修复sum性能较差的问题	|	https://gitee.com/opengauss/Plugin/pulls/1885	|	https://e.gitee.com/opengaussorg/dashboard?issue=IB3U11	|
|	修复stamp(3)类型占位符传参进行范围查询数据为空，实际有数据的问题.	|	https://gitee.com/opengauss/Plugin/pulls/1909	|	https://e.gitee.com/opengaussorg/dashboard?issue=IB7T6K	|
|	当表有唯一性约束时，导致的表信息再导入的时候会报错【YJ】	|	https://gitee.com/opengauss/Plugin/pulls/1914	|	https://e.gitee.com/opengaussorg/dashboard?issue=IB7LKX	|
|	【测试类型：SQL功能】【测试版本：7.0.0-RC1】 B模式下，blob类型和json类型的不兼容问题	|	https://gitee.com/opengauss/Plugin/pulls/1939	|	https://e.gitee.com/opengaussorg/dashboard?issue=IBCJHH	|
|	【同步6.0.0】修复存储过程关闭重编译的core问题	|	https://gitee.com/opengauss/Plugin/pulls/1947	|	https://e.gitee.com/opengaussorg/dashboard?issue=IBECUE	|
|	修复存储过程使用set_variables传参报different character set data is not allowed错误	|	https://gitee.com/opengauss/Plugin/pulls/1948	|	https://e.gitee.com/opengaussorg/dashboard?issue=IBEVKM	|
|	【回合6.0.0】修复interval运算结果精度丢失的问题	|	https://gitee.com/opengauss/Plugin/pulls/1964	|	https://e.gitee.com/opengaussorg/dashboard?issue=IATX32	|
|	【回合6.0.0】修复interval运算带引号导致结果错误的问题	|	https://gitee.com/opengauss/Plugin/pulls/1965	|	https://e.gitee.com/opengaussorg/dashboard?issue=IAU4ZR	|

### 驱动
|   描述  |   PR链接    |   ISSUE链接 |
| ----- | ----- | ----- | 
|	【6.0.0】处理6.0版本bit_output参数不兼容5.0及之前版本问题	|	https://gitee.com/opengauss/openGauss-connector-jdbc/pulls/315	|	https://e.gitee.com/opengaussorg/dashboard?issue=IAZAUI	|
|	318 支持autoReconnect 参数在断开后自动重连	|	https://gitee.com/opengauss/openGauss-connector-jdbc/pulls/319	|	https://e.gitee.com/opengaussorg/dashboard?issue=IB2NJC	|
|	【回合6.0】修复逻辑复制报错问题	|	https://gitee.com/opengauss/openGauss-connector-jdbc/pulls/323	|	https://e.gitee.com/opengaussorg/dashboard?issue=IB9EFE	|
|	【回合6.0】处理查询numeric类型NaN值报错问题	|	https://gitee.com/opengauss/openGauss-connector-jdbc/pulls/324	|	https://e.gitee.com/opengaussorg/dashboard?issue=IAZL4P	|
|	【回合6.0.0】ODBC支持了多Host功能和单个Host多Port功能，配合libpq支持功能	|	https://gitee.com/opengauss/openGauss-connector-odbc/pulls/58	|	https://e.gitee.com/opengaussorg/dashboard?issue=I9PTKB	|
|	【回合6.0.0】支持设定连接的主机类型	|	https://gitee.com/opengauss/openGauss-connector-odbc/pulls/60	|	https://e.gitee.com/opengaussorg/dashboard?issue=I9QOUM	|
|	【回合6.0.0】处理主备模式下设置的sslmode参数未生效问题	|	https://gitee.com/opengauss/openGauss-connector-odbc/pulls/62	|	https://e.gitee.com/opengaussorg/dashboard?issue=I9T4EC	|
|	Cherry-pick !21: fix:support for python 3.11 	|	https://gitee.com/opengauss/openGauss-connector-python-psycopg2/pulls/32	|	https://e.gitee.com/opengaussorg/dashboard?issue=IAR25T	|
|	【回合6.0】建立连接过程中加锁程序exit之后释放锁	|	https://gitee.com/opengauss/openGauss-connector-python-psycopg2/pulls/39	|	https://e.gitee.com/opengaussorg/dashboard?issue=IB327C	|
|	【回合6.0】修复驱动在使用eventlet的sqlalchemy引擎连接数据库时报错问题	|	https://gitee.com/opengauss/openGauss-connector-python-psycopg2/pulls/40	|	https://e.gitee.com/opengaussorg/dashboard?issue=IB9MEU	|

### 工具
|   描述  |   PR链接    |   ISSUE链接 |
| ----- | ----- | ----- | 
|	【回合6.0.0】传统主备启动单节点超时	|	https://gitee.com/opengauss/CM/pulls/275	|	https://e.gitee.com/opengaussorg/dashboard?issue=IAZK5X	|
|	优化CheckRXTX中变量名引用	|	https://gitee.com/opengauss/openGauss-OM/pulls/963	|	https://e.gitee.com/opengaussorg/dashboard?issue=IB53OU	|
|	适配基于debian系列的系统，使用openEuler镜像安装数据库	|	https://gitee.com/opengauss/openGauss-OM/pulls/980	|	https://e.gitee.com/opengaussorg/dashboard?issue=IBDFU2	|
|	【测试类型：工具功能】【测试版本：7.0.0-RC1】日构建版本预安装阶段报错/tmp/gauss_xxx临时文件不存在	|	https://gitee.com/opengauss/openGauss-OM/pulls/990	|	https://e.gitee.com/opengaussorg/dashboard?issue=IB6WB1	|
|	gs_checkperf无法创建输出文件夹	|	https://gitee.com/opengauss/openGauss-OM/pulls/990	|	https://e.gitee.com/opengaussorg/dashboard?issue=IB1NMX	|
|	【测试类型：工具功能】【测试版本：7.0.0】【自动化】 om安装数据库预安装报错	|	https://gitee.com/opengauss/openGauss-OM/pulls/990	|	https://e.gitee.com/opengaussorg/dashboard?issue=IB2NY5	|
|	当/etc/hosts存在冗余项时, cm_ctl query 可以成功执行, gs_om -t query 可能会失败	|	https://gitee.com/opengauss/openGauss-OM/pulls/990	|	https://e.gitee.com/opengaussorg/dashboard?issue=IATKRM	|
|	【测试类型：工具功能】【测试版本：7.0.0】 同一服务器上不同用户同时安装报错	|	https://gitee.com/opengauss/openGauss-OM/pulls/990	|	https://e.gitee.com/opengaussorg/dashboard?issue=IAZOV2	|
|	【测试类型：社区CI】【测试版本：6.0.0】gs_dropnode  掉备机    查询synchronous_standby_names  预期是ANY 1(dn_6003)   但现在实际查询是空	|	https://gitee.com/opengauss/openGauss-OM/pulls/990	|	https://e.gitee.com/opengaussorg/dashboard?issue=IAZTHA	|
|	【测试类型：工具功能】【测试版本：7.0.0】gs_checkperf检查SSD盘报错	|	https://gitee.com/opengauss/openGauss-OM/pulls/990	|	https://e.gitee.com/opengaussorg/dashboard?issue=IASAHY	|
|	【测试类型：功能测试】【测试版本：7.0.0】【自动化】扩容时存在xml文件，先与-h指定的ip地址进行校验通过后在创建互信	|	https://gitee.com/opengauss/openGauss-OM/pulls/990	|	https://e.gitee.com/opengaussorg/dashboard?issue=IATC2X	|
|	【测试类型：工具功能】【测试版本：7.0.0-RC1】【ci】gs_dropnode使用-h指定多个节点进行缩容，执行报错	|	https://gitee.com/opengauss/openGauss-OM/pulls/990	|	https://e.gitee.com/opengaussorg/dashboard?issue=IB8ASK	|
|	【回合master】修复ad vg导致clean的问题	|	https://gitee.com/opengauss/CM/pulls/307	|	https://e.gitee.com/opengaussorg/issues/table?issue=IB77UJ	|
|	【回合】限制3.0版本上面带有压缩表升级到新版本	|	https://gitee.com/opengauss/openGauss-OM/pulls/996	|	https://e.gitee.com/opengaussorg/dashboard?issue=IB1MSJ	|
|	修复带CM集群3.0.6到6.0.0指定节点升级提交/回滚core问题	|	https://gitee.com/opengauss/openGauss-OM/pulls/1001	|	https://e.gitee.com/opengaussorg/dashboard?issue=IBGHM7	|
|	【6.0.1补丁版本】适配BCLinux使用openeuler镜像包安装	|	https://gitee.com/opengauss/openGauss-OM/pulls/1005	|	https://e.gitee.com/opengaussorg/issues/table?issue=IAGUMO	|
