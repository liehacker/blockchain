import Vue from "vue";
import App from "./App.vue";
import BlockChain from "./blockchain";
import router from "./router";
import store from "./store";
import SvgIcon from "@/components/SvgIcon.vue";

Vue.config.productionTip = false;
Vue.component("svg-icon", SvgIcon);
declare module "vue/types/vue" {
  interface Vue {
    $blockchain: BlockChain; // or specify gAuth type if .d.ts is provided
  }
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
