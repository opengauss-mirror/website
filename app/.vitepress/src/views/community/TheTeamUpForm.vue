<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vitepress';
import AppContent from '@/components/AppContent.vue';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { isTestEmail, isTestPhone } from '@/shared/utils';
import useWindowResize from '@/components/hooks/useWindowResize';
import { getUserAuth, doLogin } from '@/shared/login';
import { teamupApplyForm } from '@/api/api-community';

const router = useRouter();
const screenWidth = useWindowResize();
const isMobile = computed(() => (screenWidth.value <= 768 ? true : false));

const formData = reactive({
  scene: '',
  version: '',
  nodes: '',
  hardware: '',
  description: '',
  name: '',
  company: '',
  email: '',
  phone: '',
  acceptPrivacy: false,
});

const rules: FormRules = {
  scene: [
    {
      required: true,
      message: '请输入openGauss使用场景',
      trigger: 'blur',
    },
    {
      max: 50,
      message: '最多输入50个字符',
      trigger: 'blur',
    },
  ],
  version: [
    {
      required: true,
      message: '请输入使用openGauss版本信息',
      trigger: 'blur',
    },
    {
      max: 50,
      message: '最多输入50个字符',
      trigger: 'blur',
    },
  ],
  nodes: [
    {
      required: true,
      message: '请输入部署openGauss节点数',
      trigger: 'blur',
    },
    {
      max: 50,
      message: '最多输入50个字符',
      trigger: 'blur',
    },
  ],
  hardware: [
    {
      required: true,
      message: '请输入部署openGauss硬件信息',
      trigger: 'blur',
    },
    {
      max: 50,
      message: '最多输入50个字符',
      trigger: 'blur',
    },
  ],
  description: [
    {
      required: true,
      message: '请输入目前遇到的问题描述',
      trigger: 'blur',
    },
    {
      max: 500,
      message: '最多输入500个字符',
      trigger: 'blur',
    },
  ],
  name: [
    {
      required: true,
      message: '请输入申请人姓名',
      trigger: 'blur',
    },
    {
      max: 50,
      message: '最多输入50个字符',
      trigger: 'blur',
    },
  ],
  company: [
    {
      required: true,
      message: '请输入申请人单位',
      trigger: 'blur',
    },
    {
      max: 50,
      message: '最多输入50个字符',
      trigger: 'blur',
    },
  ],
  email: [
    {
      required: true,
      message: '请填写有效邮箱地址',
      validator: (rule: any, value: any, callback: any) => {
        if (!value || !isTestEmail(formData.email)) {
          return callback(new Error(value.message));
        }
        return callback();
      },
      trigger: 'blur',
    },
    {
      max: 50,
      message: '最多输入50个字符',
      trigger: 'blur',
    },
  ],
  phone: [
    {
      required: true,
      message: '请填写真实手机号码',
      validator: (rule: any, value: any, callback: any) => {
        if (!value || !isTestPhone(formData.phone)) {
          return callback(new Error(value.message));
        }
        return callback();
      },
      trigger: 'blur',
    },
  ],
};

const privacyPolicy = '/zh/privacy/';
const checkedPrivacyPolicy = ref(false);

const formRef = ref<FormInstance>();

const validateForm = () => {
  if (!checkedPrivacyPolicy.value) {
    isPrivacy.value = true;
    return;
  }
  formRef.value
    ?.validate((valid) => {
      if (valid) {
        if (checkedPrivacyPolicy.value) {
          formData.acceptPrivacy = checkedPrivacyPolicy.value;

          submitForm();
        } else {
          ElMessage({
            type: 'error',
            message: '请勾选隐私政策',
          });
        }
      }
    })
    .catch(() => {
      //nothing
    });
};

