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
            name: 'openGauss_6.0.0-RC1 企业版',
            size: '141.24MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/arm_2203/openGauss-6.0.0-RC1-openEuler-64bit-all.tar.gz`,
            sha_code:
              '9378a596d8218700cdc7f8c1a1edaa1540f4ae3302b14bdfee252c28387db9a6',
            docsName: '企业版安装指南',
            docs_url:
              '/docs/6.0.0-RC1/docs/InstallationGuide/%E4%BC%81%E4%B8%9A%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_6.0.0-RC1 极简版',
            size: '96.82MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/arm_2203/openGauss-6.0.0-RC1-openEuler-64bit.tar.bz2`,
            sha_code:
              'd389a66f586fbd917264cdc2ddfa2c264cccbded1914af9374db4bd88281f25f',
            docsName: '极简版安装指南',
            docs_url:
              '/docs/6.0.0-RC1/docs/InstallationGuide/%E6%9E%81%E7%AE%80%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_6.0.0-RC1 轻量版',
            size: '25.40MB',
            edition: 'lite',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/arm_2203/openGauss-Lite-6.0.0-RC1-openEuler-aarch64.tar.gz`,
            sha_code:
              '8604716e87d331b1c242c23f0b9a900bc1443266fce8ec0479b2bfc2be379e60',
            docsName: '轻量版安装指南',
            docs_url:
              '/docs/6.0.0-RC1-lite/docs/InstallationGuide/%E5%AE%89%E8%A3%85%E6%A6%82%E8%BF%B0.html',
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
            name: 'openGauss_6.0.0-RC1 企业版',
            size: '144.49MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/x86_openEuler_2203/openGauss-6.0.0-RC1-openEuler-64bit-all.tar.gz`,
            sha_code:
              '43c033caf40304b4c944a1233c1f39bfc4514a6375acce2ca51c4bd6e656e69b',
            docsName: '企业版安装指南',
            docs_url:
              '/docs/6.0.0-RC1/docs/InstallationGuide/%E4%BC%81%E4%B8%9A%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_6.0.0-RC1 极简版',
            size: '100.69MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/x86_openEuler_2203/openGauss-6.0.0-RC1-openEuler-64bit.tar.bz2`,
            sha_code:
              'd04ecb515354db611c3c74b83eeafa853d8744950bcbb22edc1f861c0dd0cf01',
            docsName: '极简版安装指南',
            docs_url:
              '/docs/6.0.0-RC1/docs/InstallationGuide/%E6%9E%81%E7%AE%80%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_6.0.0-RC1 轻量版',
            size: '26.69MB',
            edition: 'lite',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/x86_openEuler_2203/openGauss-Lite-6.0.0-RC1-openEuler-x86_64.tar.gz`,
            sha_code:
              '651fc21eac327f14b0159d1eb47a9634e2167147c11607086769fc0f2cb754e8',
            docsName: '轻量版安装指南',
            docs_url:
              '/docs/6.0.0-RC1-lite/docs/InstallationGuide/%E5%AE%89%E8%A3%85%E6%A6%82%E8%BF%B0.html',
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
            name: 'openGauss_6.0.0-RC1 企业版',
            size: '140.23MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/arm/openGauss-6.0.0-RC1-openEuler-64bit-all.tar.gz`,
            sha_code:
              '9378a596d8218700cdc7f8c1a1edaa1540f4ae3302b14bdfee252c28387db9a6',
            docsName: '企业版安装指南',
            docs_url:
              '/docs/6.0.0-RC1/docs/InstallationGuide/%E4%BC%81%E4%B8%9A%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_6.0.0-RC1 极简版',
            size: '97.36MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/arm/openGauss-6.0.0-RC1-openEuler-64bit.tar.bz2`,
            sha_code:
              'd389a66f586fbd917264cdc2ddfa2c264cccbded1914af9374db4bd88281f25f',
            docsName: '极简版安装指南',
            docs_url:
              '/docs/6.0.0-RC1/docs/InstallationGuide/%E6%9E%81%E7%AE%80%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_6.0.0-RC1 轻量版',
            size: '25.69MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/arm/openGauss-Lite-6.0.0-RC1-openEuler-aarch64.tar.gz`,
            sha_code:
              '8604716e87d331b1c242c23f0b9a900bc1443266fce8ec0479b2bfc2be379e60',
            docsName: '轻量版安装指南',
            docs_url:
              '/docs/6.0.0-RC1-lite/docs/InstallationGuide/%E5%AE%89%E8%A3%85%E6%A6%82%E8%BF%B0.html',
          },
          {
            name: 'openGauss_6.0.0-RC1 分布式镜像',
            size: '3.41GB',
            edition: 'distributed',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/distributed/openGauss-distributed-aarch64-image.tar.gz`,
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
            name: 'openGauss_6.0.0-RC1 企业版',
            size: '144.66MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/x86_openEuler/openGauss-6.0.0-RC1-openEuler-64bit-all.tar.gz`,
            sha_code:
              '6b6c644b4443c397f574dbbb596f7841742d5796cf92af7fd3e25329bb334cf1',
            docsName: '企业版安装指南',
            docs_url:
              '/docs/6.0.0-RC1/docs/InstallationGuide/%E4%BC%81%E4%B8%9A%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_6.0.0-RC1 极简版',
            size: '101.03MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/x86_openEuler/openGauss-6.0.0-RC1-openEuler-64bit.tar.bz2`,
            sha_code:
              '8b58b3a716eeebfb32bb7c256b1e7e65d08507138a723650d810dee845c3cb5d',
            docsName: '极简版安装指南',
            docs_url:
              '/docs/6.0.0-RC1/docs/InstallationGuide/%E6%9E%81%E7%AE%80%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_6.0.0-RC1 轻量版',
            size: '26.95MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/x86_openEuler/openGauss-Lite-6.0.0-RC1-openEuler-x86_64.tar.gz`,
            sha_code:
              '394f5d41ff552a7a560a798538d039e31af65801012b1288906f93ea484df331',
            docsName: '轻量版安装指南',
            docs_url:
              '/docs/6.0.0-RC1-lite/docs/InstallationGuide/%E5%AE%89%E8%A3%85%E6%A6%82%E8%BF%B0.html',
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
            name: 'openGauss_6.0.0-RC1 企业版',
            size: '142.51MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/x86/openGauss-6.0.0-RC1-CentOS-64bit-all.tar.gz`,
            sha_code:
              '68715e7fd415fbbe355ffbb259f1edeafd05c4941bee4cad72dda5d4e7a1d56b',
            docsName: '企业版安装指南',
            docs_url:
              '/docs/6.0.0-RC1/docs/InstallationGuide/%E4%BC%81%E4%B8%9A%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_6.0.0-RC1 极简版',
            size: '99.80MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/x86/openGauss-6.0.0-RC1-CentOS-64bit.tar.bz2`,
            sha_code:
              '2a3df495c7c9c0b484d8cf60fcc8578dd68cff83cc01e0eaaf4318785e50c9ee',
            docsName: '极简版安装指南',
            docs_url:
              '/docs/6.0.0-RC1/docs/InstallationGuide/%E6%9E%81%E7%AE%80%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_6.0.0-RC1 轻量版',
            size: '26.57MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/x86/openGauss-Lite-6.0.0-RC1-CentOS-x86_64.tar.gz`,
            sha_code:
              '18b055321a6e6a8ef4f8ba03a6143dc56a7fc2a6eb9b02d01c0d0af0b5b0e751',
            docsName: '轻量版安装指南',
            docs_url:
              '/docs/6.0.0-RC1-lite/docs/InstallationGuide/%E5%AE%89%E8%A3%85%E6%A6%82%E8%BF%B0.html',
          },
          {
            name: 'openGauss_6.0.0-RC1 分布式镜像',
            size: '3.29GB',
            edition: 'distributed',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/distributed/openGauss-distributed-x86_64-image.tar.gz`,
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
            name: 'JDBC_6.0.0-RC1',
            size: '1.73MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/arm_2203/openGauss-6.0.0-RC1-JDBC.tar.gz`,
            sha_code:
              '771560e37ae170eeecf0d2e0a7ac6d002d3e6659606c4938d4e9a3a8632ad194',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_6.0.0-RC1',
            size: '8.98MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/arm_2203/openGauss-6.0.0-RC1-ODBC.tar.gz`,
            sha_code:
              'a2f06ad9c4db7701c5a22b0e29b7bac791a87c1e48527599ca39aa02629e45fd',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_6.0.0-RC1',
            size: '2.93MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/arm_2203/openGauss-6.0.0-RC1-openEuler-aarch64-Python.tar.gz`,
            sha_code:
              'fa2ea6494bef555a3baaeb18c7d70367e1a3cbefcf696cf40f6f1412955a1d4a',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_6.0.0-RC1',
            size: '4.99MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/arm_2203/openGauss-6.0.0-RC1-openEuler-64bit-Libpq.tar.gz`,
            sha_code:
              '62e532e9db01a27832eebc60d18d5ac87363309942f461adfbc10c26e6e4f346',
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
            name: 'JDBC_6.0.0-RC1',
            size: '1.73MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/x86_openEuler_2203/openGauss-6.0.0-RC1-JDBC.tar.gz`,
            sha_code:
              '4af7a45f77f2658ced85c168cde4e0241dac303a5b8591014b715c81ea965ea2',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_6.0.0-RC1',
            size: '9.23MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/x86_openEuler_2203/openGauss-6.0.0-RC1-ODBC.tar.gz`,
            sha_code:
              'b0f7023449ec82eea2f8e6c6dcc6170522a6c0305393500e76901941e6d1dc3c',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_6.0.0-RC1',
            size: '3.09MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/x86_openEuler_2203/openGauss-6.0.0-RC1-openEuler-x86_64-Python.tar.gz`,
            sha_code:
              '6d8d0168d8ce6d18d8d509b76267b668015e39738c20e1779b09f89f4f8df574',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_6.0.0-RC1',
            size: '5.26MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/x86_openEuler_2203/openGauss-6.0.0-RC1-openEuler-64bit-Libpq.tar.gz`,
            sha_code:
              '1e63f4181c3d9462b966cc0b85237e798317a062239e0895b51d5a41e5977059',
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
            name: 'JDBC_6.0.0-RC1',
            size: '1.73MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/arm/openGauss-6.0.0-RC1-JDBC.tar.gz`,
            sha_code:
              '57a606617365a2b77e1373af5d73ed8d8bd47f02787422c055bc2cbec709919c',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_6.0.0-RC1',
            size: '9.03MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/arm/openGauss-6.0.0-RC1-ODBC.tar.gz`,
            sha_code:
              '809656e6c4c8cce92916c3147e723e9388b00a9412716d6454a495e4bfb3d814',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_6.0.0-RC1',
            size: '2.94MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/arm/openGauss-6.0.0-RC1-openEuler-aarch64-Python.tar.gz`,
            sha_code:
              '65c81b89002ddb854411710365a9d15a868df2df9ea66ee3bc237facba9ba288',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_6.0.0-RC1',
            size: '5.03MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/arm/openGauss-6.0.0-RC1-openEuler-64bit-Libpq.tar.gz`,
            sha_code:
              '7b7117e8b5ad5195ce14c7f1eb8414f783adb93b950b1e41e0eb37b4b2317c3a',
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
            name: 'JDBC_6.0.0-RC1',
            size: '1.73MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/x86_openEuler/openGauss-6.0.0-RC1-JDBC.tar.gz`,
            sha_code:
              '8f1c5ed06ad94fedfdef2a9d5acad8ba0a7f0b0797dba2d95ba7fe1190307150',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_6.0.0-RC1',
            size: '9.24MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/x86_openEuler/openGauss-6.0.0-RC1-ODBC.tar.gz`,
            sha_code:
              'a4fe0abc0ccda1a921c2e8fe60a97325b2edd9c7e0d3092a8ea09bb598b99449',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_6.0.0-RC1',
            size: '3.09MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/x86_openEuler/openGauss-6.0.0-RC1-openEuler-x86_64-Python.tar.gz`,
            sha_code:
              '5797bb84fe06d7f3079eab7ffc058c18feb117acc791c0fbc7c0c65a2915f1fe',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_6.0.0-RC1',
            size: '5.26MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/x86_openEuler/openGauss-6.0.0-RC1-openEuler-64bit-Libpq.tar.gz`,
            sha_code:
              '1e5fc0202587129a6c8cab0709b7d50dc8e371ab95de8131d18241c2fc81914f',
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
            name: 'JDBC_6.0.0-RC1',
            size: '1.73MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/x86/openGauss-6.0.0-RC1-JDBC.tar.gz`,
            sha_code:
              'f3daeffefd4a11673af75f54f845c08388d72f0801fff53081799fcbb0cb1d2f',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_6.0.0-RC1',
            size: '9.11MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/x86/openGauss-6.0.0-RC1-ODBC.tar.gz`,
            sha_code:
              '16ced045674152f6d20eb51f5e0b5c43e2fe933f8526a84fce03ccfd06a76942',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_6.0.0-RC1',
            size: '3.29MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/x86/openGauss-6.0.0-RC1-CentOS-x86_64-Python.tar.gz`,
            sha_code:
              'f6a8d173afb3d15e14fd0c2f9177be5dd29a7dcccf0d11e9f55c8d40e5c3121c',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_6.0.0-RC1',
            size: '5.14MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/x86/openGauss-6.0.0-RC1-CentOS-64bit-Libpq.tar.gz`,
            sha_code:
              '3540d8fa13cc1d489c16dc796f5116279f4a5a9b0b01ae7c5033a147394900b6',
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
            name: 'JDBC_6.0.0-RC1',
            size: '1.73MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/x86/openGauss-6.0.0-RC1-JDBC.tar.gz`,
            sha_code:
              'f98affcc98d00a631e79e4a5bdb88b17ab065bf670b0b240a61c4827712d2053',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_6.0.0-RC1',
            size: '5.24MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/windows/openGauss-6.0.0-RC1-ODBC-windows.tar.gz`,
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
            name: 'symbol_6.0.0-RC1',
            size: '395.26MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/arm_2203/openGauss-6.0.0-RC1-openEuler-64bit-symbol.tar.gz`,
            sha_code:
              '9de05140762f98268a73ab359b8682b4e4c7a6b8ff78101faceadb9c7c336488',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_6.0.0-RC1',
            size: '23.94MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/arm_2203/openGauss-6.0.0-RC1-openEuler-64bit-cm-symbol.tar.gz`,
            sha_code:
              '011f812a4d3b84ede3132c885400dea59c3597fc720982eae7e4fd1ab39b86e6',
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
            name: 'symbol_6.0.0-RC1',
            size: '392.76MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/x86_openEuler_2203/openGauss-6.0.0-RC1-openEuler-64bit-symbol.tar.gz`,
            sha_code:
              '7a6209adb1ee10dcaf21b686cd71d866842487b2d8f9160f03fb8b546c3c0afb',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_6.0.0-RC1',
            size: '22.05MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/x86_openEuler_2203/openGauss-6.0.0-RC1-openEuler-64bit-cm-symbol.tar.gz`,
            sha_code:
              '4f9ba37a07a13bb8ad1473619d0221ae7de8398371beed4eba26f6f95bc9f9d3',
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
            name: 'symbol_6.0.0-RC1',
            size: '395.768MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/arm/openGauss-6.0.0-RC1-openEuler-64bit-symbol.tar.gz`,
            sha_code:
              '5956cc744893423d846c5da1f22bf0265d17fb7ba4a5119cf7b664800ef60b9c',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_6.0.0-RC1',
            size: '23.85MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/arm/openGauss-6.0.0-RC1-openEuler-64bit-cm-symbol.tar.gz`,
            sha_code:
              'ae2ba8c691f0f32e41b8c2d521665681901f7c651ff6a9f6bb451567dc963897',
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
            name: 'symbol_6.0.0-RC1',
            size: '393.33MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/x86_openEuler/openGauss-6.0.0-RC1-openEuler-64bit-symbol.tar.gz`,
            sha_code:
              'bbdc2e3edac835b1d56c139a563eb6c3b89f3cde8a4af7fbf58bc738d6b11992',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_6.0.0-RC1',
            size: '22.04MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/x86_openEuler/openGauss-6.0.0-RC1-openEuler-64bit-cm-symbol.tar.gz`,
            sha_code:
              'bd75af31fae7045bb8cbbd968927b0c0aa9d1fd1251e1bf520d34f91030ceb97',
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
            name: 'symbol_6.0.0-RC1',
            size: '380.46MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/x86/openGauss-6.0.0-RC1-CentOS-64bit-symbol.tar.gz`,
            sha_code:
              '45a65fa380e35a15bea11c9db52ecf99994a8eab598520e5f89f01724f742f04',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_6.0.0-RC1',
            size: '20.74MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/x86/openGauss-6.0.0-RC1-CentOS-64bit-cm-symbol.tar.gz`,
            sha_code:
              '5f6b1d19e13dc3e9ad8ae9297e260d23342764eecfbbb3d6aadfa10ba0f0cf33',
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
            name: 'replicate-mysql2openGauss_6.0.0-RC1',
            size: '10.44MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/tools/replicate-mysql2openGauss-6.0.0rc1.tar.gz`,
            sha_code:
              '671a8032418febb864df439e62aa9da5e70c92898d5c6a59b9f8f408c3834058',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'replicate-openGauss2mysql_6.0.0-RC1',
            size: '15.41MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/tools/replicate-openGauss2mysql-6.0.0rc1.tar.gz`,
            sha_code:
              'd967b14e29e02128ccb0bf60c4a406fa25a05c0ac622bb505b40606b4f35f4b3',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'gs_datacheck_6.0.0-RC1',
            size: '83.69MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/tools/gs_datacheck-6.0.0rc1.tar.gz`,
            sha_code:
              'd1351320a5858d9d4adc971f60a6026257cab02109544398f1bff754bcea1509',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Datakit_6.0.0-RC1',
            size: '869.54MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/tools/Datakit/Datakit-6.0.0-RC1.tar.gz`,
            sha_code:
              '6e8e7487183131dda020fa158554e51feb27a98482ac4db88a1b23331030fe0c',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'dbmind_6.0.0-RC1',
            size: '275.63MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/dbmind/arm/dbmind-installer-aarch64-python3.11.sh.tar.gz`,
            sha_code:
              '04d7560d40f004b743a7727d85cfce03414ef349b1a4f7f37d02790a46a786e2',
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
            name: 'replicate-mysql2openGauss_6.0.0-RC1',
            size: '10.44MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/tools/replicate-mysql2openGauss-6.0.0-RC1.tar.gz`,
            sha_code:
              '671a8032418febb864df439e62aa9da5e70c92898d5c6a59b9f8f408c3834058',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'replicate-openGauss2mysql_6.0.0-RC1',
            size: '15.41MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/tools/replicate-openGauss2mysql-6.0.0-RC1.tar.gz`,
            sha_code:
              'd967b14e29e02128ccb0bf60c4a406fa25a05c0ac622bb505b40606b4f35f4b3',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'gs_datacheck_6.0.0-RC1',
            size: '83.69MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/tools/gs_datacheck-6.0.0-RC1.tar.gz`,
            sha_code:
              'd1351320a5858d9d4adc971f60a6026257cab02109544398f1bff754bcea1509',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Datakit_6.0.0-RC1',
            size: '869.54MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/tools/Datakit/Datakit-6.0.0-RC1.tar.gz`,
            sha_code:
              '6e8e7487183131dda020fa158554e51feb27a98482ac4db88a1b23331030fe0c',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'dbmind_6.0.0-RC1',
            size: '275.63MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/dbmind/x86/dbmind-installer-x86_64-python3.11.sh.tar.gz`,
            sha_code:
              '2846c00d28d9b6b8f0675708efca95604140b654f2f2f40cd1091cd4dadde38b',
            docsName: '',
            docs_url: '',
          },
        ],
      },
      {
        system: 'Windows',
        architecture: 'x86_64',
        os: 'Windows',
        docs: true,
        content: [
          {
            name: 'Data Studio_6.0.0-RC1',
            size: '98.72MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/tools/DataStudio_win_64.zip`,
            sha_code:
              'c3e3f16a68e6bd7f7e8c963f638f6afd486c907e99926963021602e297d88390',
            docsName: '使用文档',
            docs_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/tools/Data%20Studio%20%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C.pdf`,
          },
        ],
      },
      {
        system: 'openEuler 22.03 LTS (aarch64)',
        architecture: 'AArch64',
        os: 'openEuler 22.03 LTS',
        content: [
          {
            name: 'Chameleon_6.0.0-RC1',
            size: '74.53MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/tools/openEuler22.03/chameleon-6.0.0rc1-aarch64.tar.gz`,
            sha_code:
              'bfb8d40c40467ac3d34f977ecbcda166483ef6ffacddad70cc8c0b8255f37fd6',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'PortalControl_6.0.0-RC1',
            size: '589.83MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/tools/openEuler22.03/PortalControl-6.0.0rc1-aarch64.tar.gz`,
            sha_code:
              'aaf3c5a2b0813f95d6b76b2b0ba962ce43ff7de17ce16d67fbbdbc79215733e6',
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
            name: 'Chameleon_6.0.0-RC1',
            size: '74.78MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/tools/openEuler22.03/chameleon-6.0.0rc1-x86_64.tar.gz`,
            sha_code:
              '11ae52f059863d0118203fc64aa858d85579cc1a55b7e29d7823c76ae8bae356',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'PortalControl_6.0.0-RC1',
            size: '589.36MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/tools/openEuler22.03/PortalControl-6.0.0rc1-x86_64.tar.gz`,
            sha_code:
              '550265c9d40d95831a20bd2e003936376ffc385e4e6333408c7a087990f09306',
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
            name: 'Chameleon_6.0.0-RC1',
            size: '72.00MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/tools/openEuler20.03/chameleon-6.0.0rc1-aarch64.tar.gz`,
            sha_code:
              'f6d0c4b34eeead4e45fbefb23a13417451e1f7be125948d3606ea41d38208ae3',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'PortalControl_6.0.0-RC1',
            size: '587.25MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/tools/openEuler20.03/PortalControl-6.0.0rc1-aarch64.tar.gz`,
            sha_code:
              '83b085c0cf191e35a7830848d319395855d706bbc56ab3778b59b11c4da837fe',
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
            name: 'Chameleon_6.0.0-RC1',
            size: '71.20MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/tools/openEuler20.03/chameleon-6.0.0rc1-x86_64.tar.gz`,
            sha_code:
              '14ed8d7dd3d52cef0e8747a628cb643f8d2f749cea383f19bfaa112d3c6fe852',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'PortalControl_6.0.0-RC1',
            size: '586.50MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/tools/openEuler20.03/PortalControl-6.0.0rc1-x86_64.tar.gz`,
            sha_code:
              '90b642eaf762149f24c025feaabf4ae66a2f25f6c71d6e7186b8ad57eb4aee99',
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
            name: 'Chameleon_6.0.0-RC1',
            size: '72.01MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/tools/centos7/chameleon-6.0.0rc1-x86_64.tar.gzz`,
            sha_code:
              'd83dae4972b4d9f900c6b1e9c85f4a7912b93a835b08efc634dbf3e07d3599a4',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'PortalControl_6.0.0-RC1',
            size: '587.35MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0-RC1/tools/centos7/PortalControl-6.0.0rc1-x86_64.tar.gz`,
            sha_code:
              '4317e66768d9f5152691f4634c8766dd4db3e39ee69716660f44f197807b407d',
            docsName: '',
            docs_url: '',
          },
        ],
      },
    ],
  },
];
