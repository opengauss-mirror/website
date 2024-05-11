<script setup lang="ts">
import AppContent from '@/components/AppContent.vue';
import SummitBanner from './components/SummitBanner.vue';
import SummitIntro from './components/SummitIntro.vue';
import SummitAgenda from './components/SummitAgenda.vue';
import SummitNow from './components/SummitNow.vue';

import summitData from './data';
</script>

<template>
  <SummitBanner :banner-data="summitData.banner"></SummitBanner>
  <AppContent>
    <SummitIntro :intro-data="summitData.intro"></SummitIntro>
    <SummitAgenda :agenda-data="summitData.agenda"></SummitAgenda>
    <SummitNow :now-data="summitData.now"></SummitNow>
  </AppContent>
</template>

<style lang="scss" scoped>

</style>
