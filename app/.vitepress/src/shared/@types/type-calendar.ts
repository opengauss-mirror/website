/*
 * Copyright (c) 2026 Huawei Technologies Co., Ltd.
 * website is licensed under Mulan PSL v2.
 * You can use this software according to the terms and conditions of the Mulan PSL v2.
 * You may obtain a copy of Mulan PSL v2 at:
 *          http://license.coscl.org.cn/MulanPSL2
 * THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
 * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
 * MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
 * See the Mulan PSL v2 for more details.
 */

export interface DayDataT {
  creator: string;
  duration_time?: string;
  join_url: string;
  startTime: string;
  endTime: string;
  url?: string;
  data?: string;
  id?: string;
  topic?: string;
  etherpad?: string;
  name?: string;
  title?: string;
  schedules?: any;
  activity_category?: number;
  group_name?: string;
  platform?: string;
  meeting_id?: string;
  mid?: string;
  sponsor?: string;
  start?: string;
  end?: string;
  video_url?: string;
  agenda?: string;
  detail?: string;
  emaillist?: string;
  record?: string;
  start_date?: string;
  end_date?: string;
}

export interface MeettingTableDataT {
  date: string;
  start_date?: string;
  timeData: DayDataT[];
}

export interface SigGroupDataT {
  id: number;
  name: string;
}

export interface LoginMeetingT {
  access: string;
  code: number;
  msg: string;
}
export interface LoginGiteeT {
  client_id: string;
  redirect_url: string;
}

export interface UserGiteeInfoT {
  gitee_id: string;
  id: string;
}
export interface UserInfoT {
  sigs: string[];
  user: UserGiteeInfoT;
}

export interface UpdateMeetingInfoT {
  code: number;
  access: string;
  msg?: string;
  en_msg?: string;
}
