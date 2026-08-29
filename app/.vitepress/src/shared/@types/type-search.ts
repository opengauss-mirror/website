interface ConditionT {
  archives?: string;
  tags?: string;
  author?: string;
}

export interface TagsParamsT {
  lang: string;
  category: string;
  want: string;
  condition?: ConditionT;
}

interface TotalNumItemT {
  count: number;
  key: string;
}

export interface TagsDataT {
  totalNum: TotalNumItemT[];
}

export interface SearchParamsT {
  keyword: string; // 搜索关键词
  page: number; // 当前页码
  pageSize: number; // 每页数据条数
  hq?:string;
  lang: string; // 当前语言
  type: string; // 搜索分类
  correctEnable?: boolean;
  limit: {
    type: string; // 限制类型
    version: string; // 版本号
  }[]
}

interface SearchDataItemT {
  title: string;
  type: string;
  summary: string;
  textContent: string;
  author?: string[];
  [key: string]: string | string[] | undefined;
}

export interface SearchDataT {
  keyword: string;
  page: number;
  pageSize: number;
  correction?: {
    keyword: string;
    /** 纠错值 */
    corrected?: string;
  };
  records: SearchDataItemT[];
}

interface LimitItemT {
  type: string;
  version: string;
}

export interface SearchCountParamsT {
  keyword: string;
  lang: string;
  docsVersion: string;
  limit: LimitItemT[];
}

export interface SearchCountItemT {
  doc_count: number;
  key: string;
}
export interface SearchCountT {
  total: SearchCountItemT[];
}
