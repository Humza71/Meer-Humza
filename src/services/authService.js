import axios from "../utils/axios";
import config from "../config";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = config.backendEndpoint;

export function signIn(credentials) {
  return new Promise((resolve, reject) => {
    axios.get("/sanctum/csrf-cookie").then(() => {
      axios
        .post("/api/login", credentials)
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          }
          reject(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}

export function signUp(credentials) {
  console.log(axios.defaults.baseURL);
  return new Promise((resolve, reject) => {
    axios.get("/sanctum/csrf-cookie").then(() => {
      axios
        .post("/api/register", credentials)
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            resolve(response.data);
          }
          reject(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}

export function resetPassword(credentials) {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/auth/reset-password", credentials)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
