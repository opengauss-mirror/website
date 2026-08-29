import { expect, describe, it, vi } from 'vitest';
import { ref } from 'vue';

function createCollectDownloadData(
  activeArchitecture: ReturnType<typeof ref<string>>,
  activeOs: ReturnType<typeof ref<string>>,
) {
  const oaReportCalls: any[] = [];
  const getCustomCookie = vi.fn(() => 'notLog');

  const collectDownloadData = (name: string) => {
    const href = 'https://opengauss.org/zh/download/';
    const downloadTime = new Date();
    const _U_T_ = getCustomCookie('_U_T_') || 'notLog';
    oaReportCalls.push({
      profileType: 'download',
      origin: href,
      softwareName: name,
      softwareArchitecture: activeArchitecture.value,
      softwareOs: activeOs.value,
      downloadTime,
      _U_T_,
    });
  };

  return { collectDownloadData, oaReportCalls, getCustomCookie };
}

describe('collectDownloadData — 无条件上报（无 username 判断）', () => {
  it('未登录时仍上报埋点', () => {
    const activeArchitecture = ref('ARM');
    const activeOs = ref('openEuler');
    const { collectDownloadData, oaReportCalls, getCustomCookie } = createCollectDownloadData(activeArchitecture, activeOs);

    getCustomCookie.mockReturnValue('notLog');
    collectDownloadData('openGauss-6.0.0');

    expect(oaReportCalls.length).toBe(1);
    expect(oaReportCalls[0].softwareName).toBe('openGauss-6.0.0');
    expect(oaReportCalls[0]._U_T_).toBe('notLog');
  });

  it('已登录时上报埋点且 _U_T_ 值为 cookie 值', () => {
    const activeArchitecture = ref('x86');
    const activeOs = ref('CentOS');
    const { collectDownloadData, oaReportCalls, getCustomCookie } = createCollectDownloadData(activeArchitecture, activeOs);

    getCustomCookie.mockReturnValue('user_token_abc');
    collectDownloadData('openGauss-7.0.0-RC3');

    expect(oaReportCalls.length).toBe(1);
    expect(oaReportCalls[0]._U_T_).toBe('user_token_abc');
    expect(oaReportCalls[0].softwareArchitecture).toBe('x86');
    expect(oaReportCalls[0].softwareOs).toBe('CentOS');
  });

  it('多次调用多次上报', () => {
    const activeArchitecture = ref('ARM');
    const activeOs = ref('openEuler');
    const { collectDownloadData, oaReportCalls } = createCollectDownloadData(activeArchitecture, activeOs);

    collectDownloadData('pkg1');
    collectDownloadData('pkg2');
    collectDownloadData('pkg3');

    expect(oaReportCalls.length).toBe(3);
    expect(oaReportCalls[0].softwareName).toBe('pkg1');
    expect(oaReportCalls[1].softwareName).toBe('pkg2');
    expect(oaReportCalls[2].softwareName).toBe('pkg3');
  });

  it('_U_T_ cookie 为空时使用 "notLog" 兜底', () => {
    const activeArchitecture = ref('ARM');
    const activeOs = ref('openEuler');
    const { collectDownloadData, oaReportCalls, getCustomCookie } = createCollectDownloadData(activeArchitecture, activeOs);

    getCustomCookie.mockReturnValue('');
    collectDownloadData('openGauss-6.0.6');

    expect(oaReportCalls[0]._U_T_).toBe('notLog');
  });

  it('getCustomCookie 返回 null 时使用 "notLog" 兜底', () => {
    const activeArchitecture = ref('ARM');
    const activeOs = ref('openEuler');
    const { collectDownloadData, oaReportCalls, getCustomCookie } = createCollectDownloadData(activeArchitecture, activeOs);

    getCustomCookie.mockReturnValue(null as any);
    collectDownloadData('openGauss-6.0.6');

    expect(oaReportCalls[0]._U_T_).toBe('notLog');
  });
});
