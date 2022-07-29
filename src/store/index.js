import Vue from "vue";
import Vuex from "vuex";
import tester from "./modules/tester";
import projects from "./modules/project";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    tester,
    projects,
  },
});
