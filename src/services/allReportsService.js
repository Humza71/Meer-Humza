import { getUtil } from "../utils/apiService";
export const getReports = async (credentials) => {
  return new Promise((resolve, reject) => {
    debugger;
    getUtil("/api/get/reports")
      .then((response) => {
        if (response.status === 200) {
          const newData = response.data.data.map(
            ({ _id, patientDemographics }) => ({
              _id,
              ...patientDemographics,
            })
          );
          resolve(newData);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
