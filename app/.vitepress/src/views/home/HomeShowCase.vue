<script setup lang="ts">
import { onMounted, ref, computed, onUnmounted } from 'vue';
import { useData } from 'vitepress';
import { useCommon } from '@/stores/common';

import IconArrowRight from '~icons/app/icon-arrow-right.svg';

import ShowCaseData from '@/data/showcase';
import { getUserCaseData } from '@/api/api-showcase';
import { CaseDataT } from '@/shared/@types/type-home';

import { useI18n } from '@/i18n';
import { handleError } from '@/shared/utils';

const i18n = useI18n();
const { lang } = useData();
const commonStore = useCommon();
const caseRef = ref<HTMLElement>();
const caseData: any = ref({});
const active = ref(0);
const activeMobile = ref(0);

const handleGo = (path: string) => {
  window.open(path.replace(/(index)$/g, ''), '_blank');
};

const timer = ref();

const changeActive = (index: number) => {
  active.value = index;
  activeMobile.value = index;
};

const changeActiveMobile = (activeNames: any) => {
  if (activeNames !== '') {
    active.value = activeNames;
  }
};
const data = ref({
  page: 1,
  pageSize: 10000,
  lang: lang.value,
  type: 'showcase',
});
const initData = () => {
  const result: any = {};
  getUserCaseData(data.value).then((res: any) => {
    if (res.obj && res.obj.records.length) {
      const caseListAll = res.obj.records.filter((item: any) => {
        return item.path !== 'userPractice/index';
      });
      caseListAll.forEach((item: { id: string }) => {
        if (typeof result[item.id] === 'undefined') {
          result[item.id] = [];
        }
        if (result[item.id].length < 2) {
          result[item.id].push(item);
        }
      });
      caseData.value = result;
    }
  });
};
const imgUrl = computed(() => (item: { urlDark: string; url: string }) => {
  return commonStore.theme === 'dark' ? item.urlDark : item.url;
});

const imgUrlHover = computed(
  () => (item: { activeDarkUrl: string; activeUrl: string }) => {
    return commonStore.theme === 'dark' ? item.activeDarkUrl : item.activeUrl;
  }
);

const changeCase = () => {
  active.value === ShowCaseData.length - 1
    ? (active.value = 0)
    : active.value++;
};

const setCaseInterval = () => {
  timer.value = setInterval(changeCase, 5000);
};
const clearCaseInterval = () => {
  clearInterval(timer.value);
};

onMounted(() => {
  ShowCaseData.length && initData();

  try {
    if (caseRef.value) {
      setCaseInterval();
      caseRef.value.addEventListener('mouseover', clearCaseInterval);
      //鼠标移出继续
      caseRef.value.addEventListener('mouseout', setCaseInterval);
    }
  } catch {
    handleError('Error!');
  }
});
onUnmounted(() => {
  timer.value.clearInterval;
  caseRef.value?.removeEventListener('mouseover', clearCaseInterval);
  caseRef.value?.removeEventListener('mouseout', setCaseInterval);
});
</script>

