"use client";

import { useState } from "react";

import { Card } from "@/src/components/ui";
import { useAnalyticsHealth, useCourseMetrics, useTopCourses } from "@/src/features/analytics/hooks/useAnalytics";
import { useInstructorCourses } from "@/src/features/course/hooks/useCourses";
import { useAuthStore } from "@/src/store/auth.store";

export function AnalyticsDashboard() {
  const role = useAuthStore((state) => state.role);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");

  // const healthQuery = useAnalyticsHealth();
  const topCoursesQuery = useTopCourses(10);
  const courseMetricsQuery = useCourseMetrics(selectedCourseId);
  const instructorCoursesQuery = useInstructorCourses();

  const isInstructor = role === "instructor";

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Analytics Dashboard</h1>
        {/* <div className="flex items-center gap-2">
          <span className="text-sm text-[var(--muted-foreground)]">Service Status:</span>
          {healthQuery.isLoading ? (
            <span className="rounded-full bg-[var(--muted)] px-3 py-1 text-sm font-medium text-[var(--muted-foreground)]">
              Checking...
            </span>
          ) : healthQuery.data?.status === "healthy" ? (
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
              Healthy
            </span>
          ) : (
            <span className="rounded-full bg-rose-100 px-3 py-1 text-sm font-medium text-rose-700">
              Unavailable
            </span>
          )}
        </div> */}
      </div>

      <Card title="Top Courses">
        {topCoursesQuery.isLoading ? (
          <p className="text-sm text-[var(--muted-foreground)]">Loading top courses...</p>
        ) : topCoursesQuery.error ? (
          <p className="text-sm text-rose-600">Failed to load top courses</p>
        ) : topCoursesQuery.data?.length === 0 ? (
          <p className="text-sm text-[var(--muted-foreground)]">No analytics data available yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[var(--border)]">
                <tr>
                  <th className="pb-2 font-medium text-[var(--foreground)]">Course ID</th>
                  <th className="pb-2 font-medium text-[var(--foreground)]">Total Views</th>
                  <th className="pb-2 font-medium text-[var(--foreground)]">Total Enrollments</th>
                </tr>
              </thead>
              <tbody>
                {topCoursesQuery.data?.map((course) => (
                  <tr key={course.course_id} className="border-b border-[var(--border)] last:border-0">
                    <td className="py-3 font-mono text-xs text-[var(--muted-foreground)]">
                      {course.course_id}
                    </td>
                    <td className="py-3 text-[var(--foreground)]">{course.total_views.toLocaleString()}</td>
                    <td className="py-3 text-[var(--foreground)]">{course.total_enrollments.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {isInstructor && (
        <Card title="Course Metrics">
          <div className="mb-4">
            <label htmlFor="course-select" className="text-sm font-medium text-[var(--muted-foreground)]">
              Select Course
            </label>
            <select
              id="course-select"
              className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)]"
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
            >
              <option value="">-- Select a course --</option>
              {instructorCoursesQuery.data?.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          {!selectedCourseId ? (
            <p className="text-sm text-[var(--muted-foreground)]">Select a course to view its metrics</p>
          ) : courseMetricsQuery.isLoading ? (
            <p className="text-sm text-[var(--muted-foreground)]">Loading metrics...</p>
          ) : courseMetricsQuery.error ? (
            <p className="text-sm text-rose-600">Failed to load course metrics</p>
          ) : courseMetricsQuery.data?.length === 0 ? (
            <p className="text-sm text-[var(--muted-foreground)]">No metrics available for this course</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-[var(--border)]">
                  <tr>
                    <th className="pb-2 font-medium text-[var(--foreground)]">Date</th>
                    <th className="pb-2 font-medium text-[var(--foreground)]">Views</th>
                    <th className="pb-2 font-medium text-[var(--foreground)]">Enrollments</th>
                  </tr>
                </thead>
                <tbody>
                  {courseMetricsQuery.data?.map((metric) => (
                    <tr key={metric.metric_date} className="border-b border-[var(--border)] last:border-0">
                      <td className="py-3 text-[var(--foreground)]">{metric.metric_date}</td>
                      <td className="py-3 text-[var(--foreground)]">{metric.views_count.toLocaleString()}</td>
                      <td className="py-3 text-[var(--foreground)]">{metric.enrollments_count.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 flex gap-4 text-sm">
                <div className="rounded-lg bg-[var(--muted)] px-4 py-2">
                  <span className="text-[var(--muted-foreground)]">Total Views:</span>{" "}
                  <span className="font-semibold text-[var(--foreground)]">
                    {courseMetricsQuery.data?.reduce((sum, m) => sum + m.views_count, 0).toLocaleString()}
                  </span>
                </div>
                <div className="rounded-lg bg-[var(--muted)] px-4 py-2">
                  <span className="text-[var(--muted-foreground)]">Total Enrollments:</span>{" "}
                  <span className="font-semibold text-[var(--foreground)]">
                    {courseMetricsQuery.data?.reduce((sum, m) => sum + m.enrollments_count, 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
