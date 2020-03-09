<template>
  <div class="header section">
    <ul>
      <li
        v-for="(nav,index) in head"
        :class="fatherStatus == index?'active':''"
        :key="index"
        @click="goNav(nav,index)"
      >{{nav.name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      head: [
        {
          name: this.$t("header_home"),
          path: "Home"
        },
        {
          name: this.$t("header_community"),
          path: "Community"
        },
        {
          name: this.$t("header_user"),
          path: "User"
        },
        {
          name: this.$t("header_efficiency"),
          path: "Efficiency"
        },

        {
          name: "文档",
          link: "https://www.baidu.com/"
        },
        {
          name: this.$t("header_down"),
          path: "Down"
        },
        {
          name: this.$t("header_security"),
          path: "Security"
        }
      ],
      fatherStatus: 0,
    };
  },
  methods: {
    goNav(nav, index) {
      if (nav.link) {
        window.location.href = nav.link;
      } else {
        this.goTo(nav.path);
      }
      this.fatherStatus = index;
    }
  },
  created() {
    this.fatherStatus = this.$route.meta.id || 0;
  }
};
</script>

<style lang='scss'>
.header {
  ul {
    display: flex;
    li {
      cursor: pointer;
      &.active {
        color: red;
      }
      .drop {
        p {
          &.active {
            color: aquamarine;
          }
        }
      }
    }
  }
}
</style>