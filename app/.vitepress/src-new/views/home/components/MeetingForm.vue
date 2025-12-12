<script lang="ts" setup>
import { reactive, ref, watch, computed } from 'vue';

import {
  OInput,
  OIcon,
  OSwitch,
  OForm,
  OTextarea,
  OFormItem,
  useMessage,
  type FieldResultT,
  ORadioGroup,
  ORadio,
  OPopover,
  ODivider,
  ODialog,
  OSelect,
  OOption,
  type DialogActionT,
} from '@opensig/opendesign';
import { useMeeting } from '@/stores/common';
import { useScreen } from '@/shared/useScreen';
import { useCommon } from '@/stores/common';
import { editMeetingApi, creatMeetingApi, getPlatformsApi } from '@/api/api-meeting';

import { ElDatePicker, ElTimeSelect } from 'element-plus';
import type { MeetingSigT, MeetingPostT, MeetingItemT } from '@/shared/@types/type-meeting';
import { useI18n } from '~@/i18n';

import IconTime from '~icons/app/icon-time.svg';
import IconHelp from '~icons/app/icon-tips.svg';

const props = defineProps<{ sigOptions: Array<MeetingSigT>; data?: MeetingItemT; title: string; visible: Boolean }>();

const meetingStore = useMeeting();
const message = useMessage(null);
const commonStore = useCommon();
const isDark = computed(() => (commonStore.theme === 'dark' ? true : false));
const { isPhone } = useScreen();
const i18n = useI18n();
const i18nMeeting = computed(() => i18n.value.home.HOME_CALENDAR);

const formRef = ref<InstanceType<typeof OForm>>();
const formData = reactive({
  topic: '',
  sponsor: meetingStore.username,
  group_name: '',
  duration_time: '',
  date: '',
  platform: '',
  etherpad: '',
  email_list: '',
  is_record: false,
  start: '',
  end: '',
  agenda: '',
  join_url: '',
});

// -------------------- 会议名称验证 --------------------
const topicRules = [
  {
    required: true,
    message: '长度为1-128个字符',
    triggers: ['blur'],
  },
  {
    validator: (value: string) => {
      if (value.length < 1 || value.length > 128) {
        return {
          type: 'danger',
          message: '长度为1-128个字符',
        };
      }
    },
  },
];
// -------------------- 所属SIG验证 --------------------
const selectSigRules = [
  {
    required: true,
    message: '请选择SIG',
    triggers: ['change'],
  },
];
// -------------------- 会议时间验证 --------------------
const selectPickerRules = [
  {
    required: true,
    message: '请选择日期',
    triggers: ['blur', 'change'],
  },
];

// -------------------- 会议时间验证 --------------------
const selectTimeRules = [
  {
    triggers: ['blur', 'change'],
    validator: () => {
      if (formData.start === '') {
        return {
          type: 'danger',
          message: '请选择开始时间',
        };
      } else if (formData.end === '') {
        return {
          type: 'danger',
          message: '请选择结束时间',
        };
      }
    },
  },
];

// -------------------- etherpad验证 --------------------
const etherpadRules = [
  {
    required: true,
    message: '长度为1-255个字符',
    triggers: ['blur'],
  },
  {
    validator: (value: string) => {
      if (value.length < 1 || value.length > 255) {
        return {
          type: 'danger',
          message: '长度为1-255个字符',
        };
      }
    },
  },
];

// -------------------- 邮箱验证 --------------------
const validateEmails = (emailStr: string): boolean => {
  // 单个电子邮件地址的正则表达式
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // 如果输入为空字符串，直接返回 true
  if (!emailStr.trim()) {
    return true;
  }

  // 按分号分割并验证每个电子邮件地址
  return emailStr.split(';').every((email) => {
    const trimmedEmail = email.trim();
    return trimmedEmail === '' || emailRegex.test(trimmedEmail);
  });
};
const emailRules = [
  {
    message: '请输入电子邮件地址，多个邮件地址之间以“;”间隔',
    triggers: ['blur'],
  },
  {
    triggers: ['blur'],
    validator: (value: string) => {
      if (value.length === 0) {
        return true;
      } else if (value.length > 1000) {
        return {
          type: 'danger',
          message: '长度不能大于1000个字符',
        };
      } else if (!validateEmails(value)) {
        return {
          type: 'danger',
          message: '请输入正确的邮箱格式',
        };
      }
    },
  },
];

