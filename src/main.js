import Vue from "vue";
import TrendChart from "vue-trend-chart";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/css/tailwind.css";

Vue.config.productionTip = false;
Vue.use(TrendChart);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
