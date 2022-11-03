export interface DayData {
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

export interface TableData {
  date: string;
  start_date?: string;
  timeData: DayData[];
}

export interface SigGroupData {
  id: number;
  name: string;
}
