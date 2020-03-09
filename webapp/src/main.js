import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueI18n from 'vue-i18n';
import axios from 'axios';
import Utils from './shared/utils';

import 'element-ui/lib/theme-chalk/index.css';
import Mixins from './mixins/mixins';

import '@/style.scss';
import zh from './i18n/lang/zh.js';
import en from './i18n/lang/en.js';


Vue.prototype.$http = axios;
Vue.prototype.$utils = Utils;

Vue.use(VueI18n);
Vue.mixin(Mixins);

Vue.config.productionTip = false;
const i18n = new VueI18n({
  locale: Utils.getLanguage('gaussLanguage'),
  messages: {
    'zh': zh,
    'en': en,
  }
})

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
