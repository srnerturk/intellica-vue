import Vue from "vue";
import Vuex from "vuex";
import dashboard from "./modules/dashboard";
import devices from "./modules/devices";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    dashboard,
    devices,
  },
});
