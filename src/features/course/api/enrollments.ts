import { courseApiClient } from "@/src/lib/api/course-client";
import { courseServiceEndpoints } from "@/src/lib/api/course-endpoints";
import type { EnrollSchemaInput } from "@/src/features/course/schemas/enrollment.schema";
import type { 
  Enrollment, 
  EnrollmentListResponse, 
  InstructorEnrollmentsResponse,
  CourseEnrollmentListResponse
} from "@/src/features/course/types";

export async function enrollInCourse(payload: EnrollSchemaInput): Promise<Enrollment> {
  const { data } = await courseApiClient.post<Enrollment>(
    courseServiceEndpoints.enrollments,
    payload
  );

  return data;
}

export async function getMyEnrollments(): Promise<EnrollmentListResponse> {
  const { data } = await courseApiClient.get<EnrollmentListResponse>(courseServiceEndpoints.myEnrollments);
  return data;
}

export async function getCourseEnrollments(courseId: string): Promise<CourseEnrollmentListResponse> {
  const { data } = await courseApiClient.get<CourseEnrollmentListResponse>(
    courseServiceEndpoints.courseEnrollments(courseId)
  );

  return data;
}

export async function getInstructorEnrollments(): Promise<InstructorEnrollmentsResponse> {
  const { data } = await courseApiClient.get<InstructorEnrollmentsResponse>(
    courseServiceEndpoints.instructorEnrollments
  );

  return data;
}