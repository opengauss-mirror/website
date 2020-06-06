+++
title = "线上会议"
+++

openGauss社区使用WeLink，IRC等多种渠道开展线上会议。

openGauss社区组织可以选择不同的渠道开展线上会议，具体请查看社区各个组织会议介绍。

| 组织会议 | 组织职责范围 |
| :------- | :--------------- |
| [TC](https://gitee.com/opengauss/tc) | openGauss社区技术管理机构，提供技术指导、决策和监督。 |
| [SIG SQLEngine](https://gitee.com/opengauss/tc/tree/master/sigs/SQLEngine) | 负责openGauss社区SQL引擎的开发和维护。 |
| [SIG StorageEngine](https://gitee.com/opengauss/tc/tree/master/sigs/StorageEngine) | 负责openGauss社区存储引擎的开发和维护。 |
| [SIG Connectors](https://gitee.com/opengauss/tc/tree/master/sigs/Connectors) | 负责openGauss社区Connectors的开发和维护。 |
| [SIG Tools](https://gitee.com/opengauss/tc/tree/master/sigs/Tools) | 负责openGauss社区工具的开发和维护。 |
| [SIG Docs](https://gitee.com/opengauss/tc/tree/master/sigs/Docs) | 负责openGauss社区文档的开发和维护。 |
| [SIG Infra](https://gitee.com/opengauss/tc/tree/master/sigs/Infra) | 负责openGauss社区基础设施的开发和维护。 |

### 1. WeLink会议

WeLink会议以音视频方式开展，可以通过录制的方式保存会议记录。

### 2. IRC会议

[IRC]((https://zh.wikipedia.org/wiki/IRC))会议以纯文字方式开展，
openGauss社区IRC会议频道为[#opengauss-meeting](https://webchat.freenode.net/?randomnick=1&channels=%23opengauss-meeting&prompt=1&uio=d4)。
您可以在[IRC Channel Logs](https://meetings.opengauss.org/)找到所有的频道和会议记录。

#### 2.1 IRC会议常用命令

所有IRC会议命令使用`#`字符前缀，常用命令包括：

`#startmeeting`

开始一个会议，键入这个命令的人将成为该会议的主持人。

使用样例：`#startmeeting infra`

`#topic`

设置当前会议的讨论主题，命令后面的文字将成为议题主题，当前会议结束后，系统将在会议记录中高亮会议主题以方便查看。

使用样例：`#topic next release time`

`#endmeeting`

结束当前的会议，系统会记录会议日志，并给出相应的会议纪要地址。

使用样例：`#endmeeting`

`#action`

用于记录会议讨论后下一步需要某人采取的动作，命令后面的第一串字符表示动作的执行人，后续文字将是对动作的描述，待会议结束后，会议纪要将把该后续动作记录下来。

使用样例：`#action MrGreen 整理发布计划`

`#info`

用于在会议中高亮显示一个记录。

使用样例：`#info 在下一个版本发布前，我们还有很多工作需要做`

`#link`

用于添加一个网络连接，命令后即是该连接的地址，连接不能有空格。

使用样例：`#link [MeetBot](http://wiki.debian.org/MeetBot/)`

`#agreed`

表示与会人达成一定的结论，命令后面即是结论内容。会议结束后，系统将在会议纪要中记录该结论。

使用样例：`#agreed next release time is sunday`
