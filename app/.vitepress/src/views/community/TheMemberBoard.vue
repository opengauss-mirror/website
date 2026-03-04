<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from '@/i18n';
import { useData } from 'vitepress';
import AppContent from '@/components/AppContent.vue';

import emailImg from '@/assets/category/member/toemail.svg';

import IconHome from '~icons/app/icon-home.svg';
import IconUser from '~icons/app/icon-user.svg';
import IconChevron from '~icons/app/icon-chevron-right.svg';

const i18n = useI18n();
const { lang } = useData();

// 移动端事件
const activeMobileIndex = ref(0);
const activeIndex = ref(0);
const handleChangeActiveMobile = (activeNames: number | '') => {
  if (activeNames !== '') {
    activeIndex.value = activeNames;
  }
};
</script>

<template>
  <AppContent>
    <div class="breadcrumb">
      <a class="last-page" :href="`/${lang}/member/`" rel="noopener noreferrer">
        {{ i18n.member.PAGE_TITLE }}
      </a>
      <span class="separtor"
        ><o-icon><icon-chevron></icon-chevron></o-icon
      ></span>
      <p class="current-page">{{ i18n.member.BOARD_TEXT }}</p>
    </div>
    <OCollapse v-model="activeMobileIndex" class="member-mobile" accordion @change="handleChangeActiveMobile">
      <OCollapseItem v-for="(item, index) in i18n.member.MEMBER_LIST_OLD" :key="item.ID" :name="index" class="member-panel">
        <template #title>
          <div class="member-mobile-title">
            {{ item.name }}
          </div>
        </template>
        <div class="member-mobile">
          <ul class="member-info lable-name">
            <li>
              <IconHome />
              <a :href="item.gitPath" target="_blank" rel="noopener noreferrer">{{ i18n.member.GIT_TEXT }}</a>
            </li>
            <li><IconUser />{{ item.nameText }}</li>
          </ul>
          <ul v-if="item.list.length > 0" class="member-list">
            <li v-for="(user, i) in item.list" :key="i">
              <img class="avatar" :src="user.img" :alt="user.name" />
              <p class="m-name lable-name">{{ user.name }}</p>
              <p class="m-title">{{ user.title }}</p>
              <p class="m-company" :class="user.wider" :title="user.company">
                {{ user.company }}
              </p>
              <p class="links lable-name">
                <a :href="'mailto:' + user.email" class="mail">
                  <img :src="emailImg" />
                </a>
              </p>
            </li>
          </ul>
        </div>
      </OCollapseItem>
    </OCollapse>
    <div v-for="item in i18n.member.MEMBER_LIST_OLD" :key="item.ID" class="member-panel member-pc">
      <h1 :id="item.id" class="member-title">
        {{ item.name }}
      </h1>
      <div class="member-panel-content">
        <ul class="member-info">
          <li>
            <IconHome />
            <a :href="item.gitPath" target="_blank" rel="noopener noreferrer">{{ i18n.member.GIT_TEXT }}</a>
          </li>
          <li><IconUser />{{ item.nameText }}</li>
        </ul>
        <ul v-if="item.list.length > 0" class="member-list">
          <li v-for="(user, i) in item.list" :key="i">
            <img class="avatar" :src="user.img" :alt="user.name" />
            <p class="m-name" :title="user.name">{{ user.name }}</p>
            <p class="m-title">{{ user.title }}</p>
            <p class="m-company lable-name1" :class="user.wider" :title="user.company">
              {{ user.company }}
            </p>
            <p class="links lable-name3">
              <a :href="'mailto:' + user.email" class="mail">
                <img :src="emailImg" />
              </a>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
.breadcrumb {
  color: var(--e-color-text1);
  background: var(--e-color-bg1);
  display: flex;
  @media screen and (max-width: 768px) {
    margin-bottom: var(--e-spacing-h5);
  }
  .last-page {
    color: var(--e-color-text4);
    font-size: var(--e-font-size-tip);
    line-height: var(--e-line-height-tip);
    cursor: pointer;
  }
  .separtor {
    margin: 0 var(--e-spacing-h10);
    .o-icon {
      color: var(--e-color-text1);
    }
  }
  .current-page {
    color: var(--e-color-text1);
    font-size: var(--e-font-size-tip);
    line-height: var(--e-line-height-tip);
  }
}
@include in-dark {
  .avatar {
    @include img-in-dark;
  }
}
.member-pc {
  display: block;
  @media screen and (max-width: 1100px) {
    display: none;
  }
}

