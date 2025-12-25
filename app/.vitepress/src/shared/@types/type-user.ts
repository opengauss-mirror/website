export interface UserInfoT {
  photo: string;
  username: string;
  email: string;
  phone: string;
  identities: {
    username: string;
    provider: 'gitee' | 'gitcode';
  }[];
}
