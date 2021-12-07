import Vue from "vue";
import App from "@/App.vue";
import "@/registerServiceWorker";
import router from "@/router";
import store from "@/store";
import "@/assets/css/styles.scss";

Vue.config.productionTip = false;



new Vue({
  router,
  store,
  render: (h) => h(App),
  async created() {
    // this.$store.commit("changeSelectedState", "Utah")
    this.$store.commit("init");
  },
}).$mount("#app");
