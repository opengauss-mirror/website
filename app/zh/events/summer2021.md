---
tag: 'summer'
category: 'events'
bgimg: '/img/breadcrumbs/minisite_bg.png'
moimg: '/img/breadcrumbs/minisite_mo.png'
---

#### 活动简介

开源软件供应链点亮计划 - 暑期 2021（以下简称 暑期 2021）是由中国科学院软件研究所与 openEuler 社区共同举办的一项面向高校学生的暑期活动，
旨在鼓励在校学生积极参与开源软件的开发维护，促进优秀开源软件社区的蓬勃发展。我们将联合各大开源社区，针对重要开源软件的开发与维护提供项目，并向全球高校学生开放报名。

学生自由选择项目，与社区导师沟通实现方案并撰写项目计划书。被选中的学生将在社区导师指导下，按计划完成开发工作，并将成果贡献给社区。根据项目的难易程度和完成情况，参与者将获取由主办方发放的项目奖金。

#### 活动计划

**05 月 24 日 - 06 月 13 日 学生提交项目申请阶段**

**06 月 30 日 项目申请审核结果公示**

07 月 01 日 - 08 月 15 日 项目研发第一阶段

08 月 30 日 项目中期考核结果公示

08 月 16 日 - 09 月 30 日 项目研发第二阶段

10 月 22 日 项目结项考核结果公示

11 月 上 旬 年度优秀项目公示

#### openGauss 项目列表

openGauss 社区深度参与暑期 2021 活动，当前已有**16**个 openGauss 相关的项目，欢迎广大学生朋友参与。

暑期 2021 openGauss 项目申请地址：<https://summer.iscas.ac.cn/#/org/orgdetail/opengauss?lang=chi>

<hr/>

**项目标题：** **openGauss 统一审计支持时间范围限定**

**项目描述：** 审计机制是一种通过定制化制定审计策略而实现高效安全审计管理的一种技术。当管理员定义审计对象和审计行为后，用户执行的任务如果关联到对应的审计策略，则生成对应的审计行为，并记录审计日志。定制化审计策略可涵盖常见的用户管理活动，DDL 和 DML 行为，满足日常审计诉求。 本赛题可以在原有统一审计基础之上增加时间范围限定，即不仅可以针对 SQL 来源(app、角色、IP)和具体操作行为定制审计策略，还可以把时间范围加入到审计策略中，比如 DBA 认为某个 SQL 操作在凌晨被触发是危险的，应该被纳入审计日志系统并记录以防止抵赖，那么可以创建此审计策略只关联凌晨 1:00~2:00, 其他时间段内的同 SQL 则不会被触发记录审计日志。本赛题通过对既有安全特性进行增加，不仅可以加深对数据库内核开发的掌握，而且可以提升数据库安全模型的理解。

**项目导师：** 刘海龙

**项目申请：** <https://summer.iscas.ac.cn/#/org/prodetail/210320474?lang=chi>

<hr/>

**项目标题：** **openGauss 修复 explain performance 能力**

**项目描述：** explain performance 是 openGauss 提出的一种针对 AP 查询的性能追溯机制，通过支持 explain performance 实现对整个查询过程中 CPU 的消耗和内存的消耗，从而进行事后的查询能力分析，同时通过估算代价与实际实行耗时分析优化器的合理性。

**项目导师：** 周平高

**项目申请：** <https://summer.iscas.ac.cn/#/org/prodetail/210320475?lang=chi>

<hr/>

**项目标题：** **openGauss 基于用户的权限管理视图**

**项目描述：** openGauss 当前的 ACL(Access Control List)信息主要是基于对象来进行权限信息查询，即数据库内核对象都被哪些用户所持有，以及持有某种对象；越来越多的运维场景下需要清晰的查询某个用户所持有的对象管理权限，通过监控用户的权限情况指定对应的安全管理策略。

**项目导师：** 宋荣荣

**项目申请：** <https://summer.iscas.ac.cn/#/org/prodetail/210320476?lang=chi>

<hr/>

**项目标题：** **openGauss fuzz 测试工具增强**

