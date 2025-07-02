<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useCommon } from '@/stores/common';

import time from '../img/time.svg';
import timeDark from '../img/time-dark.svg';

defineProps({
  agendaData: {
    type: Object,
    required: true,
    default: () => {
      return {
        title: '',
        content: [],
      };
    },
  },
});

const commonStore = useCommon();
const isLight = computed(() => (commonStore.theme === 'light' ? true : false));

// 控制分论坛的详情弹窗显示
const idSubItemShow: any = ref('');
const idShow: any = ref('');
const changeIndexShow = (id: string, idItem: string) => {
  idShow.value = id;
  idSubItemShow.value = idItem;
};
const otherTabType = ref(0);
</script>

<template>
  <div class="schedule">
    <h4>{{ agendaData.lable }}</h4>
    <div class="schedule-item other">
      <el-tabs v-if="agendaData.content[1]" v-model.number="otherTabType" class="other-tabs">
        <el-tab-pane v-for="(itemList, scheduleIndex) in agendaData.content" :key="itemList.id" :name="scheduleIndex">
          <template #label>
            <div class="time-tabs">
              {{ itemList.name }}
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
      <div v-for="(itemList, listIndex) in agendaData.content" v-show="otherTabType == listIndex" :key="itemList.id" class="content">
        <h4 v-if="itemList.title" class="other-title">
          {{ itemList.title }}
        </h4>
        <div class="content-list">
          <div
            v-for="subItem in itemList.content"
            :key="subItem.id"
            class="content-item"
            :class="{
              'no-name': !subItem.person[0],
              'sub-forum': agendaData.lable.includes('分论坛'),
              'content-item-sig': agendaData.lable.includes('SIG组线下工作会议'),
            }"
          >
            <span class="time">
              <img :src="isLight ? time : timeDark" />
              {{ subItem.time }}
            </span>
            <span class="desc" @click="changeIndexShow(itemList.id, subItem.id)">
              <span v-for="item in subItem.desc.split('\n')" :key="item + '1'">{{ item }}</span>
            </span>
            <div v-if="subItem.person[0]" class="name-box">
              <div v-for="personItem in subItem.person" :key="personItem.id">
                <span class="name" :class="{ 'name-no': personItem.id.includes('id21_1_8') || personItem.id.includes('id21_1_11') }">
                  {{ personItem.name }}
                </span>
                <span v-if="personItem.post" class="post">
                  <div v-for="item in personItem.post.split('\n')" :key="item">
                    {{ item }}
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.el-button {
  border-radius: 0;
}
.schedule {
  margin-top: 20px;
  h4 {
    margin-top: 24px;
    text-align: center;
    font-size: 20px;
    line-height: 28px;
    font-weight: 400;
    color: var(--e-color-text1);
    @media (max-width: 1100px) {
      margin-top: 24px;
      font-size: 14px;
      line-height: 20px;
    }
  }
  :deep(.el-tabs) {
    .el-tabs__header.is-top .el-tabs__item.is-top {
      padding: 0;
    }
    .el-tabs__nav-wrap::after {
      display: none;
    }
  }
  :deep(.el-tabs__header) {
    text-align: center;
    margin: 0;
  }

  .schedule-tabs {
    position: relative;
    text-align: center;
    margin-top: 24px;
    :deep(.el-tabs__content) {
      overflow: visible;
      .el-button {
        position: absolute;
        left: 0;
        top: -75px;
        z-index: 1;
      }
    }
    :deep(.el-tabs__nav) {
      float: none;
      display: inline-block;
      .el-tabs__active-bar {
        display: none;
      }
      .el-tabs__item {
        padding: 0;
      }
    }
    .time-tabs {
      display: inline-block;
      margin: 0 0 24px;
      border: 1px solid var(--e-color-border2);
      color: var(--e-color-text1);
      text-align: center;
      background: var(--e-color-bg2);
      font-size: 14px;
      line-height: 38px;
      padding: 0 16px;
      @media (max-width: 1100px) {
        line-height: 28px;
        font-size: 12px;
        padding: 0 12px;
      }
    }

    .is-active .time-tabs {
      color: #fff;
      background: var(--e-color-brand1);
      border-color: var(--e-color-brand1);
    }
  }
  .schedule-item {
    width: 100%;
    padding: 24px;
    background-color: var(--e-color-bg2);
    margin-top: var(--e-spacing-h4);
    @media (max-width: 1100px) {
      padding: 16px;
      margin-top: 20px;
    }
    &.other {
      :deep(.el-tabs) {
        margin-bottom: 24px;
        .el-tabs__header.is-top .el-tabs__item.is-top {
          padding: 0px 20px 0px 0;
          @media (max-width: 1100px) {
            height: auto;
            padding: 0px 18px 0px 0;
            line-height: 22px;
          }
        }
        .el-tabs__nav {
          float: none;
          display: inline-block;
          @media (max-width: 1100px) {
            line-height: 44px;
          }
        }
        .el-tabs__header {
          text-align: center;
          margin: 0;
          .el-tabs__item {
            @media (max-width: 1100px) {
              font-size: 12px;
              line-height: 18px;
            }
          }
        }
      }
      :deep(.el-tabs__nav-scroll) {
        text-align: center;
        color: var(--e-color-text1);
      }
      :deep(.el-tabs__content) {
        overflow: visible;
        @media (max-width: 1100px) {
          margin-top: 16px;
        }
      }
      :deep(.el-tabs__nav) {
        float: none;
        display: inline-block;
        @media (max-width: 1100px) {
          line-height: 44px;
        }
      }
      .other-text {
        margin: 24px auto 0 auto;
        color: var(--e-color-text1);
        font-size: 18px;
        line-height: 26px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        @media (max-width: 1100px) {
          font-size: 14px;
          line-height: 22px;
          margin: 16px 0;
        }
        svg {
          margin-right: 8px;
        }
      }
      .other-title {
        margin: 24px auto;
        color: var(--e-color-text1);
        font-size: 18px;
        line-height: 26px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: normal;
        @media (max-width: 1100px) {
          font-size: 14px;
          line-height: 22px;
          margin: 16px 0;
        }
      }
    }
    :deep(.time-tabs) {
      color: var(--e-color-text1);
      &:hover {
        color: var(--e-color-brand1);
      }
    }
    :deep(.is-active) {
      .time-tabs {
        color: var(--e-color-brand1);
      }
    }
  }
}
.content-list {
  @media screen and (max-width: 1100px) {
    position: relative;
  }
  .content-item {
    display: grid;
    grid-template-columns: 185px 564px 603px;
    border-bottom: 1px solid var(--e-color-border2);
    padding: 20px 0px;
    transition: all 0.25s ease;
    align-items: center;
    position: relative;
    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
    &:first-child {
      padding-top: 0;
    }
    @media screen and (max-width: 1328px) {
      grid-template-columns: 185px 410px 450px;
    }
    @media screen and (max-width: 1100px) {
      grid-template-columns: 80px auto;
      padding: 6px 0;
      position: static;
      align-items: flex-start;
    }
    .name-box {
      @media screen and (max-width: 1100px) {
        grid-column-end: 3;
      }
      div {
        display: flex;
        align-items: center;
        @media screen and (max-width: 1100px) {
          grid-column-start: 2;
          grid-column-end: 3;
          display: block;
        }
      }
    }
    .del-content {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 12px;
    }
    .desc {
      font-size: 18px;
      line-height: 26px;
      color: var(--e-color-text1);
      display: block;
      margin-right: 56px;
      > span {
        display: block;
      }
      @media (max-width: 1100px) {
        margin-right: 0;
        font-size: 12px;
        line-height: 18px;
      }
    }

    .name {
      min-width: 144px;
      display: inline-block;
      color: var(--e-color-text3);
      font-size: 16px;
      line-height: 24px;
      @media screen and (max-width: 1328px) {
        min-width: 160px;
      }
      @media (max-width: 1100px) {
        font-size: 12px;
        line-height: 18px;
      }
    }
    .name-no {
      @media (max-width: 1100px) {
        display: none;
      }
    }
    .post {
      width: 100%;
      display: inline-block;
      color: var(--e-color-text3);
      font-size: 16px;
      line-height: 24px;
      flex: 1;
      div {
        @media (max-width: 1100px) {
          font-size: 12px;
          line-height: 18px;
        }
      }
    }
    .post-more {
      width: 345px;
      @media screen and (max-width: 1100px) {
        width: 100%;
      }
    }
    .time {
      width: 185px;
      font-size: 18px;
      line-height: 26px;
      color: var(--e-color-text3);
      display: flex;
      align-items: center;
      @media screen and (max-width: 1100px) {
        font-size: 12px;
        line-height: 18px;
        width: 80px;
      }
      img {
        width: 18px;
        height: 18px;
        color: var(--e-color-text3);
        margin-right: 8px;
        @media screen and (max-width: 1100px) {
          display: none;
        }
      }
    }
    .info .desc {
      width: 460px;
      margin-right: 40px;
      display: inline-block;
    }
  }
  .content-item-sig {
    grid-template-columns: 185px 335px 840px;
    @media screen and (max-width: 1328px) {
      grid-template-columns: 185px 335px 600px;
    }
    @media screen and (max-width: 1100px) {
      grid-template-columns: 80px auto;
      padding: 6px 0;
      position: static;
    }
  }
  .sub-forum {
    .name {
      min-width: 114px;
    }
  }
}
</style>
