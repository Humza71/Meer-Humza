import { postUtil, getUtil, setDefault } from "../utils/apiService";
import axios from "axios";

export function signIn(credentials) {
  return new Promise((resolve, reject) => {
    postUtil("/api/login", credentials)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("token", response.data.data.access_token);
          // onSuccess();
          resolve(response);
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
    postUtil("/api/user-password", credentials)
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

export const clinic = async (id) => {
  return new Promise((resolve, reject) => {
    getUtil(`/api/get/clinic/${id}`)
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
    setDefault();
    getUtil(`/api/get/user`)
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

export const tokenData = async (token) => {
  return new Promise((resolve, reject) => {
    postUtil(`/api/signup`, { token })
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
