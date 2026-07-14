declare module '#content/ogsp' {
  interface OgspBannerT {
    title: string;
    background: string;
    illustration: string;
  }

  interface OgspTableHeadersT {
    name: string;
    version: string;
    award: string;
    expiration: string;
    patch: string;
    content: string;
    system: string;
    commitment: string;
    experience: string;
    certificate: string;
  }

  interface OgspTipsT {
    text: string;
    link_text: string;
    link_href: string;
  }

  interface OgspItemT {
    name: string;
    version: string;
    award: string;
    expiration: string;
    patch: string;
    content: string;
    system: string;
    commitment: string;
    experience: string;
    certificate: string;
  }

  interface OgspDataT {
    banner: OgspBannerT;
    search_placeholder: string;
    table_headers: OgspTableHeadersT;
    certify: string;
    tips: OgspTipsT;
    certifications: OgspItemT[];
  }

  const data: {
    zh: OgspDataT;
    en: OgspDataT;
  };
  export default data;
}

declare module '#content/ogsp/*.yaml' {
  const data: unknown;
  export default data;
}
