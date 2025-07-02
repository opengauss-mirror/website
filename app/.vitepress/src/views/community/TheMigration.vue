<script lang="ts" setup>
import AppContent from '@/components/AppContent.vue';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import banner from '@/assets/category/migration/banner.png';
import bannerIcon from '@/assets/category/migration/banner-icon.png';
import imgRight from '~icons/migration/right.svg';
import imgVideo from '~icons/migration/video.svg';
import imgPlayVideo from '~icons/migration/play-video.svg';
import imgPracticeCardBg from '@/assets/category/migration/practice-card-bg.png';
import imgMigration from '~icons/migration/icon-migration.svg';
import imgInteractive from '~icons/migration/interactive.svg';
import IconChevronRight from '~icons/app/icon-chevron-right.svg';
import IconArrowRight from '~icons/app/icon-arrow-right.svg';
import IconStepArrow from '~icons/app/icon-step-arrow.svg';

import useWindowResize from '@/components/hooks/useWindowResize';
import migration from '@/data/migration';
import { computed, ref } from 'vue';

const data = migration.zh;
const screenWidth = useWindowResize();
const isMobile = computed(() => (screenWidth.value <= 768 ? true : false));
const selectedStepIndex = ref(0);
const selectedCollapseStepIndex = ref(-1);
const step = computed(() => data.step.list[selectedStepIndex.value]);

const showVideoDialog = ref(false);
const videoLink = ref('');
const showVideo = (url: string) => {
  videoLink.value = url;
  showVideoDialog.value = true;
};
const closeVideo = () => {
  showVideoDialog.value = false;
  videoLink.value = '';
};
</script>

