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

declare module '#content/compatibility' {
  export interface CompatibilityBannerT {
    title: string;
    background: string;
    illustration: string;
  }

  export interface CompatibilityTableHeadersT {
    name: string;
    type: string;
    company: string;
    database: string;
    certificate: string;
  }

  export interface CompatibilityTipsT {
    text: string;
    link_text: string;
    link_href: string;
  }

  export interface CompatibilityItemT {
    name: string;
    version: string | null;
    type: string;
    company: string;
    database: string;
    os: string | null;
    server: string | null;
    download: string | null;
  }

  export interface CompatibilityDataT {
    banner: CompatibilityBannerT;
    search_placeholder: string;
    type_search_placeholder: string;
    table_headers: CompatibilityTableHeadersT;
    certify: string;
    tips: CompatibilityTipsT;
    compatibilities: CompatibilityItemT[];
  }

  const data: {
    zh: CompatibilityDataT;
    en: CompatibilityDataT;
  };
  
  export default data;
}

declare module '#content/compatibility/*.yaml' {
  const data: unknown;
  export default data;
}
