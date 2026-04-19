"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button, Card, FieldError, Input, Label } from "@/src/components/ui";
import { useCreateLesson, useUpdateLesson } from "@/src/features/course/hooks/useCourses";
import { getErrorMessage } from "@/src/lib/errors/getErrorMessage";
import {
  lessonCreateSchema,
  lessonUpdateSchema,
  type LessonCreateSchemaInput,
  type LessonUpdateSchemaInput,
} from "@/src/features/course/schemas/lesson.schema";
import type { Course, Lesson } from "@/src/features/course/types";

type Props = {
  mode: "create" | "edit";
  course: Course;
  lesson?: Lesson;
};

export function LessonForm({ mode, course, lesson }: Props) {
  const router = useRouter();
  const createMutation = useCreateLesson(course.id);
  const updateMutation = useUpdateLesson(course.id, lesson?.id ?? "");

  // Test data for create mode to simplify testing
  const testDefaults: LessonCreateSchemaInput = {
    title: "Test Lesson",
    description: "This is a test lesson description covering the basics.",
    content_type: "text",
    duration_minutes: 15,
    order_index: 0,
    is_preview: true,
    is_published: false,
    course_id: course.id,
    content_url: "",
  };

  const isCreateMode = mode === "create";
  const defaultValues = isCreateMode ? testDefaults : {
    title: "",
    description: "",
    content_type: "text" as const,
    duration_minutes: 0,
    order_index: 0,
    is_preview: false,
    is_published: false,
    course_id: course.id,
    content_url: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LessonCreateSchemaInput | LessonUpdateSchemaInput>({
    resolver: zodResolver(mode === "create" ? lessonCreateSchema : lessonUpdateSchema) as any,
    defaultValues,
  });

  useEffect(() => {
    if (mode !== "edit" || !lesson) {
      return;
    }

    reset({
      title: lesson.title,
      description: lesson.description ?? "",
      content_type: lesson.content_type,
      duration_minutes: lesson.duration_minutes,
      order_index: lesson.order_index,
      is_preview: lesson.is_preview,
      is_published: lesson.is_published,
      course_id: lesson.course_id,
      content_url: lesson.content_url ?? "",
    });
  }, [lesson, mode, reset]);

  const onSubmit = handleSubmit(async (values) => {
    try {
      if (mode === "create") {
        await createMutation.mutateAsync(values as unknown as LessonCreateSchemaInput);
        toast.success("Lesson created");
      } else if (lesson) {
        await updateMutation.mutateAsync(values as unknown as LessonUpdateSchemaInput);
        toast.success("Lesson updated");
      }

      router.push(`/instructor/courses/${course.id}/lessons`);
    } catch (error) {
      toast.error(getErrorMessage(error, mode === "create" ? "Unable to create lesson" : "Unable to update lesson"));
    }
  });

  const isPending = mode === "create" ? createMutation.isPending : updateMutation.isPending;

  return (
    <Card title={mode === "create" ? "Create lesson" : "Edit lesson"}>
      <form className="grid gap-3 md:grid-cols-2" onSubmit={onSubmit}>
        <input type="hidden" {...register("course_id")} />

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
          <Label htmlFor="content_type">Content type</Label>
          <select id="content_type" className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm" {...register("content_type")}>
            <option value="text">Text</option>
            <option value="video">Video</option>
            <option value="pdf">PDF</option>
            <option value="quiz">Quiz</option>
            <option value="audio">Audio</option>
            <option value="image">Image</option>
          </select>
          <FieldError message={(errors.content_type as { message?: string } | undefined)?.message} />
        </div>

        <div>
          <Label htmlFor="duration_minutes">Duration minutes</Label>
          <Input id="duration_minutes" type="number" min="0" {...register("duration_minutes")} />
          <FieldError message={(errors.duration_minutes as { message?: string } | undefined)?.message} />
        </div>

        <div>
          <Label htmlFor="order_index">Order index</Label>
          <Input id="order_index" type="number" min="0" {...register("order_index")} />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="content_url">Content URL</Label>
          <Input id="content_url" {...register("content_url" as any)} />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="contentFile">Content file</Label>
          <Input id="contentFile" type="file" {...register("contentFile" as any)} />
        </div>

        <div className="flex items-center gap-2 pt-6">
          <input id="is_preview" type="checkbox" {...register("is_preview")} />
          <Label htmlFor="is_preview">Preview</Label>
        </div>

        <div className="flex items-center gap-2 pt-6">
          <input id="is_published" type="checkbox" {...register("is_published")} />
          <Label htmlFor="is_published">Published</Label>
        </div>

        <div className="md:col-span-2 flex flex-wrap gap-3">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : mode === "create" ? "Create lesson" : "Update lesson"}
          </Button>
          <Link className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--foreground)]" href={`/instructor/courses/${course.id}/lessons`}>
            Back to lessons
          </Link>
        </div>
      </form>
    </Card>
  );
}