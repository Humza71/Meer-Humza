import { getUtil } from "../utils/apiService";
export const getReports = async () => {
  return new Promise((resolve, reject) => {
    getUtil("/api/get/reports")
      .then((response) => {
        if (response.status === 200) {
          const newData = response.data.data.map(
            ({
              _id,
              status,
              userName,
              created_at,
              updated_at,
              patientDemographics,
            }) => ({
              status,
              _id,
              updated_at,
              created_at,
              userName,
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

export const getPdfReports = async (reportId) => {
  return new Promise((resolve, reject) => {
    getUtil(`/api/get/pdf/${reportId}`)
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
};
