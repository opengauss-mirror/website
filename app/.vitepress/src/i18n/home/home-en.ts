import feature_png1 from '@/assets/category/home/features/feature_static1.png';
import feature_png2 from '@/assets/category/home/features/feature_static2.png';
import feature_png3 from '@/assets/category/home/features/feature_static3.png';
import feature_png4 from '@/assets/category/home/features/feature_static4.png';

import feature_png1_dark from '@/assets/category/home/features/feature_static1_dark.png';
import feature_png2_dark from '@/assets/category/home/features/feature_static2_dark.png';
import feature_png3_dark from '@/assets/category/home/features/feature_static3_dark.png';
import feature_png4_dark from '@/assets/category/home/features/feature_static4_dark.png';

import feature_static1 from '@/assets/category/home/features/feature_static1.gif';
import feature_static2 from '@/assets/category/home/features/feature_static2.gif';
import feature_static3 from '@/assets/category/home/features/feature_static3.gif';
import feature_static4 from '@/assets/category/home/features/feature_static4.gif';

import feature_static1_dark from '@/assets/category/home/features/feature_static1_dark.gif';
import feature_static2_dark from '@/assets/category/home/features/feature_static2_dark.gif';
import feature_static3_dark from '@/assets/category/home/features/feature_static3_dark.gif';
import feature_static4_dark from '@/assets/category/home/features/feature_static4_dark.gif';

import user from '@/assets/category/home/community/user.svg';
import userDark from '@/assets/category/home/community/user-dark.svg';
import osv from '@/assets/category/home/community/osv.svg';
import osvDark from '@/assets/category/home/community/osv-dark.svg';
import contributer from '@/assets/category/home/community/contributors.svg';
import contributerDark from '@/assets/category/home/community/contributors-dark.svg';

