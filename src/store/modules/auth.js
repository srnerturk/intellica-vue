/* eslint-disable no-shadow */
/* eslint-disable import/no-cycle */
import AxiosModule from "@/utils/axiosModule";

const state = {
  token: "",
  email: "",
  user: {},
};
const actions = {
  // eslint-disable-next-line no-unused-vars
  login({ commit, dispatch }, user) {
    return new Promise((resolve) => {
      new AxiosModule().post("/auth/login", user).then((response) => {
        if (!response.isError) {
          const token = response.data.accessToken;
          commit("setToken", token);
          commit("setEmail", response.data.email);
          localStorage.setItem("mifi-token", token);
          localStorage.setItem("mifi-email", response.data.email);
          localStorage.setItem("mifi-user-token", response.data.UserToken);
          dispatch("GetUserByEmail");
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
  // eslint-disable-next-line consistent-return
  GetUserByEmail({ commit, dispatch }) {
    const email = localStorage.getItem("mifi-email");
    if (email) {
      return new Promise((resolve) => {
        new AxiosModule().get(`/auth/GetUserByEmail/${email}`).then((response) => {
          if (!response.isError) {
            commit("setUser", response.data);
            resolve(response.data);
          } else {
            dispatch("logout");
          }
        });
      });
    }
  },
  // eslint-disable-next-line no-unused-vars
  register({ commit }, user) {
    return new Promise((resolve) => {
      new AxiosModule().post("/auth/register", user).then((response) => {
        if (!response.isError) {
          resolve({ status: true });
        } else {
          resolve({ status: false, error: response.message });
        }
      });
    });
  },
  // eslint-disable-next-line no-unused-vars
  activateAccount({ commit }, credentials) {
    return new Promise((resolve) => {
      new AxiosModule().post("/auth/activateAccount", credentials).then((response) => {
        console.log(response);
        if (!response.isError) {
          resolve({ status: true });
        } else {
          resolve({ status: false, error: response.message });
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
  setUser(state, user) {
    state.user = user;
  },
};
const getters = {
  getToken(state) {
    return state.token;
  },
  getEmail(state) {
    return state.email || localStorage.getItem("mifi-email");
  },
  getUser(state) {
    return state.user;
  },
  isAuthenticated() {
    return localStorage.getItem("mifi-token");
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
