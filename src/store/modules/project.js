/* eslint-disable no-shadow */
// eslint-disable-next-line import/no-cycle
import AxiosModule from "@/utils/axiosModule";

const state = {
  projectList: [],
  project: {},
};
const getters = {
  getProjects(state) {
    return state.projectList;
  },
  getProject(state) {
    return state.project;
  },
};
const mutations = {
  setProjectList(state, data) {
    state.projectList = data;
  },
  setProject(state, data) {
    state.project = data;
  },
};
const actions = {
  fetchProjectList({ commit }) {
    return new Promise((resolve, reject) => {
      new AxiosModule().get("/project").then((response) => {
        try {
          commit("setProjectList", response.data);
          resolve(response.data);
        } catch (error) {
          reject(error);
        }
      });
    });
  },
  fetchProject({ commit }, id) {
    return new Promise((resolve, reject) => {
      new AxiosModule().get(`/project/${id}`).then((response) => {
        try {
          commit("setProject", response.data);
          resolve(response.data);
        } catch (error) {
          reject(error);
        }
      });
    });
  },
  // eslint-disable-next-line no-unused-vars
  updateProject({ commit }, project) {
    return new Promise((resolve) => {
      new AxiosModule().put("/project", project).then((response) => {
        try {
          resolve({ status: true });
        } catch (error) {
          resolve({ status: false, error: response.message });
        }
      });
    });
  },
  // eslint-disable-next-line no-unused-vars
  updateTestPoint({ commit }, floorPlan) {
    return new Promise((resolve) => {
      new AxiosModule().post("/TestPoint", floorPlan).then((response) => {
        try {
          resolve({ status: true });
        } catch (error) {
          resolve({ status: false, error: response.message });
        }
      });
    });
  },
  // eslint-disable-next-line no-unused-vars
  addNewProject({ commit }, project) {
    return new Promise((resolve) => {
      new AxiosModule().post("/project", project).then((response) => {
        if (!response.isEror) {
          resolve({ status: true });
        } else {
          resolve({ status: false, error: response.message });
        }
      });
    });
  },
  // eslint-disable-next-line no-unused-vars
  deleteTester({ commit }, id) {
    console.log(id);
    return new Promise((resolve, reject) => {
      new AxiosModule().delete(`/project/${id}`).then((response) => {
        try {
          resolve(response.message);
        } catch (error) {
          reject(error);
        }
      });
    });
  },
  // eslint-disable-next-line no-unused-vars
  addFloorPlan({ commit }, fileObject) {
    return new Promise((resolve) => {
      new AxiosModule().post("/floorPlan", fileObject).then((response) => {
        if (!response.isEror) {
          resolve(response.data);
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
