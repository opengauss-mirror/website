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
  HOME_MEETING: '社区会议',
  CHARACTERR_INFO: {
    TITLE:
      'openGauss是一款开源关系型数据库管理系统，采用木兰宽松许可证v2发行。openGauss内核深度融合华为在数据库领域多年的经验，结合企业级场景需求，持续构建竞争力特性。',
    LIST: [
      {
        NAME: '高可靠',
        TEXT: '故障切换时间RTO<10s',
        PNG: feature_png1,
        PNG_DARK: feature_png1_dark,
        GIF: feature_static1,
        GIF_DARK: feature_static1_dark,
      },
      {
        NAME: '高性能',
        TEXT: '两路鲲鹏性能150万tpmC',
        PNG: feature_png3,
        PNG_DARK: feature_png3_dark,
        GIF: feature_static3,
        GIF_DARK: feature_static3_dark,
      },
      {
        NAME: '高安全',
        TEXT: '端到端全方位安全防护',
        PNG: feature_png4,
        PNG_DARK: feature_png4_dark,
        GIF: feature_static4,
        GIF_DARK: feature_static4_dark,
      },
      {
        NAME: '易运维',
        TEXT: '基于AI的智能参数调优',

        PNG: feature_png2,
        PNG_DARK: feature_png2_dark,
        GIF: feature_static2,
        GIF_DARK: feature_static2_dark,
      },
    ],
    DOWN_NAME: '下载openGauss整体概述PPT',
    DOWN_link:
      'https://learningvideo.obs.ap-southeast-1.myhuaweicloud.com/openGauss%20%E6%8A%80%E6%9C%AF%E6%9E%B6%E6%9E%84.pptx',
  },
  COMMUNITY_ACTIVITY: {
    TITLE: '社区动态',
    CARD: {
      TITLE: 'openGauss社区活力',
      CONTENT: 'openGauss也是一个开源的数据库平台，鼓励社区贡献、合作。',
      VIEW_DETAILS: '查看贡献详情',
      LINK: 'https://datastat.opengauss.org/zh/overview',
    },
  },
  HOME_EXPLORE: {
    EXPLORE_TITLE: 'openGauss新手？快来开启你的openGauss探索之旅吧！',
    LIST: [
      {
        NAME: 'openGauss是什么 ',
        PATH: '/docs/5.0.0/docs/GettingStarted/%E4%BA%86%E8%A7%A3openGauss.html',
      },
      {
        NAME: '如何安装部署openGauss ',
        PATH: '/docs/5.0.0/docs/InstallationGuide/%E5%AE%89%E8%A3%85%E6%A6%82%E8%BF%B0.html',
      },
      {
        NAME: '如何参与openGauss社区贡献',
        PATH: '/zh/contribution/',
      },
    ],
  },
  USER_TITLE: '用户实践',
  HOME_ROUND: {
    ROUND_LIST: [
      {
        ROUND_VALUE: 0,
        ROUND_KEY: 'users',
        ROUND_IMG: user,
        ROUND_IMG_DARK: userDark,
        ROUND_TEXT: '用户',
      },
      {
        ROUND_VALUE: 0,
        ROUND_KEY: 'businessosv',
        ROUND_IMG: osv,
        ROUND_IMG_DARK: osvDark,
        ROUND_TEXT: '商用版',
      },
      {
        ROUND_VALUE: 0,
        ROUND_KEY: 'contributors',
        ROUND_IMG: contributer,
        ROUND_IMG_DARK: contributerDark,
        ROUND_TEXT: '贡献者',
      },
    ],
  },
  VIDEO_TITLE: '精彩视频',
  ORGANIZATION_TITLE: '加入社区组织',
  LINK_TITLE: '友情链接',
  HOME_CALENDAR: {
    LOGIN: '登录提示',
    LOGIN_TEXT:
      '使用openGauss会议预定功能需要SIG组Maintainer或Committer身份权限，请您允许授权登录Gitee验证用户信息',
    GITEE_BEN: 'Gitee授权登录',
    LOGIN_TIPS: '登录即表示同意',
    BACK_LOGIN: '返回重新预定会议',
    PRIVACY: '隐私政策',
    RESERVE_MEETING: '预订会议',
    LOGOUT:'退出登录',
    PERMISSION: '权限提示',
    PERMISSION_TEXT: '很抱歉！您暂时没有预定会议的权限',
    PERMISSION_TEXT1: '很抱歉！您暂时没有编辑会议的权限',
    DELETE: '删除提示',
    DELETE_TEXT: '是否确定要删除当前会议？',
    SIG_GROUP: 'SIG组:',
    NEW_DATE: '最新日程：',
    EMPTY_TEXT: '当日没有会议，敬请期待',
    LEARN_MORE: '了解更多',
    CREATOR: '发起人:',
    REVERSE: '会议名称:',
    SIG: '所属SIG组',
    PLATFORM: '平台:',
    PLATFORM_TEXT: '请选择会议平台',
    DAY: '会议日期:',
    TIME: '会议时间:',
    CONTENT: '会议内容:',
    ID: '会议ID:',
    LINK: '链接:',
    ETHERPAD: 'Etherpad:',
    PLAYBACK: '回放链接:',
    RECORD: '是否录制此会议:',
    RECORD_TEXT:
      '若开启会议录制功能，会议开始后会自动开始录屏，并在会议结束后自动将录屏上传至B站openGauss账号下。录制服务由Zoom提供。',
    DELETE_MEETING: '删除会议',
    MODIFY: '编辑会议',
    NETERROR: '服务开小差',
    REQUIRE: '请完成所有必填项',
    FAILED: '很抱歉！因XXX会议预定失败',
    DATA_TEXT: '选择会议日期',
    STARTTIME: '选择起始时间',
    ENDTIME: '选择结束时间',
    NAME_TEXT: '请输入会议名称',
    SIG_TEXT: '选择所属SIG组',
    SUBMIT: '立即预订',
    MODIFY_SUBMIT: '更新会议',
    CANCEL: '取消',
    RESET: '重置',
    MODIFY_SUCCESS: '修改成功！',
    DELETE_SUCCESS: '删除成功！',
    SUCCESS: '预定会议成功！',
    EMAIL: '邮件地址',
    EMAIL_TEXT: '多个邮件地址之间用逗号,隔开',
  },
  HOME_ROOMS: {
    ROOM_NAME: [
      { NAME: '活动', ID: 'events' },
      { NAME: '博客', ID: 'blog' },
      { NAME: '新闻', ID: 'news' },
    ],
    EVENT_NAME: '最新活动',
    BLOG_NAME: 'openGauss 博客',
    NEWS_NAME: 'openGauss 新闻',
  },

  MORE: '更多',
  EXPAND: '展开全部',
  RETRACT: '收起全部',
};
