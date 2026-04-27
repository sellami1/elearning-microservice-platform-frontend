"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  checkHealth,
  getCourseMetrics,
  getTopCourses,
  recordEnrollEvent,
  recordViewEvent,
} from "@/src/features/analytics/api/metrics";
import type { EventIngestPayload } from "@/src/features/analytics/types";

export function useAnalyticsHealth() {
  return useQuery({
    queryKey: ["analytics", "health"],
    queryFn: checkHealth,
  });
}

export function useCourseMetrics(courseId: string) {
  return useQuery({
    queryKey: ["analytics", "metrics", "course", courseId],
    queryFn: () => getCourseMetrics(courseId),
    enabled: Boolean(courseId),
  });
}

export function useTopCourses(limit = 10) {
  return useQuery({
    queryKey: ["analytics", "metrics", "top-courses", limit],
    queryFn: () => getTopCourses(limit),
  });
}

export function useRecordViewEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: EventIngestPayload) => recordViewEvent(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["analytics", "metrics"] });
    },
  });
}

export function useRecordEnrollEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: EventIngestPayload) => recordEnrollEvent(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["analytics", "metrics"] });
    },
  });
}
