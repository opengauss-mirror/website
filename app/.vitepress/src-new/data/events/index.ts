import apply from '~@/assets/category/events/apply.png'
import hold from '~@/assets/category/events/hold.png'
import materialPc from '~@/assets/category/events/material_pc.png'
import materialMb from '~@/assets/category/events/material_mb.png'
import applicationReview from '~@/assets/category/events/applycation-review.png'

export const applyData = {
  zh: [
    {
      img: apply,
      title: '如何申请',
      desc: '如果您有兴趣在所在城市举办 openGauss Meetup，为了保证活动顺利进行，在举办社区开发者活动前，您需要在此处申请',
      href: '/zh/interaction/event-list/meetup-form/',
      btn: '申请活动',
    },
    {
      img: applicationReview,
      title: '申办审核',
      emailtext1:
        '如果您的申请符合上述申办要求，我们会在 5 个工作日内审核并通过电子邮件',
      emailtext2:
        '与您联系，以便提供 openGauss Meetup 赋能支持并与 openGauss 社区冠名联合主办单位；即便申请不合适，我们仍会通过电子邮件通知您，请确保申办表信息无误。',
      email: 'common@public.opengauss.org',
    },
    {
      materialPc,
      materialMb,
      title: '我们可以获得哪些赋能支持？',
      desc: '审核通过后，您将获得：',
      list: [
        {
          title: '《openGauss社区介绍》',
          href: '/whitepaper/openGauss%20开源社区介绍.pdf',
        },
        {
          title: '活动物料模板',
          text: '（易拉宝/宣传海报/主KV横幅/拍照异形牌/直播背景框等源文件）',
        },
        {
          title: '宣传资源支持',
          text: '（报名小程序/官网/公众号/社群等渠道宣传）',
        },
        {
          title: 'openGauss B站直播间资源',
          text: '（如需直播）',
        },
        {
          title: '社区纪念品',
          text: '（支持100人规模以下的实际人数申请）',
        },
      ],
    },
    {
      img: hold,
      title: '活动举办',
      desc: '申办单位作为联合主办方参与筹办 Meetup，活动物料使用符合 openGauss 社区品牌规范，作为主导力量推动活动全流程，保证活动的顺利进行',
    },
    {
      title: '活动成果反馈',
      emailtext1:
        '可以更好地了解活动的情况和效果，不断提升 openGauss Meetup 活动的质量和影响力，联合主办方的组织者在活动结束后 3 个工作日内需向社区邮箱',
      emailtext2: '提供活动总结资料',
      email: 'common@public.opengauss.org',
    },
  ],
  en: [],
};