.member-mobile {
  display: none;
  .member-panel {
    .member-list {
      grid-template-columns: repeat(4, 1fr);
      gap: var(--e-spacing-h5) var(--e-spacing-h3);
      @media screen and (max-width: 767px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
  .member-subitem {
    margin-bottom: var(--e-spacing-h5);
    padding: var(--e-spacing-h5);
    background: var(--e-color-bg2);
  }
  .member-mobile {
    padding: var(--e-spacing-h5);
    &-title {
      font-size: var(--e-font-size-h8);
      line-height: var(--e-line-height-h8);
    }
  }
  :deep(.el-collapse-item__content) {
    padding: 0 !important;
  }
  @media screen and (max-width: 1100px) {
    display: block;
  }
}
.tab-box {
  background-color: var(--e-color-bg2);
  display: flex;
  top: 80px;
  width: 100%;
  z-index: 9;
  position: sticky;
  align-items: flex-end;
  justify-content: center;
  border-bottom: 1px solid var(--e-color-division1);
  @media (max-width: 1100px) {
    top: 48px;
  }
  @media (max-width: 768px) {
    display: none;
  }
  :deep(.el-tabs__header) {
    margin: 0px;
  }

  :deep(.el-tabs) {
    --el-tabs-header-height: var(--e-line-height-h3);
    @media (max-width: 768px) {
      --el-tabs-header-height: 34px;
    }
  }

  :deep(.el-tabs__item) {
    font-size: var(--e-font-size-h8);
    line-height: var(--e-line-height-h8);
    padding-bottom: var(--e-spacing-h6);
    padding-top: var(--e-spacing-h6);
    @media (max-width: 768px) {
      font-size: var(--e-font-size-text);
      line-height: var(--e-line-height-text);
      padding-bottom: var(--e-spacing-h10);
      padding-top: var(--e-spacing-h10);
    }
  }

  :deep(.is-active) {
    color: var(--e-color-brand1);
  }
}
.member-panel {
  &:not(:last-child) {
    margin: 0 0 var(--e-spacing-h1);
    @media screen and (max-width: 1100px) {
      margin: 0;
    }
  }

  .member-title {
    text-align: center;
    font-size: var(--e-font-size-h3);
    color: var(--e-color-text1);
    line-height: var(--e-line-height-h3);
    margin-bottom: var(--e-spacing-h2);
    &::before {
      content: '';
      display: block;
      height: 180px;
      margin-top: -180px;
      visibility: hidden;
      @media screen and (max-width: 768px) {
        height: 120px;
        margin-top: -120px;
      }
    }
  }
  .sub-title {
    font-size: var(--e-font-size-h5);
    color: var(--e-color-text1);
    line-height: var(--e-line-height-h5);
    margin-bottom: var(--e-spacing-h5);
    font-weight: 300;
    @media screen and (max-width: 768px) {
      font-size: var(--e-font-size-h8);
      line-height: var(--e-line-height-h8);
      margin-bottom: var(--e-spacing-h7);
    }
  }
  &-content {
    padding: var(--e-spacing-h2) 166px;
    box-shadow: var(--e-shadow-l1);
    background: var(--e-color-bg2);
    @media screen and (max-width: 1439px) {
      padding: var(--e-spacing-h2) var(--e-spacing-h1);
    }
  }
  .member-info {
    li {
      display: flex;
      align-items: center;
      margin-bottom: var(--e-spacing-h5);
      font-size: var(--e-font-size-text);
      color: var(--e-color-text4);
      line-height: var(--e-line-height-h8);
      @media screen and (max-width: 768px) {
        font-size: var(--e-font-size-tip);
        line-height: var(--e-line-height-tip);
        margin-bottom: var(--e-spacing-h9);
      }
      svg {
        width: var(--e-font-size-h5);
        height: var(--e-font-size-h5);
        color: var(--e-color-text4);
        margin-right: var(--e-spacing-h8);
      }
    }
  }
  .member-list {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: var(--e-spacing-h5) var(--e-spacing-h1);
    li {
      vertical-align: top;
      text-align: center;
      p {
        font-size: var(--e-font-size-tip);
        color: var(--e-color-text4);
        line-height: var(--e-line-height-tip);
        margin-top: var(--e-spacing-h10);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .links {
        margin-top: var(--e-spacing-h9);
        display: flex;
        gap: var(--e-spacing-h9);
        justify-content: center;
        align-items: center;
      }
      .m-name {
        font-size: var(--e-font-size-h8);
        color: var(--e-color-text1);
        line-height: var(--e-line-height-h8);
      }
      .wider {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .avatar {
        border-radius: 50%;
        max-width: 100px;
      }
    }
  }
  .gap {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--e-font-size-h5);
    .member-panel-content {
      padding: var(--e-spacing-h2) var(--e-spacing-h1);
      @media screen and (max-width: 1439px) {
        padding: var(--e-spacing-h2);
      }
    }
    .member-list {
      grid-template-columns: repeat(4, 1fr);
      gap: var(--e-spacing-h5) 56px;
      @media screen and (max-width: 1439px) {
        grid-template-columns: repeat(3, 1fr);
        gap: var(--e-spacing-h5);
      }
    }
  }
  .other {
    h4 {
      font-size: 24px;
      font-weight: 300;
      margin-bottom: 20px;
    }
  }
}
.board-view {
  text-align: center;
  margin-top: 24px;
  .o-button {
    padding: 0;
    svg {
      color: var(--e-color-brand1);
      width: var(--e-font-size-h8);
      height: var(--e-font-size-h8);
    }
  }
}
</style>
