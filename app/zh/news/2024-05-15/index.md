---
title: 'openGauss 5.0.2版本正式发布！'
date: '2024-05-15'
tags: ['theme']
author: 'openGauss'
category: 'news'
summary: 'openGauss 5.0.2 Update 版本是 openGauss 5.0.0 Release 的第二个补丁版本。基于 5.0.0 版本基础上，回合主干分支的部分需求和缺陷，发布 5.0.2 补丁版本。'
---

## 版本背景

openGauss 5.0.2 Update 版本是 openGauss 5.0.0 Release 的第二个补丁版本。基于 5.0.0 版本基础上，回合主干分支的部分需求和缺陷，发布 5.0.2 补丁版本。

## 需求范围

openGauss 5.0.2 补丁版本回合的需求列表如下，主要针对兼容性特性补充回合：

|	序号	|	需求描述	|	回合PR	|
|	-----	|	-----	|	-----	|
|	1	|	PinBuffer Cas优化	|	https://gitee.com/opengauss/openGauss-server/pulls/4387	|
|	2	|	probackup 性能优化	|	https://gitee.com/opengauss/openGauss-server/pulls/4825	|
|	3	|	B兼容性下字段模糊匹配支持走索引扫描	|	https://gitee.com/opengauss/openGauss-server/pulls/5114	|
|	4	|	关键字降级	|	https://gitee.com/opengauss/openGauss-server/pulls/5109	|
|	5	|	兼容M* select语句支持ignore index	|	https://gitee.com/opengauss/openGauss-server/pulls/5111	|
|	6	|	@变量递归调用	|	https://gitee.com/opengauss/openGauss-server/pulls/5111	|
|	7	|	m* 兼容，视图支持sql security 语法	|	https://gitee.com/opengauss/openGauss-server/pulls/5111	|
|	8	|	兼容MySQL多字符集	|	https://gitee.com/opengauss/openGauss-server/pulls/5107	|
|	9	|	兼容GRANT USAGE ON *.*语法	|	https://gitee.com/opengauss/Plugin/pulls/1511	|
|	10	|	ATAN函数支持atan(y, x)语法	|	https://gitee.com/opengauss/Plugin/pulls/1511	|
|	11	|	AND两侧支持timestamp数据类型	|	https://gitee.com/opengauss/Plugin/pulls/1511	|
|	12	|	m* 兼容，视图支持sql security 语法	|	https://gitee.com/opengauss/Plugin/pulls/1511	|
|	13	|	支持单引号用作列的别名	|	https://gitee.com/opengauss/Plugin/pulls/1504	|
|	14	|	导入导出、备份恢复工具支持MySQL兼容性	|	以bugfix解决	|
|	15	|	支持Plugin enum类型字符序场景	|	https://gitee.com/opengauss/openGauss-server/pulls/3985	|
|	16	|	支持在不带as，不带反引号情况下，关键字作为表别名与列别名	|	https://gitee.com/opengauss/Plugin/pulls/1538	|
|	17	|	MySQL兼容性-rand/random_bytes函数、ASCII/BINARY列属性、16进制输入	|	https://gitee.com/opengauss/Plugin/pulls/1538	|

## CVE漏洞

当前补丁版本没有CVE披露漏洞。

## 回合缺陷

### 内核回合缺陷列表

|	标题	|	链接	|	关联issue	|	问题级别	|
|	------	|	------	|	------	|	------	|
|	解决create/drop分区表时，耗时与分区数量不成正比的问题。	|	https://gitee.com/opengauss/openGauss-server/pulls/4423	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8EVYQ	|	未指定	|
|	【同步】修复最大可用模式某些场景不生效的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4514	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8AD19	|	次要	|
|	修复设置catchup2normal_wait_time后性能下降的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4516	|	https://e.gitee.com/opengaussorg/dashboard?issue=I82STY	|	未指定	|
|	修复从轻量版从3.1.0升级到5.1.0执行sql失败的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4389	|	https://e.gitee.com/opengaussorg/dashboard?issue=I84A4S	|	次要	|
|	【同步代码】段页式不支持备机读	|	https://gitee.com/opengauss/openGauss-server/pulls/4595	|	https://e.gitee.com/opengaussorg/dashboard?issue=I82ULX	|	未指定	|
|	修复非pg_catalog模式的表的表名与pg_catalog中已有表表名相同时，gs_dump导入导出有问题的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4602	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8NG0R	|	未指定	|
|	修复lsc退出时，未考虑空指针场景的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4605	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8NR8P	|	次要	|
|	[bugfix] forkname_to_number处理非法columnAttrId	|	https://gitee.com/opengauss/openGauss-server/pulls/4350	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8B47R	|	未指定	|
|	修复init阶段创建序列问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4631	|	未关联	|	未指定	|
|	修复《创建带point类型表，使用point列创建spgist索引，插入超过10w条记录时失败。》问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4628	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8OFSX	|	未指定	|
|	处理缺陷：故障注入服务器重启后openGauss启动异常	|	https://gitee.com/opengauss/openGauss-server/pulls/4659	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8Q1FZ	|	未指定	|
|	调整编译脚本，-pkg编译失败不会继续打包	|	https://gitee.com/opengauss/openGauss-server/pulls/4667	|	未关联	|	未指定	|
|	修复inner unique + 开启query_dop下宕机问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4378	|	未关联	|	未指定	|
|	修复effective_io_concurrency取值大于1时分区表全局索引BitmapHeapscan报错的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4336	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8A8DK	|	次要	|
|	处理缺陷：故障注入服务器重启后openGauss启动异常	|	https://gitee.com/opengauss/openGauss-server/pulls/4680	|	https://gitee.com/opengauss/openGauss-server/pulls/4680	|	未指定	|
|	处理autonomous_session 内存泄露问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4674	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8PNTP	|	未指定	|
|	【bugfixed】解决gs_dump对表进行备份，导入恢复时报错的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4666	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8M1HO	|	次要	|
|	存储过程中存在select into语句时，为单列时，创建失败	|	https://gitee.com/opengauss/openGauss-server/pulls/4435	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8GN47	|	未指定	|
|	修复执行plan hint后报错降级warning的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4713	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8TABG	|	次要	|
|	修复xloginsert_locks设置为非numa节点倍数时数据库启动core	|	https://gitee.com/opengauss/openGauss-server/pulls/4682	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8NTNE	|	未指定	|
|	函数docker_process_sql中登录数据库增加GS_PORT判断	|	https://gitee.com/opengauss/openGauss-server/pulls/4242	|	https://e.gitee.com/opengaussorg/dashboard?issue=I85X19	|	未指定	|
|	解决《gsql执行命令报错和pg9.2.4，通过echo $?捕获的命令状态不一致》问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4696	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8SVA6	|	未指定	|
|	修复 备机回放数据库文件夹创建失败 问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4508	|	未关联	|	未指定	|
|	处理issue: 存储过程调用default值传给了其他入参	|	https://gitee.com/opengauss/openGauss-server/pulls/4752	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8WC0R	|	次要	|
|	修复postgres_fdw在线程池模式下core	|	https://gitee.com/opengauss/openGauss-server/pulls/4763	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8XGOC	|	未指定	|
|	issue修改：修改gsql命令行执行命令时，部分暂存区的语句被清空没有上传至statement_history中的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4798	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8URAR	|	次要	|
|	轻量版和容器内升级，启动超时时间设置为10min	|	https://gitee.com/opengauss/openGauss-server/pulls/4790	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8YWMQ	|	未指定	|
|	修复I8XXN6所示的数据类型varchar在in（array[]）时不走动态分区裁剪的问题。	|	https://gitee.com/opengauss/openGauss-server/pulls/4816	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8XXN6	|	未指定	|
|	禁用collected_info_hashtbl、explain_info_hashtbl	|	https://gitee.com/opengauss/openGauss-server/pulls/4821	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8XITB	|	未指定	|
|	修复发布订阅场景下订阅端的物化视图刷新不出新数据的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4852	|	https://e.gitee.com/opengaussorg/dashboard?issue=I904J1	|	次要	|
|	恢复参数-C 和-t一起使用时无法恢复新库	|	https://gitee.com/opengauss/openGauss-server/pulls/4886	|	https://e.gitee.com/opengaussorg/dashboard?issue=I92BC3	|	未指定	|
|	修改多事务日志回放时强制等待之前日志回放完成	|	https://gitee.com/opengauss/openGauss-server/pulls/4664	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8HANI	|	主要	|
|	解决interval分区表并发插入时自增重复范围分区的问题。（在消费无效消息后，本地缓存中relation的信息不是最新）	|	https://gitee.com/opengauss/openGauss-server/pulls/4736	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8SS5J	|	次要	|
|	添加分区表操作提示信息[xy]	|	https://gitee.com/opengauss/openGauss-server/pulls/5070	|	https://e.gitee.com/opengaussorg/dashboard?issue=I9C0LY	|	未指定	|
|	autovacuum触发比较频繁的情况下，toast表数据无法清理，数据表空间一直涨【M】	|	https://gitee.com/opengauss/openGauss-server/pulls/4559	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8E7EG	|	未指定	|
|	打包增加ecpg	|	https://gitee.com/opengauss/openGauss-server/pulls/4969	|	https://e.gitee.com/opengaussorg/dashboard?issue=I92YYZ	|	次要	|
|	修改most_available_sync reload立即生效的实现方式【代码同步】	|	https://gitee.com/opengauss/openGauss-server/pulls/4690	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8R39Q	|	次要	|
|	【回合】修复mot下drop database失败的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/5144	|	https://e.gitee.com/opengaussorg/dashboard?issue=I6VTBI	|	次要	|




