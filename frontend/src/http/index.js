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
export const logoutApi = (data) => api.post("/api/user-logout", data);
export const addRoomApi = (data, id) =>
  api.post(`/api/hotel/add-room/${id}`, data);
export const getKeyApi = () => api.get(`/api/get-key`);
export const createOrderApi = (data, id) =>
  api.post(`/api/checkout/${id}`, data);
export const paymentVerificationApi = (data) =>
  api.post(`/api/paymentverification`, data);
export const createHotelApi = (data) =>
  api.post(`/api/hotel/create-hotel`, data);
export const editHotelRoomApi = (id, data) =>
  api.put(`/api/hotel/edit-room/${id}`, data);
export const deleteHotelRoomApi = (id, data) =>
  api.post(`/api/hotel/delete-room/${id}`, data);

// Interceptors
api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await axios.get(`${process.env.REACT_APP_API_URL}/api/refresh`, {
          withCredentials: true,
        });
        return api.request(originalRequest);
      } catch (error) {
        console.log(error.message);
      }
    }
    throw error;
  }
);
export default api;
