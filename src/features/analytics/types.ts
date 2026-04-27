export type AnalyticsEventType = "course_view" | "course_enroll";

export type AnalyticsEvent = {
  id: string;
  event_type: AnalyticsEventType;
  user_id: string;
  course_id: string;
  user_role: "learner" | "instructor";
  created_at: string;
};

export type CourseDailyMetrics = {
  course_id: string;
  metric_date: string;
  views_count: number;
  enrollments_count: number;
};

export type TopCourseMetrics = {
  course_id: string;
  total_views: number;
  total_enrollments: number;
};

export type EventIngestPayload = {
  course_id: string;
};

export type AnalyticsHealthResponse = {
  status: "healthy";
  service: "analytics-service";
};
