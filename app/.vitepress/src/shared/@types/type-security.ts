export interface SecurityQueryT {
  pageNum: number;
  pageSize: number;
  searchName: string;
  years: string;
  cveLevel: string;
  releaseFlag: number;
}
export interface SecurityListsT {
  affectProduct: string;
  cveLevel: string;
  cveLevelValue: string;
  gaussSaNum: string;
  influenceComponent: string;
  releaseDate: string;
  saId: number;
  summary: string;
}
interface VersionBody {
  packageBody: PackageBody[];
  versions: string;
}

interface PackageBody {
  groupName: string;
  tagBody: TagBody[];
}

interface TagBody {
  affectedPlatform: string[];
  packageName: string;
}
export interface SecurityDetailT {
  affectProduct: string;
  cveLevel: string;
  cveLevelValue: string;
  cveNumbers: string;
  description: string;
  gaussSaNum: string;
  influenceComponent: string;
  introduction: string;
  referenceLink: string;
  releaseDate: string;
  summary: string;
  theme: string;
  versionsBody: VersionBody[];
}



export interface CveQueryT {
  pageNum: number;
  pageSize: number;
  searchName: string;
  releaseFlag: number;
}
export interface CveListsT {
  NVDScore: number;
  cveId: number;
  cveNum: string;
  description: string;
  releaseDate: string;
  updateTime: string;
}

export interface AffectProductT {
  affectProduct: string;
  packName: string;
  fixLabel: string;
}

export interface SaBodyItemT {
  gaussSaNum: string;
  releaseDate: string;
  summary: string;
  saId: number;
}
export interface CvsItemT {
  NVD: number | string;
  cate: string;
  openGauss: number | string;
}
export interface CveDetailCvssT {
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

export interface AffectBodyItemT {
  affectProduct: string;
  fixLabel: string;
  packName: string;
}

export interface SaBodyItemT {
  gaussSaNum: string;
  releaseDate: string;
  summary: string;
  saId: number;
}

export interface CveDetailT {
  CVSSV3: CveDetailCvssT;
  affectBody: Array<AffectBodyItemT>;
  cveId: number;
  cveNum: string;
  description: string;
  releaseDate: string;
  saBody: Array<SaBodyItemT>;
  updateTime: string;
}
