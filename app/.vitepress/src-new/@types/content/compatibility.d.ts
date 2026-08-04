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
