import CertificateList from '@/data/certificate-list';
export default {
  zh: {
    title: '发行版认证',
    search: '搜索',
    search_placeholder: '请输入关键词',
    certify: '下载证书',
    pro: '认证的商业发行版',
    name: '公司名称',
    version: 'openGauss社区版本',
    award: '证书颁发日期',
    expiration: '证书有效截止日期',
    certificate: '认证证书',
    tableData: CertificateList.zh,
  },
  en: {
    title: 'Distribution Certification',
    search: 'Search',
    search_placeholder: 'Enter keywords',
    certify: 'Download Certificate',
    pro: 'Product',
    name: 'Vendor',
    version: 'Community Version',
    award: 'Date Certificate Issued',
    expiration: 'Certificate Validity Expiration Date',
    certificate: 'Product Certificate',
    tableData: CertificateList.en,
  },
};
