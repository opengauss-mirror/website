---
title: 'openGauss社区二月运作报告'
date: '2023-03-10'
tags: ['theme']
category: 'news'
banner: '/category/news/2023-03-10/banner.png'
author: 'openGauss'
summary: 'openGauss社区二月运作报告'
---

前言：“草长莺飞二月天”，又是一年好时节。小编为大家整理了openGauss社区二月最新进展，欢迎阅读。

<div style="text-align:center;margin:24px 0;"><img src="/zh/news/2023-03-10/banner.png" style="width: 70%"></div>

### 社区治理

#### 品牌委员会

海量数据潘春宝先生加入openGauss品牌委员会，成为openGauss品牌委员会委员。

<div style="text-align:center;margin:24px 0;"><img src="/zh/news/2023-03-10/pic1.png" style="width: 10%"></div>

#### 用户委员会

华为黄贤儒先生、中国移动崔凯峰先生加入openGauss用户委员会，成为openGauss用户委员会委员。

<div style="text-align:center;margin:24px 0;"><img src="/zh/news/2023-03-10/pic2.png" style="width: 30%"></div>

### 技术进展

**openGauss社区官方容器镜像组织升级**

openGauss社区官方容器镜像组织升级了，新的镜像仓库地址为：<https://hub.docker.com/u/opengauss>，原有的opengaussofficial镜像仓库将停止维护并废弃。

**openGauss备份恢复管理系统batman发布**

openGauss社区运营团队推出openGauss备份恢复管理系统batman，支持openGauss实例的全量备份和增量备份、备份任务的周期调度执行以及备份恢复操作。

代码仓库地址：<https://gitee.com/opengauss/openGauss-batman>

**Tools SIG**

多个设计方案正在设计、优化，包括：

portal对接datakit 方案；

ODBC windows版本发布设计方案；

JDBC高可用优化需求设计方案；

CM支持容器化部署设计方案；

Debezium全量迁移支持对mysql对象的迁移；MySQL迁移工具适配内核兼容性设计方案。

**SQLEngine SIG** 

多个MySQL 语法兼容方案设计优化中，包括：MySQL 语法兼容-declare handler语法；MySQL 语法兼容-create table(col type) as设计；

MySQL兼容支持@host方式进行用户认证和鉴权设计以及兼容mysql lock tables语法设计；

MySQL 语法兼容-create trigger in schema设计/MySQL 语法兼容-force\use index语法checkin；

MySQL 语法兼容-select @var :=1 特性问题说明；

兼容Mysql lock tables语法check in.

**CM SIG** 

新增支持一键暂停、恢复CM服务能力，便于进行数据库运维操作；

支持事件触发器，目前可订阅start/stop/failover/swithover事件来触发用户自定义脚本；

支持配置vip的能力，vip随主切换。

 **Docs SIG**

Doc SIG全量文档结构重构；

**SecurityTechnology SIG**

TLCP支持方案正在开发中，导出加密的国密支持方案与TDE支持国密密码模块方案正在规划中。

**Plugin SIG**

多个兼容方案正在开发及优化中，包括：

create function语法兼容check-in；

外键关联非唯一索引的check-in；

MySQL兼容性-隐藏索引需求check-in；

MySQL兼容性-支持数据类型显式、隐式转换规则；

MySQL兼容性show status 详细状态来源系统表对比说明；

MySQL兼容性-binary 类型功能完善；

MySQL兼容性-列名敏感 设计MySQL兼容性-fulltext索引语法特性check-in；

支持视图、索引等语法带ALGORITHM选项设计文档；

支持视图、索引等语法带ALGORITHM选项chechin；

流引擎TimescaleDB与openGauss适配-插件修改执行计划树。

**OPS SIG**

评审可视化开发与运维平台中5.0.0版本的需求与技术方案，涉及智能运维模块下三个插件的新功能，包括：

实例监控：监控内容展示OS、数据库参数的展示和建议，集成WDR内容；

日志检索：增加上下文关联搜索功能；

SQL诊断：增加OS、数据库参数的检查和建议。

**StorageEngine SIG**

主备复制中备库存在apply延迟的情况下解决方案、备机支持执行写操作；

MOT特性增强；

数据库升级后的元数据校验工具校验； 

兼容Mysql lock tables语法和功能设计；

分区表操作分区。

**QA SIG**

openGauss 5.0.0测试方案初审通；