// -------------------- platform验证 --------------------
const platformRules = [
  {
    required: true,
    message: '请选择会议平台',
    triggers: ['blur'],
  },
];

// 过滤提交参数
function filterParams(obj: MeetingPostT, propName: string): MeetingPostT {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (key !== propName || value === '') {
      acc[key as keyof MeetingPostT] = value;
    }
    return acc;
  }, {} as MeetingPostT);
}

// 过滤时间参数  results: FieldResultT[]
const onMeetingReserve = () => {
  // if (results.find((item) => item?.type === 'danger')) {
  //   return;
  // } else {
  //   const newData = filterParams(formData, 'duration_time');
  //   requestMeetingReserve(newData);
  // }
  const newData = filterParams(formData, 'duration_time');
  requestMeetingReserve(newData);
};

// 监听会议时间是否有值 如果有值取消验证
watch(
  () => formData.date,
  (v) => {
    if (v && v.length > 0) {
      formRef.value?.clearValidate('date');
    } else {
      formData.date = '';
    }
  }
);

watch(
  () => [formData.start, formData.end],
  (v) => {
    if (v[0].length > 0 && v[1].length > 0) {
      formData.duration_time = `${v[0]}-${v[1]}`;
      formRef.value?.clearValidate('duration_time');
    } else {
      formData.duration_time = '';
    }
  }
);

// 重置表单数据
const reset = () => {
  formData.start = '';
  formData.end = '';
  formRef.value?.resetFields();
};

const emits = defineEmits(['update:visible']);

//新增会议请求
const requestMeetingReserve = async (data: MeetingPostT) => {
  try {
    const res = await creatMeetingApi(data);
    if (res.code === 200) {
      message.success({
        content: '会议预定成功！',
      });
      dialogVisible.value = false;
    } else {
      message.warning({
        content: '会议预定失败！',
      });
    }
  } catch (err: any) {
    message.danger({
      content: err?.response?.data?.msg || err?.message,
    });
  }
};

// 获取会议平台信息
const platformOptions = ref(['ZOOM', 'WELINK']);
const getPlatforms = async () => {
  if (meetingStore.platformOptions.length > 0) {
    platformOptions.value = meetingStore.platformOptions;
    if (!props.data) {
      formData.platform = platformOptions.value[0];
    }
    return;
  }

  platformOptions.value = await getPlatformsApi();

  meetingStore.platformOptions = platformOptions.value;

  if (!props.data) {
    formData.platform = platformOptions.value[0];
  }
};
getPlatforms();

const getSigInfo = (v: string) => {
  formData.etherpad = '';
  formData.email_list = '';
  const matchingOption = props.sigOptions.find((item: MeetingSigT) => item.group_name === v);
  if (matchingOption) {
    formData.etherpad = matchingOption.etherpad;
    formData.email_list = matchingOption.email_list;
  }
};

// 编辑会议
const isModify = computed(() => props.data);

const dialogVisible = ref(props.visible);
const dlgActions: Array<DialogActionT> = [
  {
    id: 'save',
    color: 'primary',
    label: isModify.value ? i18nMeeting.value.MODIFY_SUBMIT : i18nMeeting.value.SUBMIT,
    variant: 'solid',
    size: 'large',
    round: 'pill',
    onClick: () => {
      formRef.value?.validate();
      if (isModify.value) {
        updateMeeting();
      } else {
        onMeetingReserve();
      }
    },
  },
  {
    id: 'cancel',
    color: 'primary',
    label: '取消',
    variant: 'outline',
    size: 'large',
    round: 'pill',
    onClick: () => {
      dialogVisible.value = false;
      reset();
    },
  },
];

