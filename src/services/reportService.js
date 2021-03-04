import { postUtil, getUtil } from "../utils/apiService";
export function createReport(payload, onSuccess) {
  let data = {};
  data = payload.id
    ? {
        _id: payload.id,
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
          onSuccess();
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
          resolve(response.data.data);
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
          resolve(response.data.data);
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
