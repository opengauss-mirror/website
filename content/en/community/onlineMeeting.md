+++
title = "Online Meeting"
+++

openGauss community uses WeLink, IRC and other channels to conduct online meeting.

openGauss community organizations can choose different channels to carry out online meeting. For details, please see the introduction of each community organization meeting.

| Organization Meeting | Scope of Organization Responsibility |
| :------- | :--------------- |
| [TC](https://gitee.com/opengauss/tc) | TC is in charge of technical guidance, decision-making, and supervision. |
| [SIG SQLEngine](https://gitee.com/opengauss/tc/tree/master/sigs/SQLEngine) | Develop and maintain the SQL engines of the openGauss community. |
| [SIG StorageEngine](https://gitee.com/opengauss/tc/tree/master/sigs/StorageEngine) | Develop and maintain the storage engine of the openGauss community. |
| [SIG Connectors](https://gitee.com/opengauss/tc/tree/master/sigs/Connectors) | Develop and maintain the connectors of the openGauss community. |
| [SIG Tools](https://gitee.com/opengauss/tc/tree/master/sigs/Tools) | Develop and maintain the tools of the openGauss community. |
| [SIG Docs](https://gitee.com/opengauss/tc/tree/master/sigs/Docs) | Develop and maintain the documents of the openGauss community. |
| [SIG Infra](https://gitee.com/opengauss/tc/tree/master/sigs/Infra) | Develop and maintain the infrastructure of the openGauss community. |
| [SIG IoT](https://gitee.com/opengauss/tc/tree/master/sigs/IoT) | Develop and maintain the IoT of the openGauss community. |
| [SIG In-place Update](https://gitee.com/opengauss/tc/tree/master/sigs/In-place-Update) | Develop and maintain the in-place update of the openGauss community.|
| [SIG AI](https://gitee.com/opengauss/tc/tree/master/sigs/AI) | Develop and maintain the AI of the openGauss community.|

### 1. WeLink Meeting

The WeLink meeting is held by audio and video, and the meeting records can be saved by recording.

### 2. IRC Meeting

[IRC]((https://zh.wikipedia.org/wiki/IRC)) meeting is held in plain text.
The IRC meeting channel of openGauss community is (https://webchat.freenode.net/?randomnick=1&channels=%23opengauss-meeting&prompt=1&uio=d4)。
You can find all of channels and meeting records from [IRC Channel Logs](https://meetings.opengauss.org/).

#### 2.1 Useful Commands of IRC Meeting

All IRC meeting commands use the `#` character as the prefix.  The useful commands include:

`#startmeeting`

Start a meeting. The calling IRC nick becomes the chair.

Example: `#startmeeting infra`

`#topic`

Set the current topic of discussion, and all of the topics will be highlighted at the end of the meeting.

Example: `#topic next release time`

`#endmeeting`

End current meeting, the meeting bot will save records and give links of the meeting records.

Example: `#endmeeting`

`#action`

Provide IRC nicks of people involved and the action items. The action items will be sorted by IRC nick at the end of the meeting.

Example: `#action MrGreen organize release plan`

`#info`

Highlight a record in a meeting.

Example: `#info We need much effort before the next release`

`#link`

Add a link record. The URL will be properly detected within the line in most cases, and the URL can't contain spaces.

Example: `#link [MeetBot](http://wiki.debian.org/MeetBot/)`

`#agreed`

It means that the participants reached a certain conclusion, and the command is followed by the conclusion. The meeting bot will record the conclusion in the meeting minutes.

Example: `#agreed next release time is sunday`