import axios from "../utils/axios";

axios.defaults.baseURL = "http://localhost:8080/api/";

export function signIn(credentials) {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/auth/sign-in", credentials)
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

export function signUp(credentials) {
  console.log(axios.defaults.baseURL);
  return new Promise((resolve, reject) => {
    axios
      .post("register", credentials)
      //.post("/api/auth/sign-up", credentials)
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
