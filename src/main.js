import Vue from "vue";
import VueDraggableResizable from "vue-draggable-resizable";
import VueAlertify from "vue-alertify";
import TrendChart from "vue-trend-chart";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/assets/css/tailwind.css";

Vue.config.productionTip = false;
Vue.use(TrendChart);
Vue.use(VueAlertify);
Vue.use(Vuelidate);
Vue.component("vue-draggable-resizable", VueDraggableResizable);

store.dispatch("GetUserByEmail").then(() => {
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
});
