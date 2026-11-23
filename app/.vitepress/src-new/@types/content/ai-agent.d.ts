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

declare module '#content/ai/agent' {
  export interface AgentEcoItemT {
    name: string;
    active?: boolean;
    link?: string;
  }

  export interface AgentEcoCategoryT {
    id: string;
    name: string;
    items?: AgentEcoItemT[];
    children?: AgentEcoCategoryT[];
  }

  export interface AgentEcosystemMapT {
    title: string;
    legend_supported: string;
    legend_coming_soon: string;
    categories: AgentEcoCategoryT[];
  }

  export interface AgentDataT {
    ecosystem_map: AgentEcosystemMapT;
  }

  const data: {
    zh: AgentDataT;
    en: AgentDataT;
  };

  export default data;
}

declare module '#content/ai/agent/*.yaml' {
  const data: unknown;
  export default data;
}
