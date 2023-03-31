export default [
  {
    name: 'openGauss Server',
    thead: ['Software Package', 'Size', 'Download', 'Integrity Check', 'Description Document'],
    content: [
      {
        system: 'openEuler 22.03 LTS (x86_64)',
        docs: true,
        content: [
          {
            name: 'openGauss_5.0.0 Enterprise-Edition',
            table: 'server',
            size: '126.78MB',
            edition: 'enterprise',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/x86_openEuler_2203/openGauss-5.0.0-openEuler-64bit-all.tar.gz',
            sha_code:
              'eba32db3b0fb70020b7d7da754d898994fbf5f3e8f5f94c35e2fb29898cdc1f4',
            docsName: 'Enterprise-Edition Installation Guide',
            docs_url:
              '/docs/5.0.0/docs/InstallationGuide/%E4%BC%81%E4%B8%9A%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_5.0.0 Simplified',
            table: 'server',
            size: '95.41MB',
            edition: 'simple',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/x86_openEuler_2203/openGauss-5.0.0-openEuler-64bit.tar.bz2',
            sha_code:
              'e5cb78d48147fdbe2b5743caa992fa0b69dda1c104051fcd720f347d2afff4e0',
            docsName: 'Simplified Installation Guide',
            docs_url:
              '/docs/5.0.0/docs/InstallationGuide/%E6%9E%81%E7%AE%80%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_5.0.0 Lite',
            table: 'server',
            size: '22.32MB',
            edition: 'lite',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/x86_openEuler_2203/openGauss-Lite-5.0.0-openEuler-x86_64.tar.gz',
            sha_code:
              '41bb5b4c7e0ff5cbac9db432bd87141bb57f6cdf858790b6bb4745985b8ec28e',
            docsName: 'Lite Installation Guide',
            docs_url:
              '/docs/5.0.0-lite/docs/InstallationGuide/%E5%AE%89%E8%A3%85%E6%A6%82%E8%BF%B0.html',
          },
        ],
      },
      {
        system: 'openEuler 22.03 LTS (aarch64)',
        docs: true,
        content: [
          {
            name: 'openGauss_5.0.0 Enterprise-Edition',
            table: 'server',
            size: '120.99MB',
            edition: 'enterprise',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/arm_2203/openGauss-5.0.0-openEuler-64bit-all.tar.gz',
            sha_code:
              '589062c8de67ec8b7b00fb58d33331eedb19702ea47c2a55e1bcde06676a5a81',
            docsName: 'Enterprise-Edition Installation Guide',
            docs_url:
              '/docs/5.0.0/docs/InstallationGuide/%E4%BC%81%E4%B8%9A%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_5.0.0 Simplified',
            table: 'server',
            size: '89.87MB',
            edition: 'simple',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/arm_2203/openGauss-5.0.0-openEuler-64bit.tar.bz2',
            sha_code:
              'ab583cdd61d77ab8dd8833796a500c515d81d57deeb7b4697352c3266601be70',
            docsName: 'Simplified Installation Guide',
            docs_url:
              '/docs/5.0.0/docs/InstallationGuide/%E6%9E%81%E7%AE%80%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_5.0.0 Lite',
            table: 'server',
            size: '21.37MB',
            edition: 'lite',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/arm_2203/openGauss-Lite-5.0.0-openEuler-aarch64.tar.gz',
            sha_code:
              '8af0212b84a926d2f904b35ce9545abe12bfa60882a903231043a6e197c15342',
            docsName: 'Lite Installation Guide',
            docs_url:
              '/docs/5.0.0-lite/docs/InstallationGuide/%E5%AE%89%E8%A3%85%E6%A6%82%E8%BF%B0.html',
          },
        ],
      },
      {
        system: 'openEuler 20.03 LTS (x86_64)',
        docs: true,
        content: [
          {
            name: 'openGauss_5.0.0 Enterprise-Edition',
            table: 'server',
            size: '126.80MB',
            edition: 'enterprise',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/x86_openEuler/openGauss-5.0.0-openEuler-64bit-all.tar.gz',
            sha_code:
              'f2d3df77abd8f5a0658d3002cfe53e13c7375203ce3a8f4cfeb727be07e32b1c',
            docsName: 'Enterprise-Edition Installation Guide',
            docs_url:
              '/docs/5.0.0/docs/InstallationGuide/%E4%BC%81%E4%B8%9A%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_5.0.0 Simplified',
            table: 'server',
            size: '95.43MB',
            edition: 'simple',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/x86_openEuler/openGauss-5.0.0-openEuler-64bit.tar.bz2',
            sha_code:
              '589cc73ab8442c3de2fc8f133602ef7a47c98f848cc3c8a6fab40a67110de749',
            docsName: 'Simplified Installation Guide',
            docs_url:
              '/docs/5.0.0/docs/InstallationGuide/%E6%9E%81%E7%AE%80%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_5.0.0 Lite',
            table: 'server',
            size: '22.32MB',
            edition: 'simple',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/x86_openEuler/openGauss-Lite-5.0.0-openEuler-x86_64.tar.gz',
            sha_code:
              '91fe9adaebea73bcb92da7cf9d061cd5c6464f416ae77933c9bd4f748f3cd4b2',
            docsName: 'Lite Installation Guide',
            docs_url:
              '/docs/5.0.0-lite/docs/InstallationGuide/%E5%AE%89%E8%A3%85%E6%A6%82%E8%BF%B0.html',
          },
        ],
      },
      {
        system: 'openEuler 20.03 LTS (aarch64)',
        docs: true,
        content: [
          {
            name: 'openGauss_5.0.0 Enterprise-Edition',
            table: 'server',
            size: '120.95MB',
            edition: 'enterprise',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/arm/openGauss-5.0.0-openEuler-64bit-all.tar.gz',
            sha_code:
              '6082b990953b6cfbb2abddb207f803f9fd35db3744bdb45c292418f8fba4979d',
            docsName: 'Enterprise-Edition Installation Guide',
            docs_url:
              '/docs/5.0.0/docs/InstallationGuide/%E4%BC%81%E4%B8%9A%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_5.0.0 Simplified',
            table: 'server',
            size: '89.86MB',
            edition: 'simple',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/arm/openGauss-5.0.0-openEuler-64bit.tar.bz2',
            sha_code:
              'b69e48577dda3f8edd97fd48f1562042ecee4c6b6c78388cdb27dcb0ce1b4c94',
            docsName: 'Simplified Installation Guide',
            docs_url:
              '/docs/5.0.0/docs/InstallationGuide/%E6%9E%81%E7%AE%80%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_5.0.0 Lite',
            table: 'server',
            size: '21.37MB',
            edition: 'simple',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/arm/openGauss-Lite-5.0.0-openEuler-aarch64.tar.gz',
            sha_code:
              '77c8c9f4de7c5bf438897c70d14a6c08f37979e6b068946ac41dd2ebdb67e0f3',
            docsName: 'Lite Installation Guide',
            docs_url:
              '/docs/5.0.0-lite/docs/InstallationGuide/%E5%AE%89%E8%A3%85%E6%A6%82%E8%BF%B0.html',
          },
          {
            name: 'openGauss_5.0.0 Distributed',
            table: 'server',
            size: '3.41GB',
            edition: 'distributed',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/distributed/openGauss-distributed-aarch64-image.tar.gz',
            sha_code:
              'd38fd8937534aa9d7b1fb34d92aefd16169c0cc737abc68da1361a9c6824cf60',
            docsName: '',
            docs_url: '',
          },
        ],
      },
      {
        system: 'Centos 7.6 (x86_64)',
        docs: true,
        content: [
          {
            name: 'openGauss_5.0.0 Enterprise-Edition',
            table: 'server',
            size: '126.91MB',
            edition: 'enterprise',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/x86/openGauss-5.0.0-CentOS-64bit-all.tar.gz',
            sha_code:
              'aa9fc724c5030f4cc79dad201675183029c8f36a07667028e681169a2f6482f5',
            docsName: 'Enterprise-Edition Installation Guide',
            docs_url:
              '/docs/5.0.0/docs/InstallationGuide/%E4%BC%81%E4%B8%9A%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_5.0.0 Simplified',
            table: 'server',
            size: '94.78MB',
            edition: 'simple',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/x86/openGauss-5.0.0-CentOS-64bit.tar.bz2',
            sha_code:
              'a9d3c809a13a0aee844d41bd89839a45b021004d2404ac04187657cf21b8dd83',
            docsName: 'Simplified Installation Guide',
            docs_url:
              '/docs/5.0.0/docs/InstallationGuide/%E6%9E%81%E7%AE%80%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_5.0.0 Lite',
            table: 'server',
            size: '22.14MB',
            edition: 'enterprise',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/x86/openGauss-Lite-5.0.0-CentOS-x86_64.tar.gz',
            sha_code:
              'bd3ed37700cad798d8af72864b782647a2a739492360b1efdb136eef4a252016',
            docsName: 'Lite Installation Guide',
            docs_url:
              '/docs/5.0.0-lite/docs/InstallationGuide/%E5%AE%89%E8%A3%85%E6%A6%82%E8%BF%B0.html',
          },
          {
            name: 'openGauss_5.0.0 Distributed',
            table: 'server',
            size: '3.29GB',
            edition: 'distributed',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/distributed/openGauss-distributed-x86_64-image.tar.gz',
            sha_code:
              '0c30383cd3f94abae765de3f14e6323008293f8d665f442f56fcfb25aea690ce',
            docsName: '',
            docs_url: '',
          },
        ],
      },
    ],
  },
  {
    name: 'openGauss Connectors',
    thead: ['Software Package', 'Size', 'Download', 'Integrity Check', ''],
    content: [
      {
        system: 'openEuler 22.03 LTS (x86_64)',
        content: [
          {
            name: 'JDBC_5.0.0',
            size: '1.63MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/x86_openEuler_2203/openGauss-5.0.0-JDBC.tar.gz',
            sha_code:
              '31c292d56c0d286bc2c976a971e2ece87b8d159fa119d8b8951860bd39eda441',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_5.0.0',
            size: '9.02MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/x86_openEuler_2203/openGauss-5.0.0-ODBC.tar.gz',
            sha_code:
              '70ec7f259684b8050426701e163336d9c6fd0ba8aef517182f39b0a2f1997e08',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_5.0.0',
            size: '2.91MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/x86_openEuler_2203/openGauss-5.0.0-openEuler-x86_64-Python.tar.gz',
            sha_code:
              '7bf30cd6cc4b0ac63abdd8c406310d7580e0a2d82b0dd82237f34952272a9a34',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_5.0.0',
            size: '5.00MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/x86_openEuler_2203/openGauss-5.0.0-openEuler-64bit-Libpq.tar.gz',
            sha_code:
              'f9c959e6ded4fcee897222e06f92f49f0be473779b128ed7027f2b3265a2c276',
            docsName: '',
            docs_url: '',
          },
        ],
      },
      {
        system: 'openEuler 22.03 LTS (aarch64)',
        content: [
          {
            name: 'JDBC_5.0.0',
            size: '1.63MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/arm_2203/openGauss-5.0.0-JDBC.tar.gz',
            sha_code:
              '9950affcb8f51d2cf66dc05b1e95ddcc20d7be93215bf408162f55adcdf9ef4f',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_5.0.0',
            size: '8.32MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/arm_2203/openGauss-5.0.0-ODBC.tar.gz',
            sha_code:
              '493149fee3a2b9cd171042dad46622667d88c8da90a2370adf0d565e642a38d7',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_5.0.0',
            size: '2.61MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/arm_2203/openGauss-5.0.0-openEuler-aarch64-Python.tar.gz',
            sha_code:
              '7bb2643564b4d86d9e5074d4dee007453d7ef9dc4ee8e37740dff7767f3a0966',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_5.0.0',
            size: '4.51MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/arm_2203/openGauss-5.0.0-openEuler-64bit-Libpq.tar.gz',
            sha_code:
              '416c7535fbe5dbf1362966f1f7024823279f8c5933fa8e15840b88809a255ce2',
            docsName: '',
            docs_url: '',
          },
        ],
      },
      {
        system: 'openEuler 20.03 LTS (x86_64)',
        content: [
          {
            name: 'JDBC_5.0.0',
            size: '1.63MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/x86_openEuler/openGauss-5.0.0-JDBC.tar.gz',
            sha_code:
              'e90754b90d36e16b64f85cfbf7053814075ca04b80b6c62a6f5e72c7e8b0386d',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_5.0.0',
            size: '9.03MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/x86_openEuler/openGauss-5.0.0-ODBC.tar.gz',
            sha_code:
              '152da313f38279bea0c5e1c03a44f0b2b90efc2cd5d91d6366a838cfbe21b693',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_5.0.0',
            size: '2.91MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/x86_openEuler/openGauss-5.0.0-openEuler-x86_64-Python.tar.gz',
            sha_code:
              'b16b343ba5ca5a164b5aa3a7d62a70a5de58d208ddea9b657b8b31ae2829206e',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_5.0.0',
            size: '5.00MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/x86_openEuler/openGauss-5.0.0-openEuler-64bit-Libpq.tar.gz',
            sha_code:
              'e2116fa2a1884bc5ca3d8bc0d953277185f355a584cf03d320607c77cd223a52',
            docsName: '',
            docs_url: '',
          },
        ],
      },
      {
        system: 'openEuler 20.03 LTS (aarch64)',
        content: [
          {
            name: 'JDBC_5.0.0',
            size: '1.63MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/arm/openGauss-5.0.0-JDBC.tar.gz',
            sha_code:
              '38c4bccfdb6621baf3ac93f4428b1f98c1f9f9602230ad99a7e76a74dcfaff39',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_5.0.0',
            size: '8.33MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/arm/openGauss-5.0.0-ODBC.tar.gz',
            sha_code:
              'b2cfbb56056e88973003751d3cdbb0d8bf2df18379aa206532e0659333c5962e',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_5.0.0',
            size: '2.60MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/arm/openGauss-5.0.0-openEuler-aarch64-Python.tar.gz',
            sha_code:
              'd5e4f4496d30921e878f2bbaba15327ec5f17ef2a5c0f6f58d2ed9784c9bb131',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_5.0.0',
            size: '4.51MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/arm/openGauss-5.0.0-openEuler-64bit-Libpq.tar.gz',
            sha_code:
              '0736a4dc7747685f76326533a101d528c0837f4b6ba1217dd068cdc5ff2bb47d',
            docsName: '',
            docs_url: '',
          },
        ],
      },
      {
        system: 'Centos 7.6 (x86_64)',
        content: [
          {
            name: 'JDBC_5.0.0',
            size: '1.63MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/x86/openGauss-5.0.0-JDBC.tar.gz',
            sha_code:
              'e230ecea6537d0f9999297936edcc7ab2b608db27f1dada74357cab6a99a12e6',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_5.0.0',
            size: '8.90MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/x86/openGauss-5.0.0-ODBC.tar.gz',
            sha_code:
              'cd6b0ce939999be73d62e90597d6d500023d4592bbbaa75d40741fcdd95143da',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_5.0.0',
            size: '3.12MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/x86/openGauss-5.0.0-CentOS-x86_64-Python.tar.gz',
            sha_code:
              '631aaffcccca3f4ab15c06922d5451ed7bdab3fa965109a0c624778b2615cc49',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_5.0.0',
            size: '4.89MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/x86/openGauss-5.0.0-CentOS-64bit-Libpq.tar.gz',
            sha_code:
              '9ef7584d4d44da466e8e7294076da1188c0578d48a238d2f2cfce558c32ded03',
            docsName: '',
            docs_url: '',
          },
        ],
      },
      {
        system: 'Windows',
        content: [
          {
            name: 'JDBC_5.0.0',
            size: '1.63MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/x86/openGauss-5.0.0-JDBC.tar.gz',
            sha_code:
              'e230ecea6537d0f9999297936edcc7ab2b608db27f1dada74357cab6a99a12e6',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_5.0.0',
            size: '5.24MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/windows/openGauss-5.0.0-ODBC-windows.tar.gz',
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
    thead: ['Software Package', 'Size', 'Download', 'Integrity Check', ''],
    content: [
      {
        system: 'openEuler 22.03 LTS (x86_64)',
        content: [
          {
            name: 'symbol_5.0.0',
            size: '387.47MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/x86_openEuler_2203/openGauss-5.0.0-openEuler-64bit-symbol.tar.gz',
            sha_code:
              '284be2daac2694d6e0b04d20c7ba8a4531d64ea6176682ab8f2dd31b1721f2ff',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_5.0.0',
            size: '20.66MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/x86_openEuler_2203/openGauss-5.0.0-openEuler-64bit-cm-symbol.tar.gz',
            sha_code:
              '32f7b9de93bcb59986057c6cc70503f5b1a933d876c8c50eb69ef462260fa18c',
            docsName: '',
            docs_url: '',
          },
        ],
      },
      {
        system: 'openEuler 22.03 LTS (aarch64)',
        content: [
          {
            name: 'symbol_5.0.0',
            size: '391.27MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/arm_2203/openGauss-5.0.0-openEuler-64bit-symbol.tar.gz',
            sha_code:
              '725b7c4d6544dbe18c841f01b38c6f549b7737095697d069e4cf4219279bf8eb',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_5.0.0',
            size: '22.24MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/arm_2203/openGauss-5.0.0-openEuler-64bit-cm-symbol.tar.gz',
            sha_code:
              '778e6e692a945af653161389b9a51434e6ea666d27eaab9615b7019b5eb19c78',
            docsName: '',
            docs_url: '',
          },
        ],
      },
      {
        system: 'openEuler 20.03 LTS (x86_64)',
        content: [
          {
            name: 'symbol_5.0.0',
            size: '386.60MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/x86_openEuler/openGauss-5.0.0-openEuler-64bit-symbol.tar.gz',
            sha_code:
              'ed258f383e23d6dc93114db4e1d2a9cfdef12a4102cb431d0b868243f4209f61',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_5.0.0',
            size: '20.66MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/x86_openEuler/openGauss-5.0.0-openEuler-64bit-cm-symbol.tar.gz',
            sha_code:
              '359ea5530634f4d1dac9dca4281aedfce25bbf3f70019f8dc2043b5db2274282',
            docsName: '',
            docs_url: '',
          },
        ],
      },
      {
        system: 'openEuler 20.03 LTS (aarch64)',
        content: [
          {
            name: 'symbol_5.0.0',
            size: '390.33MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/arm/openGauss-5.0.0-openEuler-64bit-symbol.tar.gz',
            sha_code:
              'df0252170eeb3d0f99e574d77b34652433dc3b51327a800e4cc0ac9907c769d4',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_5.0.0',
            size: '22.17MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/arm/openGauss-5.0.0-openEuler-64bit-cm-symbol.tar.gz',
            sha_code:
              '3d85617d873901fbbe94f5f45267e4bca6dd041713bd1865e8f57f75ab056e97',
            docsName: '',
            docs_url: '',
          },
        ],
      },
      {
        system: 'Centos 7.6 (x86_64)',
        content: [
          {
            name: 'symbol_5.0.0',
            size: '385.58MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/x86/openGauss-5.0.0-CentOS-64bit-symbol.tar.gz',
            sha_code:
              '50fd56fc7948da12b2ab8c43ed9607fc87f40656be96600dc4ee864e9b7cc159',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_5.0.0',
            size: '20.63MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/x86/openGauss-5.0.0-CentOS-64bit-cm-symbol.tar.gz',
            sha_code:
              'dee39e8f773d5cfa1c13a6bbb2a7fe5690d5a69908dcc79c12c857cdc19148b9',
            docsName: '',
            docs_url: '',
          },
        ],
      },
    ],
  },
  {
    name: 'openGauss Tools',
    thead: ['Software Package', 'Size', 'Download', 'Integrity Check', 'Description Document'],
    content: [
      {
        system: 'Linux (x86_64)',
        content: [
          {
            name: 'Chameleon_5.0.0',
            size: '6.29MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/tools/chameleon-5.0.0-py3-none-any.whl',
            sha_code:
              '20c286a6d392f0e004677727b3939c026757b3697912ba7ddd4ee854e01ad907',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'replicate-mysql2openGauss_5.0.0',
            size: '9.74MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/tools/replicate-mysql2openGauss-5.0.0.tar.gz',
            sha_code:
              '491c8aa317a8a2038199b6336d7dc51b22ab02fc27750e3fcf536962a0e3a904',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'replicate-openGauss2mysql_5.0.0',
            size: '8.23MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/tools/replicate-openGauss2mysql-5.0.0.tar.gz',
            sha_code:
              'cd430b0e0a2d485cc89d6174839e6407786046c9c314820d837b30c648a4290e',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'gs_datacheck_5.0.0',
            size: '180.73MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/tools/gs_datacheck-5.0.0.tar.gz',
            sha_code:
              '4bdfbf92758f5fc4b9bf33942f4dbbb5943038835e5908232dc8e9efd854d983',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Datakit_5.0.0',
            size: '356.05MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/tools/Datakit-5.0.0.tar.gz',
            sha_code:
              '1240a6d866a35c5fa057aa937297d4670da950cc0cb5fab19f271ac482479804',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'dbmind_5.0.0',
            size: '216.92MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/dbmind/x86/dbmind-installer-x86_64-python3.10.sh.tar.gz',
            sha_code:
              '3766a6928112a0636deb17659a062a8f55f4dea6fc7636c3547a90b115e1df8a',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'PortalControl_5.0.0',
            size: '701.68MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/tools/portal/PortalControl-5.0.0.tar.gz',
            sha_code:
              '5574f496a3e5a116ffe25a690aeb888ae673e3be843cce4dcb0eb0ad386d4d30',
            docsName: '',
            docs_url: '',
          },
        ],
      },
      {
        system: 'Linux (aarch64)',
        content: [
          {
            name: 'Chameleon_5.0.0',
            size: '6.29MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/tools/chameleon-5.0.0-py3-none-any.whl',
            sha_code:
              '20c286a6d392f0e004677727b3939c026757b3697912ba7ddd4ee854e01ad907',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'replicate-mysql2openGauss_5.0.0',
            size: '9.74MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/tools/replicate-mysql2openGauss-5.0.0.tar.gz',
            sha_code:
              '491c8aa317a8a2038199b6336d7dc51b22ab02fc27750e3fcf536962a0e3a904',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'replicate-openGauss2mysql_5.0.0',
            size: '8.23MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/tools/replicate-openGauss2mysql-5.0.0.tar.gz',
            sha_code:
              'cd430b0e0a2d485cc89d6174839e6407786046c9c314820d837b30c648a4290e',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'gs_datacheck_5.0.0',
            size: '180.73MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/tools/gs_datacheck-5.0.0.tar.gz',
            sha_code:
              '4bdfbf92758f5fc4b9bf33942f4dbbb5943038835e5908232dc8e9efd854d983',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Datakit_5.0.0',
            size: '356.05MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/tools/Datakit-5.0.0.tar.gz',
            sha_code:
              '1240a6d866a35c5fa057aa937297d4670da950cc0cb5fab19f271ac482479804',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'dbmind_5.0.0',
            size: '153.62MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/dbmind/arm/dbmind-installer-aarch64-python3.10.sh.tar.gz',
            sha_code:
              '313be578b2f73a5a38ed34ce35d54b642d86fbbc1451c9b9927622b8f78e7593',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'PortalControl_5.0.0',
            size: '701.68MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/tools/portal/PortalControl-5.0.0.tar.gz',
            sha_code:
              '5574f496a3e5a116ffe25a690aeb888ae673e3be843cce4dcb0eb0ad386d4d30',
            docsName: '',
            docs_url: '',
          },
        ],
      },
      {
        system: 'Windows',
        docs: true,
        content: [
          {
            name: 'Data Studio_5.0.0',
            size: '98.69MB',
            down_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/tools/DataStudio_win_64.zip',
            sha_code:
              '5a8b3759d9c51e9d162662814ab6a3b8efd0f40981ae2298f23ee59b88d9cd2e',
            docsName: '使用文档',
            docs_url:
              'https://opengauss.obs.cn-south-1.myhuaweicloud.com/5.0.0/tools/Data%20Studio%20%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C.pdf',
          },
        ],
      },
    ],
  },
];
