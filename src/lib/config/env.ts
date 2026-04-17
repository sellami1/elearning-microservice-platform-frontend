const DEFAULT_USER_SERVICE_URL = "http://localhost:8002";

function readUserServiceUrl(): string {
  return process.env.NEXT_PUBLIC_USER_SERVICE_URL || DEFAULT_USER_SERVICE_URL;
}

export const env = {
  userServiceUrl: readUserServiceUrl(),
  courseServiceUrl: process.env.NEXT_PUBLIC_COURSE_SERVICE_URL ?? "",
  analyticsServiceUrl: process.env.NEXT_PUBLIC_ANALYTICS_SERVICE_URL ?? "",
};
