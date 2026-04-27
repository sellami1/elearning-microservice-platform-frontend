import axios from "axios";

import { normalizeError } from "@/src/lib/api/error";
import { getStoredToken } from "@/src/lib/auth/token";
import { analyticsServiceEndpoints } from "@/src/lib/api/analytics-endpoints";

export const analyticsApiClient = axios.create({
  baseURL: analyticsServiceEndpoints.baseUrl,
});

analyticsApiClient.interceptors.request.use((config) => {
  const token = getStoredToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

analyticsApiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(normalizeError(error))
);
