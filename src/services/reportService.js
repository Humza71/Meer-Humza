import { postUtil, getUtil } from "../utils/apiService";
export function createReport(payload, onSuccess) {
  let data = {};
  const { id = "" } = payload || {};
  data = payload.id
    ? {
        reportId: payload.id,
        patientDemographics: {
          ...payload,
        },
      }
    : {
        patientDemographics: {
          ...payload,
        },
      };

  return new Promise((resolve, reject) => {
    postUtil("/api/add/patient-demographics", data)
      .then((response) => {
        if (response.status === 200) {
          if (id === "") {
            onSuccess();
          }
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function getTechnicians() {
  return new Promise((resolve, reject) => {
    getUtil("/api/get/technician")
      .then((response) => {
        if (response.status === 200) {
          if (response.data.data.length > 0) {
            resolve(response.data.data[0].technicians);
          } else {
            resolve([]);
          }
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getProviders() {
  return new Promise((resolve, reject) => {
    getUtil("/api/get-providers")
      .then((response) => {
        if (response.status === 200) {
          if (response.data.data.length > 0) {
            resolve(response.data.data[0].providers);
          } else {
            resolve([]);
          }
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getReport({ id }) {
  return new Promise((resolve, reject) => {
    getUtil(`/api/get-report/${id}`)
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

export function saveProvider(payload) {
  const provider = {
    providers: {
      name: payload,
    },
  };
  return new Promise((resolve, reject) => {
    postUtil("/api/add/provider", provider)
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

export function saveTechnician(payload) {
  const technician = {
    technicians: {
      name: payload,
    },
  };
  return new Promise((resolve, reject) => {
    postUtil("/api/add/technician", technician)
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

export function patientHistory(payload) {
  // const provider = {
  //   providers: {
  //     name: payload,
  //   },
  // };
  const data = {
    reportId: payload.reportId,
    history: {
      ...payload,
    },
  };
  return new Promise((resolve, reject) => {
    postUtil("/api/add/history", data)
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

export function getHistoryById(payload) {
  return new Promise((resolve, reject) => {
    getUtil(`/api/add/history/${payload.reportId}`)
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
