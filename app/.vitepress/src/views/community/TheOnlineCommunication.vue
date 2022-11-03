<script lang="ts" setup>
import { ref } from 'vue';
import { useData } from 'vitepress';
import { useI18n } from '@/i18n';
import AppContent from '@/components/AppContent.vue';
import BannerLevel2 from '@/components/BannerLevel2.vue';
import useWindowResize from '@/components/hooks/useWindowResize';

import banner from '@/assets/banner/banner-secondary.png';
import illustration from '@/assets/illustrations/onlineCommunication.png';

const i18n = useI18n();
const { lang } = useData();

const windowWidth = ref(useWindowResize());
</script>

<template>
  <BannerLevel2
    :background-image="banner"
    :title="i18n.onlineCommunication.title"
    :illustration="illustration"
  />
  <AppContent>
    <div class="onlineCommunication">
      <p class="text">
        {{ i18n.onlineCommunication.text }}
      </p>
      <h3 class="title">{{ i18n.onlineCommunication.caption }}</h3>
      <div class="maillist-table">
        <OTable
          :data="i18n.onlineCommunication.mail_list"
          header-cell-class-name="mirror-list-header"
          cell-class-name="mirror-list-row"
          style="width: 100%"
        >
          <el-table-column
            :label="i18n.onlineCommunication.thead[0]"
            prop="listname"
          >
            <template #default="scope">
              <a class="link" :href="scope.row.giteelink" target="_blank">
                {{ scope.row.listname }}
              </a>
            </template>
          </el-table-column>
          <el-table-column
            :label="i18n.onlineCommunication.thead[1]"
            prop="emailaddress"
          >
            <template #default="scope">
              <a class="link" target="_blank" :href="scope.row.websitelink">
                {{ scope.row.emailaddress }}
              </a>
            </template>
          </el-table-column>
          <el-table-column
            v-if="windowWidth > 768"
            :label="i18n.onlineCommunication.thead[2]"
            prop="description"
          >
            <template #default="scope">
              <div class="ellipsis">
                {{ scope.row.description }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            :width="windowWidth > 768 ? '220px' : '100px'"
            :label="i18n.onlineCommunication.thead[3]"
            prop="archive"
          >
            <template #default="scope">
              <a :href="scope.row.archivelink" class="link" target="_blank">
                {{ scope.row.archive }}
              </a>
            </template>
          </el-table-column>
        </OTable>
      </div>
      <h4 class="sub-title">{{ i18n.onlineCommunication.caption1 }}</h4>
      <p class="text">{{ i18n.onlineCommunication.caption_List.title }}</p>
      <ul class="list">
        <li
          v-for="(item, index) in i18n.onlineCommunication.caption_List.list"
          :key="index"
          class="text"
        >
          {{ item }}
        </li>
      </ul>
      <template v-if="lang === 'zh'">
        <p class="text">
          {{ i18n.onlineCommunication.tips }}
        </p>
        <img
          class="img"
          :src="i18n.onlineCommunication.mailimg"
          style="width: 65%"
        />
      </template>
      <h4 class="sub-title">{{ i18n.onlineCommunication.caption2 }}</h4>
      <p class="text">
        {{ i18n.onlineCommunication.caption2_text }}
      </p>
      <h4 class="sub-title">{{ i18n.onlineCommunication.caption3 }}</h4>
      <p class="text">
        {{ i18n.onlineCommunication.caption3_text }}
      </p>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
.onlineCommunication {
  .text {
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
    color: var(--o-color-text4);
  }
  .title {
    font-size: var(--o-font-size-h5);
    line-height: var(--o-line-height-h5);
    color: var(--o-color-text1);
    margin: var(--o-spacing-h2) 0 var(--o-spacing-h4);
    @media screen and (max-width: 1100px) {
      margin: var(--o-spacing-h4) 0 var(--o-spacing-h6);
      font-size: var(--o-font-size-h6);
      line-height: var(--o-line-height-h6);
    }
  }
  .sub-title {
    font-size: var(--o-font-size-h7);
    line-height: var(--o-line-height-h7);
    color: var(--o-color-text1);
    margin: var(--o-spacing-h2) 0 var(--o-spacing-h4);
    @media screen and (max-width: 1100px) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
      margin: var(--o-spacing-h4) 0 var(--o-spacing-h6);
    }
  }
  .list {
    li {
      margin-left: var(--o-spacing-h4);
      list-style: circle;
    }
  }
  .img {
    margin-top: var(--o-spacing-h6);
  }
}
.link {
  font-size: var(--o-font-size-h8);
  line-height: var(--o-line-height-h8);
  @media screen and (max-width: 1100px) {
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
  }
}
</style>