<template>
  <BannerLevel2 class="app-banner" :background-image="banner" :illustration="bannerIcon" title="迁移专区" />

  <AppContent class="migration">
    <!-- 迁移优势 -->
    <div class="advantage-panel">
      <h1 class="title">{{ data.advantage.title }}</h1>
      <div class="advantage-card-wrap">
        <div v-for="(item, i) in data.advantage.list" :key="i" class="advantage-card">
          <OIcon class="card-icon">
            <component :is="item.icon"> </component>
          </OIcon>
          <div>
            <h2 class="card-title">{{ item.title }}</h2>
            <p class="card-desc">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 迁移流程 -->
    <div class="step-panel">
      <h1 class="title">{{ data.step.title }}</h1>
      <h2 class="sub-title">{{ data.step.subTitle }}</h2>

      <div v-if="!isMobile" class="step-content-container">
        <!-- tab -->
        <ul class="step-list">
          <li v-for="(item, i) in data.step.list" :key="i" :class="selectedStepIndex === i ? 'selected' : ''" @click="selectedStepIndex = i">
            <div class="step-wrap">
              <OIcon class="step-icon">
                <component :is="selectedStepIndex === i ? item.iconSelected : item.iconUnselected"> </component>
              </OIcon>
              <p class="number">0{{ i + 1 }}</p>
              <p class="name">{{ item.stepName }}</p>
              <div class="bottom"></div>
            </div>
            <IconStepArrow v-if="i !== data.step.list.length - 1" class="step-arrow" />
          </li>
        </ul>

        <!-- content -->
        <div class="step-content">
          <p class="step-desc">{{ step.desc }}</p>
          <div :class="`step-${step.id}`">
            <div v-for="item in step.detail" :key="item.title" class="step-card">
              <div class="step-card-title">{{ item.title }}</div>
              <div class="step-card-desc" v-if="item.desc">{{ item.desc }}</div>
              <div class="step-card-line" v-if="item.showLine"></div>
              <div class="step-card-feature-title" v-if="item.feature">
                {{ item.feature }}
              </div>
              <template v-if="Array.isArray(item.features)">
                <div v-for="subItem in item.features" :key="subItem.title" class="step-card-feature-wrap">
                  <OIcon class="step-card-feature-img" v-if="subItem.icon === 'right'">
                    <component :is="imgRight"> </component>
                  </OIcon>
                  <p class="step-card-feature-number" v-else>
                    {{ subItem.icon }}
                  </p>
                  <div>
                    <p class="step-card-feature-sub-title" v-if="subItem.title">
                      {{ subItem.title }}
                    </p>
                    <p class="step-card-feature-desc" v-if="subItem.desc">
                      {{ subItem.desc }}
                    </p>
                  </div>
                </div>
              </template>
            </div>
          </div>

          <template v-if="step.id === 'migration-data'">
            <div class="step-migration-data-requirement-block">
              {{ data.requirementText }}
            </div>
            <div class="step-migration-data-requirement">
              <div v-for="item in step.requirement" :key="item.title" class="step-card-feature-wrap">
                <OIcon class="step-card-feature-img">
                  <component :is="imgRight"> </component>
                </OIcon>
                <div>
                  <p class="step-card-feature-sub-title" v-if="item.title">
                    {{ item.title }}
                  </p>
                  <p class="step-card-feature-desc" v-if="item.desc">
                    {{ item.desc }}
                  </p>
                </div>
              </div>
            </div>
          </template>

          <div class="step-view-detail">
            <a :href="step.href" target="_blank" rel="noopener noreferrer">
              <OButton animation type="text">
                {{ data.viewDetailText }}
                <template #suffixIcon>
                  <IconArrowRight></IconArrowRight>
                </template>
              </OButton>
            </a>
          </div>
        </div>
      </div>

      <OCollapse v-if="isMobile" v-model="selectedCollapseStepIndex" class="step-collapse" accordion>
        <OCollapseItem v-for="(stepItem, index) in data.step.list" :key="stepItem.id" :name="index">
          <template #title>{{ stepItem.stepName }}</template>

          <div class="step-collapse-panel">
            <div class="step-content">
              <p class="step-desc">{{ stepItem.desc }}</p>

              <div v-for="item in stepItem.detail" :key="item.title" class="step-card">
                <div class="step-card-title">{{ item.title }}</div>
                <div class="step-card-desc" v-if="item.desc">
                  {{ item.desc }}
                </div>
                <div class="step-card-feature-title" v-if="item.feature">
                  {{ item.feature }}
                </div>
                <template v-if="Array.isArray(item.features)">
                  <div v-for="subItem in item.features" :key="subItem.title" class="step-card-feature-wrap">
                    <OIcon v-if="subItem.icon === 'right'" class="step-card-feature-img">
                      <component :is="imgRight"> </component>
                    </OIcon>
                    <p class="step-card-feature-number" v-else>
                      {{ subItem.icon }}
                    </p>
                    <div>
                      <p class="step-card-feature-sub-title" v-if="subItem.title">
                        {{ subItem.title }}
                      </p>
                      <p class="step-card-feature-desc" v-if="subItem.desc">
                        {{ subItem.desc }}
                      </p>
                    </div>
                  </div>
                </template>
              </div>

              <template v-if="selectedCollapseStepIndex > 0 && data.step.list[selectedCollapseStepIndex].id === 'migration-data'">
                <div class="step-card">
                  <div class="step-card-title">{{ data.requirementText }}</div>
                  <div v-for="item in data.step.list[selectedCollapseStepIndex].requirement" :key="item.title" class="step-card-feature-wrap">
                    <OIcon class="step-card-feature-img">
                      <component :is="imgRight"> </component>
                    </OIcon>
                    <div>
                      <p class="step-card-feature-sub-title" v-if="item.title">
                        {{ item.title }}
                      </p>
                      <p class="step-card-feature-desc" v-if="item.desc">
                        {{ item.desc }}
                      </p>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </OCollapseItem>
      </OCollapse>
    </div>

    <!-- 视频演示 -->
    <div class="video-panel">
      <h1 class="title">{{ data.video.title }}</h1>
      <div class="video-card-wrap">
        <div v-for="item in data.video.list" :key="item.title" class="video-card">
          <div class="video-card-left">
            <OIcon class="video-card-icon">
              <component :is="imgVideo"> </component>
            </OIcon>
            <span class="video-card-left-title">{{ item.title }}</span>
          </div>
          <OButton class="play-video-btn" :size="isMobile ? 'mini' : ''" animation @click="showVideo(item.href)">
            <span class="play-video-btn-text">{{ data.playVideoText }}</span>
            <template #suffixIcon>
              <OIcon class="play-video-icon">
                <component :is="imgPlayVideo"> </component>
              </OIcon>
            </template>
          </OButton>
        </div>
      </div>
    </div>

    <!-- 最佳实践 -->
    <div class="practice-panel">
      <h1 class="title">{{ data.practice.title }}</h1>
      <div class="practice-card-wrap">
        <OCard
          v-for="item in data.practice.list"
          :key="item.title"
          shadow="hover"
          class="case-card"
          :style="`background:url(${imgPracticeCardBg}) no-repeat center/cover`"
        >
          <div class="case-card-box-left">
            <h4 class="case-card-box-left-title">{{ item.title }}</h4>
            <p class="case-card-box-left-detail">{{ item.desc }}</p>
            <!-- <a :href="item.caseHref" target="_blank" rel="noopener noreferrer">
              <OButton animation size="mini" class="more-btn" type="primary">
                {{ data.readCaseText }}
              </OButton>
            </a> -->
            <a :href="item.officalHref" target="_blank" rel="noopener noreferrer"
              ><OButton animation size="mini" class="website-btn">
                {{ data.visitOfficialSiteText }}
                <template #suffixIcon>
                  <IconArrowRight class="icon-arror" />
                </template> </OButton
            ></a>
          </div>

          <div class="case-card-box-right">
            <OIcon class="case-type-img">
              <component :is="imgMigration"> </component>
            </OIcon>
            <p class="case-type">{{ data.migrationText }}</p>
          </div>
        </OCard>
      </div>
    </div>

    <!-- 专区互动 -->
    <div class="interactive-panel">
      <h1 class="title">{{ data.interactive.title }}</h1>
      <div class="interactive-card-wrap">
        <div v-for="item in data.interactive.list" :key="item.title" class="interactive-card">
          <div class="interactive-card-left">
            <OIcon class="interactive-card-icon">
              <component :is="imgInteractive"> </component>
            </OIcon>
            <span class="interactive-card-left-title">{{ item.title }}</span>
          </div>

          <a :href="item.href" target="_blank" class="interactive-card-right" rel="noopener noreferrer">
            <OButton v-if="isMobile" size="mini" animation>{{ data.visitAreaText }}</OButton>
            <template v-else>
              <div class="interactive-card-right-desc">{{ item.desc }}</div>
              <OIcon class="interactive-card-right-arrow">
                <component :is="IconChevronRight"> </component>
              </OIcon>
            </template>
          </a>
        </div>
      </div>
    </div>
  </AppContent>

  <!-- 工具下载 -->
  <div class="tool-download">
    <h1 class="tool-download-title">{{ data.dowload.title }}</h1>
    <h2 class="tool-download-desc">{{ data.dowload.desc }}</h2>
    <a :href="data.dowload.href" target="_blank" rel="noopener noreferrer">
      <OButton type="primary" size="mini" animation class="download-btn">
        {{ data.dowload.btnText }}
        <template #suffixIcon>
          <IconArrowRight />
        </template>
      </OButton>
    </a>
  </div>

  <div v-if="showVideoDialog" class="video-box">
    <ODialog
      v-model="showVideoDialog"
      :before-close="closeVideo"
      :show-close="false"
      lock-scroll
      close-on-press-escape
      close-on-click-modal
      width="800px"
      destroy-on-close
    >
      <div class="video-center">
        <video class="home-banner-video" :src="videoLink" width="100%" controls autoplay></video>
      </div>
    </ODialog>
  </div>
