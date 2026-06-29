<script setup lang="ts">
import { useCommon } from '@/stores/common';
import { OBreadcrumb, OBreadcrumbItem, OButton, OCard, OCollapse, OCollapseItem, OIcon } from '@opensig/opendesign';
import IconOutlink from '~icons/app-new/icon-out-link.svg';
import AppSection from '~@/components/AppSection.vue';
import { useScreen } from '~@/composables/useScreen';

import yshl from '@/assets/category/authentication/training/img/talent/yshl.png';
import vastdata from '@/assets/category/authentication/training/img/talent/vastdata.png';
import sz from '@/assets/category/authentication/training/img/talent/sz.png';
import qst from '@/assets/category/authentication/training/img/talent/qst.png';
import ChinaMobile from '@/assets/category/authentication/training/img/talent/china_mobile_2.png';
import ChinaMobileDark from '@/assets/category/authentication/training/img/talent/china_mobile_2_dark.png';
import yshlDark from '@/assets/category/authentication/training/img/talent/yshl_dark.png';
import vastdataDark from '@/assets/category/authentication/training/img/talent/vastdata_dark.png';
import szDark from '@/assets/category/authentication/training/img/talent/sz_dark.png';
import qstDark from '@/assets/category/authentication/training/img/talent/qst_dark.png';
import { computed } from 'vue';

const commonStore = useCommon();
const { gtPhone } = useScreen();
const isDark = computed(() => commonStore.theme === 'dark');

const courseGuides = [
  {
    title: '数据库技术发展概述',
    guide: [
      '数据库系统概述',
      '数据库技术发展的三个阶段',
      '数据模型介绍:层次、网状、关系模型',
      '非关系型数据库:NoSQL、NewSQL、图、时序、文档数据库',
      '国产数据库的发展概况',
      '华为云数据库的发展历程与组成',
      '华为云数据库与openGauss的关系',
    ],
  },
  {
    title: 'openGauss数据库与新特性',
    guide: [
      'PostgreSQL的发展历程与概述',
      'openGauss应用场景、运行环境和技术指标',
      'openGauss的基本功能和企业级增强特性',
      '开源产品的未来',
      'openGauss 2.0.0新特性',
    ],
  },
  {
    title: '安装、卸载与客户端工具',
    guide: [
      'openGauss2.0.0标准安装的环境规划、准备、安装以及验证与参数优化',
      'openGauss2.0.0极简安装的环境准备、配置和安装、验证',
      'openGauss2.0.0容器版安装和安装后验证',
      'openGauss2.0.0的卸载',
      '掌握数据库连接工具GSQL的使用和常用语法',
      '图形工具DataStudio安装、使用',
    ],
  },
  {
    title: '数据库体系概述',
    guide: ['内存结构', '线程结构', '存储结构'],
  },
  {
    title: 'openGauss基本管理与SQL',
    guide: ['数据库启动、关闭与状态查看', '数据库监听管理与连接机制', '表空间管理', '数据库管理', '用户管理', 'DQL语句/DDL语句/DML语/DCL语句'],
  },
];

</script>