<template>
  <div class="case-main">
    <h3>{{ i18n.home.USER_TITLE }}</h3>
    <OContainer ref="userCase" :level-index="1" class="container">
      <OCollapse
        v-model="activeMobile"
        accordion
        class="case-mobile"
        @change="changeActiveMobile"
      >
        <OCollapseItem
          v-for="(item, index) in ShowCaseData"
          :key="item.type"
          class="case-mobile-list"
          :name="index"
        >
          <template #title>
            <div class="case-mobile-card-content">
              <div class="case-mobile-title">
                <img
                  class="case-mobile-img"
                  :src="
                    commonStore.theme === 'dark'
                      ? index === activeMobile
                        ? item.activeDarkUrl
                        : item.urlDark
                      : index === activeMobile
                      ? item.activeUrl
                      : item.url
                  "
                  :alt="lang === 'zh' ? item.type : item.typeEn"
                />
                <div class="case-mobile-word">
                  {{ lang === 'zh' ? item.type : item.typeEn }}
                </div>
              </div>
            </div>
          </template>
          <div class="user-mobile">
            <div
              v-for="user in caseData && caseData[item.typeEn]"
              :key="user.company"
              class="user-card"
              @click="handleGo(user.officialpath)"
            >
              <div class="user-title">{{ user.company }}</div>
              <div class="user-word">{{ user.summary }}</div>
            </div>
          </div>
        </OCollapseItem>
      </OCollapse>
      <div ref="caseRef" class="case">
        <OCard class="case-card" shadow="never">
          <div class="case-tab">
            <div
              v-for="(item, index) in ShowCaseData"
              :key="item.type"
              class="case-tab-item"
              @click="changeActive(index)"
            >
              <div
                class="case-img-box"
                :class="active === index ? 'active' : ''"
              >
                <img
                  :src="imgUrl(item)"
                  :alt="lang === 'zh' ? item.type : item.typeEn"
                  class="nav-item-icon"
                />
                <img
                  :src="imgUrlHover(item)"
                  :alt="lang === 'zh' ? item.type : item.typeEn"
                  class="nav-item-icon-hover"
                />
              </div>
              <div :class="['case-word', active === index ? 'active' : '']">
                {{ lang === 'zh' ? item.type : item.typeEn }}
              </div>
            </div>
          </div>
          <div class="case-user">
            <div
              v-for="item2 in caseData && caseData[ShowCaseData[active].typeEn]"
              :key="item2.company"
              class="user-card"
              @click="handleGo(item2.officialpath)"
            >
              <div class="user-title">{{ item2.company }}</div>
              <div class="user-word">{{ item2.summary }}</div>
            </div>
          </div>
        </OCard>
      </div>
      <div class="case-more">
        <a :href="`/${lang}/userPractice/?industry=${active + 1}`">
          <OButton animation type="text" class="case-more-item">
            {{ i18n.common.VIEW_MORE }}
            <template #suffixIcon>
              <IconArrowRight class="case-more-icon"></IconArrowRight>
            </template>
          </OButton>
        </a>
      </div>
    </OContainer>
  </div>
</template>

<style lang="scss" scoped>
.case-main {
  margin-bottom: var(--o-spacing-h1);
  @media (max-width: 768px) {
    margin-bottom: var(--o-spacing-h2);
  }
  h3 {
    font-size: var(--o-font-size-h3);
    font-weight: 300;
    color: var(--o-color-text1);
    line-height: var(--o-line-height-h3);
    width: 100%;
    text-align: center;
    @media (max-width: 768px) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
      margin-bottom: var(--o-spacing-h5);
    }
  }
}

