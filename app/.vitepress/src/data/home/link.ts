import openeuler from '@/assets/category/home/link/light/openeuler.png';
import openlookeng from '@/assets/category/home/link/light/openlookeng.png';
import kunpeng from '@/assets/category/home/link/light/kunpeng.png';
import songshuhui from '@/assets/category/home/link/light/songshuhui.png';
import mindspore from '@/assets/category/home/link/light/mindspore.png';

import openeuler_dark from '@/assets/category/home/link/dark/openeuler.png';
import openlookeng_dark from '@/assets/category/home/link/dark/openlookeng.png';
import kunpeng_dark from '@/assets/category/home/link/dark/kunpeng.png';
import songshuhui_dark from '@/assets/category/home/link/dark/songshuhui.png';
import mindspore_dark from '@/assets/category/home/link/dark/mindspore.png';

import {
  EULER_LINK,
  MINDSPORE_LINK,
  LOOKENG_LINK,
  KUNPENG_LINK,
  BBSCSDN_LINK,
} from '@/shared/url-config';
// TODO:一般，统一使用驼峰命名
export default [
  {
    IMG: openeuler,
    DARK: openeuler_dark,
    PATH: EULER_LINK,
    PATH_EN: `${EULER_LINK}en/`,
  },
  {
    IMG: mindspore,
    DARK: mindspore_dark,
    PATH: MINDSPORE_LINK,
    PATH_EN: `${MINDSPORE_LINK}en/`,
  },
  {
    IMG: openlookeng,
    DARK: openlookeng_dark,
    PATH: `${LOOKENG_LINK}zh/`,
    PATH_EN: `${LOOKENG_LINK}en/`,
  },
  {
    IMG: kunpeng,
    DARK: kunpeng_dark,
    PATH: KUNPENG_LINK,
    PATH_EN: `${KUNPENG_LINK}en/`,
  },
  {
    IMG: songshuhui,
    DARK: songshuhui_dark,
    PATH: `${BBSCSDN_LINK}forums/gaussdb`,
    PATH_EN: `${BBSCSDN_LINK}forums/gaussdb`,
  },
];
