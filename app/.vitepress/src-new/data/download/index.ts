import { DownloadItem } from '~@/@types/type-download';
import { GITCODE_LINK } from '~@/data/url-config';
import download700RC1 from './download7.0.0-RC1';
import download601 from './download6.0.1';
import download600 from './download6.0.0';
import download600RC1 from './download6.0.0-RC1';
import download503 from './download5.0.3';
import download502 from './download5.0.2';
import download501 from './download5.0.1';
import download510 from './download5.1.0';
import download500 from './download5.0.0';
import download311 from './download3.1.1';
import download310 from './download3.1.0';
import download306 from './download3.0.6';
import download305 from './download3.0.5';
import download303 from './download3.0.3';
import download300 from './download3.0.0';
import download210 from './download2.1.0';
import download201 from './download2.0.1';
import download200 from './download2.0.0';
import download110 from './download1.1.0';
import download101 from './download1.0.1';
import download100 from './download1.0.0';
// initPrevious参数表示控制进入历史版本页面后默认选中的版本
// 因为目前的主力版本是3.0.6 (LTS)，所以就给它的数据增加一个(initPrevious:true)
// 如果之后要修改历史版本页面的默认选中版本，可以修改(initPrevious:true)所在版本的位置
// newLayout:true 代表使用新版下载页面结构布局，无此参数代表使用旧版
// isLogin:true 代表该版本需要登录才能下载，无此参数代表不需要登录
const downloadData: DownloadItem[] = [
  {
    name: '7.0.0-RC1',
    newLayout: true,
    isLogin: true,
    data: download700RC1,
    releaseDate: '2025.03.30',
    plannedEOL: '2025.09.30',
    desc: '社区创新版本联创测试使用，发布间隔周期定为6个月，社区提供6个月维护支持。',
    versionCapabilityPath: `${GITCODE_LINK}opengauss/docs/blob/7.0.0-RC1/content/zh/docs/VersionCapability/index.md`,
    docs_list: [
      {
        name: '发行说明',
        nameEn: 'Release Notes',
        path: '/zh/news/2025-03-31/',
        pathEn: '/zh/news/2025-03-31/',
      },
    ],
  },
  {
    name: '6.0.1 (LTS)',
    newLayout: true,
    isLogin: true,
    data: download601,
    plannedEOL: '2027.09.30',
    desc: 'openGauss 6.0.1 LTS 及后续LTS版本社区提供3年维护支持，社区OGSP伙伴提供3年以后维护支持服务。',
    versionCapabilityPath: `${GITCODE_LINK}opengauss/docs/blob/6.0.0/content/zh/docs/VersionCapability/index.md`,
    docs_list: [
      {
        name: '发行说明',
        nameEn: 'Release Notes',
        path: '/zh/news/2025-02-05-601/index.html',
        pathEn: '/zh/news/2025-02-05-601/index.html',
      },
    ],
  },
  {
    name: '6.0.0 (LTS)',
    newLayout: true,
    isLogin: true,
    data: download600,
    releaseDate: '2024.09.30',
    plannedEOL: '2027.09.30',
    desc: '规模上线使用，发布间隔周期为2年，社区提供3年维护支持，OGSP伙伴提供3年以上延长维护支持服务。',
    versionCapabilityPath: `${GITCODE_LINK}opengauss/docs/blob/6.0.0/content/zh/docs/VersionCapability/index.md`,
    docs_list: [
      {
        name: '发行说明',
        nameEn: 'Release Notes',
        path: '/docs/6.0.0/docs/ReleaseNotes/Releasenotes.html',
        pathEn: '/docs/6.0.0/docs/ReleaseNotes/Releasenotes.html',
      },
    ],
  },
  {
    name: '5.0.3 (LTS)',
    newLayout: true,
    data: download503,
    plannedEOL: '2026.03.31',
    versionCapabilityPath: `${GITCODE_LINK}opengauss/docs/blob/5.0.0/content/zh/docs/VersionCapability/index.md`,
    docs_list: [
      {
        name: '发行说明',
        nameEn: 'Release Notes',
        path: '/zh/news/2024-08-15/index.html',
        pathEn: '/zh/news/2024-08-15/index.html',
      },
    ],
  },
  {
    name: '6.0.0-RC1',
    newLayout: true,
    data: download600RC1,
    releaseDate: '2024.03.30',
    plannedEOL: '2024.09.30',
    versionCapabilityPath: `${GITCODE_LINK}opengauss/docs/blob/6.0.0/content/zh/docs/VersionCapability/index.md`,
    docs_list: [
      {
        name: '发行说明',
        nameEn: 'Release Notes',
        path: '/docs/6.0.0-RC1/docs/ReleaseNotes/Releasenotes.html',
        pathEn: '/docs/6.0.0-RC1/docs/ReleaseNotes/Releasenotes.html',
      },
    ],
  },
  {
    name: '5.0.2 (LTS)',
    newLayout: true,
    data: download502,
    plannedEOL: '2026.03.31',
    versionCapabilityPath: `${GITCODE_LINK}opengauss/docs/blob/5.0.0/content/zh/docs/VersionCapability/index.md`,
    docs_list: [
      {
        name: '发行说明',
        nameEn: 'Release Notes',
        path: '/zh/news/2024-05-15/index.html',
        pathEn: '/zh/news/2024-05-15/index.html',
      },
    ],
  },
  {
    name: '5.0.1 (LTS)',
    newLayout: true,
    data: download501,
    plannedEOL: '2026.03.31',
    versionCapabilityPath: `${GITCODE_LINK}opengauss/docs/blob/5.0.0/content/zh/docs/VersionCapability/index.md`,
    docs_list: [
      {
        name: '发行说明',
        nameEn: 'Release Notes',
        path: '/zh/news/2023-12-20/index.html',
        pathEn: '/zh/news/2023-12-20/index.html',
      },
    ],
  },
  {
    name: '5.1.0 (Preview)',
    newLayout: true,
    data: download510,
    releaseDate: '2023.06.30',
    plannedEOL: '2024.03.31',
    versionCapabilityPath: `${GITCODE_LINK}opengauss/docs/blob/5.0.0/content/zh/docs/VersionCapability/index.md`,
    docs_list: [
      {
        name: '发行说明',
        nameEn: 'Release Notes',
        path: '/docs/5.1.0/docs/ReleaseNotes/Releasenotes.html',
        pathEn: '/docs/5.1.0/docs/Releasenotes/Releasenotes.html',
      },
    ],
  },
  {
    name: '5.0.0 (LTS)',
    newLayout: true,
    data: download500,
    releaseDate: '2023.03.30',
    plannedEOL: '2026.03.31',
    versionCapabilityPath: `${GITCODE_LINK}opengauss/docs/blob/5.0.0/content/zh/docs/VersionCapability/index.md`,
    docs_list: [
      {
        name: '发行说明',
        nameEn: 'Release Notes',
        path: '/docs/5.0.0/docs/ReleaseNotes/Releasenotes.html',
        pathEn: '/docs/5.0.0/docs/Releasenotes/Releasenotes.html',
      },
    ],
  },
  {
    name: '3.1.1 (Preview)',
    newLayout: true,
    data: download311,
    plannedEOL: 'End-of-Life',
    docs_list: [
      {
        name: '发行说明',
        nameEn: 'Release Notes',
        path: '/docs/3.1.1/docs/Releasenotes/Releasenotes.html',
        pathEn: '/docs/3.1.1/docs/Releasenotes/Releasenotes.html',
      },
    ],
  },
  {
    name: '3.1.0 (Preview)',
    data: download310,
    releaseDate: '2022.09.30',
    plannedEOL: '2023.03.30',
    docs_list: [
      {
        name: '发行说明',
        nameEn: 'Release Notes',
        path: '/docs/3.1.0/docs/Releasenotes/Releasenotes.html',
      },
      {
        name: '企业版安装指南',
        nameEn: 'Enterprise-Edition Installation Guide',
        path: '/docs/3.1.0/docs/installation/%E4%BC%81%E4%B8%9A%E7%89%88%E5%AE%89%E8%A3%85.html',
      },
      {
        name: '极简版安装指南',
        nameEn: 'Simplified Installation Guide',
        path: '/docs/3.1.0/docs/installation/%E6%9E%81%E7%AE%80%E7%89%88%E5%AE%89%E8%A3%85.html',
      },
      {
        name: '轻量版安装指南',
        nameEn: 'Lite Installation Guide',
        path: '/docs/3.1.0-lite/docs/installation/%E5%AE%89%E8%A3%85%E6%A6%82%E8%BF%B0.html',
      },
    ],
  },
  {
    name: '3.0.6 (LTS)',
    data: download306,
    initPrevious: true,
    docs_list: [
      {
        name: '发行说明',
        nameEn: 'Release Notes',
        path: '/zh/news/2024-12-25-306/index.html',
      },
      {
        name: '企业版安装指南',
        nameEn: 'Enterprise-Edition Installation Guide',
        path: '/docs/3.0.0/docs/installation/%E4%BC%81%E4%B8%9A%E7%89%88%E5%AE%89%E8%A3%85.html',
      },
      {
        name: '极简版安装指南',
        nameEn: 'Simplified Installation Guide',
        path: '/docs/3.0.0/docs/installation/%E6%9E%81%E7%AE%80%E7%89%88%E5%AE%89%E8%A3%85.html',
      },
      {
        name: '轻量版安装指南',
        nameEn: 'Lite Installation Guide',
        path: '/docs/3.0.0-lite/docs/installation/%E5%AE%89%E8%A3%85%E6%A6%82%E8%BF%B0.html',
      },
    ],
  },
  {
    name: '3.0.5 (LTS)',
    data: download305,
    docs_list: [
      {
        name: '发行说明',
        nameEn: 'Release Notes',
        path: '/zh/news/2024-01-19/index.html',
      },
      {
        name: '企业版安装指南',
        nameEn: 'Enterprise-Edition Installation Guide',
        path: '/docs/3.0.0/docs/installation/%E4%BC%81%E4%B8%9A%E7%89%88%E5%AE%89%E8%A3%85.html',
      },
      {
        name: '极简版安装指南',
        nameEn: 'Simplified Installation Guide',
        path: '/docs/3.0.0/docs/installation/%E6%9E%81%E7%AE%80%E7%89%88%E5%AE%89%E8%A3%85.html',
      },
      {
        name: '轻量版安装指南',
        nameEn: 'Lite Installation Guide',
        path: '/docs/3.0.0-lite/docs/installation/%E5%AE%89%E8%A3%85%E6%A6%82%E8%BF%B0.html',
      },
    ],
  },
  {
    name: '3.0.3 (LTS)',
    data: download303,
    docs_list: [
      {
        name: '发行说明',
        nameEn: 'Release Notes',
        path: '/docs/3.0.0/docs/Releasenotes/Releasenotes.html',
      },
      {
        name: '企业版安装指南',
        nameEn: 'Enterprise-Edition Installation Guide',
        path: '/docs/3.0.0/docs/installation/%E4%BC%81%E4%B8%9A%E7%89%88%E5%AE%89%E8%A3%85.html',
      },
      {
        name: '极简版安装指南',
        nameEn: 'Simplified Installation Guide',
        path: '/docs/3.0.0/docs/installation/%E6%9E%81%E7%AE%80%E7%89%88%E5%AE%89%E8%A3%85.html',
      },
      {
        name: '轻量版安装指南',
        nameEn: 'Lite Installation Guide',
        path: '/docs/3.0.0-lite/docs/installation/%E5%AE%89%E8%A3%85%E6%A6%82%E8%BF%B0.html',
      },
    ],
  },
  {
    name: '3.0.0 (LTS)',
    data: download300,
    releaseDate: '2022.03.30',
    plannedEOL: '2025.03.30',
    docs_list: [
      {
        name: '发行说明',
        nameEn: 'Release Notes',
        path: '/docs/3.0.0/docs/Releasenotes/Releasenotes.html',
      },
      {
        name: '企业版安装指南',
        nameEn: 'Enterprise-Edition Installation Guide',
        path: '/docs/3.0.0/docs/installation/%E4%BC%81%E4%B8%9A%E7%89%88%E5%AE%89%E8%A3%85.html',
      },
      {
        name: '极简版安装指南',
        nameEn: 'Simplified Installation Guide',
        path: '/docs/2.1.0/docs/installation/%E6%9E%81%E7%AE%80%E7%89%88%E5%AE%89%E8%A3%85.html',
      },
      {
        name: '轻量版安装指南',
        nameEn: 'Lite Installation Guide',
        path: '/docs/3.0.0-lite/docs/installation/%E5%AE%89%E8%A3%85%E6%A6%82%E8%BF%B0.html',
      },
    ],
  },
  {
    name: '2.1.0 (Preview)',
    data: download210,
    releaseDate: '2021.06.30',
    plannedEOL: '2022.03.30',
    docs_list: [
      {
        name: '发行说明',
        nameEn: 'Release Notes',
        path: '/docs/2.1.0/docs/Releasenotes/Releasenotes.html',
      },
      {
        name: '企业版安装指南',
        nameEn: 'Enterprise-Edition Installation Guide',
        path: '/docs/2.1.0/docs/installation/%E4%BC%81%E4%B8%9A%E7%89%88%E5%AE%89%E8%A3%85.html',
      },
      {
        name: '极简版安装指南',
        nameEn: 'Simplified Installation Guide',
        path: '/docs/2.1.0/docs/installation/%E6%9E%81%E7%AE%80%E7%89%88%E5%AE%89%E8%A3%85.html',
      },
    ],
  },
  {
    name: '2.0.1 (LTS)',
    data: download201,
    docs_list: [
      {
        name: '发行说明',
        nameEn: 'Release Notes',
        path: '/docs/2.0.1/docs/Releasenotes/Releasenotes.html',
      },
      {
        name: '企业版安装指南',
        nameEn: 'Enterprise-Edition Installation Guide',
        path: '/docs/2.0.1/docs/installation/%E4%BC%81%E4%B8%9A%E7%89%88%E5%AE%89%E8%A3%85.html',
      },
      {
        name: '极简版安装指南',
        nameEn: 'Simplified Installation Guide',
        path: '/docs/2.0.1/docs/installation/%E6%9E%81%E7%AE%80%E7%89%88%E5%AE%89%E8%A3%85.html',
      },
    ],
  },
  {
    name: '2.0.0 (LTS)',
    data: download200,
    releaseDate: '2021.03.30',
    plannedEOL: '2024.03.30',
    docs_list: [
      {
        name: '发行说明',
        nameEn: 'Release Notes',
        path: '/docs/2.0.0/docs/Releasenotes/Releasenotes.html',
      },
      {
        name: '企业版安装指南',
        nameEn: 'Enterprise-Edition Installation Guide',
        path: '/docs/2.0.0/docs/installation/%E4%BC%81%E4%B8%9A%E7%89%88%E5%AE%89%E8%A3%85.html',
      },
      {
        name: '极简版安装指南',
        nameEn: 'Simplified Installation Guide',
        path: '/docs/2.0.0/docs/installation/%E6%9E%81%E7%AE%80%E7%89%88%E5%AE%89%E8%A3%85.html',
      },
    ],
  },
  {
    name: '1.1.0 (Preview)',
    data: download110,
    docs_list: [
      {
        name: '发行说明',
        nameEn: 'Release Notes',
        path: '/docs/1.1.0/docs/Releasenotes/Releasenotes.html',
      },
      {
        name: '安装指南',
        nameEn: 'Installation Guide',
        path: '/docs/1.1.0/docs/installation/installation.html',
      },
    ],
  },
  {
    name: '1.0.1 (LTS)',
    data: download101,
    docs_list: [
      {
        name: '发行说明',
        nameEn: 'Release Notes',
        path: '/docs/1.0.1/docs/Releasenotes/Releasenotes.html',
      },
      {
        name: '安装指南',
        nameEn: 'Installation Guide',
        path: '/docs/1.0.1/docs/installation/installation.html',
      },
    ],
  },
  {
    name: '1.0.0 (LTS)',
    data: download100,
    docs_list: [
      {
        name: '发行说明',
        nameEn: 'Release Notes',
        path: '/docs/1.0.0/docs/Releasenotes/Releasenotes.html',
      },
      {
        name: '安装指南',
        nameEn: 'Installation Guide',
        path: '/docs/1.0.0/docs/installation/installation.html',
      },
    ],
  },
];

export default downloadData;
