import { postUtil, getUtil } from "../utils/apiService";
export function addLicense(payload) {
  return new Promise((resolve, reject) => {
    postUtil("/api/add/license", payload)
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

export function getAllLicense() {
  return new Promise((resolve, reject) => {
    getUtil("/api/get/licenses")
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

export function getLicense(id) {
  return new Promise((resolve, reject) => {
    getUtil(`/api/get/license/${id}`)
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
