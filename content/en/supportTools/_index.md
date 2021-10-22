+++
title = "Support Tools"
bgImg = "../img/breadcrumbs/support_tools_bg.png"
moImg = "../img/breadcrumbs/support_tools_mo.png"
code = "Source Code"
weblink = "Official Website"
guidance = "Operation Guide"
headtitle = "openGauss Support Tools Panorama"
headdesc = "Mainly for developers and ISVs, it provides six categories of development tools: DataBase Client Tools, Data Import & Export Tool, Data Replication & Synchronization Tool, Monitoring Operation & Maintenance Interface and Tools, Backup & Recovery Interface and Tools, and Common Data Processing Framework."
panorama = "/img/supportTools/support-panorama-en.png"

[[list]]
identification = "connectors"
name = "Connectors"

[[list]]
identification = "middleware"
name = "Middleware"

[[list]]
identification = "management"
name = "Cluster management"

[[list]]
identification = "migrationTools"
name = "Migration Tools"

[[list]]
identification = "dataTools"
name = "Data Synchronization tools"

[[list]]
identification = "dataModel"
name = "Data Model"

[[list]]
identification = "clientTools"
name = "Client Tools"

[[list]]
identification = "devOpsTools"
name = "Monitor&DevOps Tools"
[[cards]]
iden = "connectors"
name = "jdbc"
desc = "the openGauss java Driver"
address = "https://gitee.com/opengauss/openGauss-connector-jdbc"
guide = "https://opengauss.org/zh/docs/latest/docs/Developerguide/%E5%9F%BA%E4%BA%8EJDBC%E5%BC%80%E5%8F%91.html"
weight = 1

[[cards]]
iden = "connectors"
name = "odbc"
desc = "the openGauss odbc Driver"
address = "https://gitee.com/opengauss/openGauss-connector-odbc"
guide = "https://opengauss.org/zh/docs/latest/docs/Developerguide/%E5%9F%BA%E4%BA%8EODBC%E5%BC%80%E5%8F%91.html"
weight = 1

[[cards]]
iden = "connectors"
name = "psycopg2"
desc = "the openGauss python Driver(linux only)"
address = "https://gitee.com/opengaussorg/dashboard/projects/opengauss/openGauss-connector-python-psycopg2/"
guide = "https://www.psycopg.org/docs/"
weight = 1

[[cards]]
iden = "connectors"
name = "py-og"
desc = "the openGauss pure python Driver(multi os support)"
address = "https://gitee.com/opengauss/openGauss-connector-python-pyog"
guide = "https://magicstack.github.io/asyncpg/current/"
weight = 2

[[cards]]
iden = "connectors"
name = "go-pq"
desc = "the openGauss go driver"
address = "https://gitee.com/opengauss/openGauss-connector-go-pq"
guide = "https://gitee.com/opengauss/openGauss-connector-go-pq/blob/master/README.en.md"
weight = 3

[[cards]]
iden = "connectors"
name = "nodejs"
desc = "the openGauss nodejs driver"
address = "https://gitee.com/opengauss/openGauss-connector-nodejs"
guide = "https://gitee.com/opengauss/openGauss-connector-nodejs#opengauss-connector-nodejs"
weight = 3

[[cards]]
iden = "middleware"
name = "shardingSphere"
desc = "distributed database middleware"
address = "https://gitee.com/opengauss/openGauss-distributed-solutions"
guide = "https://opengauss.org/zh/blogs/blogs.html?post/justbk/2021-08-31_shardingsphere_for_opengauss/"
weight = 1

[[cards]]
iden = "middleware"
name = "HAProxy"
desc = "database read / write load balancing"
address = "https://github.com/haproxy/haproxy"
guide = "https://www.haproxy.com/blog/webinar-introduction-to-haproxy/"
weight = 2


[[cards]]
iden = "management"
name = "Kubernetes"
desc = "open source container management platform"
address = "https://github.com/kubernetes/kubernetes"
guide = "https://kubernetes.io/docs/home/"
weight = 1

