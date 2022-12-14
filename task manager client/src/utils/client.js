import axios from "axios";
const host = process.env.REACT_APP_API_URL;
const tokenKey = process.env.REACT_APP_USER_TOKEN;

const client = {
  get: (path) => {
    const url = `${host}${path}`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    };
    console.log("Get Variables ------------>", url, headers)
    return axios.get(url, { headers });
  },

  post: (path, data, withToken = true) => {
    const url = `${host}${path}`;
    const token = localStorage.getItem(tokenKey);
    let headers = {};
    console.log("Post Variables--------------------------->", url, path, data, token);
    if (withToken) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    console.log("Variables--------------------------->", url, path, data, token, withToken, headers);
    return axios.post(url, data, { headers });
  },

  patch: (path, data, withToken = true) => {
    const url = `${host}${path}`;
    const token = localStorage.getItem(tokenKey);
    let headers = {};
    if (withToken) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return axios.patch(url, data, { headers });
  },

  delete: (path) => {
    const url = `${host}${path}`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    };

    return axios.delete(url, { headers });
  },

  put: (path, data, withToken = true) => {
    const url = `${host}${path}`;
    let headers = {};
    if (withToken) {
      headers = {
        Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      };
    }
    return axios.put(url, data, { headers });
  },
};

export default client;
