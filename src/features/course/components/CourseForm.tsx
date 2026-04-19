"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button, Card, FieldError, Input, Label } from "@/src/components/ui";
import { getErrorMessage } from "@/src/lib/errors/getErrorMessage";
import { useCreateCourse, useDeleteCourse, useUpdateCourse } from "@/src/features/course/hooks/useCourses";
import {
  courseFormSchema,
  type CourseFormSchemaInput,
  type CourseFormSchemaOutput,
} from "@/src/features/course/schemas/course.schema";
import type { Course } from "@/src/features/course/types";

type Props = {
  mode: "create" | "edit";
  course?: Course;
};

export function CourseForm({ mode, course }: Props) {
  const router = useRouter();
  const createMutation = useCreateCourse();
  const updateMutation = useUpdateCourse(course?.id ?? "");
  const deleteMutation = useDeleteCourse(course?.id ?? "");

  // Test data for create mode to simplify testing
  const testDefaults: CourseFormSchemaInput = {
    title: "Test Course",
    description: "This is a test course description with detailed information about what the course covers.",
    short_description: "A short test course for development.",
    price: 19.99,
    category: "Development",
    subcategory: "Web Development",
    level: "beginner",
    duration_hours: 12,
    published: false,
    is_featured: false,
  };

  // Convert Course type to form input type (null → undefined)
  const courseToDefaults = (c: Course): CourseFormSchemaInput => ({
    title: c.title,
    description: c.description ?? undefined,
    short_description: c.short_description ?? undefined,
    price: c.price,
    category: c.category ?? undefined,
    subcategory: c.subcategory ?? undefined,
    level: c.level,
    duration_hours: c.duration_hours,
    published: c.published,
    is_featured: c.is_featured,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CourseFormSchemaInput, unknown, CourseFormSchemaOutput>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: course ? courseToDefaults(course) : mode === "create" ? testDefaults : undefined,
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      if (mode === "create") {
        const newCourse = await createMutation.mutateAsync(values);
        toast.success("Course created");
        router.push(`/instructor/courses/${newCourse.id}/lessons`);
      } else if (course) {
        await updateMutation.mutateAsync(values);
        toast.success("Course updated");
      }
    } catch (error) {
      toast.error(getErrorMessage(error, mode === "create" ? "Unable to create course" : "Unable to update course"));
    }
  });

  const isPending = mode === "create" ? createMutation.isPending : updateMutation.isPending;
  const isDeletePending = deleteMutation.isPending;

  const handleDelete = async () => {
    if (!course) {
      return;
    }

    const shouldDelete = window.confirm("Delete this course permanently? This action cannot be undone.");

    if (!shouldDelete) {
      return;
    }

    try {
      await deleteMutation.mutateAsync();
      toast.success("Course deleted");
      router.push("/instructor/courses");
    } catch (error) {
      toast.error(getErrorMessage(error, "Unable to delete course"));
    }
  };

  return (
    <Card title={mode === "create" ? "Create course" : "Edit course"}>
      <form className="grid gap-3 md:grid-cols-2" onSubmit={onSubmit}>
        <div className="md:col-span-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" {...register("title")} />
          <FieldError message={(errors.title as { message?: string } | undefined)?.message} />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="description">Description</Label>
          <textarea id="description" className="mt-1 min-h-28 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm" {...register("description")} />
        </div>
        <div>
          <Label htmlFor="short_description">Short description</Label>
          <Input id="short_description" {...register("short_description")} />
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input id="price" type="number" step="0.01" {...register("price")} />
          <FieldError message={(errors.price as { message?: string } | undefined)?.message} />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Input id="category" {...register("category")} />
        </div>
        <div>
          <Label htmlFor="subcategory">Subcategory</Label>
          <Input id="subcategory" {...register("subcategory")} />
        </div>
        <div>
          <Label htmlFor="level">Level</Label>
          <select id="level" className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm" {...register("level")}>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div>
          <Label htmlFor="duration_hours">Duration hours</Label>
          <Input id="duration_hours" type="number" min="0" {...register("duration_hours")} />
        </div>
        <div className="flex items-center gap-2 pt-6">
          <input id="published" type="checkbox" {...register("published")} />
          <Label htmlFor="published">Published</Label>
        </div>
        <div className="flex items-center gap-2 pt-6">
          <input id="is_featured" type="checkbox" {...register("is_featured")} />
          <Label htmlFor="is_featured">Featured</Label>
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="thumbnailFile">Thumbnail</Label>
          <Input id="thumbnailFile" type="file" accept="image/*" {...register("thumbnailFile")} />
        </div>
        <div className="md:col-span-2">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : mode === "create" ? "Create course" : "Update course"}
          </Button>
        </div>
        {mode === "edit" ? (
          <div className="md:col-span-2">
            <Button
              type="button"
              className="bg-rose-700 hover:bg-rose-800"
              disabled={isDeletePending}
              onClick={handleDelete}
            >
              {isDeletePending ? "Deleting..." : "Delete course"}
            </Button>
          </div>
        ) : null}
        {mode === "edit" && course ? (
          <div className="md:col-span-2">
            <Link className="font-medium text-[var(--foreground)] underline" href={`/instructor/courses/${course.id}/lessons`}>
              Manage lessons
            </Link>
          </div>
        ) : null}
      </form>
    </Card>
  );
}