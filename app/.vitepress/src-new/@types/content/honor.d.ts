declare module '#content/honor' {
  interface HonorCertificateItemT {
    name: string;
    href: string;
    img: string;
  }

  interface HonorMemberItemT {
    name: string;
    company: string;
    show_email: boolean;
    email: string;
    avatar: string;
  }

  interface HonorDeveloperItemT {
    name: string;
    members: HonorMemberItemT[];
  }

  interface HonorRuleItemT {
    type: string;
    value: string;
  }

  interface HonorSigItemT {
    name: string;
    href: string;
  }

  interface HonorEnterpriseItemT {
    first_name: string;
    second_name: string;
  }

  interface HonorPersonItemT {
    name: string;
    company: string;
    avatar: string;
    comment: string[];
  }

  interface HonorYearItemT {
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

  interface HonorDataT {
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
