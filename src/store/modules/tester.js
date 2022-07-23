/* eslint-disable no-shadow */
import FakeModule from "@/utils/fakeModule";

const state = {
  testerList: [],
  tester: {},
};
const getters = {
  getTesters(state) {
    return state.testerList;
  },
  getTester(state) {
    return state.tester;
  },
};

const mutations = {
  setTesterList(state, data) {
    state.testerList = data;
  },
  setTester(state, tester) {
    state.tester = tester;
  },
};
const actions = {
  fetchTesterList({ commit }) {
    return new Promise((resolve, reject) => {
      new FakeModule().get("/tester.json").then((response) => {
        try {
          commit("setTesterList", response.data);
          resolve(response.data);
        } catch (error) {
          reject(error);
        }
      });
    });
  },
  fetchTester({ commit }, tester) {
    commit("setTester", tester);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
