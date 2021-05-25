+++
tag = "summer"
bgImg = "/img/breadcrumbs/minisite_bg.png"
moImg = "/img/breadcrumbs/minisite_mo.png"
+++

#### 活动简介

开源软件供应链点亮计划 - 暑期 2021（以下简称 暑期 2021）是由中国科学院软件研究所与openEuler社区共同举办的一项面向高校学生的暑期活动，
旨在鼓励在校学生积极参与开源软件的开发维护，促进优秀开源软件社区的蓬勃发展。我们将联合各大开源社区，针对重要开源软件的开发与维护提供项目，并向全球高校学生开放报名。

学生自由选择项目，与社区导师沟通实现方案并撰写项目计划书。被选中的学生将在社区导师指导下，按计划完成开发工作，并将成果贡献给社区。根据项目的难易程度和完成情况，参与者将获取由主办方发放的项目奖金。

#### 活动计划

**05 月 24 日 - 06 月 13 日	学生提交项目申请阶段**

**06 月 30 日	项目申请审核结果公示**

07 月 01 日 - 08 月 15 日	项目研发第一阶段

08 月 30 日	项目中期考核结果公示

08 月 16 日 - 09 月 30 日	项目研发第二阶段

10 月 22 日	项目结项考核结果公示

11 月 上 旬	年度优秀项目公示

#### openGauss项目列表

openGauss社区深度参与暑期2021活动，当前已有**16**个openGauss相关的项目，欢迎广大学生朋友参与。

暑期2021 openGauss项目申请地址：<https://summer.iscas.ac.cn/#/org/orgdetail/opengauss?lang=chi>

<hr/>

**项目标题：** **openGauss统一审计支持时间范围限定**

**项目描述：** 审计机制是一种通过定制化制定审计策略而实现高效安全审计管理的一种技术。当管理员定义审计对象和审计行为后，用户执行的任务如果关联到对应的审计策略，则生成对应的审计行为，并记录审计日志。定制化审计策略可涵盖常见的用户管理活动，DDL和DML行为，满足日常审计诉求。 本赛题可以在原有统一审计基础之上增加时间范围限定，即不仅可以针对SQL来源(app、角色、IP)和具体操作行为定制审计策略，还可以把时间范围加入到审计策略中，比如DBA认为某个SQL操作在凌晨被触发是危险的，应该被纳入审计日志系统并记录以防止抵赖，那么可以创建此审计策略只关联凌晨1:00~2:00, 其他时间段内的同SQL则不会被触发记录审计日志。本赛题通过对既有安全特性进行增加，不仅可以加深对数据库内核开发的掌握，而且可以提升数据库安全模型的理解。

**项目导师：** 刘海龙

**项目申请：** <https://summer.iscas.ac.cn/#/org/prodetail/210320474?lang=chi>

<hr/>

**项目标题：** **openGauss修复explain performance能力**

**项目描述：** explain performance 是openGauss提出的一种针对AP查询的性能追溯机制，通过支持explain performance实现对整个查询过程中CPU的消耗和内存的消耗，从而进行事后的查询能力分析，同时通过估算代价与实际实行耗时分析优化器的合理性。

**项目导师：** 周平高

**项目申请：** <https://summer.iscas.ac.cn/#/org/prodetail/210320475?lang=chi>

<hr/>

**项目标题：** **openGauss基于用户的权限管理视图**

**项目描述：** openGauss当前的ACL(Access Control List)信息主要是基于对象来进行权限信息查询，即数据库内核对象都被哪些用户所持有，以及持有某种对象；越来越多的运维场景下需要清晰的查询某个用户所持有的对象管理权限，通过监控用户的权限情况指定对应的安全管理策略。

**项目导师：** 宋荣荣

**项目申请：** <https://summer.iscas.ac.cn/#/org/prodetail/210320476?lang=chi>

<hr/>

