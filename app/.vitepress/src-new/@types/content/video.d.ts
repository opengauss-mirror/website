declare module '#content/video' {
  export interface VideoItemT {
    title: string;
    author: string;
    video_url: string;
  }

  export interface VideoGroupT {
    id: string;
    name: string;
    poster: string;
    display_count: number;
    videos: VideoItemT[];
  }

  export interface VideoNavItemT {
    key: string;
    name: string;
  }

  export interface VideoTabT {
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
