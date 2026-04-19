import { courseApiClient } from "@/src/lib/api/course-client";
import { courseServiceEndpoints } from "@/src/lib/api/course-endpoints";
import type {
  CourseCreateSchemaInput,
  CourseUpdateSchemaInput,
} from "@/src/features/course/schemas/course.schema";
import type { Course, CourseListResponse, CourseUpdateResponse } from "@/src/features/course/types";

type CourseListParams = {
  skip?: number;
  limit?: number;
  published?: boolean;
  category?: string;
  level?: "beginner" | "intermediate" | "advanced";
  is_featured?: boolean;
  search?: string;
  instructor_id?: string;
};

function appendOptionalField(formData: FormData, key: string, value: unknown) {
  if (value === undefined || value === null || value === "") {
    return;
  }

  formData.append(key, value instanceof File ? value : String(value));
}

function courseToFormData(values: CourseCreateSchemaInput | CourseUpdateSchemaInput): FormData {
  const formData = new FormData();

  appendOptionalField(formData, "title", values.title);
  appendOptionalField(formData, "description", values.description);
  appendOptionalField(formData, "short_description", values.short_description);
  appendOptionalField(formData, "price", values.price);
  appendOptionalField(formData, "category", values.category);
  appendOptionalField(formData, "subcategory", values.subcategory);
  appendOptionalField(formData, "level", values.level);
  appendOptionalField(formData, "duration_hours", values.duration_hours);
  appendOptionalField(formData, "published", values.published);
  appendOptionalField(formData, "is_featured", values.is_featured);

  const thumbnailFile = values.thumbnailFile?.[0];
  if (thumbnailFile) {
    formData.append("thumbnail_file", thumbnailFile);
  }

  return formData;
}

export async function listCourses(params: CourseListParams = {}): Promise<CourseListResponse> {
  const { data } = await courseApiClient.get<CourseListResponse>(courseServiceEndpoints.courses, {
    params,
  });

  return data;
}

export async function getCourse(courseId: string): Promise<Course> {
  const { data } = await courseApiClient.get<Course>(courseServiceEndpoints.course(courseId));
  return data;
}

export async function getInstructorCourses(): Promise<Course[]> {
  const { data } = await courseApiClient.get<Course[]>(courseServiceEndpoints.instructorCourses);
  return data;
}

export async function createCourse(values: CourseCreateSchemaInput): Promise<Course> {
  const { data } = await courseApiClient.post<Course>(courseServiceEndpoints.courses, courseToFormData(values), {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}

export async function updateCourse(courseId: string, values: CourseUpdateSchemaInput): Promise<CourseUpdateResponse> {
  const { data } = await courseApiClient.put<CourseUpdateResponse>(
    courseServiceEndpoints.course(courseId),
    courseToFormData(values),
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
}

export async function deleteCourse(courseId: string): Promise<void> {
  await courseApiClient.delete(courseServiceEndpoints.course(courseId));
}