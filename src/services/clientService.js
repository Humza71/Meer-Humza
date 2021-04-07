import { postUtil, getUtil, deleteUtil } from "../utils/apiService";

const parseClinicInfo = (data) => {
  const formData = new FormData();
  Object.keys(data).map((key) => {
    if (key === "addresses") {
      const address = JSON.stringify(data[key]);
      formData.append("addresses", address);
    } else {
      formData.append(key, data[key]);
    }
  });
  return formData;
};

export function addCompany(payload) {
  const data = parseClinicInfo(payload);
  return new Promise((resolve, reject) => {
    postUtil("/api/clinic/add", data)
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

export function updateCompany(payload) {
  const { id = "" } = payload || {};
  const data = parseClinicInfo(payload);
  return new Promise((resolve, reject) => {
    postUtil(`/api/update/clinic/${id}`, data)
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

export function getAllCompany() {
  return new Promise((resolve, reject) => {
    getUtil("/api/get/clinics")
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

export function getCompany(id) {
  return new Promise((resolve, reject) => {
    getUtil(`/api/get/clinic/${id}`)
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

export const deleteClinic = async (id) => {
  return new Promise((resolve, reject) => {
    deleteUtil(`/api/delete/clinic/${id}`)
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
