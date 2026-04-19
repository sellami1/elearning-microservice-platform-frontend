import Link from "next/link";

import { getCourse } from "@/src/features/course/api/courses";
import { LessonForm } from "@/src/features/course/components/LessonForm";

type NewLessonPageProps = {
  params: Promise<{ courseId: string }>;
};

export default async function NewLessonPage({ params }: NewLessonPageProps) {
  const { courseId } = await params;
  const course = await getCourse(courseId);

  return (
    <div className="space-y-4">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Instructor tools</p>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">Create lesson</h1>
        <p className="text-sm text-[var(--muted-foreground)]">Adding a lesson to {course.title}.</p>
        <Link className="font-medium text-[var(--foreground)] underline" href={`/instructor/courses/${course.id}/lessons`}>
          Back to lessons
        </Link>
      </header>

      <LessonForm course={course} mode="create" />
    </div>
  );
}