### 兼容性回合缺陷列表

|	标题	|	链接	|	关联ISSUE	|	级别	|
|	----------	|	----------	|	----------	|	----------	|
|	5.0.2补丁版本插件升级至1.3	|	https://gitee.com/opengauss/Plugin/pulls/1508	|	https://e.gitee.com/opengaussorg/dashboard?issue=I9FMKZ	|	未指定	|
|	B模式下添加字段后执行SQL或查看执行计划操作导致数据库重启[zyzx]	|	https://gitee.com/opengauss/Plugin/pulls/1490	|	https://e.gitee.com/opengaussorg/dashboard?issue=I9C345	|	次要	|
|	openGauss5.0.0 memcheck版本 异常崩溃	|	https://gitee.com/opengauss/Plugin/pulls/1471	|	https://e.gitee.com/opengaussorg/dashboard?issue=I96QR7	|	次要	|
|	【5.0.2代码回合】修复group_concat和字符序like问题	|	https://gitee.com/opengauss/openGauss-server/pulls/5076	|	https://e.gitee.com/opengaussorg/dashboard?issue=I9DJZ5	|	次要	|
|	修复MySQL风格存储过程/自定义函数使用gs_dump导出后，使用gs_restore导入失败的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/3307	|	https://e.gitee.com/opengaussorg/dashboard?issue=I6S0LB	|	主要	|
|	issue修复：COMMENT ON对存储过程注释后，gs_dump导出内容导入失败问题修复	|	https://gitee.com/opengauss/openGauss-server/pulls/3292	|	https://e.gitee.com/opengaussorg/dashboard?issue=I6QWI9	|	未指定	|
|	兼容MySQL在指定模式下创建、删除触发器	|	https://gitee.com/opengauss/openGauss-server/pulls/3253	|	https://e.gitee.com/opengaussorg/dashboard?issue=I6D6VC	|	未指定	|
|	修复兼容b库下，number类型导出前和导入后类型不一样导致数据不一致的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/3386	|	https://e.gitee.com/opengaussorg/dashboard?issue=I6VSZ2	|	次要	|
|	修复列名使用反引号含空格，gs_dump导出报错的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/3427	|	https://e.gitee.com/opengaussorg/dashboard?issue=I6WOW7	|	次要	|
|	实现\d和\d+展示表的字符集信息	|	https://gitee.com/opengauss/openGauss-server/pulls/3421	|	https://e.gitee.com/opengaussorg/dashboard?issue=I71GH9	|	未指定	|
|	修复通过drop if exists删除不存在的指定模式下的触发器报错的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/3464	|	https://e.gitee.com/opengaussorg/dashboard?issue=I76NF2	|	次要	|
|	定时任务兼容M*时间单位	|	https://gitee.com/opengauss/openGauss-server/pulls/3477	|	https://e.gitee.com/opengaussorg/dashboard?issue=I77SFV	|	未指定	|
|	支持dolohin插件定制date_out	|	https://gitee.com/opengauss/openGauss-server/pulls/3561	|	未关联	|	未指定	|
|	修复导入时插入日期全零失败的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/3568	|	未关联	|	未指定	|
|	修复自定义变量赋值的heLp 问题	|	https://gitee.com/opengauss/openGauss-server/pulls/3543	|	https://e.gitee.com/opengaussorg/dashboard?issue=I6PN4N	|	次要	|
|	修复分区键使用mysql字符序时的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/3660	|	https://e.gitee.com/opengaussorg/dashboard?issue=I7I7LK	|	未指定	|
|	[SQL] 多字符集问题修改	|	https://gitee.com/opengauss/openGauss-server/pulls/3667	|	https://e.gitee.com/opengaussorg/dashboard?issue=I7JB6R	|	次要	|
|	set return_number to correct number	|	https://gitee.com/opengauss/openGauss-server/pulls/3725	|	https://e.gitee.com/opengaussorg/dashboard?issue=I7J61X	|	次要	|
|	修复潜在的拷贝NODE 错误	|	https://gitee.com/opengauss/openGauss-server/pulls/3435	|	未关联	|	未指定	|
|	解决datcompatibility='B' 创建分区表，使用gs_dump导出报错	|	https://gitee.com/opengauss/openGauss-server/pulls/3769	|	https://e.gitee.com/opengaussorg/dashboard?issue=I7IW4X	|	不重要	|
|	为其他类型转化为interval添加typmod入参	|	https://gitee.com/opengauss/openGauss-server/pulls/3787	|	https://e.gitee.com/opengaussorg/dashboard?issue=I7L155	|	不重要	|
|	修复select @@GUC参数时，bool类型返回值错误的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/3893	|	https://e.gitee.com/opengaussorg/dashboard?issue=I7PL63	|	不重要	|
|	【I7PJP7】修复隐式转换丢失字符序的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/3904	|	https://e.gitee.com/opengaussorg/dashboard?issue=I7PJP7	|	次要	|
|	【I7PTWT】修复多字符集场景pbe结果集与直接执行不同的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/3973	|	https://e.gitee.com/opengaussorg/dashboard?issue=I7PTWT	|	严重	|
|	修复一处插件并发加载插件问题	|	https://gitee.com/opengauss/openGauss-server/pulls/3914	|	https://e.gitee.com/opengaussorg/dashboard?issue=I7RDH7	|	未指定	|
|	修复interval在存储过程中赋值错误的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4024	|	https://e.gitee.com/opengaussorg/dashboard?issue=I7VCZI	|	次要	|
|	修复：B模式CREATE AS语句 开启审计日志报错的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/3951	|	https://e.gitee.com/opengaussorg/dashboard?issue=I7PIAI	|	未指定	|
|	修复on update + trigger场景下的core问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4141	|	https://e.gitee.com/opengaussorg/dashboard?issue=I810S5	|	次要	|
|	job进程需要加载dolphin插件	|	https://gitee.com/opengauss/openGauss-server/pulls/4172	|	未关联	|	未指定	|
|	修复prepare自定义变量时的core问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4201	|	https://e.gitee.com/opengaussorg/dashboard?issue=I83SYR	|	未指定	|
|	修复多表更新时的core问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4199	|	https://e.gitee.com/opengaussorg/dashboard?issue=I83S8E	|	未指定	|
|	【bugfixed】解决 insert select 宕机问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4249	|	https://e.gitee.com/opengaussorg/dashboard?issue=I864MZ	|	未指定	|
|	修复B兼容性数据库逻辑解码结果错误的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4250	|	https://e.gitee.com/opengaussorg/dashboard?issue=I869P7	|	未指定	|
|	Rename支持修改表的schema	|	https://gitee.com/opengauss/openGauss-server/pulls/4136	|	https://e.gitee.com/opengaussorg/dashboard?issue=I6KIBM	|	未指定	|
|	修复mysql兼容模式下，大小写敏感时，\d+ 大写表名报表名不存在的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4248	|	未关联	|	未指定	|
|	修复issue I86YJY 所示的gs_dump与dolphin.sql_mode配置冲突的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4281	|	https://e.gitee.com/opengaussorg/dashboard?issue=I86YJY	|	未指定	|
|	exit handler sqlexception场景的core问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4216	|	https://e.gitee.com/opengaussorg/dashboard?issue=I84F41	|	次要	|
|	修复create trigger存在潜在内存越界问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4333	|	https://e.gitee.com/opengaussorg/dashboard?issue=I89STU	|	未指定	|
|	set 类型支持copy为空	|	https://gitee.com/opengauss/openGauss-server/pulls/4341	|	https://e.gitee.com/opengaussorg/dashboard?issue=I89AMO	|	次要	|
|	修复dayofxx、date('xx'), timestamp('')等场景下异常的问题。	|	https://gitee.com/opengauss/openGauss-server/pulls/4370	|	https://e.gitee.com/opengaussorg/dashboard?issue=I898UO	|	次要	|
|	修复initdb为B库的core问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4399	|	未关联	|	未指定	|
|	【MYSQL兼容性】修复自增列多条INSERT INTO ON DUPLICATE KEY UPDATE结果问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4383	|	https://e.gitee.com/opengaussorg/dashboard?issue=I88WP9	|	未指定	|
|	修复alter table convert to问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4401	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8EK76	|	未指定	|
|	insert导致宕机缺陷修复	|	https://gitee.com/opengauss/openGauss-server/pulls/4439	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8I5NS	|	次要	|
|	修复分区建支持表达式的core问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4490	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8GQHY	|	次要	|
|	解决alter table first/after的core问题和group_concat在非B模式下saparator为空导致的core	|	https://gitee.com/opengauss/openGauss-server/pulls/4497	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8GPYZ	|	次要	|
|	修复《gs_dump导出库的时候，创表携带using语句中出现乱码。》问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4537	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8KN8M	|	未指定	|
|	增加GetTypeZeroValue hook点	|	https://gitee.com/opengauss/openGauss-server/pulls/4558	|	未关联	|	未指定	|
|	修复插件对于internal类型函数没有走插件的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4567	|	未关联	|	未指定	|
|	【M兼容】修复DELETE目标表不是普通表时产生的core问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4588	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8MBED	|	主要	|
|	增加deparse_query hook	|	https://gitee.com/opengauss/openGauss-server/pulls/4578	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8L5ZO	|	未指定	|
|	把tid作为支持列名的约束范围缩小到仅限于列存	|	https://gitee.com/opengauss/openGauss-server/pulls/4615	|	未关联	|	未指定	|
|	修复I8LWND所示的int转time的时候，insert的表现和mysql不一致的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4622	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8LWND	|	次要	|
|	【M兼容】修复updata多表更新core问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4625	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8MJNF	|	主要	|
|	gs_dump导出rename过的schema下的表的auto_increment失败	|	https://gitee.com/opengauss/openGauss-server/pulls/4617	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8QY8C	|	未指定	|
|	修复pg_dump中会将索引等当作序列导出的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4677	|	未关联	|	未指定	|
|	修复存储过程中使用自定义变量的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4704	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8PZ2T	|	次要	|
|	处理issue: MYSQL兼容性下执行insert语句core	|	https://gitee.com/opengauss/openGauss-server/pulls/4711	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8RUMN	|	主要	|
|	修复gs_dump备份sql_mode不含有ansi_quotes参数的B模式数据库会报错的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4725	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8U01Q	|	未指定	|
|	【bugfix】创建视图的语法中禁掉自定义变量的场景	|	https://gitee.com/opengauss/openGauss-server/pulls/4706	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8V36N	|	未指定	|
|	修复基于多表视图select for update出现core问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4720	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8TJ3I	|	主要	|
|	添加dolphin_hot_standby参数	|	https://gitee.com/opengauss/openGauss-server/pulls/4751	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8U214	|	未指定	|
|	处理issue：gsql不同命令对MySQL语句兼容性不同	|	https://gitee.com/opengauss/openGauss-server/pulls/4781	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8OSGC	|	未指定	|
|	为dolphin增加一个check_sql_fn_retval函数钩子	|	https://gitee.com/opengauss/openGauss-server/pulls/4791	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8YEFP	|	未指定	|
|	修复创建视图支持sql security语法 schema权限检查问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4191	|	https://e.gitee.com/opengaussorg/dashboard?issue=I83D1P	|	未指定	|
|	为dolphin插件的type_transfer函数添加对应的钩子	|	https://gitee.com/opengauss/openGauss-server/pulls/4803	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8WVQ0	|	不重要	|
|	【dolphin】sql function场景不根据实际执行的sql修改command tag	|	https://gitee.com/opengauss/openGauss-server/pulls/4805	|	未关联	|	未指定	|
|	修复fmgr sql场景，ignore标志没有带入到fmgr sql的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4807	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8ZOIM	|	未指定	|
|	修复ignore在subquery场景下失效的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4809	|	https://gitee.com/opengauss/openGauss-server/pulls/4809	|	未指定	|
|	解决多表更部分行为与mysql存在差异问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4832	|	https://e.gitee.com/opengaussorg/dashboard?issue=I90QQL	|	次要	|
|	【插件】autovacuum worker线程需要加载插件	|	https://gitee.com/opengauss/openGauss-server/pulls/4849	|	https://e.gitee.com/opengaussorg/dashboard?issue=I90JHX	|	次要	|
|	修复兼容b库中，创建自定义函数时core的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4854	|	https://e.gitee.com/opengaussorg/dashboard?issue=I91HUU	|	未指定	|
|	【插件】autovacuum worker线程需要加载插件-加载插件位置修改	|	https://gitee.com/opengauss/openGauss-server/pulls/4856	|	https://e.gitee.com/opengaussorg/dashboard?issue=I90JHX	|	次要	|
|	【插件】修复执行job时出现的core问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4861	|	https://e.gitee.com/opengaussorg/dashboard?issue=I922UN	|	未指定	|
|	bugfix：分区表达式计算结果为null时，将结果作为null处理，而不是作为0处理	|	https://gitee.com/opengauss/openGauss-server/pulls/4860	|	https://e.gitee.com/opengaussorg/dashboard?issue=I9228X	|	未指定	|
|	【插件】修复autovacuum worker线程加载插件中途退出导致锁未释放的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4874	|	https://e.gitee.com/opengaussorg/dashboard?issue=I90JHX	|	次要	|
|	修复ignore在sublink场景下失效的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4906	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8ZOIM	|	未指定	|
|	【bugfixed】解决多行插入包含右值引用时存在的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4222	|	https://e.gitee.com/opengaussorg/dashboard?issue=I83QV0	|	不重要	|
|	【bugfixed】解决使用表达式作为分区键，跨分区更新分区键列时数据库宕机的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/5103	|	https://e.gitee.com/opengaussorg/dashboard?issue=I9FH2V	|	次要	|
|	修复表增加字段后core的问题	|	https://gitee.com/opengauss/openGauss-server/pulls/4694	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8SZS3	|	次要	|
|	解决alter table first/after的core问题和group_concat在非B模式下saparator为空导致的core	|	https://gitee.com/opengauss/openGauss-server/pulls/4497	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8G677	|	未指定	|
|	openGauss带子查询时，性能劣于M*[zyzx]	|	https://gitee.com/opengauss/openGauss-server/pulls/4883	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8J17C	|	未指定	|
|	支持MySQL参数通过SELECT读取、SET设置	|	https://gitee.com/opengauss/Plugin/pulls/783	|	https://e.gitee.com/opengaussorg/dashboard?issue=I6N3FD	|	不重要	|
|	修复不稳定用例show status	|	https://gitee.com/opengauss/Plugin/pulls/798	|	未关联	|	未设置	|
|	修复修改sql_mode, lower_case_tables_names的值时会同步修改dolphin.sql_mode, dolphin.lower_case_tables_names的值的问题	|	https://gitee.com/opengauss/Plugin/pulls/805	|	未关联	|	未设置	|
|	部分文件换行符调整	|	https://gitee.com/opengauss/Plugin/pulls/813	|	未关联	|	未设置	|
|	修改ord, oct函数二进制参数表现	|	https://gitee.com/opengauss/Plugin/pulls/824	|	https://e.gitee.com/opengaussorg/dashboard?issue=I71HRC	|	次要	|
|	解决分区键表达式场景，打开enable_partition_opfusion走opfusion后报错	|	https://gitee.com/opengauss/Plugin/pulls/856	|	https://e.gitee.com/opengaussorg/dashboard?issue=I7984D	|	不重要	|
|	将测试用例添加到fastcheck测试组	|	https://gitee.com/opengauss/Plugin/pulls/887	|	https://e.gitee.com/opengaussorg/dashboard?issue=I7880I	|	次要	|
|	修复定时任务sysdate关键词报错	|	https://gitee.com/opengauss/Plugin/pulls/892	|	https://e.gitee.com/opengaussorg/dashboard?issue=I7DQ4R	|	次要	|
|	修复weight_string函数入参为超长字符串，数据库挂掉并产生core的问题	|	https://gitee.com/opengauss/Plugin/pulls/897	|	https://e.gitee.com/opengaussorg/dashboard?issue=I7F5UH	|	严重	|
|	bug修复：time转float负号问题	|	https://gitee.com/opengauss/Plugin/pulls/893	|	https://e.gitee.com/opengaussorg/dashboard?issue=I7EUCR	|	次要	|
|	添加year、date类型的字符串解析格式	|	https://gitee.com/opengauss/Plugin/pulls/899	|	https://e.gitee.com/opengaussorg/dashboard?issue=I7G6IN	|	次要	|
|	【bugfixed】解决对整型字段插入浮点数或末尾有空格报错的问题	|	https://gitee.com/opengauss/Plugin/pulls/941	|	https://e.gitee.com/opengaussorg/dashboard?issue=I7KP5S	|	次要	|
|	修复门禁失败问题	|	https://gitee.com/opengauss/Plugin/pulls/949	|	未关联	|	未设置	|
|	修复B库cast(expr as unsigned/signed)函数返回结果与mysql不一致	|	https://gitee.com/opengauss/Plugin/pulls/946	|	https://e.gitee.com/opengaussorg/dashboard?issue=I7NPYV	|	不重要	|
|	修复dolphin中to_days函数表现和mysql不一致的问题	|	https://gitee.com/opengauss/Plugin/pulls/962	|	https://e.gitee.com/opengaussorg/dashboard?issue=I7PPGC	|	不重要	|
|	修复field函数精度、大小写等与M*结果不匹配问题	|	https://gitee.com/opengauss/Plugin/pulls/993	|	https://e.gitee.com/opengaussorg/dashboard?issue=I7NXZQ	|	不重要	|
|	修复SUBDATE,TO_SECONDS函数问题	|	https://gitee.com/opengauss/Plugin/pulls/1037	|	https://e.gitee.com/opengaussorg/dashboard?issue=I82YM4	|	次要	|
|	修复comment为mysql兼容模式下大小写敏感时,为大写表添加注释时找不到表的bug	|	https://gitee.com/opengauss/Plugin/pulls/1056	|	未关联	|	未设置	|
|	支持alter table rename修改列名时，修改前后列名一致	|	https://gitee.com/opengauss/Plugin/pulls/1059	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8549R	|	未设置	|
|	修复在执行alter table remove partition时，并发执行DML出现的core问题	|	https://gitee.com/opengauss/Plugin/pulls/1060	|	https://e.gitee.com/opengaussorg/dashboard?issue=I85SIA	|	未设置	|
|	修复timediff函数错误使用try-catch导致的core问题	|	https://gitee.com/opengauss/Plugin/pulls/1062	|	https://e.gitee.com/opengaussorg/dashboard?issue=I868N9	|	未设置	|
|	修复date类型用于select语句，部分结果返回有误，和M侧不一样的问题	|	https://gitee.com/opengauss/Plugin/pulls/1055	|	https://e.gitee.com/opengaussorg/dashboard?issue=I83KZ1	|	次要	|
|	修复数值转date报错缺陷	|	https://gitee.com/opengauss/Plugin/pulls/1064	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8636C	|	次要	|
|	处理缺陷 between and操作符含time类型及time类型同timestamp类型比较，返回结果和M侧不一样	|	https://gitee.com/opengauss/Plugin/pulls/1075	|	https://e.gitee.com/opengaussorg/dashboard?issue=I871BG	|	次要	|
|	fix up issue I7A4TE: https://gitee.com/opengauss/Plugin/issues/I7A4TE?from=project-issue	|	https://gitee.com/opengauss/Plugin/pulls/1100	|	https://e.gitee.com/opengaussorg/dashboard?issue=I7A4TE	|	未设置	|
|	解决issue：period_add函数同between and使用，返回结果有误	|	https://gitee.com/opengauss/Plugin/pulls/1099	|	https://e.gitee.com/opengaussorg/dashboard?issue=I89HKF	|	次要	|
|	修复dayofxx、date('xx'), timestamp('')等场景下异常的问题。	|	https://gitee.com/opengauss/Plugin/pulls/1105	|	https://e.gitee.com/opengaussorg/dashboard?issue=I898UO	|	次要	|
|	修复date入参测试-数据类型为time时函数执行失败.	|	https://gitee.com/opengauss/Plugin/pulls/1110	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8BHOO	|	未设置	|
|	like是否区分大小写应由字符序控制	|	https://gitee.com/opengauss/Plugin/pulls/1107	|	https://e.gitee.com/opengaussorg/dashboard?issue=I7QNDH	|	未设置	|
|	修复str_to_date入参为非法时表现和mysql不一致的问题。	|	https://gitee.com/opengauss/Plugin/pulls/1113	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8D400	|	次要	|
|	修复select timestamp'xxxx'场景，对于非法值，OG显示为0，Mysql为异常，两者行为不一致的问题	|	https://gitee.com/opengauss/Plugin/pulls/1116	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8ED23	|	未设置	|
|	修复show create view结果错误的bug	|	https://gitee.com/opengauss/Plugin/pulls/1108	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8DG4D	|	主要	|
|	修复openguass的select time('xxxx')场景下在非法入参的时候表现和mysql不一致	|	https://gitee.com/opengauss/Plugin/pulls/1118	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8ETZ8	|	未设置	|
|	支持sql_mode控制将b''、x''类型当作bit类型或binary类型处理。	|	https://gitee.com/opengauss/Plugin/pulls/1109	|	https://e.gitee.com/opengaussorg/dashboard?issue=I7YE0C	|	不重要	|
|	fix issue I8FCYL 'timestampdiff函数部分返回结果与mysql侧不一致'	|	https://gitee.com/opengauss/Plugin/pulls/1122	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8FCYL	|	次要	|
|	修复openguass的time_to_sec函数部分返回与mysql侧不一致问题	|	https://gitee.com/opengauss/Plugin/pulls/1120	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8EI9U	|	次要	|
|	修复 date入参异常，dayofmonth结果不符合预期	|	https://gitee.com/opengauss/Plugin/pulls/1125	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8BHKU	|	未设置	|
|	修复兼容B库使用cast类型转换返回结果与mysql不一致的问题	|	https://gitee.com/opengauss/Plugin/pulls/1131	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8FD9N	|	未设置	|
|	修复subtime(8385959,'-1:00:00')和非严格模式下insert(subtime('839:59:59', '837:59:59'))场景下和mysql表现不一致的问题。	|	https://gitee.com/opengauss/Plugin/pulls/1142	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8H76T	|	次要	|
|	 fix I8JHC5 date compare error in b compatible mode	|	https://gitee.com/opengauss/Plugin/pulls/1152	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8JHC5	|	未设置	|
|	修复issue I8I9CH所示的date_format和to_char的问题	|	https://gitee.com/opengauss/Plugin/pulls/1150	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8I9CH	|	未设置	|
|	修复varlena2xx函数的bug	|	https://gitee.com/opengauss/Plugin/pulls/1149	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8J046	|	未设置	|
|	优化JSON_SET的性能。	|	https://gitee.com/opengauss/Plugin/pulls/1148	|	https://e.gitee.com/opengaussorg/dashboard?issue=I86UUI	|	未设置	|
|	代码中PG_TRY块中有return语句，会导致stack-buffer-underflow问题	|	https://gitee.com/opengauss/Plugin/pulls/1165	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8A4GD	|	未设置	|
|	修复issue I8IXNB所示的兼容B库建表无法使用default加括号的问题。	|	https://gitee.com/opengauss/Plugin/pulls/1160	|	https://e.gitee.com/opengaussorg/dashboard?issue=I7FYXW	|	不重要	|
|	修改bit到time的显式转换规则	|	https://gitee.com/opengauss/Plugin/pulls/1155	|	https://e.gitee.com/opengaussorg/dashboard?issue=I86IYS	|	次要	|
|	issue修改：兼容mysql convert('str' USING encoding)的表现	|	https://gitee.com/opengauss/Plugin/pulls/1175	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8KGWW	|	未设置	|
|	修复hour minute second函数在输入错误时返回值与mysql不一致的问题	|	https://gitee.com/opengauss/Plugin/pulls/1177	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8L4XS	|	未设置	|
|	修正bin(bit)的表现与mysql一致	|	https://gitee.com/opengauss/Plugin/pulls/1188	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8KD2L	|	次要	|
|	修改stddev、variance函数为样本(pop)统计	|	https://gitee.com/opengauss/Plugin/pulls/1181	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8IXFT	|	次要	|
|	【轻量级 PR】：修复创建用户时的概率性core问题	|	https://gitee.com/opengauss/Plugin/pulls/1172	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8L5XM	|	未设置	|
|	增加length(binary/varbinary)支持	|	https://gitee.com/opengauss/Plugin/pulls/1176	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8L5UW	|	未设置	|
|	优化数字+字母做标识符的错误提示	|	https://gitee.com/opengauss/Plugin/pulls/1183	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8KYUU	|	不重要	|
|	修复函数被truncate后不显示warning的问题	|	https://gitee.com/opengauss/Plugin/pulls/1202	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8L400	|	未设置	|
|	修改数值转time显式规则	|	https://gitee.com/opengauss/Plugin/pulls/1179	|	https://e.gitee.com/opengaussorg/dashboard?issue=I86R87	|	次要	|
|	补充gram.y中遗漏的关键字	|	https://gitee.com/opengauss/Plugin/pulls/1192	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8MMAP	|	未设置	|
|	修复issue I8LYIB datetime比较结果与mysql不一致的问题.	|	https://gitee.com/opengauss/Plugin/pulls/1199	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8LYIB	|	未设置	|
|	修复hex无法转换blob类型的问题	|	https://gitee.com/opengauss/Plugin/pulls/1198	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8M5B3	|	次要	|
|	fix bug I8MPVW enum尾部包含空格插入行为与Mysql不一致	|	https://gitee.com/opengauss/Plugin/pulls/1197	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8MPVW	|	未设置	|
|	修复ignore场景bpchar/bit/binary结果不正确的问题	|	https://gitee.com/opengauss/Plugin/pulls/1174	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8L5YI	|	未设置	|
|	增加deparse_query hook，解决CTAS场景生成的SQL和B兼容性冲突的问题	|	https://gitee.com/opengauss/Plugin/pulls/1189	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8L5ZO	|	未设置	|
|	修复json_objectagg对部分数据类型处理不正确的问题	|	https://gitee.com/opengauss/Plugin/pulls/1204	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8NL4E	|	次要	|
|	处理缺陷：and运算符对于‘true’的处理结果与Mysql不一致	|	https://gitee.com/opengauss/Plugin/pulls/1193	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8LRZQ	|	未设置	|
|	修复I8LWND所示的int转time的时候，insert的表现和mysql不一致的问题	|	https://gitee.com/opengauss/Plugin/pulls/1208	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8LWND	|	次要	|
|	issue修改: enum类型对0的处理与mysql不一致	|	https://gitee.com/opengauss/Plugin/pulls/1201	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8LZU4	|	未设置	|
|	优化binary的输出格式，使其不依赖于bytea_output参数，输出原本的内容	|	https://gitee.com/opengauss/Plugin/pulls/1216	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8L5UW	|	未设置	|
|	修复5.0.1升级5.1.1失败问题	|	https://gitee.com/opengauss/Plugin/pulls/1220	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8OIGN	|	主要	|
|	修复treat_bxconst_as_binary选项下|操作符使用bxconst时报错	|	https://gitee.com/opengauss/Plugin/pulls/1207	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8L5GR	|	未设置	|
|	修复B模式下cidr类型无法支持的问题	|	https://gitee.com/opengauss/Plugin/pulls/1234	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8Q51T	|	未设置	|
|	修复json_objectagg函数存在重复键的问题	|	https://gitee.com/opengauss/Plugin/pulls/1233	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8PLD4	|	次要	|
|	添加控制：b_compatibility_mode控制是否null first（通过指定orderby控制，影响部分执行计划）	|	https://gitee.com/opengauss/Plugin/pulls/1237	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8QEQH	|	次要	|
|	修复div操作符对binary类型数据的支持	|	https://gitee.com/opengauss/Plugin/pulls/1210	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8L5EO	|	未设置	|
|	修复year无法转换成boolean的问题	|	https://gitee.com/opengauss/Plugin/pulls/1242	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8POSC	|	次要	|
|	对date.cpp中的代码进行重构	|	https://gitee.com/opengauss/Plugin/pulls/1245	|	未关联	|	未设置	|
|	修复内存泄漏问题-ReplaceBCmptFuncName	|	https://gitee.com/opengauss/Plugin/pulls/1253	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8STPQ	|	未设置	|
|	修复兼容B库创建组合唯一索引时指定text列键值长度报错的问题	|	https://gitee.com/opengauss/Plugin/pulls/1254	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8QMW2	|	不重要	|
|	修复MySQL的JDBC链接openGauss并使用二进制数据时数据失真的问题	|	https://gitee.com/opengauss/Plugin/pulls/1241	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8LZ0P	|	未设置	|
|	修复enum的输入问题	|	https://gitee.com/opengauss/Plugin/pulls/1256	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8RJFK	|	次要	|
|	修复I8R30W所示的执行sqlsmith产生core dump问题。	|	https://gitee.com/opengauss/Plugin/pulls/1251	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8R30W	|	次要	|
|	根据CBB的结论，月份和日期出现0的时候，直接报错处理。	|	https://gitee.com/opengauss/Plugin/pulls/1259	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8RJRO	|	次要	|
|	修复select cast(3.14159265 as datetime)场景下mysql显示NULL，OG显示0的问题。	|	https://gitee.com/opengauss/Plugin/pulls/1262	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8SZA8	|	次要	|
|	增加对drop tables的语法支持	|	https://gitee.com/opengauss/Plugin/pulls/1261	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8THM3	|	未设置	|
|	修复comment和主键约束在建表的列属性里面不能乱序使用的问题	|	https://gitee.com/opengauss/Plugin/pulls/1266	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8UUGX	|	未设置	|
|	处理issue: 支持convert(1, UNSIGNED INT)和 cast(1 as UNSIGNED INT) 语法	|	https://gitee.com/opengauss/Plugin/pulls/1267	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8UUFL	|	未设置	|
|	修复numeric负值溢出问题	|	https://gitee.com/opengauss/Plugin/pulls/1255	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8SZF3	|	次要	|
|	处理缺陷 取反运算符~计算结果与mysql不一致	|	https://gitee.com/opengauss/Plugin/pulls/1248	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8L2T7	|	次要	|
|	修复用户自定义变量赋值问题	|	https://gitee.com/opengauss/Plugin/pulls/1257	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8TAHP	|	未设置	|
|	修复degrees函数不支持boolean、year以及json类型，但是mysql是支持的问题	|	https://gitee.com/opengauss/Plugin/pulls/1265	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8QQR7	|	不重要	|
|	修复varbinary在copy命令中插入错误的问题	|	https://gitee.com/opengauss/Plugin/pulls/1269	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8V1XN	|	次要	|
|	修改concat拼接binary等类型时结果不对的问题	|	https://gitee.com/opengauss/Plugin/pulls/1260	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8L5UW	|	未设置	|
|	修复select语句from list不支持加括号的问题	|	https://gitee.com/opengauss/Plugin/pulls/1271	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8UVY5	|	未设置	|
|	修复兼容B库调用函数str_to_date、inet_ntoa报错的问题	|	https://gitee.com/opengauss/Plugin/pulls/1277	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8V3YI	|	次要	|
|	修复binary/varbinary数据类型不支持索引的问题	|	https://gitee.com/opengauss/Plugin/pulls/1274	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8VEUM	|	未设置	|
|	修复I8V4P5所示的cast转换布尔值为date报错的问题	|	https://gitee.com/opengauss/Plugin/pulls/1282	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8V4P5	|	次要	|
|	为binary类型转换在长度超过typmod时添加严格模式判断，允许进行截断	|	https://gitee.com/opengauss/Plugin/pulls/1281	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8V4KR	|	次要	|
|	修复ln函数不支持year以及json类型，但是mysql是支持的问题	|	https://gitee.com/opengauss/Plugin/pulls/1279	|	https://gitee.com/opengauss/Plugin/pulls/1279	|	不重要	|
|	issue修改：修复B库补零逻辑和length计算逻辑与mysql一致	|	https://gitee.com/opengauss/Plugin/pulls/1289	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8R698	|	主要	|
|	修复I8V51J所示的str_to_date入参为bool与mysql不一致的问题	|	https://gitee.com/opengauss/Plugin/pulls/1287	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8V51J	|	次要	|
|	修复blob等类型不走索引扫描的问题	|	https://gitee.com/opengauss/Plugin/pulls/1286	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8VF26	|	未设置	|
|	修复从MySQL导出的varbinary导入到openGauss出错的问题	|	https://gitee.com/opengauss/Plugin/pulls/1292	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8V1XN	|	次要	|
|	新增MySQL协议hot_standby模式	|	https://gitee.com/opengauss/Plugin/pulls/1290	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8U214	|	未设置	|
|	修复dolphin_types函数的core问题	|	https://gitee.com/opengauss/Plugin/pulls/1283	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8W2FJ	|	次要	|
|	修复generate always的语法问题	|	https://gitee.com/opengauss/Plugin/pulls/1285	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8W839	|	未设置	|
|	修复upsert列名大小写敏感的问题	|	https://gitee.com/opengauss/Plugin/pulls/1302	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8TYGX	|	未设置	|
|	修复convert函数问题	|	https://gitee.com/opengauss/Plugin/pulls/1288	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8WAKT	|	不重要	|
|	处理issue: acos不支持boolean、year以及json类型，mysql支持	|	https://gitee.com/opengauss/Plugin/pulls/1295	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8WZWP	|	未设置	|
|	修复I8VOYT所示的set转date和datetime的问题	|	https://gitee.com/opengauss/Plugin/pulls/1307	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8VOYT	|	不重要	|
|	修复floor函数不支持year以及json类型，但是mysql是支持的问题	|	https://gitee.com/opengauss/Plugin/pulls/1310	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8QS0K	|	不重要	|
|	新增函数：hour(YEAR)、minute(YEAR)、second(YEAR)、year(YEAR)	|	https://gitee.com/opengauss/Plugin/pulls/1270	|	未关联	|	未设置	|
|	repeat函数兼容	|	https://gitee.com/opengauss/Plugin/pulls/1304	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8WBVI	|	次要	|
|	convert函数支持所有数据类型	|	https://gitee.com/opengauss/Plugin/pulls/1293	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8WP1E	|	不重要	|
|	修复： mysql模式下，建表时列名大写，自然连接会报错	|	https://gitee.com/opengauss/Plugin/pulls/1298	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8X2KP	|	未设置	|
|	处理issue：兼容B库使用cast/convert函数对binary列转unsigned时报错	|	https://gitee.com/opengauss/Plugin/pulls/1301	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8WWA0	|	次要	|
|	修复指定多个comment时，前面的生效的问题	|	https://gitee.com/opengauss/Plugin/pulls/1305	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8XGV2	|	次要	|
|	修复I8QS9F所示的cts场景下floor函数datetime等部分类型字段和mysql不一致的问题	|	https://gitee.com/opengauss/Plugin/pulls/1317	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8QS9F	|	不重要	|
|	修复create/alter table部分选项不支持空格分割的问题	|	https://gitee.com/opengauss/Plugin/pulls/1299	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8W4UW	|	未设置	|
|	select current_role 支持带括号	|	https://gitee.com/opengauss/Plugin/pulls/1316	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8YDHH	|	未设置	|
|	为新增的钩子增加初始化流程	|	https://gitee.com/opengauss/Plugin/pulls/1322	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8YEFP	|	未设置	|
|	修复mysql兼容模式下，使用extract函数，提示epoch不支持的问题	|	https://gitee.com/opengauss/Plugin/pulls/1306	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8VL03	|	未设置	|
|	ASCII函数兼容	|	https://gitee.com/opengauss/Plugin/pulls/1313	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8Y5V4	|	未设置	|
|	不直接通过IUD修改pg_cast，通过修改内核的方式改变使用的函数	|	https://gitee.com/opengauss/Plugin/pulls/1311	|	未关联	|	未设置	|
|	修复I8YA8T所示的unix_timestamp与mysql不一致的问题	|	https://gitee.com/opengauss/Plugin/pulls/1320	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8YA8T	|	次要	|
|	MYSQL质量加固，BIT_LENGTH函数兼容	|	https://gitee.com/opengauss/Plugin/pulls/1326	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8ZDKR	|	未设置	|
|	修复rpad函数长度参数过大表现与MySQL不一致的问题	|	https://gitee.com/opengauss/Plugin/pulls/1333	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8ZO8N	|	未设置	|
|	修复log函数在底数为1时发生除0报错	|	https://gitee.com/opengauss/Plugin/pulls/1332	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8YHBS	|	未设置	|
|	修复grant语法不支持字符串、不支持@形式的用户名的问题	|	https://gitee.com/opengauss/Plugin/pulls/1337	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8ZYYV	|	未设置	|
|	修复char函数的core问题	|	https://gitee.com/opengauss/Plugin/pulls/1319	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8YQ6N	|	次要	|
|	处理issue: 兼容B库bigint unsigned列插入18446744073709551615报错	|	https://gitee.com/opengauss/Plugin/pulls/1330	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8YY4L	|	次要	|
|	消除新拉取代码编译海豚的警告	|	https://gitee.com/opengauss/Plugin/pulls/1328	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8ZS9G	|	不重要	|
|	修复创建list分区表失败的问题	|	https://gitee.com/opengauss/Plugin/pulls/1343	|	https://e.gitee.com/opengaussorg/dashboard?issue=I90H88	|	次要	|
|	添加explain format对‘tree'的语法支持	|	https://gitee.com/opengauss/Plugin/pulls/1336	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8ZNMN	|	未设置	|
|	float(p,0)，double(p,0)等映射为float(p)	|	https://gitee.com/opengauss/Plugin/pulls/1340	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8TM37	|	主要	|
|	修复I9003G所示的insert的数据读出来bc信息丢失的问题。	|	https://gitee.com/opengauss/Plugin/pulls/1342	|	https://e.gitee.com/opengaussorg/dashboard?issue=I9003G	|	次要	|
|	blob支持通过(n)控制选择的数据类型	|	https://gitee.com/opengauss/Plugin/pulls/1344	|	https://e.gitee.com/opengaussorg/dashboard?issue=I90JIF	|	未设置	|
|	修复I90J0P所示的bigint转date和time和mysql不一致的问题。	|	https://gitee.com/opengauss/Plugin/pulls/1345	|	https://e.gitee.com/opengaussorg/dashboard?issue=I90J0P	|	次要	|
|	修复cast(XX as time)结果与mysql不一致问题	|	https://gitee.com/opengauss/Plugin/pulls/1350	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8YUM9	|	不重要	|
|	增加json_array_insert函数的健壮性	|	https://gitee.com/opengauss/Plugin/pulls/1347	|	https://e.gitee.com/opengaussorg/dashboard?issue=I90H5O	|	次要	|
|	【兼容性质量加固】修复log函数双入参结果与mysql不一致	|	https://gitee.com/opengauss/Plugin/pulls/1356	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8QSTP	|	不重要	|
|	补充MySQL兼容性LOCK TABLES语法中TABLES与TABLE是同义词的特性	|	https://gitee.com/opengauss/Plugin/pulls/1354	|	https://e.gitee.com/opengaussorg/dashboard?issue=I90FBW	|	未设置	|
|	修复I91AF8所示的now的数据插入year字段出错的问题。	|	https://gitee.com/opengauss/Plugin/pulls/1357	|	https://e.gitee.com/opengaussorg/dashboard?issue=I91AF8	|	不重要	|
|	添加boolean到时间日期类型的转换	|	https://gitee.com/opengauss/Plugin/pulls/1349	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8WM2J	|	次要	|
|	修复unhex返回结果与数字按位异或时结果不对的问题	|	https://gitee.com/opengauss/Plugin/pulls/1358	|	https://e.gitee.com/opengaussorg/dashboard?issue=I91COS	|	次要	|
|	修复order by使用别名时未忽略大小写的问题	|	https://gitee.com/opengauss/Plugin/pulls/1359	|	https://e.gitee.com/opengaussorg/dashboard?issue=I91I08	|	未设置	|
|	修复user@host hostname不支持大写的localhost的问题	|	https://gitee.com/opengauss/Plugin/pulls/1364	|	https://e.gitee.com/opengaussorg/dashboard?issue=I91QQ6	|	未设置	|
|	issue修改: 修复convert后order by结果不正确的问题	|	https://gitee.com/opengauss/Plugin/pulls/1363	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8KGWW	|	未设置	|
|	同步pr https://gitee.com/opengauss/openGauss-server/pulls/4854	|	https://gitee.com/opengauss/Plugin/pulls/1362	|	https://e.gitee.com/opengaussorg/dashboard?issue=I91HUU	|	未设置	|
|	【兼容性质量加固】修复log函数不支持year和json类型	|	https://gitee.com/opengauss/Plugin/pulls/1374	|	https://e.gitee.com/opengaussorg/dashboard?issue=I92ZE8	|	未设置	|
|	修改I91D1C所示的year函数mysql返回值为long，openGuass为double以及year函数发现的其他问题。	|	https://gitee.com/opengauss/Plugin/pulls/1372	|	https://e.gitee.com/opengaussorg/dashboard?issue=I91D1C	|	不重要	|
|	MYSQL质量加固，CONAT与CONCAT_WS函数兼容	|	https://gitee.com/opengauss/Plugin/pulls/1352	|	https://e.gitee.com/opengaussorg/dashboard?issue=I91536	|	未设置	|
|	issue修改:补全B库部分未添加的操作符	|	https://gitee.com/opengauss/Plugin/pulls/1373	|	https://e.gitee.com/opengaussorg/dashboard?issue=I92DYO	|	未设置	|
|	修复不同数据类型间不能做natural join的问题	|	https://gitee.com/opengauss/Plugin/pulls/1368	|	https://e.gitee.com/opengaussorg/dashboard?issue=I924QU	|	未设置	|
|	修复COALESCE函数返回值类型问题	|	https://gitee.com/opengauss/Plugin/pulls/1370	|	https://e.gitee.com/opengaussorg/dashboard?issue=I92KU2	|	未设置	|
|	修复门禁用例失败问题	|	https://gitee.com/opengauss/Plugin/pulls/1383	|	https://e.gitee.com/opengaussorg/dashboard?issue=I924QU	|	未设置	|
|	修复cast(XX as time)输入小于-8385959结果与mysql不一致问题	|	https://gitee.com/opengauss/Plugin/pulls/1377	|	https://e.gitee.com/opengaussorg/dashboard?issue=I930KV	|	未设置	|
|	修复I8ZSNF所示的JDBC接口char(10)/national varchar(10)列插入3.14159265报错问题。	|	https://gitee.com/opengauss/Plugin/pulls/1379	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8ZSNF	|	次要	|
|	修复json_objectagg函数的core问题	|	https://gitee.com/opengauss/Plugin/pulls/1381	|	https://e.gitee.com/opengaussorg/dashboard?issue=I93O5M	|	次要	|
|	修复I91D1C所示的json_contains/json_valid/json_length、json_depth、json_storage_size函数返回值类型和mysql不一致的问题。	|	https://gitee.com/opengauss/Plugin/pulls/1386	|	https://e.gitee.com/opengaussorg/dashboard?issue=I91D1C	|	不重要	|
|	处理issue：兼容B库binary列插入二进制/八进制数后转unsigned时结果与mysql不一致	|	https://gitee.com/opengauss/Plugin/pulls/1385	|	https://e.gitee.com/opengaussorg/dashboard?issue=I92576	|	不重要	|
|	issue修改：为部分操作符补全交换律供hash join场景使用	|	https://gitee.com/opengauss/Plugin/pulls/1376	|	https://e.gitee.com/opengaussorg/dashboard?issue=I92DTZ	|	未设置	|
|	issue修改：处理冲突与表现不当的操作符	|	https://gitee.com/opengauss/Plugin/pulls/1393	|	https://e.gitee.com/opengaussorg/dashboard?issue=I92DYO	|	未设置	|
|	生成分区表定义时，调整boundaries排序为nulls last	|	https://gitee.com/opengauss/Plugin/pulls/1397	|	https://e.gitee.com/opengaussorg/dashboard?issue=I944DT	|	未设置	|
|	修复I9436C所示的time插入结果和MySQL不符的问题	|	https://gitee.com/opengauss/Plugin/pulls/1398	|	https://e.gitee.com/opengaussorg/dashboard?issue=I9436C	|	未设置	|
|	修复recursive场景类型不匹配的问题	|	https://gitee.com/opengauss/Plugin/pulls/1392	|	https://e.gitee.com/opengaussorg/dashboard?issue=I92XZ7	|	未设置	|
|	 修复bit等类型在xor操作符左右入参时报错	|	https://gitee.com/opengauss/Plugin/pulls/1348	|	https://e.gitee.com/opengaussorg/dashboard?issue=I911DZ	|	未设置	|
|	修复timestampadd函数在异常场景下与MySQL表现不同	|	https://gitee.com/opengauss/Plugin/pulls/1388	|	https://e.gitee.com/opengaussorg/dashboard?issue=I92ZT1	|	未设置	|
|	解决log函数报错情况与mysql不一致的问题	|	https://gitee.com/opengauss/Plugin/pulls/1391	|	https://e.gitee.com/opengaussorg/dashboard?issue=I90J4Y	|	未设置	|
|	issue修改：语法解析错误导致不支持full outer join	|	https://gitee.com/opengauss/Plugin/pulls/1400	|	https://e.gitee.com/opengaussorg/dashboard?issue=I9545N	|	次要	|
|	float8(double precision)输出精度加一	|	https://gitee.com/opengauss/Plugin/pulls/1401	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8TPA8	|	次要	|
|	【测试类型：功能测试】【测试版本：6.0.0】【开启继承表】 在兼容mysql的b库中可以修改普通表为继承表	|	https://gitee.com/opengauss/Plugin/pulls/1410	|	https://e.gitee.com/opengaussorg/dashboard?issue=I92AII	|	主要	|
|	issue修改:解决B兼容下在database(schema)中存在对象时，不能直接drop的问题	|	https://gitee.com/opengauss/Plugin/pulls/1416	|	https://e.gitee.com/opengaussorg/dashboard?issue=I970H7	|	未设置	|
|	修复hex函数处理结果与mysql不一致的问题	|	https://gitee.com/opengauss/Plugin/pulls/1419	|	https://e.gitee.com/opengaussorg/dashboard?issue=I94PPQ	|	不重要	|
|	修复is unknown与mysql表现不一致的问题	|	https://gitee.com/opengauss/Plugin/pulls/1414	|	https://e.gitee.com/opengaussorg/dashboard?issue=I96QX1	|	未设置	|
|	修复：B兼容触发器语法问题、show问题	|	https://gitee.com/opengauss/Plugin/pulls/1417	|	https://e.gitee.com/opengaussorg/dashboard?issue=I92PY4	|	未设置	|
|	修复cast as char问题	|	https://gitee.com/opengauss/Plugin/pulls/1395	|	https://e.gitee.com/opengaussorg/dashboard?issue=I942S4	|	未设置	|
|	修复strcmp部分数据类型下结果不对的问题	|	https://gitee.com/opengauss/Plugin/pulls/1399	|	https://e.gitee.com/opengaussorg/dashboard?issue=I943U1	|	未设置	|
|	修复门禁失败问题	|	https://gitee.com/opengauss/Plugin/pulls/1425	|	https://e.gitee.com/opengaussorg/dashboard?issue=I900J1	|	未设置	|
|	join支持使用逗号的方式连接	|	https://gitee.com/opengauss/Plugin/pulls/1420	|	https://e.gitee.com/opengaussorg/dashboard?issue=I92XVH	|	未设置	|
|	修复binary/varbinary转bool表现与MySQL不一致的问题	|	https://gitee.com/opengauss/Plugin/pulls/1427	|	https://e.gitee.com/opengaussorg/dashboard?issue=I97M32	|	未设置	|
|	MYSQL质量加固，LEFT函数bit、boolean、blob类型处理	|	https://gitee.com/opengauss/Plugin/pulls/1403	|	https://e.gitee.com/opengaussorg/dashboard?issue=I95QLW	|	未设置	|
|	修复datetime'' 和 timestamptz''不符合预期的问题。	|	https://gitee.com/opengauss/Plugin/pulls/1421	|	https://e.gitee.com/opengaussorg/dashboard?issue=I96XLR	|	不重要	|
|	修复log函数返回值类型与mysql不一致的问题	|	https://gitee.com/opengauss/Plugin/pulls/1428	|	https://e.gitee.com/opengaussorg/dashboard?issue=I92T9Z	|	未设置	|
|	 修复pipes_as_concat(bit,bool)无法入参的问题	|	https://gitee.com/opengauss/Plugin/pulls/1411	|	https://e.gitee.com/opengaussorg/dashboard?issue=I96FET	|	未设置	|
|	修改年月日包含零时候尽量和mysql保持成一致。	|	https://gitee.com/opengauss/Plugin/pulls/1424	|	https://e.gitee.com/opengaussorg/dashboard?issue=I94BVW	|	次要	|
|	hex函数支持enum入参	|	https://gitee.com/opengauss/Plugin/pulls/1433	|	https://e.gitee.com/opengaussorg/dashboard?issue=I90MVQ	|	未设置	|
|	修复unknown is true/false表现与mysql不一致的问题	|	https://gitee.com/opengauss/Plugin/pulls/1444	|	https://e.gitee.com/opengaussorg/dashboard?issue=I98XOM	|	未设置	|
|	修复datetime(6)的显式转换有精度丢失的问题	|	https://gitee.com/opengauss/Plugin/pulls/1445	|	https://e.gitee.com/opengaussorg/dashboard?issue=I98Y1P	|	不重要	|
|	float4um、float8um支持-0	|	https://gitee.com/opengauss/Plugin/pulls/1412	|	https://e.gitee.com/opengaussorg/dashboard?issue=I91TMT	|	次要	|
|	count支持distinct多列	|	https://gitee.com/opengauss/Plugin/pulls/1440	|	https://e.gitee.com/opengaussorg/dashboard?issue=I9860X	|	不重要	|
|	std函数入参支持json	|	https://gitee.com/opengauss/Plugin/pulls/1443	|	https://e.gitee.com/opengaussorg/dashboard?issue=I91I2Q	|	未设置	|
|	修复调用year_recv coredump问题	|	https://gitee.com/opengauss/Plugin/pulls/1441	|	https://e.gitee.com/opengaussorg/dashboard?issue=I985ZL	|	次要	|
|	修复部分数据类型下interval函数结果错误的问题	|	https://gitee.com/opengauss/Plugin/pulls/1431	|	https://e.gitee.com/opengaussorg/dashboard?issue=I943TG	|	未设置	|
|	支持建表语句指定primary key给出索引名和使用key作为primary key的缩写，表示主键	|	https://gitee.com/opengauss/Plugin/pulls/1450	|	https://e.gitee.com/opengaussorg/dashboard?issue=I930CY	|	未设置	|
|	修改建表的时候如果创建表指定的字符集openGauss数据库不支持时继承数据库默认字符集.	|	https://gitee.com/opengauss/Plugin/pulls/1453	|	https://e.gitee.com/opengaussorg/dashboard?issue=I98KYL	|	不重要	|
|	修复interval单位支持缺失的问题	|	https://gitee.com/opengauss/Plugin/pulls/1429	|	https://e.gitee.com/opengaussorg/dashboard?issue=I92YZF	|	未设置	|
|	限制ndig大小，防止设置extra_float_digits出现非预期结果	|	https://gitee.com/opengauss/Plugin/pulls/1475	|	https://e.gitee.com/opengaussorg/dashboard?issue=I90QKD	|	不重要	|
|	修复quote无效字符的core问题	|	https://gitee.com/opengauss/Plugin/pulls/1459	|	https://e.gitee.com/opengaussorg/dashboard?issue=I9AZJ1	|	未设置	|


