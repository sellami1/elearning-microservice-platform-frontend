"use client";

import Link from "next/link";

import { Card } from "@/src/components/ui";
import { useInstructorEnrollments, useMyEnrollments } from "@/src/features/course/hooks/useCourses";

export function MyEnrollmentList() {
  const { data, isLoading, isError } = useMyEnrollments();
  const enrollments = data?.items ?? [];

  if (isLoading) return <p className="text-sm text-[var(--muted-foreground)]">Loading enrollments...</p>;
  if (isError) return <p className="text-sm text-rose-700">Unable to load enrollments.</p>;

  if (enrollments.length === 0) {
    return (
      <div className="space-y-2 text-sm text-[var(--muted-foreground)]">
        <p>You are not enrolled in any courses yet.</p>
        <Link className="font-medium text-[var(--foreground)] underline" href="/?view=browse">
          Browse available courses
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {enrollments.map((enrollment) => (
        <Card key={enrollment.id} title={enrollment.course_title}>
          <div className="space-y-2 text-sm text-[var(--muted-foreground)]">
            <p>Progress: {enrollment.progress_percentage}%</p>
            <p>Completed lessons: {enrollment.completed_lessons} / {enrollment.total_lessons}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}

export function InstructorEnrollmentList() {
  const { data, isLoading, isError } = useInstructorEnrollments();

  if (isLoading) return <p className="text-sm text-[var(--muted-foreground)]">Loading enrollments...</p>;
  if (isError) return <p className="text-sm text-rose-700">Unable to load enrollments.</p>;

  return (
    <div className="space-y-4">
      {data?.enrolls.map((group) => (
        <Card key={group.course_id} title={group.course_title}>
          <div className="space-y-2 text-sm text-[var(--muted-foreground)]">
            {group.items.map((item) => (
              <div key={item.enrollment_id} className="rounded-lg border border-[var(--border)] p-3">
                <p>User: {item.user_id}</p>
                <p>Progress: {item.progress_percentage}%</p>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}