// 查询消息参数
export interface QueryNotificationT {
  type?: string; // 消息类型
  unread?: boolean; // 未读消息
  page_num?: number; // 页码
  count_per_page?: number; // 一页数量
}

// 消息Item
export interface NotificationItemT {
  checked: (string | number)[]; // 是否选中
  created_at: string;
  data_content_type: string;
  data_schema: string;
  event_id: string; // 消息id
  is_read: boolean; // 是否已读
  source: string;
  source_group: string;
  source_url: string;
  spec_version: '1.0';
  summary: string; // 消息数据
  time: string;
  title: string; // 消息标题
  type: string; // 消息类型
  updated_at: string;
  user: string;
}

// 消息总数
export interface NotificationCountT {
  count: number; // 消息数量
  source: string; // 消息类型
  type: string; // 消息类型
  message_type: string; // 待办还是提交
}

// 同步个人信息
export interface SyncInfoT {
  country_code: string;
  gitee_user_name: string;
  mail: string;
  phone: string;
  user_name: string;
}

// 查询会议通知消息参数
export interface QueryMeetingT {
  count_per_page?: number;
  filter?: number;
  gitee_user_name?: string;
  is_bot?: boolean;
  is_done?: boolean;
  is_read?: boolean;
  page_num?: number;
  start_time?: string;
}
