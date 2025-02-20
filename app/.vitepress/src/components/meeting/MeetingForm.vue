<script lang="ts" setup>
import { ref, onMounted, reactive, watch, computed } from 'vue';
import { useI18n } from '@/i18n';
import { FormInstance, FormRules, ElMessage } from 'element-plus';
import { useUserInfoStore } from '@/stores/user';
import useWindowResize from '@/components/hooks/useWindowResize';
import { editMeetingApi, creatMeetingApi, getPlatformsApi } from '@/api/api-meeting';
import type { MeetingItemT, MeetingPostT, OptionItemT } from '/@types/type-meeting';

const props = defineProps<{ data?: MeetingItemT; sig: any }>();

const userInfoStore = useUserInfoStore();
const screenWidth = useWindowResize();
const isMobile = computed(() => (screenWidth.value <= 768 ? true : false));
const emits = defineEmits(['confirm', 'close']);
const i18n = useI18n();
const i18nMeeting = computed(() => i18n.value.home.HOME_CALENDAR);

const meetingRecord = ref(false);
const form = ref({
  platform: '',
  group_name: '',
  join_url: '',
  date: '',
  etherpad: '',
  email_list: '',
  is_record: meetingRecord.value,
  topic: '',
  sponsor: userInfoStore.username,
  start: '',
  end: '',
  agenda: '',
});

// 验证
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  topic: [
    {
      required: true,
      message: i18nMeeting.value.NAME_TEXT,
      trigger: 'blur',
    },
  ],
  sponsor: [
    {
      required: true,
      message: 'Please select sponsor',
      trigger: 'change',
    },
  ],
  group_name: [
    {
      required: true,
      message: i18nMeeting.value.SIG_TEXT,
      trigger: 'change',
    },
  ],
  platform: [
    {
      required: true,
      message: i18nMeeting.value.PLATFORM_TEXT,
      trigger: 'change',
    },
  ],
  date: [
    {
      required: true,
      message: i18nMeeting.value.DATA_TEXT,
      trigger: 'change',
    },
  ],
  start: [
    {
      required: true,
      message: i18nMeeting.value.STARTTIME,
      trigger: 'change',
    },
  ],
  end: [
    {
      required: true,
      message: i18nMeeting.value.ENDTIME,
      trigger: 'change',
    },
  ],
});

const isModify = computed(() => props.data);

// 编辑会议
const updateMeeting = async () => {
  try {
    const { id, topic, etherpad, date, start, end, agenda, is_record } = {
      ...props.data,
      ...form.value,
    };
    const res = await editMeetingApi(id, {
      topic,
      etherpad,
      date: date.split(' ')[0],
      start,
      end,
      agenda,
      is_record,
    });
    if (res.code === 200) {
      ElMessage({
        message: i18nMeeting.value.MODIFY_SUCCESS,
        type: 'success',
      });
    }
  } catch (err) {
    const { code, msg } = err?.response?.data;
    ElMessage({
      message: msg || i18nMeeting.value.failed,
      type: 'error',
    });
  }
};
// 创建会议
const creatMeeting = async () => {
  try {
    const res = await creatMeetingApi({
      ...form.value,
      email_list: form.value.email_list.replaceAll(' ', ''),
    });
    if (res.code === 200) {
      ElMessage({
        message: i18nMeeting.value.SUCCESS,
        type: 'success',
      });
    }
  } catch (err) {
    const { code, msg } = err?.response?.data;
    ElMessage({
      message: msg || i18nMeeting.value.FAILED,
      type: 'error',
    });
  }
};

const close = () => {
  form.value = {};
  emits('close');
};

// 提交
const submitMeeting = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  try {
    await formEl.validate((valid) => {
      if (valid) {
        if (isModify.value) {
          updateMeeting();
        } else {
          creatMeeting();
        }

        close();
        emits('confirm');
      }
    });
  } finally {
  }
};

// 获取会议平台信息
const platformOptions = ref([]);
const getPlatforms = async () => {
  if (platformOptions.value.length > 0) {
    return;
  }
  try {
    platformOptions.value = await getPlatformsApi();
    if (!props.data) {
      form.value.platform = platformOptions.value[0];
    }
  } finally {
  }
};

// 选择sig
const selectSig = () => {
  const find = props.sig.find((v) => v.group_name === form.value.group_name);

  if (!props.data) {
    form.value.etherpad = find?.etherpad || '';
    form.value.email_list = find?.email_list || '';
  }
};

watch(
  () => props.data,
  (data) => {
    if (data) {
      form.value = { ...data };
    }
  },
  { immediate: true }
);
onMounted(() => {
  getPlatforms();
});
</script>

