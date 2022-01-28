/* eslint-disable no-shadow */
import FakeModule from "@/utils/fakeModule";

const state = {
  dashboardData: [],
};
const mutations = {
  setDashboardData(state, data) {
    state.dashboardData = data;
  },
};
const getters = {
  getDashboardData(state) {
    return state.dashboardData;
  },
};
const actions = {
  // eslint-disable-next-line no-unused-vars
  fetchDashboardData({ commit }) {
    return new Promise((resolve, reject) => {
      try {
        new FakeModule().get("/dashboard.json").then((response) => {
          commit("setDashboardData", response.data);
          console.log(response);
          resolve(response);
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};
export default {
  state,
  getters,
  mutations,
  actions,
};
