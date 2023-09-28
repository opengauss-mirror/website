// 参数说明
// [
//   {
//     name: 'openGauss Server',---软件的模块名
//     content: [
//       {
//         system: 'openEuler 22.03 LTS (aarch64)',---操作系统（架构）
//         docs: true,---是否有说明文件
//         architecture: 'AArch64',---架构
//         os: 'openEuler 22.03 LTS',---操作系统
//         content: [
//           {
//             name: 'openGauss_5.1.0 企业版',---软件包类型
//             size: '120.99MB',---软件包大小
//             edition: '',---软件包hover提示语
//             down_url: `${OBS_DOWNLOAD_LINK}5.1.0/arm_2203/openGauss-5.1.0-openEuler-64bit-all.tar.gz`,---软件包下载地址
//             sha_code:
//               '589062c8de67ec8b7b00fb58d33331eedb19702ea47c2a55e1bcde06676a5a81',---软件包sha值
//             docsName: '企业版安装指南',---软件包说明文档
//             docs_url:
//               '/docs/5.1.0/docs/InstallationGuide/%E4%BC%81%E4%B8%9A%E7%89%88%E5%AE%89%E8%A3%85.html',---软件包说明文档链接
//           },
//         ],
//       },
//     ],
//   },
// ];
import { OBS_DOWNLOAD_LINK } from '@/shared/url-config';
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
            name: 'openGauss_5.1.0 企业版',
            size: '137.81MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/arm_2203/openGauss-5.1.0-openEuler-64bit-all.tar.gz`,
            sha_code:
              '176bc4a79b263b32beb367f39f207a3b502ff101bf99866a341a00df57fd52ae',
            docsName: '企业版安装指南',
            docs_url:
              '/docs/5.1.0/docs/InstallationGuide/%E4%BC%81%E4%B8%9A%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_5.1.0 极简版',
            size: '95.40MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/arm_2203/openGauss-5.1.0-openEuler-64bit.tar.bz2`,
            sha_code:
              '678dde9a1e0eb86ed077be0f40ebf6f26973089aecd93cdf48d95da2385dc8dd',
            docsName: '极简版安装指南',
            docs_url:
              '/docs/5.1.0/docs/InstallationGuide/%E6%9E%81%E7%AE%80%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_5.1.0 轻量版',
            size: '24.92MB',
            edition: 'lite',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/arm_2203/openGauss-Lite-5.1.0-openEuler-aarch64.tar.gz`,
            sha_code:
              'd70e71db386d60819131839f5956cc13b3f753fb0d30accce76200ac6828a971',
            docsName: '轻量版安装指南',
            docs_url:
              '/docs/5.1.0-lite/docs/InstallationGuide/%E5%AE%89%E8%A3%85%E6%A6%82%E8%BF%B0.html',
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
            name: 'openGauss_5.1.0 企业版',
            size: '141.58MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/x86_openEuler_2203/openGauss-5.1.0-openEuler-64bit-all.tar.gz`,
            sha_code:
              '00469bfa4531757a310e8c4d70771dc7b15ac581cd0ea7734d0bba49412b707f',
            docsName: '企业版安装指南',
            docs_url:
              '/docs/5.1.0/docs/InstallationGuide/%E4%BC%81%E4%B8%9A%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_5.1.0 极简版',
            size: '99.07MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/x86_openEuler_2203/openGauss-5.1.0-openEuler-64bit.tar.bz2`,
            sha_code:
              '100891137df87af4b7027bb041067303227858f9cbdf8cf37f17825147f76ee3',
            docsName: '极简版安装指南',
            docs_url:
              '/docs/5.1.0/docs/InstallationGuide/%E6%9E%81%E7%AE%80%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_5.1.0 轻量版',
            size: '26.22MB',
            edition: 'lite',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/x86_openEuler_2203/openGauss-Lite-5.1.0-openEuler-x86_64.tar.gz`,
            sha_code:
              '1669ec78c8ec83c0f4e681435e77078fe0ebf8fc90ab57ee9b573e8a904a1145',
            docsName: '轻量版安装指南',
            docs_url:
              '/docs/5.1.0-lite/docs/InstallationGuide/%E5%AE%89%E8%A3%85%E6%A6%82%E8%BF%B0.html',
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
            name: 'openGauss_5.1.0 企业版',
            size: '138.30MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/arm/openGauss-5.1.0-openEuler-64bit-all.tar.gz`,
            sha_code:
              '1ae6349e073a2736c4095f540ff21e30ce08b7745d8dbe1481052955de889e57',
            docsName: '企业版安装指南',
            docs_url:
              '/docs/5.1.0/docs/InstallationGuide/%E4%BC%81%E4%B8%9A%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_5.1.0 极简版',
            size: '95.80MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/arm/openGauss-5.1.0-openEuler-64bit.tar.bz2`,
            sha_code:
              'b270321201ad5eab9752b3e4e1e80dfbc67b7ed68269de380f23c6d3cdc55dcd',
            docsName: '极简版安装指南',
            docs_url:
              '/docs/5.1.0/docs/InstallationGuide/%E6%9E%81%E7%AE%80%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_5.1.0 轻量版',
            size: '25.16MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/arm/openGauss-Lite-5.1.0-openEuler-aarch64.tar.gz`,
            sha_code:
              '9a708b2035ca37f7bc32cc0dbbb97ad12cf6576bf54075987b35522c02b0a857',
            docsName: '轻量版安装指南',
            docs_url:
              '/docs/5.1.0-lite/docs/InstallationGuide/%E5%AE%89%E8%A3%85%E6%A6%82%E8%BF%B0.html',
          },
          {
            name: 'openGauss_5.1.0 分布式镜像',
            size: '3.41GB',
            edition: 'distributed',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/distributed/openGauss-distributed-aarch64-image.tar.gz`,
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
            name: 'openGauss_5.1.0 企业版',
            size: '141.89MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/x86_openEuler/openGauss-5.1.0-openEuler-64bit-all.tar.gz`,
            sha_code:
              'd3ba2356a1832429041502602d9237858a7ca0784b34f8ea3c9695bfac772643',
            docsName: '企业版安装指南',
            docs_url:
              '/docs/5.1.0/docs/InstallationGuide/%E4%BC%81%E4%B8%9A%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_5.1.0 极简版',
            size: '99.45MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/x86_openEuler/openGauss-5.1.0-openEuler-64bit.tar.bz2`,
            sha_code:
              '549cf838188ca53a2a217ac0050e1529111f5ab43f8fa4287ba41d3a02eed036',
            docsName: '极简版安装指南',
            docs_url:
              '/docs/5.1.0/docs/InstallationGuide/%E6%9E%81%E7%AE%80%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_5.1.0 轻量版',
            size: '26.45MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/x86_openEuler/openGauss-Lite-5.1.0-openEuler-x86_64.tar.gz`,
            sha_code:
              '94eb87289f6deccedea9d35fc498a7aa45b2a6732eb90331eb40a2e7c503b4d7',
            docsName: '轻量版安装指南',
            docs_url:
              '/docs/5.1.0-lite/docs/InstallationGuide/%E5%AE%89%E8%A3%85%E6%A6%82%E8%BF%B0.html',
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
            name: 'openGauss_5.1.0 企业版',
            size: '140.60MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/x86/openGauss-5.1.0-CentOS-64bit-all.tar.gz`,
            sha_code:
              'b51738cc69670fe56cdd2aaeb6ae619628536b4e7edcf33f456922d515d8270a',
            docsName: '企业版安装指南',
            docs_url:
              '/docs/5.1.0/docs/InstallationGuide/%E4%BC%81%E4%B8%9A%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_5.1.0 极简版',
            size: '98.86MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/x86/openGauss-5.1.0-CentOS-64bit.tar.bz2`,
            sha_code:
              'e424c0891f3ef1343bbf1dbf044c77a7cf4db63e92962369abf0e27c414c3dbc',
            docsName: '极简版安装指南',
            docs_url:
              '/docs/5.1.0/docs/InstallationGuide/%E6%9E%81%E7%AE%80%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_5.1.0 轻量版',
            size: '26.18MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/x86/openGauss-Lite-5.1.0-CentOS-x86_64.tar.gz`,
            sha_code:
              '2f33e05982025f9f114c8b98d21cdf67f63f03e03f1babf1c3420539f637a40d',
            docsName: '轻量版安装指南',
            docs_url:
              '/docs/5.1.0-lite/docs/InstallationGuide/%E5%AE%89%E8%A3%85%E6%A6%82%E8%BF%B0.html',
          },
          {
            name: 'openGauss_5.1.0 分布式镜像',
            size: '3.29GB',
            edition: 'distributed',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/distributed/openGauss-distributed-x86_64-image.tar.gz`,
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
            name: 'JDBC_5.1.0',
            size: '1.67MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/arm_2203/openGauss-5.1.0-JDBC.tar.gz`,
            sha_code:
              '6667685c5a8eab65bc328f9dbd749bf93126f76c17991c7cc019b4e6bdb27f53',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_5.1.0',
            size: '8.88MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/arm_2203/openGauss-5.1.0-ODBC.tar.gz`,
            sha_code:
              '7601e8b142132aaeabb6bb786088957f64a0e8efc802d7715d662269859930f7',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_5.1.0',
            size: '2.88MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/arm_2203/openGauss-5.1.0-openEuler-aarch64-Python.tar.gz`,
            sha_code:
              '7aa9c23a7a330692d4ef7b79d4a934b41de4b390c6a9c65a04163e694433e0f6',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_5.1.0',
            size: '4.90MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/arm_2203/openGauss-5.1.0-openEuler-64bit-Libpq.tar.gz`,
            sha_code:
              'feec4acc99f39d980c7c71c3161f084d350545bc24421541057a1384c22ce4d9',
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
            name: 'JDBC_5.1.0',
            size: '1.67MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/x86_openEuler_2203/openGauss-5.1.0-JDBC.tar.gz`,
            sha_code:
              'be12532ea1b6f70c5ae0dc882d1d7b135fecb86e6c956252022252aa31df96ab',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_5.1.0',
            size: '9.09MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/x86_openEuler_2203/openGauss-5.1.0-ODBC.tar.gz`,
            sha_code:
              '38677e83a907c20ef3743874085998e76448ac939d4b9081eddfc6ac34e135c9',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_5.1.0',
            size: '3.02MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/x86_openEuler_2203/openGauss-5.1.0-openEuler-x86_64-Python.tar.gz`,
            sha_code:
              '8e24fdd1405b1a3838e8b1854f4b404648a7c3f8ce3210be3326ccc017791ac7',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_5.1.0',
            size: '5.13MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/x86_openEuler_2203/openGauss-5.1.0-openEuler-64bit-Libpq.tar.gz`,
            sha_code:
              '639039a27fb9de215a411bb9f809804f1139833dccf4b2cf1e63346ea1e555be',
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
            name: 'JDBC_5.1.0',
            size: '1.67MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/arm/openGauss-5.1.0-JDBC.tar.gz`,
            sha_code:
              '206a20e4da7fea117c9b9f7a2a0dc727887bd5cf0a6f9a7787dbe9e3e91ab2c9',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_5.1.0',
            size: '8.88MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/arm/openGauss-5.1.0-ODBC.tar.gz`,
            sha_code:
              '9f82d7359bebff432f448d231fceae4256e1f1038276c3d98f8ec05d0c150a96',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_5.1.0',
            size: '2.87MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/arm/openGauss-5.1.0-openEuler-aarch64-Python.tar.gz`,
            sha_code:
              '152fde73614916ef0b05c2f41eb081d7189d95817ca34416ccb493022ae34789',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_5.1.0',
            size: '4.90MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/arm/openGauss-5.1.0-openEuler-64bit-Libpq.tar.gz`,
            sha_code:
              'bb481e7e8cbfc0443c465de626b5246621f7f64633d2d603ddd0283364bf25bb',
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
            name: 'JDBC_5.1.0',
            size: '1.67MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/x86_openEuler/openGauss-5.1.0-JDBC.tar.gz`,
            sha_code:
              'b4bc6d99c5c8e9169859d1229415d145b29bdaaa36fc9949c6092760ee5ffd97',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_5.1.0',
            size: '9.10MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/x86_openEuler/openGauss-5.1.0-ODBC.tar.gz`,
            sha_code:
              '364d7ea352aa84d32f3a66d46ba364cee57bb1b8e25b45bdea4279c2e432e8c6',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_5.1.0',
            size: '3.02MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/x86_openEuler/openGauss-5.1.0-openEuler-x86_64-Python.tar.gz`,
            sha_code:
              '16089b01fde84655623eb2b262b655d48544cf50e14c03f56708140f44a90f6b',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_5.1.0',
            size: '5.13MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/x86_openEuler/openGauss-5.1.0-openEuler-64bit-Libpq.tar.gz`,
            sha_code:
              'a63f8e1900023bede9c6d4b1097461bc6ec2ac638113e11040ccf108a4e2142f',
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
            name: 'JDBC_5.1.0',
            size: '1.67MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/x86/openGauss-5.1.0-JDBC.tar.gz`,
            sha_code:
              'f98affcc98d00a631e79e4a5bdb88b17ab065bf670b0b240a61c4827712d2053',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_5.1.0',
            size: '9.05MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/x86/openGauss-5.1.0-ODBC.tar.gz`,
            sha_code:
              '88eea0489cbe28d8caaca857df8f6f2b0af46e8a4e8e43464d7e13e728744c69',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_5.1.0',
            size: '3.26MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/x86/openGauss-5.1.0-CentOS-x86_64-Python.tar.gz`,
            sha_code:
              '446a9fdc7620a912c60e1d4cb683d1057d20202f1a3cf00f3ef171b97856cddd',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_5.1.0',
            size: '5.08MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/x86/openGauss-5.1.0-CentOS-64bit-Libpq.tar.gz`,
            sha_code:
              'd61101aeb4b2d6d16de72edec6556e20480809eae203d08c3a7436a26a20945c',
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
            name: 'JDBC_5.1.0',
            size: '1.67MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/x86/openGauss-5.1.0-JDBC.tar.gz`,
            sha_code:
              'f98affcc98d00a631e79e4a5bdb88b17ab065bf670b0b240a61c4827712d2053',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_5.1.0',
            size: '5.24MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/windows/openGauss-5.1.0-ODBC-windows.tar.gz`,
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
            name: 'symbol_5.1.0',
            size: '354.60MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/arm_2203/openGauss-5.1.0-openEuler-64bit-symbol.tar.gz`,
            sha_code:
              '357eea35076207d306b9d69c1a36170bc1f740a280031d6a7ec60215de3b62d7',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_5.1.0',
            size: '23.53MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/arm_2203/openGauss-5.1.0-openEuler-64bit-cm-symbol.tar.gz`,
            sha_code:
              '3583b66300245ad13a2912933b148a1153dfed661bfc24dfed037b9b127381d3',
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
            name: 'symbol_5.1.0',
            size: '349.89MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/x86_openEuler_2203/openGauss-5.1.0-openEuler-64bit-symbol.tar.gz`,
            sha_code:
              '190121a5baaebe8f8d0dd0a888e2958b8350fb89b80f2843358e372730fc2ca4',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_5.1.0',
            size: '21.46MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/x86_openEuler_2203/openGauss-5.1.0-openEuler-64bit-cm-symbol.tar.gz`,
            sha_code:
              'ef0cff42a7562f304e32d5be00208202b0c2cd4837b673d6b242168282e97a45',
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
            name: 'symbol_5.1.0',
            size: '353.48MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/arm/openGauss-5.1.0-openEuler-64bit-symbol.tar.gz`,
            sha_code:
              '3d77380af027a78f180761b0c3fbc6d2e90361d5bb421d022b5ca1e1ecab9374',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_5.1.0',
            size: '23.44MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/arm/openGauss-5.1.0-openEuler-64bit-cm-symbol.tar.gz`,
            sha_code:
              'ab27e56757b33a0da31d1bf885523ebb0fc129afcf1301cdd4bb464c58044195',
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
            name: 'symbol_5.1.0',
            size: '348.95MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/x86_openEuler/openGauss-5.1.0-openEuler-64bit-symbol.tar.gz`,
            sha_code:
              '3bb4ff4ec013a3ea92dbf091996dac5e6b6ea152bf5bf4ff748b496485544a32',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_5.1.0',
            size: '21.45MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/x86_openEuler/openGauss-5.1.0-openEuler-64bit-cm-symbol.tar.gz`,
            sha_code:
              '13bdc34a15dfc6d2246854d6a46fcbf9a3d52099a8d57881db4d315d77dbc09d',
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
            name: 'symbol_5.1.0',
            size: '340.08MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/x86/openGauss-5.1.0-CentOS-64bit-symbol.tar.gz`,
            sha_code:
              '01196f13bbf9f226004b3f8df176ec870944e82779e70c5bc603a4b86efd0d10',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_5.1.0',
            size: '20.40MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/x86/openGauss-5.1.0-CentOS-64bit-cm-symbol.tar.gz`,
            sha_code:
              '9cccf2da93d75ef91328484e89636d6e473834319f0e24f9a78d7d354006849c',
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
            name: 'replicate-mysql2openGauss_5.1.0',
            size: '10.41MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/tools/replicate-mysql2openGauss-5.1.0.tar.gz`,
            sha_code:
              '63051488384aa056da479e4e8e489e8c4933194e31bfe441cafe3539dea35ce0',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'replicate-openGauss2mysql_5.1.0',
            size: '9.26MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/tools/replicate-openGauss2mysql-5.1.0.tar.gz`,
            sha_code:
              '913058814c587535a6b3dcef7a41f0345321848bca313413feef4dcabcf12dee',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'gs_datacheck_5.1.0',
            size: '79.57MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/tools/gs_datacheck-5.1.0.tar.gz`,
            sha_code:
              'cec483bdaa737a9cee70f7c04eae6e8d207494cbc6e832fd1d7d421f27865530',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Datakit_5.1.0',
            size: '356.05MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/tools/Datakit/Datakit-5.1.0.tar.gz`,
            sha_code:
              '09d5193923753b2bc365c3c913b6aeb0b80fc8567bca1f35ce26e4af3bc80f64',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'dbmind_5.1.0',
            size: '218.29MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/dbmind/arm/dbmind-installer-aarch64-python3.11.sh.tar.gz`,
            sha_code:
              '8fef9f7b6d4221d9e9b2742bc8900fb0fa68382011877285046c8b33766f7cf3',
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
            name: 'replicate-mysql2openGauss_5.1.0',
            size: '10.41MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/tools/replicate-mysql2openGauss-5.1.0.tar.gz`,
            sha_code:
              '63051488384aa056da479e4e8e489e8c4933194e31bfe441cafe3539dea35ce0',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'replicate-openGauss2mysql_5.1.0',
            size: '9.26MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/tools/replicate-openGauss2mysql-5.1.0.tar.gz`,
            sha_code:
              '913058814c587535a6b3dcef7a41f0345321848bca313413feef4dcabcf12dee',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'gs_datacheck_5.1.0',
            size: '79.57MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/tools/gs_datacheck-5.1.0.tar.gz`,
            sha_code:
              'cec483bdaa737a9cee70f7c04eae6e8d207494cbc6e832fd1d7d421f27865530',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Datakit_5.1.0',
            size: '356.05MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/tools/Datakit/Datakit-5.1.0.tar.gz`,
            sha_code:
              '09d5193923753b2bc365c3c913b6aeb0b80fc8567bca1f35ce26e4af3bc80f64',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'dbmind_5.1.0',
            size: '304.12MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/dbmind/x86/dbmind-installer-x86_64-python3.11.sh.tar.gz`,
            sha_code:
              'e21c50821bc3fde1da68bb9e9a48a0044d1d985e9be039f16a2399ca550f83b4',
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
            name: 'Data Studio_5.1.0',
            size: '98.72MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/tools/DataStudio_win_64.zip`,
            sha_code:
              'c3e3f16a68e6bd7f7e8c963f638f6afd486c907e99926963021602e297d88390',
            docsName: '使用文档',
            docs_url: `${OBS_DOWNLOAD_LINK}5.1.0/tools/Data%20Studio%20%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C.pdf`,
          },
        ],
      },
      {
        system: 'openEuler 22.03 LTS (aarch64)',
        architecture: 'AArch64',
        os: 'openEuler 22.03 LTS',
        content: [
          {
            name: 'Chameleon_5.1.0',
            size: '74.36MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/tools/openEuler22.03/chameleon-5.1.0-aarch64.tar.gz`,
            sha_code:
              '1365776dfc640524f34c6db9b79e84cfe2d0257c7761e6d50d6a35b3e908c120',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'PortalControl_5.1.0',
            size: '566.99MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/tools/openEuler22.03/PortalControl-5.1.0-aarch64.tar.gz`,
            sha_code:
              '9aab2ded1d86ed27c9fcda8ddf5017ab848121ac284639422e181f88409f78e0',
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
            name: 'Chameleon_5.1.0',
            size: '74.62MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/tools/openEuler22.03/chameleon-5.1.0-x86_64.tar.gz`,
            sha_code:
              '74b3703f619089111570d0b4963e52e4497e91cf7bcf00822537d1a6024986f5',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'PortalControl_5.1.0',
            size: '567.24MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/tools/openEuler22.03/PortalControl-5.1.0-x86_64.tar.gz`,
            sha_code:
              '59c10f92524bca245ce8a3f3f46f9d9fddfcb1dcc6629171649618af87b73f2d',
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
            name: 'Chameleon_5.1.0',
            size: '71.84MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/tools/openEuler20.03/chameleon-5.1.0-aarch64.tar.gz`,
            sha_code:
              '51c6cb74226de9e98032f2fdd92ecf50a82f1fe2323855936f694d41ff85b0ee',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'PortalControl_5.1.0',
            size: '564.41MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/tools/openEuler20.03/PortalControl-5.1.0-aarch64.tar.gz`,
            sha_code:
              'f40b7161b7c9b093f2ec3752337ff650ec45399c94013f6290e538da9135cca3',
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
            name: 'Chameleon_5.1.0',
            size: '71.05MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/tools/openEuler20.03/chameleon-5.1.0-x86_64.tar.gz`,
            sha_code:
              'b6c4b8c02fb98531d548bfd7ee631f6cdb41105e8b8408cd6797687e1e46f239',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'PortalControl_5.1.0',
            size: '563.66MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/tools/openEuler20.03/PortalControl-5.1.0-x86_64.tar.gz`,
            sha_code:
              '4b98430d7ca9ef8a7ec5fb9a36c4b517d153f8624cdedf5a3ba4b6dc862e903e',
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
            name: 'Chameleon_5.1.0',
            size: '72.12MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/tools/centos7/chameleon-5.1.0-x86_64.tar.gz`,
            sha_code:
              '133e439fe43935841f709e154e3b4e7adf0207a2540b5b488b8467cb48aaa96b',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'PortalControl_5.1.0',
            size: '564.78MB',
            down_url: `${OBS_DOWNLOAD_LINK}5.1.0/tools/centos7/PortalControl-5.1.0-x86_64.tar.gz`,
            sha_code:
              'efd017f3e755ea1ff629eb003305303b69bb47bff88710ce6384839377bb1603',
            docsName: '',
            docs_url: '',
          },
        ],
      },
    ],
  },
];
