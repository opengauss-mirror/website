<template>
  <div id="app">
     <Header></Header>
    <router-view />
  </div>
</template>

 

<script>
import Header from './components/header'
export default {
  data() {
    return {}
  },
  components: {
    Header
  }
}
</script>

 