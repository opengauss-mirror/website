export interface ContentItemT {
  docsName: string;
  docs_url: string;
  down_url: string;
  name: string;
  sha_code: string;
  size: string;
  table?: string;
  edition?: string;
}
export interface DownloadItemT {
  architecture: string;
  content: Array<ContentItemT>;
  os: string;
  system: string;
  docs?: boolean;
}
