import { request } from '@/shared/axios';
import { getUserAuth } from '@/shared/login';
/**
 * meetup接口  申请表
 * @param {Object} params 申请表格数据
 * @return  {Object}
 */
export function meetupApplyForm(params: any): Promise<{
  code: number;
  data: string;
  msg: string;
}> {
  const url = `/api-dsapi/query/meetupApplyForm?community=opengauss`;
  const { csrfToken } = getUserAuth();
  return request
    .post(url, params, {
      showLoading: true,
      headers: {
        token: csrfToken,
      },
    })
    .then((res) => {
      return res.data;
    });
}
