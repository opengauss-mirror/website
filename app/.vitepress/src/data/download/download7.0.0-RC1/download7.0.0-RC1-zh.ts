import { OBS_DOWNLOAD_LINK } from '@/data/url-config';
export default [
  {
    name: 'openGauss Server',
    content: [
      {
        system: 'openEuler 24.03 LTS (aarch64)',
        docs: true,
        architecture: 'AArch64',
        os: 'openEuler 24.03 LTS',
        content: [
          {
            name: 'openGauss_7.0.0-RC1 企业版',            
            size: '142.50MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler24.03/arm/openGauss-All-7.0.0-RC1-openEuler24.03-aarch64.tar.gz`,
            sha_code:
              '8b670a2a62ca5ea87585258bdc06b8a6c565cad5af388071a1c702fbde56cf68',
            docsName: '企业版安装指南',
            docs_url:
              '/docs/7.0.0-RC1/docs/InstallationGuide/%E4%BC%81%E4%B8%9A%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_7.0.0-RC1 极简版',
            size: '109.49MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler24.03/arm/openGauss-Server-7.0.0-RC1-openEuler24.03-aarch64.tar.bz2`,
            sha_code:
              'e574e520a16c4ec4d7bfc757dd247334814b5b16400d1b58b67a15a79815f451',
            docsName: '极简版安装指南',
            docs_url:
              '/docs/7.0.0-RC1/docs/InstallationGuide/%E6%9E%81%E7%AE%80%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_7.0.0-RC1 轻量版',
            size: '29.19MB',
            edition: 'lite',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler24.03/arm/openGauss-Lite-7.0.0-RC1-openEuler24.03-aarch64.tar.gz`,
            sha_code:
              '85b372173307f7d3a24441c1abb8aed6fbfeaf6460e765b8d576fc50d2052702',
            docsName: '轻量版安装指南',
            docs_url:
              '/docs/7.0.0-RC1-lite/docs/InstallationGuide/%E5%AE%89%E8%A3%85%E6%A6%82%E8%BF%B0.html',
          },
          {
            name: 'openGauss_7.0.0-RC1 企业版(noLSE)',
            size: '28.02MB',
            edition: 'lite',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/noLSE/openEuler24.03/arm/openGauss-All-7.0.0-RC1-openEuler24.03-aarch64.tar.gz`,
            sha_code:
              'ac07a14c12f77fd671dda9e17a93d2b02eee9df17fb6c6688c9157016ab3a069',
            docsName: '企业版安装指南',
            docs_url:
              '/docs/7.0.0-RC1/docs/InstallationGuide/%E4%BC%81%E4%B8%9A%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
        ],
      },
      {
        system: 'openEuler 24.03 LTS (x86_64)',
        docs: true,
        architecture: 'x86_64',
        os: 'openEuler 24.03 LTS',
        content: [
          {
            name: 'openGauss_7.0.0-RC1 企业版',
            size: '147.62MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler24.03/x86/openGauss-All-7.0.0-RC1-openEuler24.03-x86_64.tar.gz`,
            sha_code:
              '884449f7767ac6f454973c384e5f4d584fba5f52040e6d4ee62847358e70ab80',
            docsName: '企业版安装指南',
            docs_url:
              '/docs/7.0.0-RC1/docs/InstallationGuide/%E4%BC%81%E4%B8%9A%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_7.0.0-RC1 极简版',
            size: '104.26MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler24.03/x86/openGauss-Server-7.0.0-RC1-openEuler24.03-x86_64.tar.bz2`,
            sha_code:
              'd102a3fdb0cf6bb14c1b36d0fa11c9d3eaa86be8bd10792ee45a5e2ed391f8c9',
            docsName: '极简版安装指南',
            docs_url:
              '/docs/7.0.0-RC1/docs/InstallationGuide/%E6%9E%81%E7%AE%80%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_7.0.0-RC1 轻量版',
            size: '29.02MB',
            edition: 'lite',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler24.03/x86/openGauss-Lite-7.0.0-RC1-openEuler24.03-x86_64.tar.gz`,
            sha_code:
              '85c52af26335326e5b4f664b4c3e5a8bf84c24d9d052e26a77a742beb98afb6d',
            docsName: '轻量版安装指南',
            docs_url:
              '/docs/7.0.0-RC1-lite/docs/InstallationGuide/%E5%AE%89%E8%A3%85%E6%A6%82%E8%BF%B0.html',
          },
        ],
      },
      {
        system: 'openEuler 22.03 LTS (aarch64)',
        docs: true,
        architecture: 'AArch64',
        os: 'openEuler 22.03 LTS',
        content: [
          {
            name: 'openGauss_7.0.0-RC1 企业版',            
            size: '143.96MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler22.03/arm/openGauss-All-7.0.0-RC1-openEuler22.03-aarch64.tar.gz`,
            sha_code:
              '94f0a27f1ee6d354e83ecf08c4d2568f74aeb55fd16c665dadecc6e5be09a92e',
            docsName: '企业版安装指南',
            docs_url:
              '/docs/7.0.0-RC1/docs/InstallationGuide/%E4%BC%81%E4%B8%9A%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_7.0.0-RC1 极简版',
            size: '100.82MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler22.03/arm/openGauss-Server-7.0.0-RC1-openEuler22.03-aarch64.tar.bz2`,
            sha_code:
              'ed16781ae44a33b4f319c2464165ea7f10a215c0588d2935d3d6bb594402e311',
            docsName: '极简版安装指南',
            docs_url:
              '/docs/7.0.0-RC1/docs/InstallationGuide/%E6%9E%81%E7%AE%80%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_7.0.0-RC1 轻量版',
            size: '28.02MB',
            edition: 'lite',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler22.03/arm/openGauss-Lite-7.0.0-RC1-openEuler22.03-aarch64.tar.gz`,
            sha_code:
              '01cf74c19d269af3e3a11e5a9bb1949c0e2d90fd6f3f9ba6f2da4fbcc9b078b1',
            docsName: '轻量版安装指南',
            docs_url:
              '/docs/7.0.0-RC1-lite/docs/InstallationGuide/%E5%AE%89%E8%A3%85%E6%A6%82%E8%BF%B0.html',
          },
          {
            name: 'openGauss_7.0.0-RC1 企业版(noLSE)',            
            size: '143.96MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/noLSE/openEuler22.03/arm/openGauss-All-7.0.0-RC1-openEuler22.03-aarch64.tar.gz`,
            sha_code:
              '8a902c0cb95180b110574159ef39ad36724bb3b59412ec35825837cf81f9ac1d',
            docsName: '企业版安装指南',
            docs_url:
              '/docs/7.0.0-RC1/docs/InstallationGuide/%E4%BC%81%E4%B8%9A%E7%89%88%E5%AE%89%E8%A3%85.html',
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
            name: 'openGauss_7.0.0-RC1 企业版',
            size: '147.62MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler22.03/x86/openGauss-All-7.0.0-RC1-openEuler22.03-x86_64.tar.gz`,
            sha_code:
              'e0ba2f3b2a54c89d8645d80982b6101d80dee5b18abcbdb0a2d4ef8d34a6f29e',
            docsName: '企业版安装指南',
            docs_url:
              '/docs/7.0.0-RC1/docs/InstallationGuide/%E4%BC%81%E4%B8%9A%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_7.0.0-RC1 极简版',
            size: '104.26MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler22.03/x86/openGauss-Server-7.0.0-RC1-openEuler22.03-x86_64.tar.bz2`,
            sha_code:
              'e8d7afd2ed1d33abd6faa09b684c6e2ded15b5f446864d5601fb43a033f0f763',
            docsName: '极简版安装指南',
            docs_url:
              '/docs/7.0.0-RC1/docs/InstallationGuide/%E6%9E%81%E7%AE%80%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_7.0.0-RC1 轻量版',
            size: '29.02MB',
            edition: 'lite',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler22.03/x86/openGauss-Lite-7.0.0-RC1-openEuler22.03-x86_64.tar.gz`,
            sha_code:
              '18f3c71d8f61a3d1e9eb1e5280188bd8ce0e1c1e49b437b6c25c17f3941e8827',
            docsName: '轻量版安装指南',
            docs_url:
              '/docs/7.0.0-RC1-lite/docs/InstallationGuide/%E5%AE%89%E8%A3%85%E6%A6%82%E8%BF%B0.html',
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
            name: 'openGauss_7.0.0-RC1 企业版',
            size: '143.78MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler20.03/arm/openGauss-All-7.0.0-RC1-openEuler20.03-aarch64.tar.gz`,
            sha_code:
              'e05eb0e9268bd8f51edeb7129d841560ebd0af63e319506aa7fa0a8396aeea58',
            docsName: '企业版安装指南',
            docs_url:
              '/docs/7.0.0-RC1/docs/InstallationGuide/%E4%BC%81%E4%B8%9A%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_7.0.0-RC1 极简版',
            size: '100.83MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler20.03/arm/openGauss-Server-7.0.0-RC1-openEuler20.03-aarch64.tar.bz2`,
            sha_code:
              '200bb5b0bffbe37bf9ebc98e1c47966cbbe1b503dfd06029ff662e4d02c3b655',
            docsName: '极简版安装指南',
            docs_url:
              '/docs/7.0.0-RC1/docs/InstallationGuide/%E6%9E%81%E7%AE%80%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_7.0.0-RC1 轻量版',
            size: '28.03MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler20.03/arm/openGauss-Lite-7.0.0-RC1-openEuler20.03-aarch64.tar.gz`,
            sha_code:
              'ed616d1d6548f1f680a75b645b55c451a81415b375de3abc8f68681e24c7c90b',
            docsName: '轻量版安装指南',
            docs_url:
              '/docs/7.0.0-RC1-lite/docs/InstallationGuide/%E5%AE%89%E8%A3%85%E6%A6%82%E8%BF%B0.html',
          },
          {
            name: 'openGauss_7.0.0-RC1 企业版(noLSE)',
            size: '143.78MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/noLSE/openEuler20.03/arm/openGauss-All-7.0.0-RC1-openEuler20.03-aarch64.tar.gz`,
            sha_code:
              'b20f1cf4baa8ec79787988fe48353ddde0dce8ffa09fc363690572142c732927',
            docsName: '企业版安装指南',
            docs_url:
              '/docs/7.0.0-RC1/docs/InstallationGuide/%E4%BC%81%E4%B8%9A%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_7.0.0-RC1 分布式镜像',
            size: '3.41GB',
            edition: 'distributed',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/distributed/openGauss-distributed-aarch64-image.tar.gz`,
            sha_code:
              '18cc52e1cfa960386dea60c7b06410a28b4b2d673d9cc9128603bc0c6ce77fca',
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
            name: 'openGauss_7.0.0-RC1 企业版',
            size: '148.18MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler20.03/x86/openGauss-All-7.0.0-RC1-openEuler20.03-x86_64.tar.gz`,
            sha_code:
              'fca58c40edec7efb56c5ac0a3c775311e4d8cfab90dcf62cbb9300f1c262fb07',
            docsName: '企业版安装指南',
            docs_url:
              '/docs/7.0.0-RC1/docs/InstallationGuide/%E4%BC%81%E4%B8%9A%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_7.0.0-RC1 极简版',
            size: '104.48MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler20.03/x86/openGauss-Server-7.0.0-RC1-openEuler20.03-x86_64.tar.bz2`,
            sha_code:
              '86a5ce3be7a7a368c2ab4587d5ec54fcec54656acafd9433ec7f6676b5fa6cda',
            docsName: '极简版安装指南',
            docs_url:
              '/docs/7.0.0-RC1/docs/InstallationGuide/%E6%9E%81%E7%AE%80%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_7.0.0-RC1 轻量版',
            size: '29.39MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler20.03/x86/openGauss-Lite-7.0.0-RC1-openEuler20.03-x86_64.tar.gz`,
            sha_code:
              '9c53a4d1a3f1c3fcd51117b0f803c729b91864201ff26a830a09226ef25cc2f6',
            docsName: '轻量版安装指南',
            docs_url:
              '/docs/7.0.0-RC1-lite/docs/InstallationGuide/%E5%AE%89%E8%A3%85%E6%A6%82%E8%BF%B0.html',
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
            name: 'openGauss_7.0.0-RC1 企业版',
            size: '146.25MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/CentOS7/x86/openGauss-All-7.0.0-RC1-CentOS7-x86_64.tar.gz`,
            sha_code:
              '80aa3c8d0b9574b8f4fd350cce95799894d788dfd97d5e5facc4e2285b5c1dac',
            docsName: '企业版安装指南',
            docs_url:
              '/docs/7.0.0-RC1/docs/InstallationGuide/%E4%BC%81%E4%B8%9A%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_7.0.0-RC1 极简版',
            size: '103.55MB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/CentOS7/x86/openGauss-Server-7.0.0-RC1-CentOS7-x86_64.tar.bz2`,
            sha_code:
              '4c84dd922daebaf3cb1e20cd8c389fc0195d080d3583b3b0f355c1db841b4f49',
            docsName: '极简版安装指南',
            docs_url:
              '/docs/7.0.0-RC1/docs/InstallationGuide/%E6%9E%81%E7%AE%80%E7%89%88%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_7.0.0-RC1 轻量版',
            size: '28.95MB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/CentOS7/x86/openGauss-Lite-7.0.0-RC1-CentOS7-x86_64.tar.gz`,
            sha_code:
              'a92618cb35eeced7a98b0bd90df52099704299820934514555c7f0ce3374827e',
            docsName: '轻量版安装指南',
            docs_url:
              '/docs/7.0.0-RC1-lite/docs/InstallationGuide/%E5%AE%89%E8%A3%85%E6%A6%82%E8%BF%B0.html',
          },
          {
            name: 'openGauss_7.0.0-RC1 分布式镜像',
            size: '3.29GB',
            edition: 'distributed',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/distributed/openGauss-distributed-x86_64-image.tar.gz`,
            sha_code:
              'e962eb67ea38df62fc352cb39f5ab8449027da7907c131a82176648757202be2',
            docsName: '',
            docs_url: '',
          },
        ],
      },
      {
        system: 'Docker (x86_64)',
        architecture: 'x86_64',
        os: 'Docker',
        docs: true,
        content: [
          {
            name: 'openGauss_7.0.0-RC1 极简版',
            size: '1.60GB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler20.03/x86/openGauss-Docker-7.0.0-RC1-x86_64.tar`,
            sha_code:
              '7bb57619c409427a72798c354bbbfe56f5827d0599126d3a2ec7fd4de971e0b2',
            docsName: '极简版安装指南',
            docs_url:
              '/docs/7.0.0-RC1/docs/InstallationGuide/%E5%AE%B9%E5%99%A8%E9%95%9C%E5%83%8F%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_7.0.0-RC1 轻量版',
            size: '1.26GB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler20.03/x86/openGauss-Lite-Docker-7.0.0-RC1-x86_64.tar.gz`,
            sha_code:
              '9d912dc7b81e27d8a38604128fa8862400a20501daa95c3369efa05315c5f1b7',
            docsName: '轻量版安装指南',
            docs_url:
              '/docs/7.0.0-RC1-lite/docs/InstallationGuide/%E5%AE%B9%E5%99%A8%E9%95%9C%E5%83%8F%E5%AE%89%E8%A3%85.html',
          },
        ],
      },
      {
        system: 'Docker (AArch64)',
        architecture: 'AArch64',
        os: 'Docker',
        docs: true,
        content: [
          {
            name: 'openGauss_7.0.0-RC1 极简版',
            size: '1.70GB',
            edition: 'simple',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler20.03/arm/openGauss-Server-7.0.0-RC1-CentOS7-x86_64.tar.bz2`,
            sha_code:
              '22c7653a8f479cf442f68833ed2e630611ac0b5104557957e460bd1883ac430a',
            docsName: '极简版安装指南',
            docs_url:
              '/docs/7.0.0-RC1/docs/InstallationGuide/%E5%AE%B9%E5%99%A8%E9%95%9C%E5%83%8F%E5%AE%89%E8%A3%85.html',
          },
          {
            name: 'openGauss_7.0.0-RC1 轻量版',
            size: '1.37GB',
            edition: 'enterprise',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler20.03/arm/openGauss-Lite-7.0.0-RC1-CentOS7-x86_64.tar.gz`,
            sha_code:
              '2f4286cbf6fdf6eb4b583812ac28824131d299ed8d2682fd75e934745471b194',
            docsName: '轻量版安装指南',
            docs_url:
              '/docs/7.0.0-RC1-lite/docs/InstallationGuide/%E5%AE%B9%E5%99%A8%E9%95%9C%E5%83%8F%E5%AE%89%E8%A3%85.html',
          },
        ],
      },
    ],
  },
  {
    name: 'openGauss Connectors',
    content: [
      {
        system: 'openEuler 24.03 LTS (aarch64)',
        architecture: 'AArch64',
        os: 'openEuler 24.03 LTS',
        content: [
          {
            name: 'JDBC_7.0.0-RC1',
            size: '1.75MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler24.03/arm/openGauss-JDBC-7.0.0-RC1.tar.gz`,
            sha_code:
              '97a29b1661b8e6991aa3aa87bace9286a92e294a973930792b9473c1beddedf5',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_7.0.0-RC1',
            size: '9.04MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler24.03/arm/openGauss-ODBC-7.0.0-RC1-openEuler24.03-aarch64.tar.gz`,
            sha_code:
              '6d114a9f6ccf65fa5dad7f6d1a53e1ec11ec261393d1d303ec19a6c49b60e94b',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_7.0.0-RC1',
            size: '2.95MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler24.03/arm/openGauss-Python-7.0.0-RC1-openEuler24.03-aarch64.tar.gz`,
            sha_code:
              'e8f915c0ed423b51fc65a856c19c45870cddab3d0a1128af3f2cff8f1f21d062',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_7.0.0-RC1',
            size: '5.04MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler24.03/arm/openGauss-Libpq-7.0.0-RC1-openEuler24.03-aarch64.tar.gz`,
            sha_code:
              '9e5e1e3d111b5ad068b5f758514d9b3f69b3b6d3fa2dd1545f69bd7774633bc8',
            docsName: '',
            docs_url: '',
          },
        ],
      },
      {
        system: 'openEuler 24.03 LTS (x86_64)',
        architecture: 'x86_64',
        os: 'openEuler 24.03 LTS',
        content: [
          {
            name: 'JDBC_7.0.0-RC1',
            size: '1.75MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler24.03/x86/openGauss-JDBC-7.0.0-RC1.tar.gz`,
            sha_code:
              '5d1f0ba9897a647b900371c1bd7eef4f49558c04c8735d4b216431924d25e8d9',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_7.0.0-RC1',
            size: '9.25MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler24.03/x86/openGauss-ODBC-7.0.0-RC1-openEuler24.03-x86_64.tar.gz`,
            sha_code:
              '61f4e96cc3339dc2da74e01b96d202adfa7501f13b36d723de44ebfa0400071c',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_7.0.0-RC1',
            size: '3.09MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler24.03/x86/openGauss-Python-7.0.0-RC1-openEuler24.03-x86_64.tar.gz`,
            sha_code:
              '22840cbd131cbaf9f45adc491c9ff307c442bd34f344c19b967d41288eaceda6',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_7.0.0-RC1',
            size: '5.27MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler24.03/x86/openGauss-Libpq-7.0.0-RC1-openEuler24.03-x86_64.tar.gz`,
            sha_code:
              '6e18996836422118dc831a402ee26c81289eb0995174848317cf45e9e50180e2',
            docsName: '',
            docs_url: '',
          },
        ],
      },
      {
        system: 'openEuler 22.03 LTS (aarch64)',
        architecture: 'AArch64',
        os: 'openEuler 22.03 LTS',
        content: [
          {
            name: 'JDBC_7.0.0-RC1',
            size: '1.75MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler22.03/arm/openGauss-JDBC-7.0.0-RC1.tar.gz`,
            sha_code:
              '86f70924d039201de9d5751697a366544220ff7ff6373cf7a7d248166e73544c',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_7.0.0-RC1',
            size: '9.04MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler22.03/arm/openGauss-ODBC-7.0.0-RC1-openEuler22.03-aarch64.tar.gz`,
            sha_code:
              'e9184770d26e30b34a4bc03911e08c52f2ff14b001e8f921c9c14ee6d9925d58',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_7.0.0-RC1',
            size: '2.95MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler22.03/arm/openGauss-Python-7.0.0-RC1-openEuler22.03-aarch64.tar.gz`,
            sha_code:
              '689f5cafa6c3e1180f9de035cb6299282746ad13e3d70d6206d38d60e7842816',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_7.0.0-RC1',
            size: '5.04MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler22.03/arm/openGauss-Libpq-7.0.0-RC1-openEuler22.03-aarch64.tar.gz`,
            sha_code:
              '972dafe9d98ef3a860b11373c970e72f0eeed11e7cb6632f1d349f6efe0cf351',
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
            name: 'JDBC_7.0.0-RC1',
            size: '1.75MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler22.03/x86/openGauss-JDBC-7.0.0-RC1.tar.gz`,
            sha_code:
              '9d7e27ceb2febb61e9ac7d5bf211a3454bd11f2e97a44fcb5cfb64df45762806',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_7.0.0-RC1',
            size: '9.25MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler22.03/x86/openGauss-ODBC-7.0.0-RC1-openEuler22.03-x86_64.tar.gz`,
            sha_code:
              '477ccc01ac71b182c3b72f233c8efd9c875e01c03795dd0f35d9e84797792be2',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_7.0.0-RC1',
            size: '3.09MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler22.03/x86/openGauss-Python-7.0.0-RC1-openEuler22.03-x86_64.tar.gz`,
            sha_code:
              'b8f164f8cb38859ea82c185a68b4f8977a298148af24d7660c643380c90ce124',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_7.0.0-RC1',
            size: '5.27MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler22.03/x86/openGauss-Libpq-7.0.0-RC1-openEuler22.03-x86_64.tar.gz`,
            sha_code:
              'a1a22ad89b09b09b34ba66c2878964e4d30af1a64394672646eeb760204d7d42',
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
            name: 'JDBC_7.0.0-RC1',
            size: '1.75MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler20.03/arm/openGauss-JDBC-7.0.0-RC1.tar.gz`,
            sha_code:
              '4816a9c23e9171d8f5d3e4af2d3c73d309e284d399f6ff84ee5afe108386d56c',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_7.0.0-RC1',
            size: '9.05MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler20.03/arm/openGauss-ODBC-7.0.0-RC1-openEuler20.03-aarch64.tar.gz`,
            sha_code:
              '041298666f6ec9a1ff008edc841b36c92d7085b73d31618ffa6d944a28750cc4',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_7.0.0-RC1',
            size: '2.94MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler20.03/arm/openGauss-Python-7.0.0-RC1-openEuler20.03-aarch64.tar.gz`,
            sha_code:
              '5686d532512b75acd356f6fd4f541cc7812f092a233426a446642d759cb29cb4',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_7.0.0-RC1',
            size: '5.04MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler20.03/arm/openGauss-Libpq-7.0.0-RC1-openEuler20.03-aarch64.tar.gz`,
            sha_code:
              '854aa3c8fe19c8327e4c1f185fa3becdcd78b2bf6a5695d7044da183cc038309',
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
            name: 'JDBC_7.0.0-RC1',
            size: '1.75MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler20.03/x86/openGauss-JDBC-7.0.0-RC1.tar.gz`,
            sha_code:
              '9d7e27ceb2febb61e9ac7d5bf211a3454bd11f2e97a44fcb5cfb64df45762806',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_7.0.0-RC1',
            size: '9.26MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler20.03/x86/openGauss-ODBC-7.0.0-RC1-openEuler20.03-x86_64.tar.gz`,
            sha_code:
              'faff2097c3b29d95c10de7693ad257abf0cadcbeb0042c4d96feead12fdaefb9',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_7.0.0-RC1',
            size: '3.09MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler20.03/x86/openGauss-Python-7.0.0-RC1-openEuler20.03-x86_64.tar.gz`,
            sha_code:
              '332b61f615e4c616a9556093396004a471f8cc2eab226ebed22518e1577d3ca0',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_7.0.0-RC1',
            size: '5.27MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler20.03/x86/openGauss-Libpq-7.0.0-RC1-openEuler20.03-x86_64.tar.gz`,
            sha_code:
              '9c53a4d1a3f1c3fcd51117b0f803c729b91864201ff26a830a09226ef25cc2f6',
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
            name: 'JDBC_7.0.0-RC1',
            size: '1.75MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/CentOS7/x86/openGauss-JDBC-7.0.0-RC1.tar.gz`,
            sha_code:
              '481edc1edd79e49dcf3b01a018afe683448ad42fd081b17fcaeaadb067555d9d',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_7.0.0-RC1',
            size: '9.12MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/CentOS7/x86/openGauss-ODBC-7.0.0-RC1-CentOS7-x86_64.tar.gz`,
            sha_code:
              '97a4b46aa93fd0bf9f8008ca0e1bdfea0801116c59e4fcb1e680225a546836dc',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Python-psycopg2_7.0.0-RC1',
            size: '3.29MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/CentOS7/x86/openGauss-Python-7.0.0-RC1-CentOS7-x86_64.tar.gz`,
            sha_code:
              '3f09cf51fe596ab93daeae9c0b1f4859452372c711de70c905324f19b24061cf',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'libpq_7.0.0-RC1',
            size: '5.15MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/CentOS7/x86/openGauss-Libpq-7.0.0-RC1-CentOS7-x86_64.tar.gz`,
            sha_code:
              '1a8395885084f0067b97e2826e1438d6e4808351343c9a7cfa4e366d3dbdd557',
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
            name: 'JDBC_7.0.0-RC1',
            size: '1.75MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/CentOS7/x86/openGauss-JDBC-7.0.0-RC1.tar.gz`,
            sha_code:
              'e4d369d33e9261aa9dbe412e352144b1206f8274a8e9570a421d0707657dfb97',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'ODBC_7.0.0-RC1',
            size: '5.24MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/windows/openGauss-ODBC-7.0.0-RC1-windows.tar.gz`,
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
        system: 'openEuler 24.03 LTS (aarch64)',
        architecture: 'AArch64',
        os: 'openEuler 24.03 LTS',
        content: [
          {
            name: 'symbol_7.0.0-RC1',
            size: '407.54MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler24.03/arm/openGauss-Symbol-7.0.0-RC1-openEuler24.03-aarch64.tar.gz`,
            sha_code:
              '7b6fa6a66ce98bddc05956bd15807306ee77bca01523f69007320a3e542c2faf',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_7.0.0-RC1',
            size: '24.12MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler24.03/arm/openGauss-CM-7.0.0-RC1-openEuler24.03-aarch64.tar.gz`,
            sha_code:
              'ac20e008458b355b5cbfc91ba2a0174969ef9caf484761ffd2cace233b56ba98',
            docsName: '',
            docs_url: '',
          },
        ],
      },
      {
        system: 'openEuler 24.03 LTS (x86_64)',
        architecture: 'x86_64',
        os: 'openEuler 24.03 LTS',
        content: [
          {
            name: 'symbol_7.0.0-RC1',
            size: '404.64MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler24.03/x86/openGauss-Symbol-7.0.0-RC1-openEuler24.03-x86_64.tar.gz`,
            sha_code:
              '64e616409822aaa605ae34578a4e619fa7d6a7311d2661d8440079c01053e46d',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_7.0.0-RC1',
            size: '22.22MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler24.03/x86/openGauss-CM-Symbol-7.0.0-RC1-openEuler24.03-x86_64.tar.gz`,
            sha_code:
              '23a9f26b2fd930c40efb4bcac48b602a683ba0b70f270cd13ab604fa08511312',
            docsName: '',
            docs_url: '',
          },
        ],
      },
      {
        system: 'openEuler 22.03 LTS (aarch64)',
        architecture: 'AArch64',
        os: 'openEuler 22.03 LTS',
        content: [
          {
            name: 'symbol_7.0.0-RC1',
            size: '407.54MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler22.03/arm/openGauss-Symbol-7.0.0-RC1-openEuler22.03-aarch64.tar.gz`,
            sha_code:
              '03b638b15513011caa03ca623558e6e467acb8ef7b10c02f8b16eea8f9a61817',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_7.0.0-RC1',
            size: '24.12MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler22.03/arm/openGauss-CM-7.0.0-RC1-openEuler22.03-aarch64.tar.gz`,
            sha_code:
              '2ba057d833af8ef6b87e120b96c28fe599cf6deb9cb588935f170e6a9967c28a',
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
            name: 'symbol_7.0.0-RC1',
            size: '404.64MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler22.03/x86/openGauss-Symbol-7.0.0-RC1-openEuler22.03-x86_64.tar.gz`,
            sha_code:
              '61db3e59d17de77ec70981e7e528fc7774986bfc21f30da75da29c07a3455dfb',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_7.0.0-RC1',
            size: '22.22MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler22.03/x86/openGauss-CM-Symbol-7.0.0-RC1-openEuler22.03-x86_64.tar.gz`,
            sha_code:
              '422ba527e81de618898f99a38d0185edd25dee01e7aa63de39c9972eab2b7ef5',
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
            name: 'symbol_7.0.0-RC1',
            size: '406.21MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler20.03/arm/openGauss-Symbol-7.0.0-RC1-openEuler20.03-aarch64.tar.gz`,
            sha_code:
              'fe825409b31ba2d269dc91c9efbf04a0eb5e0b58e7c7a17310f70cf9eede9ccb',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_7.0.0-RC1',
            size: '21.47MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler20.03/arm/openGauss-CM-Symbol-7.0.0-RC1-openEuler20.03-aarch64.tar.gz`,
            sha_code:
              '8bd79eb95c996a55b9c5c3432fca48db02138c925da3ca7f9119abb0648e61ce',
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
            name: 'symbol_7.0.0-RC1',
            size: '403.73MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler20.03/x86/openGauss-Symbol-7.0.0-RC1-openEuler20.03-x86_64.tar.gz`,
            sha_code:
              '36d820035169705bc5487963110b0bf82b6a75391248b8b6d3858ab306481d9e',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_7.0.0-RC1',
            size: '22.20MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/openEuler20.03/x86/openGauss-CM-Symbol-7.0.0-RC1-openEuler20.03-x86_64.tar.gz`,
            sha_code:
              '422ba527e81de618898f99a38d0185edd25dee01e7aa63de39c9972eab2b7ef5',
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
            name: 'symbol_7.0.0-RC1',
            size: '390.49MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/CentOS7/x86/openGauss-Symbol-7.0.0-RC1-CentOS7-x86_64.tar.gz`,
            sha_code:
              '98a2389103cbb88f80baaa136450f67e1aef695e9844706f679c7ed114a02dac',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'cm-symbol_7.0.0-RC1',
            size: '20.MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/CentOS7/x86/openGauss-CM-Symbol-7.0.0-RC1-CentOS7-x86_64.tar.gz`,
            sha_code:
              'e0dd76617f10a135d7f65ae3ab41f1ec149e2a478a5d6d9dd6a1c87d0b4d16d1',
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
            name: 'replicate-mysql2openGauss_7.0.0-RC1',
            size: '10.44MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/tools/replicate-mysql2openGauss-7.0.0-RC1.tar.gz`,
            sha_code:
              '2a4593af644265d01c0003367cadae5f52359fb9c57a67ded5ac7aaa588263d9',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'replicate-openGauss2mysql_7.0.0-RC1',
            size: '15.41MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/tools/replicate-openGauss2mysql-7.0.0-RC1.tar.gz`,
            sha_code:
              '92ab3c90b7e35a2c96bdb6b56deedda13daace4233f8e33064bcd1021cc09edf',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'gs_datacheck_7.0.0-RC1',
            size: '83.71MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/tools/gs_datacheck-7.0.0-RC1.tar.gz`,
            sha_code:
              'dd8c053aa784096cd6bdeaf3472181e29b67dc38d0a8c78860ab3fee3b9857f1',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Datakit_7.0.0-RC1',
            size: '858.10MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/tools/Datakit/Datakit-7.0.0-RC1.tar.gz`,
            sha_code:
              '7c972d987ca93a097a388d5ea6153debe430f6e8846b0906b575317038a1f543',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'dbmind_7.0.0-RC1',
            size: '281.28MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/dbmind/arm/dbmind-installer-aarch64.tar.gz`,
            sha_code:
              '91eadf1a47f29f153e4bcf8837a4d81929647b7eb8638f6285cebe7264ab2098',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'transcribe_replay_tool_7.0.0-RC1',
            size: '23.90MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/tools/transcribe-replay-tool-7.0.0-RC1.tar.gz`,
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
            name: 'replicate-mysql2openGauss_7.0.0-RC1',
            size: '10.44MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/tools/replicate-mysql2openGauss-7.0.0-RC1.tar.gz`,
            sha_code:
              '2a4593af644265d01c0003367cadae5f52359fb9c57a67ded5ac7aaa588263d9',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'replicate-openGauss2mysql_7.0.0-RC1',
            size: '15.41MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/tools/replicate-openGauss2mysql-7.0.0-RC1.tar.gz`,
            sha_code:
              '92ab3c90b7e35a2c96bdb6b56deedda13daace4233f8e33064bcd1021cc09edf',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'gs_datacheck_7.0.0-RC1',
            size: '83.71MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/tools/gs_datacheck-7.0.0-RC1.tar.gz`,
            sha_code:
              'dd8c053aa784096cd6bdeaf3472181e29b67dc38d0a8c78860ab3fee3b9857f1',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'Datakit_7.0.0-RC1',
            size: '858.10MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/tools/Datakit/Datakit-7.0.0-RC1.tar.gz`,
            sha_code:
              '7c972d987ca93a097a388d5ea6153debe430f6e8846b0906b575317038a1f543',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'dbmind_7.0.0-RC1',
            size: '370.47MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/dbmind/x86/dbmind-installer-x86_64.tar.gz`,
            sha_code:
              '3dc41b6ffa64f25990ad644cff6a8b3da28f4f140dfacf5df704fc4a51f55ede',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'transcribe_replay_tool_7.0.0-RC1',
            size: '23.90MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/tools/transcribe-replay-tool-7.0.0-RC1.tar.gz`,
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
            name: 'Chameleon_7.0.0-RC1',
            size: '74.52MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/tools/openEuler22.03/chameleon-7.0.0-RC1-aarch64.tar.gz`,
            sha_code:
              'bf07d4a210e2e38cd513f78c2c925692363a0c1087f9289b18dba7c0f1c481cc',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'PortalControl_7.0.0-RC1',
            size: '589.86MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/tools/openEuler22.03/PortalControl-7.0.0-RC1-aarch64.tar.gz`,
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
            name: 'Chameleon_7.0.0-RC1',
            size: '74.77MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/tools/openEuler22.03/chameleon-7.0.0-RC1-x86_64.tar.gz`,
            sha_code:
              '8a20dae7c21fea8d7d793ba4bc16376b2426a8c9c37e2b2f6f030997531d0364',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'PortalControl_7.0.0-RC1',
            size: '590.10MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/tools/openEuler22.03/PortalControl-7.0.0-RC1-x86_64.tar.gz`,
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
            name: 'Chameleon_7.0.0-RC1',
            size: '71.99MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/tools/openEuler20.03/chameleon-7.0.0-RC1-aarch64.tar.gz`,
            sha_code:
              'e5d1f91d006e35f6261bf3b5dd5bca8de233937cddd2e774bfe2224aab84e44e',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'PortalControl_7.0.0-RC1',
            size: '628.37MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/tools/openEuler20.03/PortalControl-7.0.0-RC1-aarch64.tar.gz`,
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
            name: 'Chameleon_7.0.0-RC1',
            size: '71.20MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/tools/openEuler20.03/chameleon-7.0.0-RC1-x86_64.tar.gz`,
            sha_code:
              '860b140ce85855a5c1f8ed258ffb37a26c37a05b4d8d2126b1157d316533ef15',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'PortalControl_7.0.0-RC1',
            size: '643.22MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/tools/openEuler20.03/PortalControl-7.0.0-RC1-x86_64.tar.gz`,
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
            name: 'Chameleon_7.0.0-RC1',
            size: '72.00MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/tools/centos7/chameleon-7.0.0-RC1-x86_64.tar.gz`,
            sha_code:
              'c602ef1680dbae88ed855c75a8263eb5fb3428395e7e2fe66ee76eef1c6ba020',
            docsName: '',
            docs_url: '',
          },
          {
            name: 'PortalControl_7.0.0-RC1',
            size: '621.23MB',
            down_url: `${OBS_DOWNLOAD_LINK}7.0.0-RC1/tools/centos7/PortalControl-7.0.0-RC1-x86_64.tar.gz`,
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
