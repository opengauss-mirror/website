<script setup lang="ts"></script>

<template>
  <div class="markdown-wrapper">
    <div class="markdown">
      <Content />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.markdown-wrapper {
  overflow: hidden;
}
.markdown {
  border: 1px solid transparent;
  margin-bottom: var(--o-spacing-h1);
  @media (max-width: 1100px) {
    margin-bottom: var(--o-spacing-h2);
  }

  :deep(h1) {
    margin-top: 0;
  }

  :deep(h2) {
    margin-bottom: var(--o-spacing-h6);
  }

  :deep(ol) {
    list-style-type: decimal;
  }

  :deep(ul) {
    list-style-type: disc;
  }
}

// .bread {
//   height: 1px;
// }
</style>
