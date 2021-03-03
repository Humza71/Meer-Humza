import axios from "../utils/axios";

export function createNewReport(payload) {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/create/report", payload)
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
