import data from './data';
import { ATOMGIT_LINK } from '@/data/url-config';
export default {
  oldList: [
    {
      name: `First Board of Directors`,
      id: `board_one`,
      gitPath: `${ATOMGIT_LINK}/opengauss/board`,
      nameText: `First Board of Directors`,
      list: data.en.BOARD_ONE,
    },
    {
      name: `Second Board of Directors`,
      id: `board_two`,
      gitPath: `${ATOMGIT_LINK}/opengauss/board`,
      nameText: `Second Board of Directors`,
      list: data.en.BOARD_TWO,
    },
  ],
  memberList: [
    {
      name: `Advisory Committee`,
      id: `counselor`,
      list: data.en.COUNSELOR,
    },
    {
      name: `Board`,
      id: `board`,
      gitPath: `${ATOMGIT_LINK}/opengauss/board`,
      emial: `board@opengauss.org`,
      nameText: `Board of Directors`,
      list: data.en.BOARD,
    },
    {
      name: `User Committee`,
      id: `uc`,
      gitPath: `${ATOMGIT_LINK}/opengauss/uc`,
      emial: `uc@opengauss.org`,
      nameText: `UC Members`,
      list: data.en.UC,
    },
    {
      name: `Technical Committee (TC)`,
      id: `tc`,
      gitPath: `${ATOMGIT_LINK}/opengauss/tc`,
      emial: `tc@opengauss.org`,
      nameText: `TC Members`,
      list: [...data.en.TC].sort((a, b) => {
        if (a.title === 'Chair') {
          return -1;
        }
        if (b.title === 'Chair') {
          return 1;
        }
        return a.name.localeCompare(b.name, 'en');
      }),
    },
    {
      name: `Brand Committee`,
      id: `bc`,
      gitPath: `${ATOMGIT_LINK}/opengauss/bc`,
      emial: `bc@opengauss.org`,
      nameText: `BC Members`,
      list: data.en.BC,
    },
    {
      name: `Secretariat`,
      id: `secretariat`,
      nameText: `Secretariat Members`,
      list: data.en.SECRETARIAT,
    },
    {
      name: `User Group (oGUG)`,
      id: `ogug`,
      children: [
        {
          name: `ShenZhen User Group`,
          id: `ShenZhen`,
          gitPath: `${ATOMGIT_LINK}/opengauss/openGauss-User-Group/tree/master/ShenZhen`,
          emial: `usergroup@opengauss.org`,
          list: data.en.SHENZHEN,
        },
        {
          name: `BeiJing User Group`,
          id: `BeiJing`,
          gitPath: `${ATOMGIT_LINK}/opengauss/openGauss-User-Group/tree/master/BeiJing`,
          emial: `usergroup@opengauss.org`,
          list: data.en.BEIJING,
        },
        {
          name: `NanJing User Group`,
          id: `NanJing`,
          gitPath: `${ATOMGIT_LINK}/opengauss/openGauss-User-Group/tree/master/NanJing`,
          emial: `usergroup@opengauss.org`,
          list: data.en.NANJING,
        },
        {
          name: `XiAn User Group`,
          id: `XiAn`,
          gitPath: `${ATOMGIT_LINK}/opengauss/openGauss-User-Group/tree/master/XiAn`,
          emial: `usergroup@opengauss.org`,
          list: data.en.XIAN,
        },
        {
          name: `ChangSha User Group`,
          id: `ChangSha`,
          gitPath: `${ATOMGIT_LINK}/opengauss/openGauss-User-Group/tree/master/ChangSha`,
          emial: `usergroup@opengauss.org`,
          list: data.en.CHANGSHA,
        },
        {
          name: `HangZhou User Group`,
          id: `HangZhou`,
          gitPath: `${ATOMGIT_LINK}/opengauss/openGauss-User-Group/tree/master/HangZhou`,
          emial: `usergroup@opengauss.org`,
          list: data.en.HANGZHOU,
        },
        {
          name: `LanZhou User Group `,
          id: `LanZhou`,
          gitPath: `${ATOMGIT_LINK}/opengauss/openGauss-User-Group/tree/master/LanZhou`,
          emial: `usergroup@opengauss.org`,
          list: data.en.LANZHOU,
        },
        {
          name: `ChongQing User Group`,
          id: `ChongQing`,
          gitPath: `${ATOMGIT_LINK}/opengauss/openGauss-User-Group/tree/master/ChongQing`,
          emial: `usergroup@opengauss.org`,
          list: data.en.CHONGQING,
        },
        {
          name: `ShangHai User Group`,
          id: `ShangHai`,
          gitPath: `${ATOMGIT_LINK}/opengauss/openGauss-User-Group/tree/master/ShangHai`,
          emial: `usergroup@opengauss.org`,
          list: data.en.SHANGHAI,
        },
        {
          name: `ChengDu User Group`,
          id: `ChengDu`,
          gitPath: `${ATOMGIT_LINK}/opengauss/openGauss-User-Group/tree/master/ChengDu`,
          emial: `usergroup@opengauss.org`,
          list: data.en.CHENGDU,
        },
        {
          name: `GuangZhou User Group`,
          id: `GuangZhou`,
          gitPath: `${ATOMGIT_LINK}/opengauss/openGauss-User-Group/tree/master/GuangZhou`,
          emial: `usergroup@opengauss.org`,
          list: data.en.GUANGZHOU,
        },
        {
          name: `GuiYang User Group`,
          id: `GuiYang`,
          gitPath: `${ATOMGIT_LINK}/opengauss/openGauss-User-Group/tree/master/GuiYang`,
          emial: `usergroup@opengauss.org`,
          list: data.en.GUIYANG,
        },
        {
          name: `HeiFei User Group`,
          id: `HeFei`,
          gitPath: `${ATOMGIT_LINK}/opengauss/openGauss-User-Group/tree/master/HeFei`,
          emial: `usergroup@opengauss.org`,
          list: data.en.HEFEI,
        },
        {
          name: `WuHan User Group`,
          id: `WuHan`,
          gitPath: `${ATOMGIT_LINK}/opengauss/openGauss-User-Group/tree/master/WuHan`,
          emial: `usergroup@opengauss.org`,
          list: data.en.WUHAN,
        },
        {
          name: `ShenYang User Group`,
          id: `ShenYang`,
          gitPath: `${ATOMGIT_LINK}/opengauss/openGauss-User-Group/tree/master/ShenYang`,
          emial: `usergroup@opengauss.org`,
          list: data.en.SHENYANG,
        },
        {
          other: `Want to start a new openGauss User Group?`,
          other1: ` `,
          other2: `Please send your application to: `,
          email: `usergroup@opengauss.org`,
        },
      ],
    },
  ],
};
