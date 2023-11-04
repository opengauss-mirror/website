import { OBS_DOWNLOAD_LINK } from '@/data/url-config';
// 中文：zh 、英文：en
export default [
  {
    name: 'openGauss Server',
    thead: ['', 'centos_x86_64', 'openeuler_aarch64', 'openeuler_x86_64'],
    zh: [
      {
        name: 'openGauss_3.0.5 企业版',
        table: 'server',
        edition: 'enterprise',
        centos_url: `${OBS_DOWNLOAD_LINK}3.0.5/x86/openGauss-3.0.5-CentOS-64bit-all.tar.gz`,
        centos_sha:
          'c78d71f547500f084ff918e8aeb5a5b221bb3d57e26c07b430f7fa9c80162df2',
        aarch_url: `${OBS_DOWNLOAD_LINK}3.0.5/arm/openGauss-3.0.5-openEuler-64bit-all.tar.gz`,
        aarch_sha:
          'a534b0e92ae75cfdda056f1ffefb00fbba74d5a41f2e833175d2ff4848cb85b9',
        x86_url: `${OBS_DOWNLOAD_LINK}3.0.5/x86_openEuler/openGauss-3.0.5-openEuler-64bit-all.tar.gz`,
        x86_sha:
          '365a33b24d9a42bdebff72b0c217c67e0387d4137507b373b50bac21c1cfb364',
      },
      {
        name: 'openGauss_3.0.5 极简版',
        table: 'server',
        edition: 'simple',
        centos_url: `${OBS_DOWNLOAD_LINK}3.0.5/x86/openGauss-3.0.5-CentOS-64bit.tar.bz2`,
        centos_sha:
          '4161b178ceb7152679c32e0ca278c18aae72bcc3713aff4c7072fe95ed9e5e4d',
        aarch_url: `${OBS_DOWNLOAD_LINK}3.0.5/arm/openGauss-3.0.5-openEuler-64bit.tar.bz2`,
        aarch_sha:
          'ecc11cf59e0f9f4e98bd2aa584b6448bb9bbc7ebef1171e1e3333b277cc4d29d',
        x86_url: `${OBS_DOWNLOAD_LINK}3.0.5/x86_openEuler/openGauss-3.0.5-openEuler-64bit.tar.bz2`,
        x86_sha:
          '253dd0cd6f25bcb8e1255a39322b418c7d09742a00af3bcc6c30d6181c669a4b',
      },
      {
        name: 'openGauss_3.0.5 轻量版',
        table: 'server',
        edition: 'lite',
        centos_url: `${OBS_DOWNLOAD_LINK}3.0.5/x86/openGauss-Lite-3.0.5-CentOS-x86_64.tar.gz`,
        centos_sha:
          '1e971b81d148fc3343aee214b93a745824d407d34bf58ba1dde1f4623b7c12ee',
        aarch_url: `${OBS_DOWNLOAD_LINK}3.0.5/arm/openGauss-Lite-3.0.5-openEuler-aarch64.tar.gz`,
        aarch_sha:
          'dccac851c7ba04c62b4080a0f34faa36a5d77714bda6b7592a0af238768fc643',
        x86_url: `${OBS_DOWNLOAD_LINK}3.0.5/x86_openEuler/openGauss-Lite-3.0.5-openEuler-x86_64.tar.gz`,
        x86_sha:
          'd7f911d74cb5e2edaf06c057a8b5fbbb6e566e11e5c3383749850a49c955a628',
      },
    ],
    en: [
      {
        name: 'openGauss_3.0.5 Enterprise-Edition',
        table: 'server',
        edition: 'enterprise',
        centos_url: `${OBS_DOWNLOAD_LINK}3.0.5/x86/openGauss-3.0.5-CentOS-64bit-all.tar.gz`,
        centos_sha:
          'c78d71f547500f084ff918e8aeb5a5b221bb3d57e26c07b430f7fa9c80162df2',
        aarch_url: `${OBS_DOWNLOAD_LINK}3.0.5/arm/openGauss-3.0.5-openEuler-64bit-all.tar.gz`,
        aarch_sha:
          'a534b0e92ae75cfdda056f1ffefb00fbba74d5a41f2e833175d2ff4848cb85b9',
        x86_url: `${OBS_DOWNLOAD_LINK}3.0.5/x86_openEuler/openGauss-3.0.5-openEuler-64bit-all.tar.gz`,
        x86_sha:
          '365a33b24d9a42bdebff72b0c217c67e0387d4137507b373b50bac21c1cfb364',
      },
      {
        name: 'openGauss_3.0.5 Simplified',
        table: 'server',
        edition: 'simple',
        centos_url: `${OBS_DOWNLOAD_LINK}3.0.5/x86/openGauss-3.0.5-CentOS-64bit.tar.bz2`,
        centos_sha:
          '4161b178ceb7152679c32e0ca278c18aae72bcc3713aff4c7072fe95ed9e5e4d',
        aarch_url: `${OBS_DOWNLOAD_LINK}3.0.5/arm/openGauss-3.0.5-openEuler-64bit.tar.bz2`,
        aarch_sha:
          'ecc11cf59e0f9f4e98bd2aa584b6448bb9bbc7ebef1171e1e3333b277cc4d29d',
        x86_url: `${OBS_DOWNLOAD_LINK}3.0.5/x86_openEuler/openGauss-3.0.5-openEuler-64bit.tar.bz2`,
        x86_sha:
          '253dd0cd6f25bcb8e1255a39322b418c7d09742a00af3bcc6c30d6181c669a4b',
      },
      {
        name: 'openGauss_3.0.5 Lite',
        table: 'server',
        edition: 'lite',
        centos_url: `${OBS_DOWNLOAD_LINK}3.0.5/x86/openGauss-Lite-3.0.5-CentOS-x86_64.tar.gz`,
        centos_sha:
          '1e971b81d148fc3343aee214b93a745824d407d34bf58ba1dde1f4623b7c12ee',
        aarch_url: `${OBS_DOWNLOAD_LINK}3.0.5/arm/openGauss-Lite-3.0.5-openEuler-aarch64.tar.gz`,
        aarch_sha:
          'dccac851c7ba04c62b4080a0f34faa36a5d77714bda6b7592a0af238768fc643',
        x86_url: `${OBS_DOWNLOAD_LINK}3.0.5/x86_openEuler/openGauss-Lite-3.0.5-openEuler-x86_64.tar.gz`,
        x86_sha:
          'd7f911d74cb5e2edaf06c057a8b5fbbb6e566e11e5c3383749850a49c955a628',
      },
    ],
  },
  {
    name: 'openGauss Connectors ',
    thead: ['', 'centos_x86_64', 'openeuler_aarch64', 'openeuler_x86_64'],
    zh: [
      {
        name: 'JDBC_3.0.5',
        centos_url: `${OBS_DOWNLOAD_LINK}3.0.5/x86/openGauss-3.0.5-JDBC.tar.gz`,
        centos_sha:
          '9fee420390d8155206414db3b3b3974abd28639ca95f6f03f0452edd7967406a',
        aarch_url: `${OBS_DOWNLOAD_LINK}3.0.5/arm/openGauss-3.0.5-JDBC.tar.gz`,
        aarch_sha:
          '186a49bcd6255f95bf4d736569f58b9e61b3cb92238f9a31855c5aff00eff82c',
        x86_url: `${OBS_DOWNLOAD_LINK}3.0.5/x86_openEuler/openGauss-3.0.5-JDBC.tar.gz`,
        x86_sha:
          '791d24e7381655324cc34a545c306495f7fe26ac4ea5e62de3a1b3018974d1a5',
      },
      {
        name: 'ODBC_3.0.5',
        centos_url: `${OBS_DOWNLOAD_LINK}3.0.5/x86/openGauss-3.0.5-ODBC.tar.gz`,
        centos_sha:
          '3fe4bbb737762ebeec0f9fe38ba5c76b104e39c1959c505c0505c6fbfa7fafd0',
        aarch_url: `${OBS_DOWNLOAD_LINK}3.0.5/arm/openGauss-3.0.5-ODBC.tar.gz`,
        aarch_sha:
          '98cec6513a1463ecdd5ea9f3c17305bc6d9d5c26b51b3e4e731a086efff1565d',
        x86_url: `${OBS_DOWNLOAD_LINK}3.0.5/x86_openEuler/openGauss-3.0.5-ODBC.tar.gz`,
        x86_sha:
          '0f93058a4d1d302f317dcb13ac77c660100b26e33fa90a523fb3f3da2683211c',
      },
      {
        name: 'Python-psycopg2_3.0.5',
        centos_url: `${OBS_DOWNLOAD_LINK}3.0.5/x86/openGauss-3.0.1-CentOS-x86_64-Python.tar.gz`,
        centos_sha:
          'c819fc29b993f8648a3a2c2e8a85fd42220a99cf91133f070c8e61e1ae4781ce',
        aarch_url: `${OBS_DOWNLOAD_LINK}3.0.5/arm/openGauss-3.0.1-openEuler-aarch64-Python.tar.gz`,
        aarch_sha:
          '3a29fda93cb85c4e234c7be49b006234d25aa437cd693a7132d2aa1106e8250f',
        x86_url: `${OBS_DOWNLOAD_LINK}3.0.5/x86_openEuler/openGauss-3.0.1-openEuler-x86_64-Python.tar.gz`,
        x86_sha:
          '6c9bb846fb65b973c3ecc8c770ca324dbeac245f1576122e3ef6438bbec87001',
      },
      {
        name: 'libpq_3.0.5',
        centos_url: `${OBS_DOWNLOAD_LINK}3.0.5/x86/openGauss-3.0.5-CentOS-64bit-Libpq.tar.gz`,
        centos_sha:
          '15ce921895652b6dcb3c817f253911b033a601113f6ed4aafb1243acdd24cf33',
        aarch_url: `${OBS_DOWNLOAD_LINK}3.0.5/arm/openGauss-3.0.5-openEuler-64bit-Libpq.tar.gz`,
        aarch_sha:
          '43d654c285c46b44be7f63af90cf35ea7cefb26f1f84502837499347b6e568d4',
        x86_url: `${OBS_DOWNLOAD_LINK}3.0.5/x86_openEuler/openGauss-3.0.5-openEuler-64bit-Libpq.tar.gz`,
        x86_sha:
          '12358874ce56a77d7c0fa7da8b49322b00f17ae77b9cee267fe7a30811a52b49',
      },
    ],
    en: [
      {
        name: 'JDBC_3.0.5',
        centos_url: `${OBS_DOWNLOAD_LINK}3.0.5/x86/openGauss-3.0.5-JDBC.tar.gz`,
        centos_sha:
          '9fee420390d8155206414db3b3b3974abd28639ca95f6f03f0452edd7967406a',
        aarch_url: `${OBS_DOWNLOAD_LINK}3.0.5/arm/openGauss-3.0.5-JDBC.tar.gz`,
        aarch_sha:
          '186a49bcd6255f95bf4d736569f58b9e61b3cb92238f9a31855c5aff00eff82c',
        x86_url: `${OBS_DOWNLOAD_LINK}3.0.5/x86_openEuler/openGauss-3.0.5-JDBC.tar.gz`,
        x86_sha:
          '791d24e7381655324cc34a545c306495f7fe26ac4ea5e62de3a1b3018974d1a5',
      },
      {
        name: 'ODBC_3.0.5',
        centos_url: `${OBS_DOWNLOAD_LINK}3.0.5/x86/openGauss-3.0.5-ODBC.tar.gz`,
        centos_sha:
          '3fe4bbb737762ebeec0f9fe38ba5c76b104e39c1959c505c0505c6fbfa7fafd0',
        aarch_url: `${OBS_DOWNLOAD_LINK}3.0.5/arm/openGauss-3.0.5-ODBC.tar.gz`,
        aarch_sha:
          '98cec6513a1463ecdd5ea9f3c17305bc6d9d5c26b51b3e4e731a086efff1565d',
        x86_url: `${OBS_DOWNLOAD_LINK}3.0.5/x86_openEuler/openGauss-3.0.5-ODBC.tar.gz`,
        x86_sha:
          '0f93058a4d1d302f317dcb13ac77c660100b26e33fa90a523fb3f3da2683211c',
      },
      {
        name: 'Python-psycopg2_3.0.5',
        centos_url: `${OBS_DOWNLOAD_LINK}3.0.5/x86/openGauss-3.0.5-CentOS-x86_64-Python.tar.gz`,
        centos_sha:
          'c819fc29b993f8648a3a2c2e8a85fd42220a99cf91133f070c8e61e1ae4781ce',
        aarch_url: `${OBS_DOWNLOAD_LINK}3.0.5/arm/openGauss-3.0.5-openEuler-aarch64-Python.tar.gz`,
        aarch_sha:
          '3a29fda93cb85c4e234c7be49b006234d25aa437cd693a7132d2aa1106e8250f',
        x86_url: `${OBS_DOWNLOAD_LINK}3.0.5/x86_openEuler/openGauss-3.0.5-openEuler-x86_64-Python.tar.gz`,
        x86_sha:
          '6c9bb846fb65b973c3ecc8c770ca324dbeac245f1576122e3ef6438bbec87001',
      },
      {
        name: 'libpq_3.0.5',
        centos_url: `${OBS_DOWNLOAD_LINK}3.0.5/x86/openGauss-3.0.5-CentOS-64bit-Libpq.tar.gz`,
        centos_sha:
          '15ce921895652b6dcb3c817f253911b033a601113f6ed4aafb1243acdd24cf33',
        aarch_url: `${OBS_DOWNLOAD_LINK}3.0.5/arm/openGauss-3.0.5-openEuler-64bit-Libpq.tar.gz`,
        aarch_sha:
          '43d654c285c46b44be7f63af90cf35ea7cefb26f1f84502837499347b6e568d4',
        x86_url: `${OBS_DOWNLOAD_LINK}3.0.5/x86_openEuler/openGauss-3.0.5-openEuler-64bit-Libpq.tar.gz`,
        x86_sha:
          '12358874ce56a77d7c0fa7da8b49322b00f17ae77b9cee267fe7a30811a52b49',
      },
    ],
  },
  {
    name: 'openGauss Symbol ',
    thead: ['', 'centos_x86_64', 'openeuler_aarch64', 'openeuler_x86_64'],
    zh: [
      {
        name: 'symbol_3.0.5',
        centos_url: `${OBS_DOWNLOAD_LINK}3.0.5/x86/openGauss-3.0.5-CentOS-64bit-symbol.tar.gz`,
        centos_sha:
          'df1d9f1b9cbdc765c2464fe6d20746127339a7bad137f9cc9df852e9063f584e',
        aarch_url: `${OBS_DOWNLOAD_LINK}3.0.5/arm/openGauss-3.0.5-openEuler-64bit-symbol.tar.gz`,
        aarch_sha:
          '4a67cb24c43be44cc1eb4d599ef952ec1c5fabbf57c45c223efcbf4cdfcd680e',
        x86_url: `${OBS_DOWNLOAD_LINK}3.0.5/x86_openEuler/openGauss-3.0.5-openEuler-64bit-symbol.tar.gz`,
        x86_sha:
          '453bc78fbde4648565d6eb65dec5e8c94bfb9edaaf279bec70e1b168d0324516',
      },
    ],
    en: [
      {
        name: 'symbol_3.0.5',
        centos_url: `${OBS_DOWNLOAD_LINK}3.0.5/x86/openGauss-3.0.5-CentOS-64bit-symbol.tar.gz`,
        centos_sha:
          'df1d9f1b9cbdc765c2464fe6d20746127339a7bad137f9cc9df852e9063f584e',
        aarch_url: `${OBS_DOWNLOAD_LINK}3.0.5/arm/openGauss-3.0.5-openEuler-64bit-symbol.tar.gz`,
        aarch_sha:
          '4a67cb24c43be44cc1eb4d599ef952ec1c5fabbf57c45c223efcbf4cdfcd680e',
        x86_url: `${OBS_DOWNLOAD_LINK}3.0.5/x86_openEuler/openGauss-3.0.5-openEuler-64bit-symbol.tar.gz`,
        x86_sha:
          '453bc78fbde4648565d6eb65dec5e8c94bfb9edaaf279bec70e1b168d0324516',
      },
    ],
  },
  {
    name: 'openGauss Tools ',
    thead: ['', 'windows_x86_64', 'Linux', ''],
    zh: [
      {
        name: 'Data Studio_3.0.0',
        centos_url: `${OBS_DOWNLOAD_LINK}3.0.0/DataStudio_win_64.zip`,
        centos_sha:
          '651ab1a8ac5ade613837b2728620bdf48947a1736433e5e1ff24d5e8c75a4e6e',
        download_guide_url: `${OBS_DOWNLOAD_LINK}3.0.0/Data%20Studio%20%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C.pdf`,
        aarch_url: '',
        aarch_sha: '',
        x86_url: '',
        x86_sha: '',
      },
      {
        name: 'Chameleon_3.0.0',
        centos_url: '',
        centos_sha: '',
        aarch_url: `${OBS_DOWNLOAD_LINK}3.0.0/chameleon/chameleon-3.0.0-py3-none-any.whl`,
        aarch_sha:
          'ad53b951459fc01af337c386e358cc314ce344818591dc7e93694aac6fd46c3a',
        x86_url: '',
        x86_sha: '',
      },
    ],
    en: [
      {
        name: 'Data Studio_3.0.0',
        centos_url: `${OBS_DOWNLOAD_LINK}3.0.0/DataStudio_win_64.zip`,
        centos_sha:
          '651ab1a8ac5ade613837b2728620bdf48947a1736433e5e1ff24d5e8c75a4e6e',
        download_guide_url: `${OBS_DOWNLOAD_LINK}3.0.0/Data%20Studio%20User%20Manual.pdf`,
        aarch_url: '',
        aarch_sha: '',
        x86_url: '',
        x86_sha: '',
      },
      {
        name: 'Chameleon_3.0.0',
        centos_url: '',
        centos_sha: '',
        aarch_url: `${OBS_DOWNLOAD_LINK}3.0.0/chameleon/chameleon-3.0.0-py3-none-any.whl`,
        aarch_sha:
          'ad53b951459fc01af337c386e358cc314ce344818591dc7e93694aac6fd46c3a',
        x86_url: '',
        x86_sha: '',
      },
    ],
  },
];
