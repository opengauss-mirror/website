---
title: 'Contribution'
---

<script lang="ts" setup>
import ContributionMap from "@/views/contribution/ContributionMap.vue";
import ContributionTab from "@/views/contribution/ContributionTab.vue";
import BannerLevel2 from '@/components/BannerLevel2.vue'

import banner from '@/assets/illustrations/banner-secondary.png';
import illustration from '@/assets/illustrations/contribution.png';
</script>

<div>
  <ClientOnly>
    <BannerLevel2
      :background-image="banner"
      title="Contribution"
      :illustration="illustration" 
    />
  </ClientOnly>
  <ContributionTab />
  <ContributionMap />
</div>
