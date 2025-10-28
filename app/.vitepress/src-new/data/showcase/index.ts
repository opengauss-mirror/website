import financeIcon from '~icons/app-new-showcase/finance.svg';
import telecomIcon from '~icons/app-new-showcase/telecom.svg';
import internetIcon from '~icons/app-new-showcase/internet.svg';
import manufactureIcon from '~icons/app-new-showcase/manufacture.svg';
import energyIcon from '~icons/app-new-showcase/energy.svg';
import DBVIcon from '~icons/app-new-showcase/DBV.svg';
import ISVIcon from '~icons/app-new-showcase/ISV.svg';
import eduIcon from '~icons/app-new-showcase/edu.svg';
import enterpriseIcon from '~icons/app-new-showcase/enterprise.svg';
import medicineIcon from '~icons/app-new-showcase/medicine.svg';
import otherIcon from '~icons/app-new-showcase/other.svg';

import financeImg from '~@/assets/category/home/showcase/finance.png';
import telecomImg from '~@/assets/category/home/showcase/telecom.png';
import internetImg from '~@/assets/category/home/showcase/internet.png';
import manufactureImg from '~@/assets/category/home/showcase/manufacture.png';
import energyImg from '~@/assets/category/home/showcase/energy.png';
import DBVImg from '~@/assets/category/home/showcase/DBV.png';
import ISVImg from '~@/assets/category/home/showcase/ISV.png';
import eduImg from '~@/assets/category/home/showcase/edu.png';
import enterpriseImg from '~@/assets/category/home/showcase/enterprise.png';
import medicineImg from '~@/assets/category/home/showcase/medicine.png';
import otherImg from '~@/assets/category/home/showcase/other.png';

import financeImgDark from '~@/assets/category/home/showcase/dark/finance.png';
import telecomImgDark from '~@/assets/category/home/showcase/dark/telecom.png';
import internetImgDark from '~@/assets/category/home/showcase/dark/internet.png';
import manufactureImgDark from '~@/assets/category/home/showcase/dark/manufacture.png';
import energyImgDark from '~@/assets/category/home/showcase/dark/energy.png';
import DBVImgDark from '~@/assets/category/home/showcase/dark/DBV.png';
import ISVImgDark from '~@/assets/category/home/showcase/dark/ISV.png';
import eduImgDark from '~@/assets/category/home/showcase/dark/edu.png';
import enterpriseImgDark from '~@/assets/category/home/showcase/dark/enterprise.png';
import medicineImgDark from '~@/assets/category/home/showcase/dark/medicine.png';
import otherImgDark from '~@/assets/category/home/showcase/dark/other.png';

import showcaseZh from './showcase-zh';
import showcaseEn from './showcase-en';

export default {
  category: [
    {
      type: '金融',
      typeEn: 'Finance',
      id: 1,
      icon: financeIcon,
      img: financeImg,
      img_dark: financeImgDark,
    },
    {
      type: '运营商',
      typeEn: 'Carrier',
      id: 2,
      icon: telecomIcon,
      img: telecomImg,
      img_dark: telecomImgDark,
    },
    {
      type: '互联网',
      typeEn: 'Internet',
      id: 3,
      icon: internetIcon,
      img: internetImg,
      img_dark: internetImgDark,
    },
    {
      type: '制造',
      typeEn: 'Manufacture',
      id: 4,
      icon: manufactureIcon,
      img: manufactureImg,
      img_dark: manufactureImgDark,
    },
    {
      type: '能源',
      typeEn: 'Energy',
      id: 5,
      icon: energyIcon,
      img: energyImg,
      img_dark: energyImgDark,
    },
    {
      type: 'DBV',
      typeEn: 'DBV',
      id: 6,
      icon: DBVIcon,
      img: DBVImg,
      img_dark: DBVImgDark,
    },
    {
      type: 'ISV',
      typeEn: 'ISV',
      id: 7,
      icon: ISVIcon,
      img: ISVImg,
      img_dark: ISVImgDark,
    },
    {
      type: '教育',
      typeEn: 'Education',
      id: 8,
      icon: eduIcon,
      img: eduImg,
      img_dark: eduImgDark,
    },
    {
      type: '大企业',
      typeEn: 'Bigbusiness',
      id: 9,
      icon: enterpriseIcon,
      img: enterpriseImg,
      img_dark: enterpriseImgDark,
    },
    {
      type: '医疗',
      typeEn: 'Medical',
      id: 10,
      icon: medicineIcon,
      img: medicineImg,
      img_dark: medicineImgDark,
    },
    {
      type: '其他',
      typeEn: 'Others',
      id: 11,
      icon: otherIcon,
      img: otherImg,
      img_dark: otherImgDark,
    },
  ],
  constList: {
    zh: showcaseZh,
    en: showcaseEn,
  },
};
