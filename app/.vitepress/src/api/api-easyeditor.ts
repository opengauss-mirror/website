import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';

export function getEasyeditorInfo(params: string) {
  const url = `/api-easyeditor/api/publish/latest?path=${params}`;
  return request.get(url).then((res: AxiosResponse) => res.data);
}
