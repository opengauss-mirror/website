export default [
  {
    name: 'openGauss Server',
    thead: ['', 'centos_x86_64', 'openeuler_aarch64', 'openeuler_x86_64'],
    zh: [
      {
        name: 'openGauss_2.0.0 企业版',
        table: 'server',
        edition: 'enterprise',
        centos_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/x86/openGauss-2.0.0-CentOS-64bit-all.tar.gz',
        centos_sha:
          'cb170ed6849907344651f5a44d190a0a1d9dec4722814afc186b12389b0995a0',
        aarch_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/arm/openGauss-2.0.0-openEuler-64bit-all.tar.gz',
        aarch_sha:
          '62a15ca02a37a58be134ec2358426014ff705223cce5d4662b9dbf2027e17adf',
        x86_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/x86_openEuler/openGauss-2.0.0-openEuler-64bit-all.tar.gz',
        x86_sha:
          '83abff61b2eb6d98dde8101197078f8d034430a330a787b6fbbb85d03d16dfae',
      },
      {
        name: 'openGauss_2.0.0 极简版',
        table: 'server',
        edition: 'simple',
        centos_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/x86/openGauss-2.0.0-CentOS-64bit.tar.bz2',
        centos_sha:
          'da298516e36ca275f0a53a019f5b0747248cf544c363bdbb632898651d81fd06',
        aarch_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/arm/openGauss-2.0.0-openEuler-64bit.tar.bz2',
        aarch_sha:
          'cc4b9a94eab219e9dd5f2f908dba5ec8c6bf03cee4af4b42663e4ba7159f621d',
        x86_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/x86_openEuler/openGauss-2.0.0-openEuler-64bit.tar.bz2',
        x86_sha:
          'd1177fc5d0f34b69cb551093f2a530efd7cf4653e22523fb0926310766bf50df',
      },
    ],
    en: [
      {
        name: 'openGauss_2.0.0 Enterprise-Edition',
        table: 'server',
        edition: 'enterprise',
        centos_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/x86/openGauss-2.0.0-CentOS-64bit-all.tar.gz',
        centos_sha:
          'cb170ed6849907344651f5a44d190a0a1d9dec4722814afc186b12389b0995a0',
        aarch_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/arm/openGauss-2.0.0-openEuler-64bit-all.tar.gz',
        aarch_sha:
          '62a15ca02a37a58be134ec2358426014ff705223cce5d4662b9dbf2027e17adf',
        x86_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/x86_openEuler/openGauss-2.0.0-openEuler-64bit-all.tar.gz',
        x86_sha:
          '83abff61b2eb6d98dde8101197078f8d034430a330a787b6fbbb85d03d16dfae',
      },
      {
        name: 'openGauss_2.0.0 Simplified',
        table: 'server',
        edition: 'simple',
        centos_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/x86/openGauss-2.0.0-CentOS-64bit.tar.bz2',
        centos_sha:
          'da298516e36ca275f0a53a019f5b0747248cf544c363bdbb632898651d81fd06',
        aarch_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/arm/openGauss-2.0.0-openEuler-64bit.tar.bz2',
        aarch_sha:
          'cc4b9a94eab219e9dd5f2f908dba5ec8c6bf03cee4af4b42663e4ba7159f621d',
        x86_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/x86_openEuler/openGauss-2.0.0-openEuler-64bit.tar.bz2',
        x86_sha:
          'd1177fc5d0f34b69cb551093f2a530efd7cf4653e22523fb0926310766bf50df',
      },
    ],
  },
  {
    name: 'openGauss Connectors ',
    thead: ['', 'centos_x86_64', 'openeuler_aarch64', 'openeuler_x86_64'],
    zh: [
      {
        name: 'JDBC_2.0.0',
        centos_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/x86/openGauss-2.0.0-JDBC.tar.gz',
        centos_sha:
          '39458a0199ee655a706da8a43da0cee9a0cb192d49531b9f1092264da57314c9',
        aarch_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/arm/openGauss-2.0.0-JDBC.tar.gz',
        aarch_sha:
          '2bfdbd28765de3f2d42079aad6bb4fee0b16db99f73ddf29d373f67af3183905',
        x86_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/x86_openEuler/openGauss-2.0.0-JDBC.tar.gz',
        x86_sha:
          'a9c580a7300fb55ba3b06e901f18294a507a4c2272c354b54e9850b9e53f4102',
      },
      {
        name: 'ODBC_2.0.0',
        centos_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/x86/openGauss-2.0.0-ODBC.tar.gz',
        centos_sha:
          'b8764eb527a42fed2f327caae2d4a494973656ccaa301deb7bd84cf31b695c86',
        aarch_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/arm/openGauss-2.0.0-ODBC.tar.gz',
        aarch_sha:
          '251ca5ba8d49d44d136b4b7eea2f47b2b2f458350605f770402553159f3ed219',
        x86_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/x86_openEuler/openGauss-2.0.0-ODBC.tar.gz',
        x86_sha:
          '224fe063e6ac830dd6caa535063187cdab0d797cd139b9ca964d64b386b42efc',
      },
      {
        name: 'libpq_2.0.0',
        centos_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/x86/openGauss-2.0.0-CentOS-64bit-Libpq.tar.gz',
        centos_sha:
          '3cfd635da13e91b3f8a4bd1b71a918411fec315bec3fdb17ca02800bb2c88eae',
        aarch_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/arm/openGauss-2.0.0-openEuler-64bit-Libpq.tar.gz',
        aarch_sha:
          'd648afa50e7beb66ecd4a6a576d25a48f7178f2a16f10d1529700193596b11c4',
        x86_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/x86_openEuler/openGauss-2.0.0-openEuler-64bit-Libpq.tar.gz',
        x86_sha:
          'c578690b9bf674b3246c47a08cd77ea30134b764c454470bb8c719e5d1ca43fd',
      },
    ],
    en: [
      {
        name: 'JDBC_2.0.0',
        centos_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/x86/openGauss-2.0.0-JDBC.tar.gz',
        centos_sha:
          '39458a0199ee655a706da8a43da0cee9a0cb192d49531b9f1092264da57314c9',
        aarch_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/arm/openGauss-2.0.0-JDBC.tar.gz',
        aarch_sha:
          '2bfdbd28765de3f2d42079aad6bb4fee0b16db99f73ddf29d373f67af3183905',
        x86_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/x86_openEuler/openGauss-2.0.0-JDBC.tar.gz',
        x86_sha:
          'a9c580a7300fb55ba3b06e901f18294a507a4c2272c354b54e9850b9e53f4102',
      },
      {
        name: 'ODBC_2.0.0',
        centos_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/x86/openGauss-2.0.0-ODBC.tar.gz',
        centos_sha:
          'b8764eb527a42fed2f327caae2d4a494973656ccaa301deb7bd84cf31b695c86',
        aarch_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/arm/openGauss-2.0.0-ODBC.tar.gz',
        aarch_sha:
          '251ca5ba8d49d44d136b4b7eea2f47b2b2f458350605f770402553159f3ed219',
        x86_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/x86_openEuler/openGauss-2.0.0-ODBC.tar.gz',
        x86_sha:
          '224fe063e6ac830dd6caa535063187cdab0d797cd139b9ca964d64b386b42efc',
      },
      {
        name: 'libpq_2.0.0',
        centos_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/x86/openGauss-2.0.0-CentOS-64bit-Libpq.tar.gz',
        centos_sha:
          '3cfd635da13e91b3f8a4bd1b71a918411fec315bec3fdb17ca02800bb2c88eae',
        aarch_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/arm/openGauss-2.0.0-openEuler-64bit-Libpq.tar.gz',
        aarch_sha:
          'd648afa50e7beb66ecd4a6a576d25a48f7178f2a16f10d1529700193596b11c4',
        x86_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/x86_openEuler/openGauss-2.0.0-openEuler-64bit-Libpq.tar.gz',
        x86_sha:
          'c578690b9bf674b3246c47a08cd77ea30134b764c454470bb8c719e5d1ca43fd',
      },
    ],
  },
  {
    name: 'openGauss Symbol ',
    thead: ['', 'centos_x86_64', 'openeuler_aarch64', 'openeuler_x86_64'],
    zh: [
      {
        name: 'symbol_2.0.0',
        centos_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/x86/openGauss-2.0.0-CentOS-64bit-symbol.tar.gz',
        centos_sha:
          'cb8a3d760c25a0aa295b0a6f6db373e71d0bc3fbc38ad9624a6e177297f8bb66',
        aarch_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/arm/openGauss-2.0.0-openEuler-64bit-symbol.tar.gz',
        aarch_sha:
          'fd901c41fc2be8f2538cdb224b197cb1cbf194c8deeb32b68e8c945b9b4ece3a',
        x86_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/x86_openEuler/openGauss-2.0.0-openEuler-64bit-symbol.tar.gz',
        x86_sha:
          'db16300f4774ff53d9b25a9f33dd975341eca0f43e18b6c7c55d98b05f5f7f87',
      },
    ],
    en: [
      {
        name: 'symbol_2.0.0',
        centos_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/x86/openGauss-2.0.0-CentOS-64bit-symbol.tar.gz',
        centos_sha:
          'cb8a3d760c25a0aa295b0a6f6db373e71d0bc3fbc38ad9624a6e177297f8bb66',
        aarch_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/arm/openGauss-2.0.0-openEuler-64bit-symbol.tar.gz',
        aarch_sha:
          'fd901c41fc2be8f2538cdb224b197cb1cbf194c8deeb32b68e8c945b9b4ece3a',
        x86_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/x86_openEuler/openGauss-2.0.0-openEuler-64bit-symbol.tar.gz',
        x86_sha:
          'db16300f4774ff53d9b25a9f33dd975341eca0f43e18b6c7c55d98b05f5f7f87',
      },
    ],
  },
  {
    name: 'openGauss Tools ',
    thead: ['', 'windows_x86_64', '', ''],
    zh: [
      {
        name: 'Data Studio_2.0.0',
        centos_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/DataStudio_win_64.zip',
        centos_sha:
          'c982a2aea6674419ed67e0aeef4bd8468eba58d2bfef533d4d878359765c0a0a',
        download_guide_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/Data%20Studio%20%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C.pdf',
        aarch_url: '',
        aarch_sha: '',
        x86_url: '',
        x86_sha: '',
      },
    ],
    en: [
      {
        name: 'Data Studio_2.0.0',
        centos_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/DataStudio_win_64.zip',
        centos_sha:
          'c982a2aea6674419ed67e0aeef4bd8468eba58d2bfef533d4d878359765c0a0a',
        download_guide_url:
          'https://opengauss.obs.cn-south-1.myhuaweicloud.com/2.0.0/Data%20Studio%20User%20Manual.pdf',
        aarch_url: '',
        aarch_sha: '',
        x86_url: '',
        x86_sha: '',
      },
    ],
  },
];
