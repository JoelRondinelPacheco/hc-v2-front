import { CanceledError } from "axios";
import axios from "axios";

let isRefreshing = false;

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

export const apiClient = axios.create({
  baseURL: HC_V2_BACKEND_BASE_URL
    ? HC_V2_BACKEND_BASE_URL
    : "http://localhost:8081/api/v1",
  withCredentials: true,
});

let refreshTokenPromise: Promise<string> | null = null;
let authToken: string | null = null

export const configApiClientInterceptors = () => {

  apiClient.interceptors.request.use(
    async (request) => {
      
      if (!isPublicRoute(request.url) && !isRefreshToken(request.url)) {
        request.headers.Authorization = authToken;
      }
      
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 403 && !isRefreshing) {

        isRefreshing = true;

        if (!refreshTokenPromise) {
          refreshTokenPromise = refreshAccessToken();
        }

        try {
          const newToken = await refreshTokenPromise;
          refreshTokenPromise = null;
          setAccessToken(newToken);

          originalRequest.headers["Authorization"] = "Bearer " + newToken;

          return apiClient(originalRequest);
          
        } catch (refreshError) {
          console.log("refresh error")
          return Promise.reject(error); 
        } finally {
          isRefreshing = false;
        }
      } else {
        return Promise.reject(error);
      }
    }
  )
}



export const refreshAccessToken = async () => {
  const response = await apiClient.post('/auth/refresh');
  return response.data.token;
};

export const setAccessToken = (token: string | null) => {
  authToken = token !== null ? 'Bearer ' + token : token;
}


export { CanceledError };