[[cards]]
iden = "management"
name = "Patroni"
desc = "Automatic primary / standby switching to improve database availability"
address = "https://gitee.com/opengauss/openGauss-distributed-solutions/tree/master/patroni-for-openGauss"
guide = "https://opengauss.org/zh/blogs/blogs.html?post/xuemengen/patroniforopengauss/"
weight = 2


[[cards]]
iden = "migrationTools"
name = "Ora2og"
desc = "database migration tools from oracle to openGauss"
address = "https://gitee.com/opengauss/openGauss-tools-ora2og"
guide = "https://mp.weixin.qq.com/s/hMqaSes0hQvzmJw0kmXDtg"
weight = 1

[[cards]]
iden = "migrationTools"
name = "opengauss-tools-chameleon"
desc = "database migration tools from mysql to openGauss"
address = "https://gitee.com/opengauss/openGauss-tools-chameleon"
guide = "https://gitee.com/opengauss/openGauss-tools-chameleon#opengauss-tools-chameleon"
weight = 2

[[cards]]
iden = "migrationTools"
name = "openGauss-tools-loader"
desc = "A data import tool that uses the copy command to import data into openGauss"
address = "https://gitee.com/opengauss/openGauss-tools-loader"
guide = "https://gitee.com/opengauss/openGauss-tools-loader#opengauss-tools-loader"
weight = 3

[[cards]]
iden = "dataTools"
name = "openGauss-tools-backup"
desc = "Java based multi-platform data import and export tool, similar to pg_ dump/pg_ restore"
address = "https://gitee.com/opengauss/openGauss-tools-backup"
weight = 1

[[cards]]
iden = "dataTools"
name = "Database-sync"
desc = "a powerful and flexible database synchronization tool developed based on Java"
address = "https://github.com/GongDexing/database-sync"
weight = 2

[[cards]]
iden = "dataTools"
name = "Debezium"
desc = "It provides a low latency streaming processing platform for change data capture (CDC)"
address = "https://github.com/debezium/debezium"
guide = "https://opengauss.org/zh/blogs/blogs.html?post/lihongda/debezium-adapt-opengauss/"
weight = 3

[[cards]]
iden = "dataTools"
name = "yugong"
desc = "To Oracle data migration synchronization tool (full + incremental, target support MySQL / DRDS)"
address = "https://github.com/alibaba/yugong"
guide = "https://github.com/alibaba/yugong/wiki/QuickStart"
weight = 4

[[cards]]
iden = "dataModel"
name = "powerDesigner"
desc = "Flexible analysis and design features allow you to effectively create a database or data warehouse using a structured approach"
address = "https://www.sap.com/products/database-data-management.html"
guide = "https://opengauss.org/zh/blogs/blogs.html?post/wangrui/powerdesigner_for_opengauss/"
website = true
weight = 1

[[cards]]
iden = "clientTools"
name = "Dbeaver"
desc = "Open source multi database client tool"
address = "https://github.com/dbeaver/dbeaver"
guide = "https://opengauss.org/zh/blogs/blogs.html?post/justbk/2020-10-30_dbeaver_for_opengauss/"
weight = 1

[[cards]]
iden = "clientTools"
name = "Data Studio"
desc = "Opengauss official client tool"
address = "https://opengauss.org/zh/"
guide = "https://opengauss.org/zh/download.html"
website = true
weight = 2

[[cards]]
iden = "devOpsTools"
name = "Zabbix"
desc = "It components and services for real-time monitoring, and the monitoring database needs additional adaptation"
address = "https://github.com/zabbix/zabbix"
guide = "https://opengauss.org/zh/blogs/blogs.html?post/justbk/2021-03-03_zabbix_for_opengauss/"
weight = 1

[[cards]]
iden = "devOpsTools"
name = "Prometheus"
desc = "The open source monitoring system performs very well in recording pure digital time series"
address = "https://github.com/prometheus/prometheus"
guide = "https://prometheus.io/docs/introduction/overview/"
weight = 2
+++