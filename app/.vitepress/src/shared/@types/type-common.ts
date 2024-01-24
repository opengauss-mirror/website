export interface ResponseT<T> {
  code: string;
  msg: string;
  data: T;
}
export interface ResponseSearchT<T> {
  msg: string;
  status: number;
  obj: T;
}
