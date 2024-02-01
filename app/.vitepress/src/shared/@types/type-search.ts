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
  keyword: string;
  page: number;
  pageSize: number;
  lang: string;
  type: string;
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

interface SearchCountItemT {
  doc_count: number;
  key: string;
}
export interface SearchCountT {
  total: SearchCountItemT[];
}
