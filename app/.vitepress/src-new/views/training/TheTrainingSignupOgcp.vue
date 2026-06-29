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
    title: 'openGauss产品架构',
    guide: ['系统架构', '软件架构', '逻辑架构', '线程架构'],
  },
  {
    title: '数据库对象管理',
    guide: ['系统表和系统视图', '物化视图', '对象权限管理', '定时任务'],
  },
  {
    title: '数据库安全管理',
    guide: ['客户端接入认证', '用户及角色', '数据库审计', '密态等值查询', '账本数据库', '透明数据加密'],
  },
  {
    title: 'SQL进阶',
    guide: ['存储过程与触发器', '多表连接', '约束', '表清理'],
  },
  {
    title: '数据库系统管理',
    guide: ['日程检查', '操作系统及openGauss健康检查', '备份恢复管理', '容灾管理'],
  },
  {
    title: '数据库迁移管理',
    guide: ['数据迁移概述', 'openGauss迁移工具', '异构数据库语法差异', 'MySQL数据库迁移实践'],
  },
];
</script>

<template>
  <div style="display: flow-root">
    <!-- 认证体系介绍 -->
    <AppSection class="first-section">
      <OBreadcrumb v-show="gtPhone">
        <OBreadcrumbItem href="/zh/training/"> 培训认证 </OBreadcrumbItem>
        <OBreadcrumbItem> 中级OGCP </OBreadcrumbItem>
      </OBreadcrumb>
      <div class="title-banner">
        <h1 class="title">中级OGCP</h1>
        <p class="desc">课程深入原理与实战，覆盖产品架构、SQL进阶、安全管理、对象与迁移管理等领域，系统提升学员的专业运维与能力。</p>
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
              <p class="entry-list-item-desc">openGauss中级OGCP认证课程</p>
              <OButton
                class="signup-btn"
                color="primary"
                round="pill"
                variant="solid"
                href="https://www.modb.pro/course/190"
                target="_blank"
                rel="noopener noreferrer"
              >
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
              <p class="entry-list-item-desc">openGauss中级认证（线上）</p>
              <OButton
                class="signup-btn"
                color="primary"
                round="pill"
                variant="solid"
                href="https://education.vastdata.com.cn/pc/#/index/examDetails?id=d390ee1681bee5db4377244753ae35a4&type=1"
                target="_blank"
                rel="noopener noreferrer"
              >
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
              <p class="entry-list-item-desc">openGauss中级认证（线下）</p>
              <OButton
                class="signup-btn"
                color="primary"
                round="pill"
                variant="solid"
                href="https://education.vastdata.com.cn/pc/#/index/examDetails?id=481091b9b846d5c506d0f0695215f184&type=1"
                target="_blank"
                rel="noopener noreferrer"
              >
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
              <p class="entry-list-item-desc">oppenGauss中级认证</p>
              <OButton
                class="signup-btn"
                color="primary"
                round="pill"
                variant="solid"
                href="http://shentongdata.com/index.php/course/exam-58"
                target="_blank"
                rel="noopener noreferrer"
              >
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
              <p class="entry-list-item-desc">中级OGCP认证</p>
              <OButton
                class="signup-btn"
                color="primary"
                round="pill"
                variant="solid"
                href="https://www.eduplus.net/training/openGauss"
                target="_blank"
                rel="noopener noreferrer"
              >
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
              <p class="entry-list-item-desc">中级OGCP认证</p>
              <OButton
                class="signup-btn"
                color="primary"
                round="pill"
                variant="solid"
                href="https://bigdata.10086.cn/honghu/hhweb/#/certify"
                target="_blank"
                rel="noopener noreferrer"
              >
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
  background-image: url('/category/training/ogcp_signup.png');
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
    background-image: url('/category/training/ogcp_item_bg.png');
    margin-top: 12px;
    --content-gap: 8px;
    height: 122px;
    padding: 12px;
  }
}

@include in-dark {
  .title-banner {
    background-image: url('/category/training/ogcp_signup_dark.png');
  }
}

.o-card {
  --card-radius: 4px;

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
