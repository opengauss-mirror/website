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

declare module '#content/tools' {
  export interface SupportToolItemT {
    iden: string;
    name: string;
    desc: string;
    address: string;
    guide?: string;
    site?: boolean;
  }

  export interface SupportToolCategoryT {
    id: string;
    name: string;
    children: SupportToolItemT[];
  }

  const data: {
    zh: SupportToolCategoryT[];
    en: SupportToolCategoryT[];
  };
  
  export default data;
}

declare module '#content/tools/*.yaml' {
  const data: unknown;
  export default data;
}
