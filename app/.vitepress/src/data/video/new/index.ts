import live from './live';
import activity from './activity';
import database from './database';
import crash from './crash';

import livePoster from '@/assets/category/video/live.png';
import activityPoster from '@/assets/category/video/activity.png';
import crashPoster from '@/assets/category/video/crash.png';
import databasePoster from '@/assets/category/video/database.png';

// id 涉及详情页的跳转参数
const videoData = [
  {
    name: '专题直播系列',
    nameEn: 'Themed livestreaming series',
    tag: 'live',
    id: 1,
    data: live,
    poster: livePoster,
  },
  {
    name: '轻松上手openGauss系列',
    nameEn: 'openGauss Crash Course',
    tag: 'crash',
    id: 2,
    data: crash,
    poster: crashPoster,
  },
  {
    name: '数据库基础系列',
    nameEn: 'Database basics',
    tag: 'database',
    id: 3,
    data: database,
    poster: databasePoster,
  },
  {
    name: '线下活动系列',
    nameEn: 'Offline activity series',
    tag: 'activity',
    id: 4,
    data: activity,
    poster: activityPoster,
  },
];

export default videoData;
