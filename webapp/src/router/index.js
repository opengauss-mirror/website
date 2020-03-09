import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home/home.vue";
import Community from "../views/community/community.vue";
import User from "../views/user/user.vue";
import Efficiency from "../views/efficiency/efficiency.vue";
import Down from "../views/down/down.vue";
import Security from "../views/security/security.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      id: 0
    }
  },
  {
    path: "/community",
    name: "Community",
    component: Community,
    meta: {
      id: 1
    }
  },
  {
    path: "/user",
    name: "User",
    component: User,
    meta: {
      id: 2
    }
  },
  {
    path: "/efficiency",
    name: "Efficiency",
    component: Efficiency,
    meta: {
      id: 3
    }
  },
  {
    path: "/doc",
    link: 'https://www.baidu.com/',
    meta: {
      id: 4
    }
  },
  {
    path: "/down",
    name: "Down",
    component: Down,
    meta: {
      id: 5
    }
  },
  {
    path: "/security",
    name: "Security",
    component: Security,
    meta: {
      id: 6
    }
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});

export default router;
