export interface Tool {
  category?: string;
  type?: string;
  name?: string;
  description?: string;
  down_url?: string;
  architecture?: string;
  os?: string;
  system?: string;
  size?: string;
  sha_code?: string;
  children?: Tool[];
}