const isPrivacy = ref(false);
const submitForm = async () => {
  try {
    const res = await teamupApplyForm(formData);
    if (res.code === 200) {
      ElMessage({
        type: 'success',
        message: '申请成功！',
      });
      setTimeout(() => {
        formRef.value?.resetFields();
        checkedPrivacyPolicy.value = false;
        router.go('/zh/team-up/');
      }, 2000);
    } else {
      ElMessage({
        type: 'error',
        message: '申请提交失败！',
      });
    }
  } catch (_) {
    ElMessage({
      type: 'error',
      message: '申请提交失败！',
    });
  }
};

const { csrfToken } = getUserAuth();
</script>

<template>
  <AppContent :pc-top="40" :mobile-top="12">
    <div class="team-up-form">
      <div class="form-title">结队计划申请表</div>
      <el-form
        v-if="csrfToken"
        class="form"
        ref="formRef"
        :model="formData"
        :rules="rules"
        :label-width="isMobile ? '124px' : '212px'"
        label-position="left"
        status-icon
      >
        <el-form-item label="openGauss使用场景" prop="scene">
          <OInput v-model="formData.scene" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="使用openGauss版本信息" prop="version">
          <OInput v-model="formData.version" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="部署openGauss节点数" prop="nodes">
          <OInput v-model="formData.nodes" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="部署openGauss硬件信息" prop="hardware">
          <OInput v-model="formData.hardware" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="目前遇到的问题描述" prop="description">
          <OInput v-model="formData.description" placeholder="请输入" type="textarea" :autosize="{ minRows: 6 }" />
        </el-form-item>
        <el-form-item label="申请人姓名" prop="name">
          <OInput v-model="formData.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="申请人单位" prop="company">
          <OInput v-model="formData.company" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="申请人邮箱" prop="email">
          <OInput v-model="formData.email" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="申请人手机号" prop="phone">
          <OInput v-model="formData.phone" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <div class="privacy-box">
            <el-checkbox v-model="checkedPrivacyPolicy">
              <span>您理解并同意，请填写并提交的内容，即视为您已充分阅读并理解openGauss的</span>
              <a :href="privacyPolicy" target="_blank" rel="noopener noreferrer">《隐私政策》</a>
            </el-checkbox>
            <p v-if="isPrivacy && !checkedPrivacyPolicy" class="privacy-error">请勾选隐私政策</p>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="btn-wrap">
            <OButton type="primary" @click="validateForm"> 提交申请 </OButton>
          </div>
        </el-form-item>
      </el-form>

      <template v-else>
        <div class="auth-box">
          <OButton type="primary" @click="doLogin()">请先登录后，在填写</OButton>
        </div>
      </template>
    </div>
  </AppContent>
</template>

<style lan="scss" scoped>
.privacy-box {
  position: relative;
  .privacy-error {
    color: var(--el-color-danger);
    font-size: 12px;
    line-height: 1;
    padding-top: 2px;
    position: absolute;
    bottom: 0;
    left: 0;
  }
}

.team-up-form {
  background-color: var(--e-color-bg2);
  padding: 40px 56px 40px 46px;

  @media screen and (max-width: 768px) {
    padding: 16px;
  }

  .form-title {
    font-size: 32px;
    line-height: 44px;
    text-align: center;

    @media screen and (max-width: 768px) {
      font-size: var(--e-font-size-h8);
      line-height: var(--e-line-height-h8);
    }
  }

  .form {
    margin-top: 40px;

    @media screen and (max-width: 768px) {
      margin-top: 24px;
    }

    .el-form-item {
      margin-bottom: 24px;
    }

    .el-form-item__label {
      height: auto;
    }

    .el-checkbox {
      white-space: pre-wrap;
      align-items: flex-start;
    }

    :deep(.el-checkbox__label) {
      color: var(--e-color-text1);
    }

    .o-button {
      padding: 9px 20px;
      font-size: var(--e-font-size-text);
      line-height: var(--e-line-height-text);
    }
  }

  .auth-box {
    display: grid;
    place-items: center;
    padding: 64px 0;
  }
}
</style>
