import axios from "axios";
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// list of all the endpoints
export const registerApi = (data) => api.post("/api/user-register", data);
export const loginApi = (data) => api.post("/api/user-login", data);


export default api;
