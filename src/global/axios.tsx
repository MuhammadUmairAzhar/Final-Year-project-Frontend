import axios from "axios";

let token = localStorage.getItem("sessionToken")?.replaceAll('"', "");

export let refreshToken = () => {
  token = localStorage.getItem("sessionToken")?.replaceAll('"', "");
  axiosCommon = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL + "/user",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  axiosAdmin = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL + "/admin",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  axiosAdvisor = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL + "/advisor",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  axiosPanel = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL + "/panel",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  axiosStudent = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL + "/student",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export let axiosCommon = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL + "/user",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export let axiosAdmin = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL + "/admin",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export let axiosAdvisor = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL + "/advisor",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export let axiosPanel = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL + "/panel",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export let axiosStudent = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL + "/student",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