**项目标题：** **openGauss fuzz测试工具增强**

**项目描述：** fuzz测试作为安全测试中的重要环节，可以帮助发现很多内存问题和core问题。目前开源社区上关于数据库fuzz测试的工具较少。其中sqlsmith可以构造较好的fuzz场景，通过简单适配，可以兼容openGauss数据库。但是目前工具在实际使用时会产生大量无效的sql语句，并且场景较为单一。基本不涉及DDL语句。如何增加DDL语法和提高生成sql语句的有效性和复杂性，是比较重要的议题。

**项目导师：** 熊建豪

**项目申请：** <https://summer.iscas.ac.cn/#/org/prodetail/210320477?lang=chi>

<hr/>

**项目标题：** **openGauss支持节点替换/节点修复功能**

**项目描述：** 集群由多个主机构成，当其中一台或者多台主机或者实例发生故障时，为保证系统可靠性，提供故障修复工具，支持在原主机上修复实例，也支持替换成新的主机加入到集群中，整个过程保证数据库正常服务，不会造成业务中断。

**项目导师：** 曹东升

**项目申请：** <https://summer.iscas.ac.cn/#/org/prodetail/210320478?lang=chi>

<hr/>

**项目标题：** **openGauss新增一个兼容Oracle的Number自定义类型**

**项目描述：** openGauss在实际应用中，会涉及到原有Oracle、mysql应用的移植，客户希望的是尽量少的SQL修改，因此在SQL语句层面，本题以兼容Oracle的NUMBER类型为例，新增NUMBER类型后，支持在create table、alter table中使用NUMBER类型。

**项目导师：** 胡英豪

**项目申请：** <https://summer.iscas.ac.cn/#/org/prodetail/210320479?lang=chi>

<hr/>

**项目标题：** **openGauss新增一个Insert特殊语法**

**项目描述：** 在insert into tablename values(1,2)语法中，支持以下语法：insert into tablename values(1,2),(3,4) ,可一次性插入多条数据。

**项目导师：** 胡英豪

**项目申请：** <https://summer.iscas.ac.cn/#/org/prodetail/210320480?lang=chi>

<hr/>

**项目标题：** **基于openGauss的libpq或者odbc封装一套C++接口**

**项目描述：** 基于openGauss的libpq或者odbc封装一套C++接口，实现语句的执行和参数的绑定，接口的规范参考Oracle的OCCI。

**项目导师：** 刘勇生

**项目申请：** <https://summer.iscas.ac.cn/#/org/prodetail/210320481?lang=chi>

<hr/>

**项目标题：** **openGauss兼容支持Oracle的正则表达式规则**

**项目描述：** 利用openGauss内部支持的正则表达式规则，兼容支持Oracle的REGEXP_COUNT、REGEXP_INSTR、REGEXP_SUBSTR； --REGEXP_COUNT select regexp_count ('The pro-niece was born today, so exciting.', 'a') "Count 'a'" from dual; --REGEXP_INSTR SELECT REGEXP_INSTR ('Itmyhome', 'a|i|o|e|u') FROM dual; --REGEXP_SUBSTR SELECT REGEXP_SUBSTR('34,56,-23','[^,]+',1,1,'i') AS STR FROM DUAL;

**项目导师：** 胡英豪

**项目申请：** <https://summer.iscas.ac.cn/#/org/prodetail/210320482?lang=chi>

<hr/>

**项目标题：** **openGauss gsql工具支持自定义sql结束符**

**项目描述：** openGauss的gsql工具普通sql结束的标志是;分号，通过对gsql的修改，可支持将结束符定义为其他符号，比如#号，或者以多个符号为标志的结束符:##

**项目导师：** 犹广阔

**项目申请：** <https://summer.iscas.ac.cn/#/org/prodetail/210320483?lang=chi>

<hr/>

**项目标题：** **openGauss支持行存压缩**

