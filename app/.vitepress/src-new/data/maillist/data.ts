import IconNum1 from '~icons/sig/icon-num-01.svg';
import IconNum2 from '~icons/sig/icon-num-02.svg';
import IconNum3 from '~icons/sig/icon-num-03.svg';
import IconNum4 from '~icons/sig/icon-num-04.svg';

import SelectSIG from '~@/assets/category/maillist/select-sig.png';
import FillInfo from '~@/assets/category/maillist/fill-info.png';
import Confirm from '~@/assets/category/maillist/confirm-subscribe.png';
import Success from '~@/assets/category/maillist/success-subscribe.png';

export const GUIDES = {
  zh: [
    {
      title: '选择订阅的SIG组',
      desc: '在邮件列表页面选择要订阅的邮件列表',
      icon: IconNum1,
      img: SelectSIG,
    },
    {
      title: '填写信息',
      desc: '在订阅邮件页面内，填写相关个人信息，点击确认订阅',
      icon: IconNum2,
      img: FillInfo,
    },
    {
      title: '确认订阅邮件',
      desc: '您的邮箱将收到一封来自邮件列表的电子邮件，要求您确认订阅了邮件列表，点击确认链接完成订阅',
      icon: IconNum3,
      img: Confirm,
    },
    {
      title: '成功订阅',
      desc: '当收到一封欢迎邮件，即成功订阅该SIG组邮件列表',
      icon: IconNum4,
      img: Success,
    },
  ],
  en: [
    {
      title: 'Select Your SIG',
      desc: 'Select the SIG you want to subscribe to and click Subscribe.',
      icon: IconNum1,
      img: SelectSIG,
    },
    {
      title: 'Enter Details',
      desc: 'On the subscription page, fill in the required personal information and click Subscribe.',
      icon: IconNum2,
      img: FillInfo,
    },
    {
      title: 'Review & Confirm',
      desc: 'Your mailbox will receive an e-mail from the mailing list, asking you to confirm your subscription. Click the confirmation link to complete the process.',
      icon: IconNum3,
      img: Confirm,
    },
    {
      title: "You're Subscribed!",
      desc: 'Your mailbox receives a welcome e-mail from the mailing list, indicating that you have subscribed to the mailing list successfully.',
      icon: IconNum4,
      img: Success,
    },
  ],
};