### JDBC 回合列表

|	描述	|	PR	|	关联issue	|	问题级别	|
|	-----	|	-----	|	-----	|	-----	|
|	[bugfix] 修复查询结果中同时包含GBK和UTF8字符串时抛出异常的问题	|	https://gitee.com/opengauss/openGauss-connector-jdbc/pulls/167	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8B89Q	|	不重要	|
|	[bufix]修复select语句中包含function关键字导致sql语句分割不正确的问题	|	https://gitee.com/opengauss/openGauss-connector-jdbc/pulls/172	|	https://e.gitee.com/opengaussorg/dashboard?issue=I84URC	|	未指定	|
|	[bufix]修复 executeBatch 模式下指定 Statement.RETURN_GENERATED_KEYS 参数且只插入1条数据时报错的问题	|	https://gitee.com/opengauss/openGauss-connector-jdbc/pulls/173	|	https://e.gitee.com/opengaussorg/dashboard?issue=I4Y1DU	|	未指定	|
|	兼容性jdbc获取year类型值报错（I8WBKN），兼容性jdbc获取cast(X as time)报错（I8YUCT）	|	https://gitee.com/opengauss/openGauss-connector-jdbc/pulls/193	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8WBKN	|	次要	|
|	将year类型转为Date类型返回	|	https://gitee.com/opengauss/openGauss-connector-jdbc/pulls/194	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8WAUD	|	次要	|
|	处理JDBC连接B库获取blob类型报错问题	|	https://gitee.com/opengauss/openGauss-connector-jdbc/pulls/195	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8WYXH	|	次要	|
|	解决jdbc获取cast(X as binary)的类型/值与mysql不同问题	|	https://gitee.com/opengauss/openGauss-connector-jdbc/pulls/198	|	https://e.gitee.com/opengaussorg/dashboard?issue=I8WGXU	|	次要	|
|	[bugfix]修复 hibernate 在 setClob 时出现 exceed overall CLOB length [0] 的错误	|	https://gitee.com/opengauss/openGauss-connector-jdbc/pulls/199	|	https://e.gitee.com/opengaussorg/dashboard?issue=I95U2O	|	未指定	|
|	解决jdbc插入blob类型报错invalid hexadecimal digit	|	https://gitee.com/opengauss/openGauss-connector-jdbc/pulls/203	|	https://e.gitee.com/opengaussorg/dashboard?issue=I927PM	|	次要	|


