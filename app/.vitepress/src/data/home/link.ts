import openeuler from '@/assets/category/home/link/light/openeuler.png';
import openfuyao from '@/assets/category/home/link/light/openfuyao.png';
import kunpeng from '@/assets/category/home/link/light/kunpeng.png';
import songshuhui from '@/assets/category/home/link/light/songshuhui.png';
import mindspore from '@/assets/category/home/link/light/mindspore.png';

import openeuler_dark from '@/assets/category/home/link/dark/openeuler.png';
import openfuyao_dark from '@/assets/category/home/link/dark/openfuyao.png';
import kunpeng_dark from '@/assets/category/home/link/dark/kunpeng.png';
import songshuhui_dark from '@/assets/category/home/link/dark/songshuhui.png';
import mindspore_dark from '@/assets/category/home/link/dark/mindspore.png';
import openubmc from '@/assets/category/home/link/light/openubmc.png';
import openubmc_dark from '@/assets/category/home/link/dark/openubmc.png';

import { EULER_LINK, MINDSPORE_LINK, LOOKENG_LINK, KUNPENG_LINK, BBSCSDN_LINK, EULER_EN_LINK, OPENUBMC_URL, OPENFUYAO_URL } from '@/data/url-config';
export default [
  {
    img: openeuler,
    imgDark: openeuler_dark,
    path: EULER_LINK,
    pathEn: `${EULER_EN_LINK}/en/`,
  },
  {
    img: mindspore,
    imgDark: mindspore_dark,
    path: MINDSPORE_LINK,
    pathEn: `${MINDSPORE_LINK}en/`,
  },
  {
    img: openubmc,
    imgDark: openubmc_dark,
    path: OPENUBMC_URL,
    pathEn: OPENUBMC_URL,
  },
  {
    img: openfuyao,
    imgDark: openfuyao_dark,
    path: OPENFUYAO_URL,
    pathEn: LOOKENG_LINK,
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
