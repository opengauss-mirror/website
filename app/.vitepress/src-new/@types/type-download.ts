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
  data:
    | {
        zh: any[];
        en: any[];
      }
    | {
        name: string;
        thead: string[];
        zh: any[];
        en: any[];
      }[];
  releaseNotesDocs?: {
    openGauss: string;
    openGaussEn?: string;
    ograc?: string;
    ogracEn?: string;
  };
  releaseDate?: string;
  plannedEOL?: string;
  desc?: string;
  desc_en?: string;
  docs_list: DocItem[];
  initPrevious?: boolean;
  versionCapabilityPath?: string;
}