### OM 回合列表

|	描述	|	PR	|	关联issue	|	问题级别	|
|	-----	|	-----	|	-----	|	-----	|
|	gs_sshexkey工具添加互信保活	|	https://e.gitee.com/opengaussorg/repos/opengauss/openGauss-OM/pulls/729	|	https://e.gitee.com/opengaussorg/issues/table?issue=I99YLU	|	次要	|
|	om安装后，建议增加环境变量PGPORT	|	https://gitee.com/opengauss/openGauss-OM/pulls/538	|	https://e.gitee.com/opengaussorg/dashboard?issue=I7T0RB	|	不重要	|



### 其他问题修复


|	任务ID	|	任务标题	|	优先级	|	关联PR	|
|	-----	|	-----	|	-----	|	-----	|
|	I9HCCQ	|	安装opengauss数据库后，无pg_archivecleanup命令	|	无优先级	|	https://e.gitee.com/opengaussorg/repos/opengauss/openGauss-server/pulls/5192	|
|	I9I2GO	|	【测试类型：工具功能】【测试版本：5.0.2】5.0.2jdbc包解压出来为5.0.1	|	次要	|	https://e.gitee.com/opengaussorg/repos/opengauss/openGauss-connector-jdbc/pulls/222	|
|	I9IBHU	|	【测试类型：功能测试】【测试版本：5.0.2】【兼容MySQL多字符集】【需求名称：兼容MySQL设置字符集字符序语法：SET NAMES】set names binary失败	|	次要	|	https://e.gitee.com/opengaussorg/repos/opengauss/Plugin/pulls/1547	|
|	I9IM10	|	【测试类型：工具功能】【测试版本：5.0.2】【升级】3.0.5创建B库，灰度升级到5.0.2，不带CM，报错ERROR:  operator ~~ already exists 	|	次要	|	https://gitee.com/opengauss/openGauss-server/pulls/5121/	|
|	I9IMB7	|	【测试类型：工具功能】【测试版本：5.0.2】【升级】3.0.5创建B库，就地升级到5.0.2，不带CM，报错FATAL:  cannot execute CREATE EXTENSION in a read-only transaction	|	次要	|	https://gitee.com/opengauss/openGauss-server/pulls/5121/	|
|	I9IRH3	|	B模式，字符串按照数字顺序排序报错，order by(id+‘’）执行报错	|	次要	|	https://gitee.com/opengauss/Plugin/pulls/1536	|
|	I9IYDQ	|	【测试类型：工具功能】【测试版本：5.0.2】【升级】3.0.5/5.0.0/5.0.1带cm灰度升级到5.0.2带cm，升级过程中启库失败	|	主要	|	https://e.gitee.com/opengaussorg/repos/opengauss/CM/pulls/198	|
|	I9JTVM	|	【测试类型：SQL功能】【测试版本：5.0.0】 问题描述:modify仅修改列注释导致字符乱码且会引发数据库宕机	|	主要	|	https://e.gitee.com/opengaussorg/repos/opengauss/Plugin/pulls/1552	|
|	I9JTZA	|	【测试类型：工具功能】【测试版本：5.0.2】【升级】5.0.0/5.0.1~5.0.2 灰度升级_回滚报错ERROR:  cannot cast type bigint to year	|	次要	|	https://e.gitee.com/opengaussorg/repos/opengauss/Plugin/pulls/1548	|
|	I9JZJ6	|	【测试类型：SQL功能】【测试版本：5.0.2】3.0.5/5.0.0/5.0.1、5.0.2带cm，gs_om -t status --all结果主节点sender_sent_location等为0/0	|	次要	|	https://e.gitee.com/opengaussorg/repos/opengauss/CM/pulls/202	|
|	I9L0Y1	|	datakit安装5.1.0版本失败	|	次要	|	未关联（6.0.0版本上回归）	|
|	I9IZ7A	|	om执行预安装提示The valid return item number[0] does not match with host number[2]. The return result: 	|	次要	|	https://gitee.com/opengauss/openGauss-OM/pulls/748	|
|	I9GV2J	|	gs_restore恢复带主键的表时报错执行删除主键失败，因为表不存在	|	次要	|	https://gitee.com/opengauss/openGauss-server/pulls/5269	|
|	I9F70M	|	使用concat函数效率下降问题[zyzx]	|	次要	|	https://gitee.com/opengauss/Plugin/pulls/1562	|
|	I9BUSY	|	使用gs_dropnode命令后成功删除备节点，但集群整体无法启动	|	次要	|	https://gitee.com/opengauss/openGauss-OM/pulls/617	|
|	I9JWCD	|	5.0.0物理复制槽为f，xlog不回收问题	|	次要	|	https://gitee.com/opengauss/openGauss-server/pulls/5446	|
|	I95H80	|	springboot + Mybatis架构，blob字符类型读写报错。	|	次要	|	https://gitee.com/opengauss/openGauss-connector-jdbc/pulls/201	|
|	I98M8F	|	opengauss，springboot + Mybatis架构，无法使用show tables like语法	|	次要	|	https://gitee.com/opengauss/Plugin/pulls/1447	|
|	I4Y1DU	|	批量插入数据只有一条时报错	|	未关联	|	https://gitee.com/opengauss/Plugin/pulls/1447	|
|	I9FQTI	|	【测试类型：性能测试】【测试版本：5.0.1】复杂sql慢场景合集讨论[zyzx]	|	次要	|	https://gitee.com/opengauss/openGauss-connector-jdbc/pulls/234	|
|	I927PM	|	增加Blob类型的getString适配	|	次要	|	https://gitee.com/opengauss/openGauss-connector-jdbc/pulls/228	|




