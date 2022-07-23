import Vue from "vue";
import Vuex from "vuex";
import tester from "./modules/tester";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    tester,
  },
});
