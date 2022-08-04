/* eslint-disable import/no-cycle */
import axios from "axios";
import store from "@/store";
import router from "@/router";

export default class AxiosModule {
  constructor() {
    this.token = localStorage.getItem("mifi-token") || null;
    this.instance = axios.create({
      baseURL: process.env.VUE_APP_API_URL,
    });

    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        const { status } = error.response;
        if (status === 401 && router.currentRoute.name !== "Login") {
          store.dispatch("logout");
        }
        return error.response;
      },
    );
  }

  get(endpoint, extraHeaders = {}) {
    return this.instance.get(endpoint, {
      headers: {
        Authorization: this.token ? `Bearer ${this.token}` : null,
        ...extraHeaders,
      },
    });
  }

  post(endpoint, data, extraHeaders = {}) {
    return this.instance.post(endpoint, data, {
      headers: {
        Authorization: this.token ? `Bearer ${this.token}` : null,
        ...extraHeaders,
      },
    });
  }
}
