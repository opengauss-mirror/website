import { OBS_DOWNLOAD_LINK } from '@/data/url-config';
export default [
  {
    name: 'openGauss Server',
    content: [
      {
        system: 'openEuler 22.03 LTS (aarch64)',
        docs: true,
        architecture: 'AArch64',
        os: 'openEuler 22.03 LTS',
        content: [
          {
            name: 'openGauss_6.0.0 Enterprise-Edition',
            size: '141.25MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/openEuler22.03/arm/openGauss-All-6.0.0-openEuler22.03-aarch64.tar.gz`,
            sha_code:
              'a074a81274f457e4343a88640d2fef4d21330eab1e0518b73f0bfaf609b4da01',
            docsName: '企业版安装指南',
            docs_url:
              '/docs/6.0.0/docs/InstallationGuide/enterprise-edition-installation-process.html',
          },
          {
            name: 'openGauss_6.0.0 Simplified',
            size: '96.83MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/openEuler22.03/arm/openGauss-Server-6.0.0-openEuler22.03-aarch64.tar.bz2`,
            sha_code:
              '37f18dd9b0516f948a7fc6e463c85cd0c9be9fd857737e60c60902e6601c8557',
            docsName: '极简版安装指南',
            docs_url:
              '/docs/6.0.0/docs/InstallationGuide/simplified-installation-process.html',
          },
          {
            name: 'openGauss_6.0.0 Lite',
            size: '25.40MB',
            edition: 'lite',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/openEuler22.03/arm/openGauss-Lite-6.0.0-openEuler22.03-aarch64.tar.gz`,
            sha_code:
              'a14e7bcdfcf49532c55fccba17625fd3e3bd8d8a839231a0adee4d67e971e77b',
            docsName: '轻量版安装指南',
            docs_url:
              '/docs/6.0.0-lite/docs/InstallationGuide/installation-overview.html',
          },
        ],
      },
      {
        system: 'openEuler 22.03 LTS (x86_64)',
        docs: true,
        architecture: 'x86_64',
        os: 'openEuler 22.03 LTS',
        content: [
          {
            name: 'openGauss_6.0.0 Enterprise-Edition',
            size: '144.51MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/openEuler22.03/x86/openGauss-All-6.0.0-openEuler22.03-x86_64.tar.gz`,
            sha_code:
              '96a89b1bbaffdac4829a4290f773e1eae0b73c4942de94016cc70f4ec24faa73',
            docsName: '企业版安装指南',
            docs_url:
              '/docs/6.0.0/docs/InstallationGuide/enterprise-edition-installation-process.html',
          },
          {
            name: 'openGauss_6.0.0 Simplified',
            size: '100.71MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/openEuler22.03/x86/openGauss-Server-6.0.0-openEuler22.03-x86_64.tar.bz2`,
            sha_code:
              '585991488be1eba3d4f24f6c66123808223941e56912c66cc963271b1e78d24b',
            docsName: '极简版安装指南',
            docs_url:
              '/docs/6.0.0/docs/InstallationGuide/simplified-installation-process.html',
          },
          {
            name: 'openGauss_6.0.0 Lite',
            size: '26.70MB',
            edition: 'lite',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/openEuler22.03/x86/openGauss-Lite-6.0.0-openEuler22.03-x86_64.tar.gz`,
            sha_code:
              '3b3905ef77202a51e99ece9717424a8c2bced22a672679f10d323ac315cbbb7e',
            docsName: '轻量版安装指南',
            docs_url:
              '/docs/6.0.0-lite/docs/InstallationGuide/installation-overview.html',
          },
        ],
      },
      {
        system: 'openEuler 20.03 LTS (aarch64)',
        docs: true,
        architecture: 'AArch64',
        os: 'openEuler 20.03 LTS',
        content: [
          {
            name: 'openGauss_6.0.0 Enterprise-Edition',
            size: '140.24MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/openEuler20.03/arm/openGauss-All-6.0.0-openEuler20.03-aarch64.tar.gz`,
            sha_code:
              '7aaf86b9ca3c35a49893a9aa5ab02383039da78c9b0d90bc2e3bd0dbbf7d0384',
            docsName: '企业版安装指南',
            docs_url:
              '/docs/6.0.0/docs/InstallationGuide/enterprise-edition-installation-process.html',
          },
          {
            name: 'openGauss_6.0.0 Simplified',
            size: '97.36MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/openEuler20.03/arm/openGauss-Server-6.0.0-openEuler20.03-aarch64.tar.bz2`,
            sha_code:
              'ef2fe745a71b0ca45ef94a9f9357868acef884975d7f5aa939d1881fe631dbdc',
            docsName: '极简版安装指南',
            docs_url:
              '/docs/6.0.0/docs/InstallationGuide/simplified-installation-process.html',
          },
          {
            name: 'openGauss_6.0.0 Lite',
            size: '25.69MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/openEuler20.03/arm/openGauss-Lite-6.0.0-openEuler20.03-aarch64.tar.gz`,
            sha_code:
              '8ca45d179bbac132dd33eb6b1da2c272b56761892597891bb38fa280ca1dd94c',
            docsName: '轻量版安装指南',
            docs_url:
              '/docs/6.0.0-lite/docs/InstallationGuide/installation-overview.html',
          },
          {
            name: 'openGauss_6.0.0 Distributed',
            size: '3.41GB',
            edition: 'distributed',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/distributed/openGauss-distributed-aarch64-image.tar.gz`,
            sha_code:
              'f327727b332f3dbffa46c26b307bfe6d9aa1647677c4eecb81db07113f1c4698',
            docsName: '',
            docs_url: '',
          },
        ],
      },
      {
        system: 'openEuler 20.03 LTS (x86_64)',
        architecture: 'x86_64',
        os: 'openEuler 20.03 LTS',
        docs: true,
        content: [
          {
            name: 'openGauss_6.0.0 Enterprise-Edition',
            size: '144.68MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/openEuler20.03/x86/openGauss-All-6.0.0-openEuler20.03-x86_64.tar.gz`,
            sha_code:
              'f680e742d6ae9354f010e8b5764c044dbc04a4324ce167331a47443229dbea28',
            docsName: '企业版安装指南',
            docs_url:
              '/docs/6.0.0/docs/InstallationGuide/enterprise-edition-installation-process.html',
          },
          {
            name: 'openGauss_6.0.0 Simplified',
            size: '101.05MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/openEuler20.03/x86/openGauss-Server-6.0.0-openEuler20.03-x86_64.tar.bz2`,
            sha_code:
              'a455d901b1433e637bce96465ea1cc20131bf2f08e3a79c0a32054aa288b1214',
            docsName: '极简版安装指南',
            docs_url:
              '/docs/6.0.0/docs/InstallationGuide/simplified-installation-process.html',
          },
          {
            name: 'openGauss_6.0.0 Lite',
            size: '26.95MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/openEuler20.03/x86/openGauss-Lite-6.0.0-openEuler20.03-x86_64.tar.gz`,
            sha_code:
              '64d62cd0e181ec1ae15a8895242e6c20fe4842ef258c6a70d67e37a6de480afe',
            docsName: '轻量版安装指南',
            docs_url:
              '/docs/6.0.0-lite/docs/InstallationGuide/installation-overview.html',
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
            name: 'openGauss_6.0.0 Enterprise-Edition',
            size: '142.53MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/CentOS7/x86/openGauss-All-6.0.0-CentOS7-x86_64.tar.gz`,
            sha_code:
              '2dad94f35807c0d6945bf84f638693148a2de05b4fe51b420f04fd5d94015977',
            docsName: '企业版安装指南',
            docs_url:
              '/docs/6.0.0/docs/InstallationGuide/enterprise-edition-installation-process.html',
          },
          {
            name: 'openGauss_6.0.0 Simplified',
            size: '99.82MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/CentOS7/x86/openGauss-Server-6.0.0-CentOS7-x86_64.tar.bz2`,
            sha_code:
              'fca7b2137f58d4562dec1359b3db31ea4dfe7119bec74a6d1db02d6ee867b480',
            docsName: '极简版安装指南',
            docs_url:
              '/docs/6.0.0/docs/InstallationGuide/simplified-installation-process.html',
          },
          {
            name: 'openGauss_6.0.0 Lite',
            size: '26.57MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/CentOS7/x86/openGauss-Lite-6.0.0-CentOS7-x86_64.tar.gz`,
            sha_code:
              '6f779f95075153b78c00e9b0e76b5f12edd0ebd7ba332be4e6993047c4782e0a',
            docsName: '轻量版安装指南',
            docs_url:
              '/docs/6.0.0-lite/docs/InstallationGuide/installation-overview.html',
          },
          {
            name: 'openGauss_6.0.0 Distributed',
            size: '3.29GB',
            edition: 'distributed',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/distributed/openGauss-distributed-x86_64-image.tar.gz`,
            sha_code:
              'e962eb67ea38df62fc352cb39f5ab8449027da7907c131a82176648757202be2',
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
        system: 'openEuler 22.03 LTS (aarch64)',
        architecture: 'AArch64',
        os: 'openEuler 22.03 LTS',
        content: [
          {
            name: 'JDBC_6.0.0',
            size: '1.73MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/openEuler22.03/arm/openGauss-JDBC-6.0.0.tar.gz`,
            sha_code:
              '5ad4ffe33907c4315ebb697fc3aeff6d56f6455f6a37389a3bc86c9f10c99aed',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_6.0.0',
            size: '8.98MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/openEuler22.03/arm/openGauss-ODBC-6.0.0-openEuler22.03-aarch64.tar.gz`,
            sha_code:
              '7bd1be8f9a7c88eda25b77df8f6b48b5bbf7dd4d640990d3dd8018e0fff82625',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_6.0.0',
            size: '2.93MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/openEuler22.03/arm/openGauss-Python-6.0.0-openEuler22.03-aarch64.tar.gz`,
            sha_code:
              '5638a1b49bc3b9c6c3b22d0f9b712e0857a4736a24d0111e689ff7ba5fe22710',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_6.0.0',
            size: '4.99MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/openEuler22.03/arm/openGauss-Libpq-6.0.0-openEuler22.03-aarch64.tar.gz`,
            sha_code:
              '5de203ce28346368d0b467924f585ce7f446e1749e5c56a03b38828260b9340d',
            docsName: '',
            docs_url: '',
          },
        ],
      },
      {
        system: 'openEuler 22.03 LTS (x86_64)',
        architecture: 'x86_64',
        os: 'openEuler 22.03 LTS',
        content: [
          {
            name: 'JDBC_6.0.0',
            size: '1.73MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/openEuler22.03/x86/openGauss-JDBC-6.0.0.tar.gz`,
            sha_code:
              '3170a768bc1f6bbfb72b55b2fdb2ee0f97a57846346c9aa3e246e2ac69e761b6',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_6.0.0',
            size: '9.23MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/openEuler22.03/x86/openGauss-ODBC-6.0.0-openEuler22.03-x86_64.tar.gz`,
            sha_code:
              'a3b00ccdc8fe9d72abf4bee8053aaaa71cf65584b06a73e078f339b174508c36',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_6.0.0',
            size: '3.09MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/openEuler22.03/x86/openGauss-Python-6.0.0-openEuler22.03-x86_64.tar.gz`,
            sha_code:
              'a3dca69fafa4fd6147b72e9f4b13c00af03d9d7976716a8a5ef842421c8a9037',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_6.0.0',
            size: '5.26MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/openEuler22.03/x86/openGauss-Libpq-6.0.0-openEuler22.03-x86_64.tar.gz`,
            sha_code:
              'e4b54d64fa4f4dfbccd561d298e7ade02a2244077893eb57ffa2860063c668f0',
            docsName: '',
            docs_url: '',
          },
        ],
      },
      {
        system: 'openEuler 20.03 LTS (aarch64)',
        architecture: 'AArch64',
        os: 'openEuler 20.03 LTS',
        content: [
          {
            name: 'JDBC_6.0.0',
            size: '1.72MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/openEuler20.03/arm/openGauss-JDBC-6.0.0.tar.gz`,
            sha_code:
              'b039c07693a40cf03c7a13a7fb65f8500af1467ac85adaa23378d92cac1bfdad',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_6.0.0',
            size: '9.03MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/openEuler20.03/arm/openGauss-ODBC-6.0.0-openEuler20.03-aarch64.tar.gz`,
            sha_code:
              '0319f160d985b23f19d0d6aaf717206593bf9b1e6769589785d10d23e5c85493',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_6.0.0',
            size: '2.94MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/openEuler20.03/arm/openGauss-Python-6.0.0-openEuler20.03-aarch64.tar.gz`,
            sha_code:
              '6039575f7a230305b3b8ed0a2a9a98f7f2bd75b76fbd8422be13b6070352560a',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_6.0.0',
            size: '5.03MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/openEuler20.03/arm/openGauss-Libpq-6.0.0-openEuler20.03-aarch64.tar.gz`,
            sha_code:
              '0b44ffc4fe978e6823b79198665c59989df06a0832f231997a9bc137ca5f5c65',
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
            name: 'JDBC_6.0.0',
            size: '1.73MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/openEuler20.03/x86/openGauss-JDBC-6.0.0.tar.gz`,
            sha_code:
              'ad496f6468f24bf4c4e89f2aeabdbc59ef1e185b3726fb6db963cbe249b2fcfa',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_6.0.0',
            size: '9.24MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/openEuler20.03/x86/openGauss-ODBC-6.0.0-openEuler20.03-x86_64.tar.gz`,
            sha_code:
              '269ed5d25edce82bb06d78280238c7c8c58390d7d69d769556e261f2b18e3c5a',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_6.0.0',
            size: '3.09MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/openEuler20.03/x86/openGauss-Python-6.0.0-openEuler20.03-x86_64.tar.gz`,
            sha_code:
              '172c1f0c87a7a057634a04785727197436faae4cf58f67b9db6b129b286e6f9b',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_6.0.0',
            size: '5.26MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/openEuler20.03/x86/openGauss-Libpq-6.0.0-openEuler20.03-x86_64.tar.gz`,
            sha_code:
              'fd982936e7b576e87a818665db87ef87001ece0af4783ecd5ac828ad9f06f908',
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
            name: 'JDBC_6.0.0',
            size: '1.73MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/CentOS7/x86/openGauss-JDBC-6.0.0.tar.gz`,
            sha_code:
              '47ebbbfc889805e55357861711f37e57e3d8da877b87431aca1ceda33b37ac4f',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_6.0.0',
            size: '9.11MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/CentOS7/x86/openGauss-ODBC-6.0.0-CentOS7-x86_64.tar.gz`,
            sha_code:
              '79762930e48054c8b62f06b559d95aa0effa73fd99211e30ad8b83e3681ce4e6',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_6.0.0',
            size: '3.29MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/CentOS7/x86/openGauss-Python-6.0.0-CentOS7-x86_64.tar.gz`,
            sha_code:
              '554f95e225292f2492c84fff74488f8cb273ed45746acd426ddbacebb9ea6fcd',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_6.0.0',
            size: '5.14MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/CentOS7/x86/openGauss-Libpq-6.0.0-CentOS7-x86_64.tar.gz`,
            sha_code:
              '5d81fc08082cc52c1063038e00dd504f655c09e0f75c7cab3f2f4d614e0f8b7c',
            docsName: '',
            docs_url: '',
          },
        ],
      },
      {
        system: 'Windows',
        architecture: 'x86_64',
        os: 'Windows',
        content: [
          {
            name: 'JDBC_6.0.0',
            size: '1.73MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/CentOS7/x86/openGauss-6.0.0-JDBC.tar.gz`,
            sha_code:
              '47ebbbfc889805e55357861711f37e57e3d8da877b87431aca1ceda33b37ac4f',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_6.0.0',
            size: '5.24MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/windows/openGauss-6.0.0-ODBC-windows.tar.gz`,
            sha_code:
              'c8118e11f6a5be259f3704783591b9d3e833a97c8a924964ae00d973cd9c83f5',
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
        system: 'openEuler 22.03 LTS (aarch64)',
        architecture: 'AArch64',
        os: 'openEuler 22.03 LTS',
        content: [
          {
            name: 'symbol_6.0.0',
            size: '396.82MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/openEuler22.03/arm/openGauss-Symbol-6.0.0-openEuler22.03-aarch64.tar.gz`,
            sha_code:
              '4c76483316f3f8a3af10cbea349006d3b0507e8e2e17e3c823280afd0711e890',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_6.0.0',
            size: '21.73MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/openEuler22.03/arm/openGauss-CM-6.0.0-openEuler22.03-aarch64.tar.gz`,
            sha_code:
              'f82de47d6ceac6703220e743598a3c84a4a9a9553933b608807449ff9dbabd2d',
            docsName: '',
            docs_url: '',
          },
        ],
      },
      {
        system: 'openEuler 22.03 LTS (x86_64)',
        architecture: 'x86_64',
        os: 'openEuler 22.03 LTS',
        content: [
          {
            name: 'symbol_6.0.0',
            size: '394.35MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/openEuler22.03/x86/openGauss-Symbol-6.0.0-openEuler22.03-x86_64.tar.gz`,
            sha_code:
              '49d0a563738193b2fb5118f94def1b93bc29d6c60e116fbc142d1d39ed8f3ae9',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_6.0.0',
            size: '22.05MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/openEuler22.03/x86/openGauss-CM-Symbol-6.0.0-openEuler22.03-x86_64.tar.gz`,
            sha_code:
              '0c02fb737f58edcdb0795a67d32bfca4bbdddb841ac7c4556d0ea5ab8f5e37dd',
            docsName: '',
            docs_url: '',
          },
        ],
      },
      {
        system: 'openEuler 20.03 LTS (aarch64)',
        architecture: 'AArch64',
        os: 'openEuler 20.03 LTS',
        content: [
          {
            name: 'symbol_6.0.0',
            size: '395.78MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/openEuler20.03/arm/openGauss-Symbol-6.0.0-openEuler20.03-aarch64.tar.gz`,
            sha_code:
              'db2b22aadbf19caead1d3fa1809d924b786bacf4b95faa26e1b307e09846d765',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_6.0.0',
            size: '23.85MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/openEuler20.03/arm/openGauss-CM-Symbol-6.0.0-openEuler20.03-aarch64.tar.gz`,
            sha_code:
              '5ef6b051bdb9a973cd0443e977c904d887e945d893f69a27c33924fd58c63662',
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
            name: 'symbol_6.0.0',
            size: '393.31MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/openEuler20.03/x86/openGauss-Symbol-6.0.0-openEuler20.03-x86_64.tar.gz`,
            sha_code:
              '45ca8931c0bfb9facc0c1edc75580dbf0fbe134de6858d89a6d15903aa8e008d',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_6.0.0',
            size: '22.04MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/openEuler20.03/x86/openGauss-CM-Symbol-6.0.0-openEuler20.03-x86_64.tar.gz`,
            sha_code:
              '9e6233477afae7eed6521ce9c93849f937f6239caf5a6ae8ecc33dd4c7e8fe33',
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
            name: 'symbol_6.0.0',
            size: '380.48MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/CentOS7/x86/openGauss-Symbol-6.0.0-CentOS7-x86_64.tar.gz`,
            sha_code:
              '13e73147b8b0bd55f425640dcc717ed7ab6f323605e87a014b9e62a31136054b',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_6.0.0',
            size: '20.74MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/CentOS7/x86/openGauss-CM-Symbol-6.0.0-CentOS7-x86_64.tar.gz`,
            sha_code:
              'c36733da6abb54e5041cee6b77f7594ccfa6d1a172e9651431cef404b044f937',
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
        system: 'Linux (aarch64)',
        architecture: 'AArch64',
        os: 'Linux',
        content: [
          {
            name: 'replicate-mysql2openGauss_6.0.0',
            size: '10.44MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/tools/replicate-mysql2openGauss-6.0.0.tar.gz`,
            sha_code:
              '2a4593af644265d01c0003367cadae5f52359fb9c57a67ded5ac7aaa588263d9',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'replicate-openGauss2mysql_6.0.0',
            size: '15.41MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/tools/replicate-openGauss2mysql-6.0.0.tar.gz`,
            sha_code:
              '92ab3c90b7e35a2c96bdb6b56deedda13daace4233f8e33064bcd1021cc09edf',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'gs_datacheck_6.0.0',
            size: '83.71MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/tools/gs_datacheck-6.0.0.tar.gz`,
            sha_code:
              'dd8c053aa784096cd6bdeaf3472181e29b67dc38d0a8c78860ab3fee3b9857f1',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Datakit_6.0.0',
            size: '858.10MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/tools/Datakit/Datakit-6.0.0.tar.gz`,
            sha_code:
              '7c972d987ca93a097a388d5ea6153debe430f6e8846b0906b575317038a1f543',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'dbmind_6.0.0',
            size: '281.28MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/dbmind/arm/dbmind-installer-aarch64.tar.gz`,
            sha_code:
              '91eadf1a47f29f153e4bcf8837a4d81929647b7eb8638f6285cebe7264ab2098',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'transcribe_replay_tool_6.0.0',
            size: '23.90MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/tools/transcribe-replay-tool-6.0.0.tar.gz`,
            sha_code:
              'ca4f8acf5253cbee55cb31eb576da44a2bfcda9242a19cb4484d747534cb1ccc',
            docsName: '',
            docs_url: '',
          },
        ],
      },
      {
        system: 'Linux (x86_64)',
        architecture: 'x86_64',
        os: 'Linux',
        content: [
          {
            name: 'replicate-mysql2openGauss_6.0.0',
            size: '10.44MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/tools/replicate-mysql2openGauss-6.0.0.tar.gz`,
            sha_code:
              '2a4593af644265d01c0003367cadae5f52359fb9c57a67ded5ac7aaa588263d9',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'replicate-openGauss2mysql_6.0.0',
            size: '15.41MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/tools/replicate-openGauss2mysql-6.0.0.tar.gz`,
            sha_code:
              '92ab3c90b7e35a2c96bdb6b56deedda13daace4233f8e33064bcd1021cc09edf',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'gs_datacheck_6.0.0',
            size: '83.71MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/tools/gs_datacheck-6.0.0.tar.gz`,
            sha_code:
              'dd8c053aa784096cd6bdeaf3472181e29b67dc38d0a8c78860ab3fee3b9857f1',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Datakit_6.0.0',
            size: '858.10MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/tools/Datakit/Datakit-6.0.0.tar.gz`,
            sha_code:
              '7c972d987ca93a097a388d5ea6153debe430f6e8846b0906b575317038a1f543',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'dbmind_6.0.0',
            size: '370.47MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/dbmind/x86/dbmind-installer-x86_64.tar.gz`,
            sha_code:
              '3dc41b6ffa64f25990ad644cff6a8b3da28f4f140dfacf5df704fc4a51f55ede',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'transcribe_replay_tool_6.0.0',
            size: '23.90MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/tools/transcribe-replay-tool-6.0.0.tar.gz`,
            sha_code:
             'ca4f8acf5253cbee55cb31eb576da44a2bfcda9242a19cb4484d747534cb1ccc',
            docsName: '',
            docs_url: '',
          },
        ],
      },
      {
        system: 'Windows',
        architecture: '',
        os: 'Windows',
        docs: true,
        content: [],
      },
      {
        system: 'openEuler 22.03 LTS (aarch64)',
        architecture: 'AArch64',
        os: 'openEuler 22.03 LTS',
        content: [
          {
            name: 'Chameleon_6.0.0',
            size: '74.52MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/tools/openEuler22.03/chameleon-6.0.0-aarch64.tar.gz`,
            sha_code:
              'bf07d4a210e2e38cd513f78c2c925692363a0c1087f9289b18dba7c0f1c481cc',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'PortalControl_6.0.0',
            size: '589.86MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/tools/openEuler22.03/PortalControl-6.0.0-aarch64.tar.gz`,
            sha_code:
              'c789e2a4acd8edd024b0a589423001cf3af05901194a1a51ae56ceace31ed0ba',
            docsName: '',
            docs_url: '',
          },
        ],
      },
      {
        system: 'openEuler 22.03 LTS (x86_64)',
        architecture: 'x86_64',
        os: 'openEuler 22.03 LTS',
        content: [
          {
            name: 'Chameleon_6.0.0',
            size: '74.77MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/tools/openEuler22.03/chameleon-6.0.0-x86_64.tar.gz`,
            sha_code:
              '8a20dae7c21fea8d7d793ba4bc16376b2426a8c9c37e2b2f6f030997531d0364',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'PortalControl_6.0.0',
            size: '590.10MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/tools/openEuler22.03/PortalControl-6.0.0-x86_64.tar.gz`,
            sha_code:
              '68964b49bfdc9cb0af8822cde0bd7c452d0f7584fa31b28482234f5e86dcf83c',
            docsName: '',
            docs_url: '',
          },
        ],
      },
      {
        system: 'openEuler 20.03 LTS (aarch64)',
        architecture: 'AArch64',
        os: 'openEuler 20.03 LTS',
        content: [
          {
            name: 'Chameleon_6.0.0',
            size: '71.99MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/tools/openEuler20.03/chameleon-6.0.0-aarch64.tar.gz`,
            sha_code:
              'e5d1f91d006e35f6261bf3b5dd5bca8de233937cddd2e774bfe2224aab84e44e',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'PortalControl_6.0.0',
            size: '628.37MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/tools/openEuler20.03/PortalControl-6.0.0-aarch64.tar.gz`,
            sha_code:
              '89418e1c4a071b71f00c6ba92568f34ccacab46718ae36d33f495dc7b904c0af',
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
            name: 'Chameleon_6.0.0',
            size: '71.20MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/tools/openEuler20.03/chameleon-6.0.0-x86_64.tar.gz`,
            sha_code:
              '860b140ce85855a5c1f8ed258ffb37a26c37a05b4d8d2126b1157d316533ef15',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'PortalControl_6.0.0',
            size: '643.22MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/tools/openEuler20.03/PortalControl-6.0.0-x86_64.tar.gz`,
            sha_code:
              '367d3d30ba3f6f365b8c707959888af17456ee0b59fc3f9b7dfaa34a67370813',
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
            name: 'Chameleon_6.0.0',
            size: '72.00MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/tools/centos7/chameleon-6.0.0-x86_64.tar.gz`,
            sha_code:
              'c602ef1680dbae88ed855c75a8263eb5fb3428395e7e2fe66ee76eef1c6ba020',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'PortalControl_6.0.0',
            size: '621.23MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/tools/centos7/PortalControl-6.0.0-x86_64.tar.gz`,
            sha_code:
              'b7265c4e87660f7cbf4505c60c1d28bd25ba9f1905b1c7ae525b948c9e9eb908',
            docsName: '',
            docs_url: '',
          },
        ],
      },
    ],
  },
];
