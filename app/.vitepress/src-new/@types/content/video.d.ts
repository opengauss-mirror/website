declare module '#content/video' {
  interface VideoItemT {
    title: string;
    author: string;
    video_url: string;
  }

  interface VideoGroupT {
    id: string;
    name: string;
    poster: string;
    display_count: number;
    videos: VideoItemT[];
  }

  interface VideoNavItemT {
    key: string;
    name: string;
  }

  interface VideoTabT {
    id: number;
    name: string;
    tag: string;
    poster: string;
    nav_list: VideoNavItemT[];
    groups: VideoGroupT[];
  }

  const data: {
    zh: VideoTabT[];
    en: VideoTabT[];
  };
  export default data;
}

declare module '#content/video/*.yaml' {
  const data: unknown;
  export default data;
}
