<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: '',
  },
  lecturerList: {
    type: Object,
    required: true,
    default: () => null,
  },
});
</script>

<template>
  <div class="summit-guests">
    <p class="title">{{ title }}</p>
    <div class="lecturer-list">
      <div v-for="item in lecturerList" :key="item.name" class="lecturer-list-item">
        <slot name="img">
          <div>
            <img :src="item.img" />
          </div>
        </slot>
        <slot name="name">
          <p>{{ item.name }}</p>
        </slot>
        <slot name="title">
          <div v-for="titleItem in item.position" :key="titleItem" class="lecturer-list-item-title">
            <p>{{ titleItem }}</p>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@include in-dark {
  img {
    @include img-in-dark;
  }
}
.title {
  margin-top: var(--o-spacing-h2);
  font-size: var(--o-font-size-h5);
  font-weight: 400;
  line-height: var(--o-line-height-h5);
  text-align: center;
}
.lecturer-list {
  margin: var(--o-spacing-h3) auto;
  display: grid;
  grid-template-columns: repeat(4, minmax(82px, 1fr));
  column-gap: 0;
  row-gap: 0;
  @media (max-width: 1416px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 780px) {
    grid-template-columns: repeat(2, 1fr);
  }
  &-item {
    @media (max-width: 780px) {
      width: 100%;
      margin: 0 auto;
    }
    img {
      width: 120px;
      height: 120px;
      margin: 0 auto;
      display: block;
      @media (max-width: 780px) {
        width: 95px;
        height: 95px;
      }
    }
    p {
      font-size: var(--o-spacing-h5);
      color: var(--o-color-brand1);
      text-align: center;
      margin-top: 8px;
      @media (max-width: 780px) {
        margin-top: 6px;
      }
    }
    &-title {
      margin-bottom: var(--o-spacing-h8);
      &:nth-last-of-type(1) {
        margin-bottom: var(--o-spacing-h4);
      }
      p {
        color: var(--o-color-text1);
        font-size: var(--o-font-size-text);
        font-weight: 400;
        line-height: var(--o-line-height-text);
        @media (max-width: 780px) {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
        }
      }
      @media (max-width: 780px) {
        margin-bottom: 0;
      }
    }
  }
}
.main-forum {
  .lecturer-list {
    @media (min-width: 1417px) {
      .lecturer-list-item {
        &:nth-of-type(1),
        &:nth-of-type(2),
        &:nth-of-type(3) {
          transform: translateX(50%);
        }
        &:nth-of-type(4) {
          grid-column: 1 / span 1;
        }
      }
    }
  }
}
.yun-forum,
.app-forum,
.data-forum {
  .lecturer-list {
    @media (min-width: 1417px) {
      .lecturer-list-item {
        &:nth-of-type(5),
        &:nth-of-type(6),
        &:nth-of-type(7) {
          transform: translateX(50%);
        }
      }
    }
  }
}
.full-forum {
  .lecturer-list {
    @media (min-width: 1417px) {
      .lecturer-list-item {
        &:nth-of-type(5) {
          grid-column: 2 / span 1;
        }
        &:nth-of-type(6) {
          grid-column: 3 / span 1;
        }
      }
    }
  }
}
</style>
