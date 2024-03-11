---
title: '活动征集'
---

<script  setup>
import { computed } from 'vue';
import { useCommon } from '@/stores/common';
import BannerLevel2 from '@/components/BannerLevel2.vue'

import banner from '@/assets/illustrations/banner-secondary.png';
import illustration from '@/assets/illustrations/meetup.png';

import img2 from '@/assets/category/meetup/img2.png';
import img3 from '@/assets/category/meetup/img3.png';
import img2Dark from '@/assets/category/meetup/img2_dark.png';
import img3Dark from '@/assets/category/meetup/img3_dark.png';
import IconDownload from '~icons/app/icon-download.svg';

const commonStore = useCommon();
const isLight = computed(() => (commonStore.theme === 'light' ? true : false));
</script>

<ClientOnly>
  <BannerLevel2
  title="活动征集"
  :illustration="illustration"
  :background-image="banner"
  />
</ClientOnly>
<div class="contribution-markdown">
<div class="markdown">

## 如何申请

如果您有兴趣在所在城市举办 openGauss，为了保证活动顺利进行，在举办社区开发者活动前，请向社区邮箱 [common@public.opengauss.org](mailto:common@public.opengauss.org) 发邮件获取申请表格。

## 申办审核

如果您的申请符合上述申办要求，我们会在 5 个工作日内审核并通过电子邮件 [common@public.opengauss.org](mailto:common@public.opengauss.org) 与您联系，以便提供 openGauss Meetup 赋能支持并与 openGauss 社区冠名联合主办单位；即便申请不合适，我们仍会通过电子邮件通知您，请确保申办表信息无误。

## 申办单位收获

<ul class="list">
  <li><img src='./icon-down_circleline.png' class='img' />社区物料、资金支持</li>
  <li><img src='./icon-down_circleline.png' class='img' />给自己的区域客户做赋能</li>
  <li><img src='./icon-down_circleline.png' class='img' />发掘新的客户线索</li>
  <li><img src='./icon-down_circleline.png' class='img' />提升产品区域影响力</li>
</ul>

## 可获得哪些赋能支持

<a href='/file/openGauss社区介绍.pdf' download>
<OButton
  class="case-download"
  type="outline"
  size="mini"
>
 下载 《openGauss社区介绍》
  <template #suffixIcon>
    <OIcon><IconDownload /></OIcon>
  </template>
</OButton>
</a>

- 活动物料模板（易拉宝、宣传海报、主 KV、横幅、拍照异形牌、直播背景框等源文件）
- 宣传资源支持（报名小程序、官网、公众号、社群等渠道宣传）
- openGauss B 站直播间资源（如需直播）
- 社区纪念品（支持 100 人规模以下的实际人数申请）

<p class='collect-img'>
  <img :src='isLight?img2:img2Dark'  />
  <img :src='isLight?img3:img3Dark'  />
</p>

## 活动举办

申办单位作为联合主办方参与筹办 Meetup，活动物料使用符合 openGauss 社区品牌规范，作为主导力量推动活动全流程，保证活动的顺利进行。

<!-- ## 活动成果反馈

感谢 Meetup 主办方为 openGauss 社区举办精彩的开发者活动。可以更好地了解活动的情况和效果，从而不断提升 openGauss Meetup 活动的质量和影响力，在活动结束后 3 个工作日内主办方需向社区提供验收反馈资料。

在此处填写[Meetup 成果反馈表单](/zh/interaction/event-list/meetup-feedback/) -->

</div>
</div>

<style lang="scss" scoped>
  .collect-img {
    display:flex;
    gap:40px;
    margin:16px 0;
    @media (max-width: 1639px) {
      flex-direction: column;
      gap:16px;
    }
    img{
        max-width:650px
    }
  }
  .list{
    padding-left:0; 
    list-style: none;
    li{
     &:not(:last-child){
      margin-bottom:16px;
     }
      .img{
        margin-right:16px;
        width:20px !important;
      }
    }
  }
</style>
