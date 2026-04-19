import { z } from "zod";

export const lessonCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  content_type: z.enum(["video", "text", "pdf", "quiz", "audio", "image"]),
  duration_minutes: z.coerce.number().min(0, "Duration cannot be negative"),
  order_index: z.coerce.number().min(0, "Order index cannot be negative").optional(),
  is_preview: z.coerce.boolean(),
  is_published: z.coerce.boolean(),
  course_id: z.string().min(1, "Course is required"),
  content_url: z.string().optional(),
});

export const lessonUpdateSchema = lessonCreateSchema.partial();

export type LessonCreateSchemaInput = z.infer<typeof lessonCreateSchema> & {
  contentFile?: FileList | null;
};

export type LessonUpdateSchemaInput = z.infer<typeof lessonUpdateSchema> & {
  contentFile?: FileList | null;
};