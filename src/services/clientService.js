import { postUtil, getUtil } from "../utils/apiService";
export function createReport(payload) {
  return new Promise((resolve, reject) => {
    postUtil("/api/add/company", data)
      .then((response) => {
        if (response.status === 202) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getCompany(payload) {
  return new Promise((resolve, reject) => {
    getUtil("/api/get/company", data)
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
