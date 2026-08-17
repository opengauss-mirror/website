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