**项目描述：** openGauss当前仅在列存引擎中支持数据压缩，行存储引擎的压缩功能刚启动开发。因为行存储引擎主要应用场景为OLTP在线交易型场景，对时延敏感，因此行存引擎的压缩需要在尽量降低对系统性能影响的前提下，获得更好的压缩效果。

**项目导师：** 林科旭

**项目申请：** <https://summer.iscas.ac.cn/#/org/prodetail/210320484?lang=chi>

<hr/>

**项目标题：** **openGauss支持Learned Index**

**项目描述：** 使用Learned Index最新学术成果，替换openGuass的B+Tree索引，达成大幅降低索引内存空间占用的目的。

**项目导师：** 张程伟

**项目申请：** <https://summer.iscas.ac.cn/#/org/prodetail/210320485?lang=chi>

<hr/>

**项目标题：** **openGauss兼容Oralce存储过程的语法**

**项目描述：** 当openGauss尝试替代原先运行在Oracle数据库中的应用时，一个急需解决的问题，就是对Oracle存储过程的兼容性。本项目期望达到的目标是：原先运行在Oracle数据库内部的存储过程可以允许代码开发人员不人工修改/或者极少人工修改就能够直接运行在openGauss数据库内。 作为该项目的实现，可以完成一个外围工具扫描Oracle数据库中已存在的存储过程，并将其根据openGauss支持的存储过程语法进行自动转换改写，输出改写后的存储过程。要求存储过程的业务逻辑不发生任何变化，且可以在openGauss中正常运行。

**项目导师：** 洪日华

**项目申请：** <https://summer.iscas.ac.cn/#/org/prodetail/210320486?lang=chi>

<hr/>

**项目标题：** **开源数据库图形化工具dbeaver对于openGauss的兼容性增强**

**项目描述：** dbeaver是技术人员在访问数据库时比较流行的开源图形化工具，https://github.com/dbeaver/dbeaver 但是目前dbeaver中只是支持了PostreSQL，而并未支持openGauss，虽然使用兼容的driver，让dbeaver以为连接的数据库是PostgreSQL一样来访问openGauss，目前也是可以的。但是因为没有专门的openGauss for dbeaver的driver，因此比如像openGauss自己实现的分区表，在dbeaver中就无法正确认识并进行管理。 编写专门的openGauss driver for dbeaver是本项目的要达到的目标。

**项目导师：** 浦晟

**项目申请：** <https://summer.iscas.ac.cn/#/org/prodetail/210320487?lang=chi>

<hr/>

**项目标题：** **支持Ansible部署openGauss**

**项目描述：** Ansible作为当前流行的自动化运维工具，基于Python开发，集合了众多运维工具（puppet、chef、func、fabric）的优点，实现了批量系统配置、批量程序部署、批量运行命令等功能。Ansible通过Ansible Module进行扩展，已经可以对接多个主流软件，本项目通过开发一个基于openGauss的Ansible Module来完成自动化部署openGauss。

**项目导师：** 钟君

**项目申请：** <https://summer.iscas.ac.cn/#/org/prodetail/210320488?lang=chi>

<hr/>

**项目标题：** **openGauss支持Spark对接**

**项目描述：** 完成Spark对接openGauss的验证，在openGauss上游完善JDBC等周边生态对接能力。

**项目导师：** 姜逸坤

**项目申请：** <https://summer.iscas.ac.cn/#/org/prodetail/210320489?lang=chi>


#### 活动指南

如果您是学生，请查看[学生指南](https://summer.iscas.ac.cn/help/student/)。

如果您是导师，请查看[导师指南](https://summer.iscas.ac.cn/help/mentor/)。

更多详情，请查看[暑期2021官网](https://summer.iscas.ac.cn/)。

#### 活动交流

欢迎添加下方openGauss社群小助手微信，备注“暑期2021”，加入暑期2021 openGauss项目交流群，进行实时在线交流与讨论。
