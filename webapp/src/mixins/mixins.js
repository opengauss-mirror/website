export default {
    methods: {
        goTo(path) {
            this.$router.push({
              name: path
            });
          },
          goToQuery(name, params) {
            this.$router.push({
              name: name,
              query: params || {}
            });
          },
          goToParam(name, params) {
            this.$router.push({
              name: name,
              params: params || {}
            });
          },
          goBack() {
            this.$router.back();
          },
    }
}