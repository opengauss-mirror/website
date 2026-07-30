declare module '#content/activity' {
  interface EventItemT {
    id: number;
    title_zh: string;
    title_en?: string;
    display_date_zh: string;
    start_date: string;
    series: string;
    format: 'offline' | 'online' | 'hybrid';
    city_zh?: string;
    city_en?: string;
    poster_image?: string;
    poster_image_mb?: string;
    review_url?: string;
    synopsis_zh?: string;
    synopsis_en?: string;
    status: 'ended' | 'ongoing';
  }

  const data: {
    list: EventItemT[];
  };
  export default data;
}

declare module '#content/home' {
  interface BannerItemT {
    bg_pc: string;
    bg_pad?: string;
    bg_mb?: string;
    bg_pc_dark?: string;
    bg_mb_dark?: string;
    bg_theme: 'light' | 'dark';
    text_image_zh?: string;
    text_image_mb_zh?: string;
    title_zh?: string | string[];
    title_en?: string | string[];
    title_mb_zh?: string[];
    subtitle_zh?: string;
    subtitle_en?: string;
    desc_zh?: string[];
    desc_en?: string[];
    btn_zh?: string;
    btn_en?: string;
    href_zh?: string;
    href_en?: string;
    is_blank?: boolean;
    class_name?: string;
    attach?: string;
    attach_href?: string;
    locale?: string;
  }

  const data: {
    banner: BannerItemT[];
  };
  export default data;
}

declare module '#content/download' {
  interface DocItemT {
    name_zh: string;
    name_en?: string;
    path_zh: string;
    path_en?: string;
  }

  interface VersionMetaT {
    version_name: string;
    new_layout?: boolean;
    is_login?: boolean;
    data_file: string;
    release_date: string;
    planned_eol: string;
    desc_zh?: string;
    desc_en?: string;
    init_previous?: boolean;
    docs_list?: DocItemT[];
  }

  const data: {
    versions: VersionMetaT[];
  };
  export default data;
}

declare module '#content/activity/*.yaml' {
  const data: unknown;
  export default data;
}

declare module '#content/home/*.yaml' {
  const data: unknown;
  export default data;
}

declare module '#content/download/*.yaml' {
  const data: unknown;
  export default data;
}

declare module '#content/download/versions' {
  const data: Record<string, any[]>;
  export default data;
}
