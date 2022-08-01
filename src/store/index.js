/* eslint-disable import/no-cycle */
import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";
import tester from "./modules/tester";
import projects from "./modules/project";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    tester,
    projects,
  },
});