<template>
  <div style="display: flow-root">
    <!-- 认证体系介绍 -->
    <AppSection class="first-section">
      <OBreadcrumb v-show="gtPhone">
        <OBreadcrumbItem href="/zh/training/"> 培训认证 </OBreadcrumbItem>
        <OBreadcrumbItem> 初级OGCA </OBreadcrumbItem>
      </OBreadcrumb>
      <div class="title-banner">
        <h1 class="title">初级OGCA</h1>
        <p class="desc">课程以原理与实践相结合，涵盖数据库概论、openGauss简介、体系结构、运维基础、SQL等内容，由浅入深系统讲解基础技能</p>
      </div>
    </AppSection>

    <AppSection class="signup-entry">
      <OCard>
        <template #header>
          <h2 class="entry-title">报名入口</h2>
        </template>
        <p class="entry-title-desc">
          为了方便学员参加openGauss培训认证，openGauss开源社区优选了多家业界资深的数据库培训认证机构作为培训认证合作伙伴，并为相关合作授权。<br />
          当前已经授权如下合作伙伴，选择任一合作伙伴即可跳转至培训认证报名页面。
        </p>
        <ul>
          <li class="entry-list-item">
            <div class="entry-list-item-wrapper">
              <div class="img-container">
                <img :src="isDark ? yshlDark : yshl" alt="" />
              </div>
              <p class="entry-list-item-desc">openGauss初级OGCA认证课程</p>
              <OButton class="signup-btn" color="primary" round="pill" variant="solid" href="https://www.modb.pro/course/144" target="_blank" rel="noopener noreferrer">
                立即报名
                <template #suffix
                  ><OIcon><IconOutlink /></OIcon>
                </template>
              </OButton>
            </div>
          </li>
          <li class="entry-list-item">
            <div class="entry-list-item-wrapper">
              <div class="img-container">
                <img :src="isDark ? vastdataDark : vastdata" alt="" />
              </div>
              <p class="entry-list-item-desc">初级OGCA考试</p>
              <OButton class="signup-btn" color="primary" round="pill" variant="solid" href="https://education.vastdata.com.cn/pc/#/index/examDetails?id=35dcb340785ab1b3546521ef6407b9c8&type=1" target="_blank" rel="noopener noreferrer">
                立即报名
                <template #suffix
                  ><OIcon><IconOutlink /></OIcon>
                </template>
              </OButton>
            </div>
          </li>
          <li class="entry-list-item">
            <div class="entry-list-item-wrapper">
              <div class="img-container">
                <img :src="isDark ? szDark : sz" alt="" />
              </div>
              <p class="entry-list-item-desc">初级OGCA认证</p>
              <OButton class="signup-btn" color="primary" round="pill" variant="solid" href="http://shentongdata.com/index.php/course/exam-58" target="_blank" rel="noopener noreferrer">
                立即报名
                <template #suffix
                  ><OIcon><IconOutlink /></OIcon>
                </template>
              </OButton>
            </div>
          </li>
          <li class="entry-list-item">
            <div class="entry-list-item-wrapper">
              <div class="img-container">
                <img :src="isDark ? qstDark : qst" alt="" />
              </div>
              <p class="entry-list-item-desc">初级OGCA认证</p>
              <OButton class="signup-btn" color="primary" round="pill" variant="solid" href="https://www.eduplus.net/training/openGauss" target="_blank" rel="noopener noreferrer">
                立即报名
                <template #suffix
                  ><OIcon><IconOutlink /></OIcon>
                </template>
              </OButton>
            </div>
          </li>
          <li class="entry-list-item">
            <div class="entry-list-item-wrapper">
              <div class="img-container">
                <img :src="isDark ? ChinaMobileDark : ChinaMobile" alt="" />
              </div>
              <p class="entry-list-item-desc">初级OGCA认证</p>
              <OButton class="signup-btn" color="primary" round="pill" variant="solid" href="https://bigdata.10086.cn/honghu/hhweb/#/certify" target="_blank" rel="noopener noreferrer">
                立即报名
                <template #suffix
                  ><OIcon><IconOutlink /></OIcon>
                </template>
              </OButton>
            </div>
          </li>
        </ul>
      </OCard>
    </AppSection>

    <AppSection>
      <OCard class="course-guide">
        <template #header>
          <h2 class="guide-title">课程大纲</h2>
        </template>

        <OCollapse>
          <OCollapseItem v-for="(item, index) in courseGuides" :value="item.title" :key="item.title">
            <template #title>{{ index + 1 }}、 {{ item.title }}</template>
            <ul>
              <li v-for="subItem in item.guide" :key="subItem">
                {{ subItem }}
              </li>
            </ul>
          </OCollapseItem>
        </OCollapse>
      </OCard>
    </AppSection>
  </div>
</template>
<style lang="scss" scoped>
.app-section {
  --o-gap-section: 32px;

  @include respond-to('laptop') {
    --o-gap-section: 24px;
  }

  @include respond-to('pad_h') {
    --o-gap-section: 16px;
  }

  @include respond-to('pad_v') {
    --o-gap-section: 12px;
  }

  @include respond-to('phone') {
    --o-gap-section: 12px;
  }
}

.title-banner {
  padding: 32px;
  --content-gap: 16px;
  height: 160px;
  border-radius: 4px;
  background-image: url('/category/training/ogca_signup.png');
  background-position: bottom right;
  background-size: cover;
  margin-top: 25px;

  .title {
    @include h1;
    font-weight: 600;
    margin-bottom: var(--content-gap);
  }

  .desc {
    font-size: 16px;
    color: var(--o-color-info2);
    @include respond-to('<=pad_v') {
      font-size: 14px;
    }
  }

  @include respond-to('laptop') {
    margin-top: 16px;
    --content-gap: 12px;
    height: 132px;
    padding: 24px;
  }

  @include respond-to('pad_h') {
    margin-top: 12px;
    --content-gap: 8px;
    height: 110px;
    padding: 16px;
  }

  @include respond-to('pad_v') {
    margin-top: 12px;
    --content-gap: 8px;
    height: 100px;
    padding: 12px;
  }

  @include respond-to('phone') {
    background-image: url('/category/training/ogca_item_bg.png');
    margin-top: 12px;
    --content-gap: 8px;
    height: 122px;
    padding: 12px;
  }
}

