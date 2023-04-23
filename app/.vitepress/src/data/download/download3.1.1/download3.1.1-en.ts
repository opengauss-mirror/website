export default [
  {
    name: 'openGauss Server',
    content: [
      {
        system: 'openEuler 20.03 LTS (aarch64)',
        architecture: 'AArch64',
        os: 'openEuler 22.03 LTS',
        docs: true,
        content: [
          {
            name: 'openGauss_3.1.1 Enterprise-Edition',
            table: 'server',
            size: '120.00MB',
            edition: 'enterprise',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/3.1.1/arm/openGauss-3.1.1-openEuler-64bit-all.tar.gz',
            sha_code:
              '1e356c0c9d32c8e486bb243b58a90763efc16963fff64cdf704b2ce17798d72b',
            docsName: 'Enterprise-Edition Installation Guide',
            docs_url:
              'https://docs.opengauss.org/en/docs/3.1.1/docs/installation/enterprise-edition-installation-process.html',
          },
          {
            name: 'openGauss_3.1.1 Simplified',
            table: 'server',
            size: '88.70MB',
            edition: 'simple',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/3.1.1/arm/openGauss-3.1.1-openEuler-64bit.tar.bz2',
            sha_code:
              '6b3498f17dc9a3d96cb92ae1ea326d10d1a3159a9f15df556d376ac43c2b4792',
            docsName: 'Simplified Installation Guide',
            docs_url:
              'https://docs.opengauss.org/en/docs/3.1.1/docs/installation/simplified-installation-process.html',
          },
          {
            name: 'openGauss_3.1.1 Lite',
            table: 'server',
            size: '21.10MB',
            edition: 'lite',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/3.1.1/arm/openGauss-Lite-3.1.1-openEuler-aarch64.tar.gz',
            sha_code:
              '365c1a402d8cf3a0334159b64dd839a1915e1de82e6f75ade74438d06744c987',
            docsName: 'Lite Installation Guide',
            docs_url:
              'https://docs.opengauss.org/en/docs/3.1.1-lite/docs/installation/installation-overview.html',
          },
        ],
      },
      {
        system: 'openEuler 20.03 LTS (x86_64)',
        architecture: 'x86_64',
        os: 'openEuler 22.03 LTS',
        docs: true,
        content: [
          {
            name: 'openGauss_3.1.1 Enterprise-Edition',
            table: 'server',
            size: '126.00MB',
            edition: 'enterprise',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/3.1.1/x86_openEuler/openGauss-3.1.1-openEuler-64bit-all.tar.gz',
            sha_code:
              '13d098c646d72349f79cb6a13c2ad4dc1a551ef160bf6ed5edf637692c167479',
            docsName: 'Enterprise-Edition Installation Guide',
            docs_url:
              'https://docs.opengauss.org/en/docs/3.1.1/docs/installation/enterprise-edition-installation-process.html',
          },
          {
            name: 'openGauss_3.1.1 Simplified',
            table: 'server',
            size: '94.20MB',
            edition: 'simple',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/3.1.1/x86_openEuler/openGauss-3.1.1-openEuler-64bit.tar.bz2',
            sha_code:
              '87b3dde1b5bb95c2ae397bcd391c36301f8fe851f148332e9af846fa6409b21e',
            docsName: 'Simplified Installation Guide',
            docs_url:
              'https://docs.opengauss.org/en/docs/3.1.1/docs/installation/simplified-installation-process.html',
          },
          {
            name: 'openGauss_3.1.1 Lite',
            table: 'server',
            size: '22.00MB',
            edition: 'lite',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/3.1.1/x86_openEuler/openGauss-Lite-3.1.1-openEuler-x86_64.tar.gz',
            sha_code:
              'd54d16fe54675f8ac05dadf5ae199306b7848e172c96697a85beee0ab627724f',
            docsName: 'Lite Installation Guide',
            docs_url:
              'https://docs.opengauss.org/en/docs/3.1.1-lite/docs/installation/installation-overview.html',
          },
        ],
      },
      {
        system: 'Centos 7.6 (x86_64)',
        architecture: 'x86_64',
        os: 'Centos 7.6',
        docs: true,
        content: [
          {
            name: 'openGauss_3.1.1 Enterprise-Edition',
            table: 'server',
            size: '126.00MB',
            edition: 'enterprise',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/3.1.1/x86/openGauss-3.1.1-CentOS-64bit-all.tar.gz',

            sha_code:
              'f2bd4b88a66d30d95c3c7e2ee1b980996e1f8830804e3ad66ab8a8a8d179e13a',

            docsName: 'Enterprise-Edition Installation Guide',
            docs_url:
              'https://docs.opengauss.org/en/docs/3.1.1/docs/installation/enterprise-edition-installation-process.html',
          },
          {
            name: 'openGauss_3.1.1 Simplified',
            table: 'server',
            size: '93.50MB',
            edition: 'simple',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/3.1.1/x86/openGauss-3.1.1-CentOS-64bit.tar.bz2',

            sha_code:
              'a795338fa51ab2aa7ac0918ee22b396cc4cdd24f4482fe33ba6fd5d5843b9e50',

            docsName: 'Simplified Installation Guide',
            docs_url:
              'https://docs.opengauss.org/en/docs/3.1.1/docs/installation/simplified-installation-process.html',
          },
          {
            name: 'openGauss_3.1.1 Lite',
            table: 'server',
            size: '21.80MB',
            edition: 'lite',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/3.1.1/x86/openGauss-Lite-3.1.1-CentOS-x86_64.tar.gz',
            sha_code:
              '7885d8d66b1ea8517f590c5fc1c212d15e07c710dbae83e38a67828ce9a166e3',
            docsName: 'Lite Installation Guide',
            docs_url:
              'https://docs.opengauss.org/en/docs/3.1.1-lite/docs/installation/installation-overview.html',
          },
          {
            name: 'openGauss_3.1.1 Distributed',
            table: 'server',
            size: '1.20GB',
            edition: 'distributed',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/3.1.1/openGauss-distributed.tar.gz',
            sha_code:
              'ab0cf39bce79207e00aeb77694321d33c5c62f28d107c87400c46e91743d9202',
            docsName: '',
            docs_url: '',
          },
        ],
      },
    ],
  },
  {
    name: 'openGauss Connectors',
    content: [
      {
        system: 'openEuler 20.03 LTS (aarch64)',
        architecture: 'AArch64',
        os: 'openEuler 20.03 LTS',
        content: [
          {
            name: 'JDBC_3.1.1',
            size: '1.53MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/3.1.1/arm/openGauss-3.1.1-JDBC.tar.gz',

            sha_code:
              'e4d3057961600dfe3883edb43d2ebc0c04ed56df6c1d42e00d7b2b936f129cae',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_3.1.1',
            size: '8.30MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/3.1.1/arm/openGauss-3.1.1-ODBC.tar.gz',
            sha_code:
              '3f7db703bb3b8d15e5ab1c382c4daa0f85fb677c493c0019c89cf1d858f7fd33',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_3.1.1',
            size: '2.59MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/3.1.1/arm/openGauss-3.1.1-openEuler-aarch64-Python.tar.gz',
            sha_code:
              'ab3c8aaec9db1282e393d457f230cc9b0eb84f4f92a4a119227479f8af1171d3',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_3.1.1',
            size: '4.50MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/3.1.1/arm/openGauss-3.1.1-openEuler-64bit-Libpq.tar.gz',
            sha_code:
              'f56fee7e1857b6c2d226cb85e9879d6ef2c38d8eb2f1fe5750f8738f2a84773e',
            docsName: '',
            docs_url: '',
          },
        ],
      },
      {
        system: 'openEuler 20.03 LTS (x86_64)',
        architecture: 'x86_64',
        os: 'openEuler 20.03 LTS',
        content: [
          {
            name: 'JDBC_3.1.1',
            size: '1.53MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/3.1.1/x86_openEuler/openGauss-3.1.1-JDBC.tar.gz',
            sha_code:
              '4901515dd0b292fa636083928e70f051683f98907986d87c64ff78f3730c2645',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_3.1.1',
            size: '8.30MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/3.1.1/x86_openEuler/openGauss-3.1.1-ODBC.tar.gz',
            sha_code:
              '10494fdf7e77d164cf3df8f2ec707c61ee1639013d37288ca0ba95600e56b20b',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_3.1.1',
            size: '2.90MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/3.1.1/x86_openEuler/openGauss-3.1.1-openEuler-x86_64-Python.tar.gz',
            sha_code:
              'b00bafa8d3d7c4cf81fa1684c944bdf28376f6c4aa10a68dcc95a2a98e9ea03f',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_3.1.1',
            size: '4.99MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/3.1.1/x86_openEuler/openGauss-3.1.1-openEuler-64bit-Libpq.tar.gz',
            sha_code:
              '260df69f81e4b5e21ce58700ff92d384125a8f9c33133eee3ee221357b181eeb',
            docsName: '',
            docs_url: '',
          },
        ],
      },
      {
        system: 'Centos 7.6 (x86_64)',
        architecture: 'x86_64',
        os: 'Centos 7.6',
        content: [
          {
            name: 'JDBC_3.1.1',
            size: '1.53MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/3.1.1/x86/openGauss-3.1.1-JDBC.tar.gz',
            sha_code:
              '8ac337f4cbfae78e33901e9184bef7e417e470313cd08b0e038383ac3e6aa0af',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_3.1.1',
            size: '8.90MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/3.1.1/x86/openGauss-3.1.1-ODBC.tar.gz',

            sha_code:
              'a6d4ab8687aaa1540105d55b322549dae298abe7a8daf64cf19cfc1a588f0fd3',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_3.1.1',
            size: '3.12MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/3.1.1/x86/openGauss-3.1.1-CentOS-x86_64-Python.tar.gz',
            sha_code:
              '08bdbad98f8192ee406083850024a938be344fad12171204114bc47a2fa9d22e',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_3.1.1',
            size: '4.88MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/3.1.1/x86/openGauss-3.1.1-CentOS-64bit-Libpq.tar.gz',
            sha_code:
              '8d3f1f40434068b5042360e6dc4a55645fc46b0a60a751824c7624b6f5d13a3d',
            docsName: '',
            docs_url: '',
          },
        ],
      },
    ],
  },
  {
    name: 'openGauss Symbol',
    content: [
      {
        system: 'openEuler 20.03 LTS (aarch64)',
        architecture: 'AArch64',
        os: 'openEuler 20.03 LTS',
        content: [
          {
            name: 'symbol_3.1.1',
            size: '382.00MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/3.1.1/arm/openGauss-3.1.1-openEuler-64bit-symbol.tar.gz',
            sha_code:
              '6a17de81c18e08abdabef24d6c17d33e16a437612f7136f4fe0d99de99c6526c',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_3.1.1',
            size: '21.90MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/3.1.1/arm/openGauss-3.1.1-openEuler-64bit-cm-symbol.tar.gz',

            sha_code:
              'd0674dcbc76cbaedf61d9b27b266da6f56a2db887cd06808931a510966ede965',

            docsName: '',
            docs_url: '',
          },
        ],
      },
      {
        system: 'openEuler 20.03 LTS (x86_64)',
        architecture: 'x86_64',
        os: 'openEuler 20.03 LTS',
        content: [
          {
            name: 'symbol_3.1.1',
            size: '378.00MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/3.1.1/x86_openEuler/openGauss-3.1.1-openEuler-64bit-symbol.tar.gz',
            sha_code:
              'b2e407a9e8739a4ce3828db7290d1a142d44f8ddc037ef196c937cb97c614a18',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_3.1.1',
            size: '20.40MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/3.1.1/x86_openEuler/openGauss-3.1.1-openEuler-64bit-cm-symbol.tar.gz',
            sha_code:
              '5adde4a86231011103f437f0c08abb95593c7d2ed0728754dff83db908a3a7f0',
            docsName: '',
            docs_url: '',
          },
        ],
      },
      {
        system: 'Centos 7.6 (x86_64)',
        architecture: 'x86_64',
        os: 'Centos 7.6',
        content: [
          {
            name: 'symbol_3.1.1',
            size: '377.00MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/3.1.1/x86/openGauss-3.1.1-CentOS-64bit-symbol.tar.gz',
            sha_code:
              '796d16e952040308c31727e46597cb3491641b2d1b4acabd8ea9b66ac54fde0d',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_3.1.1',
            size: '20.40MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/3.1.1/x86/openGauss-3.1.1-CentOS-64bit-cm-symbol.tar.gz',
            sha_code:
              'bb31dc8d3895a0d94ff1194d42d260e718af2ab409bc2acf2813f265382f0378',
            docsName: '',
            docs_url: '',
          },
        ],
      },
    ],
  },
  {
    name: 'openGauss Tools',
    content: [
      {
        system: 'Linux',
        architecture: 'AArch64',
        os: 'Linux',
        content: [
          {
            name: 'Chameleon_3.1.1',
            size: '6.28MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/3.1.1/tools/chameleon-3.1.1-py3-none-any.whl',
            sha_code:
              'a1e190cb09500e4afb928d1305185a1718f09c23dfb50fcd8ed6825e4fce4173',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'online-migration_3.1.1',
            size: '9.32MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/3.1.1/tools/online-migration-mysql2openGauss-3.1.1.tar.gz',
            sha_code:
              'a771416935beba130b837c7dfb58768a891abb99c3134dddd13e0d7e7723d9a7',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'reverse-migration_3.1.1',
            size: '11.80MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/3.1.1/tools/openGauss-reverse-migration-mysql-3.1.1.tar.gz',
            sha_code:
              'be7246dd95f181746b9799f9d5d8d415149e8ab442834ee0b20cbe62b1b3e06c',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'datachecker_3.1.1',
            size: '179.00MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/3.1.1/tools/openGauss-datachecker-performance-3.1.1.tar.gz',
            sha_code:
              '81313af28a71956894b6ab65883fbae4ff4cc55f6a2b381dd1fedff4ef218cf4',
            docsName: '',
            docs_url: '',
          },
        ],
      },
      {
        system: 'Linux',
        architecture: 'x86_64',
        os: 'Linux',
        content: [
          {
            name: 'Chameleon_3.1.1',
            size: '6.28MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/3.1.1/tools/chameleon-3.1.1-py3-none-any.whl',
            sha_code:
              'a1e190cb09500e4afb928d1305185a1718f09c23dfb50fcd8ed6825e4fce4173',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'online-migration_3.1.1',
            size: '9.32MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/3.1.1/tools/online-migration-mysql2openGauss-3.1.1.tar.gz',
            sha_code:
              'a771416935beba130b837c7dfb58768a891abb99c3134dddd13e0d7e7723d9a7',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'reverse-migration_3.1.1',
            size: '11.80MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/3.1.1/tools/openGauss-reverse-migration-mysql-3.1.1.tar.gz',
            sha_code:
              'be7246dd95f181746b9799f9d5d8d415149e8ab442834ee0b20cbe62b1b3e06c',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'datachecker_3.1.1',
            size: '179.00MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/3.1.1/tools/openGauss-datachecker-performance-3.1.1.tar.gz',
            sha_code:
              '81313af28a71956894b6ab65883fbae4ff4cc55f6a2b381dd1fedff4ef218cf4',
            docsName: '',
            docs_url: '',
          },
        ],
      },
      {
        system: 'Windows (x86_64)',
        architecture: 'x86_64',
        os: 'Windows',
        docs: true,
        content: [
          {
            name: 'Data Studio_3.1.1',
            size: '106.00MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/3.1.1/tools/DataStudio_win_64.zip',
            sha_code:
              '8f9ea86295d7a2eceb0e528de832f83eae4936109cea8eb44376a0f4443c83af',
            docsName: 'Documentation',
            docs_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/3.1.1/tools/Data%20Studio%20%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C.pdf',
          },
        ],
      },
    ],
  },
];
