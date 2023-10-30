import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const axios_instance = axios.create({
  baseURL: apiUrl,
  headers: { "Content-Type": "application/json", version: 1 },
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (token: string) => {
  failedQueue.forEach((cb) => cb(token));
  failedQueue = [];
};

const handleTokenRefresh = async (error: any) => {
  const originalRequest = error.config;
  if (error.response?.status === 498 && !originalRequest._retry) {
    originalRequest._retry = true;
    if (!isRefreshing) {
      isRefreshing = true;
      const refreshToken = localStorage.getItem("refreshToken") || "";
      return new Promise(async function (resolve, reject) {
        try {
          console.log("refreshing token");
          const { data } = await axios_instance.post("/auth/token", {
            token: { refreshToken },
          });
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("userRefreshToken", data.refreshToken);
          originalRequest.headers.Authorization = data.accessToken;
          processQueue(data.accessToken);
          resolve(axios_instance(originalRequest));
        } catch (errorRefresh: any) {
          if (errorRefresh.response?.status === 400) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("userRefreshToken");
          }
          failedQueue = [];
          reject(errorRefresh);
        } finally {
          isRefreshing = false;
        }
      });
    } else {
      return new Promise((resolve) => {
        failedQueue.push((token: string) => {
          originalRequest.headers.Authorization = token;
          resolve(axios_instance(originalRequest));
        });
      });
    }
  } else {
    return Promise.reject(error);
  }
};

axios_instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    const user = JSON.parse(localStorage.getItem("account") || "{}").username;

    if (accessToken) {
      config.headers.Authorization = accessToken;
      config.headers.version = 1;
      config.headers["Content-Type"] = "application/json";
      config.headers["username"] = user;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios_instance.interceptors.response.use(
  (response) => response,
  handleTokenRefresh
);

export default axios_instance;
