import { env } from "@/src/lib/config/env";

const USERS_BASE_PATH = "/api/v1/users";

export const userServiceEndpoints = {
  baseUrl: `${env.userServiceUrl}${USERS_BASE_PATH}`,
  register: "/register",
  login: "/login",
  me: "/me",
  updateMe: "/update-me",
};
