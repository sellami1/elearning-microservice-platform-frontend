const DEFAULT_USER_SERVICE_URL = "http://localhost";
const DEFAULT_COURSE_SERVICE_URL = "http://localhost";
const DEFAULT_ANALYTICS_SERVICE_URL = "http://localhost";
const DEFAULT_MINIO_PUBLIC_URL = "http://localhost/media";

function readUserServiceUrl(): string {
  return process.env.NEXT_PUBLIC_USER_SERVICE_URL || DEFAULT_USER_SERVICE_URL;
}

export const env = {
  userServiceUrl: readUserServiceUrl(),
  courseServiceUrl: process.env.NEXT_PUBLIC_COURSE_SERVICE_URL || DEFAULT_COURSE_SERVICE_URL,
  analyticsServiceUrl: process.env.NEXT_PUBLIC_ANALYTICS_SERVICE_URL || DEFAULT_ANALYTICS_SERVICE_URL,
  minioPublicUrl: process.env.NEXT_PUBLIC_MINIO_URL || DEFAULT_MINIO_PUBLIC_URL,
};
