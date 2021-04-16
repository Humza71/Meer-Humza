import axios from "axios";
import history from "utils/history";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_ENDPOINT;
axios.defaults.headers = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  Accept: `application/json`,
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
    Accept: `application/json`,
  };
  axios.defaults.headers = headers;
}

export { postUtil, getUtil, putUtil, patchUtil, deleteUtil };

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.clear();
      history.push("/auth/sign-in");
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
