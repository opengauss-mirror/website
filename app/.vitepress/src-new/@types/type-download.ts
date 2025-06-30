/**
 * 文档项接口
 */
interface DocItem {
  name: string;
  nameEn: string;
  path: string;
  pathEn?: string;
}

/**
 * 下载数据项接口
 */
export interface DownloadItem {
  name: string;
  newLayout?: boolean;
  isLogin?: boolean;
  data: any;
  releaseDate?: string;
  plannedEOL?: string;
  desc?: string;
  docs_list: DocItem[];
  initPrevious?: boolean;
  versionCapabilityPath?: string;
}
