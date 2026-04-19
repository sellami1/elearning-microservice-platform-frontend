import { courseApiClient } from "@/src/lib/api/course-client";
import { courseServiceEndpoints } from "@/src/lib/api/course-endpoints";
import type { LessonCreateSchemaInput, LessonUpdateSchemaInput } from "@/src/features/course/schemas/lesson.schema";
import type { Lesson, LessonListResponse } from "@/src/features/course/types";

function appendOptionalField(formData: FormData, key: string, value: unknown) {
  if (value === undefined || value === null || value === "") {
    return;
  }

  formData.append(key, value instanceof File ? value : String(value));
}

function lessonToFormData(values: LessonCreateSchemaInput | LessonUpdateSchemaInput, mode: "create" | "update"): FormData {
  const formData = new FormData();

  appendOptionalField(formData, "title", values.title);
  appendOptionalField(formData, "description", values.description);
  appendOptionalField(formData, "content_type", values.content_type);
  appendOptionalField(formData, "duration_minutes", values.duration_minutes);
  appendOptionalField(formData, "order_index", values.order_index);
  appendOptionalField(formData, "is_preview", values.is_preview);
  appendOptionalField(formData, "is_published", values.is_published);
  
  if (mode === "create" && "course_id" in values) {
      appendOptionalField(formData, "course_id", values.course_id);
  }
  
  appendOptionalField(formData, "content_url", values.content_url);

  const contentFile = values.contentFile?.[0];
  if (contentFile) {
    formData.append("content_file", contentFile);
  }

  return formData;
}

export async function listCourseLessons(courseId: string): Promise<LessonListResponse> {
  const { data } = await courseApiClient.get<LessonListResponse>(courseServiceEndpoints.lessonsByCourse(courseId));
  return data;
}

export async function getLesson(lessonId: string): Promise<Lesson> {
  const { data } = await courseApiClient.get<Lesson>(courseServiceEndpoints.lesson(lessonId));
  return data;
}

export async function createLesson(values: LessonCreateSchemaInput): Promise<Lesson> {
  const { data } = await courseApiClient.post<Lesson>(courseServiceEndpoints.lessons, lessonToFormData(values, "create"), {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}

export async function updateLesson(lessonId: string, values: LessonUpdateSchemaInput): Promise<Lesson> {
  const { data } = await courseApiClient.put<Lesson>(courseServiceEndpoints.lesson(lessonId), lessonToFormData(values, "update"), {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}

export async function deleteLesson(lessonId: string): Promise<void> {
  await courseApiClient.delete(courseServiceEndpoints.lesson(lessonId));
}