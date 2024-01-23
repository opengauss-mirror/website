export interface NavChildrenItemT {
  id: string; // id
  label: {
    zh: string;
    en?: string;
  }; // 显示文字
  href: {
    zh: string;
    en?: string;
  }; // 跳转链接
  jumOut?: boolean; // 是否新窗口打开，tags包含outlink时，默认为true
}

export interface NavItemT {
  id: string; // id
  label: {
    zh: string;
    en?: string;
  }; // 显示文字
  href?: {
    zh: string;
    en?: string;
  }; // 跳转链接
  children?: NavChildrenItemT[];
}
