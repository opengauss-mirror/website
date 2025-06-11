<script setup lang="ts">
import { useCommon } from '@/stores/common';
import { OButton, OLink } from '@opensig/opendesign';
import { useData, useRouter } from 'vitepress';
import { computed } from 'vue';
import { GITCODE_LINK, GIYHUB_LINK } from '~@/data/url-config';

const displayTools = [
  {
    name: `DBeaver`,
    desc: `开源多数据库客户端工具`,
    desc_en: `Open source multi database client tool`,
    address: `${GIYHUB_LINK}dbeaver/dbeaver`,
    guide: `/zh/blogs/justbk/2020-10-30_dbeaver_for_openGauss.html`,
  },
  {
    name: `pgloader`,
    desc: `一个数据导入工具，使用COPY命令将数据导入到openGauss`,
    desc_en: `A data import tool that uses the COPY command to import data into openGauss`,
    address: `${GITCODE_LINK}opengauss/openGauss-tools-loader`,
    guide: `${GITCODE_LINK}opengauss/openGauss-tools-loader/blob/master/pgloader%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97.pdf`,
  },
  {
    name: `Debezium`,
    desc: `为捕获数据更改（Change Data Capture, CDC）提供了一个低延迟的流式处理平台`,
    desc_en: `It provides a low latency streaming processing platform for change data capture (CDC)`,
    address: `${GIYHUB_LINK}debezium/debezium`,
    guide: `/zh/blogs/lihongda/Debezium-Adapt-openGauss.html`,
  },
  {
    name: `DataKit`,
    desc: `基于Web的openGauss的可视化的平台系统，方便客户使用和管理openGauss可视化工具`,
    address: `${GITCODE_LINK}opengauss/openGauss-workbench`,
    guide: `${GITCODE_LINK}opengauss/openGauss-workbench/blob/master/plugins/alert-monitor/README.md`,
  },
  {
    name: `gs_probackup`,
    desc: `用于管理openGauss数据库备份和恢复，并对openGauss实例进行定期备份`,
    address: `${GITCODE_LINK}opengauss/openGauss-server`,
    guide: `/zh/docs/latest/docs/ToolandCommandReference/gs_probackup.html`,
  },
  {
    name: `数据访问中间件`,
    desc: `分布式数据库中间件`,
    address: `${GIYHUB_LINK}apache/shardingsphere`,
    guide: `/zh/blogs/justbk/2021-08-31_shardingSphere_for_openGauss.html`,
  },
];

const router = useRouter();
const { lang } = useData();
const gotoTools = () => {
  router.go(`/${lang.value}/supporttools`);
};

const commonStore = useCommon();
const isDark = computed(() => commonStore.theme === 'dark');
</script>

<template>
  <div class="container">
    <div :class="{'title-desc': true, dark: isDark }">
      <p class="title">支持工具</p>
      <p class="desc">主要面向开发者和ISV，提供六大类开发工具客户端工具、数据导入导出工具、数据复制/同步工具、监控运维接口及工具集、备份恢复接口及工具集、数据访问中间件</p>
      <OButton variant="solid" color="primary" @click="gotoTools">全部工具</OButton>
    </div>
    <div class="tools">
      <div class="item" v-for="item in displayTools" :key="item.name">
        <h3>{{ item.name }}</h3>
        <div class="desc">
          <p>{{ item.desc }}</p>
          <div class="links">
            <OLink :href="item.address" target="_blank" color="primary">源码地址</OLink>
            <OLink :href="item.guide" target="_blank" color="primary">操作指导</OLink>
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

  @include respond-to('<=pad') {
    display: block;
  }

  .title-desc {
    background-image: url('~@/assets/category/download/relative-tools-bg.png');
    background-size: cover;
    &.dark {
      background-image: url('~@/assets/category/download/relative-tools-bg-dark.png');
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
      @include respond-to('>pad') {
        height: 168px;
      }

      h3 {
        @include h3;
      }

      .desc {
        margin-top: 8px;
        color: var(--o-color-control2);
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