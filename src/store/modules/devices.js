/* eslint-disable no-shadow */
// eslint-disable-next-line import/no-cycle
import AxiosModule from "@/utils/axiosModule";
import FakeModule from "@/utils/fakeModule";

const state = {
  devices: {},
  sketches: null,
  deviceList: [],
  currentDevice: {},
};
const getters = {
  getDeviceByLocations(state) {
    return state.devices;
  },
  getSketchesByDevice(state) {
    return state.sketches;
  },
  getDeviceList(state) {
    return state.deviceList;
  },
  getCurrentDevice(state) {
    return state.currentDevice;
  },
};
const mutations = {
  setDeviceByLocations(state, data) {
    state.devices = data;
  },
  setSketchesByDevice(state, data) {
    state.sketches = data;
  },
  setDeviceList(state, data) {
    state.deviceList = data;
  },
  setCurrentDevice(state, data) {
    state.currentDevice = data;
  },
};
const actions = {
  getDeviceDetail({ commit }, deviceId) {
    console.log(deviceId);
    return new Promise((resolve, reject) => {
      new AxiosModule().get("/device-detail").then((response) => {
        try {
          commit("setCurrentDevice", response.data);
          resolve(response.data);
        } catch (error) {
          reject(error);
        }
      });
    });
  },
  fetchDevices({ commit }) {
    return new Promise((resolve, reject) => {
      new AxiosModule().get("/list-device").then((response) => {
        try {
          commit("setDeviceList", response.data);
          resolve(response.data);
        } catch (error) {
          reject(error);
        }
      });
    });
  },
  fetchDevicesByLocation({ commit }, location) {
    return new Promise((resolve, reject) => {
      new FakeModule().get("/locations.json").then((response) => {
        try {
          const result = response.data.filter((x) => x.location === location)[0];
          if (result) {
            commit("setDeviceByLocations", result);
          } else {
            commit("setDeviceByLocations", {
              location,
              Devices: [],
            });
          }

          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  },
  fetchSketch({ commit }, device) {
    return new Promise((resolve, reject) => {
      new FakeModule().get("/sketch.json").then((response) => {
        try {
          // eslint-disable-next-line eqeqeq
          const result = response.data.filter((x) => x.device == device)[0];
          if (result) {
            commit("setSketchesByDevice", result);
          } else {
            commit("setSketchesByDevice", {
              device,
              steps: [],
            });
          }

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
