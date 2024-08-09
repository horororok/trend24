import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
} from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: "https://trend24.live/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
      // 요청을 보낼 때의 헤더 상태 확인
      // console.log("Request Headers: ", config.headers);
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
