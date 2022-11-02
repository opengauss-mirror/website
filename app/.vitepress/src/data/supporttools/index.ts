export default {
  zh: [
    {
      id: 'connectors',
      name: '标准SQL及驱动',
      children: [
        {
          iden: 'connectors',
          name: 'psycopg2',
          desc: 'openGauss Python驱动（仅限Linux）',
          address:
            'https://gitee.com/opengaussorg/dashboard/projects/opengauss/openGauss-connector-python-psycopg2/',
          guide: 'https://www.psycopg.org/docs/',
        },
        {
          iden: 'connectors',
          name: 'py-og',
          desc: 'openGauss Python驱动（纯Python，可跨平台）',
          address:
            'https://gitee.com/opengauss/openGauss-connector-python-pyog',
          guide: 'https://magicstack.github.io/asyncpg/current/',
        },
        {
          iden: 'connectors',
          name: 'go-pq',
          desc: 'openGauss Go语言驱动',
          address:
            'https://e.gitee.com/opengaussorg/repos/opengauss/openGauss-connector-go-pq',
          guide:
            'https://gitee.com/opengauss/openGauss-connector-go-pq/blob/master/README.cn.md',
        },
      ],
    },
    {
      id: 'middleware',
      name: '数据访问中间件',
      children: [
        {
          iden: 'middleware',
          name: 'ShardingSphere',
          desc: '分布式数据库中间件',
          address: 'https://github.com/apache/shardingsphere',
          guide:
            'https://shardingsphere.apache.org/document/current/en/overview/',
        },
        {
          iden: 'middleware',
          name: 'HAProxy',
          desc: '数据库读写负载均衡',
          address: 'https://github.com/haproxy/haproxy',
          guide:
            'https://www.haproxy.com/blog/webinar-introduction-to-haproxy/',
        },
        {
          iden: 'middleware',
          name: 'vip-manager',
          desc: '自动IP故障转移',
          address: 'https://github.com/cybertec-postgresql/vip-manager',
          guide:
            'https://github.com/cybertec-postgresql/vip-manager#Configuration',
        },
      ],
    },
    {
      id: 'management',
      name: '集群管理软件',
      children: [
        {
          iden: 'management',
          name: 'Kubernetes',
          desc: '一个开源的容器集群管理平台',
          address: 'https://github.com/kubernetes/kubernetes',
          guide: 'https://kubernetes.io/docs/home/',
        },
        {
          iden: 'management',
          name: 'Patroni',
          desc: '自动主备切换，提升数据库可用性',
          address: 'https://github.com/zalando/patroni',
          guide: 'https://patroni.readthedocs.io/en/latest/',
        },
      ],
    },
    {
      id: 'migrationTools',
      name: '数据导入导出工具',
      children: [
        {
          iden: 'migrationTools',
          name: 'Ora2Pg',
          desc: 'Oracle到PostgreSQL数据迁移工具',
          address: 'https://gitee.com/opengauss/openGauss-tools-ora2og',
          guide:
            'https://gitee.com/opengauss/openGauss-tools-ora2og/blob/master/README.md',
        },
        {
          iden: 'migrationTools',
          name: 'pg_chameleon',
          desc: 'MySQL到PostgreSQL数据迁移工具',
          address: 'https://gitee.com/opengauss/openGauss-tools-chameleon',
          guide:
            'https://gitee.com/opengauss/openGauss-tools-chameleon/blob/master/chameleon%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97.pdf',
        },
        {
          iden: 'migrationTools',
          name: 'pgloader',
          desc: '一个数据导入工具，使用COPY命令将数据导入到PostgreSQL',
          address: 'https://gitee.com/opengauss/openGauss-tools-loader',
          guide:
            'https://gitee.com/opengauss/openGauss-tools-loader/blob/master/pgloader%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97.pdf',
        },
      ],
    },
    {
      id: 'dataTools',
      name: '数据复制/同步工具',
      children: [
        {
          iden: 'dataTools',
          name: 'JdbcPgBackup',
          desc: '基于Java的跨平台数据导入导出工具，类似于pg_dump/pg_restore',
          address: 'https://github.com/tig100/JdbcPgBackup',
        },
        {
          iden: 'dataTools',
          name: 'Database-Sync',
          desc: '基于Java开发，功能强大、配置灵活的数据库之间同步工具',
          address: 'https://github.com/GongDexing/database-sync',
        },
        {
          iden: 'dataTools',
          name: 'Debezium',
          desc: '为捕获数据更改（Change Data Capture, CDC）提供了一个低延迟的流式处理平台',
          address: 'https://github.com/debezium/debezium',
          guide:
            'https://opengauss.org/zh/blogs/blogs.html?post/lihongda/debezium-adapt-opengauss/',
        },
      ],
    },
    {
      id: 'dataModel',
      name: '运行视图',
      children: [
        {
          iden: 'dataModel',
          name: 'PowerDesigner',
          desc: '灵活的分析和设计特性允许使用一种结构化的方法有效地创建数据库或数据仓库',
          address: 'https://www.sap.com/products/database-data-management.html',
          guide:
            'https://opengauss.org/zh/blogs/blogs.html?post/wangrui/powerdesigner_for_opengauss/',
          site: true,
        },
      ],
    },
    {
      id: 'clientTools',
      name: '客户端工具',
      children: [
        {
          iden: 'clientTools',
          name: 'DBeaver',
          desc: '开源多数据库客户端工具',
          address: 'https://github.com/dbeaver/dbeaver',
          guide:
            'https://opengauss.org/zh/blogs/blogs.html?post/justbk/2020-10-30_dbeaver_for_opengauss/',
        },
        {
          iden: 'clientTools',
          name: 'Data Studio',
          desc: 'openGauss官方客户端工具',
          address: 'https://opengauss.org/zh/',
          guide: 'https://opengauss.org/zh/download.html',
          site: true,
        },
      ],
    },
    {
      id: 'devOpsTools',
      name: '监控运维系统',
      children: [
        {
          iden: 'devOpsTools',
          name: 'Zabbix',
          desc: '实时监控的IT组件和服务,监控数据库需要额外适配',
          address: 'https://github.com/zabbix/zabbix',
          guide:
            'https://opengauss.org/zh/blogs/blogs.html?post/justbk/2021-03-03_zabbix_for_opengauss/',
        },
        {
          iden: 'devOpsTools',
          name: 'Prometheus',
          desc: '开源监控系统，在记录纯数字时间序列方面表现非常好',
          address: 'https://github.com/prometheus/prometheus',
          guide: 'https://prometheus.io/docs/introduction/overview/',
        },
      ],
    },
    {
      id: 'kernelExtensions',
      name: '内核扩展',
      children: [
        {
          iden: 'kernelExtensions',
          name: '禹贡',
          desc: '提供专业的GIS（Geographic Information System）能力',
          address: 'https://gitee.com/opengauss/Yukon',
          guide: 'https://yukon.supermap.io/',
        },
      ],
    },
  ],
  en: [
    {
      id: 'connectors',
      name: 'Connectors',
      children: [
        {
          iden: 'connectors',
          name: 'psycopg2',
          desc: 'The openGauss Python Driver (Linux only)',
          address:
            'https://gitee.com/opengaussorg/dashboard/projects/opengauss/openGauss-connector-python-psycopg2/',
          guide: 'https://www.psycopg.org/docs/',
        },
        {
          iden: 'connectors',
          name: 'py-og',
          desc: 'The openGauss pure Python Driver (Multi-OS Support)',
          address:
            'https://gitee.com/opengauss/openGauss-connector-python-pyog',
          guide: 'https://magicstack.github.io/asyncpg/current/',
        },
        {
          iden: 'connectors',
          name: 'go-pq',
          desc: 'The openGauss Go Driver',
          address:
            'https://e.gitee.com/opengaussorg/repos/opengauss/openGauss-connector-go-pq',
          guide:
            'https://gitee.com/opengauss/openGauss-connector-go-pq/blob/master/README.cn.md',
        },
      ],
    },
    {
      id: 'middleware',
      name: 'Middleware',
      children: [
        {
          iden: 'middleware',
          name: 'ShardingSphere',
          desc: 'Distributed database middleware',
          address: 'https://github.com/apache/shardingsphere',
          guide:
            'https://shardingsphere.apache.org/document/current/en/overview/',
        },
        {
          iden: 'middleware',
          name: 'HAProxy',
          desc: 'Database read/write load balancing',
          address: 'https://github.com/haproxy/haproxy',
          guide:
            'https://www.haproxy.com/blog/webinar-introduction-to-haproxy/',
        },
        {
          iden: 'middleware',
          name: 'vip-manager',
          desc: 'Automatic IP failover',
          address: 'https://github.com/cybertec-postgresql/vip-manager',
          guide:
            'https://github.com/cybertec-postgresql/vip-manager#Configuration',
        },
      ],
    },
    {
      id: 'management',
      name: 'Cluster Management',
      children: [
        {
          iden: 'management',
          name: 'Kubernetes',
          desc: 'An open source container management platform',
          address: 'https://github.com/kubernetes/kubernetes',
          guide: 'https://kubernetes.io/docs/home/',
        },
        {
          iden: 'management',
          name: 'Patroni',
          desc: 'Automatic primary/standby switching to improve database availability',
          address: 'https://github.com/zalando/patroni',
          guide: 'https://patroni.readthedocs.io/en/latest/',
        },
      ],
    },
    {
      id: 'migrationTools',
      name: 'Migration Tools',
      children: [
        {
          iden: 'migrationTools',
          name: 'Ora2Pg',
          desc: 'Database migration tool from Oracle to PostgreSQL',
          address: 'https://gitee.com/opengauss/openGauss-tools-ora2og',
          guide:
            'https://gitee.com/opengauss/openGauss-tools-ora2og/blob/master/README.md',
        },
        {
          iden: 'migrationTools',
          name: 'pg_chameleon',
          desc: 'Database migration tool from MySQL to PostgreSQL',
          address: 'https://gitee.com/opengauss/openGauss-tools-chameleon',
          guide:
            'https://gitee.com/opengauss/openGauss-tools-chameleon/blob/master/chameleon%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97.pdf',
        },
        {
          iden: 'migrationTools',
          name: 'pgloader',
          desc: 'A data import tool that uses the COPY command to import data into PostgreSQL',
          address: 'https://gitee.com/opengauss/openGauss-tools-loader',
          guide:
            'https://gitee.com/opengauss/openGauss-tools-loader/blob/master/pgloader%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97.pdf',
        },
      ],
    },
    {
      id: 'dataTools',
      name: 'Data Synchronization Tools',
      children: [
        {
          iden: 'dataTools',
          name: 'JdbcPgBackup',
          desc: 'Java based multi-platform data import and export tool, similar to pg_dump/pg_restore',
          address: 'https://github.com/tig100/JdbcPgBackup',
        },
        {
          iden: 'dataTools',
          name: 'Database-Sync',
          desc: 'A powerful and flexible database synchronization tool developed based on Java',
          address: 'https://github.com/GongDexing/database-sync',
        },
        {
          iden: 'dataTools',
          name: 'Debezium',
          desc: 'It provides a low latency streaming processing platform for change data capture (CDC)',
          address: 'https://github.com/debezium/debezium',
          guide:
            'https://opengauss.org/zh/blogs/blogs.html?post/lihongda/debezium-adapt-opengauss/',
        },
      ],
    },
    {
      id: 'dataModel',
      name: 'Data Model',
      children: [
        {
          iden: 'dataModel',
          name: 'PowerDesigner',
          desc: 'Flexible analysis and design features allow you to effectively create a database or data warehouse using a structured approach',
          address: 'https://www.sap.com/products/database-data-management.html',
          guide:
            'https://opengauss.org/zh/blogs/blogs.html?post/wangrui/powerdesigner_for_opengauss/',
          site: true,
        },
      ],
    },
    {
      id: 'clientTools',
      name: 'Client Tools',
      children: [
        {
          iden: 'clientTools',
          name: 'DBeaver',
          desc: 'Open source multi database client tool',
          address: 'https://github.com/dbeaver/dbeaver',
          guide:
            'https://opengauss.org/zh/blogs/blogs.html?post/justbk/2020-10-30_dbeaver_for_opengauss/',
        },
        {
          iden: 'clientTools',
          name: 'Data Studio',
          desc: 'openGauss official client tool',
          address: 'https://opengauss.org/zh/',
          guide: 'https://opengauss.org/zh/download.html',
          site: true,
        },
      ],
    },
    {
      id: 'devOpsTools',
      name: 'Monitor & DevOps System',
      children: [
        {
          iden: 'devOpsTools',
          name: 'Zabbix',
          desc: 'It components and services for real-time monitoring, and the monitoring database needs additional adaptation',
          address: 'https://github.com/zabbix/zabbix',
          guide:
            'https://opengauss.org/zh/blogs/blogs.html?post/justbk/2021-03-03_zabbix_for_opengauss/',
        },
        {
          iden: 'devOpsTools',
          name: 'Prometheus',
          desc: 'The open source monitoring system performs very well in recording pure digital time series',
          address: 'https://github.com/prometheus/prometheus',
          guide: 'https://prometheus.io/docs/introduction/overview/',
        },
      ],
    },
    {
      id: 'kernelExtensions',
      name: 'Kernel Extension',
      children: [
        {
          iden: 'kernelExtensions',
          name: 'Yukon',
          desc: 'Provide professional GIS (Geographic Information System) ability',
          address: 'https://gitee.com/opengauss/Yukon',
          guide: 'https://yukon.supermap.io/',
        },
      ],
    },
  ],
};