</template>

<style lang="scss" scoped>
@include in-dark {
  img {
    @include img-in-dark;
  }

  .migration {
    --migration-sub-text-color: #ffffff;
    --migration-number-text-color: #ffffff;
    --migration-step-card-bg-color: #131313;
    --migration-desc-text-color: #ffffff;
  }
}

.migration {
  svg {
    fill: currentColor;
  }
  --migration-sub-text-color: rgba(0, 0, 0, 0.8);
  --migration-number-text-color: rgba(0, 0, 0, 0.25);
  --migration-step-card-bg-color: #f3f3f5;
  --migration-desc-text-color: rgba(0, 0, 0, 0.6);
  padding-top: 0;
  padding-bottom: 0;

  .title {
    padding: 80px 0 var(--e-spacing-h2) 0;
    color: var(--e-color-text1);
    text-align: center;
    font-size: var(--e-font-size-h3);
    line-height: var(--e-line-height-h3);
    font-weight: 300;

    @media screen and (max-width: 1280px) {
      padding: 60px 0 30px 0;
      font-size: 32px;
      line-height: 32px;
    }

    @media screen and (max-width: 760px) {
      padding: 40px 0 20px 0;
      font-size: 16px;
      line-height: 16px;
    }
  }

  .sub-title {
    max-width: 1080px;
    margin-bottom: var(--e-spacing-h2);
    font-size: var(--e-font-size-h7);
    color: var(--e-color-text1);
    line-height: var(--e-line-height-h7);
    font-weight: 200;
    text-align: center;

    @media screen and (max-width: 1280px) {
      margin-bottom: var(--e-spacing-h4);
      font-size: var(--e-font-size-h7);
      line-height: var(--e-line-height-h7);
    }

    @media screen and (max-width: 760px) {
      margin-bottom: var(--e-spacing-h6);
      font-size: var(--e-font-size-tip);
      line-height: var(--e-line-height-h8);
    }
  }

  .advantage-panel {
    .advantage-card-wrap {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--e-spacing-h3);

      @media screen and (max-width: 1280px) {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--e-spacing-h5);
      }

      @media screen and (max-width: 760px) {
        grid-template-columns: 1fr;
        gap: var(--e-spacing-h6);
      }
    }

    .advantage-card {
      display: flex;
      padding: var(--e-spacing-h4) var(--e-spacing-h3);
      background: var(--e-color-bg2);

      @media screen and (max-width: 1280px) {
        padding: var(--e-spacing-h5) var(--e-spacing-h4);
      }

      .card-icon {
        font-size: 40px;
        margin-right: var(--e-spacing-h5);
        color: var(--e-color-text1);

        @media screen and (max-width: 1280px) {
          font-size: 32px;
          margin-right: var(--e-spacing-h6);
        }

        @media screen and (max-width: 760px) {
          font-size: 24px;
          margin-right: var(--e-spacing-h7);
        }
      }

      .card-title {
        font-size: var(--e-font-size-h5);
        color: var(--e-color-text1);
        line-height: var(--e-line-height-h5);
        font-weight: 500;

        @media screen and (max-width: 1280px) {
          font-size: var(--e-font-size-h6);
          line-height: var(--e-line-height-h6);
        }

        @media screen and (max-width: 760px) {
          font-size: var(--e-font-size-h8);
          line-height: var(--e-line-height-h8);
        }
      }

      .card-desc {
        margin-top: var(--e-spacing-h8);
        font-size: var(--e-font-size-text);
        color: var(--migration-sub-text-color);
        line-height: var(--e-line-height-text);

        @media screen and (max-width: 1280px) {
          margin-top: var(--e-spacing-h9);
        }

        @media screen and (max-width: 760px) {
          margin-top: var(--e-spacing-h10);
          font-size: var(--e-font-size-tip);
          line-height: var(--e-line-height-tip);
        }
      }
    }
  }

  .step-panel {
    display: flex;
    flex-direction: column;
    align-items: center;

    .step-content-container {
      width: 100%;
      padding: 0 var(--e-spacing-h3);
      background: var(--e-color-bg2);

      @media screen and (max-width: 1280px) {
        padding: 0 var(--e-spacing-h5);
      }

      @media screen and (max-width: 760px) {
        display: none;
      }

      .step-list {
        padding-top: var(--e-spacing-h2);
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: center;

        @media screen and (max-width: 1280px) {
          padding-top: var(--e-spacing-h4);
        }

        li {
          display: flex;
          text-align: center;

          .step-wrap {
            cursor: pointer;
          }

          .step-arrow {
            margin: 36px 52px 0 52px;

            @media screen and (max-width: 1280px) {
              margin: 36px 18px 0 18px;
            }
          }

          .o-icon {
            font-size: 64px;
            color: var(--e-color-text1);
          }

          .step-icon {
            font-size: 64px;
            color: var(--e-color-text1);

            @media screen and (max-width: 1280px) {
              font-size: 48px;
              margin-bottom: var(--e-spacing-h9);
            }
          }

          .number {
            width: 80px;
            height: 40px;
            font-size: 48px;
            color: var(--migration-number-text-color);
            text-align: center;
            line-height: 64px;
            font-weight: 500;
            overflow: hidden;

            @media screen and (max-width: 1280px) {
              height: 30px;
              font-size: 32px;
              line-height: 48px;
            }
          }

          .name {
            font-size: var(--e-font-size-h6);
            color: var(--migration-sub-text-color);
            line-height: var(--e-line-height-h6);

            @media screen and (max-width: 1280px) {
              font-size: var(--e-font-size-h7);
              line-height: var(--e-line-height-h7);
            }
          }

          .bottom {
            margin-top: 18px;

            @media screen and (max-width: 1280px) {
              margin-top: 14px;
            }
          }
        }

        .selected {
          .number {
            color: #7d32ea;
          }

          .name {
            color: #7d32ea;
          }

          .bottom {
            border: 2px solid #7d32ea;
          }
        }
      }

      .step-content {
        .step-desc {
          padding: var(--e-spacing-h4) 0;
          font-size: var(--e-font-size-text);
          color: var(--e-color-text1);
          text-align: center;
          line-height: var(--e-line-height-text);
        }

        .step-card {
          padding: var(--e-spacing-h4) var(--e-spacing-h3);
          background: var(--migration-step-card-bg-color);

          @media screen and (max-width: 1280px) {
            padding: var(--e-spacing-h5) var(--e-spacing-h4);
          }

          &-title {
            font-size: var(--e-font-size-h6);
            color: var(--e-color-text1);
            line-height: var(--e-line-height-h6);
            font-weight: 500;
          }

          &-desc {
            margin-top: var(--e-spacing-h6);
            font-size: var(--e-font-size-text);
            color: var(--migration-sub-text-color);
            line-height: var(--e-line-height-text);
          }

          &-line {
            height: 1px;
            margin: var(--e-spacing-h4) 0;
            background-color: #0000000a;

            @media screen and (max-width: 1280px) {
              margin: var(--e-spacing-h5) 0;
            }
          }

          &-feature-title {
            padding-bottom: var(--e-spacing-h6);
            font-size: var(--e-font-size-text);
            color: var(--e-color-text1);
            line-height: var(--e-line-height-text);
          }

          &-feature-wrap {
            display: flex;
            align-items: first baseline;
            padding: var(--e-spacing-h6) 0;

            @media screen and (max-width: 1280px) {
              padding: var(--e-spacing-h7) 0;
            }
          }

          &-feature-img {
            margin-right: var(--e-spacing-h8);

            @media screen and (max-width: 1280px) {
              margin-right: var(--e-spacing-h9);
            }
          }

          &-feature-sub-title {
            font-size: var(--e-font-size-text);
            color: var(--migration-sub-text-color);
            line-height: var(--e-line-height-text);
          }

          &-feature-number {
            @extend .step-card-feature-sub-title;
            margin-right: var(--e-spacing-h8);

            @media screen and (max-width: 1280px) {
              margin-right: var(--e-spacing-h9);
            }
          }

          &-feature-desc {
            margin-top: var(--e-spacing-h10);
            font-size: var(--e-font-size-text);
            color: var(--migration-desc-text-color);
            line-height: var(--e-line-height-text);
          }
        }

        .step-view-detail {
          margin-top: var(--e-spacing-h3);
          padding: var(--e-spacing-h3) 0;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
          text-align: center;
          color: var(--e-color-text1);
          line-height: 22px;

          .o-button {
            padding: 0;
            font-size: var(--e-font-size-text);
            line-height: var(--e-line-height-text);

            svg {
              color: var(--e-color-brand1);
              width: var(--e-font-size-h8);
              height: var(--e-font-size-h8);
            }
          }

          @media screen and (max-width: 1280px) {
            padding: var(--e-spacing-h4) 0;
          }
        }
      }

      .step-migration-evaluate {
        display: grid;
        grid-template-columns: 482px 1fr;
        gap: var(--e-spacing-h3);

        @media screen and (max-width: 1280px) {
          grid-template-columns: 382px 1fr;
          gap: var(--e-spacing-h4);
        }

        .step-card:first-child {
          grid-row: 1 / span 3;
        }
      }

      .step-app-adaptation {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--e-spacing-h3);

        @media screen and (max-width: 1280px) {
          gap: var(--e-spacing-h4);
        }
      }

      .step-migration-data {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--e-spacing-h3);

        @media screen and (max-width: 1280px) {
          gap: var(--e-spacing-h4);
        }
      }

      .step-migration-data-requirement-block {
        margin: var(--e-spacing-h3) 0 var(--e-spacing-h5);
        padding: var(--e-spacing-h6) 0;
        text-align: center;
        background: var(--migration-step-card-bg-color);
        font-size: var(--e-font-size-h6);
        color: var(--e-color-text1);
        line-height: var(--e-line-height-h6);
        font-weight: 500;
      }

      .step-migration-data-requirement {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        padding: 0 var(--e-spacing-h3);
        column-gap: var(--e-spacing-h1);
      }

      .step-test-running {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--e-spacing-h3);

        @media screen and (max-width: 1280px) {
          gap: var(--e-spacing-h4);
        }

        .step-card:first-child {
          grid-row: 1 / span 2;
        }

        .step-card:last-child {
          grid-column: 1 / span 2;
        }
      }

      .step-produce {
        @media screen and (max-width: 1280px) {
          gap: var(--e-spacing-h4);
        }

        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--e-spacing-h3);
      }
    }
  }

  .video-panel {
    .video-card-wrap {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--e-spacing-h2);

      .video-card {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--e-spacing-h2);
        background: var(--e-color-bg2);

        @media screen and (max-width: 1280px) {
          padding: var(--e-spacing-h4);
        }

        @media screen and (max-width: 760px) {
          padding: var(--e-spacing-h5);
        }

        &-icon {
          font-size: 42px;

          @media screen and (max-width: 1280px) {
            font-size: 28px;
          }

          @media screen and (max-width: 760px) {
            font-size: 20px;
          }
        }

        &-left {
          display: flex;
          align-items: center;
          font-size: var(--e-font-size-h5);
          color: var(--e-color-text1);
          line-height: var(--e-line-height-h5);
          font-weight: 500;

          @media screen and (max-width: 1280px) {
            font-size: var(--e-font-size-h7);
            line-height: var(--e-line-height-h7);
          }

          @media screen and (max-width: 760px) {
            font-size: var(--e-font-size-text);
            line-height: var(--e-font-size-text);
          }

          &-title {
            margin-left: var(--e-spacing-h5);

            @media screen and (max-width: 1280px) {
              margin-left: var(--e-spacing-h7);
            }

            @media screen and (max-width: 760px) {
              margin-left: var(--e-spacing-h9);
            }
          }
        }

        .play-video-btn {
          padding: var(--e-spacing-h8) var(--e-spacing-h4);

          @media screen and (max-width: 1280px) {
            padding: var(--e-spacing-h9) var(--e-spacing-h5);
          }

          @media screen and (max-width: 760px) {
            padding: var(--e-spacing-h10) var(--e-spacing-h6);
          }

          &-text {
            margin-right: var(--e-spacing-h8);
          }
        }

        .play-video-icon {
          font-size: 10px;
        }
      }
    }
  }

  .practice-panel {
    .practice-card-wrap {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

      :deep(.el-card__body) {
        padding: var(--e-spacing-h2) var(--e-spacing-h4) var(--e-spacing-h2) var(--e-spacing-h2);
        height: 198px;
        display: flex;
        align-items: center;

        @media (max-width: 768px) {
          padding: var(--e-spacing-h5);
          height: auto;
        }
      }

      .case-card {
        max-width: 456px;
      }

      .case-card-box-left {
        flex: 1;
        color: #fff;

        &-title {
          font-size: var(--e-font-size-h7);
          line-height: var(--e-line-height-h7);
          font-weight: 500;
          @media (max-width: 768px) {
            font-size: var(--e-font-size-text);
            line-height: var(--e-line-height-text);
          }
        }

        &-detail {
          font-size: var(--e-font-size-text);
          line-height: var(--e-line-height-text);
          margin: var(--e-spacing-h10) 34px var(--e-spacing-h6) 0;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-align: start;
        }

        .more-btn {
          margin-right: var(--e-spacing-h8);
          margin-bottom: var(--e-spacing-h8);
        }

        .website-btn {
          border-color: #fff;
          color: #fff;
        }
      }

      .case-card-box-right {
        text-align: center;
        color: #fff;
        .case-type-img {
          font-size: 90px;

          @media screen and (max-width: 1280px) {
            font-size: 80px;
          }
          @media screen and (max-width: 760px) {
            font-size: 70px;
          }
        }

        .case-type {
          margin-top: 3px;
          font-size: var(--e-font-size-tip);
          line-height: var(--e-line-height-tip);
          color: #ad9cd3;
        }
      }
    }
  }

  .interactive-panel {
    .interactive-card-wrap {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--e-spacing-h3);

      @media screen and (max-width: 1280px) {
        gap: var(--e-spacing-h5);
      }

      @media screen and (max-width: 760px) {
        gap: var(--e-spacing-h6);
      }

      .interactive-card {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--e-spacing-h2);
        background: var(--e-color-bg2);
        color: var(--e-color-text1);

        @media screen and (max-width: 1280px) {
          padding: var(--e-spacing-h4);
        }

        @media screen and (max-width: 760px) {
          padding: var(--e-spacing-h5);
        }

        &-icon {
          font-size: 42px;

          @media screen and (max-width: 1280px) {
            font-size: 32px;
          }

          @media screen and (max-width: 760px) {
            font-size: 24px;
          }
        }

        &-left {
          flex: 1;
          display: flex;
          align-items: center;
          font-size: var(--e-font-size-h5);
          line-height: var(--e-line-height-h5);
          font-weight: 500;

          @media screen and (max-width: 1280px) {
            font-size: var(--e-font-size-h7);
            line-height: var(--e-line-height-h7);
          }

          @media screen and (max-width: 760px) {
            font-size: var(--e-font-size-text);
            line-height: var(--e-font-size-text);
          }

          &-title {
            margin-left: var(--e-spacing-h5);

            @media screen and (max-width: 1280px) {
              margin-left: var(--e-spacing-h7);
            }

            @media screen and (max-width: 760px) {
              margin-left: var(--e-spacing-h9);
            }
          }
        }

        &-right {
          display: flex;
          align-items: center;
          font-size: var(--e-font-size-h8);
          line-height: var(--e-line-height-h8);
          color: var(--migration-sub-text-color);
          cursor: pointer;

          @media screen and (max-width: 1280px) {
            font-size: var(--e-font-size-text);
            line-height: var(--e-font-size-text);
          }

          @media screen and (max-width: 760px) {
            font-size: var(--e-font-size-tip);
            line-height: var(--e-font-size-tip);
          }

          &-desc {
            overflow: hidden;
            text-overflow: ellipsis;
          }

          &-arrow {
            font-size: 20px;
            margin-left: var(--e-spacing-h5);

            @media screen and (max-width: 1280px) {
              margin-left: var(--e-spacing-h7);
            }

            @media screen and (max-width: 760px) {
              margin-left: var(--e-spacing-h9);
            }
          }
        }
      }
    }
  }
}

