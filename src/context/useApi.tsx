import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;
const AUTH_API_URL = process.env.AUTH_API_ENDPOINT
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

if (!API_BASE_URL) {
  throw new Error("API_ENDPOINT environment variable is not set.");
}

const useApi = () => {
  const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  apiClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.error("Request error:", error.message);
      return Promise.reject(error);
    }
  );

  apiClient.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        console.log("Unauthorized");
      } else {
        console.error(`Error ${error.response?.status}:`, error.message);
      }
      return Promise.reject(error);
    }
  );

  const authApiClient = axios.create({
    baseURL: AUTH_API_URL,
    headers: headers,
  });

  authApiClient.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      console.error("Request error:", error.message);
      return Promise.reject(error);
    }
  );
  authApiClient.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        console.log("Unauthorized");
      } else {
        console.error(`Error ${error.response?.status}:`, error.message);
      }
      return Promise.reject(error);
    }
  );

  return { apiClient, authApiClient };
};

export default useApi;
