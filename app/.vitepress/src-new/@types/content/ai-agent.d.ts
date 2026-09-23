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
