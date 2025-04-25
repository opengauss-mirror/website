import {
  DOCS_LINK,
  GITCODE_LINK,
  PSY_LINK,
  MAGI_LINK,
  GIYHUB_LINK,
  APACHE_LINK,
  HAPROXY_LINK,
  SAP_LINK,
  KUBER_LINK,
  PATRONI_LINK,
  PROME_LINK,
  YUKON_LINK,
} from '@/data/url-config';
export default {
  zh: [
    {
      id: `connectors`,
      name: `标准SQL及驱动`,
      children: [
        {
          iden: `connectors`,
          name: `psycopg2`,
          desc: `openGauss Python驱动（仅限Linux）`,
          address: `${GITCODE_LINK}opengauss/openGauss-connector-python-psycopg2/`,
          guide: `${PSY_LINK}docs/`,
        },
        {
          iden: `connectors`,
          name: `py-og`,
          desc: `openGauss Python驱动（纯Python，可跨平台）`,
          address: `${GITCODE_LINK}opengauss/openGauss-connector-python-pyog`,
          guide: `${MAGI_LINK}asyncpg/current/`,
        },
        {
          iden: `connectors`,
          name: `go-pq`,
          desc: `openGauss Go语言驱动`,
          address: `${GITCODE_LINK}opengauss/openGauss-connector-go-pq`,
          guide: `${GITCODE_LINK}opengauss/openGauss-connector-go-pq/blob/master/README.cn.md`,
        },
      ],
    },
    {
      id: `middleware`,
      name: `数据访问中间件`,
      children: [
        {
          iden: `middleware`,
          name: `ShardingSphere`,
          desc: `分布式数据库中间件`,
          address: `${GIYHUB_LINK}apache/shardingsphere`,
          guide: `${APACHE_LINK}document/current/en/overview/`,
        },
        {
          iden: `middleware`,
          name: `HAProxy`,
          desc: `数据库读写负载均衡`,
          address: `${GIYHUB_LINK}haproxy/haproxy`,
          guide: `${HAPROXY_LINK}blog/webinar-introduction-to-haproxy/`,
        },
        {
          iden: `middleware`,
          name: `vip-manager`,
          desc: `自动IP故障转移`,
          address: `${GIYHUB_LINK}cybertec-postgresql/vip-manager`,
          guide: `${GIYHUB_LINK}cybertec-postgresql/vip-manager#Configuration`,
        },
      ],
    },
    {
      id: `management`,
      name: `集群管理软件`,
      children: [
        {
          iden: `management`,
          name: `Kubernetes`,
          desc: `一个开源的容器集群管理平台`,
          address: `${GIYHUB_LINK}kubernetes/kubernetes`,
          guide: `${KUBER_LINK}docs/home/`,
        },
        {
          iden: `management`,
          name: `Patroni`,
          desc: `自动主备切换，提升数据库可用性`,
          address: `${GIYHUB_LINK}zalando/patroni`,
          guide: `${PATRONI_LINK}en/latest/`,
        },
      ],
    },
    {
      id: `migrationTools`,
      name: `数据导入导出工具`,
      children: [
        {
          iden: `migrationTools`,
          name: `Ora2Pg`,
          desc: `Oracle到openGauss数据迁移工具`,
          address: `${GITCODE_LINK}opengauss/openGauss-tools-ora2og`,
          guide: `${GITCODE_LINK}opengauss/openGauss-tools-ora2og/blob/master/README.md`,
        },
        {
          iden: `migrationTools`,
          name: `pg_chameleon`,
          desc: `MySQL到openGauss数据迁移工具`,
          address: `${GITCODE_LINK}opengauss/openGauss-tools-chameleon`,
          guide: `${GITCODE_LINK}opengauss/openGauss-tools-chameleon/blob/master/chameleon%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97.md`,
        },
        {
          iden: `migrationTools`,
          name: `pgloader`,
          desc: `一个数据导入工具，使用COPY命令将数据导入到openGauss`,
          address: `${GITCODE_LINK}opengauss/openGauss-tools-loader`,
          guide: `${GITCODE_LINK}opengauss/openGauss-tools-loader/blob/master/pgloader%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97.pdf`,
        },
      ],
    },
    {
      id: `dataTools`,
      name: `数据复制/同步工具`,
      children: [
        {
          iden: `dataTools`,
          name: `JdbcPgBackup`,
          desc: `基于Java的跨平台数据导入导出工具，类似于pg_dump/pg_restore`,
          address: `${GIYHUB_LINK}tig100/JdbcPgBackup`,
        },
        {
          iden: `dataTools`,
          name: `Database-Sync`,
          desc: `基于Java开发，功能强大、配置灵活的数据库之间同步工具`,
          address: `${GIYHUB_LINK}GongDexing/database-sync`,
        },
        {
          iden: `dataTools`,
          name: `Debezium`,
          desc: `为捕获数据更改（Change Data Capture, CDC）提供了一个低延迟的流式处理平台`,
          address: `${GIYHUB_LINK}debezium/debezium`,
          guide: `/zh/blogs/lihongda/Debezium-Adapt-openGauss.html`,
        },
      ],
    },
    {
      id: `dataModel`,
      name: `运行视图`,
      children: [
        {
          iden: `dataModel`,
          name: `PowerDesigner`,
          desc: `灵活的分析和设计特性允许使用一种结构化的方法有效地创建数据库或数据仓库`,
          address: `${SAP_LINK}products/database-data-management.html`,
          guide: `/zh/blogs/wangrui/PowerDesigner_for_openGauss.html`,
          site: true,
        },
      ],
    },
    {
      id: `clientTools`,
      name: `客户端工具`,
      children: [
        {
          iden: `clientTools`,
          name: `DBeaver`,
          desc: `开源多数据库客户端工具`,
          address: `${GIYHUB_LINK}dbeaver/dbeaver`,
          guide: `/zh/blogs/justbk/2020-10-30_dbeaver_for_openGauss.html`,
        },
        {
          iden: `clientTools`,
          name: `Data Studio`,
          desc: `openGauss官方客户端工具`,
          address: `${GITCODE_LINK}opengauss/DataStudio`,
          guide: `${DOCS_LINK}zh/docs/5.0.0/docs/AboutopenGauss/openGauss客户端工具DataStudio.html`,
        },
      ],
    },
    {
      id: `devOpsTools`,
      name: `监控运维系统`,
      children: [
        {
          iden: `devOpsTools`,
          name: `Zabbix`,
          desc: `实时监控的IT组件和服务,监控数据库需要额外适配`,
          address: `${GIYHUB_LINK}zabbix/zabbix`,
          guide: `/zh/blogs/justbk/2021-03-03_zabbix_for_openGauss.html`,
        },
        {
          iden: `devOpsTools`,
          name: `Prometheus`,
          desc: `开源监控系统，在记录纯数字时间序列方面表现非常好`,
          address: `${GIYHUB_LINK}prometheus/prometheus`,
          guide: `${PROME_LINK}docs/introduction/overview/`,
        },
      ],
    },
    {
      id: `kernelExtensions`,
      name: `内核扩展`,
      children: [
        {
          iden: `kernelExtensions`,
          name: `禹贡`,
          desc: `提供专业的GIS（Geographic Information System）能力`,
          address: `${GITCODE_LINK}opengauss/Yukon`,
          guide: `${YUKON_LINK}`,
        },
      ],
    },
  ],
  en: [
    {
      id: `connectors`,
      name: `Connectors`,
      children: [
        {
          iden: `connectors`,
          name: `psycopg2`,
          desc: `The openGauss Python Driver (Linux only)`,
          address: `${GITCODE_LINK}opengauss/openGauss-connector-python-psycopg2/`,
          guide: `${PSY_LINK}docs/`,
        },
        {
          iden: `connectors`,
          name: `py-og`,
          desc: `The openGauss pure Python Driver (Multi-OS Support)`,
          address: `${GITCODE_LINK}opengauss/openGauss-connector-python-pyog`,
          guide: `${MAGI_LINK}asyncpg/current/`,
        },
        {
          iden: `connectors`,
          name: `go-pq`,
          desc: `The openGauss Go Driver`,
          address: `${GITCODE_LINK}opengauss/openGauss-connector-go-pq`,
          guide: `${GITCODE_LINK}opengauss/openGauss-connector-go-pq/blob/master/README.cn.md`,
        },
      ],
    },
    {
      id: `middleware`,
      name: `Middleware`,
      children: [
        {
          iden: `middleware`,
          name: `ShardingSphere`,
          desc: `Distributed database middleware`,
          address: `${GIYHUB_LINK}apache/shardingsphere`,
          guide: `${APACHE_LINK}document/current/en/overview/`,
        },
        {
          iden: `middleware`,
          name: `HAProxy`,
          desc: `Database read/write load balancing`,
          address: `${GIYHUB_LINK}haproxy/haproxy`,
          guide: `${HAPROXY_LINK}blog/webinar-introduction-to-haproxy/`,
        },
        {
          iden: `middleware`,
          name: `vip-manager`,
          desc: `Automatic IP failover`,
          address: `${GIYHUB_LINK}cybertec-postgresql/vip-manager`,
          guide: `${GIYHUB_LINK}cybertec-postgresql/vip-manager#Configuration`,
        },
      ],
    },
    {
      id: `management`,
      name: `Cluster Management`,
      children: [
        {
          iden: `management`,
          name: `Kubernetes`,
          desc: `An open source container management platform`,
          address: `${GIYHUB_LINK}kubernetes/kubernetes`,
          guide: `${KUBER_LINK}docs/home/`,
        },
        {
          iden: `management`,
          name: `Patroni`,
          desc: `Automatic primary/standby switching to improve database availability`,
          address: `${GIYHUB_LINK}zalando/patroni`,
          guide: `${PATRONI_LINK}en/latest/`,
        },
      ],
    },
    {
      id: `migrationTools`,
      name: `Migration Tools`,
      children: [
        {
          iden: `migrationTools`,
          name: `Ora2Pg`,
          desc: `Database migration tool from Oracle to openGauss`,
          address: `${GITCODE_LINK}opengauss/openGauss-tools-ora2og`,
          guide: `${GITCODE_LINK}opengauss/openGauss-tools-ora2og/blob/master/README.md`,
        },
        {
          iden: `migrationTools`,
          name: `pg_chameleon`,
          desc: `Database migration tool from MySQL to openGauss`,
          address: `${GITCODE_LINK}opengauss/openGauss-tools-chameleon`,
          guide: `${GITCODE_LINK}opengauss/openGauss-tools-chameleon/blob/master/chameleon%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97.md`,
        },
        {
          iden: `migrationTools`,
          name: `pgloader`,
          desc: `A data import tool that uses the COPY command to import data into openGauss`,
          address: `${GITCODE_LINK}opengauss/openGauss-tools-loader`,
          guide: `${GITCODE_LINK}opengauss/openGauss-tools-loader/blob/master/pgloader%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97.pdf`,
        },
      ],
    },
    {
      id: `dataTools`,
      name: `Data Synchronization Tools`,
      children: [
        {
          iden: `dataTools`,
          name: `JdbcPgBackup`,
          desc: `Java based multi-platform data import and export tool, similar to pg_dump/pg_restore`,
          address: `${GIYHUB_LINK}tig100/JdbcPgBackup`,
        },
        {
          iden: `dataTools`,
          name: `Database-Sync`,
          desc: `A powerful and flexible database synchronization tool developed based on Java`,
          address: `${GIYHUB_LINK}GongDexing/database-sync`,
        },
        {
          iden: `dataTools`,
          name: `Debezium`,
          desc: `It provides a low latency streaming processing platform for change data capture (CDC)`,
          address: `${GIYHUB_LINK}debezium/debezium`,
          guide: `/zh/blogs/lihongda/Debezium-Adapt-openGauss.html`,
        },
      ],
    },
    {
      id: `dataModel`,
      name: `Data Model`,
      children: [
        {
          iden: `dataModel`,
          name: `PowerDesigner`,
          desc: `Flexible analysis and design features allow you to effectively create a database or data warehouse using a structured approach`,
          address: `${SAP_LINK}products/database-data-management.html`,
          guide: `/zh/blogs/wangrui/PowerDesigner_for_openGauss.html`,
          site: true,
        },
      ],
    },
    {
      id: `clientTools`,
      name: `Client Tools`,
      children: [
        {
          iden: `clientTools`,
          name: `DBeaver`,
          desc: `Open source multi database client tool`,
          address: `${GIYHUB_LINK}dbeaver/dbeaver`,
          guide: `/zh/blogs/justbk/2020-10-30_dbeaver_for_openGauss.html`,
        },
        {
          iden: `clientTools`,
          name: `Data Studio`,
          desc: `openGauss official client tool`,
          address: `${GITCODE_LINK}opengauss/DataStudio`,
          guide: `${DOCS_LINK}en/docs/5.0.0/docs/AboutopenGauss/opengauss-client-tool-datastudio.html`,
          site: true,
        },
      ],
    },
    {
      id: `devOpsTools`,
      name: `Monitor & DevOps System`,
      children: [
        {
          iden: `devOpsTools`,
          name: `Zabbix`,
          desc: `It components and services for real-time monitoring, and the monitoring database needs additional adaptation`,
          address: `${GIYHUB_LINK}zabbix/zabbix`,
          guide: `/zh/blogs/justbk/2021-03-03_zabbix_for_openGauss.html`,
        },
        {
          iden: `devOpsTools`,
          name: `Prometheus`,
          desc: `The open source monitoring system performs very well in recording pure digital time series`,
          address: `${GIYHUB_LINK}prometheus/prometheus`,
          guide: `${PROME_LINK}docs/introduction/overview/`,
        },
      ],
    },
    {
      id: `kernelExtensions`,
      name: `Kernel Extension`,
      children: [
        {
          iden: `kernelExtensions`,
          name: `Yukon`,
          desc: `Provide professional GIS (Geographic Information System) ability`,
          address: `${GITCODE_LINK}opengauss/Yukon`,
          guide: `${YUKON_LINK}`,
        },
      ],
    },
  ],
};
