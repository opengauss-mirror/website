import { LEARN_VIDEO_LINK } from '@/data/url-config';
import databasePoster from '@/assets/category/video/database.png';


export default {
  navList: [],
  zh: [
    {
      id: 'databse-base-series',
      name: '数据库基础系列',
      poster: databasePoster,
      displayCount: 999999,
      data: [
        {
          title: '工具讲解',
          videoUrl: `${LEARN_VIDEO_LINK}basicdb/7.mp4`,
          author: 'wang',
        },
        {
          title: 'openGauss性能调优',
          videoUrl: `${LEARN_VIDEO_LINK}basicdb/6.mp4`,
          author: 'wang',
        },
        {
          title: '数据库开发环境',
          videoUrl: `${LEARN_VIDEO_LINK}basicdb/5.mp4`,
          author: 'wang',
        },
        {
          title: '数据库安全基础',
          videoUrl: `${LEARN_VIDEO_LINK}basicdb/4.mp4`,
          author: 'wang',
        },
        {
          title: 'SQL语法入门、分类',
          videoUrl: `${LEARN_VIDEO_LINK}basicdb/3.mp4`,
          author: 'wang',
        },
        {
          title: '数据库基础知识',
          videoUrl: `${LEARN_VIDEO_LINK}basicdb/2.mp4`,
          author: 'wang',
        },
        {
          title: '数据库介绍',
          videoUrl: `${LEARN_VIDEO_LINK}basicdb/1.mp4`,
          author: 'wang',
        },
      ],
    },
  ],
};
