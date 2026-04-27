import { analyticsApiClient } from "@/src/lib/api/analytics-client";
import { analyticsServiceEndpoints } from "@/src/lib/api/analytics-endpoints";
import type {
  CourseDailyMetrics,
  EventIngestPayload,
  AnalyticsEvent,
  TopCourseMetrics,
  AnalyticsHealthResponse,
} from "@/src/features/analytics/types";

export async function checkHealth(): Promise<AnalyticsHealthResponse> {
  const { data } = await analyticsApiClient.get(analyticsServiceEndpoints.health);
  return data;
}

export async function recordViewEvent(payload: EventIngestPayload): Promise<AnalyticsEvent> {
  const { data } = await analyticsApiClient.post(analyticsServiceEndpoints.events.view, payload);
  return data;
}

export async function recordEnrollEvent(payload: EventIngestPayload): Promise<AnalyticsEvent> {
  const { data } = await analyticsApiClient.post(analyticsServiceEndpoints.events.enroll, payload);
  return data;
}

export async function getCourseMetrics(courseId: string): Promise<CourseDailyMetrics[]> {
  const { data } = await analyticsApiClient.get(
    analyticsServiceEndpoints.metrics.course(courseId)
  );
  return data;
}

export async function getTopCourses(limit = 10): Promise<TopCourseMetrics[]> {
  const { data } = await analyticsApiClient.get(analyticsServiceEndpoints.metrics.topCourses, {
    params: { limit },
  });
  return data;
}
