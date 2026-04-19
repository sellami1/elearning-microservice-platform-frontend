"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createCourse, deleteCourse, getCourse, getInstructorCourses, listCourses, updateCourse } from "@/src/features/course/api/courses";
import { createLesson, deleteLesson, getLesson, listCourseLessons, updateLesson } from "@/src/features/course/api/lessons";
import { enrollInCourse, getInstructorEnrollments, getMyEnrollments } from "@/src/features/course/api/enrollments";
import type { CourseCreateSchemaInput, CourseUpdateSchemaInput } from "@/src/features/course/schemas/course.schema";
import type { LessonCreateSchemaInput, LessonUpdateSchemaInput } from "@/src/features/course/schemas/lesson.schema";
import type { EnrollSchemaInput } from "@/src/features/course/schemas/enrollment.schema";

export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: () => listCourses(),
  });
}

export function useCourse(courseId: string) {
  return useQuery({
    queryKey: ["courses", courseId],
    queryFn: () => getCourse(courseId),
    enabled: Boolean(courseId),
  });
}

export function useInstructorCourses() {
  return useQuery({
    queryKey: ["courses", "instructor"],
    queryFn: getInstructorCourses,
  });
}

export function useCourseLessons(courseId: string) {
  return useQuery({
    queryKey: ["courses", courseId, "lessons"],
    queryFn: () => listCourseLessons(courseId),
    enabled: Boolean(courseId),
  });
}

export function useLesson(lessonId: string) {
  return useQuery({
    queryKey: ["lessons", lessonId],
    queryFn: () => getLesson(lessonId),
    enabled: Boolean(lessonId),
  });
}

export function useMyEnrollments() {
  return useQuery({
    queryKey: ["enrollments", "me"],
    queryFn: getMyEnrollments,
  });
}

export function useInstructorEnrollments() {
  return useQuery({
    queryKey: ["enrollments", "instructor"],
    queryFn: getInstructorEnrollments,
  });
}

export function useCreateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: CourseCreateSchemaInput) => createCourse(values),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

export function useUpdateCourse(courseId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: CourseUpdateSchemaInput) => updateCourse(courseId, values),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["courses"] });
      await queryClient.invalidateQueries({ queryKey: ["courses", courseId] });
    },
  });
}

export function useDeleteCourse(courseId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteCourse(courseId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["courses"] });
      await queryClient.invalidateQueries({ queryKey: ["courses", "instructor"] });
      await queryClient.removeQueries({ queryKey: ["courses", courseId] });
    },
  });
}

export function useCreateLesson(courseId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: LessonCreateSchemaInput) => createLesson(values),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["courses", courseId, "lessons"] });
    },
  });
}

export function useUpdateLesson(courseId: string, lessonId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: LessonUpdateSchemaInput) => updateLesson(lessonId, values),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["courses", courseId, "lessons"] });
      await queryClient.invalidateQueries({ queryKey: ["lessons", lessonId] });
    },
  });
}

export function useDeleteLesson(courseId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (lessonId: string) => deleteLesson(lessonId),
    onSuccess: async (_, lessonId) => {
      await queryClient.invalidateQueries({ queryKey: ["courses", courseId, "lessons"] });
      await queryClient.removeQueries({ queryKey: ["lessons", lessonId] });
    },
  });
}

export function useEnrollInCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: EnrollSchemaInput) => enrollInCourse(values),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["enrollments"] });
    },
  });
}