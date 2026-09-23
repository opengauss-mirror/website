declare module '#content/ai/rag' {
  export interface RagSectionIntroT {
    title: string;
    description: string;
  }

  export interface RagEcoItemT {
    name: string;
    active?: boolean;
    link?: string;
  }

  export interface RagEcoCategoryT {
    name: string;
    items: RagEcoItemT[];
  }

  export interface RagEcoCategoriesT {
    applications: RagEcoCategoryT;
    evaluation: RagEcoCategoryT;
    om_tools: RagEcoCategoryT;
    knowledge_engineering: RagEcoCategoryT;
    data_sources: RagEcoCategoryT;
    orchestration_frameworks: RagEcoCategoryT;
    llms: RagEcoCategoryT;
    compute_architecture: RagEcoCategoryT;
    cloud_native: RagEcoCategoryT;
    os: RagEcoCategoryT;
    hardware: RagEcoCategoryT;
  }

  export interface RagSoftwareEcosystemT {
    title: string;
    image_light: string;
    image_dark: string;
    pc_only_tip: string;
    legend_supported: string;
    legend_coming_soon: string;
    categories: RagEcoCategoriesT;
  }

  export interface RagUseCaseItemT {
    label: string;
    href: string;
  }

  export interface RagUseCasesT {
    title: string;
    cases: RagUseCaseItemT[];
  }

  export interface RagDataT {
    what_is_rag: RagSectionIntroT;
    software_ecosystem: RagSoftwareEcosystemT;
    use_cases: RagUseCasesT;
  }

  const data: {
    zh: RagDataT;
    en: RagDataT;
  };

  export default data;
}

declare module '#content/ai/rag/*.yaml' {
  const data: unknown;
  export default data;
}
