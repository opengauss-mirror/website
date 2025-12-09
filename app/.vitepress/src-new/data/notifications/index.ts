import i18n from '~@/i18n';

const { t } = i18n.global;
// 系统消息类型
export const NOTIFICATION_TYPE_SYSTEM = ['publish'];

// 会议通知消息
export const NOTIFICATION_TYPE_MEETING = ['meeting'];

// 反馈进度消息
export const NOTIFICATION_TYPE_FEEDBACK = ['feedback'];

// 漏洞预警消息
export const NOTIFICATION_TYPE_LOOPHOLE = ['feedback'];


export const NOTIFICATION_TYPE_TODO = 'todo';

// 消息类型
export const NOTIFICATION_TYPE = new Map([
  // 全部消息
  // [
  //   '',
  //   {
  //     value: '',
  //     label: t('notifications.allMessage'),
  //     types: [],
  //   },
  // ],
  // 代办消息
  [
    NOTIFICATION_TYPE_TODO,
    {
      value: NOTIFICATION_TYPE_TODO,
      label: t('notifications.todoMessage'),
      types: [],
    },
  ],
  // 系统消息
  [
    'system',
    {
      value: 'system',
      label: t('notifications.systemMessage'),
      types: NOTIFICATION_TYPE_SYSTEM,
    },
  ],
  // 会议通知消息
  [
    'meeting',
    {
      value: 'meeting',
      label: t('notifications.meeting'),
      types: NOTIFICATION_TYPE_MEETING,
    },
  ],
  // // 反馈进度消息
  // [
  //   'feedback',
  //   {
  //     value: 'feedback',
  //     label: t('notifications.feedback'),
  //     types: NOTIFICATION_TYPE_FEEDBACK,
  //   },
  // ],
  // // 漏洞预警消息
  // [
  //   'loophole',
  //   {
  //     value: 'loophole',
  //     label: t('notifications.loophole'),
  //     types: NOTIFICATION_TYPE_LOOPHOLE,
  //   },
  // ],
]);

// 删除提示
export const DELETE_SUCCESS_MESSAGE = t('notifications.deleteSuccessMessage');
export const DELETE_FAILED_MESSAGE = t('notifications.deleteFailedMessage');

//批量删除提示
export const DELETE_MULTIPLE_SUCCESS_MESSAGE = t('notifications.deleteMultipleSuccessMessage');
export const DELETE_MULTIPLE_FAILED_MESSAGE = t('notifications.deleteMultipleFailedMessage');
//批量标为已读提示
export const MARK_READ_MULTIPLE_SUCCESS_MESSAGE = t('notifications.markReadMultipleSuccessMessage');
export const MARK_READ_MULTIPLE_FAILED_MESSAGE = t('notifications.markReadMultipleFailedMessage');
//标为已读提示
export const MARK_READ_SUCCESS_MESSAGE = t('notifications.markReadSuccessMessage');
export const MARK_READ_FAILED_MESSAGE = t('notifications.markReadFailedMessage');



export const INTERVAL_DAY = 0;
export const INTERVAL_WEEK = 1;
export const INTERVAL_MONTH = 2;

export const CYCLE_TYPE_OPTIONS = [
  {
    label: '天',
    value: INTERVAL_DAY,
    max: 7,
  },
  {
    label: '周',
    value: INTERVAL_WEEK,
    max: 2,
  },
  {
    label: '月',
    value: INTERVAL_MONTH,
    max: 1,
  },
];