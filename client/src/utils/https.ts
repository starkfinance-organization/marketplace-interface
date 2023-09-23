import axios, { AxiosInstance } from "axios";

class Https {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: "",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

const http = new Https().instance;

export default http;
