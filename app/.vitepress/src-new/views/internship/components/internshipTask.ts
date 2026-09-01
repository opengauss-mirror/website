import { useMessage } from '@opensig/opendesign';
import i18n from '~@/i18n';

export const internshipTaskLinks = {
  viewTask: 'https://atomgit.com/openeuler/opensource-intern/issues',
  internshipTestTask: 'https://atomgit.com/openeuler/opensource-intern/issues/120',
  mindsporeLink: 'https://www.mindspore.cn/internship/',
  openubmcLink: 'https://www.openubmc.cn/zh/internship',
  openeulerLink: 'https://www.openeuler.org/zh/internship/',
  vllmAscendLink: 'https://www.chaspark.com/#/s/AscendInternship?multi=z',
  internshipEmailTemp: '/category/internship/实习任务认领邮件模板.txt',
  applyInternshipTemp: '/category/internship/实习申请材料模板.rar',
  internshipCertTemplate: '/category/internship/实习证明申请材料和邮件模板.rar',
};

export const downloadByUrl = async (url: string, filename: string) => {
  const message = useMessage();
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename;
    a.click();
    // 清理URL对象
    URL.revokeObjectURL(blobUrl);
  } catch {
    message.danger({
      content: i18n.global.t('internship.downloadFail'),
    });
  }
};
