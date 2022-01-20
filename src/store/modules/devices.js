/* eslint-disable no-shadow */
import FakeModule from "@/utils/fakeModule";

const state = {
  devices: {},
  sketches: null,
};
const getters = {
  getDeviceByLocations(state) {
    return state.devices;
  },
  getSketchesByDevice(state) {
    return state.sketches;
  },
};
const mutations = {
  setDeviceByLocations(state, data) {
    state.devices = data;
  },
  setSketchesByDevice(state, data) {
    state.sketches = data;
  },
};
const actions = {
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
  state, getters, mutations, actions,
};
