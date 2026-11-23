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

declare module '#content/ai/common' {
  export interface AiBannerT {
    subtitle: string;
  }

  export interface AiTabItemT {
    title: string;
    name: string;
    href: string;
  }

  export type AiTabListT = AiTabItemT[];

  export interface AiCommonDataT {
    banner: AiBannerT;
    tabs: AiTabListT;
  }

  const data: {
    zh: AiCommonDataT;
    en: AiCommonDataT;
  };

  export default data;
}

declare module '#content/ai/common/*.yaml' {
  const data: unknown;
  export default data;
}
