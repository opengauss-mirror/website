<script lang="ts" setup>
import { computed, ref, Ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from '@/i18n';
import { useData } from 'vitepress';
import AppContent from '@/components/AppContent.vue';
import BannerLevel2 from '@/components/BannerLevel2.vue';

import banner from '@/assets/illustrations/banner-secondary.png';
import illustration from '@/assets/illustrations/member.png';
import emailImg from '@/assets/category/member/toemail.svg';
import gitImg from '@/assets/category/member/git.svg';

import IconHome from '~icons/app/icon-home.svg';
import IconMail from '~icons/app/icon-mail.svg';
import IconUser from '~icons/app/icon-user.svg';
import IconArrowRight from '~icons/app/icon-arrow-right.svg';

const i18n = useI18n();
const { lang } = useData();

const tabShow = ref(0);
const tabIndex = ref(0);

const anchor = computed(() => {
  return i18n.value.member.MEMBER_LIST.map((item: any) => item.id);
});
// 用于存放dom元素以方便识别滚动距离进而改变导航栏
const navRef: Ref<Array<HTMLElement | undefined>> = ref([]);
const navTitle = (el: any) => {
  navRef.value.push(el);
};
function selectTab(e: any) {
  tabIndex.value = e.index - 0;
  handleScroll(e.index - 0);
}
const handleScroll = (index: number) => {
  const element = document.getElementById(anchor.value[index]) as HTMLElement;

  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// 根据滚动激活导航
const scroll = () => {
  const scrollTop =
    document.body.scrollTop || document.documentElement.scrollTop;
  const activeList: Array<number> = [];
  navRef.value.forEach((item: any, index: number) => {
    if (scrollTop > item.offsetTop - 10) {
      activeList.push(index);
    }
  });
  tabShow.value = activeList[activeList.length - 1];
};
onMounted(() => {
  window?.addEventListener('scroll', scroll);
});

onUnmounted(() => {
  window?.removeEventListener('scroll', scroll);
});

// 移动端事件
const activeMobile = ref(0);
const active = ref(0);
const handleChangeActiveMobile = (activeNames: any) => {
  if (activeNames !== '') {
    active.value = activeNames;
  }
};
</script>

<template>
  <BannerLevel2
    :background-image="banner"
    :title="i18n.member.PAGE_TITLE"
    :illustration="illustration"
  />

  <div id="tab" class="tab-box">
    <OTabs v-model="tabShow" @tab-click="selectTab">
      <OTabPane
        v-for="(item, index) in i18n.member.MEMBER_LIST"
        :key="item.name"
        :label="item.name"
        :name="index"
      ></OTabPane>
    </OTabs>
  </div>
  <AppContent>
    <!-- 手机端 -->
    <OCollapse
      v-model="activeMobile"
      class="member-mobile"
      accordion
      @change="handleChangeActiveMobile"
    >
      <OCollapseItem
        v-for="(item, index) in i18n.member.MEMBER_LIST"
        :key="item.id"
        :name="index"
        class="member-panel"
      >
        <template #title>
          <div class="member-mobile-title">
            {{ item.name }}
          </div>
        </template>
        <div class="member-mobile">
          <template v-if="!item.children">
            <ul class="member-info lable-name">
              <li v-if="item.giteePath">
                <IconHome />
                <a
                  :href="item.giteePath"
                  target="_blank"
                  rel="noopener noreferrer"
                  >{{ i18n.member.GITEE_TEXT }}</a
                >
              </li>
              <li v-if="item.emial">
                <IconMail />
                {{ i18n.member.EMIAL_TEXT }}
                <a class="lable-name" :href="'mailto:' + item.emial">{{
                  item.emial
                }}</a>
              </li>
              <li v-if="item.nameText"><IconUser />{{ item.nameText }}</li>
            </ul>
            <ul v-if="item.list && item.list.length" class="member-list">
              <li v-for="(user, i) in item.list" :key="i">
                <img class="avatar" :src="user.img" :alt="user.name" />
                <p class="m-name lable-name">
                  {{ user.name }}
                </p>
                <p class="m-title">{{ user.title }}</p>
                <template v-if="user.company">
                  <p
                    v-for="itemCompany in user.company.split('\n')"
                    :key="itemCompany"
                    class="m-company"
                    :class="user.wider"
                    :title="itemCompany"
                  >
                    {{ itemCompany }}
                  </p>
                </template>
                <p class="links lable-name">
                  <a
                    v-if="user.email"
                    :href="'mailto:' + user.email"
                    class="mail"
                    ><img :src="emailImg"
                  /></a>
                  <a
                    v-if="user.gitee"
                    :href="user.gitee"
                    class="gitee lable-name"
                    target="_blank"
                    rel="noopener noreferrer"
                    ><img :src="gitImg"
                  /></a>
                </p>
              </li>
            </ul>
            <div v-if="item.id === 'board'" class="board-view">
              <a
                :href="`/${lang}/member/detail/`"
                target="_blank"
                rel="noopener noreferrer"
              >
                <OButton animation type="text" class="case-more-item">
                  {{ i18n.member.VIEW_BOARD }}
                  <template #suffixIcon>
                    <IconArrowRight class="more"></IconArrowRight>
                  </template>
                </OButton>
              </a>
            </div>
          </template>
          <template v-else>
            <div
              v-for="subitem in item.children"
              :key="subitem.id"
              class="member-subitem"
            >
              <template v-if="!subitem.other">
                <h2 :id="subitem.id" class="sub-title">
                  {{ subitem.name }}
                </h2>
                <ul class="member-info lable-name7">
                  <li>
                    <IconHome />
                    <a
                      :href="subitem.giteePath"
                      target="_blank"
                      rel="noopener noreferrer"
                      >{{ i18n.member.GITEE_TEXT }}</a
                    >
                  </li>
                  <li>
                    <IconMail />
                    {{ i18n.member.EMIAL_TEXT }}
                    <a :href="'mailto:' + subitem.emial">{{ subitem.emial }}</a>
                  </li>
                  <li><IconUser />{{ i18n.member.NAMEL_TEXT }}</li>
                </ul>
                <ul
                  v-if="subitem.list && subitem.list.length"
                  class="member-list lable-name8"
                >
                  <li v-for="(user, i) in subitem.list" :key="i">
                    <img class="avatar" :src="user.img" :alt="user.name" />
                    <p class="m-name lable-name9">{{ user.name }}</p>
                    <p class="m-title">{{ user.title }}</p>
                    <p
                      class="m-company"
                      :class="user.wider"
                      :title="user.company"
                    >
                      {{ user.company }}
                    </p>
                    <p class="links lable-name9">
                      <a :href="'mailto:' + user.email" class="mail"
                        ><img :src="emailImg"
                      /></a>
                      <a
                        v-if="user.gitee"
                        :href="user.gitee"
                        class="gitee lable-name10"
                        target="_blank"
                        rel="noopener noreferrer"
                        ><img :src="gitImg"
                      /></a>
                    </p>
                  </li>
                </ul>
              </template>
              <div v-else class="other lable-name10">
                <h4>{{ subitem.other }}</h4>
                <h4 class="lable-name11">{{ subitem.other1 }}</h4>
                <p>
                  {{ subitem.other2 }}
                  <a :href="'mailto:' + subitem.email" class="mail">{{
                    subitem.email
                  }}</a>
                </p>
              </div>
            </div>
          </template>
        </div>
      </OCollapseItem>
    </OCollapse>
    <div
      v-for="item in i18n.member.MEMBER_LIST"
      :key="item.id"
      class="member-panel member-pc"
    >
      <template v-if="!item.children">
        <h1 :id="item.id" :ref="navTitle" class="member-title">
          {{ item.name }}
        </h1>
        <div class="member-panel-content">
          <ul class="member-info">
            <li v-if="item.giteePath">
              <IconHome />
              <a
                :href="item.giteePath"
                target="_blank"
                rel="noopener noreferrer"
                >{{ i18n.member.GITEE_TEXT }}</a
              >
            </li>
            <li v-if="item.emial">
              <IconMail />
              {{ i18n.member.EMIAL_TEXT }}
              <a :href="'mailto:' + item.emial">{{ item.emial }}</a>
            </li>
            <li v-if="item.nameText"><IconUser />{{ item.nameText }}</li>
          </ul>
          <template v-if="item.id === 'counselor'">
            <ul v-if="item.list && item.list.length > 0" class="member-list">
              <li v-for="(user, i) in item.list.slice(0, 2)" :key="i">
                <img class="avatar" :src="user.img" :alt="user.name" />
                <p class="m-name" :title="user.name">{{ user.name }}</p>
                <p class="m-title">{{ user.title }}</p>
                <template v-if="user.company">
                  <p
                    v-for="itemCompany in user.company.split('\n')"
                    :key="itemCompany"
                    class="m-company lable-name1"
                    :class="user.wider"
                    :title="itemCompany"
                  >
                    {{ itemCompany }}
                  </p>
                </template>

                <p class="links lable-name3">
                  <a
                    v-if="user.email"
                    :href="'mailto:' + user.email"
                    class="mail"
                    ><img :src="emailImg"
                  /></a>
                  <a
                    v-if="user.gitee"
                    :href="user.gitee"
                    class="gitee lable-name3"
                    target="_blank"
                    rel="noopener noreferrer"
                    ><img :src="gitImg"
                  /></a>
                </p>
              </li>
            </ul>
            <ul v-if="item.list && item.list.length > 0" class="member-list">
              <li v-for="(user, i) in item.list.slice(2)" :key="i">
                <img class="avatar" :src="user.img" :alt="user.name" />
                <p class="m-name" :title="user.name">{{ user.name }}</p>
                <p class="m-title">{{ user.title }}</p>
                <template v-if="user.company">
                  <p
                    v-for="itemCompany in user.company.split('\n')"
                    :key="itemCompany"
                    class="m-company lable-name1"
                    :class="user.wider"
                    :title="itemCompany"
                  >
                    {{ itemCompany }}
                  </p>
                </template>

                <p class="links lable-name3">
                  <a
                    v-if="user.email"
                    :href="'mailto:' + user.email"
                    class="mail"
                    ><img :src="emailImg"
                  /></a>
                  <a
                    v-if="user.gitee"
                    :href="user.gitee"
                    class="gitee lable-name3"
                    target="_blank"
                    rel="noopener noreferrer"
                    ><img :src="gitImg"
                  /></a>
                </p>
              </li>
            </ul>
          </template>
          <template v-else>
            <ul v-if="item.list && item.list.length > 0" class="member-list">
              <li v-for="(user, i) in item.list" :key="i">
                <img class="avatar" :src="user.img" :alt="user.name" />
                <p class="m-name" :title="user.name">{{ user.name }}</p>
                <p class="m-title">{{ user.title }}</p>
                <template v-if="user.company">
                  <p
                    v-for="itemCompany in user.company.split('\n')"
                    :key="itemCompany"
                    class="m-company lable-name1"
                    :class="user.wider"
                    :title="itemCompany"
                  >
                    {{ itemCompany }}
                  </p>
                </template>

                <p class="links lable-name3">
                  <a
                    v-if="user.email"
                    :href="'mailto:' + user.email"
                    class="mail"
                    ><img :src="emailImg"
                  /></a>
                  <a
                    v-if="user.gitee"
                    :href="user.gitee"
                    class="gitee lable-name3"
                    target="_blank"
                    rel="noopener noreferrer"
                    ><img :src="gitImg"
                  /></a>
                </p>
              </li>
            </ul>
          </template>

          <div v-if="item.id === 'board'" class="board-view">
            <a
              :href="`/${lang}/member/detail/`"
              target="_blank"
              rel="noopener noreferrer"
            >
              <OButton animation type="text" class="case-more-item">
                {{ i18n.member.VIEW_BOARD }}
                <template #suffixIcon>
                  <IconArrowRight class="more"></IconArrowRight>
                </template>
              </OButton>
            </a>
          </div>
        </div>
      </template>
      <template v-else>
        <h1 :id="item.id" :ref="navTitle" class="member-title">
          {{ item.name }}
        </h1>
        <div class="gap">
          <div
            v-for="subitem in item.children"
            :key="subitem.id"
            class="member-panel-content"
          >
            <template v-if="!subitem.other">
              <h2 :id="subitem.id" class="sub-title">{{ subitem.name }}</h2>
              <ul class="member-info">
                <li>
                  <IconHome />
                  <a
                    :href="subitem.giteePath"
                    target="_blank"
                    rel="noopener noreferrer"
                    >{{ i18n.member.GITEE_TEXT }}</a
                  >
                </li>
                <li>
                  <IconMail />
                  {{ i18n.member.EMIAL_TEXT }}
                  <a :href="'mailto:' + subitem.emial">{{ subitem.emial }}</a>
                </li>
                <li><IconUser />{{ i18n.member.NAMEL_TEXT }}</li>
              </ul>
              <ul
                v-if="subitem.list && subitem.list.length"
                class="member-list"
              >
                <li v-for="(user, i) in subitem.list" :key="i">
                  <img class="avatar" :src="user.img" :alt="user.name" />
                  <p class="m-name" :title="user.name">{{ user.name }}</p>
                  <p class="m-title">{{ user.title }}</p>
                  <p
                    class="m-company"
                    :class="user.wider"
                    :title="user.company"
                  >
                    {{ user.company }}
                  </p>
                  <p class="links lable-name5">
                    <a
                      v-if="user.email"
                      :href="'mailto:' + user.email"
                      class="mail"
                      ><img :src="emailImg"
                    /></a>
                    <a
                      v-if="user.gitee"
                      :href="user.gitee"
                      class="gitee lable-name5"
                      target="_blank"
                      rel="noopener noreferrer"
                      ><img :src="gitImg"
                    /></a>
                  </p>
                </li>
              </ul>
            </template>
            <div v-else class="other lable-name5">
              <h4>{{ subitem.other }}</h4>
              <h4>{{ subitem.other1 }}</h4>
              <p>
                {{ subitem.other2 }}
                <a :href="'mailto:' + subitem.email" class="mail">{{
                  subitem.email
                }}</a>
              </p>
            </div>
          </div>
        </div>
      </template>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
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
      gap: var(--o-spacing-h5) var(--o-spacing-h3);
      @media screen and (max-width: 767px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
  .member-subitem {
    margin-bottom: var(--o-spacing-h5);
    padding: var(--o-spacing-h5);
    background: var(--o-color-bg2);
  }
  .member-mobile {
    padding: var(--o-spacing-h5);
    &-title {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
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
  background-color: var(--o-color-bg2);
  display: flex;
  top: 80px;
  width: 100%;
  z-index: 9;
  position: sticky;
  align-items: flex-end;
  justify-content: center;
  border-bottom: 1px solid var(--o-color-division1);
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
    --el-tabs-header-height: var(--o-line-height-h3);
    @media (max-width: 768px) {
      --el-tabs-header-height: 34px;
    }
  }

  :deep(.el-tabs__item) {
    font-size: var(--o-font-size-h8);
    line-height: var(--o-line-height-h8);
    padding-bottom: var(--o-spacing-h6);
    padding-top: var(--o-spacing-h6);
    @media (max-width: 768px) {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
      padding-bottom: var(--o-spacing-h10);
      padding-top: var(--o-spacing-h10);
    }
  }

  :deep(.is-active) {
    color: var(--o-color-brand1);
  }
}
.member-panel {
  &:not(:last-child) {
    margin: 0 0 var(--o-spacing-h1);
    @media screen and (max-width: 1100px) {
      margin: 0;
    }
  }

  .member-title {
    text-align: center;
    font-size: var(--o-font-size-h3);
    color: var(--o-color-text1);
    line-height: var(--o-line-height-h3);
    margin-bottom: var(--o-spacing-h2);
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
    &#counselor + .member-panel-content {
      .member-list {
        display: flex;
        gap: 32px;
        justify-content: center;
        max-width: 720px;
        margin: 0 auto;
        & + .member-list {
          margin-top: 12px;
          gap: 0;
          justify-content: space-between;
        }
        li {
          width: 152px;
        }
      }
    }
  }
  .sub-title {
    font-size: var(--o-font-size-h5);
    color: var(--o-color-text1);
    line-height: var(--o-line-height-h5);
    margin-bottom: var(--o-spacing-h5);
    font-weight: 300;
    @media screen and (max-width: 768px) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
      margin-bottom: var(--o-spacing-h7);
    }
  }
  &-content {
    padding: var(--o-spacing-h2) 166px;
    box-shadow: var(--o-shadow-l1);
    background: var(--o-color-bg2);
    @media screen and (max-width: 1439px) {
      padding: var(--o-spacing-h2) var(--o-spacing-h1);
    }
  }
  .member-info {
    li {
      display: flex;
      align-items: center;
      margin-bottom: var(--o-spacing-h5);
      font-size: var(--o-font-size-text);
      color: var(--o-color-text4);
      line-height: var(--o-line-height-h8);
      @media screen and (max-width: 768px) {
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
        margin-bottom: var(--o-spacing-h9);
      }
      svg {
        width: var(--o-font-size-h5);
        height: var(--o-font-size-h5);
        color: var(--o-color-text4);
        margin-right: var(--o-spacing-h8);
      }
    }
  }
  .member-list {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: var(--o-spacing-h5) var(--o-spacing-h1);
    li {
      vertical-align: top;
      text-align: center;
      p {
        font-size: var(--o-font-size-tip);
        color: var(--o-color-text4);
        line-height: var(--o-line-height-tip);
        margin-top: var(--o-spacing-h10);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .links {
        margin-top: var(--o-spacing-h9);
        display: flex;
        gap: var(--o-spacing-h9);
        justify-content: center;
        align-items: center;
      }
      .m-name {
        font-size: var(--o-font-size-h8);
        color: var(--o-color-text1);
        line-height: var(--o-line-height-h8);
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
    gap: var(--o-font-size-h5);
    .member-panel-content {
      padding: var(--o-spacing-h2) var(--o-spacing-h1);
      @media screen and (max-width: 1439px) {
        padding: var(--o-spacing-h2);
      }
    }
    .member-list {
      grid-template-columns: repeat(4, 1fr);
      gap: var(--o-spacing-h5) 56px;
      @media screen and (max-width: 1439px) {
        grid-template-columns: repeat(3, 1fr);
        gap: var(--o-spacing-h5);
      }
    }
  }
  .other {
    color: var(--o-color-text1);
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
      color: var(--o-color-brand1);
      width: var(--o-font-size-h8);
      height: var(--o-font-size-h8);
    }
  }
}
</style>
