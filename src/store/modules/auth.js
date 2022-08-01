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
        if (response.data.token) {
          commit("setToken", response.data.token);
          resolve({ status: true });
        } else {
          resolve({ status: false, error: response.data.message });
        }
      });
    });
  },
  // eslint-disable-next-line no-unused-vars
  register({ commit }, user) {
    return new Promise((resolve) => {
      new AxiosModule().post("/auth/register", user).then((response) => {
        if (response.data.status === 200) {
          resolve({ status: true });
        } else {
          resolve({ status: false, error: response.data.error });
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
