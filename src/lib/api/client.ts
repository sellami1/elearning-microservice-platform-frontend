import axios from "axios";

import { userServiceEndpoints } from "@/src/lib/api/endpoints";
import { normalizeError } from "@/src/lib/api/error";
import { getStoredToken } from "@/src/lib/auth/token";

export const apiClient = axios.create({
  baseURL: userServiceEndpoints.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getStoredToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(normalizeError(error))
);
