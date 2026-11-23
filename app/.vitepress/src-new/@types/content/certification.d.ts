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

declare module '#content/certification' {
  export interface CertificationBannerT {
    title: string;
    background: string;
    illustration: string;
  }

  export interface CertificationTableHeadersT {
    pro: string;
    name: string;
    version: string;
    award: string;
    certificate: string;
  }

  export interface CertificationIntroduceT {
    text: string;
    link_text: string;
    link_href: string;
  }

  export interface CertificationItemT {
    pro: string;
    name: string;
    version: string;
    award: string;
    expiration: string;
    certificate: string;
  }

  export interface CertificationDataT {
    banner: CertificationBannerT;
    search_placeholder: string;
    table_headers: CertificationTableHeadersT;
    certify: string;
    introduce: CertificationIntroduceT;
    certifications: CertificationItemT[];
  }

  const data: {
    zh: CertificationDataT;
    en: CertificationDataT;
  };
  
  export default data;
}

declare module '#content/certification/*.yaml' {
  const data: unknown;
  export default data;
}
