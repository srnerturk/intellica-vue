import axios from "axios";
// eslint-disable-next-line import/no-cycle
import store from "@/store";

export default class AxiosModule {
  constructor() {
    this.token = localStorage.getItem("access_token") || null;
    this.instance = axios.create({
      baseURL: process.env.VUE_APP_API_URL,
    });

    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        const { status } = error.response;
        if (status === 401) {
          store.dispatch("logout");
        }
        return error.response;
      },
    );
  }

  get(endpoint, extraHeaders = {}) {
    return this.instance.get(endpoint, {
      headers: {
        mode: "no-cors",
        "x-api-key": process.env.VUE_APP_API_KEY,
        Authorization: this.token ? `Bearer ${this.token}` : null,
        ...extraHeaders,
      },
    });
  }

  post(endpoint, data, extraHeaders = {}) {
    return this.instance.post(endpoint, data, {
      headers: {
        "x-api-key": process.env.VUE_APP_API_KEY,
        Authorization: this.token ? `Bearer ${this.token}` : null,
        ...extraHeaders,
      },
    });
  }
}