openGauss兼容Mysql JSON函数测试报告评审通过；

可视化开发与运维平台-业务开发（Web Data Studio）测试报告评审，评审意见闭环后可通过；可视化开发与运维平台-智能诊断-SQL诊断、日志检索测试报告评审，评审意见闭环后可通过；

可视化开发与运维平台-智能诊断-实例监控测试报告评审，评审意见闭环后可通过；

MySQL兼容-全文索引测试方案评审通过；

MySQL兼容-非唯一索引创建外键测试方案评审通过；

MySQL兼容-lock tables函数测试方案评审通过。

**ReleaseManagement SIG**

1. openGauss 3.0.3补丁版本已经发布，社区官网可以下载二进制版本，具体合入需求和修复问题见发行说明：<https://www.opengauss.org/zh/blogs/opengauss_release/3.0.3%E7%89%88%E6%9C%AC%E5%8F%91%E8%A1%8C%E8%AF%B4%E6%98%8E.html>

2. openGauss 3.1.1公测版本已经发布，测试发现问题可以通过issue提到社区企业看板3.1.1项目下；

3. openGauss 5.0.0版本需求已录入项目需求看板<https://e.gitee.com/opengaussorg/projects/477260/requirements/kanban/states>，社区各家伙伴将共同保障按照计划完成测试验收，有问题请及时在RM Sig提出；

4. openGauss 5.0.0版本release-plan已经制定迭代1（1月3日~1月31日），迭代2（2月1日~2月28日），版本集成测试（3月1日~3月21日），版本发布准备及评审（3月22日~3月31日）详细计划：<https://gitee.com/opengauss/release-management/blob/master/openGauss%205.0.0/release-plan.md>

5. 5.0.0版本在3月3日进入SIT测试，请社区各家伙伴和开发者提前进行版本测试和适配，发现的缺陷问题请提交到社区5.0.0项目缺陷看板下。

### 社区活动

**例行周四openGauss视频号技术直播 ：**

openGauss在2月进行了四次例行技术直播分享活动，错过的朋友可以通过openGauss视频号进行观看，更多学习视频可以通过登录B站openGauss账号或openGauss官网观看。

### 社区活力

**社区下载量、贡献者持续增长**

截至2月28日，openGauss社区用户下载量达到115w, 遍及108个国家的1000个城市。社区用户达到60K+，4.4K+的贡献者在社区持续做出贡献，累计产生9.9K+ Issue、9.6K+ PR、159.5K+Comment. 

**加入社区组织达到230+**

杭州默安科技、甘肃华科信息技术、 智麟科技、四川精容数安科技、浩联云（广东）科技、中国移动信息技术中心 、北京奇点数智科技、北京线性叠加科技、北京深思软件、上海艾融软件等企业签署CLA(Contribution License Agreement, 贡献许可协议）加入社区，截止目前，共建社区的组织单位成员达到231家。

### 基础设施

**openGauss 3.1.0提供中文离线文档下载**

openGauss 3.1.0提供中文离线文档下载：

<https://docs.opengauss.org/zh/docs/3.1.0/docs/BriefTutorial/BriefTutorial.html>

**openGauss提供个人账号注册登录下载软件包**

openGauss 提供个人账号注册登录下载软件包，欢迎体验：

<https://www.opengauss.org/zh/download/>

### 社区荣誉

**openGauss社区再次入选“科创中国”开源创新榜**

2月20日，在2023“科创中国”年度会议上，中国科协正式发布了2022年“科创中国”系列榜单。openGauss开源社区入选“科创中国”开源创新榜年度优秀开源社区，这也是openGauss开源社区连续两年入选该榜单。

<div style="text-align:center;margin:24px 0;"><img src="/zh/news/2023-03-10/pic3.png" style="width: 70%"></div>

**openGauss企业级开源数据库获IT168 2022年度创新产品奖！**

开源社区是openGauss的重要创新平台，提供openGauss与开发者、用户、产业伙伴联接的桥梁。openGauss以社区为依托，联合产业链上下游共同创新，孵化新技术、推广新产品、落地新方案。从水平扩展能力半径，持续提供领先的技术产品；垂直丰富应用场景，不断提升满足行业核心应用的需求。

<div style="text-align:center;margin:24px 0;"><img src="/zh/news/2023-03-10/pic4.png" style="width: 70%"></div>