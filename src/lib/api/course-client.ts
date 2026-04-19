import axios from "axios";

import { normalizeError } from "@/src/lib/api/error";
import { getStoredToken } from "@/src/lib/auth/token";
import { courseServiceEndpoints } from "@/src/lib/api/course-endpoints";

export const courseApiClient = axios.create({
  baseURL: courseServiceEndpoints.baseUrl,
});

courseApiClient.interceptors.request.use((config) => {
  const token = getStoredToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

courseApiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(normalizeError(error))
);