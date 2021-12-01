+++
title = "支持工具"
bgImg = "../img/breadcrumbs/support_tools_bg.png"
moImg = "../img/breadcrumbs/support_tools_mo.png"
code = "源码地址"
weblink = "官网地址"
guidance = "操作指导"
headtitle = "openGauss支持工具全景图"
headdesc = "主要面向开发者和ISV，提供六大类开发工具客户端工具、数据导入导出工具、数据复制/同步工具、监控运维接口及工具集、备份恢复接口及工具集、通用数据框架。"
panorama = "/img/supportTools/support-panorama-zh.png"

[[list]]
identification = "connectors"
name = "标准SQL及驱动"

[[list]]
identification = "middleware"
name = "数据访问中间件"

[[list]]
identification = "management"
name = "集群管理软件"

[[list]]
identification = "migrationTools"
name = "数据导入导出工具"

[[list]]
identification = "dataTools"
name = "数据复制/同步工具"

[[list]]
identification = "dataModel"
name = "运行视图"

[[list]]
identification = "clientTools"
name = "客户端工具"

[[list]]
identification = "devOpsTools"
name = "监控运维系统"

[[list]]
identification = "kernelExtensions"
name = "内核扩展"


[[cards]]
iden = "connectors"
name = "psycopg2"
desc = "openGauss Python驱动（仅限Linux）"
address = "https://gitee.com/opengaussorg/dashboard/projects/opengauss/openGauss-connector-python-psycopg2/"
guide = "https://www.psycopg.org/docs/"
weight = 1

[[cards]]
iden = "connectors"
name = "py-og"
desc = "openGauss Python驱动（纯Python，可跨平台）"
address = "https://gitee.com/opengauss/openGauss-connector-python-pyog"
guide = "https://magicstack.github.io/asyncpg/current/"
weight = 2

[[cards]]
iden = "connectors"
name = "go-pq"
desc = "openGauss Go语言驱动"
address = "https://e.gitee.com/opengaussorg/repos/opengauss/openGauss-connector-go-pq"
guide = "https://gitee.com/opengauss/openGauss-connector-go-pq/blob/master/README.cn.md"
weight = 3

[[cards]]
iden = "middleware"
name = "ShardingSphere"
desc = "分布式数据库中间件"
address = "https://github.com/apache/shardingsphere"
guide = "https://shardingsphere.apache.org/document/current/en/overview/"
weight = 1

[[cards]]
iden = "middleware"
name = "HAProxy"
desc = "数据库读写负载均衡"
address = "https://github.com/haproxy/haproxy"
guide = "https://www.haproxy.com/blog/webinar-introduction-to-haproxy/"
weight = 2

[[cards]]
iden = "middleware"
name = "vip-manager"
desc = "自动IP故障转移"
address = "https://github.com/cybertec-postgresql/vip-manager"
guide = "https://github.com/cybertec-postgresql/vip-manager#Configuration"
weight = 3


[[cards]]
iden = "management"
name = "Kubernetes"
desc = "一个开源的容器集群管理平台"
address = "https://github.com/kubernetes/kubernetes"
guide = "https://kubernetes.io/docs/home/"
weight = 1

[[cards]]
iden = "management"
name = "Patroni"
desc = "自动主备切换，提升数据库可用性"
address = "https://github.com/zalando/patroni"
guide = "https://patroni.readthedocs.io/en/latest/"
weight = 2


[[cards]]
iden = "migrationTools"
name = "Ora2Pg"
desc = "Oracle到PostgreSQL数据迁移工具"
address = "https://gitee.com/opengauss/openGauss-tools-ora2og"
guide = "https://gitee.com/opengauss/openGauss-tools-ora2og/blob/master/README.md"
weight = 1

[[cards]]
iden = "migrationTools"
name = "pg_chameleon"
desc = "MySQL到PostgreSQL数据迁移工具"
address = "https://gitee.com/opengauss/openGauss-tools-chameleon"
guide = "https://gitee.com/opengauss/openGauss-tools-chameleon/blob/master/chameleon%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97.pdf"
weight = 2

[[cards]]
iden = "migrationTools"
name = "pgloader"
desc = "一个数据导入工具，使用COPY命令将数据导入到PostgreSQL"
address = "https://gitee.com/opengauss/openGauss-tools-loader"
guide = "https://gitee.com/opengauss/openGauss-tools-loader/blob/master/pgloader%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97.pdf"
weight = 3

[[cards]]
iden = "dataTools"
name = "JdbcPgBackup"
desc = "基于Java的跨平台数据导入导出工具，类似于pg_dump/pg_restore"
address = "https://github.com/tig100/JdbcPgBackup"
weight = 1

[[cards]]
iden = "dataTools"
name = "Database-Sync"
desc = "基于Java开发，功能强大、配置灵活的数据库之间同步工具"
address = "https://github.com/GongDexing/database-sync"
weight = 2

[[cards]]
iden = "dataTools"
name = "Debezium"
desc = "为捕获数据更改（Change Data Capture, CDC）提供了一个低延迟的流式处理平台"
address = "https://github.com/debezium/debezium"
guide = "https://opengauss.org/zh/blogs/blogs.html?post/lihongda/debezium-adapt-opengauss/"
weight = 3

[[cards]]
iden = "dataModel"
name = "PowerDesigner"
desc = "灵活的分析和设计特性允许使用一种结构化的方法有效地创建数据库或数据仓库"
address = "https://www.sap.com/products/database-data-management.html"
guide = "https://opengauss.org/zh/blogs/blogs.html?post/wangrui/powerdesigner_for_opengauss/"
website = true
weight = 1

[[cards]]
iden = "clientTools"
name = "DBeaver"
desc = "开源多数据库客户端工具"
address = "https://github.com/dbeaver/dbeaver"
guide = "https://opengauss.org/zh/blogs/blogs.html?post/justbk/2020-10-30_dbeaver_for_opengauss/"
weight = 1

[[cards]]
iden = "clientTools"
name = "Data Studio"
desc = "openGauss官方客户端工具"
address = "https://opengauss.org/zh/"
guide = "https://opengauss.org/zh/download.html"
website = true
weight = 2

[[cards]]
iden = "devOpsTools"
name = "Zabbix"
desc = "实时监控的IT组件和服务,监控数据库需要额外适配"
address = "https://github.com/zabbix/zabbix"
guide = "https://opengauss.org/zh/blogs/blogs.html?post/justbk/2021-03-03_zabbix_for_opengauss/"
weight = 1

[[cards]]
iden = "devOpsTools"
name = "Prometheus"
desc = "开源监控系统，在记录纯数字时间序列方面表现非常好"
address = "https://github.com/prometheus/prometheus"
guide = "https://prometheus.io/docs/introduction/overview/"
weight = 2


[[cards]] 
iden = "kernelExtensions"
name = "禹贡"
desc = "提供专业的GIS（Geographic Information System）能力"
address = "https://gitee.com/opengauss/Yukon"
guide = "https://yukon.supermap.io/" 
weight = 1   

+++