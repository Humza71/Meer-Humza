import { postUtil, getUtil } from "../utils/apiService";
export function addCompany(payload) {
  return new Promise((resolve, reject) => {
    postUtil("/api/clinic/add", payload)
      .then((response) => {
        if (response.status === 200) {
          resolve(response);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getAllCompany() {
  return new Promise((resolve, reject) => {
    getUtil("/api/get/clinics")
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

export function getCompany(id) {
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
}
