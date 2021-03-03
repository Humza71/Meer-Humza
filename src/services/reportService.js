import { postUtil } from "../utils/apiService";
export function createReport(payload) {
  return new Promise((resolve, reject) => {
    http: postUtil("/api/add/patient-demographics", payload)
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          debugger;
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
