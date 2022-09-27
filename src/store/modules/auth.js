/* eslint-disable no-shadow */
/* eslint-disable import/no-cycle */
import AxiosModule from "@/utils/axiosModule";

const state = {
  token: "",
  email: "",
};
const actions = {
  // eslint-disable-next-line no-unused-vars
  login({ commit }, user) {
    return new Promise((resolve) => {
      new AxiosModule().post("/auth/login", user).then((response) => {
        const token = response.data.accessToken;
        if (token) {
          commit("setToken", token);
          commit("setEmail", response.data.email);
          localStorage.setItem("mifi-token", token);
          localStorage.setItem("mifi-email", response.data.email);
          resolve({ status: true });
        } else {
          resolve({ status: false, error: response.message });
        }
      });
    });
  },
  logout({ commit }) {
    return new Promise((resolve) => {
      commit("setToken", "");
      commit("setEmail", "");
      localStorage.removeItem("mifi-token");
      localStorage.removeItem("mifi-email");
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
  setEmail(state, email) {
    state.email = email;
  },
};
const getters = {
  getToken(state) {
    return state.token;
  },
  getEmail(state) {
    return state.email || localStorage.getItem("mifi-email");
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
