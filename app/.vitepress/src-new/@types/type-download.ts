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
  isEol?: boolean;
  desc?: string;
  desc_en?: string;
  docs_list: DocItem[];
  initPrevious?: boolean;
  versionCapabilityPath?: string;
}
