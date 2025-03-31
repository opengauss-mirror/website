---
title: 'openGauss 7.0.0-RC1 版本正式发布'
date: '2025-03-31'
tags: ['theme']
category: 'news'
banner: '/category/news/2024-03-31/banner.jpg'
author: 'openGauss'
summary: 'openGauss 7.0.0-RC1 版本正式发布'
---

openGauss 7.0.0-RC1 是社区最新发布的创新版本，版本生命周期为 0.5 年。本次发布包含 2 个数据库服务端安装版本：企业版、轻量版，用户可根据使用场景需要下载不同版本，并基于此进行场景化验证，提前发现问题并反馈社区，社区将在下个 LTS 版本发布前进行问题修复。

发行说明请参考官网： [https://docs.opengauss.org/zh/docs/latest/docs/ReleaseNotes/Releasenotes.html](https://docs.opengauss.org/zh/docs/latest/docs/ReleaseNotes/Releasenotes.html)

立即体验 openGauss 7.0.0-RC1 版本! [https://opengauss.org/zh/download/](https://opengauss.org/zh/download/)

openGauss 作为国内最具创新力的开源数据库社区，汇聚了 7800 多名开发者的力量，持续进行技术创新。openGauss 7.0.0-RC1 自 2024 年 9 月 30 日启动版本开发，历时 6 个月开发周期，凝聚社区 696 名开发者，累计合入 PR 2562个，与之前版本特性功能保持兼容，在内核能力、DataVec 向量化能力、Datapod 三层资源池化架构、DataKit 数据全生命周期管理平台、生态兼容性等方面全面增强。

## 1.1内核能力增强

### 企业级特性

- 行存压缩功能增强：对行存表(包括Ustore和Astore)的数据和索引页面，openGauss提供基于通用压缩算法的透明页压缩功能，降低磁盘空间占用的同时保持OLTP场景下的高性能；支持页式存储和段页式存储两种模式。
- SQL功能增强：支持CROSS/OUTER APPLY JOIN语法，用于返回左侧表达式的每一行和右侧表达式的匹配行。CUME_DIST、DENSE_RANK、PERCENT_RANK、RANK函数支持任意类型的任意多个入参，在函数内的入参数据类型和ORDER BY的数据类型不一致时也支持执行。支持JSON_EXISTS、 JSON_TEXTCONTAINS表达式。支持修改/删除视图引用的对象（如表、列、函数、视图等）后，将视图置为无效状态。
- 存储过程功能增强：支持自定义subtype语法；支持EXCEPTION FOR自定义异常；支持在函数或者过程中创建过程。
- 其他增强：支持多个会话并发插入interval分区时，如果多个会话都涉及分区自动扩展动作，不会发生卡死问题。新增用于词法语法分析的openGauss SQL审计工具libog_query，支持离线审计分析SQL语句在openGauss中的语法合法性。CM/OM/DATAKIT工具中用到的SSH SCP等相关通信工具支持用户自定义端口，避免部分环境无法使用默认22端口的问题。OM工具支持记录升级历史记录。

## 1.2内核四高能力

### 高性能

- HTAP性能：传统主备部署模式下支持行列转换功能，备机支持列存查询，TPCH 100G基准环境，整体性能对比原始行存方式平均提升5x。
- SMP场景扩展：IUD场景下stream算子上移，提升并行效率，性能提升50%以上。生成计划时支持同步生成并行和非并行计划，避免由于并行计划实际不优而导致的性能下降问题。
- 子事务场景性能提升：Multixact相关的SLRU buffer大小支持可配置，同时通过SLRU分bank优化，提升大量子事务场景下的性能100%+。
- 基础算子性能：支持自动参数化，在需要反复执行相似/相同的SQL简单语句的情境下（仅支持IUD），通过复用执行计划缓存以减少SQL语句的执行时间。优化基础类型转换为字符串输出的场景性能提升。相关场景性能提升10%+。

### 高可用

- CM 集群管理组件支持在资源池化场景下，通过 CM检测reform阶段内核是否hang住。
- CM支持安装管理IPV6的数据库集群。
- DCC支持节点间数据build，支持通过cm_ctl触发build操作，解决CMS节点DCC不一致引发的CMS状态异常问题。

### 高智能

支持智能慢SQL查询诊断，快速定位慢SQL根因。根据内置知识库，图形化展示各项指标分析情况，有效地帮助运维人员迅速定位问题，运维效率倍数提升

### 高安全

- 支持禁止非owner用户远程执行DDL操作。

## 1.3DataVec 向量化能力增强，助力AI智能应用

openGauss DataVec向量数据库结合鲲鹏RAG一体机解决方案，通过量化加速、向标融合等技术，解决DeepSeek等大模型“知识幻觉”问题，提升LLM大语言模型在回答问题的实时性和准确性，提升检索性能，极大提升效率。

### 支持容器化部署

openGauss支持容器化部署与运行，支持不同环境下快速迁移验证，DataVec向量数据库可在容器化部署上快速使能。

### 支持向量类型存储

DataVec将向量类型存储能力集成至openGauss内核，支持单精度浮点向量vector、位向量bit、稀疏向量sparsevec，最高可支持64000维。

### 支持向量索引构建

DataVec支持多种向量索引，以满足不同使用场景下检索需求。支持IVF-FLAT倒排索引、HNSW图索引、IVF-PQ量化压缩索引、HNSW-PQ量化压缩加速索引。向量索引均支持并行构建，提升处理大规模数据集的效率。

### Boostkit量化加速

openGauss DataVec 深度结合鲲鹏硬件，通过量化压缩算法、Rerank精排、向量化指令加速等软硬协同技术，加速向量检索进程。

### 向标融合查询

openGauss DataVec还能够同时处理标量数据（如数值、类别）和向量数据（如文本、音视频）。这种混合查询的支持使得用户可以在同一个查询中结合不同类型的数据，从而实现更复杂和精细的分析。

## 1.4DataPod 三层资源池化架构持续创新

### 支持虚拟机方式部署

资源池化集群支持部署在DCS虚机以及云虚拟化机器上。

### 支持xlog日志合一

单、双集群下每个节点不再区分对应的xlog日志，解决切主后xlog浪费空间，以及备机不回收xlog的问题。

### 实时构建支持流控

支持当备机实时构建速度较慢时，需要放缓主机业务，保证最后RTO时间满足预设要求。

### 支持主备参数同步

支持同步资源池化场景下主备的配置参数。

### 支持页式存储

资源池化支持页式、段页式存储共存，对于段页式支持的特性，建表时直接创建为段页式表；对于段页式不支持的特性，建表时候自动创建为非段页式表，用户无感知。

### 支持双集群缩容至单集群

支持在网络复制、存储复制情况下，由资源池化双集群缩容至单集群。

### 支持归档

资源池化单集群支持归档，支持备份恢复及通过归档的XLOG恢复数据、PITR。

### 可维护性增强

支持查看mes线程的信息：基于pg_thread_wait_status视图进行增强，可以支持查看mes线程的信息，支持查看当前资源池化流程正在请求、失效的页面等信息。

轻量级锁视图：实现gs_lwlock_status函数，能够查看轻量级锁的等锁持锁信息，当前有多少轻量级锁正在等待、被持有、持有会话、轻量级锁详细信息（唯一id、名称、持锁时间）等。

DMS申请的内存监控视图：pg_total_memory_detail、gs_shared_memory_detail、gs_thread_memory_context、dbe_perf.track_memory_context_detail等视图支持监控DMS申请的内存使用情况。

## 1.5DataKit数据全生命周期管理工具能力增强

### 录制回放功能增强

- 支持录制回放的结果对比，支持每条SQL录制回放的结果对比。
- 支持录制和回放流程流式处理。
- 支持采集openGauss流量。
- 录制回放工具集成到Datakit

### 迁移能力

- 支持PostgreSQL到openGauss的迁移能力（暂未集成至datakit，提供单独的二进制工具）。
- 易用性增强，支持实时收集后端各个迁移过程中的异常、告警等信息并展示到前端页面上。

### 安装部署

提升对 DataKit 资源中心和集群安装的易用性：

- 支持添加IPV6实例。
- 安装过程解除对root权限的依赖。

### 对象管理

- 支持保存和引用代码片段。
- 支持数据库对象授权/撤销能力。
- 结果页新增导出结果按钮、新增文本框来展示当前执行的sql。

## 1.6生态兼容性增强

### MySQL 兼容

- 兼容 no_auto_value_on_zero配置，当遇到往自增字段插入0值时，检查该参数，从而确认插入0值，还是插入自增值。
- 兼容MySQL JDBC的连接参数tinyInt1isBit、transformedBitIsBoolean、useOldAliasMetadataBehavior。
- 支持RENAME TABLES语法。

### 其他生态

- 提供noLSE企业版安装包，用于在ARMv8.1以下的芯片上安装使用，解决相关芯片不支持LSE指令的问题。
- openEuler 24.03 SP1版本默认集成openGauss 6.0.0企业版，可通过yum install一键安装openGauss企业版（不包含MOT，OBS和codegen功能，以及OM、CM外部组件）
- 支持通过docker pull opengauss方式安装openGauss企业版（不含OM、CM）和轻量版。

## 1.7感谢社区所有开发者、伙伴、用户

我们衷心地感谢参与和协助 openGauss 7.0.0-RC1版本发布的项目的所有开发者和伙伴，包括华为、中移信息、海量数据、南大通用、粤港澳大湾区（广东）国创中心、云和恩墨、神舟通用、中国科学院软件研究所、兴业银行、民生银行、国能信息、邮储信息、联通数科、软通动力、易宝软件、中软国际、广发期货、浪潮云、天津凡泰、万宝盛华等组织单位。

openGauss 持续以用户真实需求为动力，致力于产品竞争力提升。我们特别感谢每一位用户对 openGauss 的支持，
openGauss 7.0.0-RC1 作为下一个长周期版本的先行体验版，也期待聆听每一位用户的反馈意见。

社区邮件列表：[community@opengauss.org](community@opengauss.org)
