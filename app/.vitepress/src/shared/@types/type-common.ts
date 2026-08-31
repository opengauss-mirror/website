export interface ResponseT<T> {
  code: string;
  msg: string;
  data: T;
}
export interface ResponseSearchT<T> {
  msg: string;
  status: number;
  obj: T;
}

export interface LimitArrItemT {
  type: string;
  version: string;
}

// 关联搜索参数
export interface RelevantQueryT {
  keyword: string;
  page: number;
  pageSize: number;
  lang: string;
  type: string;
  limit: LimitArrItemT[];
  correctEnable?: boolean;
}
