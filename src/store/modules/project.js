/* eslint-disable no-shadow */
// eslint-disable-next-line import/no-cycle
import AxiosModule from "@/utils/axiosModule";

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
      new AxiosModule().get("/project/all").then((response) => {
        try {
          commit("setProjectList", response.data);
          resolve(response.data);
        } catch (error) {
          reject(error);
        }
      });
    });
  },
  // eslint-disable-next-line no-unused-vars
  addNewProject({ commit }, project) {
    return new Promise((resolve) => {
      new AxiosModule().post("/project/create", project).then((response) => {
        if (response.status === 200) {
          resolve({ status: true });
        } else {
          resolve({ status: false, error: response.data.message });
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
