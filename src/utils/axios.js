import axios from "axios";
import config from "../config";

export default axios.create({
  validateStatus: (status) => status < 500,
  baseURL: config.backendEndpoint,
  withCredentials: true,
  headers: {
    accept: "application/json",
  },
  // headers: { "Content-Type": "application/json" },
});