<template>
  <ElForm ref="ruleFormRef" :model="form" :label-width="isMobile ? '100px' : '120px'" :rules="rules" class="meeting-form">
    <ElFormItem :label="i18nMeeting.REVERSE" prop="topic">
      <OInput v-model="form.topic" :placeholder="i18nMeeting.NAME_TEXT" />
    </ElFormItem>
    <ElFormItem :label="i18nMeeting.CREATOR" prop="sponsor">
      <OInput v-model="form.sponsor" disabled />
    </ElFormItem>
    <ElFormItem :label="i18nMeeting.SIG" prop="group_name">
      <OSelect :disabled="!!data" v-model="form.group_name" @change="selectSig" style="width: 100%">
        <OOption v-for="item in sig" :key="item.group_name" :label="item.group_name" :value="item.group_name" />
      </OSelect>
    </ElFormItem>
    <ElFormItem :label="i18nMeeting.PLATFORM" prop="platform">
      <ElRadioGroup v-model="form.platform" :disabled="!!data">
        {{ platformOptions }}
        <ElRadioButton v-for="item in platformOptions" :key="item" :label="item" />
      </ElRadioGroup>
    </ElFormItem>
    <ElFormItem :label="i18nMeeting.DAY" prop="date">
      <ODatePicker v-model="form.date" :placeholder="i18nMeeting.DATA_TEXT" value-format="YYYY-MM-DD" style="width: 100%" />
    </ElFormItem>
    <ElFormItem :label="i18nMeeting.TIME" required>
      <div class="time-select">
        <ElFormItem prop="start">
          <OTimeSelect
            v-model="form.start"
            :max-time="form.end"
            class="mr-4"
            :placeholder="i18nMeeting.STARTTIME"
            start="08:00"
            end="23:30"
            style="width: 175px"
          />
        </ElFormItem>
        <span class="line"> - </span>
        <ElFormItem prop="end">
          <OTimeSelect v-model="form.end" :min-time="form.start" :placeholder="i18nMeeting.ENDTIME" start="08:00" end="23:30" style="width: 175px" />
        </ElFormItem>
      </div>
    </ElFormItem>
    <ElFormItem :label="i18nMeeting.CONTENT">
      <OInput v-model="form.agenda" type="textarea" :rows="2" />
    </ElFormItem>
    <ElFormItem :label="i18nMeeting.EMAIL">
      <OInput v-model="form.emaillist" :disabled="!!data" :placeholder="i18nMeeting.EMAIL_TEXT" type="textarea" :rows="2" />
    </ElFormItem>
    <ElFormItem :label="i18nMeeting.ETHERPAD">
      <OInput v-model="form.etherpad" />
    </ElFormItem>
    <ElFormItem :label="i18nMeeting.RECORD">
      <ElCheckbox v-model="meetingRecord" />
      <p class="tips">{{ i18nMeeting.RECORD_TEXT }}</p>
    </ElFormItem>
    <ElFormItem>
      <div class="meeting-action-box">
        <OButton size="small" @click="close">
          {{ i18nMeeting.CANCEL }}
        </OButton>
        <OButton size="small" type="primary" @click="submitMeeting(ruleFormRef)">
          {{ isModify ? i18nMeeting.MODIFY_SUBMIT : i18nMeeting.SUBMIT }}
        </OButton>
      </div>
    </ElFormItem>
  </ElForm>
</template>

<style lang="scss" scoped>
.meeting-form {
  padding-right: 24px;
  .time-select {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 0;

    @media screen and (max-width: 768px) {
      flex-wrap: wrap;
    }
  }
  :deep(.el-form-item__label) {
    height: 38px;
    line-height: 38px;
  }
  .tips {
    font-size: var(--o-font-size-tip);
    line-height: var(--o-line-height-tip);
    color: var(--o-color-text4);
  }

  .meeting-action-box {
    display: flex;
    gap: var(--o-spacing-h5);
  }
  :deep(.el-textarea) {
    &.is-disabled {
      .el-textarea__inner {
        box-shadow: 0 0 0 1px var(--o-color-black) inset;
        background: var(--o-color-bg3);
      }
    }
  }

  :deep(.el-radio-button) {
    &.is-disabled {
      --el-radio-button-disabled-checked-fill: var(--o-color-bg3);
    }
  }
  :deep(.el-select) {
    .el-select__wrapper {
      min-height: 36px;
      border-radius: 0;
      box-shadow: 0 0 0 1px var(--o-select-border-color) inset;
      &.is-focused {
        --o-select-border-color: var(--o-color-brand1);
      }
      &.is-hovering {
        box-shadow: 0 0 0 1px var(--o-select-border-color) inset;
      }
      &.is-disabled {
        box-shadow: 0 0 0 1px var(--o-color-black) inset;
        background: var(--o-color-bg3);
      }
    }
  }
}
</style>
