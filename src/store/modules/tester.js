/* eslint-disable no-shadow */
// eslint-disable-next-line import/no-cycle
import AxiosModule from "@/utils/axiosModule";

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
  fetchTesterList({ commit }, data) {
    return new Promise((resolve, reject) => {
      const url = `tester/list/${data.page}/${data.q}`;
      new AxiosModule().get(url).then((response) => {
        try {
          commit("setTesterList", response.data);
          resolve(response.data);
        } catch (error) {
          reject(error);
        }
      });
    });
  },
  // eslint-disable-next-line no-unused-vars
  addNewTester({ commit }, tester) {
    return new Promise((resolve) => {
      new AxiosModule().post("/tester", tester).then((response) => {
        if (!response.isError) {
          resolve({ status: true });
        } else {
          resolve({ status: false, error: response.message });
        }
      });
    });
  },
  // eslint-disable-next-line no-unused-vars
  updateTester({ commit }, tester) {
    return new Promise((resolve) => {
      new AxiosModule().put("/tester", tester).then((response) => {
        try {
          resolve({ status: true });
        } catch (error) {
          resolve({ status: false, error: response.message });
        }
      });
    });
  },
  fetchTester({ commit }, id) {
    return new Promise((resolve, reject) => {
      new AxiosModule().get(`/tester/get/${id}`).then((response) => {
        try {
          commit("setTester", response.data);
          resolve(response.data);
        } catch (error) {
          reject(error);
        }
      });
    });
  },
  // eslint-disable-next-line no-unused-vars
  deleteTester({ commit }, id) {
    console.log(id);
    return new Promise((resolve, reject) => {
      new AxiosModule().delete(`/tester/${id}`).then((response) => {
        try {
          resolve(response.message);
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