export default {
  HOME_MEETING: 'Community Meeting',
  CHARACTERR_INFO: {
    TITLE:
      "openGauss is an open source relational database management system that is released with the Mulan PSL v2. with the kernel built on Huawei's years of experience in the database field and continuously provides competitive features tailored to enterprise-grade scenarios.",
    LIST: [
      {
        NAME: 'High Reliability',
        TEXT: 'RTO < 10s',
        PNG: feature_png1,
        PNG_DARK: feature_png1_dark,
        GIF: feature_static1,
        GIF_DARK: feature_static1_dark,
      },
      {
        NAME: 'High Performance',
        TEXT: '2-socket Kunpeng for 1.5 million tpmC',
        PNG: feature_png2,
        PNG_DARK: feature_png2_dark,
        GIF: feature_static2,
        GIF_DARK: feature_static2_dark,
      },
      {
        NAME: 'High Security',
        TEXT: 'Comprehensive end-to-end security protection',
        PNG: feature_png3,
        PNG_DARK: feature_png3_dark,
        GIF: feature_static3,
        GIF_DARK: feature_static3_dark,
      },
      {
        NAME: 'Easy O&M',
        TEXT: 'AI-based parameter tuning',
        PNG: feature_png4,
        PNG_DARK: feature_png4_dark,
        GIF: feature_static4,
        GIF_DARK: feature_static4_dark,
      },
    ],
    DOWN_NAME: 'Click here to download openGauss Overview Slides',
    DOWN_link:
      'https://learningvideo.obs.ap-southeast-1.myhuaweicloud.com/openGauss%20%E6%8A%80%E6%9C%AF%E6%9E%B6%E6%9E%84.pptx',
  },
  COMMUNITY_ACTIVITY: {
    TITLE: 'We Are Thriving',
    CARD: {
      TITLE: 'Thriving openGauss Community',
      CONTENT:
        'openGauss is an open source database platform that encourages community contribution and collaboration.',
      VIEW_DETAILS: 'Learn More',
      LINK: 'https://datastat.opengauss.org/en/overview',
    },
  },
  HOME_EXPLORE: {
    EXPLORE_TITLE:
      'New to openGauss? Come and start your openGauss exploration journey!',
    LIST: [
      {
        NAME: 'What is openGauss',
        PATH: '/docs/3.0.0/docs/BriefTutorial/what-is-opengauss.html',
      },
      {
        NAME: 'How do I install and deploy openGauss',
        PATH: '/docs/3.0.0/docs/BriefTutorial/installation-and-login.html',
      },
      {
        NAME: 'How do I participate in openGauss contributions',
        PATH: '/en/contribution/',
      },
    ],
  },
  USER_TITLE: 'User Practice',
  VIDEO_TITLE: 'Lastest Videos',
  ORGANIZATION_TITLE: 'Community Organizations',
  LINK_TITLE: 'Friendly Communities',
  HOME_ROUND: {
    ROUND_LIST: [
      {
        ROUND_VALUE: 0,
        ROUND_KEY: 'users',
        ROUND_IMG: user,
        ROUND_IMG_DARK: userDark,
        ROUND_TEXT: 'User',
      },
      {
        ROUND_VALUE: 0,
        ROUND_KEY: 'businessosv',
        ROUND_IMG: osv,
        ROUND_IMG_DARK: osvDark,
        ROUND_TEXT: 'Distribution & Platform',
      },
      {
        ROUND_VALUE: 0,
        ROUND_KEY: 'contributors',
        ROUND_IMG: contributer,
        ROUND_IMG_DARK: contributerDark,
        ROUND_TEXT: 'Contributor',
        ROUND_STYLE: {
          backcolor: 'blue',
        },
      },
    ],
  },
  HOME_CALENDAR: {
    LOGIN: 'Login prompt',
    LOGIN_TEXT:
      'Using openGauss meeting reservation feature requires the identity permission of SIG group Maintainer or Committer. Please allow you to login Gitee to verify user information.',
    GITEE_BEN: 'Gitee authorized login',
    LOGIN_TIPS: 'Signing in means you agree to',
    BACK_LOGIN: '返回重新预定会议',
    PRIVACY: ' the privacy terms',
    RESERVE_MEETING: 'Schedule a meeting',
    PERMISSION: 'Permission prompt',
    PERMISSION_TEXT:
      "Very sorry! You don't have permission to schedule a meeting at the moment.",
    PERMISSION_TEXT1:
      "Very sorry! You don't have permission to edit a meeting at the moment.",
    DELETE: '删除提示',
    DELETE_TEXT: '是否确定要删除当前会议？',
    SIG_GROUP: 'SIG组:',
    NEW_DATE: '最新日程：',
    EMPTY_TEXT: '当日没有活动，敬请期待',
    LEARN_MORE: '了解更多',
    CREATOR: 'Organizer:',
    REVERSE: '会议名称:',
    SIG: 'SIG name',
    PLATFORM: '平台:',
    DAY: 'Date:',
    TIME: '会议时间:',
    CONTENT: '会议内容:',
    ID: '会议ID:',
    LINK: '链接:',
    ETHERPAD: 'Etherpad:',
    PLAYBACK: '回放链接:',
    RECORD: '是否录制此会议:',
    DELETE_MEETING: 'Delete Meeting',
    MODIFY: 'Modify Meeting',
    NETERROR: '服务开小差',
    REQUIRE: '请完成所有必填项',
    FAILED: '很抱歉！因XXX会议预定失败',
    DATA_TEXT: '选择会议日期',
    STARTTIME: '选择起始时间',
    ENDTIME: '选择结束时间',
    NAME_TEXT: '请输入会议名称',
    SIG_TEXT: '选择所属SIG组',
    SUBMIT: '立即预订',
    CANCEL: '取消',
    RESET: '重置',
  },
  HOME_ROOMS: {
    ROOM_NAME: [
      { NAME: 'Events', ID: 'events' },
      { NAME: 'Blog', ID: 'blog' },
      { NAME: 'News', ID: 'news' },
    ],
    EVENT_NAME: 'Latest Activity',
    BLOG_NAME: 'openGauss Blog',
    NEWS_NAME: 'openGauss News',
  },
  MORE: 'Read More',
  EXPAND: 'Expand All',
  RETRACT: 'Collapse All',
};
