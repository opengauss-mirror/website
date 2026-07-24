<script setup lang="ts">
import { useCommon } from '@/stores/common';
import { OButton, OLink } from '@opensig/opendesign';
import { useData } from 'vitepress';
import { computed } from 'vue';
import { GITCODE_LINK, GITHUB_LINK } from '~@/data/url-config';

const displayTools = [
  {
    name: `DBeaver`,
    desc: `开源多数据库客户端工具`,
    desc_en: `Open source multi database client tool`,
    address: `${GITHUB_LINK}/dbeaver/dbeaver`,
    guide: `/zh/blogs/justbk/2020-10-30_dbeaver_for_openGauss.html`,
  },
  {
    name: `pgloader`,
    desc: `一个数据导入工具，使用COPY命令将数据导入到openGauss`,
    desc_en: `A data import tool that uses the COPY command to import data into openGauss`,
    address: `${GITCODE_LINK}/opengauss/openGauss-tools-loader`,
    guide: `${GITCODE_LINK}/opengauss/openGauss-tools-loader/blob/master/pgloader%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97.pdf`,
  },
  {
    name: `Debezium`,
    desc: `为捕获数据更改（Change Data Capture, CDC）提供了一个低延迟的流式处理平台`,
    desc_en: `It provides a low latency streaming processing platform for change data capture (CDC)`,
    address: `${GITHUB_LINK}/debezium/debezium`,
    guide: `/zh/blogs/lihongda/Debezium-Adapt-openGauss.html`,
  },
  {
    name: `DataKit`,
    desc: `基于Web的openGauss的可视化的平台系统，方便客户使用和管理openGauss可视化工具`,
    desc_en: `A web-based platform system that helps customers use and manage openGauss visualization tools`,
    address: `${GITCODE_LINK}/opengauss/openGauss-workbench`,
    guide: `${GITCODE_LINK}/opengauss/openGauss-workbench/blob/master/plugins/alert-monitor/README.md`,
  },
  {
    name: `gs_probackup`,
    desc: `用于管理openGauss数据库备份和恢复，并对openGauss实例进行定期备份`,
    desc_en: `Manages openGauss database backups and recovery, and performs regular backups of openGauss instances`,
    address: `${GITCODE_LINK}/opengauss/openGauss-server`,
    guide: `/zh/docs/latest/docs/ToolandCommandReference/gs_probackup.html`,
  },
  {
    name: `数据访问中间件`,
    name_en: `Data access middleware`,
    desc: `分布式数据库中间件`,
    desc_en: `Distributed database middleware`,
    address: `${GITHUB_LINK}/apache/shardingsphere`,
    guide: `/zh/blogs/justbk/2021-08-31_shardingSphere_for_openGauss.html`,
  },
];

const { lang } = useData();
const isEn = computed(() => lang.value === 'en');

const commonStore = useCommon();
const isDark = computed(() => commonStore.theme === 'dark');
</script>

<template>
  <div class="container">
    <div :class="{ 'title-desc': true, dark: isDark }">
      <p class="title">{{ $t('common.COMMON_CONFIG.SUPPORTTOOLS') }}</p>
      <p class="desc">
        {{ $t('tools.DESC') }}
      </p>
      <OButton
        round="pill"
        variant="solid"
        color="primary"
        :href="`/${lang}/tools/`"
        v-analytics.bubble="{ level3: $t('common.COMMON_CONFIG.SUPPORTTOOLS'), level4: $t('tools.ALL_TOOLS') }"
      >
        {{ $t('tools.ALL_TOOLS') }}
      </OButton>
    </div>
    <div class="tools">
      <div class="item" v-for="item in displayTools" :key="item.name">
        <h3>{{ isEn && item.name_en ? item.name_en : item.name }}</h3>
        <div class="desc">
          <p>{{ isEn && item.desc_en ? item.desc_en : item.desc }}</p>
          <div class="links">
            <OLink
              :href="item.address"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              v-analytics.bubble="{ level3: isEn && item.name_en ? item.name_en : item.name, level4: $t('tools.SOURCE_CODE_ADDR') }"
              >{{ $t('tools.SOURCE_CODE_ADDR') }}</OLink
            >
            <OLink
              :href="item.guide"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              v-analytics.bubble="{ level3: isEn && item.name_en ? item.name_en : item.name, level4: $t('tools.OPERATION_GUIDE') }"
              >{{ $t('tools.OPERATION_GUIDE') }}</OLink
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  width: 100%;
  margin-top: 40px;
  border-radius: 4px;
  overflow: hidden;

  @include respond-to('<=pad') {
    display: block;
  }

  .title-desc {
    background-image: url('~@/assets/category/download/relative-tools-bg_light.png');
    background-size: cover;
    &.dark {
      background-image: url('~@/assets/category/download/relative-tools-bg_dark.png');
    }
    @include respond-to('>pad') {
      flex-grow: 1;
      flex-shrink: 0;
      max-width: 372px;
      padding: 32px;
    }
    @include respond-to('<=pad') {
      width: 100%;
      padding: 16px;
    }

    .title {
      @include h1;
    }

    .desc {
      @include text1;
      margin-top: 8px;
    }

    .o-btn {
      margin-top: 24px;
      @include respond-to('<=pad') {
        margin-top: 12px;
      }
    }
  }

  .tools {
    display: grid;
    column-gap: 1px;
    row-gap: 1px;
    background-color: var(--o-color-control4);
    @include respond-to('>pad') {
      width: 0;
      flex-grow: 1;
      grid-template-columns: repeat(3, 1fr);
    }

    .item {
      padding: 24px;
      background-color: var(--o-color-fill2);
      position: relative;
      align-self: stretch;
      @include respond-to('>pad') {
        min-height: 168px;
      }

      h3 {
        font-weight: 500;
        @include h3;
      }

      .desc {
        margin-top: 8px;
        color: var(--o-color-info3);
        @include tip1;
        @include respond-to('<=pad') {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 8px;
        }
        @include respond-to('phone') {
          display: block;
        }
      }

      .links {
        align-items: center;
        @include respond-to('<=pad') {
          margin-top: 0;
        }
        @include respond-to('>pad') {
          display: flex;
          position: absolute;
          bottom: 24px;
          left: 24px;
        }

        .o-link {
          @include tip1;
          &:first-child {
            margin-right: 32px;
          }
        }
      }
    }
  }
}
</style>
