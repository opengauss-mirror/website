import { onMounted, onUnmounted, MaybeRef, unref, computed, reactive, watch } from 'vue';
import { useElementBounding } from '@vueuse/core';

export function useOverflowChildren(
  el: MaybeRef<HTMLElement | undefined | null>,
  childrenGetter?: (el: HTMLElement) => NodeListOf<HTMLElement> | HTMLCollection | HTMLElement[],
  threshold = 1
) {
  const elRef = computed(() => unref(el));
  const overflowChildren = reactive(new Map<HTMLElement, number>());
  let intersectionObs: IntersectionObserver | null = null;
  let mutObs: MutationObserver | null = null;
  const { top, right, bottom, left } = useElementBounding(elRef);

  const OVERFLOW_TOP = 1;
  const OVERFLOW_RIGHT = 1 << 1;
  const OVERFLOW_BOTTOM = 1 << 2;
  const OVERFLOW_LEFT = 1 << 3;

  const initMutationObs = () => {
    const obsFn = (mutations?: MutationRecord[]) => {
      mutations?.forEach((mut) => {
        for (const node of Array.from(mut.removedNodes)) {
          overflowChildren.delete(node as HTMLElement);
        }
      });
      intersectionObs!.disconnect();
      if (!elRef.value) return;
      for (const child of Array.from(typeof childrenGetter === 'function' ? childrenGetter(elRef.value) : elRef.value.children)) {
        intersectionObs!.observe(child);
      }
    };
    mutObs = new MutationObserver(obsFn);
    obsFn();
    mutObs.observe(elRef.value!, { childList: true, subtree: true });
  };

  const initIntersectionObs = () => {
    intersectionObs = new IntersectionObserver(
      (entries) => {
        for (const ent of entries) {
          const target = ent.target as HTMLElement;
          if (ent.intersectionRatio < threshold) {
            const rect = ent.boundingClientRect;
            let overflowTypes = overflowChildren.get(target) ?? 0;
            if (rect.top < top.value) {
              overflowTypes |= OVERFLOW_TOP;
            } else {
              overflowTypes &= ~OVERFLOW_TOP;
            }
            if (rect.right > right.value) {
              overflowTypes |= OVERFLOW_RIGHT;
            } else {
              overflowTypes &= ~OVERFLOW_RIGHT;
            }
            if (rect.bottom > bottom.value) {
              overflowTypes |= OVERFLOW_BOTTOM;
            } else {
              overflowTypes &= ~OVERFLOW_BOTTOM;
            }
            if (rect.left < left.value) {
              overflowTypes |= OVERFLOW_LEFT;
            } else {
              overflowTypes &= ~OVERFLOW_LEFT;
            }
            overflowChildren.set(target, overflowTypes);
          } else {
            overflowChildren.delete(target);
          }
        }
      },
      { root: elRef.value!, threshold: threshold }
    );
  };

  onMounted(() => {
    const el = elRef.value;
    if (!el) return;
    initIntersectionObs();
    initMutationObs();
  });

  onUnmounted(() => {
    intersectionObs?.disconnect();
    intersectionObs = null;
    mutObs?.disconnect();
    mutObs = null;
    overflowChildren.clear();
  });

  return {
    overflowChildren: computed(() => {
      return [...overflowChildren.entries()].map(([target, val]) => {
        const types = [] as ('top' | 'right' | 'bottom' | 'left')[];
        if (OVERFLOW_TOP & val) types.push('top');
        if (OVERFLOW_RIGHT & val) types.push('right');
        if (OVERFLOW_BOTTOM & val) types.push('bottom');
        if (OVERFLOW_LEFT & val) types.push('left');
        return { target, types };
      });
    }),
  };
}
