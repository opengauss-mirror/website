import download500 from './download5.0.0';
import download311 from './download3.1.1';
import download310 from './download3.1.0';
import download303 from './download3.0.3';
import download300 from './download3.0.0';
import download210 from './download2.1.0';
import download201 from './download2.0.1';
import download200 from './download2.0.0';
import download110 from './download1.1.0';
import download101 from './download1.0.1';
import download100 from './download1.0.0';
// 注意因为要求历史版本页面的初始版本显示要设为除最新LTS版本外的最新LTS版本
// 因为Preview版本和LTS的各自发行顺序可能有变化不能使用确定的规律逻辑，所以需用特殊参数来设置
// 例如目前最近第二个发行的LTS版本是3.0.3 (LTS)，所以就给它的数据增加一个(initPrevious:true)
// 如果之后发行了新的LTS版本在本页面添加新版本数据时记得修改(initPrevious:true)所在版本的位置
const downloadData = [
  {
    name: '5.0.0 (LTS)',
    id: 10,
    data: download500,
    plannedEOL: 'Planned EOL: 2026.03.31',
    docs_list: [
      {
        name: '发行说明',
        nameEn: 'Release Notes',
        path: '/docs/5.0.0/docs/Releasenotes/Releasenotes.html',
      },
    ],
  },
  {
    name: '3.1.1 (Preview)',
    id: 9,
    data: download311,
    plannedEOL: 'Planned EOL: End-of-Life',
    docs_list: [
      {
        name: '发行说明',
        nameEn: 'Release Notes',
        path: '/docs/3.1.1/docs/Releasenotes/Releasenotes.html',
      },
    ],
  },
  {
    name: '3.1.0 (Preview)',
    id: 8,
    data: download310,
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
    name: '3.0.3 (LTS)',
    id: 7,
    data: download303,
    initPrevious: true,
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
    id: 6,
    data: download300,
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
    id: 5,
    data: download210,
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
    id: 4,
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
    id: 3,
    data: download200,
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
    id: 2,
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
    id: 1,
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
    id: 0,
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
