import { AxiosResponse, request } from '@/shared/axios';

export function getVigorData() {
  const url = `/api-magic/stat_new/overview/count`;
  return request.get(url, { params: { community: 'opengauss' } }).then((res: AxiosResponse) => res.data);
}
