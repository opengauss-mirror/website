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
            name: 'openGauss_5.0.1 企业版',
            table: 'server',
            size: '125.09MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/arm_2203/openGauss-5.0.1-openEuler-64bit-all.tar.gz`,
            sha_code:
              '942e5d664918643b701fa393d99f813768dce7b87c79d21542b2b823c3601cba',
            docsName: '企业版安装指南',
            docs_url:
              '/docs/5.0.0/docs/InstallationGuide/%E4%BC%81%E4%B8%9A%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_5.0.1 极简版',
            table: 'server',
            size: '93.07MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/arm_2203/openGauss-5.0.1-openEuler-64bit.tar.bz2`,
            sha_code:
              'e7014722976e75f68128ebbbc08db34d226766c39cadc47ece3e77ca7036da56',
            docsName: '极简版安装指南',
            docs_url:
              '/docs/5.0.0/docs/InstallationGuide/%E6%9E%81%E7%AE%80%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_5.0.1 轻量版',
            table: 'server',
            size: '25.12MB',
            edition: 'lite',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/arm_2203/openGauss-Lite-5.0.1-openEuler-aarch64.tar.gz`,
            sha_code:
              '7a53ce1c5159c1c271abdd7110c1b5d20fecc2742610cc427af34da8bd6cf007',
            docsName: '轻量版安装指南',
            docs_url:
              '/docs/5.0.0-lite/docs/InstallationGuide/%E5%AE%89%E8%A3%85%E6%A6%82%E8%BF%B0.html',
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
            name: 'openGauss_5.0.1 企业版',
            table: 'server',
            size: '130.85MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/x86_openEuler_2203/openGauss-5.0.1-openEuler-64bit-all.tar.gz`,
            sha_code:
              '79234ea93152a3be27fbd80e4080d8bba7c7e8971fcd33ec36cf3d4f00d951ce',
            docsName: '企业版安装指南',
            docs_url:
              '/docs/5.0.0/docs/InstallationGuide/%E4%BC%81%E4%B8%9A%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_5.0.1 极简版',
            table: 'server',
            size: '98.53MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/x86_openEuler_2203/openGauss-5.0.1-openEuler-64bit.tar.bz2`,
            sha_code:
              '615833e160c7e69ea5014e7a238bb967bd1ee938b03b11a0697d2c548c764d74',
            docsName: '极简版安装指南',
            docs_url:
              '/docs/5.0.0/docs/InstallationGuide/%E6%9E%81%E7%AE%80%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_5.0.1 轻量版',
            table: 'server',
            size: '26.35MB',
            edition: 'lite',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/x86_openEuler_2203/openGauss-Lite-5.0.1-openEuler-x86_64.tar.gz`,
            sha_code:
              '1e1fe3bce64dd1cf4ce7aff614277487257d3efbd5d9a6f30b663df9409d97f5',
            docsName: '轻量版安装指南',
            docs_url:
              '/docs/5.0.0-lite/docs/InstallationGuide/%E5%AE%89%E8%A3%85%E6%A6%82%E8%BF%B0.html',
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
            name: 'openGauss_5.0.1 企业版',
            table: 'server',
            size: '125.05MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/arm/openGauss-5.0.1-openEuler-64bit-all.tar.gz`,
            sha_code:
              '6123f190856a5da0a50d46812eac8c618182065ab3771d405f5059ba304a9f47',
            docsName: '企业版安装指南',
            docs_url:
              '/docs/5.0.0/docs/InstallationGuide/%E4%BC%81%E4%B8%9A%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_5.0.1 极简版',
            table: 'server',
            size: '93.09MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/arm/openGauss-5.0.1-openEuler-64bit.tar.bz2`,
            sha_code:
              '5550c246b10bf462210d527859337c31d448d4b873715cd6ce0dbbeb0a617336',
            docsName: '极简版安装指南',
            docs_url:
              '/docs/5.0.0/docs/InstallationGuide/%E6%9E%81%E7%AE%80%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_5.0.1 轻量版',
            table: 'server',
            size: '25.12MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/arm/openGauss-Lite-5.0.1-openEuler-aarch64.tar.gz`,
            sha_code:
              '9b68924642af14d22337540b6c2e4f64586515379e1578d6eff206501f1ea5f6',
            docsName: '轻量版安装指南',
            docs_url:
              '/docs/5.0.0-lite/docs/InstallationGuide/%E5%AE%89%E8%A3%85%E6%A6%82%E8%BF%B0.html',
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
            name: 'openGauss_5.0.1 企业版',
            table: 'server',
            size: '130.89MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/x86_openEuler/openGauss-5.0.1-openEuler-64bit-all.tar.gz`,
            sha_code:
              'c4687aa6bb02ffc1402b972a01a2515ba8524def624f4c8227c40dcaf38aa9e4',
            docsName: '企业版安装指南',
            docs_url:
              '/docs/5.0.0/docs/InstallationGuide/%E4%BC%81%E4%B8%9A%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_5.0.1 极简版',
            table: 'server',
            size: '98.56MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/x86_openEuler/openGauss-5.0.1-openEuler-64bit.tar.bz2`,
            sha_code:
              '5e35ac31fdc03cbc64d00f96d8f3802d85092cd2135f1728068ae4c8aec94584',
            docsName: '极简版安装指南',
            docs_url:
              '/docs/5.0.0/docs/InstallationGuide/%E6%9E%81%E7%AE%80%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_5.0.1 轻量版',
            table: 'server',
            size: '26.35MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/x86_openEuler/openGauss-Lite-5.0.1-openEuler-x86_64.tar.gz`,
            sha_code:
              'fcb5c96931ba8b6dc69929380f3b3c0fda0a5158666511ab6b7d20fb1c07e2e7',
            docsName: '轻量版安装指南',
            docs_url:
              '/docs/5.0.0-lite/docs/InstallationGuide/%E5%AE%89%E8%A3%85%E6%A6%82%E8%BF%B0.html',
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
            name: 'openGauss_5.0.1 企业版',
            table: 'server',
            size: '130.71MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/x86/openGauss-5.0.1-CentOS-64bit-all.tar.gz`,
            sha_code:
              'de94515c28f83d1d801ce5bec17d3fb36265edb223fbdc409c3647b120aaae94',
            docsName: '企业版安装指南',
            docs_url:
              '/docs/5.0.0/docs/InstallationGuide/%E4%BC%81%E4%B8%9A%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_5.0.1 极简版',
            table: 'server',
            size: '97.56MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/x86/openGauss-5.0.1-CentOS-64bit.tar.bz2`,
            sha_code:
              '6e2ee1eadd12fb619185362f74c725a5f9b67674df67e2ee1064980a34f725bc',
            docsName: '极简版安装指南',
            docs_url:
              '/docs/5.0.0/docs/InstallationGuide/%E6%9E%81%E7%AE%80%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_5.0.1 轻量版',
            table: 'server',
            size: '26.16MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/x86/openGauss-Lite-5.0.1-CentOS-x86_64.tar.gz`,
            sha_code:
              'ee9a40d7ca2fe07344976a7d913cba3abf9380ed877fe85b4137a581cbabcf77',
            docsName: '轻量版安装指南',
            docs_url:
              '/docs/5.0.0-lite/docs/InstallationGuide/%E5%AE%89%E8%A3%85%E6%A6%82%E8%BF%B0.html',
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
            name: 'JDBC_5.0.1',
            size: '1.67MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/arm_2203/openGauss-5.0.1-JDBC.tar.gz`,
            sha_code:
              'd357db5549dde8e05b087b4a8b09c35bce25aee56515051b47294c0f77eb0567',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_5.0.1',
            size: '8.52MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/arm_2203/openGauss-5.0.1-ODBC.tar.gz`,
            sha_code:
              '63b5aacff7db8ace0ed7e271571177b6b1a884bbd98de6e1c463d4dc3b1a1e8e',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_5.0.1',
            size: '2.67MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/arm_2203/openGauss-5.0.1-openEuler-aarch64-Python.tar.gz`,
            sha_code:
              'e9f52382c37cc87c63bb4bbabb3d8cdd91e0e5f70ab094e890a77b01365b0101',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_5.0.1',
            size: '4.62MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/arm_2203/openGauss-5.0.1-openEuler-64bit-Libpq.tar.gz`,
            sha_code:
              '3bbafd26a764aa7bc523f52ce7f38c2d44cca0c49c09970c1f8023986d7ed7ee',
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
            name: 'JDBC_5.0.1',
            size: '1.67MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/x86_openEuler_2203/openGauss-5.0.1-JDBC.tar.gz`,
            sha_code:
              '09c8a6a7046077eb5437a885a6889b5b23643210e09c5a12ed162df20e8c5d7f',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_5.0.1',
            size: '9.24MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/x86_openEuler_2203/openGauss-5.0.1-ODBC.tar.gz`,
            sha_code:
              'e044b6b4660a91ab83f9e7d344cb2ef2179202fad42221ea3dffcd4f7707d1a4',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_5.0.1',
            size: '2.98MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/x86_openEuler_2203/openGauss-5.0.1-openEuler-x86_64-Python.tar.gz`,
            sha_code:
              'f45b431f6ab58914975b0992c5f3156c493a6194cb5f487c5f19275b13bed610',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_5.0.1',
            size: '5.12MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/x86_openEuler_2203/openGauss-5.0.1-openEuler-64bit-Libpq.tar.gz`,
            sha_code:
              '0a9951385805a330094af7d1457c23421c8e431093f174e7151787ff3773f8a6',
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
            name: 'JDBC_5.0.1',
            size: '1.67MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/arm/openGauss-5.0.1-JDBC.tar.gz`,
            sha_code:
              'cb77932ebd349ec2552e98e3c57e021939149a4cd9f00be38016fdb0e337e466',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_5.0.1',
            size: '8.53MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/arm/openGauss-5.0.1-ODBC.tar.gz`,
            sha_code:
              '5b6e419290a866c07e71d587a691984f254107979bee5574a4a953bbebe89641',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_5.0.1',
            size: '2.67MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/arm/openGauss-5.0.1-openEuler-aarch64-Python.tar.gz`,
            sha_code:
              'b1186b999a9d9ddede5b1c8325a60dde54651f8dc8cc49bb326c65e15df1abb3',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_5.0.1',
            size: '4.62MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/arm/openGauss-5.0.1-openEuler-64bit-Libpq.tar.gz`,
            sha_code:
              '03c94a0f814fdaa11c4d5bcd7e1f090d72b3844a5bafa59fa9975e4921954d57',
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
            name: 'JDBC_5.0.1',
            size: '1.67MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/x86_openEuler/openGauss-5.0.1-JDBC.tar.gz`,
            sha_code:
              '9adbc0f1992c5acaa0f8ceac999d76b67385bcf63fe13355444565ffdd725c96',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_5.0.1',
            size: '9.03MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/x86_openEuler/openGauss-5.0.1-ODBC.tar.gz`,
            sha_code:
              'dbd3ceb8c74ad7cf4227de94e042b8f44872944b1fdbf593349fe89b49fab141',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_5.0.1',
            size: '2.98MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/x86_openEuler/openGauss-5.0.1-openEuler-x86_64-Python.tar.gz`,
            sha_code:
              '43c957515985cf24e0319925160c9eaef7c53fe9fadb9e12ffa17b6b00b41d37',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_5.0.1',
            size: '5.12MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/x86_openEuler/openGauss-5.0.1-openEuler-64bit-Libpq.tar.gz`,
            sha_code:
              '6d770190392d1b636970544e3ac6244810e05fee8840df7a42b15a7e9cf6ef72',
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
            name: 'JDBC_5.0.1',
            size: '1.67MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/x86/openGauss-5.0.1-JDBC.tar.gz`,
            sha_code:
              'd424cc018689d1c84ceeabcb3259c14342e2d81fa5620f67ee0a90677ab25f87',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_5.0.1',
            size: '9.11MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/x86/openGauss-5.0.1-ODBC.tar.gz`,
            sha_code:
              '77c0dcacf8aa8f3337e2ba65371039d69acc2424f198e67052b52c87e5a6e569',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_5.0.1',
            size: '3.20MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/x86/openGauss-5.0.1-CentOS-x86_64-Python.tar.gz`,
            sha_code:
              '92cf0fb70d0feba5afb4a4c54de791ff5a97cd3c915b9b41ad8fd1344be4b211',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_5.0.1',
            size: '5.00MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/x86/openGauss-5.0.1-CentOS-64bit-Libpq.tar.gz`,
            sha_code:
              '7dcaff5a5699878936442bef6a7cb4f9b0f80037bb872445f93810b133872c83',
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
            name: 'JDBC_5.0.1',
            size: '1.67MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/x86/openGauss-5.0.1-JDBC.tar.gz`,
            sha_code:
              'd424cc018689d1c84ceeabcb3259c14342e2d81fa5620f67ee0a90677ab25f87',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_5.0.1',
            size: '5.36MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/windows/openGauss-5.0.1-ODBC-windows.tar.gz`,
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
            name: 'symbol_5.0.1',
            size: '412.58MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/arm_2203/openGauss-5.0.1-openEuler-64bit-symbol.tar.gz`,
            sha_code:
              '2cf375f05374bd82451e5294a0e21ecb4c4c2d423643d3fa7cf87c0f31c47044',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_5.0.1',
            size: '22.91MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/arm_2203/openGauss-5.0.1-openEuler-64bit-cm-symbol.tar.gz`,
            sha_code:
              '1cbdfb2431130b508a0ed8ef2369f8e86af12d4e48bfe7071a3ddba0f79f762b',
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
            name: 'symbol_5.0.1',
            size: '408.44MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/x86_openEuler_2203/openGauss-5.0.1-openEuler-64bit-symbol.tar.gz`,
            sha_code:
              'dba1fc2ec5653a497687b65e959b4717e916896d27ef0faebfee3a77cf287b3b',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_5.0.1',
            size: '21.23MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/x86_openEuler_2203/openGauss-5.0.1-openEuler-64bit-cm-symbol.tar.gz`,
            sha_code:
              'f37af286d8d1bc276d1ac0dfd7defafb13db988cbc55fc87331fcab6e1f8a6ec',
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
            name: 'symbol_5.0.1',
            size: '411.53MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/arm/openGauss-5.0.1-openEuler-64bit-symbol.tar.gz`,
            sha_code:
              '09f6bed4c1575b3f90e8ad0d9d1708306f4fb69d9028aee86c7ef140fc912b9c',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_5.0.1',
            size: '22.84MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/arm/openGauss-5.0.1-openEuler-64bit-cm-symbol.tar.gz`,
            sha_code:
              '95864c558e6e66388b79ca23392abdd3cb0bb2a0aa132e0b694c1be19ea04139',
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
            name: 'symbol_5.0.1',
            size: '407.55MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/x86_openEuler/openGauss-5.0.1-openEuler-64bit-symbol.tar.gz`,
            sha_code:
              '1f7f90bfb1286002f351253f37380e6091674fd8dc10d96912f289e09aa59669',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_5.0.1',
            size: '21.23MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/x86_openEuler/openGauss-5.0.1-openEuler-64bit-cm-symbol.tar.gz`,
            sha_code:
              'a627f7dee42d606a83f5a05ed14303be4b3a42e16766fc52a8c6e3d99c33cd01',
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
            name: 'symbol_5.0.1',
            size: '406.36MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/x86/openGauss-5.0.1-CentOS-64bit-symbol.tar.gz`,
            sha_code:
              '9b81cf1a0ceb3b53d6e4ee0bcb485b8199ba6cc009f832efb6865143765db2cf',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_5.0.1',
            size: '21.21MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.1/x86/openGauss-5.0.1-CentOS-64bit-cm-symbol.tar.gz`,
            sha_code:
              '02140e60da5195005cadffe1e6233d8a14106d929559fc4249e213e1287d1cf9',
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
            name: 'Chameleon_5.0.0',
            size: '6.29MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.0/tools/chameleon-5.0.0-py3-none-any.whl`,
            sha_code:
              '20c286a6d392f0e004677727b3939c026757b3697912ba7ddd4ee854e01ad907',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'replicate-mysql2openGauss_5.0.0',
            size: '9.74MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.0/tools/replicate-mysql2openGauss-5.0.0.tar.gz`,
            sha_code:
              '491c8aa317a8a2038199b6336d7dc51b22ab02fc27750e3fcf536962a0e3a904',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'replicate-openGauss2mysql_5.0.0',
            size: '8.23MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.0/tools/replicate-openGauss2mysql-5.0.0.tar.gz`,
            sha_code:
              'cd430b0e0a2d485cc89d6174839e6407786046c9c314820d837b30c648a4290e',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'gs_datacheck_5.0.0',
            size: '180.73MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.0/tools/gs_datacheck-5.0.0.tar.gz`,
            sha_code:
              '4bdfbf92758f5fc4b9bf33942f4dbbb5943038835e5908232dc8e9efd854d983',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Datakit_5.0.0',
            size: '356.05MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.0/tools/Datakit-5.0.0.tar.gz`,
            sha_code:
              '1240a6d866a35c5fa057aa937297d4670da950cc0cb5fab19f271ac482479804',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'dbmind_5.0.0',
            size: '153.62MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.0/dbmind/arm/dbmind-installer-aarch64-python3.10.sh.tar.gz`,
            sha_code:
              '313be578b2f73a5a38ed34ce35d54b642d86fbbc1451c9b9927622b8f78e7593',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'PortalControl_5.0.0',
            size: '701.68MB',
            down_url: `${OBS_DOWNLOAD_LINK}tools/portal/PortalControl-5.0.0.tar.gz`,
            sha_code:
              '5574f496a3e5a116ffe25a690aeb888ae673e3be843cce4dcb0eb0ad386d4d30',
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
            name: 'Chameleon_5.0.0',
            size: '6.29MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.0/tools/chameleon-5.0.0-py3-none-any.whl`,
            sha_code:
              '20c286a6d392f0e004677727b3939c026757b3697912ba7ddd4ee854e01ad907',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'replicate-mysql2openGauss_5.0.0',
            size: '9.74MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.0/tools/replicate-mysql2openGauss-5.0.0.tar.gz`,
            sha_code:
              '491c8aa317a8a2038199b6336d7dc51b22ab02fc27750e3fcf536962a0e3a904',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'replicate-openGauss2mysql_5.0.0',
            size: '8.23MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.0/tools/replicate-openGauss2mysql-5.0.0.tar.gz`,
            sha_code:
              'cd430b0e0a2d485cc89d6174839e6407786046c9c314820d837b30c648a4290e',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'gs_datacheck_5.0.0',
            size: '180.73MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.0/tools/gs_datacheck-5.0.0.tar.gz`,
            sha_code:
              '4bdfbf92758f5fc4b9bf33942f4dbbb5943038835e5908232dc8e9efd854d983',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Datakit_5.0.0',
            size: '356.05MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.0/tools/Datakit-5.0.0.tar.gz`,
            sha_code:
              '1240a6d866a35c5fa057aa937297d4670da950cc0cb5fab19f271ac482479804',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'dbmind_5.0.0',
            size: '216.92MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.0/dbmind/x86/dbmind-installer-x86_64-python3.10.sh.tar.gz`,
            sha_code:
              '3766a6928112a0636deb17659a062a8f55f4dea6fc7636c3547a90b115e1df8a',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'PortalControl_5.0.0',
            size: '701.68MB',
            down_url: `${OBS_DOWNLOAD_LINK}tools/portal/PortalControl-5.0.0.tar.gz`,
            sha_code:
              '5574f496a3e5a116ffe25a690aeb888ae673e3be843cce4dcb0eb0ad386d4d30',
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
            name: 'Data Studio_5.0.0',
            size: '98.69MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.0.0/tools/DataStudio_win_64.zip`,
            sha_code:
              '5a8b3759d9c51e9d162662814ab6a3b8efd0f40981ae2298f23ee59b88d9cd2e',
            docsName: '使用文档',
            docs_url: `${OBS_DOWNLOAD_LINK}5.0.0/tools/Data%20Studio%20%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C.pdf`,
          },
        ],
      },
    ],
  },
];
