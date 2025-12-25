<script setup lang="ts">
import { toRefs } from 'vue';
import { OButton, ODialog } from '@opensig/opendesign';
import { useLocale } from '~@/composables/useLocale';
const { t } = useLocale();
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  num: {
    type: Number,
    required: true,
  },
  loading: {
    type: Boolean,
    required: false,
  }
});
const { modelValue } = toRefs(props);
const emit = defineEmits(['update:modelValue', 'confirm']);
const confirm = () => {
    emit('confirm');
    close();
}
const close = () => {
  emit('update:modelValue', false);
};

const dlgToggle = (visible: boolean) => {
  if (!visible) {
    close();
  }
};
</script>
<template>
  <ODialog
    v-model:visible="modelValue"
    :style="{
        '--dlg-width': '450px',
        '--dlg-padding-body-top': '32px',
        '--dlg-head-padding': '26px var(--dlg-padding) 0',
        '--dlg-padding-body-bottom': '36px',
      }"
    :mask-close="false"
    @change="dlgToggle"
  >
    <template #header>
      <span class="dlg-delete-header">{{ t('notifications.deleteTitle') }}</span>
    </template>
    <div class="dlg-delete-body">
      <p>{{ t('notifications.deleteMultiple', [props.num]) }}</p>
      <div class="btn-form">
        <OButton size="large" color="primary" class="confirm-btn" variant="solid" @click="confirm()" :loading="loading">{{ t('notifications.confirm') }}</OButton>
        <OButton size="large" class="cancel-btn" @click="close()">{{ t('notifications.cancel') }}</OButton>
      </div>
    </div>
  </ODialog>
</template>
<style lang="scss" scoped>
.dlg-delete-body {
  text-align: center;
  .btn-form {
    margin-top: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cancel-btn {
    margin-left: 16px;
  }
  & > p {
    color: var(--o-color-info1);
  }
}
.dlg-delete-header {
  color: var(--o-color-info1);
}
</style>
