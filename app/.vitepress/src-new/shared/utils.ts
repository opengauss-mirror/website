import { ElMessage } from 'element-plus';
import { OptionItemT } from '~@/@types/type-common';
import i18n from '~@/i18n';

const { t } = i18n.global;


/**
 * 根据提交时间获取与当前相差的时间
 * @param {string} committed_date 提交时间
 * @returns {string} 返回相差的时间，如2天前、2小时前
 */
export const resolveDate = (committed_date: string) => {
  if (!committed_date) {
    return '';
  }

  const committedDate = new Date(committed_date);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - committedDate.getTime();

  const minutes = Math.floor(timeDifference / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return t('notifications.yearAgo', years);
  } else if (months > 0) {
    return t('notifications.monthAgo', months);
  } else if (weeks > 0) {
    return t('notifications.weekAgo', weeks);
  } else if (days > 1) {
    return t('notifications.dayAgo', days);
  } else if (days === 1) {
    return t('notifications.yesterday');
  } else if (hours > 0) {
    return t('notifications.hourAgo', hours);
  } else if (minutes > 0) {
    return t('notifications.minuteAgo', minutes);
  } else {
    return t('notifications.justNow');
  }
};


export const findLabelFromOptions = (value: string | number, options: OptionItemT[], labelKey: string = 'label', valueKey: string = 'value') => {
  const find = options.find((o) => o[valueKey] === value);
  return find?.[labelKey] || value;
};

/**
 * 错误处理
 */
export function handleError(error = 'Error!') {
  ElMessage({
    message: error,
    type: 'error',
  });
}