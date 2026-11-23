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

declare module '#content/sig' {
  export interface SigItemT {
    sig_name: string;
    mailing_list: string;
    description: string;
    mailweb_link: string;
    archive_link: string;
  }

  const data: {
    zh: SigItemT[];
    en: SigItemT[];
  };

  export default data;
}

declare module '#content/sig/*.yaml' {
  const data: unknown;
  export default data;
}
