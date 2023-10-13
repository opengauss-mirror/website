export interface RoundItemT {
  ROUND_IMG?: string;
  ROUND_IMG_DARK?: string;
  ROUND_KEY?: string;
  ROUND_TEXT?: string;
  ROUND_VALUE: number;
}

export interface CaseDataItemT {
  articleName: string;
  category: string;
  company: string;
  detail: boolean;
  id: string;
  industry: string;
  lang: string;
  officialpath: string;
  path: string;
  summary: string;
  textContent: string;
  title: string;
  type: string;
}

export interface CaseDataT {
  Carrier: Array<CaseDataItemT>;
  DBV: Array<CaseDataItemT>;
  Energy: Array<CaseDataItemT>;
  Finance: Array<CaseDataItemT>;
  ISV: Array<CaseDataItemT>;
  Industrial: Array<CaseDataItemT>;
  Internet: Array<CaseDataItemT>;
  Others: Array<CaseDataItemT>;
}
