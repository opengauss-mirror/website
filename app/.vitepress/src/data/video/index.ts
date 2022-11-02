import live from './live';
import publicity from './publicity';
import activity from './activity';
import race from './race';
import database from './database';
import crash from './crash';

import livePoster from '@/assets/category/video/live.png';
import publicityPoster from '@/assets/category/video/publicity.png';
import activityPoster from '@/assets/category/video/activity.png';
import racePoster from '@/assets/category/video/race.png';
import crashPoster from '@/assets/category/video/crash.png';
import databasePoster from '@/assets/category/video/database.png';

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
    name: '联合宣传系列',
    nameEn: 'Joint publicity series',
    tag: 'publicity',
    id: 2,
    data: publicity,
    poster: publicityPoster,
  },
  {
    name: '线下活动系列',
    nameEn: 'Offline activity series',
    tag: 'activity',
    id: 3,
    data: activity,
    poster: activityPoster,
  },
  {
    name: '开发者大赛系列',
    nameEn: 'Developer contest series',
    tag: 'race',
    id: 4,
    data: race,
    poster: racePoster,
  },
  {
    name: '轻松上手openGauss系列',
    nameEn: 'openGauss Crash Course',
    tag: 'crash',
    id: 5,
    data: crash,
    poster: crashPoster,
  },
  {
    name: '数据库基础系列',
    nameEn: 'Database basics',
    tag: 'database',
    id: 6,
    data: database,
    poster: databasePoster,
  },
];

export default videoData;