// 编辑会议
const updateMeeting = async () => {
  try {
    const { id, topic, etherpad, date, start, end, agenda, is_record } = {
      ...props.data,
      ...formData,
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
      message.success({
        content: i18nMeeting.value.MODIFY_SUCCESS,
      });
      dialogVisible.value = false;
    }
  } catch (err: any) {
    let failed = i18nMeeting.value.failed;
    if (err && err.response && err.response.data) {
      failed = err.response.data.msg;
    }
    message.danger({
      content: failed,
    });
  }
};
watch(
  () => props.data,
  (data) => {
    if (data) {
      formData.topic = data.topic;
      formData.group_name = data.group_name;
      formData.etherpad = data.etherpad;
      formData.is_record = data.is_record;
      formData.platform = data.platform;
      formData.date = data.date;
      formData.start = data.start;
      formData.end = data.end;
      formData.agenda = data.agenda;
      formData.email_list = data.email_list;
    }
  },
  { immediate: true }
);

// 监听外部visible变化，同步到内部状态
watch(
  () => props.visible,
  (newVal) => {
    dialogVisible.value = newVal;
  },
  { immediate: true }
);

// 监听内部状态变化，同步到外部
watch(
  () => dialogVisible.value,
  (newVal) => {
    emits('update:visible', newVal);
  }
);
</script>

<template>
  <ODialog
    v-model:visible="dialogVisible"
    size="large"
    :unmount-on-hide="true"
    :actions="dlgActions"
    :scrollbar="{
      showType: 'always',
    }"
  >
    <template #header>{{ title }}</template>
    <OForm ref="formRef" has-required :layout="isPhone ? 'v' : 'h'" :model="formData" label-width="132px" label-align="top" size="large" class="calendar-form">
      <OFormItem label="发起人" required field="sponsor" :rules="topicRules">
        <OInput v-model="formData.sponsor" disabled="true" size="large" />
      </OFormItem>
      <OFormItem label="会议名称" required field="topic" :rules="topicRules">
        <OInput v-model="formData.topic" :min-length="1" :max-length="128" size="large" placeholder="请输入会议名称" />
      </OFormItem>

      <OFormItem label="所属SIG" required field="group_name" :rules="selectSigRules" class="sig-item">
        <OSelect v-model="formData.group_name" clearable filterable size="large" @change="getSigInfo" placeholder="请选择SIG">
          <OOption v-for="item in sigOptions" :key="item.group_name" :label="item.group_name" :value="item.group_name" />
        </OSelect>
      </OFormItem>
      <OFormItem label="Etherpad" required field="etherpad" :rules="etherpadRules">
        <OInput v-model="formData.etherpad" size="large" :max-length="255" placeholder="请输入Etherpad链接" />
      </OFormItem>

      <OFormItem label="会议日期" required field="date" :rules="selectPickerRules">
        <client-only>
          <el-date-picker
            v-model="formData.date"
            type="date"
            size="large"
            placeholder="请选择日期"
            :effect="isDark ? 'dark' : 'light'"
            value-format="YYYY-MM-DD"
            :style="{ width: '100%' }"
          />
        </client-only>
      </OFormItem>
      <OFormItem label="会议时间" required field="duration_time" :rules="selectTimeRules">
        <client-only>
          <div class="time-select">
            <el-time-select
              v-model="formData.start"
              :max-time="formData.end"
              placeholder="开始时间"
              start="08:00"
              end="23:30"
              step="00:15"
              size="large"
              :effect="isDark ? 'dark' : 'light'"
              :style="{ width: '120px' }"
            />
            <ODivider class="line" />
            <el-time-select
              v-model="formData.end"
              :min-time="formData.start"
              placeholder="结束时间"
              start="08:00"
              end="23:30"
              step="00:15"
              size="large"
              :effect="isDark ? 'dark' : 'light'"
              :style="{ width: '120px' }"
            />
            <OIcon class="time-icon"> <IconTime /> </OIcon>
          </div>
        </client-only>
      </OFormItem>
      <OFormItem label="会议平台" required field="platform" :rules="platformRules">
        <ORadioGroup v-model="formData.platform" :style="{ '--radio-group-gap': '8px' }">
          <ORadio v-for="item in platformOptions" :key="item" :value="item">
            {{ item }}
          </ORadio>
        </ORadioGroup>
      </OFormItem>

      <OFormItem label="会议内容" field="agenda">
        <OTextarea v-model="formData.agenda" placeholder="请输入会议内容" resize="none" :rows="4" size="large" :max-length="1000" :input-on-outlimit="false" />
      </OFormItem>

      <OFormItem field="is_record" class="record">
        <template #label>
          <div class="record-label">
            <span>录制会议</span>
            <OPopover position="top" style="max-width: 250px">
              <template #target>
                <OIcon class="tips"><IconHelp /></OIcon>
              </template>
              <div class="feedback-btn">
                若开启会议录制功能，会议开始后会自动开始录屏，并在会议结束后自动将录屏上传至B站openGuass账号下。录制服务由ZOOM提供。
              </div>
            </OPopover>
          </div>
        </template>
        <OSwitch v-model="formData.is_record" />
      </OFormItem>
      <OFormItem label="邮件地址" field="email_list" :rules="emailRules">
        <OTextarea
          v-model="formData.email_list"
          placeholder="请输入电子邮件地址，多个邮件地址之间以“;”间隔"
          resize="none"
          size="large"
          :rows="4"
          :max-length="1000"
          :input-on-outlimit="false"
        />
      </OFormItem>
    </OForm>
  </ODialog>
