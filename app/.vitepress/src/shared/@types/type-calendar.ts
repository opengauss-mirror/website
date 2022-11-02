export interface DayData {
  sponsor: string;
  duration_time?: string;
  join_url: string;
  start: string;
  end: string;
  url?: string;
  data?: string;
  id?: string;
  etherpad?: string;
  topic?: string;
  title?: string;
  schedules?: any;
  activity_category?: number;
  group_name?: string;
  endTime?: string;
  platform?: string;
  meeting_id?: string;
  mid?: string;
  video_url?: string;
  summary?: string;
  emaillist?: string;
  record?: boolean;
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
