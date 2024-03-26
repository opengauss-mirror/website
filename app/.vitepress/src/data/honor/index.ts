import oscarImg from '@/assets/category/honor/2020/oscar.jpg';
import giteeImg from '@/assets/category/honor/2020/gitee.jpg';
import kaiyuanyunImg from '@/assets/category/honor/2020/kaiyuanyun.jpg';
import kexinyunImg from '@/assets/category/honor/2021/kexinyun.jpg';

import csdnImg from '@/assets/category/honor/2022/csdn.jpg';
import it168Img from '@/assets/category/honor/2022/it168.jpg';

export default {
  title: '社区荣誉',
  readNews: '查看新闻',
  viewCertificate: '查看证书',
  honorList: [
    {
      id: '2020',
      data: [
        {
          name: 'OSCAR尖峰开源项目及社区奖',
          href: '',
          img: oscarImg,
        },
        {
          name: '优秀Gitee组织',
          href: '',
          img: giteeImg,
        },
        {
          name: '中国优秀开源项目',
          href: '',
          img: kaiyuanyunImg,
        },
      ],
    },
    {
      id: '2021',
      data: [
        {
          name: '首批通过《 可信开源社区评估体系 》认证',
          href: '',
          img: kexinyunImg,
        },
        {
          name: '科创中国开源创新榜单',
          href: '/zh/news/2022-03-01/20220301.html',
          img: '',
        },
        {
          name: '2021年软件行业典型示范案例',
          href: '/zh/news/2022-05-11/20220511.html',
          img: '',
        },
      ],
    },
    {
      id: '2022',
      data: [
        {
          name: '年度开源项目',
          href: '',
          img: csdnImg,
        },
        {
          name: '首批通过可信开源社区分级评估',
          href: '/zh/news/2022-05-23/20220523.html',
          img: '',
        },
        {
          name: '第十届中国电子信息博览会金奖',
          href: '/zh/news/2022-08-16/20220816.html',
          img: '',
        },
        {
          name: '中国首个国际CC EAL4+级别认证',
          href: '/zh/news/2022-10-26/index.html',
          img: '',
        },
        {
          name: 'CCF科技进步特等奖',
          href: '/zh/news/2023-02-21/index.html',
          img: '',
        },
        {
          name: '年度创新产品奖',
          href: '',
          img: it168Img,
        },
        {
          name: '2022年“科创中国”开源创新榜',
          href: '/zh/news/2023-02-22/index.html',
          img: '',
        },
        {
          name: '全国计算机等级二级考试新科目',
          href: '/zh/news/2023-02-25/index.html',
          img: '',
        },
        {
          name: '2022年软件行业突破性技术成果',
          href: '/zh/news/2023-04-19/index.html',
          img: '',
        },
      ],
    },
    {
      id: '2023',
      data: [
        {
          name: '加入 CNCF Landscape',
          href: '/zh/news/2023-03-07/index.html',
          img: '',
        },
        {
          name: '2023年度技术卓越奖',
          href: '/zh/news/2024-01-11/index.html',
          img: '',
        },
        {
          name: '金融科技产业联盟2023年十佳课题',
          href: '/zh/news/2024-02-01/index.html',
          img: '',
        },
      ],
    },
  ],
};
