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
