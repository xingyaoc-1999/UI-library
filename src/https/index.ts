import axios from "axios";

export const upload = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
upload.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    return Promise.reject(error);
  }
);
