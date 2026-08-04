declare module '#content/honor' {
  export interface HonorCertificateItemT {
    name: string;
    href: string;
    img: string;
  }

  export interface HonorMemberItemT {
    name: string;
    company: string;
    show_email: boolean;
    email: string;
    avatar: string;
  }

  export interface HonorDeveloperItemT {
    name: string;
    members: HonorMemberItemT[];
  }

  export interface HonorRuleItemT {
    type: string;
    value: string;
  }

  export interface HonorSigItemT {
    name: string;
    href: string;
  }

  export interface HonorEnterpriseItemT {
    first_name: string;
    second_name: string;
  }

  export interface HonorPersonItemT {
    name: string;
    company: string;
    avatar: string;
    comment: string[];
  }

  export interface HonorYearItemT {
    id: string;
    data: HonorCertificateItemT[];
    developer_data?: HonorDeveloperItemT[];
    devoloper_rules?: HonorRuleItemT[];
    sig_data?: HonorSigItemT[];
    sig_rules?: HonorRuleItemT[];
    enterprise_data?: HonorEnterpriseItemT[];
    enterprise_rules?: HonorRuleItemT[];
    person_data?: HonorPersonItemT[];
    person_rules?: HonorRuleItemT[];
    excellent_enterprise_title?: string;
    excellent_person_title?: string;
  }

  export interface HonorDataT {
    title: string;
    read_news: string;
    view_certificate: string;
    excellent_developer_title: string;
    excellent_sig_title: string;
    honor_list: HonorYearItemT[];
  }

  const data: {
    zh: HonorDataT;
  };
  
  export default data;
}

declare module '#content/honor/*.yaml' {
  const data: unknown;
  export default data;
}
