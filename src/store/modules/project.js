/* eslint-disable no-shadow */
import FakeModule from "@/utils/fakeModule";

const state = {
  projectList: [],
};
const getters = {
  getProjects(state) {
    return state.projectList;
  },
};
const mutations = {
  setProjectList(state, data) {
    state.projectList = data;
  },
};
const actions = {
  fetchProjectList({ commit }) {
    return new Promise((resolve, reject) => {
      new FakeModule().get("/projects.json").then((response) => {
        try {
          commit("setProjectList", response.data);
          resolve(response.data);
        } catch (error) {
          reject(error);
        }
      });
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
