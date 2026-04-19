import { z } from "zod";

export const enrollSchema = z.object({
  course_id: z.string().min(1, "Course is required"),
});

export type EnrollSchemaInput = z.infer<typeof enrollSchema>;