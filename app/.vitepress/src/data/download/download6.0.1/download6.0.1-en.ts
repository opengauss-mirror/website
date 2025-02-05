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
            name: 'openGauss_6.0.1 Enterprise-Edition',            
            size: '143.96MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/openEuler22.03/arm/openGauss-All-6.0.1-openEuler22.03-aarch64.tar.gz`,
            sha_code:
              '66650c6b1239b61320b7aa385c20e2d83f4bd6ef5330623f6e55e821dcfe6076',
            docsName: '企业版安装指南',
            docs_url:
              '/docs/6.0.0/docs/InstallationGuide/enterprise-edition-installation-process.html',
          },
          {
            name: 'openGauss_6.0.1 Simplified',
            size: '100.82MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/openEuler22.03/arm/openGauss-Server-6.0.1-openEuler22.03-aarch64.tar.bz2`,
            sha_code:
              '4b5af09bd1b3f11604f8b48cc70bdc136afc21656dc96bb9f556ce3b70820098',
            docsName: '极简版安装指南',
            docs_url:
              '/docs/6.0.0/docs/InstallationGuide/simplified-installation-process.html',
          },
          {
            name: 'openGauss_6.0.1 Lite',
            size: '28.02MB',
            edition: 'lite',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/openEuler22.03/arm/openGauss-Lite-6.0.1-openEuler22.03-aarch64.tar.gz`,
            sha_code:
              '292dc762031d0ebd3d3c977bc346c3aa4fe4afb131214c8e20152c401473606e',
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
            name: 'openGauss_6.0.1 Enterprise-Edition',
            size: '147.62MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/openEuler22.03/x86/openGauss-All-6.0.1-openEuler22.03-x86_64.tar.gz`,
            sha_code:
              '0144a5dd75ce1b8df1f9f6a6940793a2008414a825b787f64de0b6acd8d9fc92',
            docsName: '企业版安装指南',
            docs_url:
              '/docs/6.0.0/docs/InstallationGuide/enterprise-edition-installation-process.html',
          },
          {
            name: 'openGauss_6.0.1 Simplified',
            size: '104.26MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/openEuler22.03/x86/openGauss-Server-6.0.1-openEuler22.03-x86_64.tar.bz2`,
            sha_code:
              'f0dda446c74662293de36635e40a9bb5d1a314ca14c6a5c7edd2be48aafe506b',
            docsName: '极简版安装指南',
            docs_url:
              '/docs/6.0.0/docs/InstallationGuide/simplified-installation-process.html',
          },
          {
            name: 'openGauss_6.0.1 Lite',
            size: '29.02MB',
            edition: 'lite',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/openEuler22.03/x86/openGauss-Lite-6.0.1-openEuler22.03-x86_64.tar.gz`,
            sha_code:
              '1d573aa0062d835931110c7dcad51c5c4fcc439c70069105ff440049c6803334',
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
            name: 'openGauss_6.0.1 Enterprise-Edition',
            size: '143.78MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/openEuler20.03/arm/openGauss-All-6.0.1-openEuler20.03-aarch64.tar.gz`,
            sha_code:
              '933ac815896234481f544b8095e6f359de8643edc0ecaf6cc700e7393f2a7bf0',
            docsName: '企业版安装指南',
            docs_url:
              '/docs/6.0.0/docs/InstallationGuide/enterprise-edition-installation-process.html',
          },
          {
            name: 'openGauss_6.0.1 Simplified',
            size: '100.83MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/openEuler20.03/arm/openGauss-Server-6.0.1-openEuler20.03-aarch64.tar.bz2`,
            sha_code:
              '54700c6427ec214608a94b58b3eef0f4a20039cdb514e15597ecc1a53e6550e0',
            docsName: '极简版安装指南',
            docs_url:
              '/docs/6.0.0/docs/InstallationGuide/simplified-installation-process.html',
          },
          {
            name: 'openGauss_6.0.1 Lite',
            size: '28.03MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/openEuler20.03/arm/openGauss-Lite-6.0.1-openEuler20.03-aarch64.tar.gz`,
            sha_code:
              '0c37c81da21d9f74ce6e6679ecc6f1a8f8bae1ee1451f4d7221f8cf9d6bbe765',
            docsName: '轻量版安装指南',
            docs_url:
              '/docs/6.0.0-lite/docs/InstallationGuide/installation-overview.html',
          },
          {
            name: 'openGauss_6.0.1 Distributed',
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
            name: 'openGauss_6.0.1 Enterprise-Edition',
            size: '148.18MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/openEuler20.03/x86/openGauss-All-6.0.1-openEuler20.03-x86_64.tar.gz`,
            sha_code:
              'c51967ec6db5a9a84ecdd42f5884e28c50fa7226bcd0b67b6ea3256caa293b1a',
            docsName: '企业版安装指南',
            docs_url:
              '/docs/6.0.0/docs/InstallationGuide/enterprise-edition-installation-process.html',
          },
          {
            name: 'openGauss_6.0.1 Simplified',
            size: '104.48MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/openEuler20.03/x86/openGauss-Server-6.0.1-openEuler20.03-x86_64.tar.bz2`,
            sha_code:
              'e2afb7370f7976bfc26bfd74f9df1022a902faa22d3c5257e6f21794ed92f3d6',
            docsName: '极简版安装指南',
            docs_url:
              '/docs/6.0.0/docs/InstallationGuide/simplified-installation-process.html',
          },
          {
            name: 'openGauss_6.0.1 Lite',
            size: '29.39MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/openEuler20.03/x86/openGauss-Lite-6.0.1-openEuler20.03-x86_64.tar.gz`,
            sha_code:
              '57343e5b3b8f4a741cd3509dc4a00a491a4aff4a52b8310bc642c717df98a711',
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
            name: 'openGauss_6.0.1 Enterprise-Edition',
            size: '146.25MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/CentOS7/x86/openGauss-All-6.0.1-CentOS7-x86_64.tar.gz`,
            sha_code:
              '1f4f7d63811f8515682bf86a217a5720c2778ec35c94331a8d477225b870c595',
            docsName: '企业版安装指南',
            docs_url:
              '/docs/6.0.0/docs/InstallationGuide/enterprise-edition-installation-process.html',
          },
          {
            name: 'openGauss_6.0.1 Simplified',
            size: '103.55MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/CentOS7/x86/openGauss-Server-6.0.1-CentOS7-x86_64.tar.bz2`,
            sha_code:
              '1f86a0622adb67b09fc5d4aa83ae4c418d4d963b1f192c1831df7c15aa863632',
            docsName: '极简版安装指南',
            docs_url:
              '/docs/6.0.0/docs/InstallationGuide/simplified-installation-process.html',
          },
          {
            name: 'openGauss_6.0.1 Lite',
            size: '28.95MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/CentOS7/x86/openGauss-Lite-6.0.1-CentOS7-x86_64.tar.gz`,
            sha_code:
              '11c2a75e621cbbed91ec252ffc16f27fb48149ce71eade31e1700785977c9c2c',
            docsName: '轻量版安装指南',
            docs_url:
              '/docs/6.0.0-lite/docs/InstallationGuide/installation-overview.html',
          },
          {
            name: 'openGauss_6.0.1 Distributed',
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
            name: 'JDBC_6.0.1',
            size: '1.75MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/openEuler22.03/arm/openGauss-JDBC-6.0.1.tar.gz`,
            sha_code:
              '3b0786b565b028765578290a9958cb34ef9c5df84190095c02e5c67a8b4c0c82',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_6.0.1',
            size: '9.04MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/openEuler22.03/arm/openGauss-ODBC-6.0.1-openEuler22.03-aarch64.tar.gz`,
            sha_code:
              'cd556b363cb48f2736298a24328f6de360955972321a74687c3b9c633d80b3f8',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_6.0.1',
            size: '2.95MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/openEuler22.03/arm/openGauss-Python-6.0.1-openEuler22.03-aarch64.tar.gz`,
            sha_code:
              '502a2042b73f04335ed4aed143ada6f35b7a5fed9ae0786bd8ac18fe0e77dbc0',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_6.0.1',
            size: '5.04MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/openEuler22.03/arm/openGauss-Libpq-6.0.1-openEuler22.03-aarch64.tar.gz`,
            sha_code:
              '292dc762031d0ebd3d3c977bc346c3aa4fe4afb131214c8e20152c401473606e',
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
            name: 'JDBC_6.0.1',
            size: '1.75MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/openEuler22.03/x86/openGauss-JDBC-6.0.1.tar.gz`,
            sha_code:
              '8ecc110d4c26d6b92e96b1e3cc018b327c2697250f9ec198f295b9cba47ad646',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_6.0.1',
            size: '9.25MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/openEuler22.03/x86/openGauss-ODBC-6.0.1-openEuler22.03-x86_64.tar.gz`,
            sha_code:
              'a3dceaf7298826556e76fcb87d33640901e2ca0fef6d53848c09c244eb022190',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_6.0.1',
            size: '3.09MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/openEuler22.03/x86/openGauss-Python-6.0.1-openEuler22.03-x86_64.tar.gz`,
            sha_code:
              '5f358f4b8dd4f5bb5050b408b45cb2540caf03d8acbd1b9397689fa1f9c5874e',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_6.0.1',
            size: '5.27MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/openEuler22.03/x86/openGauss-Libpq-6.0.1-openEuler22.03-x86_64.tar.gz`,
            sha_code:
              'bef74b7d78ba9f3003fc544c2a2a84622b991c6446280c79d27272f63b007708',
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
            name: 'JDBC_6.0.1',
            size: '1.75MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/openEuler20.03/arm/openGauss-JDBC-6.0.1.tar.gz`,
            sha_code:
              '019b92ee03aadda023fd68f19bc5cbc7ea02f2102a1e04420ddaf0955e1df98c',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_6.0.1',
            size: '9.05MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/openEuler20.03/arm/openGauss-ODBC-6.0.1-openEuler20.03-aarch64.tar.gz`,
            sha_code:
              'c58eb8ae7fc35c3550d0f3ce2a3e28cfc0d732f6410b715d360b7b2b8da5d987',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_6.0.1',
            size: '2.94MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/openEuler20.03/arm/openGauss-Python-6.0.1-openEuler20.03-aarch64.tar.gz`,
            sha_code:
              '1c668c3ff6d90c08e1279f21a09c28ee8da62e206b4db024132b936a681c7830',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_6.0.1',
            size: '5.04MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/openEuler20.03/arm/openGauss-Libpq-6.0.1-openEuler20.03-aarch64.tar.gz`,
            sha_code:
              '0a5383fbd0ac3312dfa0ba845d51b7a83ba727b43ce30f91058900cd4acfabc6',
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
            name: 'JDBC_6.0.1',
            size: '1.75MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/openEuler20.03/x86/openGauss-JDBC-6.0.1.tar.gz`,
            sha_code:
              '9907ee922bfe987494f65bfdee4d22f210797b1dc9f22aab22ed059996787454',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_6.0.1',
            size: '9.26MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/openEuler20.03/x86/openGauss-ODBC-6.0.1-openEuler20.03-x86_64.tar.gz`,
            sha_code:
              '14084935dada735cdc4390413d5aa8966ccda9deb85f5aedc69e9caca268cb4a',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_6.0.1',
            size: '3.09MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/openEuler20.03/x86/openGauss-Python-6.0.1-openEuler20.03-x86_64.tar.gz`,
            sha_code:
              '695db59ec6d3bbf713bc3e90936552e68f29d83cfbd039940e5c26d6099c0b99',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_6.0.1',
            size: '5.27MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/openEuler20.03/x86/openGauss-Libpq-6.0.1-openEuler20.03-x86_64.tar.gz`,
            sha_code:
              '9538c8863ff851fd85ca842d8f7d57b22284807fc037bd5477a9376d8751304b',
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
            name: 'JDBC_6.0.1',
            size: '1.75MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/CentOS7/x86/openGauss-JDBC-6.0.1.tar.gz`,
            sha_code:
              'e4d369d33e9261aa9dbe412e352144b1206f8274a8e9570a421d0707657dfb97',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_6.0.1',
            size: '9.12MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/CentOS7/x86/openGauss-ODBC-6.0.1-CentOS7-x86_64.tar.gz`,
            sha_code:
              '8abc304801975f14db28c5e32ec023a6b5da687cc7b11534eccb00a8f36e505a',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_6.0.1',
            size: '3.29MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/CentOS7/x86/openGauss-Python-6.0.1-CentOS7-x86_64.tar.gz`,
            sha_code:
              '3ac7f201daca4e08e099244068b57619b5a6c6c9b60382a08a7a103f0749e662',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_6.0.1',
            size: '5.15MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/CentOS7/x86/openGauss-Libpq-6.0.1-CentOS7-x86_64.tar.gz`,
            sha_code:
              '189606089e130a272041f096ad2ce08f3c6499a85557badd6d1aa42babfb7219',
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
            name: 'JDBC_6.0.1',
            size: '1.75MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/CentOS7/x86/openGauss-JDBC-6.0.1.tar.gz`,
            sha_code:
              'e4d369d33e9261aa9dbe412e352144b1206f8274a8e9570a421d0707657dfb97',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_6.0.0',
            size: '5.24MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/windows/openGauss-ODBC-6.0.0-windows.tar.gz`,
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
            name: 'symbol_6.0.1',
            size: '407.54MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/openEuler22.03/arm/openGauss-Symbol-6.0.1-openEuler22.03-aarch64.tar.gz`,
            sha_code:
              '842b81ae44f5c5f9059aceda511d4540205edf1f82497bebf68d408e46fcaa44',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_6.0.1',
            size: '24.12MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/openEuler22.03/arm/openGauss-CM-6.0.1-openEuler22.03-aarch64.tar.gz`,
            sha_code:
              '2311cfcf511ea1e32b761ee8176295eb5eff8c2c304734b707e13ea68bcd5407',
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
            name: 'symbol_6.0.1',
            size: '404.64MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/openEuler22.03/x86/openGauss-Symbol-6.0.1-openEuler22.03-x86_64.tar.gz`,
            sha_code:
              '7d01c3c78fba436ef2f4a3ff6670d53defa2825a54f72f40e16029b02fd9c03c',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_6.0.1',
            size: '22.22MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/openEuler22.03/x86/openGauss-CM-Symbol-6.0.1-openEuler22.03-x86_64.tar.gz`,
            sha_code:
              '8378fc16b4a743b89e49047e5c6eb94ff1a252af1abaf5ec1072aca526fc9531',
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
            name: 'symbol_6.0.1',
            size: '406.21MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/openEuler20.03/arm/openGauss-Symbol-6.0.1-openEuler20.03-aarch64.tar.gz`,
            sha_code:
              '766c450c557930f463f055491738633af3a2cdd3800e3eb4d7032379954e56b5',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_6.0.1',
            size: '21.47MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.0/openEuler20.03/arm/openGauss-CM-Symbol-6.0.1-openEuler20.03-aarch64.tar.gz`,
            sha_code:
              'c6228b8b9a1b7e749093b0a6d7256011d46429288ab547800960fb7216cdd0b4',
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
            name: 'symbol_6.0.1',
            size: '403.73MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/openEuler20.03/x86/openGauss-Symbol-6.0.1-openEuler20.03-x86_64.tar.gz`,
            sha_code:
              '36d820035169705bc5487963110b0bf82b6a75391248b8b6d3858ab306481d9e',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_6.0.1',
            size: '22.20MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/openEuler20.03/x86/openGauss-CM-Symbol-6.0.1-openEuler20.03-x86_64.tar.gz`,
            sha_code:
              '58ec91f84b3733991b5a4d8e123ccd194a5b252c0dd14ee6d1907c86eb8ec7ef',
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
            name: 'symbol_6.0.1',
            size: '390.49MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/CentOS7/x86/openGauss-Symbol-6.0.1-CentOS7-x86_64.tar.gz`,
            sha_code:
              '990c26d8d8eb63f3c0d1e186bb7a42bfdb6fac7cc812892ffee902aac9caf605',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_6.0.1',
            size: '20.MB',
            down_url: `${OBS_DOWNLOAD_LINK}6.0.1/CentOS7/x86/openGauss-CM-Symbol-6.0.1-CentOS7-x86_64.tar.gz`,
            sha_code:
              '0ad677d0a3359467aec53b8e6b8f7badff474e74b3d79a164f25df72ed7c0ff4',
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
