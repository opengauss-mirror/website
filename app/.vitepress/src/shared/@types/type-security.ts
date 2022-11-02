export interface BaseQuery {
  page: number;
  size: number;
}
export interface CveQuery {
  pageNum: number;
  pageSize: number;
  searchName: string;
  years: string;
  cveLevel: string;
  releaseFlag: number;
}
export interface DetailParams {
  securityNoticeNo: string;
}
export interface SecurityLists {
  affectProduct: string;
  cveLevel: string;
  cveLevelValue: string;
  gaussSaNum: string;
  influenceComponent: string;
  releaseDate: string;
  saId: number;
  summary: string;
}
export interface CveLists {
  NVDScore: number;
  cveId: number;
  cveNum: string;
  description: string;
  releaseDate: string;
  updateTime: string;
}
export interface CompatibilityList {
  architecture: string;
  biosUefi?: string;
  boardCards?: [];
  certificationAddr?: string;
  certificationTime?: string;
  commitID?: string;
  compatibilityConfiguration?: null;
  computerType?: string;
  cpu?: string;
  date?: string;
  friendlyLink?: string;
  hardDiskDrive?: string;
  hardwareFactory?: string;
  hardwareModel?: string;
  hostBusAdapter?: string;
  id?: number;
  lang?: string;
  mainboardModel?: string;
  osVersion?: string;
  portsBusTypes?: string;
  productInformation?: string;
  ram?: string;
  updateTime?: string;
  videoAdapter?: string;
}
export interface BoardCardList {
  architecture: string;
  boardModel: string;
  chipModel: string;
  chipVendor: string;
  deviceID?: string;
  downloadLink?: string;
  driverDate: string;
  driverName: string;
  driverSize?: string;
  id?: number;
  item?: string;
  lang?: string;
  os: string;
  sha256?: string;
  ssID?: string;
  svID?: string;
  type: string;
  updateTime?: string;
  vendorID?: string;
  version: string;
}
export interface SoftWareQuery {
  page_size: number;
  page_num: number;
}
export interface SelectParams {
  lang: string;
}
export interface SoftWareList {
  arch: string;
  bin: string;
  category: string;
  downloadLink: string;
  group: string;
  install: string;
  libs: string;
  license: string;
  os: string;
  property: string;
  result_root: string;
  result_url: string;
  softwareName: string;
  src_location: string;
  type: string;
  uninstall: string;
  version: string;
}
export interface BusinessSoftWareQuery {
  pageSize: number;
  pageNo: number;
}
export interface PlatFormAndServerModel {
  platformName: string;
  serverProvider: string;
  serverTypes: string[];
}
export interface BusinessSoftWareList {
  authenticateLink?: null;
  certId?: number;
  companyName: string;
  osName: string;
  osVersion: string;
  platformTypeAndServerModel: PlatFormAndServerModel[];
  productName: string;
  productVersion: string;
  testOrganization: string;
  type: string;
}
export interface FilterList {
  select: string[];
  title: string;
}

export interface ConfigurationInfo {
  architecture: string;
  biosUefi: string;
  certificationAddr: string;
  certificationTime: string;
  commitID: string;
  compatibilityConfiguration: null;
  computerType: string;
  cpu: string;
  date: string;
  friendlyLink: string;
  hardDiskDrive: string;
  hardwareFactory: string;
  hardwareModel: string;
  hostBusAdapter: string;
  id: number;
  lang: string;
  mainboardModel: string;
  osVersion: string;
  portsBusTypes: string;
  productInformation: string;
  ram: string;
  updateTime: string;
  videoAdapter: string;
}
export interface CveDetailCvss {
  NVDScore: number;
  nAttackComplexity: string;
  nAttackVector: string;
  nAvailability: string;
  nConfidentiality: string;
  nIntegrity: string;
  nPrivilegeRequired: string;
  nScope: string;
  nUserInteraction: string;
  oAttackComplexity: string;
  oAttackVector: string;
  oAvailability: string;
  oConfidentiality: string;
  oIntegrity: string;
  oPrivilegeRequired: string;
  oScope: string;
  oUserInteraction: string;
  openGaussScore: number;
  scoreType: string;
}
export interface AffectProduct {
  affectProduct: string;
  packName: string;
  fixLabel: string;
}
export interface DetailQuery {
  id: string;
}
