import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';

interface FeedbackParamsT {
  feedbackPageUrl: string;
  feedbackText: string;
  feedbackValue: number;
}

interface FeedbackInfoT {
  code: number;
  data: string;
  msg: string;
  update_at: string;
}
/**
 * 满意度评分
 * @param {Object} params
 * @param {string} params.feedbackPageUrl   - 评分页面
 * @param {string} params.feedbackText      - 建议
 * @param {string} params.feedbackValue     - 评分
 * @return {Promise<FeedbackInfoT>}     返回一个 Promise，解析为提交的反馈信息是否成功的反馈信息
 */
export function postFeedback(params: FeedbackParamsT): Promise<FeedbackInfoT> {
  const url = '/api-search/search/nps?community=opengauss';
  return request.post(url, params).then((res: AxiosResponse) => res.data);
}
