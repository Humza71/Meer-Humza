import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_ENDPOINT;
axios.defaults.headers = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};

const postUtil = (url, data) => axios.post(url, data);

const putUtil = (url, data) =>
  axios({
    method: "put",
    url,
    data,
  });

const patchUtil = (url, data) =>
  axios({
    method: "patch",
    url,
    data,
  });

const getUtil = (url, data = null) => axios.get(url, { params: data });

const deleteUtil = (url, data = null) => axios.delete(url, { params: data });

export function setDefault() {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  axios.defaults.headers = headers;
}

export { postUtil, getUtil, putUtil, patchUtil, deleteUtil };

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.clear();
    }
    if (
      error.response.status === 401 ||
      error.response.status === 400 ||
      error.response.status === 404 ||
      error.response.status === 500
    ) {
      return error;
    }
    return error;
  }
);
