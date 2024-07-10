import { AxiosInstance, CanceledError } from "axios";
import axios from "axios";
import { isUndefined } from "util";

let isRefreshing = false;

let authToken = "";

const { HC_V2_BACKEND_BASE_URL } = process.env;

function isPublicRoute(url: string | undefined): boolean {
  return url !== undefined
    ? url.endsWith("/auth/authenticate") || url.endsWith("/auth/register")
    : false;
}

function isRefreshToken(url: string | undefined) {
  return url !== undefined
    ? url.endsWith("/auth/refresh")
    : false;
}


export const baseAxios = axios.create({
  baseURL: HC_V2_BACKEND_BASE_URL
    ? HC_V2_BACKEND_BASE_URL
    : "http://localhost:8081/api/v1",
});

export const updateToken = (token: string) => {
  authToken = token;
};

export const apiClient = axios.create({
  baseURL: HC_V2_BACKEND_BASE_URL
    ? HC_V2_BACKEND_BASE_URL
    : "http://localhost:8081/api/v1",
  withCredentials: true,
});

apiClient.interceptors.request.use((request) => {

    console.log(authToken)
  if (!isPublicRoute(request.url) && !isRefreshToken(request.url)) {
    request.headers.Authorization = `Bearer ${authToken}`;
  }
  return request;
});

apiClient.interceptors.response.use(
  (res) => {
      return res;
  },
  async (err) => {
      const originalRequest = err.config
      if (err.response.status === 403 && !isRefreshing) {
          isRefreshing = true;
          try {
          const refresh = await apiClient.post("http://localhost:8081/api/v1/auth/refresh")

          updateToken(refresh.data.token);
          originalRequest.headers['Authorization'] = `Bearer ${refresh.data.token}`;

          return apiClient(originalRequest)
          } catch (e) {
            return Promise.reject(err);
          } finally {
              isRefreshing = false;
          }           
      } else {
          return Promise.reject(err)
      }

  }
)
/*
export const apiPubliClient = axios.create({
  baseURL: HC_V2_BACKEND_BASE_URL
    ? HC_V2_BACKEND_BASE_URL
    : "http://localhost:8081/api/v1",
});*/





export { CanceledError };