**项目描述：** fuzz 测试作为安全测试中的重要环节，可以帮助发现很多内存问题和 core 问题。目前开源社区上关于数据库 fuzz 测试的工具较少。其中 sqlsmith 可以构造较好的 fuzz 场景，通过简单适配，可以兼容 openGauss 数据库。但是目前工具在实际使用时会产生大量无效的 sql 语句，并且场景较为单一。基本不涉及 DDL 语句。如何增加 DDL 语法和提高生成 sql 语句的有效性和复杂性，是比较重要的议题。

**项目导师：** 熊建豪

**项目申请：** <https://summer.iscas.ac.cn/#/org/prodetail/210320477?lang=chi>

<hr/>

**项目标题：** **openGauss 支持节点替换/节点修复功能**

**项目描述：** 集群由多个主机构成，当其中一台或者多台主机或者实例发生故障时，为保证系统可靠性，提供故障修复工具，支持在原主机上修复实例，也支持替换成新的主机加入到集群中，整个过程保证数据库正常服务，不会造成业务中断。

**项目导师：** 曹东升

**项目申请：** <https://summer.iscas.ac.cn/#/org/prodetail/210320478?lang=chi>

<hr/>

**项目标题：** **openGauss 新增一个兼容 Oracle 的 Number 自定义类型**

**项目描述：** openGauss 在实际应用中，会涉及到原有 Oracle、mysql 应用的移植，客户希望的是尽量少的 SQL 修改，因此在 SQL 语句层面，本题以兼容 Oracle 的 NUMBER 类型为例，新增 NUMBER 类型后，支持在 create table、alter table 中使用 NUMBER 类型。

**项目导师：** 胡英豪

**项目申请：** <https://summer.iscas.ac.cn/#/org/prodetail/210320479?lang=chi>

<hr/>

**项目标题：** **openGauss 新增一个 Insert 特殊语法**

**项目描述：** 在 insert into tablename values(1,2)语法中，支持以下语法：insert into tablename values(1,2),(3,4) ,可一次性插入多条数据。

**项目导师：** 胡英豪

**项目申请：** <https://summer.iscas.ac.cn/#/org/prodetail/210320480?lang=chi>

<hr/>

**项目标题：** **基于 openGauss 的 libpq 或者 odbc 封装一套 C++接口**

**项目描述：** 基于 openGauss 的 libpq 或者 odbc 封装一套 C++接口，实现语句的执行和参数的绑定，接口的规范参考 Oracle 的 OCCI。

**项目导师：** 刘勇生

**项目申请：** <https://summer.iscas.ac.cn/#/org/prodetail/210320481?lang=chi>

<hr/>

**项目标题：** **openGauss 兼容支持 Oracle 的正则表达式规则**

**项目描述：** 利用 openGauss 内部支持的正则表达式规则，兼容支持 Oracle 的 REGEXP_COUNT、REGEXP_INSTR、REGEXP_SUBSTR； --REGEXP_COUNT select regexp_count ('The pro-niece was born today, so exciting.', 'a') "Count 'a'" from dual; --REGEXP_INSTR SELECT REGEXP_INSTR ('Itmyhome', 'a|i|o|e|u') FROM dual; --REGEXP_SUBSTR SELECT REGEXP_SUBSTR('34,56,-23','[^,]+',1,1,'i') AS STR FROM DUAL;

**项目导师：** 胡英豪

**项目申请：** <https://summer.iscas.ac.cn/#/org/prodetail/210320482?lang=chi>

<hr/>

**项目标题：** **openGauss gsql 工具支持自定义 sql 结束符**

**项目描述：** openGauss 的 gsql 工具普通 sql 结束的标志是;分号，通过对 gsql 的修改，可支持将结束符定义为其他符号，比如#号，或者以多个符号为标志的结束符:##

**项目导师：** 犹广阔

**项目申请：** <https://summer.iscas.ac.cn/#/org/prodetail/210320483?lang=chi>

<hr/>

**项目标题：** **openGauss 支持行存压缩**

