import { computed, MaybeRefOrGetter, ref, toValue } from 'vue';

interface CheckboxData {
  label: string;
  value: string | number;
}

export default (data: MaybeRefOrGetter<CheckboxData[]>, initalValue?: (string | number)[]) => {
  const checkboxValues = ref<(string | number)[]>(initalValue ?? []);

  const checkAll = computed({
    get() {
      return checkboxValues.value.length === toValue(data).length ? [1] : [];
    },
    set(val) {
      if (val.length) {
        checkboxValues.value = toValue(data).map((item) => item.value);
      } else {
        checkboxValues.value = [];
      }
    },
  });

  const indeterminate = computed(() => {
    return checkboxValues.value.length > 0 && checkboxValues.value.length < toValue(data).length;
  });

  return {
    checkboxValues,
    checkAll,
    indeterminate,
  };
};
