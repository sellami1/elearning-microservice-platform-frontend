import { env } from "@/src/lib/config/env";

const COURSE_BASE_PATH = "/api/v1";

export const courseServiceEndpoints = {
  baseUrl: `${env.courseServiceUrl}${COURSE_BASE_PATH}`,
  courses: "/courses/",
  course: (courseId: string) => `/courses/${courseId}`,
  instructorCourses: "/courses/instructor/mine",
  lessons: "/lessons/",
  lesson: (lessonId: string) => `/lessons/${lessonId}`,
  lessonsByCourse: (courseId: string) => `/lessons/course/${courseId}`,
  enrollments: "/enrollments/",
  myEnrollments: "/enrollments/me",
  courseEnrollments: (courseId: string) => `/enrollments/course/${courseId}/enrollments`,
  instructorEnrollments: "/enrollments/instructor",
};