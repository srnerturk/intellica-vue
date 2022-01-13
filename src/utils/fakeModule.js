import axios from "axios";

export default class FakeModule {
  constructor() {
    this.token = localStorage.getItem("access_token") || null;
    this.instance = axios.create({
      baseURL: process.env.VUE_APP_FAKE_API_URL,
    });
  }

  get(endpoint, extraHeaders = {}) {
    return this.instance.get(endpoint, {
      headers: {
        ...extraHeaders,
      },
    });
  }
}
