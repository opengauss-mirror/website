---
title: 'openGauss Tools 7.0.0-RC3 版本更改工具发布包名公告'
date: '2026-01-27'
tags: ['theme']
category: 'news'
banner: ''
author: 'openGauss'
summary: 'openGauss Tools 7.0.0-RC3 版本更改工具发布包名公告'
---
### 致openGauss社区用户： 

<p style="text-indent: 2em;">为提升openGauss工具生态的标准化程度和用户体验，openGauss社区对Tools工具包的命名规范进行了重要优化。在7.0.0-RC3版本中，社区将正式实施统一的发布包命名规则。</p>


### 背景与目的：

此前，openGauss社区发布的多个迁移工具包存在命名规则不统一的情况，如：

mysql全量迁移 ：chameleon_7.0.0-RC2

pg全量迁移：oG_datasync_full_migration_7.0.0-RC2

增量迁移：replicate-mysql2openGauss_7.0.0-RC2 


这种命名不一致的情况给用户在识别、下载和使用工具时带来了不便。为解决这一问题，社区经过深入调研和讨论，制定了全新的标准化命名规范。


### 新命名方案：

经社区Tools SIG会议评审通过，自openGauss 7.0.0-RC3版本起，所有工具发布包将采用以下统一格式：

**openGauss-[工具名称]-[工具版本].tar.gz**

备注：工具名称采用小驼峰格式命名


**openGauss 7.0.0-RC3版本工具包名称更改如下：**

|   软件包  |   原包名   |   新包名  |
| :-----   | :----- | :-----|
| DataKit | Datakit-All-7.0.0-RC3.tar.gz | openGauss-Datakit-All-7.0.0-RC3.tar.gz |
| DataKit | Datakit-Mini-7.0.0-RC3.tar.gz | openGauss-Datakit-Mini-7.0.0-RC3.tar.gz |
| MySQL全量迁移 | chameleon-7.0.0rc3-py3-none-any.whl | openGauss-FullReplicate-MySQL2openGauss-7.0.0-RC3.tar.gz |
| PG/OG/SQLServer 全量迁移 | oG_datasync_full_migration-7.0.0rc3.tar.gz | openGauss-FullReplicate-7.0.0-RC3.tar.gz |
| 增量迁移 | replicate-mysql2openGauss-7.0.0rc3.tar.gz | openGauss-IncReplicate-MySQL2openGauss-7.0.0-RC3.tar.gz|
| 增量迁移 | replicate-openGauss2mysql-7.0.0rc3.tar.gz| openGauss-IncReplicate-openGauss2MySQL-7.0.0-RC3.tar.gz|
| 增量迁移 | replicate-postgresql2openGauss-7.0.0rc3.tar.gz| openGauss-IncReplicate-PostgreSQL2openGauss-7.0.0-RC3.tar.gz|
| 增量迁移 | replicate-openGauss2postgresql-7.0.0rc3.tar.gz| openGauss-IncReplicate-openGauss2PostgreSQL-7.0.0-RC3.tar.gz|
| 增量迁移 |  /  | openGauss-IncReplicate-openGauss2openGauss-7.0.0-RC3.tar.gz|
| 数据校验 |  gs_datacheck-7.0.0rc3.tar.gz  | openGauss-DataCheck-7.0.0-RC3.tar.gz|
| 录制回放 |  transcribe-replay-tool-7.0.0-RC3.tar.gz | openGauss-TranscribeReplay-7.0.0-RC3.tar.gz|


**新包名方案自openGauss 7.0.0-RC3版本起正式生效，之后的版本都使用新包名，历史的版本仍然沿用旧名称。**


openGauss社区将持续优化产品体验，感谢各位用户一直以来的支持与贡献。相信这次包名规范化将为用户带来更清晰、更便捷的工具使用体验。

<div style="text-align: right;">openGausss社区</div>
<div style="text-align: right;">2026年1月27日</div>



