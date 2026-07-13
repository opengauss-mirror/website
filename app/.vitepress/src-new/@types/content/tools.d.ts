declare module '#content/tools' {
  interface SupportToolItemT {
    iden: string;
    name: string;
    desc: string;
    address: string;
    guide?: string;
    site?: boolean;
  }

  interface SupportToolCategoryT {
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
