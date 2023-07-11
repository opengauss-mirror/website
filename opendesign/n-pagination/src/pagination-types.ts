import { ExtractPropTypes, PropType } from 'vue';

const pageSizes = [6, 12, 24, 48];

export const paginationProps = {
  /**
   * 支持选择的每页数据条数
   */
  pageSizes: {
    type: Array as PropType<number[]>,
    default: () => pageSizes,
  },
  /**
   * 每页数据条数
   */
  pageSize: {
    type: Number,
    default: pageSizes[0],
  },
  /**
   * 数据总条数
   */
  total: {
    type: Number,
    default: 0,
  },
  /**
   * 当前页码
   */
  currentPage: {
    type: Number,
    default: 1,
  },
  /**
   * 页码按钮数 > 3
   * 页码按钮数
   */
  showPageCount: {
    type: Number,
    default: 9,
  },
  /**
   * 简洁模式
   */
  simple: {
    type: Boolean,
  },
};

export type PaginationPropsT = ExtractPropTypes<typeof paginationProps>;
