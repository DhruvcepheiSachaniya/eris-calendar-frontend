import axios from "axios";
const apiUrl = import.meta.env.VITE_BACKEND_URL;
const axiosInstance = axios.create({
  baseURL: apiUrl,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      switch (status) {
        case 401:
          localStorage.removeItem("token");
          window.location.href = "/login";
          break;
        case 403:
          console.error(
            "Access forbidden: You do not have permission to access this resource."
          );
          break;
        case 404:
          console.error("Resource not found.");
          break;
        case 500:
          console.error("Internal server error. Please try again later.");
          break;
        default:
          console.error("An error occurred. Please try again.");
      }
    } else if (error.request) {
      console.error("No response received from server.");
    } else {
      console.error("Request error:", error.message);
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;
