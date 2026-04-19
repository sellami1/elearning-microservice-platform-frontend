import Link from "next/link";

import { getCourse } from "@/src/features/course/api/courses";
import { InstructorLessonManager } from "@/src/features/course/components/InstructorLessonManager";

type LessonManagementPageProps = {
  params: Promise<{ courseId: string }>;
};

export default async function LessonManagementPage({ params }: LessonManagementPageProps) {
  const { courseId } = await params;
  const course = await getCourse(courseId);

  return (
    <div className="space-y-4">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Instructor tools</p>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">Lessons</h1>
        <p className="text-sm text-[var(--muted-foreground)]">Manage lessons for {course.title}.</p>
        <Link className="font-medium text-[var(--foreground)] underline" href={`/instructor/courses/${course.id}/edit`}>
          Back to course
        </Link>
      </header>

      <InstructorLessonManager course={course} />
    </div>
  );
}