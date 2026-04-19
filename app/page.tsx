"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { InstructorCourseList, PublicCourseList } from "@/src/features/course/components/CourseList";
import { MyEnrollmentList } from "@/src/features/course/components/EnrollmentList";
import { useAuthStore } from "@/src/store/auth.store";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const role = useAuthStore((state) => state.role);
  const view = searchParams.get("view");
  const showBrowseView = view === "browse";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center gap-8 px-4 py-12">
        <p className="text-sm text-[var(--muted-foreground)]">Loading home page...</p>
      </main>
    );
  }

  const content = !isAuthenticated || showBrowseView ? (
    <PublicCourseList />
  ) : role === "instructor" ? (
    <InstructorCourseList />
  ) : (
    <MyEnrollmentList />
  );

  const title = !isAuthenticated || showBrowseView
    ? "Browse courses"
    : role === "instructor"
      ? "My courses"
      : "My enrolled courses";

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-6">
      <section className="space-y-4">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Course Service</p>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">{title}</h1>
          <p className="text-sm text-[var(--muted-foreground)]">
            {showBrowseView || !isAuthenticated
              ? "Public course listings come from the course-service API."
              : role === "instructor"
                ? "Instructor view with your own courses and management shortcuts."
                : "Learner view with your enrolled courses and progress overview."}
          </p>
        </header>
        {content}
      </section>
    </main>
  );
}
