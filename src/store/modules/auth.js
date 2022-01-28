/* eslint-disable no-shadow */
import AxiosModule from "@/utils/axiosModule";

const state = {
  token: "",
};
const actions = {
  // eslint-disable-next-line no-unused-vars
  login({ commit }, user) {
    return new Promise((resolve, reject) => {
      new AxiosModule().post("/api/auth", user).then((response) => {
        if (response.data.token) {
          commit("setToken", response.data.token);
          resolve();
        } else {
          reject();
        }
      });
    });
  },
};
const mutations = {
  setToken(state, token) {
    state.token = token;
  },
};
const getters = {
  getToken(state) {
    return state.token;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