.container {
  @media screen and (max-width: 1100px) {
    box-shadow: none;
    background: none;
    .o-collapse-item {
      box-shadow: var(--o-shadow-l1);
    }
  }
}
.case-mobile {
  display: none;
  background-color: var(--o-color-bg1);
  @media (max-width: 1100px) {
    border-top: none;
    display: block;
    box-shadow: none;
  }

  &-list {
    margin-top: var(--o-spacing-h4);
    @media (max-width: 768px) {
      margin-top: 0;
    }

    :deep(.el-collapse-item__header) {
      height: 100%;
      padding: var(--o-spacing-h5);
      @media (max-width: 768px) {
        padding: var(--o-spacing-h8);
      }
    }
  }

  &-title {
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
  }

  &-word {
    margin-left: var(--o-spacing-h8);
    font-size: var(--o-font-size-h5);
    line-height: var(--o-line-height-h5);
    font-weight: 400;
    color: var(--o-color-text1);
    @media (max-width: 768px) {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
  }

  &-img {
    width: 40px;
    height: 40px;
    color: var(--o-color-text1);
  }

  &-card {
    margin-top: var(--o-spacing-h5);
    width: 100%;
    border-left: 2px solid var(--o-color-brand1);
    &-content {
      display: flex;
      flex-flow: row;
      justify-content: space-between;
      align-items: center;
    }
  }

  &-icon {
    font-size: var(--o-font-size-h8);
    color: var(--o-color-text4);
  }
}
.user {
  &-mobile {
    background-color: var(--o-color-bg4);
    > :nth-child(1) {
      margin-top: 0px;
    }
  }
  &-card {
    cursor: pointer;
    padding: var(--o-spacing-h5);
    width: 100%;
    height: 100%;
    background: var(--o-color-bg1);
    border: 1px solid rgba(0, 0, 0, 0);

    @media (max-width: 1100px) {
      background: var(--o-color-bg2);
      margin-top: var(--o-spacing-h8);
    }

    @media (max-width: 768px) {
      padding: var(--o-spacing-h8);
    }
  }

  &-card:hover {
    @media (min-width: 1100px) {
      background-color: var(--o-color-bg2);
      border: 1px solid var(--o-color-brand1);
      transition: 0.3s all;
    }
  }

  &-title {
    font-size: var(--o-font-size-h7);
    font-weight: 500;
    line-height: var(--o-line-height-h7);
    color: var(--o-color-text1);
    @media (max-width: 768px) {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
  }

  &-word {
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
    font-weight: 400;
    color: var(--o-color-text4);
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1; // 设置两行文字溢出
    -webkit-box-orient: vertical;
    @media (max-width: 768px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
  }
}
.case {
  display: block;
  @media (max-width: 1100px) {
    display: none;
  }

  &-main {
    :deep(.el-collapse) {
      border: none;
    }

    :deep(.el-collapse-item__header) {
      border-left: 2px solid var(--o-color-brand1);
    }
  }

  &-more {
    display: flex;
    padding: var(--o-spacing-h4) 0;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 1000px) {
      padding: var(--o-spacing-h5) 0 0;
      font-size: 12px;
      .o-button {
        font-size: 14px;
      }
    }

    :deep(.o-button) {
      padding: 0;
    }

    &-icon {
      color: var(--o-color-brand1);
      width: var(--o-font-size-h8);
      height: var(--o-font-size-h8);
    }
  }

  &-user {
    margin-top: var(--o-spacing-h2);
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding-bottom: var(--o-spacing-h2);
    grid-gap: var(--o-spacing-h4) var(--o-spacing-h2);
    border-bottom: 1px solid var(--o-color-division1);
  }

  &-card {
    margin-top: var(--o-spacing-h2);
    width: 100%;
    padding: 20px 20px 0;
    box-shadow: none !important;
  }

  &-img {
    margin-top: var(--o-spacing-h5);
    width: 80px;
    height: 80px;
    color: white;
  }

  &-word {
    font-size: var(--o-font-size-h5);
    font-weight: 500;
    color: var(--o-color-text1);
    line-height: var(--o-line-height-h5);
    margin-top: 2px;
  }

  &-tab {
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
    &-item {
      cursor: pointer;
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      margin: 0px 28px;
      .nav-item-icon-hover {
        width: 80px;
        display: none;
      }
      .nav-item-icon {
        display: block;
      }
      &:hover {
        @media screen and (min-width: 1100px) {
          .nav-item-icon-hover {
            display: block;
          }
          .nav-item-icon {
            display: none;
          }
          .nav-text {
            .nav-title,
            .nav-descriptive {
              color: var(--o-color-brand1);
            }
          }
          .case-word {
            color: var(--o-color-brand1);
          }
        }
      }
      .active {
        .nav-item-icon-hover {
          display: block;
        }
        .nav-item-icon {
          display: none;
        }
      }
    }
  }
}
.pc-height {
  height: 500px;
}
.is-show {
  display: block;
}

.active {
  color: var(--o-color-brand1);
}
</style>