**项目描述：** openGauss 当前仅在列存引擎中支持数据压缩，行存储引擎的压缩功能刚启动开发。因为行存储引擎主要应用场景为 OLTP 在线交易型场景，对时延敏感，因此行存引擎的压缩需要在尽量降低对系统性能影响的前提下，获得更好的压缩效果。

**项目导师：** 林科旭

**项目申请：** <https://summer.iscas.ac.cn/#/org/prodetail/210320484?lang=chi>

<hr/>

**项目标题：** **openGauss 支持 Learned Index**

**项目描述：** 使用 Learned Index 最新学术成果，替换 openGauss 的 B+Tree 索引，达成大幅降低索引内存空间占用的目的。

**项目导师：** 张程伟

**项目申请：** <https://summer.iscas.ac.cn/#/org/prodetail/210320485?lang=chi>

<hr/>

**项目标题：** **openGauss 兼容 Oralce 存储过程的语法**

**项目描述：** 当 openGauss 尝试替代原先运行在 Oracle 数据库中的应用时，一个急需解决的问题，就是对 Oracle 存储过程的兼容性。本项目期望达到的目标是：原先运行在 Oracle 数据库内部的存储过程可以允许代码开发人员不人工修改/或者极少人工修改就能够直接运行在 openGauss 数据库内。 作为该项目的实现，可以完成一个外围工具扫描 Oracle 数据库中已存在的存储过程，并将其根据 openGauss 支持的存储过程语法进行自动转换改写，输出改写后的存储过程。要求存储过程的业务逻辑不发生任何变化，且可以在 openGauss 中正常运行。

**项目导师：** 洪日华

**项目申请：** <https://summer.iscas.ac.cn/#/org/prodetail/210320486?lang=chi>

<hr/>

**项目标题：** **开源数据库图形化工具 dbeaver 对于 openGauss 的兼容性增强**

**项目描述：** dbeaver 是技术人员在访问数据库时比较流行的开源图形化工具，https://github.com/dbeaver/dbeaver 但是目前 dbeaver 中只是支持了 PostreSQL，而并未支持 openGauss，虽然使用兼容的 driver，让 dbeaver 以为连接的数据库是 PostgreSQL 一样来访问 openGauss，目前也是可以的。但是因为没有专门的 openGauss for dbeaver 的 driver，因此比如像 openGauss 自己实现的分区表，在 dbeaver 中就无法正确认识并进行管理。 编写专门的 openGauss driver for dbeaver 是本项目的要达到的目标。

**项目导师：** 浦晟

**项目申请：** <https://summer.iscas.ac.cn/#/org/prodetail/210320487?lang=chi>

<hr/>

**项目标题：** **支持 Ansible 部署 openGauss**

**项目描述：** Ansible 作为当前流行的自动化运维工具，基于 Python 开发，集合了众多运维工具（puppet、chef、func、fabric）的优点，实现了批量系统配置、批量程序部署、批量运行命令等功能。Ansible 通过 Ansible Module 进行扩展，已经可以对接多个主流软件，本项目通过开发一个基于 openGauss 的 Ansible Module 来完成自动化部署 openGauss。

**项目导师：** 钟君

**项目申请：** <https://summer.iscas.ac.cn/#/org/prodetail/210320488?lang=chi>

<hr/>

**项目标题：** **openGauss 支持 Spark 对接**

**项目描述：** 完成 Spark 对接 openGauss 的验证，在 openGauss 上游完善 JDBC 等周边生态对接能力。

**项目导师：** 姜逸坤

**项目申请：** <https://summer.iscas.ac.cn/#/org/prodetail/210320489?lang=chi>

#### 活动指南

如果您是学生，请查看[学生指南](https://summer.iscas.ac.cn/help/student/)。

如果您是导师，请查看[导师指南](https://summer.iscas.ac.cn/help/mentor/)。

更多详情，请查看[暑期 2021 官网](https://summer.iscas.ac.cn/)。

#### 活动交流

欢迎添加下方 openGauss 社群小助手微信，备注“暑期 2021”，加入暑期 2021 openGauss 项目交流群，进行实时在线交流与讨论。
