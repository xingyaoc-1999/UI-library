import axios from "axios";

export const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
http.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    return Promise.reject(error);
  }
);
