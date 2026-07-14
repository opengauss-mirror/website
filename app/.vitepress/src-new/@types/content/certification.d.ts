declare module '#content/certification' {
  interface CertificationBannerT {
    title: string;
    background: string;
    illustration: string;
  }

  interface CertificationTableHeadersT {
    pro: string;
    name: string;
    version: string;
    award: string;
    certificate: string;
  }

  interface CertificationIntroduceT {
    text: string;
    link_text: string;
    link_href: string;
  }

  interface CertificationItemT {
    pro: string;
    name: string;
    version: string;
    award: string;
    expiration: string;
    certificate: string;
  }

  interface CertificationDataT {
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
