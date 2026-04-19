"use client";

import Link from "next/link";

import { Button, Card } from "@/src/components/ui";
import { useAuthStore } from "@/src/store/auth.store";
import { useCourse, useCourseLessons, useEnrollInCourse } from "@/src/features/course/hooks/useCourses";
import { getErrorMessage } from "@/src/lib/errors/getErrorMessage";
import { toast } from "sonner";

export function CourseDetail({ courseId }: { courseId: string }) {
  const { data: course, isLoading, isError } = useCourse(courseId);
  const { data: lessons } = useCourseLessons(courseId);
  const enrollMutation = useEnrollInCourse();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const role = useAuthStore((state) => state.role);

  if (isLoading) {
    return <p className="text-sm text-[var(--muted-foreground)]">Loading course...</p>;
  }

  if (isError || !course) {
    return <p className="text-sm text-rose-700">Unable to load course.</p>;
  }

  const canEnroll = isAuthenticated && role === "learner";

  const handleEnroll = async () => {
    try {
      await enrollMutation.mutateAsync({ course_id: course.id });
      toast.success("Enrollment successful");
    } catch (error) {
      toast.error(getErrorMessage(error, "Unable to enroll in course"));
    }
  };

  return (
    <div className="space-y-5">
      <Card title={course.title}>
        <div className="space-y-3 text-sm text-[var(--muted-foreground)]">
          <p>{course.description || course.short_description || "No description provided."}</p>
          <div className="flex flex-wrap gap-3">
            <span>Level: {course.level}</span>
            <span>Price: ${course.price.toFixed(2)}</span>
            <span>Duration: {course.duration_hours}h</span>
            <span>Enrollments: {course.total_enrollments}</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {canEnroll ? (
              <Button type="button" onClick={handleEnroll} disabled={enrollMutation.isPending}>
                {enrollMutation.isPending ? "Enrolling..." : "Enroll in course"}
              </Button>
            ) : (
              <Link className="font-medium text-[var(--foreground)] underline" href="/login">
                Sign in to enroll
              </Link>
            )}
          </div>
        </div>
      </Card>

      <Card title="Lessons">
        <div className="space-y-3 text-sm text-[var(--muted-foreground)]">
          {lessons?.items.length ? (
            lessons.items.map((lesson) => (
              <div key={lesson.id} className="rounded-lg border border-[var(--border)] p-3">
                <div className="flex items-center justify-between gap-3">
                  <strong className="text-[var(--foreground)]">{lesson.title}</strong>
                  <span>{lesson.content_type}</span>
                </div>
                <p className="mt-1 text-[var(--muted-foreground)]">{lesson.description || "No description provided."}</p>
              </div>
            ))
          ) : (
            <p>No lessons found for this course.</p>
          )}
        </div>
      </Card>
    </div>
  );
}