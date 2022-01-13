/* eslint-disable no-shadow */
import FakeModule from "@/utils/fakeModule";

const state = {
  dayData: [],
  deviceInfoData: [],
  barData: null,
};
const mutations = {
  setDayData(state, data) {
    state.dayData = data;
  },
  setDeviceInfoData(state, data) {
    state.deviceInfoData = data;
  },
  setBarData(state, data) {
    state.barData = data;
  },
};
const getters = {
  getDayData(state) {
    return state.dayData;
  },
  getDeviceInfoData(state) {
    return state.deviceInfoData;
  },
  getBarData(state) {
    return state.barData;
  },
};
const actions = {
  fetchByDayChartData({ commit }) {
    return new Promise((resolve, reject) => {
      new FakeModule().get("/days.json").then((response) => {
        try {
          console.log(response);
          commit("setDayData", response.data.dayCharts);
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  },
  fetchDeviceInfoData({ commit }) {
    return new Promise((resolve, reject) => {
      new FakeModule().get("/data.json").then((response) => {
        try {
          commit("setDeviceInfoData", response.data.dataCharts);
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  },
  fetchBarData({ commit }) {
    return new Promise((resolve, reject) => {
      new FakeModule().get("/bar.json").then((response) => {
        try {
          commit("setBarData", response.data);
          resolve();
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
