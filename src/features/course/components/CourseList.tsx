"use client";

import Link from "next/link";

import { CourseCard } from "@/src/features/course/components/CourseCard";
import { useCourses, useInstructorCourses } from "@/src/features/course/hooks/useCourses";

export function PublicCourseList() {
  const { data, isLoading, isError } = useCourses();

  if (isLoading) {
    return <p className="text-sm text-[var(--muted-foreground)]">Loading courses...</p>;
  }

  if (isError) {
    return <p className="text-sm text-rose-700">Unable to load courses.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {data?.items.map((course) => (
        <CourseCard key={course.id} course={course} href={`/courses/${course.id}`} />
      ))}
    </div>
  );
}

export function InstructorCourseList() {
  const { data, isLoading, isError } = useInstructorCourses();
  const courses = data ?? [];

  if (isLoading) {
    return <p className="text-sm text-[var(--muted-foreground)]">Loading your courses...</p>;
  }

  if (isError) {
    return <p className="text-sm text-rose-700">Unable to load instructor courses.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Link className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-[var(--primary-foreground)]" href="/instructor/courses/new">
          Create course
        </Link>
      </div>
      {courses.length === 0 ? (
        <p className="text-sm text-[var(--muted-foreground)]">You have not created any courses yet.</p>
      ) : null}
      <div className="grid gap-4 md:grid-cols-2">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            href={`/instructor/courses/${course.id}/edit`}
          />
        ))}
      </div>
    </div>
  );
}