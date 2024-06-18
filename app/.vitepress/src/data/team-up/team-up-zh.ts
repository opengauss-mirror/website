import IconApply from '~icons/teamup/icon-apply.svg';
import IconAudit from '~icons/teamup/icon-audit.svg';
import IconTeam from '~icons/teamup/icon-team.svg';
import IconTeamUp from '~icons/teamup/icon-team-up.svg';

import IconOne from '~icons/teamup/icon-one.svg';
import IconTwo from '~icons/teamup/icon-two.svg';
import IconThree from '~icons/teamup/icon-three.svg';
import IconFour from '~icons/teamup/icon-four.svg';

export default {
  title: '结队计划',
  subtitle: '共享能力升级，反哺行业客户',
  desc: 'openGauss社区“结队计划”是一个开放的社区项目，鼓励社区用户积极使用openGauss数据库，社区提供完备的支撑',
  process: {
    title: '“结队”流程',
    steps: [
      {
        icon: IconApply,
        stepIcon: IconOne,
        title: '提交申请',
        list: ['1、用户使用场景', '2、用户部署规模', '…'],
      },
      {
        icon: IconAudit,
        stepIcon: IconTwo,
        title: '信息审核',
        list: [
          '1、用户提交的申请进入业务支撑资源池',
          '2、业务支撑团队审核用户申请',
        ],
      },
      {
        icon: IconTeam,
        stepIcon: IconThree,
        title: '形成“结队”',
        list: ['按照业务支撑团队答复先后顺序，和用户形成“结队”，专项支撑'],
      },
      {
        icon: IconTeamUp,
        stepIcon: IconFour,
        title: '维护“结队”',
        list: ['与用户形成结队的支撑团队，持续提供支撑解决用户的问题'],
      },
    ],
  },
  detail: {
    title: '“结队”详情',
    list: [
      {
        title: '如何申请结队',
        desc: '作为openGauss用户，使用中遇到问题，为了更快更好地解决问题，通过申请可以获得社区的支撑',
        href: '/zh/team-up/form/',
        hrefTitle: '点击申请',
      },
      {
        title: '申办审核',
        desc: '您的申请需求将进入社区支撑池中，需求确认后，社区支持团队将与您联系',
        href: '',
        hrefTitle: '',
      },
      {
        title: '用户收益',
        desc: [
          '获得社区团队支撑',
          '社区赋能，用户团队能力升级',
          '与社区连接，提升产品影响力',
        ],
        href: '',
        hrefTitle: '',
      },
    ],
  },
};
