import { onMounted, onUnmounted, ref } from 'vue';
import { isBrowser } from '@/shared/utils';

const useWindowSroll = () => {
  let top = NaN;

  const pageScrollTop = () => window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;

  if (isBrowser()) {
    top = pageScrollTop();
  }

  const scrollTop = ref(top);
  const onScroll = () => {
    scrollTop.value =
      pageScrollTop();
  };

  onMounted(() => {
    scrollTop.value =
      pageScrollTop();

    window.addEventListener('scroll', onScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll);
  });

  return scrollTop;
};

export default useWindowSroll;
