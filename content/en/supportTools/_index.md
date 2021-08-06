+++
title = "Support Tools"
bgImg = "../img/breadcrumbs/support_tools_bg.png"
moImg = "../img/breadcrumbs/support_tools_mo.png"
code = "Source Code"
weblink = "Official Website"
guidance = "Operation Guide"

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
name = "psycopg2"
desc = "the openGauss python Driver(linux only)"
address = "https://gitee.com/opengaussorg/dashboard/projects/opengauss/openGauss-connector-python-psycopg2/"
guide = "https://www.psycopg.org/docs/"
weight = 1

[[cards]]
iden = "connectors"
name = "py-og"
desc = "the openGauss pure python Driver(multi os support)"
address = "https://gitee.com/opengaussorg/dashboard/projects/opengauss/openGauss-connector-python-psycopg3/"
guide = "https://magicstack.github.io/asyncpg/current/"
weight = 2

[[cards]]
iden = "connectors"
name = "go-pq"
desc = "the openGauss go driver"
address = "https://gitee.com/opengaussorg/dashboard/projects/opengauss/openGauss-connector-python-psycopg4/"
guide = "https://pkg.go.dev/github.com/lib/pq"
weight = 3

[[cards]]
iden = "middleware"
name = "shardingSphere"
desc = "distributed database middleware"
address = "https://github.com/apache/shardingsphere"
guide = "https://shardingsphere.apache.org/document/current/en/overview/"
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
name = "Kubernates"
desc = "open source container management platform"
address = "https://github.com/kubernetes/kubernetes"
guide = "https://kubernetes.io/docs/home/"
weight = 1

[[cards]]
iden = "management"
name = "Patroni"
desc = "Automatic primary / standby switching to improve database availability"
address = "https://github.com/zalando/patroni"
guide = "https://patroni.readthedocs.io/en/latest/"
weight = 2


[[cards]]
iden = "migrationTools"
name = "Ora2pg"
desc = "database migration tools from oracle to pg"
address = "https://github.com/darold/ora2pg"
guide = "https://ora2pg.darold.net/documentation.html"
weight = 1

[[cards]]
iden = "migrationTools"
name = "Pg_chameleon"
desc = "database migration tools from mysql to pg"
address = "https://github.com/the4thdoctor/pg_chameleon"
guide = "https://pgchameleon.org/documents/"
weight = 2

[[cards]]
iden = "migrationTools"
name = "pgloader"
desc = "A data import tool that uses the copy command to import data into PostgreSQL"
address = "https://github.com/dimitri/pgloader"
guide = "https://opengauss.org/zh/blogs/blogs.html?post/totaj/%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8pgloader%E8%BF%81%E7%A7%BBmysql%E6%95%B0%E6%8D%AE%E5%BA%93%E8%87%B3opengauss/"
weight = 3

[[cards]]
iden = "dataTools"
name = "JdbcPgBackup"
desc = "Java based multi-platform data import and export tool, similar to pg_ dump/pg_ restore"
address = "https://github.com/tig100/JdbcPgBackup"
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
desc = "Alibaba to Oracle data migration synchronization tool (full + incremental, target support MySQL / DRDS)"
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