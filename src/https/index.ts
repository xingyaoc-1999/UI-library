import axios from "axios";

export const upload = axios.create({
  baseURL: "http://localhost:3001",
});
upload.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    return Promise.reject(error);
  }
);
