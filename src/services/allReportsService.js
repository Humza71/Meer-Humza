import { getUtil } from "../utils/apiService";
export const getReports = async (credentials) => {
  return new Promise((resolve, reject) => {
    http: getUtil("/api/add/patient-demographics", credentials)
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
};
