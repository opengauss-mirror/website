<script setup lang="ts">
import { OBreadcrumb, OBreadcrumbItem, useMessage } from '@opensig/opendesign';
import { useData } from 'vitepress';
import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue';
import { useClipboard } from '~@/composables/useClipboard';
import { useI18n } from '~@/i18n';

const { frontmatter } = useData();
const i18n = useI18n();

const message = useMessage();

const onCopyClick = (e: MouseEvent) => {
  const text = (e.currentTarget as HTMLElement).parentElement!.querySelector('pre')!.textContent ?? '';
  useClipboard({
    text,
    target: e,
    success: () => {
      message.success({
        content: i18n.value.common.COPY_SUCCESS,
      });
    },
    error: () => {
      message.danger({
        content: i18n.value.common.COPY_FAILED,
      });
    },
  });
};

const docWrapperRef = useTemplateRef('docWrapperRef');

onMounted(() => {
  const btns = docWrapperRef.value?.querySelectorAll('button.copy') as NodeListOf<HTMLButtonElement>;
  btns?.forEach((btn) => {
    btn.addEventListener('click', onCopyClick);
  });
});

onBeforeUnmount(() => {
  const btns = docWrapperRef.value?.querySelectorAll('button.copy') as NodeListOf<HTMLButtonElement>;
  btns?.forEach((btn) => {
    btn.removeEventListener('click', onCopyClick);
  });
})
</script>

<template>
  <div class="sig-apply-doc">
    <OBreadcrumb>
      <OBreadcrumbItem :href="frontmatter.goBackUrl">{{ i18n.sig.sigCenter }}</OBreadcrumbItem>
      <OBreadcrumbItem>{{ i18n.sig.sigApplicationProcess }}</OBreadcrumbItem>
    </OBreadcrumb>
    <div ref="docWrapperRef" class="doc-wrapper">
      <Content />
    </div>
  </div>
</template>

<style lang="scss">
.sig-apply-doc .o-breadcrumb {
  @include respond-to('<=pad_v') {
    display: none;
  }
}
.sig-apply-doc {
  display: flow-root;
  width: var(--o-r-grid-section-width);
  margin: 0 auto;
  font-size: var(--o-r-font_size-text1);
  line-height: var(--o-r-line_height-text1);
  padding-bottom: var(--o-r-gap-10);

  .o-breadcrumb {
    margin-top: var(--o-r-gap-7);
  }

  .doc-wrapper {
    padding: var(--o-r-gap-7);
    background-color: var(--o-color-fill2);
    margin-top: var(--o-r-gap-5);
    border-radius: 4px;
  }

  .lang {
    display: none;
  }

  div.vp-adaptive-theme {
    position: relative;

    pre {
      overflow: auto;
      padding: var(--o-r-gap-3) var(--o-r-gap-4);
      border-radius: 4px;
    }

    code {
      font-family: 'Consolas', 'Microsoft YaHei';
      font-size: var(--o-r-font_size-tip1);
      line-height: var(--o-r-line_height-tip1);
    }

    .copy {
      cursor: pointer;
      position: absolute;
      top: calc(var(--o-gap-2) + 2px);
      right: var(--o-gap-3);
      z-index: 3;
      border-radius: 4px;
      width: 24px;
      height: 24px;
      background-color: var(--o-color-fill1);
      background-image: url('@/assets/svg-icons/icon-copy2.svg');
      background-position: 50%;
      background-size: 20px;
      background-repeat: no-repeat;
      border: none;
      opacity: 0;
      transition: all var(--o-duration-m1) var(--o-easing-standard-in);

      @include respond-to('<=pad') {
        top: var(--o-gap-2);
      }

      @include respond-to('phone') {
        top: 12px;
        opacity: 1;
        width: 16px;
        height: 16px;
        background-size: 14px;
      }
    }

    @include hover {
      .copy {
        opacity: 1;
      }
    }
  }

  ul {
    list-style: disc inside;
  }

  table {
    border-collapse: separate; /* Required for border-radius to work */
    border-spacing: 0; /* Removes spacing between cells */
    border-radius: 4px;
    width: 100%;
    margin: var(--o-r-gap-4) 0;
    thead th {
      background-color: var(--o-color-control3-light);
      padding: var(--o-r-gap-3) var(--o-r-gap-6);
    }

    th {
      text-align: left;
      &:first-child {
        border-top-left-radius: 4px;
      }
      &:last-child {
        border-top-right-radius: 4px;
      }
    }

    td {
      padding: var(--o-r-gap-3) var(--o-r-gap-6);
      background-color: var(--o-color-fill2);
      border-bottom: 1px solid var(--o-color-control4);
    }
  }

  h1 {
    margin: var(--o-r-gap-7) 0;
    margin-top: 0;
    font-size: var(--o-r-font_size-display3);
    line-height: var(--o-r-line_height-display3);
  }

  h2 {
    margin-top: var(--o-r-gap-7);
    margin-bottom: var(--o-r-gap-4);
    font-size: var(--o-r-font_size-h3);
    line-height: var(--o-r-line_height-h3);
  }

  h3 {
    margin-top: var(--o-r-gap-4);
    margin-bottom: var(--o-r-gap-2);
    font-size: var(--o-r-font_size-text1);
    line-height: var(--o-r-line_height-text1);
  }

  p {
    margin: var(--o-r-gap-2) 0;
  }

  li {
    margin: var(--o-r-gap-2) 0;
  }
}

@include in-dark {
  .sig-apply-doc {
    div.vp-adaptive-theme .copy {
      background-image: url('@/assets/svg-icons/icon-copy-dark.svg');
    }
  }
}
</style>
