export type PlatformT = 'WELINK' | 'ZOOM';

// 会议新增、修改
export interface MeetingPostT {
  topic: string; // 会议主题 128
  sponsor: string; // 会议发起人 20
  group_name: string; // 所属SIG 64
  platform: PlatformT; // 会议平台
  date: string; // 会议日期
  start: string; // 会议开始时间
  end: string; // 会议结束时间
  etherpad: string; // etherpad链接
  agenda: string; // 会议议程
  email_list: string; // 通知邮件列表 1020
  is_record: boolean; // 会议录制
  join_url: string; // 会议链接
}
export interface MeetingSigT {
  id?: number;
  group_name: string;
  email_list: string;
  etherpad: string;
}

// sig组列表
export interface GroupItemT {
  id?: number;
  group_name: string;
  maillist?: string;
}

// 会议详情
export interface MeetingItemT extends MeetingPostT {
  id: number;
  community: string;
  mid: string;
  time: string; // 会议时间
  m_mid: string | null;
  join_url: string; // 会议链接
  create_time: string; // 创建时间
  replay_url: string | null; // 会议回放链接
  is_delete: boolean; // 是否取消
  update_time: string | null;
  upload_status: number;
}

export interface PageParamsT {
  page: number;
  size: number;
}

export interface OptionItemT {
  label: string;
  value: string | number;
}
