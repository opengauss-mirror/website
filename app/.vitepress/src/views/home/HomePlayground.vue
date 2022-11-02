<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';

import letsPlay from '@/assets/category/home/letsPlay.png';
import TryTitle from '@/assets/category/home/title.png';
import TryTitleMo from '@/assets/category/home/title-mo.png';

const playground = ref(null);
const textBlock = ref(false);

onMounted(() => {
  const observer = new IntersectionObserver((res) => {
    if (res[0].intersectionRatio <= 0) return;
    textBlock.value = false;
    nextTick(() => {
      textBlock.value = true;
    });
  });
  playground.value && observer.observe(playground.value);
});
</script>
<template>
  <div class="title-mo">
    <img :src="TryTitleMo" />
  </div>
  <div ref="playground" class="playground">
    <div class="playground-content">
      <div v-if="textBlock" class="left-code">
        <div class="first">
          ➜ # <span class="first-span typing">select * from openGauss;</span>
        </div>
        <div>
          <div class="block1 fast-hide">
            <span class="min-l-w">category</span><span class="min-line">|</span
            ><span class="min-r-w">create_at</span>
          </div>
          <div class="block2 fast-hide">
            <span class="min-l-w"
              >---------------------------------------------------</span
            ><span class="min-line">+</span
            ><span class="min-r-w">---------------</span>
          </div>
          <div class="block3 fast-hide">
            <span class="min-l-w">open source relational database</span
            ><span class="min-line">|</span
            ><span class="min-r-w">2020.06.30</span>
          </div>
          <div class="block4 fast-hide">(1 row)</div>
          <div class="block5 fast-hide typing last">➜ #</div>
        </div>
      </div>
      <div class="right-text">
        <img :src="TryTitle" class="first-code" />
        <a
          class="lets-play"
          href="https://moocstudio.openeuler.sh/"
          target="_blank"
        >
          <img :src="letsPlay" alt="" />
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title-mo {
  display: none;
  text-align: center;
  margin: var(--o-spacing-h2) 0 var(--o-spacing-h4);
  img {
    max-height: 71px;
    object-fit: cover;
  }
  @media screen and (max-width: 760px) {
    display: block;
  }
}
.playground {
  margin: var(--o-spacing-h2) auto;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('@/assets/category/home/bg-code-pc.png') no-repeat
    center/cover;
  height: 378px;
  border-radius: 0 0 10px 10px;
  &-content {
    width: 845px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #7d32ea;
    padding: 33px 50px 26px 83px;
    background-color: rgba($color: #1c0045, $alpha: 0.32);
    @media screen and (max-width: 1100px) {
      padding: 24px;
    }
    @media screen and (max-width: 760px) {
      background-color: transparent;
      border: 0 none;
      display: block;
      width: 100%;
    }
  }
  .left-code {
    width: 390px;
    height: 227px;
    text-align: left;
    font-size: var(--o-font-size-h8);
    color: #d0f2ff;
    line-height: var(--o-line-height-h8);

    .first {
      display: flex;
      align-items: center;
    }
    .first-span {
      position: relative;
      margin-left: var(--o-spacing-h10);
    }
    .typing {
      position: relative;
      display: inline-block;
      visibility: hidden;
      width: 20ch;
      animation: typing 3s forwards steps(20);
      white-space: nowrap;
      overflow: hidden;
    }
    .min-l-w,
    .min-r-w {
      overflow: hidden;
      height: 36px;
      white-space: nowrap;
    }
    .min-l-w {
      width: 257px;
      @media screen and (max-width: 760px) {
        width: 200px;
      }
    }
    .min-r-w {
      width: 95px;
    }
    .min-line {
      width: 20px;
      display: inline-block;
      text-align: center;
    }
    .typing::before,
    .first-span::before {
      content: '';
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      width: 10px;
      height: 16px;
      animation: blink 1s infinite steps(1);
    }
    .first-span::before {
      animation: blink 0.5s 6 steps(1);
    }
    .fast-hide {
      display: flex;
      visibility: hidden;
      -webkit-animation: block 0.3s forwards;
      animation: block 0.3s forwards;
    }
    @for $i from 0 through 6 {
      .block#{ $i} {
        animation-delay: $i * 0.3 + 3s;
      }
    }

    .block5 {
      width: 5ch;
    }
    @keyframes block {
      to {
        visibility: visible;
      }
    }
  }
  .right-text {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 227px;
    margin-left: var(--o-spacing-h5);
    img {
      width: 100%;
    }
    .first-code {
      max-height: 77px;
      object-fit: cover;
      @media screen and (max-width: 760px) {
        display: none;
      }
    }
    .lets-play {
      cursor: pointer;
      max-width: 210px;
      object-fit: cover;
    }
  }
  @media screen and (max-width: 1100px) {
    padding: 40px 24px;
  }
  @media screen and (max-width: 760px) {
    flex-direction: column-reverse;
    justify-content: start;
    margin: 0 auto;
    padding: 0;
    width: calc(100vw - 32px);
    height: 323px;
    background-image: url('../../assets/category/home/bg-code-mo.png');
    .left-code {
      margin-top: 25px;
      padding: 18px 10px 15px;
      width: 100%;
      height: 208px;
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
    .right-text {
      margin: 0;
      height: 60px;
      .lets-play {
        width: 142px;
        display: block;
        margin: 0 auto;
      }
    }
  }
  @media screen and (max-width: 385px) {
    background-size: contain;
  }
  @keyframes typing {
    from {
      width: 0;
    }
    to {
      visibility: visible;
    }
  }
  @keyframes blink {
    50% {
      background: #ff9933;
    }
  }
}
</style>
