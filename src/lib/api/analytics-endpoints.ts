import { env } from "@/src/lib/config/env";

const ANALYTICS_BASE_PATH = "/api/v1";

export const analyticsServiceEndpoints = {
  baseUrl: `${env.analyticsServiceUrl}${ANALYTICS_BASE_PATH}`,
  health: "/analytics/health",
  events: {
    view: "/analytics/events/view",
    enroll: "/analytics/events/enroll",
  },
  metrics: {
    course: (courseId: string) => `/analytics/metrics/course/${courseId}`,
    topCourses: "/analytics/metrics/top-courses",
  },
};
