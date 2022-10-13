/* eslint-disable no-shadow */
// eslint-disable-next-line import/no-cycle
import AxiosModule from "@/utils/axiosModule";

const state = {
  devices: [],
};
const getters = {};
const mutations = {};
const actions = {
  // eslint-disable-next-line no-unused-vars
  addNewDevice({ commit }, device) {
    return new Promise((resolve) => {
      new AxiosModule().post("/device", device).then((response) => {
        if (!response.isError) {
          resolve({ status: true });
        } else {
          resolve({ status: false, error: response.message });
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
