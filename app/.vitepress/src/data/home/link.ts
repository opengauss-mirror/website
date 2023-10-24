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
export default [
  {
    img: openeuler,
    imgDark: openeuler_dark,
    path: EULER_LINK,
    pathEn: `${EULER_LINK}en/`,
  },
  {
    img: mindspore,
    imgDark: mindspore_dark,
    path: MINDSPORE_LINK,
    pathEn: `${MINDSPORE_LINK}en/`,
  },
  {
    img: openlookeng,
    imgDark: openlookeng_dark,
    path: `${LOOKENG_LINK}zh/`,
    pathEn: `${LOOKENG_LINK}en/`,
  },
  {
    img: kunpeng,
    imgDark: kunpeng_dark,
    path: KUNPENG_LINK,
    pathEn: `${KUNPENG_LINK}en/`,
  },
  {
    img: songshuhui,
    imgDark: songshuhui_dark,
    path: `${BBSCSDN_LINK}forums/gaussdb`,
    pathEn: `${BBSCSDN_LINK}forums/gaussdb`,
  },
];
