import { postUtil } from "../utils/apiService";
import axios from "axios";

export function signIn(credentials, onSuccess) {
  return new Promise((resolve, reject) => {
    postUtil("/api/login", credentials)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("token", response.data.data.access_token);
          onSuccess();
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export const signUp = async (credentials) => {
  return new Promise((resolve, reject) => {
    postUtil("/api/register", credentials)
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
};

export function userInfo() {
  return new Promise((resolve, reject) => {
    //axios.get("/sanctum/csrf-cookie").then(() => {
    axios
      .get("/api/user/profile-information")
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
  // });
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
