export default {
  instruction: {
    title: '说明',
    text_1: '您可以通过',
    link_text: '微信交流群',
    link: 'https://opengauss.org/migration/faq',
    text_2:
      '获取更多帮助，此处仅列出部分供参考。如果没有相关问题，您可在微信群中反馈问题。',
  },
  chats: [
    {
      question: 'Q：如何获取DataKit使用教程或者文档？',
      answers: [
        {
          text: 'A：我们提供了DataKit工具使用文档和开发文档，方便您学习。请参见',
          isLink: false,
          link: '',
        },
        {
          text: 'DataKit产品使用手册',
          isLink: true,
          link: 'https://gitee.com/opengauss/openGauss-workbench/blob/master/openGauss-visualtool/doc/DataKit%20Product%20Manual%20-%20Platform.md',
        },
        {
          text: '，获取官方使用文档；请参见',
          isLink: false,
          link: '',
        },
        {
          text: 'DataKit开发文档',
          isLink: true,
          link: 'https://gitee.com/opengauss/openGauss-workbench/tree/master/openGauss-visualtool/doc',
        },
        {
          text: '，获取官方指导文档。',
          isLink: false,
          link: '',
        },
      ],
    },
    {
      question: 'Q：启动DataKit工具后无法访问平台前端页面，后台日志记录java相关异常报错？',
      answers: [
        {
          text: 'A：查看工具基座所使用的jdk版本，当前平台运行依赖于openJdk11，若不是该版本，请更换为该版本并重启平台服务，然后重试访问前台页面。',
          isLink: false,
          link: '',
        },
      ],
    },
    {
      question: 'Q：DataKit工具使用的数据库可以设为MySQL或者其他数据库吗？',
      answers: [
        {
          text: 'A：不可以，当前仅支持openGauss数据库。',
          isLink: false,
          link: '',
        },
      ],
    },
    {
      question: 'Q：启动DataKit工具后无法访问平台前端页面，后台日志记录显示无法与平台使用的数据库连接，如何处理？',
      answers: [
        {
          text: 'A：检查工具使用的openGauss数据库状态是否正常，若状态正常，查看部署服务器IP是否配置在平台使用的openGauss数据库的白名单列表中，是否提前创建了database和user，将数据库配置正确后重启平台服务，然后重试访问前台页面。',
          isLink: false,
          link: '',
        },
      ],
    },
    {
      question: 'Q：工具平台日志空间过大，导致无法打开，如何处理？',
      answers: [
        {
          text: 'A：可以访问平台的【日志中心】中的【系统日志】模块，点击右上角的"日志设置"按钮，设置平台日志的最大占用空间。',
          isLink: false,
          link: '',
        },
      ],
    },
    {
      question:
        'Q：DataKit在使用中突然无法访问，页面提示"error query database" ，如何处理？',
      answers: [
        {
          text: 'A：查看平台所使用的openGauss数据库状态是否正常，若不正常，请重启openGauss数据库，待数据库状态正常后，请重启平台服务，再次尝试访问平台。',
          isLink: false,
          link: '',
        },
      ],
    },
    {
      question:
        'Q：如何使用平台注册新的账号？',
      answers: [
        {
          text: 'A：平台目前无注册功能，需联系平台管理员在平台的【安全中心】里的【账号管理】模块中添加账号。',
          isLink: false,
          link: '',
        },
      ],
    },
    {
      question:
        'Q：普通用户登录平台后，发现有些功能没有，需提升功能使用范围，如何处理？',
      answers: [
        {
          text: 'A：需联系平台管理员在平台的【安全中心】的【角色与权限】模块中添加或编辑角色，勾选需要的菜单权限，然后在【账号管理】中编辑账号，选择对应的角色即可。',
          isLink: false,
          link: '',
        },
      ],
    },
    {
      question:
        'Q：使用平台安装部署openGauss数据库，同一个物理机可以多次安装吗？',
      answers: [
        {
          text: 'A：平台安装数据库默认采用环境变量分离的方式安装，若采用此方式安装，可以在同一物理机多次安装数据库，且数据库之间互不影响。但若采用环境变量不分离的方式安装，在安装过一次数据库之后再次安装，后一次安装的数据库环境变量会将前一次的覆盖，可能会导致数据库状态异常，无法启动停止数据库。',
          isLink: false,
          link: '',
        },
      ],
    },
  ],
};