@include in-dark {
  .title-banner {
    background-image: url('/category/training/ogca_signup-dark.png');
  }
}

.o-card {
  --card-radius: 4px;

  --card-main-padding-v: var(--card-main-padding-h);

  @include respond-to('laptop') {
    --card-main-padding: 24px;
  }

  @include respond-to('pad_h') {
    --card-main-padding: 16px;
  }

  @include respond-to('pad_v') {
    --card-main-padding: 12px;
  }

  @include respond-to('phone') {
    --card-main-padding: 12px;
  }
}

.signup-entry {
  --title-desc-gap: 16px;
  --title-list-gap: 24px;
  --list-item-pading: 24px;
  --list-item-content-gap: 32px;
  --list-item-img-width: 140px;

  --list-item-img-container-w: 200px;
  --list-item-img-container-h: 78px;

  .entry-title {
    @include h2;
    font-weight: 600;
    margin-bottom: var(--title-desc-gap);
  }

  .entry-title-desc {
    color: var(--o-color-info2);
    @include text1;
    @include respond-to('<=pad_v') {
      font-size: 14px;
    }
  }

  .entry-list-item {
    padding-top: var(--list-item-pading);
    padding-bottom: var(--list-item-pading);
    border-top: 1px solid var(--o-color-control4);
    --wrapper-bg-color: transparent;

    img {
      width: var(--list-item-img-width);
    }

    @include respond-to('phone') {
      --wrapper-bg-color: rgba(var(--o-mixedgray-2), 0.6);
    }

    &:first-child {
      margin-top: var(--title-list-gap);
    }

    &:last-child {
      padding-bottom: 0;
    }
  }

  .entry-list-item-wrapper {
    display: flex;
    align-items: center;
    background-color: var(--wrapper-bg-color);
    @include respond-to('phone') {
      display: block;
      padding: 14px 24px;
    }
  }

  .img-container {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background-color: rgba(var(--o-mixedgray-2), 0.6);
    width: var(--list-item-img-container-w);
    height: var(--list-item-img-container-h);
    margin-right: var(--list-item-content-gap);

    @include respond-to('phone') {
      padding: 0;
      display: block;
      background-color: unset;
      margin-right: 0;
      width: auto;
      height: auto;
      margin-bottom: var(--list-item-content-gap);
    }
  }

  .entry-list-item-desc {
    font-weight: 600;
    @include h3;
    @include respond-to('phone') {
      font-size: 14px;
    }
  }

  .signup-btn {
    margin-left: auto;

    @include respond-to('phone') {
      margin-top: 16px;
    }
  }

  @include respond-to('laptop') {
    --title-desc-gap: 12px;
    --title-list-gap: 16px;
    --list-item-pading: 16px;
    --list-item-content-gap: 24px;
    --list-item-img-width: 112px;

    --list-item-img-container-w: 160px;
    --list-item-img-container-h: 58px;
  }

  @include respond-to('pad_h') {
    --title-desc-gap: 8px;
    --title-list-gap: 12px;
    --list-item-pading: 12px;
    --list-item-content-gap: 16px;
    --list-item-img-width: 112px;

    --list-item-img-container-w: 144px;
    --list-item-img-container-h: 48px;
  }

  @include respond-to('pad_v') {
    --title-desc-gap: 8px;
    --title-list-gap: 12px;
    --list-item-pading: 12px;
    --list-item-content-gap: 12px;
    --list-item-img-width: 98px;

    --list-item-img-container-w: 122px;
    --list-item-img-container-h: 40px;
  }

  @include respond-to('phone') {
    --title-desc-gap: 8px;
    --title-list-gap: 12px;
    --list-item-pading: 12px;
    --list-item-content-gap: 6px;
    --list-item-img-width: 98px;

    --list-item-img-container-w: 98px;
    --list-item-img-container-h: 28px;
  }
}

.course-guide {
  .guide-title {
    @include h2;
    font-weight: 600;
    margin-bottom: var(--title-desc-gap);
  }

  .o-collapse {
    --collapse-padding: 0;
  }

  ul {
    padding-left: 32px;
    list-style: disc;

    @include respond-to('laptop') {
      padding-left: 30px;
    }

    @include respond-to('pad_h') {
      padding-left: 30px;
    }

    @include respond-to('pad_v') {
      padding-left: 24px;
    }

    @include respond-to('phone') {
      padding-left: 0;
    }
  }
}
</style>
