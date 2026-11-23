/*
 * Copyright (c) 2026 Huawei Technologies Co., Ltd.
 * website is licensed under Mulan PSL v2.
 * You can use this software according to the terms and conditions of the Mulan PSL v2.
 * You may obtain a copy of Mulan PSL v2 at:
 *          http://license.coscl.org.cn/MulanPSL2
 * THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
 * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
 * MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
 * See the Mulan PSL v2 for more details.
 */

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