</template>

<style lang="scss" scoped>
.calendar-form {
  color: var(--o-color-info1);
  --form-label-main-gap: 0;
  width: 610px;
  margin: 0 auto;
  .o-input,
  .o-select,
  .o-textarea {
    width: 100%;
    @include text1;
  }

  :deep(.o-form-item) {
    margin-bottom: 24px;
    &.record {
      position: relative;
      .o-switch {
        @include respond-to('phone') {
          position: absolute;
          top: 0;
          right: 0;
        }
      }
    }
    .o-form-item-main-wrap {
      min-height: 40px;
    }
    .record-label {
      display: flex;
      align-items: center;
      .tips {
        cursor: pointer;
        font-size: 14px;
        color: var(--o-color-info2);
        margin-left: 4px;
      }
    }
    .o-form-item-label {
      height: 40px;
      margin: 0;
      color: var(--o-color-info2);
      @include respond-to('phone') {
        margin-bottom: 8px;
        height: auto;
        @include text2;
      }
    }

    .o-form-item-message {
      @include respond-to('phone') {
        padding-left: 15px;
        padding-right: 15px;
      }
    }
  }
  .el-date-editor {
    width: 320px;
    @include respond-to('phone') {
      width: 100%;
    }
  }
  .time-select {
    height: 40px;
    width: 100%;
    margin: 0;
    :deep(.o-divider) {
      width: 16px;
      --o-divider-bd-color: var(--o-color-control1);
    }
    :deep(.el-select) {
      @include text1;
      .el-select__wrapper {
        border: 0 none;
        min-height: auto;
        background: none;
        padding: 0;
        min-width: auto;
      }
      .el-select__prefix,
      .el-select__suffix {
        display: none;
      }
    }

    .el-form-item {
      margin-bottom: 0;
    }
  }
  .time-box {
    :deep(.o-form-require-symbol) {
      display: none;
    }
    :deep(.o-form-item-main-wrap) {
      flex-direction: column;
      align-items: flex-start;
    }
    @include respond-to('phone') {
      :deep(.o-form-item-label) {
        display: none;
      }
    }
  }
  .record-tips {
    margin-left: 12px;
    display: flex;
    align-items: center;
    @include text1;
    color: var(--o-color-info4);
    gap: 8px;
    @include respond-to('phone') {
      margin-left: 0;
    }
    .tips {
      color: var(--o-color-info4);
    }
  }
  :deep(.o-textarea) {
    --textarea-text-size: 16px;
    --textarea-text-height: 24px;
  }
}
</style>
