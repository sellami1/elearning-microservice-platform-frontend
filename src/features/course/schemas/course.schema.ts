import { z } from "zod";

export const courseFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  short_description: z.string().max(500, "Short description must be 500 characters or less").optional(),
  price: z.coerce.number().min(0, "Price cannot be negative"),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  duration_hours: z.coerce.number().min(0, "Duration cannot be negative"),
  published: z.coerce.boolean(),
  is_featured: z.coerce.boolean(),
  thumbnailFile: z.custom<FileList | null>().optional(),
});

export const courseCreateSchema = courseFormSchema;

export const courseUpdateSchema = courseFormSchema.partial();

export type CourseFormSchemaInput = z.input<typeof courseFormSchema>;

export type CourseFormSchemaOutput = z.output<typeof courseFormSchema>;

export type CourseCreateSchemaInput = z.infer<typeof courseCreateSchema>;

export type CourseUpdateSchemaInput = z.infer<typeof courseUpdateSchema>;