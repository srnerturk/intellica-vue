/* eslint-disable no-shadow */
/* eslint-disable import/no-cycle */
import AxiosModule from "@/utils/axiosModule";

const state = {
  token: "",
};
const actions = {
  // eslint-disable-next-line no-unused-vars
  login({ commit }, user) {
    return new Promise((resolve) => {
      new AxiosModule().post("/auth/login", user).then((response) => {
        const token = response.data.accessToken;
        if (token) {
          commit("setToken", token);
          localStorage.setItem("mifi-token", token);
          resolve({ status: true });
        } else {
          resolve({ status: false, error: response.data.message });
        }
      });
    });
  },
  logout({ commit }) {
    return new Promise((resolve) => {
      commit("setToken", "");
      localStorage.removeItem("mifi-token");
      resolve(true);
    });
  },
  // eslint-disable-next-line no-unused-vars
  register({ commit }, user) {
    return new Promise((resolve) => {
      new AxiosModule().post("/auth/register", user).then((response) => {
        if (response.status === 200) {
          resolve({ status: true });
        } else {
          resolve({ status: false, error: response.data.message });
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
