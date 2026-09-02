import data from './data';
import { sortCommitteeMembers } from './sort';
import { ATOMGIT_LINK } from '@/data/url-config';
export default {
  oldList: [
    {
      name: `第一届理事会`,
      id: `board_one`,
      gitPath: `${ATOMGIT_LINK}/opengauss/board`,
      nameText: `第一届理事会成员：`,
      list: sortCommitteeMembers(data.zh.BOARD_ONE),
    },
    {
      name: `第二届理事会`,
      id: `board_two`,
      gitPath: `${ATOMGIT_LINK}/opengauss/board`,
      nameText: `第二届理事会成员：`,
      list: sortCommitteeMembers(data.zh.BOARD_TWO),
    },
  ],
  memberList: [
    {
      name: `顾问委员会`,
      id: `counselor`,
      list: sortCommitteeMembers(data.zh.COUNSELOR),
    },
    {
      name: `理事会`,
      id: `board`,
      gitPath: `${ATOMGIT_LINK}/opengauss/board`,
      emial: `board@opengauss.org`,
      nameText: `理事会成员：`,
      list: sortCommitteeMembers(data.zh.BOARD),
    },
    {
      name: `用户委员会`,
      id: `uc`,
      gitPath: `${ATOMGIT_LINK}/opengauss/uc`,
      emial: `uc@opengauss.org`,
      nameText: `用户委员会成员：`,
      list: sortCommitteeMembers(data.zh.UC),
    },
    {
      name: `技术委员会 (TC)`,
      id: `tc`,
      gitPath: `${ATOMGIT_LINK}/opengauss/tc`,
      emial: `tc@opengauss.org`,
      nameText: `TC成员：`,
      list: [...data.zh.TC].sort((a, b) => {
        if (a.title === 'Chair' && b.title !== 'Chair') {
          return -1;
        }
        if (b.title === 'Chair' && a.title !== 'Chair') {
          return 1;
        }
        return a.name.localeCompare(b.name, 'zh-Hans-CN');
      }),
    },
    {
      name: `品牌宣传委员会`,
      id: `bc`,
      gitPath: `${ATOMGIT_LINK}/opengauss/bc`,
      emial: `bc@opengauss.org`,
      nameText: `品牌宣传委员会成员：`,
      list: sortCommitteeMembers(data.zh.BC),
    },
    {
      name: `秘书处`,
      id: `secretariat`,
      nameText: `秘书处成员：`,
      list: data.zh.SECRETARIAT,
    },
    {
      name: `用户组（oGUG）`,
      id: `ogug`,
      children: [
        {
          name: `深圳用户组`,
          id: `ShenZhen`,
          gitPath: `${ATOMGIT_LINK}/opengauss/openGauss-User-Group/tree/master/ShenZhen`,
          emial: `usergroup@opengauss.org`,
          list: data.zh.SHENZHEN,
        },
        {
          name: `北京用户组`,
          id: `BeiJing`,
          gitPath: `${ATOMGIT_LINK}/opengauss/openGauss-User-Group/tree/master/BeiJing`,
          emial: `usergroup@opengauss.org`,
          list: data.zh.BEIJING,
        },
        {
          name: `南京用户组`,
          id: `NanJing`,
          gitPath: `${ATOMGIT_LINK}/opengauss/openGauss-User-Group/tree/master/NanJing`,
          emial: `usergroup@opengauss.org`,
          list: data.zh.NANJING,
        },
        {
          name: `西安用户组`,
          id: `XiAn`,
          gitPath: `${ATOMGIT_LINK}/opengauss/openGauss-User-Group/tree/master/XiAn`,
          emial: `usergroup@opengauss.org`,
          list: data.zh.XIAN,
        },
        {
          name: `长沙用户组`,
          id: `ChangSha`,
          gitPath: `${ATOMGIT_LINK}/opengauss/openGauss-User-Group/tree/master/ChangSha`,
          emial: `usergroup@opengauss.org`,
          list: data.zh.CHANGSHA,
        },
        {
          name: `杭州用户组`,
          id: `HangZhou`,
          gitPath: `${ATOMGIT_LINK}/opengauss/openGauss-User-Group/tree/master/HangZhou`,
          emial: `usergroup@opengauss.org`,
          list: data.zh.HANGZHOU,
        },
        {
          name: `兰州用户组 `,
          id: `LanZhou`,
          gitPath: `${ATOMGIT_LINK}/opengauss/openGauss-User-Group/tree/master/LanZhou`,
          emial: `usergroup@opengauss.org`,
          list: data.zh.LANZHOU,
        },
        {
          name: `重庆用户组`,
          id: `ChongQing`,
          gitPath: `${ATOMGIT_LINK}/opengauss/openGauss-User-Group/tree/master/ChongQing`,
          emial: `usergroup@opengauss.org`,
          list: data.zh.CHONGQING,
        },
        {
          name: `上海用户组`,
          id: `ShangHai`,
          gitPath: `${ATOMGIT_LINK}/opengauss/openGauss-User-Group/tree/master/ShangHai`,
          emial: `usergroup@opengauss.org`,
          list: data.zh.SHANGHAI,
        },
        {
          name: `成都用户组`,
          id: `ChengDu`,
          gitPath: `${ATOMGIT_LINK}/opengauss/openGauss-User-Group/tree/master/ChengDu`,
          emial: `usergroup@opengauss.org`,
          list: data.zh.CHENGDU,
        },
        {
          name: `广州用户组`,
          id: `GuangZhou`,
          gitPath: `${ATOMGIT_LINK}/opengauss/openGauss-User-Group/tree/master/GuangZhou`,
          emial: `usergroup@opengauss.org`,
          list: data.zh.GUANGZHOU,
        },
        {
          name: `贵阳用户组`,
          id: `GuiYang`,
          gitPath: `${ATOMGIT_LINK}/opengauss/openGauss-User-Group/tree/master/GuiYang`,
          emial: `usergroup@opengauss.org`,
          list: data.zh.GUIYANG,
        },
        {
          name: `合肥用户组`,
          id: `HeFei`,
          gitPath: `${ATOMGIT_LINK}/opengauss/openGauss-User-Group/tree/master/HeFei`,
          emial: `usergroup@opengauss.org`,
          list: data.zh.HEFEI,
        },
        {
          name: `武汉用户组`,
          id: `WuHan`,
          gitPath: `${ATOMGIT_LINK}/opengauss/openGauss-User-Group/tree/master/WuHan`,
          emial: `usergroup@opengauss.org`,
          list: data.zh.WUHAN,
        },
        {
          name: `沈阳用户组`,
          id: `ShenYang`,
          gitPath: `${ATOMGIT_LINK}/opengauss/openGauss-User-Group/tree/master/ShenYang`,
          emial: `usergroup@opengauss.org`,
          list: data.zh.SHENYANG,
        },
        {
          other: `你的城市还没有用户组?`,
          other1: `新的用户组等你来发起！ `,
          other2: `欢迎发送申请邮件至：`,
          email: `usergroup@opengauss.org`,
        },
      ],
    },
  ],
};