.tool-download {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 48px 0 var(--e-spacing-h1);
  margin-top: 80px;
  background: url('@/assets/category/migration//download-bg.png') no-repeat center;
  background-size: cover;

  @media screen and (max-width: 1280px) {
    padding: var(--e-spacing-h3) 0 var(--e-spacing-h2);
    margin-top: var(--e-spacing-h1);
  }
  @media screen and (max-width: 760px) {
    padding: 24px;
    margin-top: var(--e-spacing-h5);
  }

  &-title {
    font-size: 40px;
    color: #fff;
    line-height: 56px;
    font-weight: 500;

    @media screen and (max-width: 1280px) {
      font-size: 32px;
      line-height: 48px;
    }
    @media screen and (max-width: 760px) {
      font-size: var(--e-font-size-h8);
      line-height: var(--e-line-height-h8);
    }
  }

  &-desc {
    padding: var(--e-spacing-h3) 0 var(--e-spacing-h4);
    font-size: 32px;
    color: #fff;
    line-height: 44px;

    @media screen and (max-width: 1280px) {
      padding: var(--e-spacing-h5) 0 var(--e-spacing-h6);
      font-size: var(--e-font-size-h5);
      line-height: var(--e-line-height-h5);
    }

    @media screen and (max-width: 760px) {
      padding: var(--e-spacing-h6) 0 var(--e-spacing-h7);
      font-size: var(--e-font-size-text);
      line-height: var(--e-font-size-text);
    }
  }
}

.step-collapse {
  width: 100%;

  .step-collapse-panel {
    padding: var(--e-spacing-h9);
    font-size: var(--e-font-size-text);

    .step-content {
      .step-desc {
        color: var(--migration-sub-text-color);
      }

      .step-card {
        border-top: 1px solid #c5c5c5;
        margin-top: var(--e-spacing-h6);
        padding-top: var(--e-spacing-h6);

        &-title {
          font-weight: 700;
        }

        &-desc {
          color: var(--migration-sub-text-color);
        }

        &-feature-wrap {
          display: flex;
          align-items: first baseline;
        }

        &-feature-img {
          font-size: 14px;
          margin-right: var(--e-spacing-h9);
        }

        &-feature-desc {
          color: var(--migration-desc-text-color);
        }
      }
    }
  }
}

.video-box {
  :deep(.el-dialog__header) {
    display: none;
  }
  :deep(.el-dialog__body) {
    padding: 0;
  }
  .home-banner-video {
    display: block;
    margin: 0 auto;
    width: 100%;
  }
}
</style>
