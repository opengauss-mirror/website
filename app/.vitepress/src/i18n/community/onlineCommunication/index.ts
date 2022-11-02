import ImgMail from '@/assets/category/community/mailimg.png';
import MailingList from '@/data/mailing-list';

export default {
  zh: {
    title: '线上交流',
    text: 'openGauss社区使用邮件列表进行线上沟通交流。我们真诚地邀请您通过邮件列表参与讨论。',
    caption: '1. 邮件列表',
    caption1: '1.1 如何订阅邮件列表？',
    caption_List: {
      title: '如果您以前从未订阅过邮件列表，请参照下面的操作步骤。',
      list: [
        '点击您想要订阅的邮件列表的名称。',
        '浏览器将跳转到该邮件列表的订阅页面，那里将提供有关如何订阅的说明。',
        '阅读订阅说明，您需要提供一个您希望用来订阅邮件列表的电子邮件地址。',
        '输入您的电子邮件地址并点击订阅，您将收到一封电子邮件，要求您确认订阅。',
        '回复您收到的电子邮件以确认您的订阅。',
        '最后您将收到来自一封来自邮件列表的欢迎邮件。',
      ],
    },
    tips: '注：建议您在订阅前把邮箱的‘答复邮件上的邮件头使用英语’的相关设置打开：1）打开邮箱的选项界面。2）点击【高级】——并找到【国际选项】——勾选‘答复或转发邮件上的邮件头和转发通知使用英语’。',
    caption2: '1.2 如何发送邮件到邮件列表？',
    caption2_text:
      '要将邮件发送到指定的邮件列表，请向上表中列出的邮件地址发送您的电子邮件。这样所有在这个邮件列表中的社区成员都能收到您的电子邮件。',
    caption3: '1.3 如何查看以前的邮件列表？',
    caption3_text:
      '要查看邮件列表中以前发布的电子邮件，请点击上表中邮件列表的Archive链接访问存档地址。',
    thead: ['列表名称', '订阅邮件列表 ', '描述', '归档路径'],
    mail_list: MailingList.zh,
    mailimg: ImgMail,
  },
  en: {
    title: 'Communication',
    text: 'openGauss community uses Mailing List for communication. We sincerely invite you to join the openGauss Mailing List for discussion.',
    caption: '1. Mailing List',
    caption1: '1.1 How Do I Subscribe to the Mailing List?',
    caption_List: {
      title: 'If you have never subscribed to the mailing list, do as follows:',
      list: [
        'Click the name of the mailing list that you want to subscribe to.',
        'Wait until the browser goes to the subscription page of the mailing list, which provides instructions on how to subscribe.',
        'Read the subscription instructions and provide an email address that you want to use to subscribe to the mailing list.',
        'Enter your email address and click Subscribe. You will receive an email asking you to confirm the subscription.',
        'Reply the email to confirm your subscription.',
        'At last, you will receive a welcome email from the mailing list.',
      ],
    },
    tips: '',
    caption2: '1.2 How Do I Send an Email to the Mailing List?',
    caption2_text:
      'To send an email to a specified mailing list, send your email to the address listed on the mailing list. Subscribers in this mailing list will receive your email. Subscribers in this mailing list will receive your email.',
    caption3: '1.3 How Can I View the Previous Mailing List?',
    caption3_text:
      'To view previous emails, visit the archive addresses as shown in the table above.',
    thead: ['Name', 'Email Address', 'Description', 'Archives'],
    mail_list: MailingList.en,
  },
};
