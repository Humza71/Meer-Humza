import { getUtil } from "../utils/apiService";
export const getReports = async (credentials) => {
  return new Promise((resolve, reject) => {
    getUtil("/get-reports", credentials)
      .then((response) => {
        console.log(response.data, "dataaaaaa");
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
};
