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

import { internshipTaskLinks } from './internshipTask';

export const EMAIL_ADDRESS = 'common@public.opengauss.org';

export enum InternshipStep {
  APPLY = 'applyInternship',
  RECEIVE = 'receiveTask',
  SUBMIT = 'submitTask',
  SALARY = 'salaryAndCertificate',
}

export const internshipTaskTemplate = {
  titleKey: 'internship.applyInternshipDesc8',
  file: internshipTaskLinks.applyInternshipTemp,
  filename: '实习申请材料模板.rar',
};

export const internshipTaskEmailTemplate = {
  titleKey: 'internship.internshipTaskEmailTemplate',
  file: internshipTaskLinks.internshipEmailTemp,
  filename: '实习任务认领邮件模板.txt',
};

export const internshipCertTemplate = {
  titleKey: 'internship.internshipCertTemplate',
  file: internshipTaskLinks.internshipCertTemplate,
  filename: '实习证明申请材料和邮件模板.rar',
};