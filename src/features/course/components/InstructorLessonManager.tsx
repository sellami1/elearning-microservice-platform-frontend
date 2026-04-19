"use client";

import Link from "next/link";

import { Button, Card } from "@/src/components/ui";
import { useDeleteLesson, useCourseLessons } from "@/src/features/course/hooks/useCourses";
import { getErrorMessage } from "@/src/lib/errors/getErrorMessage";
import type { Course } from "@/src/features/course/types";
import { toast } from "sonner";

type Props = {
  course: Course;
};

export function InstructorLessonManager({ course }: Props) {
  const { data, isLoading, isError } = useCourseLessons(course.id);
  const deleteMutation = useDeleteLesson(course.id);

  if (isLoading) {
    return <p className="text-sm text-[var(--muted-foreground)]">Loading lessons...</p>;
  }

  if (isError) {
    return <p className="text-sm text-rose-700">Unable to load lessons.</p>;
  }

  const lessons = data?.items ?? [];

  const handleDelete = async (lessonId: string) => {
    const shouldDelete = window.confirm("Delete this lesson permanently? This action cannot be undone.");

    if (!shouldDelete) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(lessonId);
      toast.success("Lesson deleted");
    } catch (error) {
      toast.error(getErrorMessage(error, "Unable to delete lesson"));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Course lessons</p>
          <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">{course.title}</h2>
        </div>
        <Link className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-[var(--primary-foreground)]" href={`/instructor/courses/${course.id}/lessons/new`}>
          Add lesson
        </Link>
      </div>

      {lessons.length === 0 ? (
        <Card title="No lessons yet">
          <p className="text-sm text-[var(--muted-foreground)]">Create the first lesson for this course.</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {lessons.map((lesson) => (
            <Card key={lesson.id} title={lesson.title}>
              <div className="space-y-3 text-sm text-[var(--muted-foreground)]">
                <p>{lesson.description || "No description provided."}</p>
                <div className="flex flex-wrap gap-3">
                  <span>{lesson.content_type}</span>
                  <span>{lesson.duration_minutes} min</span>
                  <span>Order {lesson.order_index}</span>
                  <span>{lesson.is_published ? "Published" : "Draft"}</span>
                  <span>{lesson.is_preview ? "Preview" : "Full access"}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link className="font-medium text-[var(--foreground)] underline" href={`/instructor/courses/${course.id}/lessons/${lesson.id}/edit`}>
                    Edit
                  </Link>
                  <Button
                    type="button"
                    className="bg-rose-700 hover:bg-rose-800"
                    disabled={deleteMutation.isPending}
                    onClick={() => void handleDelete(lesson.id)}
                  >
                    {deleteMutation.isPending ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}