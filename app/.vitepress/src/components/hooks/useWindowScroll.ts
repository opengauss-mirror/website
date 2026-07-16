import { onMounted, onUnmounted, ref } from 'vue';
import { isBrowser } from '@/shared/utils';

const useWindowSroll = () => {
  let top = NaN;

  const pageScrollTop = () => document.getElementById('anchor-sticky-demo')?.scrollTop || document.documentElement.scrollTop || document.body.scrollTop;

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

    (document.getElementById('anchor-sticky-demo') ?? window).addEventListener('scroll', onScroll);
  });

  onUnmounted(() => {
    (document.getElementById('anchor-sticky-demo') ?? window).removeEventListener('resize', onScroll);
  });

  return scrollTop;
};

export default useWindowSroll;
