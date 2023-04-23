import CertificateList from '@/data/certificate-list';
export default {
  zh: {
    title: '发行版认证',
    search: '搜索',
    search_placeholder: '认证的商业发行版、公司名称',
    certify: '下载证书',
    pro: '认证的商业发行版',
    name: '公司名称',
    version: 'openGauss社区版本',
    award: '证书颁发日期',
    expiration: '证书有效截止日期',
    certificate: '认证证书',
    introduce1: '关于商业发行版认证，openGauss提供了完整的测试流程，详见',
    introduce2: 'openGauss商业发行版测评整体介绍。',
    tableData: CertificateList.zh,
  },
  en: {
    title: 'Distribution Certification',
    search: 'Search',
    search_placeholder: 'Product, Community Version',
    certify: 'Download Certificate',
    pro: 'Product',
    name: 'Vendor',
    version: 'Community Version',
    award: 'Date Certificate Issued',
    expiration: 'Certificate Validity Expiration Date',
    certificate: 'Product Certificate',
    introduce1:
      'openGauss provides a complete test process for commercial release certification. For details, see ',
    introduce2:
      'the overall introduction to openGauss commercial release certification.',
    tableData: CertificateList.en,
  },
};
